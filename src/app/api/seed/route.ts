import prisma from "@/lib/prisma";
import { hashSync } from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET() {
  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();
  await prisma.user.create({
    data: {
      email: "test@test.com",
      password: hashSync("password", 10),
      roles: ["admin"],
      name: "test",
      todos: {
        create: [
          {
            description: "todo 1",
            complete: true,
          },
          {
            description: "todo 2",
          },
          {
            description: "todo 3",
          },
          {
            description: "todo 4",
          },
          {
            description: "todo 5",
          },
        ],
      },
    },
  });

  return NextResponse.json(
    {
      message: "Seed executed",
    },
    {
      status: 200,
    }
  );
}
