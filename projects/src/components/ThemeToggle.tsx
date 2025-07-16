"use client";

import { useEffect, useState } from "react";
import { MdOutlineLightMode, MdOutlineNightlight } from "react-icons/md";

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const dark = localStorage.getItem("theme") === "dark";
    setIsDarkMode(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  // Toggle dark mode and persist to localStorage
  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newDarkMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className="border p-2 rounded-full fixed bottom-4 right-4 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-lg hover:shadow-xl transition-shadow"
    >
      {isDarkMode ? <MdOutlineLightMode /> : <MdOutlineNightlight />}
    </button>
  );
}
