export default function HomeSlideItem({ img_src, first = false}: { img_src: string, first?: boolean }) {
    var classnames = "h-full animate__animated absolute top-[0px]  " + (first ? "opacity-100" : "opacity-0");

    return (
        <>
            <img src={img_src} className={classnames} />
        </>
    )
}