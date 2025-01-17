"use client";

import { useToken } from "@/hooks/token-context";
import Link from "next/link"; // Importez le composant Link de next/link
import { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import Spacing from "./Spacing";
import { ToggleTheme } from "./toggle-theme";

export const CurtainMenuPage = () => {
  const { token, userId, logout } = useToken(); // Utilisez le hook useToken pour accéder à l'userId
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <button
        onClick={toggle}
        className="text-current rounded-md px-4 py-2 bg-background/90 hover:bg-background/50 transition-colors duration-500 ease-in-out"
      >
        Menu
      </button>
      <Menu open={open}>
        <button
          aria-label="Close"
          className="absolute top-3 right-3 text-5xl text-white cursor-pointer transition-transform duration-700 ease-in-out hover:rotate-180"
          onClick={toggle}
        >
          <MdOutlineClose className="size-14 lg:size-18 text-foreground/60" />
        </button>
        <MenuContainer>
          {!token ? (
            <>
              <MenuItem href="/pages/login">Connexion</MenuItem>
              <Spacing size={20} />
              <hr className="w-2/5 sm:w-2/6 md:w-1/6 m-auto border-primary/80" />
              <Spacing size={20} />
            </>
          ) : (
            <>
              {/* Utilisez l'userId pour afficher des informations spécifiques à l'utilisateur ou pour des vérifications */}
              <MenuItem href={`/pages/admin`} onClick={toggle}>
                Tableau de bord
              </MenuItem>
              <MenuItem href="/pages/login" onClick={toggle}>
                Inscription
              </MenuItem>
              <MenuItem href="/" onClick={handleLogout}>
                Déconnexion
              </MenuItem>
              <Spacing size={20} />
              <hr className="w-2/5 sm:w-2/6 md:w-1/6 m-auto border-primary/80" />
              <Spacing size={20} />
            </>
          )}
          <MenuItem href="/" onClick={toggle}>
            Accueil
          </MenuItem>
          <MenuItem href="/#projects" onClick={toggle}>
            Projets
          </MenuItem>
          <MenuItem href="/#qualities" onClick={toggle}>
            Qualités
          </MenuItem>
          <MenuItem href="/#contact" onClick={toggle}>
            Contact
          </MenuItem>
          <ToggleTheme className="flex md:hidden" />
        </MenuContainer>
      </Menu>
    </>
  );
};

/* Logic*/
const style = {
  container: `relative top-1/4 w-full text-center m-auto`,
  item: `text-3xl text-current cursor-pointer hover:text-foreground/40 transition-colors duration-700 ease-in-out`,
  menu: {
    open: `h-full w-full `,
    close: `w-0 h-full`,
    default: `overflow-x-hidden overflow-hidden transition-all duration-700 fixed z-10 top-0 right-0 bg-background/95`,
  },
};

function Menu({
  children,
  open,
}: {
  children: React.ReactNode;
  open: boolean;
}) {
  return (
    <div
      className={`${style.menu.default} 
      ${open ? style.menu.open : style.menu.close}`}
    >
      {children}
    </div>
  );
}

function MenuContainer({ children }: { children: React.ReactNode }) {
  return <div className={style.container}>{children}</div>;
}

function MenuItem({
  children,
  href,
  onClick,
}: {
  children: React.ReactNode;
  href: string;
  onClick?: () => void;
}) {
  return (
    <div className="p-2">
      <Link href={href} className={style.item} onClick={onClick}>
        {children}
      </Link>
    </div>
  );
}
