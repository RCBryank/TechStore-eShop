import { ConverttoCurrency } from "@/hooks/use-currencyformat";
import { Link } from "@inertiajs/react";

export default function BandItem({ name, price, uriproduct, productphoto = '/build/images/Misc/ProductImage_404.png' }: { name: string, price: number, uriproduct: string, productphoto?: string }) {
    return (
        <>
            <div className="item-band bg-white flex-4/12 grow-0 rounded-2xl flex overflow-hidden max-h-48 animate__animated ">
                <div className="bg-white flex w-5/12 p-3">
                    <img className="w-full h-full object-scale-down self-center" src={productphoto} />
                </div>
                <div className="w-7/12 p-5 text-brand-black">
                    <Link href={uriproduct}> <p className="mb-2 text-chart-2 hover:text-chart-3">{name}</p></Link>
                    <p> {ConverttoCurrency(price)} </p>
                </div>
            </div>
        </>
    )
}