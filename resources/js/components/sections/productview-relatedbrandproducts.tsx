import { useEffect, useState } from "react";
import BandItem from "../ui/band-item";
import { ConverttoCurrency } from "@/hooks/use-currencyformat";
import { ProductBandDetails } from "@/hooks/use-productbandddetails";

export default function ProductViewRelatedBrandProducts({ brandname = '', id = 1 }: { brandname: string, id: number }) {

    const [ProductItems, setProductItems] = useState([]);

    useEffect(() => {
        fetch('/related-brand-products/' + id).then(response => response.json()).then(data => {
            setProductItems(data);
        })
    }, []);

    return (
        <>
            <div className="mb-28">
                <p className='mb-6'>Otros productos de {brandname}</p>
                <div className='flex gap-6'>
                    {ProductItems.map((product: ProductBandDetails) => {
                        return <BandItem key={product.ID} name={product.Name} price={product.Price} discount={product.Discount} uriproduct={product.URIProduct} {...(product.ProductPhoto != null ? { productphoto: product.ProductPhoto } : {})} />
                    })}
                </div>
            </div>
        </>
    )
}