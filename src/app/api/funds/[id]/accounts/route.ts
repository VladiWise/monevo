import connectMongoDB from "@/libs/mongodb";
import Fund from "@/models/fund";
import { NextResponse, NextRequest } from "next/server";
import { roundToTwoDecimals } from "@/utils/mathUtils";
import Account from "@/models/account";

// Обновление аккаунтов для фонда
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params; // Получаем ID фонда из URL
  const { accountId, amount, price } = await request.json(); // Получаем accountId и amount из тела запроса

  await connectMongoDB();

  try {
    // Обновляем только нужный аккаунт в массиве accounts
    const fund = await Fund.findById(id);

    if (!fund) {
      return NextResponse.json({ message: "Fund not found" }, { status: 404 });
    }

    // Проверяем, существует ли уже такой аккаунт
    const accountIndex = fund.accounts.findIndex(
      (account: { id: string }) => account.id === accountId
    );

    if (accountIndex !== -1) {
      // Если аккаунт уже есть, обновляем его amount
      fund.accounts[accountIndex].amount =
        fund.accounts[accountIndex].amount + amount;
    } else {
      // Если аккаунта нет, добавляем новый
      fund.accounts.push({ id: accountId, amount });
    }

    fund.price = roundToTwoDecimals(price);

    fund.totalAmount += amount;
    fund.total = roundToTwoDecimals(fund.totalAmount * price);

    // Сохраняем изменения в базе данных
    await fund.save();

    return NextResponse.json({ message: "Account updated successfully" });
  } catch (error) {
    console.error("Error updating account:", error);
    return NextResponse.json(
      { message: "Error updating account", error },
      { status: 500 }
    );
  }
}
