import { useEffect, useState } from "react";
import { IoMoonSharp } from "react-icons/io5";
import { MdWbSunny } from "react-icons/md";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    // Checa si el usuario prefiere el modo oscuro
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  });

  useEffect(() => {
    // Añade o remueve la clase 'dark' según el tema
    if (theme === "dark") {
      document.querySelector("html")?.classList.add("dark");
    } else {
      document.querySelector("html")?.classList.remove("dark");
    }
  }, [theme]);

  const handleChangeTheme = () => {
    // Cambia entre los temas 'light' y 'dark'
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <button onClick={handleChangeTheme}>
      {theme === "light" ? (
        <div className="flex items-center">
          <p className="mr-2 tracking-[0.2rem] text-slate-500"> DARK</p>
          <IoMoonSharp className="text-slate-500" />
        </div>
      ) : (
        <div className="flex items-center text-white">
          <p className="mr-2 tracking-[0.2rem]">LIGHT</p>
          <MdWbSunny />
        </div>
      )}
    </button>
  );
};

export default ThemeToggle;
