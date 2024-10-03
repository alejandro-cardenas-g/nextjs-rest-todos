"use client";

import { Todo } from "@prisma/client";
import React from "react";

import * as api from "@/todos/utils/todos-fetch";
import { useRouter } from "next/navigation";
import { TodoItem } from "./todoItem";

interface IProps {
  todos?: Todo[];
}

export const TodosGrid: React.FC<IProps> = ({ todos = [] }) => {
  const router = useRouter();
  const toggleTodo = async (id: string, complete: boolean) => {
    await api.updateTodo(id, complete);
    router.refresh();
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {todos.map((itemTodo) => (
        <TodoItem key={itemTodo.id} todo={itemTodo} toogleTodo={toggleTodo} />
      ))}
    </div>
  );
};
