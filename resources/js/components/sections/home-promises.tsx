export default function HomePromises() {
    return (
        <>
            <div className="bg-brand-white py-64">
                <div style={{ background: "linear-gradient(90deg,rgba(163, 19, 18, 1) 51%, rgba(142, 13, 12, 1) 51%)" }}>
                    <div className="container mx-auto h-[600px]">
                        <div className="flex h-full align-middle">
                            <div className="flex-1/3 text-center flex flex-col justify-end py-30" style={{ backgroundColor: "#a31312" }}>
                                <img src="build/images/HomePromises/Protegemostuscompras.png" className="mx-auto scale-[80%] flex-2/3" />
                                <h3 className="flex-1/3 text-2xl text-brand-white font-centuryghotic font-bold tracking-wide" style={{ textShadow: "rgb(0 0 0 / 41%) 0px 0px 20px" }}> Protegemos todas <br /> tus compras </h3>
                            </div>
                            <div className="flex-1/3 text-center flex flex-col justify-end py-30" style={{ backgroundColor: "#990f0e" }}>
                                <img src="build/images/HomePromises/MejoresOfertas.png" className="flex-auto scale-[80%]" />
                                <h3 className="text-2xl text-brand-white font-centuryghotic font-bold tracking-wide" style={{ textShadow: "rgb(0 0 0 / 41%) 0px 0px 20px" }}> Encuentra las <br /> mejores ofertas </h3>
                            </div>
                            <div className="flex-1/3 text-center flex flex-col justify-end py-30" style={{ backgroundColor: "#8d0d0c" }}>
                                <img src="build/images/HomePromises/Garantia.png" className="mx-auto scale-[80%]" />
                                <h3 className="flex-1/3 text-2xl text-brand-white font-centuryghotic font-bold tracking-wide" style={{ textShadow: "rgb(0 0 0 / 41%) 0px 0px 20px" }}> Garantia de calidad en <br /> todos nuestros productos </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}