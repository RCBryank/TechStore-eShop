import { useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react"
import CartListItemQuantityInput from "./cart-list-item-quantity-input";

export default function CartListItem({ id, name, quantity, stock, deleteitem }) {

    var [ID, setID] = useState(id);
    var [Name, setName] = useState(name);
    var [Quantity, setQuantity] = useState(quantity);

    type DeleteProductForm = {
        ID: any
    };

    const { data, setData, post, processing, errors, reset } = useForm<Required<DeleteProductForm>>({
        ID: id
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('remove-from-cart'), {
            onSuccess: (e) => {
                deleteitem(id);
            }
        })
        /**/
    }

    return (
        <>
            <li className="border-b-2 py-5">
                <div className="grid grid-cols-2">
                    <div>
                        <p className="font-bold inline">Nombre:</p> {Name}
                        <br />
                        <CartListItemQuantityInput idproductincart={id} quantity={Quantity} stockavailable={stock}/>
                    </div>
                    <div>
                        <form onSubmit={submit}>
                            <button type='submit' className='bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full'>Eliminar</button>
                        </form>
                    </div>
                </div>
            </li>
        </>
    )
}