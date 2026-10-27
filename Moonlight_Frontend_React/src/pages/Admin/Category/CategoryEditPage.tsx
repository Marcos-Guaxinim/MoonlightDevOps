import { ArrowLeftIcon } from "@phosphor-icons/react";
import { Card, CardHeader } from "../../../components/common/Generic/Card";
import { Button } from "../../../components/common/Generic/Button/Button";
import { useLocation, useParams } from "react-router-dom";
import { CategoryForm } from "./sections/CategoryForm";
import type { CategoryResponseDTO } from "../../../@types/category/category.dto";
import { useFetchCategory } from "../../../hooks/fetchItems/fetchOne/useFetchCategory";

export function CategoryEditPage() {
    const { id_category } = useParams();
    const { state } = useLocation();

    function handleCategory() : CategoryResponseDTO | undefined {
      const categoryFromState: CategoryResponseDTO | null = state != null ? state.category : null;

      const { category: categoryFromApi } = useFetchCategory(Number(id_category), {
        enabled: state == null
      });

      return categoryFromState ?? categoryFromApi;
    }

    const category = handleCategory();
    if(!category) return;

    return(
        <main className="py-10 min-h-screen bg-gradient-to-b from-base-soft via-base-soft to-base">
            <Card variant="primary" className="flex flex-col mb-10 gap-10 border py-8 container justify-self-center">
                <CardHeader className="flex items-center gap-4">
                    <Button as="link" href="/admin/categories" icon={<ArrowLeftIcon size={32} weight="thin" />} className="bg-white/10 p-2 text-white rounded-xl hover:bg-white/20"/>
                    <h1 className="text-2xl">Editar Categoria:</h1>
                </CardHeader>
                <hr />
                <CategoryForm mode="edit" category={category}/>
            </Card>
        </main>
    )
}
