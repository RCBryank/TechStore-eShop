import { ConverttoCurrency } from "@/hooks/use-currencyformat";
import { Link } from "@inertiajs/react";
import StarRating from "../star-rating";

export default function SearchResultItem({ productname, price, brandname, avgrating = 0, uriproduct, productphoto, tags = [] }: { productname: string, price: number, brandname: string, avgrating: number, uriproduct: string, productphoto: string, tags: [] }) {
    type ProductTag = {
        ID: number,
        Name: string
    }

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
                            <StarRating filled={avgrating} clickhandler={() => { }} hideifnoratings={true} />
                        </div>
                        <p className="text-2xl">{ConverttoCurrency(price)}</p>
                        <p className="mb-2 text-sm">{brandname}</p>
                        <div className="flex flex-wrap mb-2 gap-1">
                            {tags.map((item: ProductTag) => {
                                return (<div key={item.ID} className="cursor-pointer rounded-2xl bg-brand-white border-1 border-gray-300 p-1 px-2 text-sm">
                                    {item.Name}
                                </div>)
                            })}
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}