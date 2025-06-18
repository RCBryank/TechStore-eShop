import { BodyWrapper } from "@/components/bodywrapper";
import WebStoreTopBar from "@/components/webstore-topbar";
import { SharedData } from "@/types";
import { usePage } from "@inertiajs/react";
import WebStoreLayout from "@/layouts/webstore-layout";


/*
export default function WebSite2() {
    return (
        <>
            <WebStoreLayout>
                <h3 className="text-5xl">Home 2</h3>
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