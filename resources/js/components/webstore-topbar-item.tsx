export default function WebStoreTopBarItem({ icon = null, iconwidth = 0, text = null }: { icon?: any, iconwidth?: number, text?: any }) {

    function RenderIcon(icon?: string) {
        //const style = {width}

        return icon == null ? '' : <img src={icon} style={{ width: iconwidth }} hidden={icon == null} />;
    }

    function RenderText(text?: string) {
        return text == null ? '' : <p>{text}</p>
    }

    return (
        <>
            <div className="inline-block bg-blue-500">
                {RenderIcon(icon)}
                {RenderText(text)}
            </div>
        </>
    )
}