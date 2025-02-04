import connectMongoDB from "@/libs/mongodb";
import Bond from "@/models/bond";
import { NextResponse, NextRequest } from "next/server";
import { roundToTwoDecimals } from "@/utils/mathUtils";
import { calculateYearsAndMonths } from "@/utils/dataFormat";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // Получаем ID фонда из URL
  const { accountId, amount, price, bondYield, matDate } = await request.json(); // Получаем accountId и amount из тела запроса

  await connectMongoDB();

  try {
    // Обновляем только нужный аккаунт в массиве bankAccounts
    const bond = await Bond.findById(id);

    if (!bond) {
      return NextResponse.json({ message: "Bond not found" }, { status: 404 });
    }

    // Проверяем, существует ли уже такой аккаунт
    const accountIndex = bond.bankAccounts.findIndex(
      (bankAccount: { id: string }) => bankAccount.id === accountId
    );

    if (accountIndex !== -1) {
      // Если аккаунт уже есть, обновляем его amount
      if (bond.bankAccounts[accountIndex].amount + amount < 0) {
        return NextResponse.json(
          { message: "Total amount must not be negative" },
          { status: 400 }
        );
      }

      bond.bankAccounts[accountIndex].amount =
        bond.bankAccounts[accountIndex].amount + amount;
    } else {
      // Если аккаунта нет, добавляем новый
      if (amount < 0) {
        return NextResponse.json(
          { message: "Total amount must not be negative" },
          { status: 400 }
        );
      }
      bond.bankAccounts.push({ id: accountId, amount });
    }

    bond.bondYield = roundToTwoDecimals(bondYield) + "%";
    bond.matDate = calculateYearsAndMonths(matDate);
    bond.price = roundToTwoDecimals(price);
    bond.totalAmount += amount;
    bond.total = roundToTwoDecimals(bond.totalAmount * price);

    // Сохраняем изменения в базе данных
    await bond.save();

    return NextResponse.json({ message: "BankAccounts updated successfully" });
  } catch (error) {
    console.error("Error updating bankAccount:", error);
    return NextResponse.json(
      { message: "Error updating bankAccount", error },
      { status: 500 }
    );
  }
}
