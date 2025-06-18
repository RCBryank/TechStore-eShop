import { useForm } from "@inertiajs/react";
import { useState, useEffect } from "react"

export default function CartListItemQuantityInput({ quantity, stockavailable, idproductincart }) {

    const [IDProductinCart, setIDProductinCart] = useState(idproductincart);
    const [Quantity, setQuantity] = useState(quantity);
    const [StockAvailable, setStockAvailable] = useState(stockavailable);

    const { data, setData, post, processing, errors, reset } = useForm({
        ProductinCart: IDProductinCart,
        Quantity: 0
    });

    function ChangeQuantityProduct(newquantity) {
        if(newquantity > stockavailable){
            newquantity = stockavailable;
        }

        data.Quantity = newquantity;
        post(route('set-productincart-quantity'), {
            onFinish: (e) => {
                console.log(e);
            },
            onSuccess: (e) => {
                setQuantity(newquantity);
            }
        })
    }

    return (
        <>
            <p className="font-bold inline">Cantidad:</p> <input type='number' value={Quantity} onChange={(e) => { ChangeQuantityProduct(e.target.value); }} step="1" min="0" max={stockavailable} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 inline w-auto rounded-md sm:text-sm focus:ring-1" />
            <p className="text-gray-500">Stock {stockavailable}</p>
        </>
    )
}