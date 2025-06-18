import WebStoreTopBarItem from "./webstore-topbar-item";

export default function WebStoreTopBar() {
    return (
        <>
            <div className="bg-brand-red-lighter h-32 flex">
                <div className="container mx-auto bg-red-50 my-auto flex flex-row">
                    <div className="bg-blue-500 size-16 inline-block my-auto flex-[1]">
                        <img src="/build/images/Logo_TopBar.png" className="md:h-1/2 xl:h-full"/>
                    </div>
                    <div className="bg-blue-200 size-16 inline-block my-auto flex-[1]">
                        <img src="/build/images/Logo_TopBar.png" className="h-full"/>
                    </div>
                </div>
            </div>
        </>
    )
}

/*
    <div className="w-full bg-brand-red-lighter min-h-[80px]">
                <div className="container mx-auto bg-red-100 my-auto flex mb-64">
                    <div className="bg-blue-500 size-16">
                        <img src="/build/images/Logo_TopBar.png"/>
                    </div>
                    <div className="bg-green-500 size-auto">
                        <p>Texto</p>
                    </div>
                </div>
            </div>
*/