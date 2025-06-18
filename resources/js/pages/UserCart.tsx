import CartListItem from "@/components/cart-list-item";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";

export default function UserCart(shareddata: any) {

    //-- Definir var obj con sus propiedades y el uso de State
    //-- Definir function para renderizar en la vista

    var [listitems, setListItems] = useState(shareddata.ListProducts);

    function RemoveListItemRender(idproductincart: any) {
        setListItems(listitems.filter(a => a.ID != idproductincart));
    }

    const { data, setData, post, processing, errors, reset } = useForm({});

    function RenderPurchaseButton() {
        return listitems.length > 0 ?
            <button type="submit" className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full'> Confirmar Compra </button>
            :
            <><p className="text-gray-600">Tu carrito de compras esta vacio</p></>;
    }

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('confirm-purchase'), {
            onFinish: (e) => {
                console.log(e);
            }
        })
    };

    return (
        <>
            <div className="container mx-auto">
                <div className="my-6">
                    <h1 className="text-6xl"> Tu Carrito </h1>
                </div>
                <div className="my-6 p-5 rounded-2xl bg-gray-100">
                    <ul className="list-none">
                        {listitems.map((e: object) => {
                            return <CartListItem id={e.ID} name={e.Name} quantity={e.Quantity} stock={e.Stock} deleteitem={RemoveListItemRender} key={e.ID} />;//<div key={e.ID_Product}> Producto: {e.Name} Cantidad: {e.Quantity}</div>
                        })}
                    </ul>
                </div>
                <div className="my-6 p-5 rounded-2xl bg-gray-100">
                    <form onSubmit={submit} >
                        {<RenderPurchaseButton />}
                    </form>
                </div>
            </div>
        </>
    );
}