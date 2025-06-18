import { Link } from "@inertiajs/react";

export default function FootBar() {
    return (
        <>
            <div className="bg-brand-black">
                <div className="container mx-auto">
                    <div className="flex grow-0 pt-12 pb-9 gap-12">
                        <div className="self-end flex">
                            <img src="/build/images/Logo.png" className="object-scale-down inline-block w-16 mt-auto" />
                        </div>
                        <div className="flex-7/12 flex justify-between">
                            <Link href="" className="mt-auto"><p className="text-gray-500 text-sm">Trabaja con nosotros</p></Link>
                            <Link href="" className="mt-auto"><p className="text-gray-500 text-sm">Términos y condiciones</p></Link>
                            <Link href="" className="mt-auto"><p className="text-gray-500 text-sm">Promociones</p></Link>
                            <Link href="" className="mt-auto"><p className="text-gray-500 text-sm">Como cuidarnos tu privacidad</p></Link>
                            <Link href="" className="mt-auto"><p className="text-gray-500 text-sm">Accesibilidad</p></Link>
                            <Link href="" className="mt-auto"><p className="text-gray-500 text-sm">Ayuda</p></Link>
                            <Link href="" className="mt-auto"><p className="text-gray-500 text-sm">Programa de afiliados</p></Link>
                        </div>
                        <div className="flex-1/12 flex justify-end">
                            <p className="text-gray-600 self-end">Brayan HRC</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}