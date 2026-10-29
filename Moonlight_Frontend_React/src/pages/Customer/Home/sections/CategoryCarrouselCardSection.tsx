import { useMemo } from "react";
import { Button } from "../../../../components/common/Generic/Button/Button";
import { Carrousel } from "../../../../components/common/Generic/Carrousel";
import { CategoryCard } from "../../../../components/common/Generic/CategoryCard/CategoryCard";
import { CategoryCardSkeleton } from "../../../../components/common/Generic/CategoryCard/CategoryCardSkeleton";
import { useBreakpoint } from "../../../../hooks/breakpoints/useBreakpoint";
import { useFetchPaginatedCategories } from "../../../../hooks/fetchItems/store/useFetchPaginatedCategories";
import type { CategoryPaginatedQueryPayload } from "../../../../@types/category/category.payload";

export function CategoryCarrouselCardSection(){
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
        <section className="w-full flex flex-col pt-8 gap-8 justify-center items-center animate-fade-in">

            <h1 className="text-2xl text-center">Categorias de Jogos a Explorar:</h1>
            <div className="max-lg:w-[70vw] lg:w-[85vw] justify-self-center">
                <Carrousel cardsPerView={cardsPerView}>
                    {isLoading //está carregando? se sim placeholder carregando
                        ? Array.from({ length: cardsPerView }).map((_, i) => (<CategoryCardSkeleton key={i} />))
                        : (categories?.map(category => ( //carregou? então componente real
                            <Button as="link" href={"/categories/"+ category.id_category} variant="primary">
                                <CategoryCard
                                    key={category.id_category}
                                    category={category}
                                />
                            </Button>
                    )))}
                </Carrousel>
            </div>
            {/* fade esquerda */}
            <div className="pointer-events-none top-0 w-full pb-8 bg-linear-to-b from-black to-base-soft z-10" />
        </section>


    )
}
