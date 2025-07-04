export default function CategoryPageHeader({ Type }: { Type: string }) {

    const getImgSrc = () => {
        switch (Type) {
            default:
                return <img src="/build/images/CategoryPage/CategoryPage_Headphones.png" />
            case "Monitores":
                return <img src="/build/images/CategoryPage/CategoryPage_Monitor.png" />
            case "PC":
                return <img src="/build/images/CategoryPage/CategoryPage_PC.png" />
            case "Teclados":
                return <img src="/build/images/CategoryPage/CategoryPage_Keyboard.png" />
            case "Mouses":
                return <img src="/build/images/CategoryPage/CategoryPage_Mouse.png" />
            case "GPU":
                return <img src="/build/images/CategoryPage/CategoryPage_GPU.png" />
        }
    }

    return (
        <div className="relative">
            {getImgSrc()}
            <h2 className="absolute top-1/2 left-1/2 -translate-1/2 text-6xl text-center text-brand-white font-bold">{Type}</h2>
        </div>
    )
}