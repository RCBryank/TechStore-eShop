import { Children, useEffect, useState } from "react";

export default function HomeSlideContainer({ children }: { children: any }) {

    const [SelectedIndexSlide, setSelectedIndexSlide] = useState(0);

    const container = document.getElementById("slidescontainer");

    const arrayChildren = Children.toArray(children);

    useEffect(() => {
        Slide_Index(SelectedIndexSlide);
    }, [SelectedIndexSlide]);

    function Slide_Index(index: number) {
        const slides = container?.children;
        if (slides) {
            let i = 0;
            for (let elem of slides) {
                if (i == index) {
                    //elem.removeAttribute("hidden");
                    elem.classList.add("animate__fadeIn");
                    elem.classList.remove("animate__fadeOut");
                }
                else {
                    //elem.setAttribute("hidden", 'true');
                    if (elem.classList.contains("animate__fadeIn"))
                        elem.classList.add("animate__fadeOut");
                    elem.classList.remove("animate__fadeIn");
                }
                i++;
            }
        }
    }

    return (
        <>
            <div className="w-full h-[640px] bg-blue-700 overflow-hidden relative">
                {/* Container Slides */}
                <div id="slidescontainer" className="relative h-full box-border">
                    {children}
                </div>
                {/* Container Buttons */}
                <div className="absolute bottom-12 left-6/12 flex p-2 gap-4">
                    {Children.map(arrayChildren, (child, index) => {
                        return <div className={"rounded-4xl bg-white h-6 w-6 cursor-pointer " + (SelectedIndexSlide == index ? "opacity-100" : "opacity-50")} onClick={() => setSelectedIndexSlide(index)} />
                    })}
                </div>
            </div>
        </>
    )
}