"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LuPanelLeftOpen, LuPanelRightOpen } from "react-icons/lu";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [siderOpen, setSiderOpen] = useState<Boolean>(true);
  const pathname = usePathname();

  const handleLogout = async () => {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
    });
    console.log("Logout response:", res);

    if (res.ok) {
      router.push("/");
    } else {
      console.error("Logout failed");
      // optionally show a toast or message here
    }
  };

  return (
    <div className="min-h-screen flex overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`
      bg-gray-900 text-white py-6 flex flex-col justify-between
      transition-all duration-300 ease-in-out
      ${siderOpen ? "w-60 px-6" : "w-[70px] px-3"}
    `}
      >
        <div>
          {/* Toggle Button */}
          <div
            className={`flex ${
              siderOpen ? "justify-end" : "justify-center"
            } mb-4`}
          >
            <button
              className="text-2xl"
              onClick={() => setSiderOpen(!siderOpen)}
            >
              {siderOpen ? <LuPanelRightOpen /> : <LuPanelLeftOpen />}
            </button>
          </div>

          {/* Logo */}
          <h2 className={`text-2xl font-bold mb-8 transition-all duration-300 ease-in-out ${siderOpen ? '' : 'text-center'}`}>
  <span className={`${siderOpen ? "inline" : "hidden"}`}>
              NextJob
            </span>
            <span className={`${siderOpen ? "hidden" : "inline"}`}>NJ</span>
</h2>

          {/* <h2 className="text-2xl font-bold mb-8 text-center transition-all duration-300 ease-in-out">
            
          </h2> */}

          {/* Navigation */}
          <nav className={`space-y-5 ${siderOpen ? "" : "text-center"}`}>
            <Link
              href="/dashboard"
              className={`block hover:text-blue-400 ${
                pathname === "/dashboard" ? "text-blue-400 font-semibold" : ""
              }`}
            >
              <span>🏠</span>
              <span className={`${siderOpen ? "inline" : "hidden"}`}>
                Dashboard
              </span>
            </Link>
            <Link
              href="/dashboard/post-job"
              className={`block hover:text-blue-400 ${
                pathname === "/dashboard/post-job"
                  ? "text-blue-400 font-semibold"
                  : ""
              }`}
            >
              <span>📝</span>
              <span className={`${siderOpen ? "inline" : "hidden"}`}>
                Post Job
              </span>
            </Link>
            <Link
              href="/dashboard/my-jobs"
              className={`block hover:text-blue-400 ${
                pathname === "/dashboard/my-jobs"
                  ? "text-blue-400 font-semibold"
                  : ""
              }`}
            >
              <span>📁</span>
              <span className={`${siderOpen ? "inline" : "hidden"}`}>
                My Jobs
              </span>
            </Link>
          </nav>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className={`mt-8 bg-red-600 hover:bg-red-700 py-2 px-3 rounded text-white transition-all duration-300 ${
            siderOpen ? "w-full" : "mx-auto"
          }`}
        >
          {siderOpen ? "🔓 Logout" : "🔓"}
        </button>
      </aside>                                          

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-100 h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
  