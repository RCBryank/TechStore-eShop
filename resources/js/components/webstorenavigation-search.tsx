import { router } from "@inertiajs/react";
import { ChangeEvent, FormEventHandler, useState } from "react"

export default function WebStoreNavigationSearch() {

    const [Values, setValues] = useState({ q: '' });

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const key = e.target.name   ;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    function handleSubmit(e: any) {
        e.preventDefault();
        router.get('/busqueda', Values)
    }

    return (
        <>
            <div className="relative m-2 bg-brand-white rounded-sm text-left">
                <form onSubmit={handleSubmit} method="GET">
                    <input required name="q" onChange={(e) => { handleChange(e); }} type="text" className="w-9/12 rounded-sm p-2 text-sm font-centuryghotic" placeholder="Busca un producto" />
                    <button type="submit" className="absolute w-3/12 right-0 top-0 h-full bg-[#ececec] rounded-tr-sm rounded-br-sm px-2 text-sm text-gray-500 cursor-pointer">Buscar</button>
                </form>
            </div>
        </>
    )
}