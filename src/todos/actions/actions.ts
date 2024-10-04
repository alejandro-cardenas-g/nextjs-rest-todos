"use server";

import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const sleep = async (seconds: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
};

export const toggleTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  const todo = await prisma.todo.findFirst({ where: { id } });
  if (!todo) throw "Not found todo";
  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { complete },
  });
  revalidatePath("/dashboard/server-todos");
  return updatedTodo;
};

export const addTodo = async (description: string) => {
  try {
    const todo = await prisma.todo.create({
      data: {
        description,
      },
    });
    revalidatePath("/dashboard/server-todos");
    return todo;
  } catch {
    return {
      message: "Error creating todo",
    };
  }
};

export const deleteAllCompletedTodos = async () => {
  await prisma.todo.deleteMany({
    where: {
      complete: true,
    },
  });
  revalidatePath("/dashboard/server-todos");
};
