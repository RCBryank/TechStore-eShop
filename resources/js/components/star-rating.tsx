export default function StarRating({ totalstars = 5, filled, clickhandler, hideifnoratings = false }: { totalstars?: number, filled: number, clickhandler: Function, hideifnoratings?: boolean }) {
    return (
        <>
            <ul className="flex flex-wrap gap-2 mb-2">
                {
                    filled <= 0 && hideifnoratings ?
                        <><p>Sin Rating</p></>
                        :
                        Array.from(Array(totalstars).fill().map((x, i) => i + 1)).map((item) => {
                            let _delay = "delay-[" + (item * 1200) + "ms]"
                            return (
                                <li key={item} className="cursor-pointer select-none" onClick={() => { clickhandler(item) }}><img className={item <= filled ? 'transition-all duration-300 brightness-100 ' + _delay : 'brightness-0 transition-all duration-300 ' + _delay} src="/build/images/Misc/RateStars_Filled.png" /></li >
                            )
                        })
                }
            </ul>
        </>
    )
}