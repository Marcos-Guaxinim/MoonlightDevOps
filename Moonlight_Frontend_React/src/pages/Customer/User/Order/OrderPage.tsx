// import { useNavigate } from "react-router-dom";
import { useFetchMyOrders } from "../../../../hooks/fetchItems/store/useFetchMyOrders";
import { Spinner } from "../../../../components/common/Generic/Spinner";
import { Table } from "../../../../components/common/Generic/Table/Table";
import { ExpandedOrderItems } from "./sections/ExpandedOrderItems";
import { useMyOrdersTable } from "../../../../hooks/tables/customer/useMyOrdersTable";



function OrderPage() {
    const {orders, isLoading} = useFetchMyOrders();
    const { OrderColumns } = useMyOrdersTable();

    if (isLoading) {
        return (
            <div className="w-full min-h-screen bg-gradient-to-b from-base-soft via-base-soft to-base flex items-center justify-center">
                <Spinner />
            </div>
        );
    }


  return (
    <main className="min-h-screen bg-gradient-to-b from-base-soft via-base-soft to-base flex flex-col items-center justify-center">
        <header className="mb-10 mt-26 w-fit bg-white/5 text-white rounded-xl p-4 border border-white/8 backdrop-blur-sm">
            <h1 className="text-2xl text-center px-10">Meus Pedidos</h1>
        </header>

        <div className="container justify-self-center p-4">
            <Table
                columns={OrderColumns}
                data={orders || []}
                isLoading={isLoading}
                expandableRows // Ativa o botão de (+)
                renderExpandedRow={(row) => <ExpandedOrderItems order={row}/>} // Componente que criamos acima
                noDataComponent={
                    <p className="white-text text-center py-10">
                        Você não fez nenhuma compra até o momento.
                    </p>
                }
            />
        </div>
    </main>
  )
}


export default OrderPage;
