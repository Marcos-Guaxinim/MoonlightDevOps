import { CircleNotchIcon } from "@phosphor-icons/react";
import { useTheme } from "../../../contexts/ThemeContext";

export function Spinner() {
  const setStyleTheme = useTheme();
    return <CircleNotchIcon size={24} color={setStyleTheme.theme.blueCta} className="animate-spin"/>
}
