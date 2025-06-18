import TopBarProfileOptions from "@/components/sections/topbar-profileoptions";
import TopBarSignIn from "@/components/sections/topbar-signin";
import WebStoreNavigationItem from "@/components/ui/webstorenavigation-item";
import WebStoreNavigationSearch from "@/components/webstorenavigation-search";
import { SharedData } from "@/types";
import { Link, usePage } from "@inertiajs/react";

export default function TopBarLayout() {
    const { auth } = usePage<SharedData>().props;

    var username;
    if (auth.user)
        username = auth.user.Name;

    return (
        <>
            <div className="w-full h-18 bg-brand-red-lighter py-2 sticky top-0 z-50">
                <div className="container flex mx-auto h-full justify-between md:px-3 lg:px-6 xl:px-0">
                    <div className="flex-2/3 flex lg:gap-16 md:gap-6">
                        <div className="flex-2/12">
                            <Link href="/"> <img src="/build/images/Logo_TopBar.png" className="object-contain h-full" /></Link>
                        </div>
                        <div className="mt-auto my-auto flex-1/12 text-center">
                            <WebStoreNavigationItem text="Inicio" href="/inicio"></WebStoreNavigationItem>
                        </div>
                        <div className="mt-auto my-auto flex-1/12 text-center">
                            <WebStoreNavigationItem text="Categorias" href=""></WebStoreNavigationItem>
                        </div>
                        <div className="mt-auto my-auto flex-1/12 text-center">
                            <WebStoreNavigationItem text="Ofertas" href=""></WebStoreNavigationItem>
                        </div>
                        <div className="flex-2-6 my-auto flex-7/12 text-center">
                            <WebStoreNavigationSearch></WebStoreNavigationSearch>
                        </div>
                    </div>
                    {auth.user ?
                        <>
                            <div className="flex-1/3 text-right flex justify-end gap-3 p-2">
                                <TopBarProfileOptions />
                            </div>
                        </>
                        :
                        <div className="flex-1/3 text-right flex justify-end">
                            <TopBarSignIn />
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

/*
        <>
            {auth.user ?
                (<div><h3>LOGEADO {username}</h3></div>)
                :
                (<div><h4>No Logeado</h4></div>)}
        </>

        <div className="flex-1/3 text-right flex justify-end gap-3 p-2">
                                <div className="p-2">
                                    <Link href="">
                                        <img src="/build/images/Icon_Cart.png" className="object-fit h-full" />
                                    </Link>
                                </div>
                                <div className="bg-brand-white rounded-4xl overflow-hidden">
                                    <img src="/build/images/Profile_DefaultAvatar.png" className="object-fit h-full" />
                                </div>
                            </div>
                            <div className="absolute">
                            </div>
*/