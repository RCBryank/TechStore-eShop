import { Head, Link, usePage } from '@inertiajs/react';
import { AppButtonPrimary } from '@/components/app-button-primary';
import { BodyWrapper } from '@/components/bodywrapper';
import WebStoreLayout from '@/layouts/webstore/webstore-layout';
import MainSlideShow from '@/components/sections/mainslideshow';
import MainCategories from '@/components/sections/maincategories';
import MainCategoryShortBand from '@/components/sections/maincategoriesshortband';
import HomePromises from '@/components/sections/home-promises';
import HomeMostSold from '@/components/sections/home-mostsold';

const Home = () => {

    return (
        <>
            <MainSlideShow />
            <MainCategories />
            <MainCategoryShortBand idCategory={4} classNames={"bg-gradient-to-r from-green-400 to-blue-500"} imgsrcBand='build/images/HomeShortBand/Category_Headphones.png' />
            <MainCategoryShortBand idCategory={2} classNames={"bg-gradient-to-r from-red-500 to-orange-500"} />

            <HomePromises />
            <HomeMostSold />
        </>
    )
}

Home.layout = (page: Function) => <WebStoreLayout children={page}></WebStoreLayout>

export default Home;

/*<MainCategoryShortBand idCategory={3} classNames={"bg-gradient-to-r from-yellow-500 to-green-300"}/>
}*/