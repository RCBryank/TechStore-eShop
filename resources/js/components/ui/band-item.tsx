import { CalculatePrice } from "@/hooks/use-calculateprice";
import { ConverttoCurrency } from "@/hooks/use-currencyformat";
import { ConverttoPercent } from "@/hooks/use-percentageformat";
import { Link } from "@inertiajs/react";

export default function BandItem({ name, price, discount = 0, uriproduct, productphoto = '/build/images/Misc/ProductImage_404.png' }: { name: string, price: number, discount?: number, uriproduct: string, productphoto?: string }) {
    return (
        <>
            <div className="item-band bg-white flex-4/12 grow-0 rounded-2xl flex max-h-48 animate__animated relative">
                <div hidden={discount == 0 || discount == null} className="rounded-full bg-brand-red-lighter absolute -top-2 -left-2 w-12 h-12 flex justify-center">
                    <p className="text-brand-white my-auto text-xl">{ConverttoPercent(discount)}</p>
                </div>
                <div className="flex w-5/12 p-3 overflow-hidden rounded-l-2xl">
                    <img className="w-full h-full object-scale-down self-center" src={productphoto} />
                </div>
                <div className="w-7/12 p-5 text-brand-black">
                    <Link href={uriproduct}> <p className="mb-2 max-h-8/12 overflow-hidden text-ellipsis text-chart-2 hover:text-chart-3">{name}</p></Link>
                    <p className={discount > 0 ? 'line-through text-sm' : ''}> {ConverttoCurrency(price)} </p>
                    <p className="text-xl" hidden={discount == 0 || discount == null}> {ConverttoCurrency(CalculatePrice(price, discount))} </p>
                </div>
            </div>
        </>
    )
}