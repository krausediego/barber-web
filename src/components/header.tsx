import { LayoutDashboard, Palette } from "lucide-react";
import { Separator } from "./ui/separator";
import { NavLink } from "./nav-link";
import { ThemeToggle } from "./theme-toggle";
import { AccountMenu } from "./account-menu";

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <div className="flex gap-2">
          <Palette className="h-6 w-6" />
          Barber
        </div>

        <Separator orientation="vertical" className="h-6" />

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to="/">
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-6">
          <ThemeToggle />
          <AccountMenu />
        </div>
      </div>
    </div>
  );
}
