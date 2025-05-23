import { HomeIcon, File, UsersRound, LogOutIcon } from "lucide-react";
import Link from "next/link";

import NavButton from "@/components/NavButton";
import { NavButtonMenu } from "./NavButtonMenu";
import { ModeToggle } from "./mode-toggle";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="animate-slide bg-background h-12 p-2 border-b sticky top-0 z-20">
      <div className="flex h-8 items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <NavButton href="/tickets" label="Home" icon={HomeIcon} />

          <Link
            href="/tickets"
            className="flex justify-center items-center gap-2 ms-0"
            title="Home"
          >
            <h1 className="hidden sm:block text-xl font-bold m-0 mt-1">
              Computer Repair Shop
            </h1>
          </Link>
        </div>

        <div className="flex items-center">
          <NavButtonMenu
            icon={UsersRound}
            label="Customer Menu"
            choices={[
              { title: "Search Customers", href: "/customers" },
              { title: "New Customer", href: "/customers/form" },
            ]}
          />
          <NavButton href="/tickets" label="Tickets" icon={File} />

          <ModeToggle />

          <Button
            variant="ghost"
            size="icon"
            aria-label="Logout"
            title="Logout"
            className="rounded-full"
            asChild
          >
            <LogoutLink>
              <LogOutIcon />
            </LogoutLink>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
