import { ConverttoCurrency } from "@/hooks/use-currencyformat";
import { Link } from "@inertiajs/react";

export default function SearchResultItem({ productname, price, brandname, uriproduct, productphoto }: { productname: string, price: number, brandname: string, uriproduct: string, productphoto: string }) {
    return (
        <>
            <Link href={uriproduct}>
                <div className="flex py-3 border-b-1 border-b-gray-300 max-h-64">
                    <div className="flex-2/12 inline-block self-center">
                        <img src={productphoto} className="w-full h-full aspect-square object-contain" />
                    </div>
                    <div className="flex-10/12 inline-block h-full align-top py-2 pl-4">
                        <div className="flex flex-wrap grow-0 justify-between">
                            <p className="flex-4/6">{productname}</p>
                            <ul className="flex-2/6 flex flex-wrap items-center justify-center gap-2 self-start">
                                <li className="cursor-pointer"><img src="/build/images/Misc/RateStars.png" /></li>
                                <li className="cursor-pointer"><img src="/build/images/Misc/RateStars.png" /></li>
                                <li className="cursor-pointer"><img src="/build/images/Misc/RateStars.png" /></li>
                                <li className="cursor-pointer"><img src="/build/images/Misc/RateStars.png" /></li>
                                <li className="cursor-pointer"><img src="/build/images/Misc/RateStars.png" /></li>
                            </ul>
                        </div>
                        <p className="text-2xl">{ConverttoCurrency(price)}</p>
                        <p className="mb-2 text-sm">{brandname}</p>
                        <div className="flex flex-wrap mb-2 gap-1">
                            <div className="cursor-pointer rounded-2xl bg-brand-white border-1 border-gray-300 p-1 px-2 text-sm">
                                Inalambrico
                            </div>
                            <div className="cursor-pointer rounded-2xl bg-brand-white border-1 border-gray-300 p-1 px-2 text-sm">
                                Luces RGB
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}