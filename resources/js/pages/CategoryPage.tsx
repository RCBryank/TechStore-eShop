import CategoryPageHeader from "@/components/sections/categorypage-header";
import BandItem from "@/components/ui/band-item";
import { CalculatePrice } from "@/hooks/use-calculateprice";
import { ConverttoCurrency } from "@/hooks/use-currencyformat";
import { isElementInViewport } from "@/hooks/use-ElementinViewport";
import { ConverttoPercent } from "@/hooks/use-percentageformat";
import { ProductBandDetails } from "@/hooks/use-productbandddetails";
import WebStoreLayout from "@/layouts/webstore/webstore-layout";
import { Link, usePage } from "@inertiajs/react";
import { Suspense, useEffect, useRef, useState } from "react";

const CategoryPage = ({ CategoryName, CategoryType }: { CategoryName: string, CategoryType: string }) => {

    const [PopularItems, SetPopularItems] = useState<ProductBandDetails[]>([]);

    const [AllPopularItems, SetAllPopularItems] = useState<ProductBandDetails[]>([]);

    const refTriggerResult = useRef(null);

    const [IndexPage, setIndexPage] = useState(0);
    const [TargetIndexPage, setTargetIndexPage] = useState(1);
    const [FetchingData, setFetchingData] = useState(false);
    const [NoMoreResults, setNoMoreResults] = useState(false);

    var lastScroll = 0;

    useEffect(() => {
        fetch("/products-popular/" + CategoryType).then(res => res.json()).then((data) => {
            SetPopularItems(data);
        })
    }, []);

    useEffect(() => {
        setFetchingData(true);
        fetch('/products-lazy/' + CategoryType + '/?' + new URLSearchParams({
            currentpage: TargetIndexPage.toString()
        }).toString()).then(res => res.json()).then(data => {
            let _incomingdata = data.data;

            if (_incomingdata != null && _incomingdata.length > 0) {
                _incomingdata.forEach((element: ProductBandDetails) => {
                    SetAllPopularItems(AllPopularItems => [...AllPopularItems, element]);
                });
                setIndexPage(TargetIndexPage - 1);
            } else {
                setNoMoreResults(true);
            }
        }).finally(() => {
            setFetchingData(false);
        });
    }, [TargetIndexPage])

    document.addEventListener("scroll", (e) => {
        if (refTriggerResult.current != null) {
            if (window.pageYOffset > lastScroll && isElementInViewport(refTriggerResult.current) && (TargetIndexPage - 1) == IndexPage) {
                setTargetIndexPage(TargetIndexPage + 1);
            }
        }
        lastScroll = window.pageYOffset;
    })

    return (
        <>
            <div className="container mx-auto my-16">
                <CategoryPageHeader Type={CategoryName} />
                {/* Most Popular */}
                {PopularItems.length > 0 ?
                    (<div className="flex gap-2 my-16">
                        <div className="flex-5/12">
                            <div className="bg-white relative">
                                <div hidden={PopularItems[0].Discount == 0 || PopularItems[0].Discount == null} className="rounded-full bg-brand-red-lighter absolute -top-2 -left-2 w-16 h-16 flex justify-center">
                                    <p className="text-brand-white my-auto text-2xl">{ConverttoPercent(PopularItems[0].Discount)}</p>
                                </div>
                                <div className="h-3/4">
                                    <img src={PopularItems[0].ProductPhoto} className="w-full h-full object-contain max-h-96" />
                                </div>
                                <div className="h-1/4 px-8 py-4">
                                    <Link href={PopularItems[0].URIProduct}> <p className="text-lg hover:text-gray-800">{PopularItems[0].Name}</p></Link>
                                    <p className={PopularItems[0].Discount > 0 ? 'line-through text-sm' : ''}> {ConverttoCurrency(PopularItems[0].Price)} </p>
                                    <p className="text-2xl font-bold"> {ConverttoCurrency(CalculatePrice(PopularItems[0].Price, PopularItems[0].Discount))}</p>
                                    <div className="w-full pt-2">
                                        <ul className="flex gap-2 flex-wrap">
                                            {PopularItems[0].producttags.map((item: { ID: number, Name: string }) => {
                                                return <li key={item.ID}>
                                                    <div className="rounded-2xl bg-brand-white border-1 border-gray-300 p-1 px-2 text-sm">
                                                        {item.Name}
                                                    </div>
                                                </li>
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-7/12 grid grid-cols-3 grid-rows-2 gap-2">
                            {
                                PopularItems.map((item, ind) => {
                                    return ind > 0 ? (
                                        <div key={item.ID} className="bg-white flex flex-col relative">
                                            <div hidden={item.Discount == 0 || item.Discount == null} className="rounded-full bg-brand-red-lighter absolute -top-2 -left-2 w-8 h-8 flex justify-center">
                                                <p className="text-brand-white my-auto text-sm">{ConverttoPercent(item.Discount)}</p>
                                            </div>
                                            <div className="h-3/4 max-h-48">
                                                <img src={item.ProductPhoto} className="w-full h-full object-scale-down" />
                                            </div>
                                            <div className="flex-auto px-8 py-4">
                                                <Link href={item.URIProduct}> <p className="max-h-24 overflow-hidden hover:text-gray-800">{item.Name}</p></Link>
                                                <p className={item.Discount > 0 ? 'line-through text-sm inline-block mr-2' : ''}> {ConverttoCurrency(item.Price)} </p>
                                                <p className="text-lg font-bold inline-block">{ConverttoCurrency(CalculatePrice(item.Price, item.Discount))}</p>
                                            </div>
                                        </div>
                                    ) : ''
                                })
                            }
                        </div>
                    </div>)
                    : ''}

                {/** Ultimas Ofertas */}
                <h3 className="text-2xl"> Lo mas nuevo</h3>
                <div className="grid grid-cols-3 grow-0 gap-3 my-12 flex-wrap">
                    {AllPopularItems.map((product) => {
                        return <BandItem key={product.ID} name={product.Name} price={product.Price} discount={product.Discount} uriproduct={product.URIProduct} {...(product.ProductPhoto != null ? { productphoto: product.ProductPhoto } : {})} />
                    })}
                    <div hidden={!FetchingData}>
                        <p className="text-center">Cargando...</p>
                    </div>
                </div>
                <div hidden={!NoMoreResults} className="my-24">
                    <p className="text-center">Has llegado al final</p>
                </div>
                <div ref={refTriggerResult} className="h-32">

                </div>
            </div >
        </>
    )
};

CategoryPage.layout = (page: Function) => <WebStoreLayout children={page}></WebStoreLayout>

export default CategoryPage;

/**
 * {PopularItems.map((item) => {
                                return (
                                    <div className="bg-white flex flex-col">
                                        <div className="h-3/4 max-h-48">
                                            <img src={item.ProductPhoto} className="w-full h-full object-scale-down" />
                                        </div>
                                        <div className="flex-auto px-8 py-4">
                                            <p className="text-lg">{item.Name}</p>
                                            <p className="text-lg font-bold">{ConverttoCurrency(item.Price)}</p>
                                        </div>
                                    </div>
                                )
                            })}
 */