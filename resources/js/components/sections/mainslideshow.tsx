import { useEffect, useState } from "react";
import HomeSlideItem from "../ui/home-slideitem";
import HomeSlideContainer from "../home-slidecontainer";

export default function MainSlideShow() {

    return (
        <>
            <HomeSlideContainer>
                <HomeSlideItem img_src="build/images/Slideshow/Slideshow_1.png" first={true}></HomeSlideItem>
                <HomeSlideItem img_src="build/images/Slideshow/Slideshow_2.png"></HomeSlideItem>
                <HomeSlideItem img_src="build/images/Slideshow/Slideshow_3.png"></HomeSlideItem>
            </HomeSlideContainer>
        </>
    )
}

/*{SlideItems.map((slide: any) => { return <HomeSlideItem img_src={slide}></HomeSlideItem>   })}*/
/**
 * 
 * 
 * 
                    <img src="build/images/Slideshow/Slideshow_1.png" className="w-full animate__animated absolute" />
                    <img src="build/images/Slideshow/Slideshow_2.png" className="w-full animate__animated opacity-0 absolute" />
                    <img src="build/images/Slideshow/Slideshow_3.png" className="w-full animate__animated opacity-0 absolute" />
 */