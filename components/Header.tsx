"use client";

import { CurtainMenuPage } from "./CurtainMenu";
import UserAvatar from "./UserAvatar";
import { ToggleTheme } from "./toggle-theme";

const Header = () => {
  return (
    <header className="w-full sm:w-4/5 mb-auto mx-auto p-2">
      <div className="bg-card-foreground/10 h-14 md:h-16 m-auto rounded-xl flex items-center p-2 justify-between">
        <UserAvatar />
        <div className="flex items-center gap-2">
          <CurtainMenuPage />
          <ToggleTheme className="hidden md:flex" />
        </div>
      </div>
    </header>
  );
};

export default Header;
