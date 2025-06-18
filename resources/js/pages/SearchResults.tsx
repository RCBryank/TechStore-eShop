import SearchResultItem from "@/components/ui/search-resultitem";
import WebStoreLayout from "@/layouts/webstore/webstore-layout";
import { Link, router, useForm } from "@inertiajs/react";
import { ChangeEvent, FormEventHandler, useEffect, useState } from "react";

const SearchResults = () => {

    const URLParams = new URLSearchParams(window.location.search);
    const query = URLParams.get("q");
    const minprice = Number(URLParams.get("minprice"));
    const maxprice = Number(URLParams.get("maxprice"));

    type FormSearch = {
        q: string,
        minprice: number,
        maxprice: number
    }

    type ItemResult = {
        Name: string,
        Price: number,
        Brand_Name: string,
        URIProduct: string,
        ProductPhoto: string
    }

    const [ResultsItems, setResultsItems] = useState([]);

    const { data, setData, get, processing, errors, reset } = useForm<Required<FormSearch>>({
        q: query ? query : '',
        minprice: minprice,
        maxprice: maxprice
    });

    function func() {
        console.log("h");
        /*router.push({
            url: '/busqueda',
            props: (currentProps) => ({ ...currentProps, q: 'Same' }),
            clearHistory: false,
            encryptHistory: false,
            preserveScroll: true,
            preserveState: true
        })
        window.history.pushState('page2', 'Title', '/busqueda'+ JSON.stringify(data));*/
        router.push({ url: route('search', data), preserveScroll: true });

    }

    const submit: FormEventHandler = function (e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();


        fetch(route('search-query', data)).then(response => response.json()).then(data => {
            setResultsItems(data);
        });
    }

    useEffect(() => {
        document.getElementById("btn_applyfilters")?.click();
    }, [])

    return (
        <>
            <div className="container mx-auto my-16">
                <div className="mt-8 mb-16">
                    <h1 className="text-2xl"> Resultados de la busqueda </h1>
                </div>
                <div className="flex gap-12">
                    <div className="flex-4/12 bg-white h-[600px] p-6 rounded-2xl">
                        <form onSubmit={submit}>
                            <div className="w-full mb-5">
                                <p className="text-sm">Busqueda</p>
                                <input onChange={(e) => setData("q", e.currentTarget.value)} value={data.q} name="q" required className="bg-white border-e-brand-white border-1 w-full mt-2 p-2 rounded-sm text-sm"></input>
                            </div>
                            <div className="w-full mb-5">
                                <p className="text-sm">Rango de Precio</p>
                                <div className="flex mt-2">
                                    <div className="flex-1/4">
                                        <input onChange={(e) => setData("minprice", e.currentTarget.valueAsNumber)} value={data.minprice} name="minprice" type="number" className="w-full p-2 text-sm border-1 border-e-brand-white rounded-sm"></input>
                                    </div>
                                    <div className="text-center">
                                        <p className="mx-2 text-sm">entre</p>
                                        {/* {<div className="w-full h-full text-center content-center relative">
                                        <div className="h-1/4 bg-brand-black mx-auto self-center"></div>
                                        <div className="absolute w-1/8 aspect-square -translate-1/2 top-1/2 left-1/2 rounded-full bg-brand-white border-1 cursor-grab border-black"></div>
                                    </div>} */}
                                    </div>
                                    <div className="flex-1/4">
                                        <input onChange={(e) => setData("maxprice", e.currentTarget.valueAsNumber)} value={data.maxprice} name="maxprice" type="number" className="w-full p-2 text-sm border-1 border-e-brand-white rounded-sm"></input>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full mb-5">
                                <p className="text-sm">Valoración</p>
                                <div className="inline-block mt-2">
                                    <ul className="flex flex-wrap items-center justify-center gap-2">
                                        <li className="cursor-pointer"><img src="/build/images/Misc/RateStars.png" /></li>
                                        <li className="cursor-pointer"><img src="/build/images/Misc/RateStars.png" /></li>
                                        <li className="cursor-pointer"><img src="/build/images/Misc/RateStars.png" /></li>
                                        <li className="cursor-pointer"><img src="/build/images/Misc/RateStars.png" /></li>
                                        <li className="cursor-pointer"><img src="/build/images/Misc/RateStars.png" /></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="mb-5">
                                <p className="text-sm">Marca</p>
                                <div className="mt-2 mx-2">
                                    <ul className="text-sm">
                                        <li className="cursor-pointer">
                                            <div className="flex justify-between">
                                                <p>Generica </p> <p>13</p>
                                            </div>
                                        </li>
                                        <li className="cursor-pointer">
                                            <div className="flex justify-between">
                                                <p>Acer </p> <p>7</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="mb-5">
                                <p className="text-sm">Tags</p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    <div className="cursor-pointer rounded-2xl bg-brand-white border-1 border-gray-300 p-1 px-2 text-sm">
                                        Inalambrico
                                    </div>
                                    <div className="cursor-pointer rounded-2xl bg-brand-white border-1 border-gray-300 p-1 px-2 text-sm">
                                        Luces RGB
                                    </div>
                                </div>
                            </div>
                            <div className="mb-5">
                                <button type="button" onClick={() => func()} className="bg-brand-red-lighter text-brand-white p-2 px-3 rounded-full cursor-pointer">Aplicar Filtros</button>
                                <button id="btn_applyfilters" type="submit" hidden className="bg-brand-red-lighter text-brand-white p-2 px-3 rounded-full cursor-pointer">Aplicar Filtros</button>
                            </div>
                        </form>
                    </div>
                    {/* Resultados */}
                    <div className="flex-8/12 h-[600px] bg-white rounded-2xl p-6">
                        <div className="text-sm flex gap-5 mb-12">
                            <p className="inline-block mr-12 text-base">Ordenar por</p>
                            <button> Precio Menor a Mayor </button>
                            <button> Precio Mayor a Menor </button>
                            <button> Alfabetico A-Z </button>
                        </div>
                        <div className="flex flex-col">
                            {/** Template Result */}
                            {ResultsItems.map((item: ItemResult) => {
                                return <SearchResultItem productname={item.Name} price={item.Price} brandname={item.Brand_Name} uriproduct={item.URIProduct} productphoto={item.ProductPhoto} />
                            })}

                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

SearchResults.layout = (page: Function) => <WebStoreLayout children={page}></WebStoreLayout>

export default SearchResults;