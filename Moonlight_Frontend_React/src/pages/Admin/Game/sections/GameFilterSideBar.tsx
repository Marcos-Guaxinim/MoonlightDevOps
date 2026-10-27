import { CaretDownIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "../../../../components/common/Generic/Button/Button";
import { Dropdown } from "../../../../components/common/Generic/Dropdown";
import { getAnimationState } from "../../../../utils/ui/animation/animationState";
import { InputBar } from "../../../../components/common/Generic/InputBar";
import { useState } from "react";
import { CheckIcon } from "@phosphor-icons/react";
import { useFetchCategories } from "../../../../hooks/fetchItems/store/useFetchCategories";
import { useGameFilters } from "../../../../hooks/filters/admin/useGameFilters";
import { maskPrice } from "../../../../utils/Validation/dataRules/Game/gamePrice";

type GameFilterSideBarProps = {
  open: boolean;
  onClose: () => void;
}

export function GameFilterSideBar(props: GameFilterSideBarProps) {
  const { styles } = getAnimationState(props.open);
  const { categories } = useFetchCategories();
  const { filters } = useGameFilters();
  const gameActive = getAnimationState(filters.active == true).styles;
  const gameNotActive = getAnimationState(filters.active == false).styles;

  // estado local — segura o que o usuário está digitando
  const [priceMin, setPriceMin] = useState(filters.price_min ? String(filters.price_min) : "0.00");
  const [priceMax, setPriceMax] = useState(filters.price_max ? String(filters.price_max) : "0.00");
  const [launchDateFrom, setLaunchDateFrom] = useState(filters.launch_date_from ?? "");
  const [launchDateTo, setLaunchDateTo] = useState(filters.launch_date_to ?? "");

  function handlePriceCleanUp() {
    setPriceMin("0.00");
    setPriceMax("0.00");
    filters.onPriceCleanUp?.();
  }

  function handleLaunchDateCleanUp() {
    setLaunchDateFrom("");
    setLaunchDateTo("");
    filters.onLaunchCleanUp?.();
  }

  function handleConfirmPrice() { filters.onConfirmPrice?.(priceMin, priceMax); }
  function handleConfirmLaunchDate() { filters.onConfirmLaunchDate?.(launchDateFrom, launchDateTo); }

  return (
    <aside className={`
            fixed top-0 left-0 h-full w-64 z-30
            bg-base-soft border-r border-white/10
            flex flex-col gap-6 p-4 overflow-y-auto
            transition-transform duration-300 ease-in-out
            ${styles.slideInsideScreen}
          `}>
            <div className="flex justify-between items-center">
              <span className="text-white font-medium">Filtros</span>
              <Button onClick={props.onClose} className="text-gray-400 hover:text-white">
                <XIcon size={20} />
              </Button>
            </div>
            <div className="w-full flex justify-center">
              <Dropdown
                backgroundActive="on"
                alignment="middle"
                trigger={(open) => (
                  <Button
                    className="max-lg:justify-self-center max-lg:active:bg-white max-lg:active:text-base max-lg:active:scale-95 duration-300 transition-all hover:bg-transparent fx-underline flex items-center"
                    as="button"
                    variant="transparent"
                  >
                    Categorias
                    <CaretDownIcon
                      size={20}
                      className={`transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
                    />
                  </Button>
                )}
              >
                <Button
                  as="button"
                  variant="transparent"
                  onClick={() => filters.onChangeCategory("")}
                  className={`max-lg:active:bg-white max-lg:active:text-base lg:hover:bg-white lg:hover:text-base transition-all duration-300 w-full py-2 rounded-t-md text-sm`}
                >
                  Limpar Filtro
                </Button>
                {categories?.map((cat) => {
                  const active = cat.name === filters.category;
                  const { styles } = getAnimationState(active);
                  return (
                    <Button
                      key={cat.id_category}
                      as="button"
                      variant="transparent"
                      onClick={() => filters.onChangeCategory(cat.name)}
                      className={`max-lg:active:bg-white max-lg:active:text-base lg:hover:bg-white lg:hover:text-base transition-all duration-300 text-left w-full flex justify-between items-center gap-2 px-4 py-2 text-sm`}
                    >
                      {cat.name}
                      <span>
                        <CheckIcon
                          size={20}
                          className={`${styles.fadeInOpacity} ${styles.slideDown} transition-all duration-300`}
                        />
                      </span>
                    </Button>
                  );
                })}
              </Dropdown>
            </div>
            <div className="w-full flex justify-center">
              <Dropdown
                backgroundActive="on"
                alignment="middle"
                trigger={(open) => (
                  <Button
                    className="max-lg:justify-self-center max-lg:active:bg-white max-lg:active:text-base max-lg:active:scale-95 duration-300 transition-all hover:bg-transparent fx-underline flex items-center"
                    as="button"
                    variant="transparent"
                  >
                    Preços
                    <CaretDownIcon
                      size={20}
                      className={`transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
                    />
                  </Button>
                )}
              >
                <Button
                  as="button"
                  variant="transparent"
                  onClick={() => handlePriceCleanUp()}
                  className={`max-lg:active:bg-white max-lg:active:text-base lg:hover:bg-white lg:hover:text-base transition-all duration-300 w-full py-2 rounded-t-md text-sm mb-1`}
                >
                  Limpar Filtros
                </Button>
                <h3 className="text-center">Preço Mínimo</h3>
                <InputBar
                  variant="secondary"
                  className="w-30 text-center mx-2"
                  placeholder="Preço min."
                  id="game-price_min"
                  type="text"
                  value={priceMin}
                  onChange={(e) => setPriceMin(maskPrice(e.target.value))}
                  inputMode="numeric"
                />
                <p className="text-center">até</p>
                <h3 className="text-center">Preço Máximo</h3>
                <InputBar
                  variant="secondary"
                  className="w-30 text-center mx-2"
                  placeholder="Preço max."
                  id="game-price_max"
                  type="text"
                  value={priceMax}
                  onChange={(e) => setPriceMax(maskPrice(e.target.value))}
                  inputMode="numeric"
                ></InputBar>
                <Button
                  as="button"
                  variant="cta"
                  onClick={handleConfirmPrice}
                  className="w-full p-2 rounded-b-md text-sm mt-2 animate-glow-cta"
                >
                  Aplicar
                </Button>
              </Dropdown>
            </div>
            <div className="w-full flex justify-center">
              <Dropdown
                backgroundActive="on"
                alignment="middle"
                trigger={(open) => (
                  <Button
                    className="max-lg:justify-self-center max-lg:active:bg-white max-lg:active:text-base max-lg:active:scale-95 duration-300 transition-all hover:bg-transparent fx-underline flex items-center"
                    as="button"
                    variant="transparent"
                  >
                    Data de Lançamento
                    <CaretDownIcon
                      size={20}
                      className={`transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
                    />
                  </Button>
                )}
              >
                <Button
                  as="button"
                  variant="transparent"
                  onClick={() => handleLaunchDateCleanUp()}
                  className={`max-lg:active:bg-white max-lg:active:text-base lg:hover:bg-white lg:hover:text-base transition-all duration-300 w-full py-2 rounded-t-md text-sm mb-1`}
                >
                  Limpar Filtros
                </Button>
                <h4 className="text-center">Data a partir de:</h4>
                <InputBar
                  variant="secondary"
                  className="w-35 text-center mx-2"
                  placeholder="Data a partir de.."
                  id="game-launch_date_from"
                  type="date"
                  value={launchDateFrom}
                  onChange={(e) => setLaunchDateFrom(e.target.value)}
                  inputMode="numeric"
                />
                <p className="text-center">até</p>
                <h4 className="text-center">Esta Data:</h4>
                <InputBar
                  variant="secondary"
                  className="w-35 text-center mx-2"
                  placeholder="Até esta data..."
                  id="game-launch_date_to"
                  type="date"
                  value={launchDateTo}
                  onChange={(e) => setLaunchDateTo(e.target.value)}
                  inputMode="numeric"
                ></InputBar>
                <Button
                  as="button"
                  variant="cta"
                  onClick={handleConfirmLaunchDate}
                  className="w-full p-2 rounded-b-md text-sm mt-2 animate-glow-cta"
                >
                  Aplicar
                </Button>
              </Dropdown>
            </div>
            <div className="w-full flex justify-center">
              <Dropdown
                backgroundActive="on"
                alignment="middle"
                trigger={(open) => (
                  <Button
                    className="max-lg:justify-self-center max-lg:active:bg-white max-lg:active:text-base max-lg:active:scale-95 duration-300 transition-all hover:bg-transparent fx-underline flex items-center"
                    as="button"
                    variant="transparent"
                  >
                    Jogo ativo
                    <CaretDownIcon
                      size={20}
                      className={`transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
                    />
                  </Button>
                )}
              >
                <Button
                  id=""
                  as="button"
                  variant="transparent"
                  onClick={() => filters.onChangeActive("")}
                  className={`max-lg:active:bg-white max-lg:active:text-base lg:hover:bg-white lg:hover:text-base transition-all duration-300 text-left w-full flex justify-between items-center gap-2 px-4 py-2 text-sm`}
                >
                  Limpar Filtro
                </Button>
                <Button
                  id="" as="button"
                  variant="transparent" onClick={() => filters.onChangeActive("true")}
                  className={`max-lg:active:bg-white max-lg:active:text-base lg:hover:bg-white lg:hover:text-base transition-all duration-300 text-left w-full flex justify-between items-center gap-2 px-4 py-2 text-sm`}
                >
                  Sim
                  <span>
                    <CheckIcon
                      size={20}
                      className={`${gameActive.fadeInOpacity} ${gameActive.slideDown} transition-all duration-300`}
                    />
                  </span>
                </Button>
                <Button
                  id="" as="button"
                  variant="transparent" onClick={() => filters.onChangeActive("false")}
                  className={`max-lg:active:bg-white max-lg:active:text-base lg:hover:bg-white lg:hover:text-base transition-all duration-300 text-left w-full flex justify-between items-center gap-2 px-4 py-2 text-sm`}
                >
                  Não
                  <span>
                    <CheckIcon
                      size={20}
                      className={`${gameNotActive.fadeInOpacity} ${gameNotActive.slideDown} transition-all duration-300`}
                    />
                  </span>
                </Button>
              </Dropdown>
            </div>
    </aside>
  );
}
