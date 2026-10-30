import { useEffect, useRef, useState } from "react";

/**
 * Render prop é quando você passa uma função como prop em vez de um valor
 *  — e essa função recebe dados do componente pai para usar no filho.
 */

type DropdownProps = {
  trigger: (open: boolean) => React.ReactNode;
  children: React.ReactNode;
  alignment: "left" | "middle" | "right";
  backgroundActive: "on" | "off";
};

const backgroundClass = {
  on: "rounded-md border border-white/10 bg-base-soft z-20",
  off: "",
};

const alignmentClass = {
  left: "left-0",
  right: "right-0",
  middle: "left-1/2 -translate-x-1/2",
};

export function Dropdown({
  trigger,
  children,
  alignment = "right",
  backgroundActive = "on",
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative lg:w-fit w-full">
      <div onClick={() => setOpen(!open)}>{trigger(open)}</div>

      {open && (
        <div
          className={`absolute top-full mt-2 ${alignmentClass[alignment]} ${backgroundClass[backgroundActive]}`}
        >
          {children}
        </div>
      )}
    </div>
  );
}
