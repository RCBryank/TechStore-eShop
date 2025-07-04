import { Link } from "@inertiajs/react";

export default function MainCategoryCard({ name, icon, href }: ({ name: string, icon?: string, href: string })) {
    return (<>
        <div className="rounded-2xl border-black w-64 h-64 overflow-hidden relative hover:-translate-y-2 transition-all duration-300 ease-in-out cursor-pointer">
            <Link href={href}>
                {icon ?
                    <img src={icon} className="absolute saturate-50 brightness-50 hover:saturate-100 hover:brightness-100 hover:scale-105 transition-all duration-500 ease-in-out"></img>
                    :
                    ''}

                <div className="bg-[#00000066] absolute bottom-6 w-full pointer-events-none">
                    <p className=" text-brand-white font-centuryghotic text-2xl w-full text-center">{name}</p>
                </div>
            </Link>
        </div>
    </>)
}