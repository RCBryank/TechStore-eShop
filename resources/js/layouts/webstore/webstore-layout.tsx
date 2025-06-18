import FootBar from "@/components/sections/footbar";
import TopBarLayout from "./topbar-layout";

export default function WebStoreLayout({ children }: (any)) {
    return (
        <>
            <TopBarLayout />
            {children}
            <FootBar/>
        </>
    )
}