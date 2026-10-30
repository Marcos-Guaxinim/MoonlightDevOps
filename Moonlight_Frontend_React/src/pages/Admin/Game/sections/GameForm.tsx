import { ArrowRightIcon, CalendarIcon, CheckIcon, CurrencyDollarSimpleIcon, ImageIcon, ImagesIcon, LinkIcon, SealCheckIcon, TextTIcon} from "@phosphor-icons/react";
import { useGameForm } from "../../../../hooks/validation/Admin/useGameForm";
import { InputFieldForm } from "../../../../components/common/Forms/InputFieldForm";
import { SelectForm } from "../../../../components/common/Forms/SelectForm";
import { Button } from "../../../../components/common/Generic/Button/Button";
import { LoadingDots } from "../../../../components/common/Forms/LoadingDots";
import { FieldVerify } from "../../../../components/common/Forms/VerifyComponents/FieldVerify";
import { isTitleValid } from "../../../../utils/Validation/dataRules/Game/gameTitle";
import { isPriceValid, maskPrice } from "../../../../utils/Validation/dataRules/Game/gamePrice";
import { isLaunchDateValid } from "../../../../utils/Validation/dataRules/Game/gameLaunchDate";
import { TextAreaForm } from "../../../../components/common/Forms/TextAreaFrom";
import { useFetchCategories } from "../../../../hooks/fetchItems/store/useFetchCategories";
import type { GameResponseDTO } from "../../../../@types/game/game.dto";
import { useMemo } from "react";
import { useImageUpload } from "../../../../hooks/upload/useImageUpload";
import { resolveImageUrl } from "../../../../utils/resolveImage/resolveImageUrl";
import { Spinner } from "../../../../components/common/Generic/Spinner";


type GameFormProps = {
  mode: "create" | "edit";
  game?: GameResponseDTO;
}

