"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { CiBookmarkCheck } from "react-icons/ci";

interface IProps {
  path: string;
  title: string;
}

export const SidebarItem: React.FC<IProps> = ({ path, title }) => {
  const pathname = usePathname();
  return (
    <li>
      <Link
        href={path}
        className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl ${
          pathname === path
            ? "text-white bg-gradient-to-r from-sky-600 to-cyan-400"
            : ""
        }`}
      >
        <CiBookmarkCheck size={30} />
        <span className="-mr-1 font-medium">{title}</span>
      </Link>
    </li>
  );
};
