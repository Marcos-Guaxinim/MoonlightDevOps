import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { Button } from "./Button/Button";
import { InputBar } from "./InputBar";

type SearchInputBarProps = {
  name?: string;
  classNameDiv?: string;
  placeholder?: string;
  value?: string;
  id?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
};

export function SearchInputBar({
  name = "game",
  classNameDiv = "",
  placeholder = "Pesquisar algum jogo...",
  value = "",
  id = "",
  onChange,
  onSearch,
}: SearchInputBarProps) {
  function handleSearch() {
    const valueTrimmed = value.trim();
    onSearch?.(valueTrimmed); // leva o valor limpo para a pagina.
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSearch();
  }

  return (
    <div className={`${classNameDiv} flex items-center justify-center`}>
        <div
          className="hidden sm:flex border-2 border-white rounded-md focus-within:border-blue-400 bg-base items-center w-full overflow-hidden transition-all duration-200 active:scale-[0.99]"
        >
          <InputBar
            className="text-center flex-1 bg-transparent outline-none border-none text-white placeholder:text-gray-400 pl-4"
            name={name}
            placeholder={placeholder}
            type="text"
            variant="secondary"
            id={id}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button
            className="w-12 h-11 shrink-0 rounded-none hover:bg-blue-300 active:bg-blue-400 flex items-center justify-center"
            type="submit"
            variant="cta"
            id={`${id}-desktop-btn`}
            onClick={handleSearch}
            icon={
              <MagnifyingGlassIcon
                className="active:scale-80 transition-all duration-200"
                size={22}
                weight="thin"
              />
            }
          />
        </div>

        <div className="sm:hidden flex flex-col items-center gap-2 w-full">
          <div className="border-2 border-white rounded-md focus-within:border-blue-400 bg-base items-center w-full overflow-hidden transition-all duration-200 active:scale-[0.99]">
            <InputBar
              className="text-left flex-1 bg-transparent outline-none border-none text-white placeholder:text-gray-400"
              name={name}
              placeholder={placeholder}
              type="text"
              variant="secondary"
              id={id}
              value={value}
              onChange={(e) => onChange?.(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <Button
            className="w-fit p-2 shrink-0 rounded-md hover:bg-blue-300 active:bg-blue-400 flex items-center justify-center"
            type="submit"
            variant="cta"
            id={`${id}-desktop-btn`}
            onClick={handleSearch}
          >
            Buscar
          </Button>
        </div>
    </div>
  );
}
