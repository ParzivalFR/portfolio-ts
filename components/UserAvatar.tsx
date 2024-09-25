import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import React from "react";

const UserAvatar: React.FC = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Avatar>
        <AvatarImage src="/logoP.jpg" alt="Gael Richard" />
        <AvatarFallback>GR</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-md md:text-lg font-medium text-current">
          Gael Richard
        </span>
        <span className="text-[10px] sm:text-xs text-current opacity-80">
          Développeur Web Fullstack
        </span>
      </div>
    </Link>
  );
};

export default UserAvatar;
