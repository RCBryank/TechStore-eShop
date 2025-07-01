import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import BandItem from "../ui/band-item";
import { ProductBandDetails } from "@/hooks/use-productbandddetails";

export default function HomeProductsonSale() {

    const [LisItemsProducts, setListItemsProducts] = useState([]);

    useEffect(() => {
        fetch("products-discount").then(res => res.json()).then(data => {
            setListItemsProducts(data);
        })
    }, [])

    return (
        <>
            <div className="bg-brand-white">
                <div className="container mx-auto">
                    <div className="flex gap-5 pb-24">
                        <img src="build/images/Logo.png" className="inline-block w-32" />
                        <h3 className="inline-block font-centuryghotic text-4xl self-end"> Ofertas </h3>
                        <Link href="" className="inline-block ml-auto self-end"><p className="p-4 px-6 rounded-2xl ml-auto bg-brand-red-lighter text-brand-white hover:bg-brand-darkred">Ver más</p></Link>
                    </div>
                    <div className="grid grid-cols-3 grow-0 gap-6 pb-24">
                        {LisItemsProducts.map((item: ProductBandDetails) => {
                            return <BandItem name={item.Name} price={item.Price} discount={item.Discount} uriproduct={item.URIProduct} productphoto={item.ProductPhoto}></BandItem>
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

/*

                        <div className="item-band flex grow-0 bg-white rounded-2xl overflow-hidden animate__animated ">
                            <div className="bg-white flex w-5/12 p-3">
                                <img className="object-fill aspect-square self-center" src="/build/images/HomeShortBand/Category_Headphones.png" />
                            </div>
                            <div className="w-7/12 p-5 text-brand-black">
                                <Link href=""> <p className="mb-2 text-chart-2 hover:text-chart-3">Audifonos Sony WC-30</p></Link>
                                <p> $750.00 </p>
                            </div>
                        </div>
                        <div className="item-band flex grow-0 bg-white rounded-2xl overflow-hidden animate__animated ">
                            <div className="bg-white flex w-5/12 p-3">
                                <img className="object-fill aspect-square self-center" src="/build/images/HomeShortBand/Category_Headphones.png" />
                            </div>
                            <div className="w-7/12 p-5 text-brand-black">
                                <Link href=""> <p className="mb-2 text-chart-2 hover:text-chart-3">Audifonos Sony WC-30</p></Link>
                                <p> $750.00 </p>
                            </div>
                        </div>
                        <div className="item-band flex grow-0 bg-white rounded-2xl overflow-hidden animate__animated ">
                            <div className="bg-white flex w-5/12 p-3">
                                <img className="object-fill aspect-square self-center" src="/build/images/HomeShortBand/Category_Headphones.png" />
                            </div>
                            <div className="w-7/12 p-5 text-brand-black">
                                <Link href=""> <p className="mb-2 text-chart-2 hover:text-chart-3">Audifonos Sony WC-30</p></Link>
                                <p> $750.00 </p>
                            </div>
                        </div>
                        <div className="item-band flex grow-0 bg-white rounded-2xl overflow-hidden animate__animated ">
                            <div className="bg-white flex w-5/12 p-3">
                                <img className="object-fill aspect-square self-center" src="/build/images/HomeShortBand/Category_Headphones.png" />
                            </div>
                            <div className="w-7/12 p-5 text-brand-black">
                                <Link href=""> <p className="mb-2 text-chart-2 hover:text-chart-3">Audifonos Sony WC-30</p></Link>
                                <p> $750.00 </p>
                            </div>
                        </div>
                        <div className="item-band flex grow-0 bg-white rounded-2xl overflow-hidden animate__animated ">
                            <div className="bg-white flex w-5/12 p-3">
                                <img className="object-fill aspect-square self-center" src="/build/images/HomeShortBand/Category_Headphones.png" />
                            </div>
                            <div className="w-7/12 p-5 text-brand-black">
                                <Link href=""> <p className="mb-2 text-chart-2 hover:text-chart-3">Audifonos Sony WC-30</p></Link>
                                <p> $750.00 </p>
                            </div>
                        </div>
                        <div className="item-band flex grow-0 bg-white rounded-2xl overflow-hidden animate__animated ">
                            <div className="bg-white flex w-5/12 p-3">
                                <img className="object-fill aspect-square self-center" src="/build/images/HomeShortBand/Category_Headphones.png" />
                            </div>
                            <div className="w-7/12 p-5 text-brand-black">
                                <Link href=""> <p className="mb-2 text-chart-2 hover:text-chart-3">Audifonos Sony WC-30</p></Link>
                                <p> $750.00 </p>
                            </div>
                        </div><div className="item-band flex grow-0 bg-white rounded-2xl overflow-hidden animate__animated ">
                            <div className="bg-white flex w-5/12 p-3">
                                <img className="object-fill aspect-square self-center" src="/build/images/HomeShortBand/Category_Headphones.png" />
                            </div>
                            <div className="w-7/12 p-5 text-brand-black">
                                <Link href=""> <p className="mb-2 text-chart-2 hover:text-chart-3">Audifonos Sony WC-30</p></Link>
                                <p> $750.00 </p>
                            </div>
                        </div><div className="item-band flex grow-0 bg-white rounded-2xl overflow-hidden animate__animated ">
                            <div className="bg-white flex w-5/12 p-3">
                                <img className="object-fill aspect-square self-center" src="/build/images/HomeShortBand/Category_Headphones.png" />
                            </div>
                            <div className="w-7/12 p-5 text-brand-black">
                                <Link href=""> <p className="mb-2 text-chart-2 hover:text-chart-3">Audifonos Sony WC-30</p></Link>
                                <p> $750.00 </p>
                            </div>
                        </div>
*/