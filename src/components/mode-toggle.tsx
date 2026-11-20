"use client";

import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="icon-xl"
            className="relative size-10 bg-transparent"
          />
        }
      >
        <SunIcon className="scale-100 rotate-0 transition-transform dark:scale-0 dark:-rotate-90" />
        <MoonIcon className="absolute scale-0 rotate-90 transition-transform dark:scale-100 dark:rotate-0" />
        <span className="sr-only">Change colour theme</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Theme</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={theme ?? "system"}
            onValueChange={(v) => setTheme(v)}
          >
            <DropdownMenuRadioItem value="light" className="text-base">
              <SunIcon />
              Light
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="dark" className="text-base">
              <MoonIcon />
              Dark
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="system" className="text-base">
              <MonitorIcon />
              System
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
