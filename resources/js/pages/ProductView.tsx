import { FormEventHandler, useEffect, useRef, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { NavMain } from '@/components/nav-main';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import WebstoreTopbar from '@/components/webstore-topbar';
import WebStoreLayout from '@/layouts/webstore/webstore-layout';
import { ConverttoCurrency } from '@/hooks/use-currencyformat';
import BandItem from '@/components/ui/band-item';
import ProductViewRelatedBrandProducts from '@/components/sections/productview-relatedbrandproducts';
import ProductViewAuthComment from '@/components/sections/productview-authcomment';
import ProductViewComments from '@/components/sections/productview-comments';
import ProductViewAuthRating from '@/components/sections/productview-authrating';
import StarRating from '@/components/star-rating';

const ProductView = (shareddata: any) => {
    type ProductRating = {
        ID: number,
        AvgRating: number,
        TotalRates: number
    }

    const hasRun = useRef(false)

    useEffect(() => {
        if (hasRun.current) return
        hasRun.current = true

        fetch('/product/' + shareddata.ID_Product)
            .then(res => res.json())
            .then((data) => {
                setProductID(data);
            });

        fetch('/product/' + shareddata.ID_Product + '/avgrating')
            .then(res => res.json())
            .then((data: ProductRating) => {
                setRateProduct(data);
            })
    }, [])

    const [RateProduct, setRateProduct] = useState<ProductRating>({ ID: -1, AvgRating: 0, TotalRates: 0 });

    var IDSta = 10;
    var [Product, setProductID] = useState({
        ID: 0,
        Name: '',
        Description: '',
        Price: 0,
        Stock: 0,
        ID_Brand: 1,
        Brand_Name: '',
        ID_ProductCategory: 1,
        ProductCategory_Name: '',
        Media: []
    });

    useEffect(() => {
        if (Product.Media.length > 0) {
            const htmlelement = document.getElementById("div_containerimgsprev")?.children[0] as HTMLElement;
            htmlelement?.click();
        }
    }, [Product.Media])

    type AddtoCartForm = {
        Quantity: any,
        ID_Product: any
    }

    const { data, setData, post, processing, errors, reset } = useForm<Required<AddtoCartForm>>({
        Quantity: 0,
        ID_Product: shareddata.ID_Product
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('add-to-cart'), {
            preserveScroll: true,
            onFinish: (e) => {
                alert("El producto se ha agregado a tu carrito");
            },
            onSuccess: (e) => {
                console.log(e);
            }
        })
    };

    const ImgPreview = document.getElementById("img_bigimage");

    function ImgMiniature_OnClickHandler(target: HTMLDivElement) {
        const img = target.children[0];

        const imgsrc = img.getAttribute("src");
        ImgPreview?.setAttribute("src", imgsrc ? imgsrc : "");
    }

    return (
        <>
            <div className='container mx-auto my-24'>

                {/* Categoria y Marca */}
                <div className='flex grow-0 justify-between mb-14'>
                    <div className='flex'>
                        <div className='mt-auto'>
                            <Link className='inline-block align-text-bottom' href=''>Components</Link> <p className='inline-block align-bottom'>{'>'}</p> <Link className='inline-block align-bottom' href=''><p>Monitor</p></Link>
                        </div>
                    </div>
                    <div className=''>
                        <div>
                            <Link className='inline-block align-bottom' href=''><p>{Product.Brand_Name}</p></Link> <img src='/build/images/Logo.png' className='inline-block w-16' />
                        </div>
                    </div>
                </div>

                {/* Marca*/}
                <div className='align-bottom mb-14'>
                    <div className='mb-2'>
                        <div className='inline-block'>
                            <StarRating filled={RateProduct.AvgRating} clickhandler={() => { return }} />
                        </div>
                        <p className='inline-block text-sm'> de {RateProduct.TotalRates} opinion(es)</p>
                    </div>
                    <p className='align-bottom text-3xl mt-auto'>{Product.Name}</p>
                    <p className='inline-block text-blue-500 font-bold'>{Product.Stock} disponibles</p>
                </div>

                <div className='flex grow-0 gap-12 mb-20'>
                    <div className='flex-5/12'>
                        <p className='text-4xl mb-7'>{ConverttoCurrency(Product.Price)}</p>
                        <div className='mb-7'>
                            <form onSubmit={submit}>
                                <input type='number' required defaultValue={1} step="1" min="1" max={Product.Stock} onChange={(e) => setData("Quantity", e.target.value)} className="mt-1 mr-5 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 inline w-auto rounded-md sm:text-sm focus:ring-1" />
                                <button className='cursor-pointer inline-block py-2 px-4 rounded-full bg-brand-red-lighter text-brand-white hover:bg-brand-darkred'>Agregar al carrito</button>
                            </form>
                        </div>
                        <div style={{ whiteSpace: 'pre-wrap' }}>
                            <p>{Product.Description}</p>
                        </div>
                    </div>
                    <div className='flex-6/12 relative'>
                        <div className='inline-block h-full absolute top-0 w-2/12'>
                            <div id='div_containerimgsprev' className='flex flex-col grow-0 px-6'>
                                {Product.Media.map((e) => {
                                    return <>
                                        <div key={e.ID} className='max-h-16 w-full h-full aspect-square bg-white overflow-hidden cursor-pointer' onClick={(e) => { ImgMiniature_OnClickHandler(e.currentTarget) }}>
                                            <img src={e.PublicPath} className='w-full h-full object-scale-down' />
                                        </div>
                                    </>
                                })}
                            </div>
                        </div>
                        <div className='inline-block aspect-square overflow-hidden rounded-2xl ml-[calc(2/12*100%)] bg-white w-10/12'>
                            <img id='img_bigimage' src='/build/images/Misc/ProductImage_404.png' className='w-full h-full object-contain' />
                        </div>
                    </div>
                </div>

                {/* Productos de esta marca */}
                <ProductViewRelatedBrandProducts brandname={Product.Brand_Name} id={1} />

                {/* Auth Rating */}
                <ProductViewAuthRating idproduct={shareddata.ID_Product} />

                {/* Auth Comentario */}
                <ProductViewAuthComment idproduct={shareddata.ID_Product} />

                {/* Comentarios */}
                <ProductViewComments idproduct={shareddata.ID_Product} />
            </div >
        </>
    )
}

ProductView.layout = (page: Function) => <WebStoreLayout children={page}></WebStoreLayout>

export default ProductView;

/*
    
                        <li className="cursor-pointer"><img onMouseOver={() => { MouseOverStarRating(1); }} src="/build/images/Misc/RateStars.png" /></li>
                        <li className="cursor-pointer"><img src="/build/images/Misc/RateStars.png" /></li>
                        <li className="cursor-pointer"><img src="/build/images/Misc/RateStars.png" /></li>
                        <li className="cursor-pointer"><img src="/build/images/Misc/RateStars.png" /></li>

    return (
        <>
            <WebstoreTopbar />
            
        </>
    )
*/