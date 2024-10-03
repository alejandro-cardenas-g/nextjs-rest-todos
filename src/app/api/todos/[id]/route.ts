import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { NextResponse } from "next/server";
import * as yup from "yup";

interface Args {
  params: {
    id: string;
  };
}

const getTodo = (id: string): Promise<Todo | null> => {
  return prisma.todo.findFirst({
    where: {
      id,
    },
  });
};

export async function GET(request: Request, args: Args) {
  const id: string = args.params.id;
  const todo = await getTodo(id);
  if (!todo) return NextResponse.json({ message: "notFound" }, { status: 404 });
  return NextResponse.json(todo);
}

const putSchema = yup.object({
  description: yup.string().optional(),
  complete: yup.boolean().optional(),
});

export async function PUT(request: Request, args: Args) {
  try {
    const id: string = args.params.id;
    const { complete, description } = await putSchema.validate(
      await request.json()
    );
    const todo = await getTodo(id);
    if (!todo)
      return NextResponse.json({ message: "notFound" }, { status: 404 });
    const newTodo = await prisma.todo.update({
      where: {
        id,
      },
      data: {
        complete,
        description,
      },
    });
    return NextResponse.json(newTodo);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
