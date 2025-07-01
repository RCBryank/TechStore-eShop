import { useEffect, FormEventHandler, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function ProductCreate() {

    type CreateProductForm = {
        Name: string,
        Description: string,
        Price: any,
        Stock: any,
        ID_Brand: any,
        ID_ProductCategory: any,
        Tags: string[],
        Discount: number,
        ProductFiles: any
    }

    const { data, setData, post, processing, errors, reset } = useForm<Required<CreateProductForm>>({
        Name: '',
        Description: '',
        Price: 0,
        Stock: 0,
        ID_Brand: 1,
        ID_ProductCategory: 1,
        Tags: [],
        Discount: 0,
        ProductFiles: null
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('product-store'), {
            onSuccess: (e) => {
                alert('El producto ha sido agregado exitosamente');
                console.log(e);
            },
            onFinish: (e) => {
                /*reset('Name');
                reset('Description');
                reset('ID_ProductCategory');
                reset('ID_Brand');*/
            }
        });
    };

    useEffect(() => {
        fetch('/producto-categorias/')
            .then(res => res.json())
            .then((data) => {
                setSelectOptions(data);
            })
    }, []);

    var [SelectOptions, setSelectOptions] = useState([]);
    var [SelectTagOptions, setSelectTagOptions] = useState([]);

    type OptionType = {
        ID: number,
        Name: string
    }

    const listoptions = SelectOptions.map((option: OptionType) => {
        return <option key={option.ID} value={option.ID}>{option.Name}</option>
    });

    useEffect(() => {
        fetch('/marca/')
            .then(res => res.json())
            .then((data) => {
                setSelectOptionsMarca(data);
            })

        fetch('/tag')
            .then(res => res.json())
            .then((data) => {
                setSelectTagOptions(data);
            })
    }, []);

    var [SelectOptionsMarca, setSelectOptionsMarca] = useState([]);

    const listoptionsMarca = SelectOptionsMarca.map((option: OptionType) => {
        return <option key={option.ID} value={option.ID}>{option.Name}</option>
    });

    function OnSelectTagValueChangedHandler(selectedoptions: HTMLCollection) {
        //console.log(selectedoptions);
        let selectedvalues = [];
        for (let i = 0; i < selectedoptions.length; i++) {
            const _option = selectedoptions[i] as HTMLOptionElement;
            selectedvalues.push(_option.value);
        }
        setData("Tags", selectedvalues);
    }

    return (
        <>
            <div className='container mx-auto'>
                <div className='py-16'>
                    <h1 className='text-3xl'>Agregar nuevo producto</h1>
                    <hr />
                    <div className='my-16 p-8 rounded-2xl bg-gray-300'>
                        <form onSubmit={submit} encType='multipart/form-data'>
                            <div className='w-6/12'>
                                <label className="block my-5">
                                    <input value={data.Name} onChange={(e) => setData('Name', e.target.value)} type="text" name='text' className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Nombre del Producto" />
                                </label>
                            </div>
                            <div className='w-12/12'>
                                <label className="block my-5">
                                    <textarea value={data.Description} onChange={(e) => setData('Description', e.target.value)} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder='Descripcion' />
                                </label>
                            </div>
                            <div className='grid grid-cols-2'>
                                <div className='w-3/12'>
                                    <label className="block my-5">
                                        Precio
                                        <input type='number' step=".01" value={data.Price} onChange={(e) => setData('Price', e.target.value)} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder='Precio' />
                                    </label>
                                </div>
                                <div className='w-3/12'>
                                    <label className="block my-5">
                                        Stock
                                        <input type='number' step="1" min="0" max="1000000" value={data.Stock} onChange={(e) => setData('Stock', e.target.value)} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder='Stock' />
                                    </label>
                                </div>
                            </div>
                            <div className='flex mb-6'>
                                <div className='w-6/12'>
                                    <select value={data.ID_ProductCategory} onChange={(e) => setData('ID_ProductCategory', e.target.value)} className='bg-white px-3 py-2 rounded-md'>
                                        {listoptions}
                                    </select>
                                </div>
                                <div className='w-6/12'>
                                    <select value={data.ID_Brand} onChange={(e) => setData('ID_Brand', e.target.value)} className='bg-white px-3 py-2 rounded-md'>
                                        {listoptionsMarca}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <p>Tags</p>
                                <select onChange={(e) => { OnSelectTagValueChangedHandler(e.currentTarget.selectedOptions) }} multiple className='bg-brand-white p-6 py-3 rounded-2xl overflow-auto'>
                                    {SelectTagOptions.map((item: OptionType) => {
                                        return (
                                            <option key={item.ID} value={item.ID}>{item.Name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div>
                                <label className="block my-5">
                                    Descuento
                                    <input type='number' step="1" min="0" max="100" value={data.Discount} onChange={(e) => setData('Discount', Number(e.target.value))} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-1/8 rounded-md sm:text-sm focus:ring-1" placeholder='Stock' />
                                </label>
                            </div>
                            <div>
                                <br />
                                <p>Sube tus archivos</p>
                                <input type='file' multiple onChange={(e) => { setData('ProductFiles', e.target.files); }} className='bg-white px-3 py-2 rounded-md' />
                            </div>
                            <div className='w-full mt-12'>
                                <div className='flex justify-center'>
                                    <button type='submit' className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full'>Guardar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div >
            </div >
        </>
    )
}