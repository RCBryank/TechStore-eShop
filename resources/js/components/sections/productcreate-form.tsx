import { OptionType } from "@/hooks/use-selectoption";
import { useState } from "react";
import { Input } from "../ui/input";
import InputBrand from "../ui/inputbrand";
import TextAreaBrand from "../ui/textareabrand";
import ProductCreateMediaItem from "../ui/productcreate-mediaitem";

export default function ProductCreateForm() {

    var [SelectOptionsCategory, setSelectOptionsCategory] = useState([]);
    var [SelectOptionsMarca, setSelectOptionsMarca] = useState([]);

    const listoptions = SelectOptionsCategory.map((option: OptionType) => {
        return <option key={option.ID} value={option.ID}>{option.Name}</option>
    });

    const listoptionsMarca = SelectOptionsMarca.map((option: OptionType) => {
        return <option key={option.ID} value={option.ID}>{option.Name}</option>
    });

    return (
        <>
            <div className="flex gap-12 justify-center my-12">
                <div className="flex-1/6 grow-0 flex flex-col gap-6">
                    <ProductCreateMediaItem imgsrc="/storage/images/5qj9AGmJrNCl60dVS3v2sRvNRjg1PhCb4fEInORP.jpg" />
                    <div className="text-center">
                        <button className="bg-brand-darkred rounded-2xl p-2 w-12 h-12 text-white font-bold cursor-pointer">+</button>
                    </div>
                </div>
                <div className="flex-4/6 grow-0">
                    <form>
                        <div className="flex flex-col gap-9">
                            <div>
                                <label className="block">
                                    Nombre del Producto
                                    <input type="text" name='text' className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" />
                                </label>
                            </div>
                            <div>
                                <label className="block">
                                    Descripción
                                    <TextAreaBrand className="h-32" />
                                </label>
                            </div>
                            <div className="flex gap-2">
                                <div className='flex-1/3 grow-0'>
                                    <label>
                                        Categoría del Producto
                                        <select className='bg-white px-3 py-2 my-1 rounded-md w-full'>
                                            {listoptions}
                                        </select>
                                    </label>
                                </div>
                                <div className='flex-1/3  grow-0'>
                                    <label>
                                        Marca
                                        <select className='bg-white px-3 py-2 my-1 rounded-md w-full'>
                                            {listoptionsMarca}
                                        </select>
                                    </label>
                                </div>
                                <div className="flex-1/3"></div>
                            </div>
                            <div className="flex gap-2">
                                <div className='flex-1/3 grow-0'>
                                    <label>
                                        Precio
                                        <InputBrand type="number" className="w-full" min={0} max={1000000} step={.01} />
                                    </label>
                                </div>
                                <div className='flex-1/3 grow-0'>
                                    <label className="block">
                                        Descuento %
                                        <InputBrand type="number" className="w-full" min={0} max={100} step={1} />
                                    </label>
                                </div>
                                <div className='flex-1/3 grow-0'>
                                    <label className="block">
                                        Stock
                                        <InputBrand type="number" min={0} max={100000} step={1} />
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label>
                                    Tags
                                    <TextAreaBrand />
                                </label>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}