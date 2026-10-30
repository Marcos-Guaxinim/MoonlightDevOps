import { DARK, FONT, FONT_SIZE, LIGHT, RADIUS, SPACE, type ThemeColor} from "../styles/theme-pattern";
import { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
  currentColor: ThemeColor;
  theme: typeof DARK;
  font: typeof FONT;
  fontSize: typeof FONT_SIZE;
  space: typeof SPACE;
  radius: typeof RADIUS;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

type Props = {
  children: React.ReactNode;
}

function getInitialTheme(): ThemeColor {
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") return saved;

  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  return prefersLight ? "light" : "dark";
}

export const ThemeProvider = ({ children }: Props) => {
  const [color, setColor] = useState<ThemeColor>(getInitialTheme); // light e dark
  const [theme, setTheme] = useState(color === "light" ? LIGHT : DARK); // Hexadecimal


  const toggleTheme = () => {
      const next = color === "light" ? "dark" : "light";
      setColor(next);
      setTheme(next === "light" ? LIGHT : DARK);
      localStorage.setItem("theme", next); // persiste a escolha manual
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", color);
  }, [color]);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return; // usuário já escolheu manualmente, não sobrescreve

    const media = window.matchMedia("(prefers-color-scheme: light)");
    const handleChange = (e: MediaQueryListEvent) => {
      const next = e.matches ? "light" : "dark";
      setColor(next);
      setTheme(next === "light" ? LIGHT : DARK);
    };

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);


    return (
      <ThemeContext.Provider
        value={{
          currentColor: color,
          theme,
          font: FONT,
          fontSize: FONT_SIZE,
          radius: RADIUS,
          space: SPACE,
          toggleTheme,
        }}
      >
        {children}
      </ThemeContext.Provider>
    )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === null) {
      throw new Error("Use dentro do <ThemeContext>")
  }
  return context;
}
