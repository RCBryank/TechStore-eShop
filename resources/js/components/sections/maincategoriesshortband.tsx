import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import BandItem from "../ui/band-item";

export default function MainCategoryShortBand({ idCategory = 1, imgsrcBand = '/build/images/Misc/BandImg_Default.png', classNames }: { idCategory: number, imgsrcBand?: string, classNames?: any }) {

    type ProductItem = {
        ID: string,
        Name: string,
        Price: number,
        ProductPhoto: string,
        URIProduct: string
    }

    const [BandName, setBandName] = useState('');
    const [ProductsBand, setProductsBand] = useState([]);

    const [CardsInstatiated, setCardsInstiated] = useState([]);

    let _container = document.getElementById("container-band_" + idCategory);
    let _cards = _container?.children;

    useEffect(() => {
        fetch('/producto-categorias/' + idCategory).then(res => res.json()).then((data) => {
            setBandName(data.Name)
        })

        fetch('/popular-by-category/' + idCategory).then(res => res.json()).then((data) => {
            setProductsBand(data);
        })
    }, []);

    document.addEventListener("scroll", (e) => {
        if (_cards != null) {
            for (let _card of _cards) {
                if (_card.classList.contains("animate__slideInUp") == false && isElementInViewport(_card as HTMLElement)) {
                    _card.classList.add("animate__slideInUp");
                }
            }
        }
    });

    function isElementInViewport(element: HTMLElement) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };


    return (
        <>
            <div className="bg-brand-white pb-24">
                <div className="container mx-auto">
                    <div className={classNames}>
                        <div className="flex relative overflow-hidden">
                            <img className="absolute opacity-20 scale-200 right-0" src={imgsrcBand} />
                            <div className="relative flex-2/12">
                                <img className="absolute" src={imgsrcBand} />
                            </div>
                            <div className="flex-10/12 p-6 z-10">
                                <div className="pt-3">
                                    <p className="text-5xl font-centuryghotic mb-4">{BandName}</p>
                                    <div className="mb-4 box-border bg-white hover:bg-gray-100 transition-all duration-100 rounded-4xl inline-block text-center">
                                        <Link href=""><p className="p-3 px-8 ">Ver más</p></Link>
                                    </div>
                                </div>
                                <div id={"container-band_" + idCategory} className="h-48  flex gap-6 overflow-hidden">
                                    {/* Item */}
                                    {ProductsBand.map((product: ProductItem) => {
                                        return <BandItem key={product.ID} name={product.Name} price={product.Price} uriproduct={product.URIProduct} {...(product.ProductPhoto != null ? { productphoto: product.ProductPhoto } : {})} />;
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

/**className="bg-gradient-to-r from-green-400 to-blue-500" 
 * 
 * 
 * 
    
*/