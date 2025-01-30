import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse, NextRequest } from "next/server";

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

    return NextResponse.json({ message: "Confirmation email sent", user }, { status: 201 });

  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: "Error creating user", error: error.message }, { status: 500 });
    }
    throw error;


  }
}

export async function GET(request: NextRequest) {

  const id = request.nextUrl.searchParams.get("id");
  const email = request.nextUrl.searchParams.get("email");

  await connectMongoDB();

  try {

    if (id) {
      const user = await User.findById(id);
      return NextResponse.json(user, { status: 200 });
    }

    if (email) {
      const user = await User.findOne({ email });
      return NextResponse.json(user, { status: 200 });
    }

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