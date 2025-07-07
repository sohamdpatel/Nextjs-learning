"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLink = [
  { name: "Login", href: "/login" },
  { name: "Register", href: "/register" },
  { name: "Forgot Password", href: "/forgot-password" },
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [hasMounted, setHasMounted] = useState(false);
  const [input, setInput] = useState("") // when we are using layout file that time we change the route that time state doesn't change but when we use template filethat time every time when we change the page that make a new instance

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Loading...</p>
        {/* You can add a spinner here instead of text if you want */}
      </div>
    );
  }

  return (
    <div className=" h-screen">
      <input type="text" onChange={(e) => setInput(e.target.validationMessage)} />
      <div className="flex gap-2">
        {navLink.map((link) => {
          const isActive =
            pathname === link.href ||
            (pathname.startsWith(link.href) && link.href !== "/");

          return (
            <Link
              href={link.href}
              key={link.name}
              className={`border-2 rounded-2xl p-2 ${
                isActive ? "bg-gray-500" : ""
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
      {children}
    </div>
  );
}
