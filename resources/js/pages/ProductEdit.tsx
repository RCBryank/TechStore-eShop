import { useEffect, FormEventHandler, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import ProductCreateForm from '@/components/sections/productcreate-form';
import { OptionType } from '@/hooks/use-selectoption';
import WebStoreLayout from '@/layouts/webstore/webstore-layout';

const ProductEdit = ({ id }: { id: number }) => {

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
                    <ProductCreateForm />
                </div >
            </div >
        </>
    )
}

ProductEdit.layout = (page: Function) => <WebStoreLayout children={page}></WebStoreLayout>

export default ProductEdit;