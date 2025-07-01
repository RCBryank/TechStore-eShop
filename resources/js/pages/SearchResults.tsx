import StarRating from "@/components/star-rating";
import Pagination from "@/components/ui/pagination";
import SearchResultItem from "@/components/ui/search-resultitem";
import WebStoreLayout from "@/layouts/webstore/webstore-layout";
import { Link, router, useForm } from "@inertiajs/react";
import { ChangeEvent, FormEventHandler, useEffect, useState } from "react";

const SearchResults = () => {

    const URLParams = new URLSearchParams(window.location.search);
    const query = URLParams.get("q");
    const minprice = Number(URLParams.get("minprice"));
    const maxprice = Number(URLParams.get("maxprice"));
    const minrating = Number(URLParams.get("minrating"));
    const brand = Number(URLParams.get("brand"));
    var tags: string[] = [];

    for (const key of URLParams.keys()) {
        if (key.match(/^tags\[(\d+)\]$/)) {
            tags.push(URLParams.get(key) || '-1');
        }
    }

    const [TotalPages, setTotalPages] = useState(0);
    const [FilterBrands, setFilterBrands] = useState<FilterBrand[]>([]);
    const [FilterTags, setFilterTags] = useState<FilterTag[]>([]);
    const [BrandAnyCount, setBrandAnyCount] = useState(0);

    type FormSearch = {
        q: string,
        minprice: number,
        maxprice: number,
        minrating: number,
        currentpage: number,
        brand: number,
        tags: string[],
        order: number
    }

    type ItemResult = {
        Name: string,
        Price: number,
        Brand_Name: string,
        AvgRating: number,
        URIProduct: string,
        ProductPhoto: string
        producttags: []
    }

    type FilterBrand = {
        ID: number,
        Brand_Name: string,
        Count: number
    }

    type FilterTag = {
        ID: number,
        Tag_Name: string
    }

    const [ResultsItems, setResultsItems] = useState([]);

    const { data, setData, get, processing, errors, reset } = useForm<Required<FormSearch>>({
        q: query ? query : '',
        minprice: minprice,
        maxprice: maxprice,
        minrating: minrating,
        brand: brand,
        tags: tags,
        currentpage: 1,
        order: 0
    });

    function func() {
        router.push({ url: route('search', data), preserveScroll: true });
    }

    function clickHandlerTag(ID_Tag: number) {
        const _array = [...data.tags];
        let _index = _array.findIndex(x => x == ID_Tag.toString())

        if (_index >= 0) {
            _array.splice(_index, 1);
        } else {
            _array.push(ID_Tag.toString());
        }

        setData("tags", _array);
    }

    const submit: FormEventHandler = function (e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();

        fetch(route('search-query', data)).then(response => response.json()).then(data => {
            setTotalPages(data.last_page);
            setResultsItems(data.data);
        });

        fetch(route('searchbrand-query', data)).then(response => response.json()).then(jsondata => {
            if (FilterBrands == jsondata)
                return;

            setFilterBrands(jsondata);
            const _anybrandtotalcount = jsondata.reduce((accumulator: number, currentValue: FilterBrand) => accumulator + currentValue.Count, 0,);
            setBrandAnyCount(_anybrandtotalcount);
        });

        fetch(route('searchtag-query', data)).then(response => response.json()).then(jsondata => {
            setFilterTags(jsondata);
        });
    }

    useEffect(() => {
        document.getElementById("btn_applyfilters")?.click();
    }, [data.currentpage, data.order])

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
                                <div className="flex justify-between mt-2 ">
                                    <StarRating filled={data.minrating} clickhandler={(value: number) => { setData("minrating", value); }} />
                                    <button onClick={() => { setData("minrating", 0) }} hidden={data.minrating <= 0} type="button" className="bg-brand-red-lighter text-brand-white p-1 px-3 cursor-pointer rounded-2xl text-sm hover:bg-brand-darkred">Quitar filtro</button>
                                </div>
                            </div>
                            <div className="mb-5">
                                <p className="text-sm">Marca</p>
                                <div className="mt-2 mx-2">
                                    <ul className="text-sm">
                                        <li className="cursor-pointer">
                                            <div className="flex justify-between" onClick={() => { setData("brand", 0) }}>
                                                <p className={data.brand == 0 ? 'text-brand-darkred' : ''}>Cualquiera </p> <p className={data.brand == 0 ? 'text-brand-darkred' : ''}> {BrandAnyCount} </p>
                                            </div>
                                        </li>
                                        {FilterBrands.map((brand) => {
                                            return (<li className="cursor-pointer" key={brand.ID}>
                                                <div className="flex justify-between" onClick={() => { setData("brand", brand.ID) }}>
                                                    <p className={data.brand == brand.ID ? 'text-brand-darkred' : ''}>{brand.Brand_Name} </p> <p className={data.brand == brand.ID ? 'text-brand-darkred' : ''}>{brand.Count}</p>
                                                </div>
                                            </li>)
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <div className="mb-5">
                                <p className="text-sm">Tags</p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {FilterTags.map(item => {
                                        return data.tags.findIndex(x => x == item.ID) >= 0 ?
                                            (
                                                <div onClick={() => clickHandlerTag(item.ID)} className="cursor-pointer rounded-2xl bg-brand-darkred border-1 text-brand-white border-gray-300 p-1 px-2 text-sm">
                                                    {item.Tag_Name}
                                                </div>
                                            )
                                            :
                                            (
                                                <div onClick={() => clickHandlerTag(item.ID)} className="cursor-pointer rounded-2xl bg-brand-white border-1 border-gray-300 p-1 px-2 text-sm">
                                                    {item.Tag_Name}
                                                </div>
                                            )
                                    })}
                                </div>
                            </div>
                            <div className="mb-5">
                                <button type="button" onClick={() => func()} className="bg-brand-red-lighter text-brand-white p-2 px-3 rounded-full cursor-pointer">Aplicar Filtros</button>
                                <button id="btn_applyfilters" type="submit" hidden className="bg-brand-red-lighter text-brand-white p-2 px-3 rounded-full cursor-pointer">Aplicar Filtros</button>
                            </div>
                        </form>
                    </div>
                    {/* Resultados */}
                    <div className="flex-8/12 bg-white rounded-2xl p-6">
                        {/* Ordenamiento */}
                        <div className="text-sm flex gap-5 mb-12">
                            <p className="inline-block mr-12 text-base">Ordenar por</p>
                            <button className="cursor-pointer" onClick={() => { setData("order", 0); }}> Precio Menor a Mayor </button>
                            <button className="cursor-pointer" onClick={() => { setData("order", 1);}}> Precio Mayor a Menor </button>
                            <button className="cursor-pointer" onClick={() => { setData("order", 2);}}> Alfabetico A-Z </button>
                        </div>
                        {/* Resultados */}
                        <div className="flex flex-col mb-12">
                            {/** Template Result */}
                            {ResultsItems.map((item: ItemResult) => {
                                return <SearchResultItem productname={item.Name} price={item.Price} brandname={item.Brand_Name} avgrating={item.AvgRating} uriproduct={item.URIProduct} productphoto={item.ProductPhoto} tags={item.producttags} />
                            })}

                        </div>
                        {/* Paginacion */}
                        <Pagination TotalPages={TotalPages} CurrentPage={data.currentpage} clickHandler={(index: number) => { setData("currentpage", index) }} />
                    </div>
                </div>
            </div >
        </>
    );
}

SearchResults.layout = (page: Function) => <WebStoreLayout children={page}></WebStoreLayout>

export default SearchResults;