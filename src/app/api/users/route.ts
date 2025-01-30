import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse, NextRequest } from "next/server";
import { generateVerificationToken } from "@/libs/tokens";

export async function POST(req: Request) {
  await connectMongoDB(); // Убедимся, что подключение к базе данных установлено

  try {
    const body = await req.json(); // Парсинг тела запроса
    const { email, password, name } = body;

    // Проверка наличия всех необходимых полей
    if (!email || !password || !name) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });

    }

    // Проверка уникальности email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "Email already exists" }, { status: 409 });

    }

    // Создание нового пользователя
    const user = await User.create({ email, password, name });

    const verificationToken = await generateVerificationToken(email);

    return NextResponse.json({ message: "Confirmation email sent", user }, { status: 201 });

  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: "Error creating user", error: error.message }, { status: 500 });
    }
    throw error;


  }
}

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get("email");

  await connectMongoDB();

  try {

    const user = await User.findOne({ email });
    // return user;
    return NextResponse.json(user, { status: 200 });

  } catch (error: unknown) {
    if (error instanceof Error) {

      return NextResponse.json(
        { message: "User not found", error: error.message },
        { status: 500 }
      );
    }
    throw error;
  }
}