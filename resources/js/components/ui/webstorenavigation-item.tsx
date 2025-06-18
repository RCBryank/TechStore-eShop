import { Link } from "@inertiajs/react";

export default function WebStoreNavigationItem({ text, href }: { text: string, href: string }) {

    return (
        <>
                <Link href={href} className="text-brand-white font-centuryghotic"> {text} </Link>
        </>
    )
}