export function GameForm({mode, game} : GameFormProps){
  const { categories } = useFetchCategories();

  const CategoryIds = useMemo(() => {
    return game?.categories!
      .map(name => categories.find(category => category.name === name)?.id_category)
      .filter((id_category): id_category is number => id_category !== undefined) ?? [];
      // "Pega o array de nomes das categorias do jogo e compara esses nomes com os do banco de categorias, se for igual...
      // → Pega o ID dessa categoria
      // → Limpa o lixo (undefined ou null)
      // → Se der ruim, me dá um array vazio."
  }, [game, categories]);

  const { fields, ui, setField, handleSubmit, toggleCategory, handleBlur, showErrors, selectOptions } = useGameForm(mode, game ? {
      title: game.title,
      description: game.description ?? "",
      price: game.price.toString(),
      image: game.image ?? "",
      banner_image: game.banner_image ?? "",
      link: game.link ?? "",
      launch_date: new Date(game.launch_date).toISOString().split("T")[0],
      active: game.active ? "true" : "false",
      categories: CategoryIds,
  } : undefined);

  const bannerUpload = useImageUpload('game', setField("banner_image"));
  const cardUpload = useImageUpload('game', setField("image"));

  // Tela de sucesso
  if (ui.submitted && !ui.apiError && ui.success) {
      return (
          <div className="flex flex-col items-center gap-6 py-8 text-center animate-fade-in">
              <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center">
                  <CheckIcon size={32} className="text-emerald-400" weight="bold" />
              </div>
              <h3 className="text-white text-lg font-light tracking-wider">{mode === "create" ? "Jogo cadastrado!" : "Jogo atualizado!"}</h3>
          </div>
      );
  }

  return (
      <div className="flex flex-col gap-4 w-full">
          <div className="max-lg:flex max-lg:flex-col lg:grid lg:grid-cols-2 gap-4">
              <div>
                  <InputFieldForm
                      id="game-title" label="Título" type="text"
                      value={fields.title} onChangeState={setField("title")}
                      onBlur={handleBlur("title")}
                      placeholder="Nome do jogo"
                      maxLength={50}
                      icon={<TextTIcon size={18} />}
                  />
                  <FieldVerify showError={showErrors.showErrorTitle} passed={isTitleValid(fields.title)} errorMessage="O titulo do jogo tem que ter 1 ou até no maximo 50 caracteres"/>
              </div>
              <div>
                  <InputFieldForm
                      id="game-price" label="Preço" type="text"
                      value={fields.price}
                      onChangeState={(value: string) => {
                          const masked = maskPrice(value);
                          setField("price")(masked)
                      }}
                      onBlur={handleBlur("price")}
                      placeholder="ex: 49.90"
                      inputMode="numeric"
                      icon={<CurrencyDollarSimpleIcon size={18} />}
                  />
                  <FieldVerify showError={showErrors.showErrorPrice} passed={isPriceValid(fields.price)} errorMessage="O preço tem que ser maior ou igual a 0"/>
              </div>
          </div>
          <div className="max-lg:flex max-lg:flex-col lg:grid lg:grid-cols-1">
              <TextAreaForm
                  id="game-description" label="Descrição"
                  value={fields.description} onChangeState={setField("description")}
                  placeholder="Descrição do jogo" maxLength={255}
              />
          </div>

          <div className="items-center max-lg:flex max-lg:flex-col lg:grid lg:grid-cols-2 gap-4">
              <div>
                  <InputFieldForm
                      id="game-image" label="URL da Imagem do Card" type="file"
                      accept="image/*"
                      onChange={cardUpload.handleFileUpload}
                      disabled={cardUpload.uploading}
                      placeholder="https://shared.akamai.steamstatic.com//store_item_assets//steam//apps//1245620//hero_capsule.jpg?t=1767883716"
                      maxLength={255}
                      icon={<ImageIcon size={18} />}
                  />
              </div>
              {cardUpload.uploading && <div><Spinner /></div>}
              {(cardUpload.previewUrl || fields.image) && (
                <div className="justify-self-center flex flex-col items-center">
                  <img
                      src={cardUpload.previewUrl ?? resolveImageUrl(fields.image)}
                      alt="Preview do card"
                      className="w-32 h-full object-cover bg-center rounded mt-2"
                  />
                  <p>Preview da Imagem no Card</p>
                </div>
              )}
          </div>
          <div className="items-center max-lg:flex max-lg:flex-col lg:grid lg:grid-cols-2 gap-4">
            <div>
                <InputFieldForm
                    id="game-banner" label="URL da Imagem do Banner" type="file"
                    accept="image/*"
                    onChange={bannerUpload.handleFileUpload}
                    disabled={bannerUpload.uploading}
                    placeholder="https://cdn.akamai.steamstatic.com/steam/apps/1245620/library_hero.jpg"
                    maxLength={255}
                    icon={<ImagesIcon size={18} />}
                />
            </div>
            {bannerUpload.uploading && <div><Spinner /></div>}
            {(bannerUpload.previewUrl || fields.banner_image) && (
              <div className="justify-self-center flex flex-col items-center">
                <img
                    src={bannerUpload.previewUrl ?? resolveImageUrl(fields.banner_image)}
                    alt="Preview do banner"
                    className="w-fit h-full object-cover rounded mt-2"
                />
                <p>Preview da Imagem do banner</p>
              </div>
            )}
          </div>
          <div className="max-lg:flex max-lg:flex-col lg:grid lg:grid-cols-1 gap-4">
            <div>
              <InputFieldForm
                  id="game-link" label="Link (Steam/plataforma)" type="text"
                  value={fields.link} onChangeState={setField("link")}
                  placeholder="https://store.steampowered.com/..."
                  maxLength={255}
                  icon={<LinkIcon size={18} />}
              />
            </div>
          </div>
          <div className="max-lg:flex max-lg:flex-col lg:grid lg:grid-cols-2 gap-4">
              <div>
                  <InputFieldForm
                      id="game-date" label="Data de lançamento" type="date"
                      value={fields.launch_date} onChangeState={setField("launch_date")}
                      onBlur={handleBlur("launch_date")}
                      icon={<CalendarIcon size={18} />}
                  />
                  <FieldVerify showError={showErrors.showErrorLaunchDate} passed={isLaunchDateValid(fields.launch_date)} errorMessage="A data de lançamento tem de estar marcada."/>
              </div>
              <div>
                  <SelectForm icon={<SealCheckIcon size={20} weight="thin" />}
                      id="game-active"
                      label="Jogo ativo (visível na loja)"
                      variant="terciary"
                      options={selectOptions}
                      value={String(fields.active)}
                      onChangeState={setField("active")}
                      onBlur={handleBlur("active")}
                  />
                  <FieldVerify showError={showErrors.showErrorActive} passed={fields.active !== undefined} errorMessage="É necessario saber se o jogo vai aparecer na loja ou não."/>
              </div>
          </div>
          <div className="flex flex-col gap-2">
              <label htmlFor="game-categories-checkbox" className="text-white text-sm">Categorias</label>
              <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <label id={`game-categories-label-${category.id_category}`} key={category.id_category} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-md px-3 py-2 cursor-pointer">
                        <input
                          id={`game-categories-checkbox-${category.id_category}`}
                          type="checkbox"
                          onChange={() => toggleCategory(category.id_category!)}
                          checked={fields.categories.includes(category.id_category!) }
                          className="w-4 h-4"
                        />
                        <span className="text-white text-sm">{category.name}</span>
                    </label>
                  ))}
              </div>
              <FieldVerify showError={showErrors.showErrorTitle} passed={isTitleValid(fields.title)} errorMessage="O titulo do jogo tem que ter 1 ou até no maximo 50 caracteres"/>
          </div>

          {ui.apiError && (
              <p className="text-sm text-red-400 text-center">{ui.apiError}</p>
          )}

          <Button
            id="game-submit-btn"
            onClick={() => handleSubmit(game?.id_game)}
            disabled={ui.loading}
            variant="primary"
            className="w-full py-3.5 rounded-md text-sm tracking-widest uppercase font-medium flex items-center justify-center gap-2 mt-2"
          >
              {ui.loading ? <LoadingDots /> : <>{mode === "create" ? "Cadastrar Jogo" : "Salvar Alterações"} <ArrowRightIcon size={16} weight="bold" /></>}
          </Button>
      </div>
  );
}
