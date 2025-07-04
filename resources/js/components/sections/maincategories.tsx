import { Link } from "@inertiajs/react";
import MainCategoryCard from "../ui/maincategory-card";

export default function MainCategories() {
    return <>
        <div className="w-full bg-brand-white py-40">
            <div className="container mx-auto">
                <div className="flex w-full p-5 flex-row justify-evenly flex-wrap ">
                    <MainCategoryCard name="Monitores" href="/monitores" icon="build/images/Categories/Category_Monitor.png" />
                    <MainCategoryCard name="PC" href="/pc" icon="build/images/Categories/Category_PC.png" />
                    <MainCategoryCard name="Mouse" href="/mouses" icon="build/images/Categories/Category_Mouse.png" />
                    <MainCategoryCard name="Audifonos" href="/audifonos" icon="build/images/Categories/Category_Headphones.png" />
                    <div className="h-28" style={{ flexBasis: '100%' }}></div>
                    <MainCategoryCard name="Teclados" href="/teclados" icon="build/images/Categories/Category_Keyboard.png" />
                    <MainCategoryCard name="GPU" href="/gpu" icon="build/images/Categories/Category_GPU.png" />
                </div>
                <div className="py-16 flex justify-center">
                    <Link href=""><p className="rounded-4xl bg-brand-red-lighter hover:bg-brand-darkred transition-all duration-200  text-brand-white px-12 py-4 font-centuryghotic">Ver más</p></Link>
                </div>
            </div>
        </div>
    </>
}