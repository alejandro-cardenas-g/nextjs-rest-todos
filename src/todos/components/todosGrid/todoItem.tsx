"use client";

import { Todo } from "@prisma/client";
import React, { startTransition, useOptimistic } from "react";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";
import styles from "./todoItem.module.css";

interface IProps {
  todo: Todo;
  toogleTodo: (id: string, complete: boolean) => void;
}

export const TodoItem: React.FC<IProps> = ({ todo, toogleTodo }) => {
  const [todoOptimistic, toggleTodoOptimistic] = useOptimistic(
    todo,
    (state, newCompleteValue: boolean) => ({
      ...state,
      complete: newCompleteValue,
    })
  );

  const onToggleTodo = async () => {
    try {
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.complete));
      await toogleTodo(todoOptimistic.id, !todoOptimistic.complete);
    } catch {
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.complete));
    }
  };

  return (
    <div
      className={todoOptimistic.complete ? styles.todoDone : styles.todoPending}
    >
      <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
        <div
          onClick={() => onToggleTodo()}
          className={`flex p-2 rounded-md cursor-pointer hover:bg-opacity-60 bg-blue-100 ${
            todoOptimistic.complete ? "bg-blue-100" : "bg-red-100"
          }`}
        >
          {todoOptimistic.complete ? (
            <IoCheckboxOutline size={30} />
          ) : (
            <IoSquareOutline size={30} />
          )}
        </div>
        <div className="text-center sm:text-left">
          {todoOptimistic.description}
        </div>
      </div>
    </div>
  );
};
