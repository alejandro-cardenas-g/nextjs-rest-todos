import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as yup from "yup";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const take = searchParams.get("take") ?? "10";
  const offset = searchParams.get("offset") ?? "0";
  if (isNaN(+take))
    return NextResponse.json(
      {
        status: 400,
        message: "Take must be a number",
      },
      { status: 400 }
    );
  if (isNaN(+offset))
    return NextResponse.json(
      {
        status: 400,
        message: "offset must be a number",
      },
      { status: 400 }
    );
  const todos = await prisma.todo.findMany({
    take: +take,
    skip: +offset,
  });
  return NextResponse.json(todos);
}

const postSchema = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false),
});

export async function POST(request: Request) {
  try {
    const { complete, description } = await postSchema.validate(
      await request.json()
    );
    const todos = await prisma.todo.create({
      data: {
        complete,
        description,
      },
    });
    return NextResponse.json(todos);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}

export async function DELETE() {
  try {
    await prisma.todo.deleteMany({
      where: {
        complete: true,
      },
    });
    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
