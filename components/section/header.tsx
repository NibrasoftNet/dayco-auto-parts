"use client";
import {
  Menu,
  RepeatIcon,
  ShoppingCartIcon,
  SquareMenuIcon,
  UserIcon,
  X,
} from "lucide-react";
import { motion, useScroll } from "motion/react";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const { scrollYProgress } = useScroll();

  React.useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setScrolled(latest > 0.05);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <header>
      <nav
        data-state={menuState && "active"}
        className="fixed z-20 w-full pt-2"
      >
        <div
          className={cn(
            "mx-auto max-w-7xl rounded-3xl px-6 transition-all duration-300 lg:px-12",
            scrolled && "bg-black/90 backdrop-blur-2xl",
          )}
        >
          <motion.div
            key={1}
            className={cn(
              "relative flex flex-wrap items-center justify-between gap-6 py-3 duration-200 lg:gap-0 lg:py-6",
              scrolled && "lg:py-4",
            )}
          >
            <div className="flex flex-col items-center w-full text-white">
              <div className="flex flex-col w-full">
                <div className="flex w-full items-center justify-between pb-2 border-b border-blue-500">
                  <div className="flex items-center gap-6">
                    <Link href="#" className="hover:underline">
                      About Us
                    </Link>
                    <Link href="#" className="hover:underline">
                      FAQ
                    </Link>
                    <Link href="#" className="hover:underline">
                      Contact
                    </Link>
                  </div>
                  <div className="flex items-center gap-6">
                    <Select>
                      <SelectTrigger className="border-none data-[placeholder]:text-white">
                        <SelectValue placeholder="EN" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Language</SelectLabel>
                          <SelectItem value="TND">EN</SelectItem>
                          <SelectItem value="EUR">FR</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger className="border-none data-[placeholder]:text-white">
                        <SelectValue placeholder="TND" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Currency</SelectLabel>
                          <SelectItem value="TND">TND</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                          <SelectItem value="USD">USD</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div
                  className={cn(
                    " relative flex w-full flex-col items-center justify-between gap-6 py-3 duration-200 lg:gap-0 lg:py-6",
                    scrolled && "lg:py-4",
                  )}
                >
                  <div className=" flex items-center justify-between w-full">
                    <div className="flex gap-2">
                      <Link
                        href="/public"
                        aria-label="home"
                        className="flex items-end space-x-2"
                      >
                        <span className="font-bold text-4xl">STDP</span>
                        <span className="font-normal text-lxl text-blue-500">
                          Tunisie
                        </span>
                      </Link>

                      <Button
                        onClick={() => setMenuState(!menuState)}
                        aria-label={menuState ? "Close Menu" : "Open Menu"}
                        className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
                      >
                        <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                        <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        href="/dashboard/search"
                        className="flex items-center gap-1 cursor-pointer group"
                      >
                        <SquareMenuIcon className="size-10 rounded-full border p-2" />
                        <div className="flex flex-col">
                          <span className="text-xs group-hover:underline">
                            Company
                          </span>
                          <span className="font-semibold text-md group-hover:underline">
                            Company Name
                          </span>
                        </div>
                      </Link>
                      <Input
                        type="product"
                        placeholder="Search product by number..."
                        className="w-96 placeholder:text-white"
                      />
                    </div>

                    <ul className="flex gap-2 text-sm">
                      <Link
                        href="/auth/sign-in"
                        className="flex items-center gap-1 group"
                      >
                        <UserIcon className="size-10 rounded-full border p-2" />
                        <div className="flex flex-col">
                          <span className="text-xs group-hover:underline">
                            Sin IN
                          </span>
                          <span className="font-semibold text-md group-hover:underline">
                            Account
                          </span>
                        </div>
                      </Link>
                      <Link href="#">
                        <RepeatIcon className="size-10 rounded-full border p-2" />
                      </Link>
                      <Link href="#">
                        <ShoppingCartIcon className="size-10 rounded-full border p-2" />
                      </Link>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </nav>
    </header>
  );
};
