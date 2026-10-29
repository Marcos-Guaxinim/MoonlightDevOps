import { Button } from "../../../common/Generic/Button/Button";
import { CategoryCard } from "../../../common/Generic/CategoryCard/CategoryCard";
import { CategoryCardSkeleton } from "../../../common/Generic/CategoryCard/CategoryCardSkeleton";
import { useBreakpoint } from "../../../../hooks/breakpoints/useBreakpoint";
import { FooterSection } from "./components/FooterSection";
import { legalItems, siteMapItems } from "./components/FooterSectionData";
import { Carrousel } from "../../../common/Generic/Carrousel";
import { useFetchPaginatedCategories } from "../../../../hooks/fetchItems/store/useFetchPaginatedCategories";
import { useMemo } from "react";
import type { CategoryPaginatedQueryPayload } from "../../../../@types/category/category.payload";
import moonlightMaior from "@/assets/Moonlight.png";

export function CustomerFooter(){
    const query: CategoryPaginatedQueryPayload = useMemo(() => ({
        page: 1,
        limit: 9,
        random: true,
        name: undefined,
    }), []);

    const { isMobile, isTablet } = useBreakpoint();
    const cardsPerView = isMobile ? 1 : isTablet ? 2 : 3; // o ultimo caso é desktop;
    const {categories, isLoading} = useFetchPaginatedCategories(query);

    return(
        <footer className="bg-base w-full flex flex-col justify-evenly items-center p-4 pt-12 gap-8">
            <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-6 px-4 lg:px-20">
                <Button className="w-1/2 flex justify-center" as="link" href="/" variant="transparent">
                    <img src={moonlightMaior} className="h-auto w-auto" alt="Moonlight Logo" />
                </Button>
                <div className="w-1/2 max-w-225 flex flex-col">
                    <h2 className="text-2xl text-center lg:text-left">Todas as Categorias de Jogos:</h2>
                    <Carrousel cardsPerView={cardsPerView}>
                        {isLoading //está carregando? se sim placeholder carregando
                            ? Array.from({ length: cardsPerView }).map((_, i) => (<CategoryCardSkeleton key={i} />))
                            : (categories?.map(category => ( //carregou? então componente real
                                <Button as="link" href={"/categories/"+ category.id_category} variant="transparent">
                                    <CategoryCard
                                        key={category.id_category}
                                        category={category}
                                        classNameImage="object-contain"
                                    />
                                </Button>
                        )))}
                    </Carrousel>
                </div>

            </div>
            <div className="w-full flex flex-col lg:flex-row justify-between gap-6 px-4 lg:px-20">
                <div className="gap-4 lg:gap-12 flex flex-col text-center lg:text-left lg:justify-center lg:flex-row lg:w-1/2">
                    <FooterSection title="Mapa do Site" items={siteMapItems}/>
                    <div className="w-full h-px lg:w-px lg:h-40 bg-gray-400"></div>
                    <FooterSection title="Juridico" items={legalItems}/>
                </div>
                <div className="flex lg:self-end lg:w-1/2">
                    <h3 className="text-xl text-center w-full lg:text-end">©Moonlight - 2026 Todos os direitos reservados.</h3>
                </div>
            </div>
        </footer>
    )
}
