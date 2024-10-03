import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  await prisma.todo.deleteMany();

  await prisma.todo.createMany({
    data: [
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
