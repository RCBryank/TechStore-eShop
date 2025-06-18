import { SharedData } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import { FormEvent, FormEventHandler } from "react";

export default function ProductViewAuthComment({ idproduct }: { idproduct: number }) {

    const page = usePage<SharedData>();
    const { auth } = page.props;

    type FormData = {
        Message: string,
        ID_Product: number
    }

    const { data, setData, post, processing, errors, reset } = useForm<Required<FormData>>({
        Message: '',
        ID_Product: idproduct
    });

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('write-comment'), {
            preserveScroll: true,
            onSuccess: (e) => {
                alert("Gracias por enviarnos tus comentarios.");
                reset("Message");
            }
        })
    }

    return auth.user != null ? (
        <>
            {/* Deja un comentario */}
            <div className='justify-between mb-6'>
                <p className='flex-auto'>Deja un comentario en este producto</p>
            </div>

            {/* Escribir un comentario */}
            <div className='text-end mb-15'>
                <form onSubmit={onSubmit}>
                    <textarea value={data.Message} onChange={(e) => { setData("Message", e.target.value) }} className='block w-full p-4 rounded-2xl bg-gray-200 mb-3' placeholder='Escribe un comentario'>
                    </textarea>
                    <button type="submit" className='cursor-pointer inline-block py-2 px-4 rounded-full bg-brand-red-lighter text-brand-white hover:bg-brand-darkred'>Enviar</button>
                </form>
            </div>
        </>) : '';

}