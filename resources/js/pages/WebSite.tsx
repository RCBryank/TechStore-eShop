import { BodyWrapper } from "@/components/bodywrapper";
import WebStoreTopBar from "@/components/webstore-topbar";
import WebStoreLayout from "@/layouts/webstore/webstore-layout";
import { SharedData } from "@/types";
import { usePage } from "@inertiajs/react";


/*
export default function WebSite() {
    return (
        <>
            <WebStoreLayout>
                <h3 className="text-5xl">Home</h3>
            </WebStoreLayout>
        </>
    )
}*/
const BuiltWebsite = () => {

    return (
        <>
            <h3 className="text-5xl">Home</h3>
        </>
    )
}

BuiltWebsite.layout = (page: Function) => <WebStoreLayout children={page}></WebStoreLayout>

export default BuiltWebsite;
/*
*/
//- TopBar
//- Content
//- Footbar