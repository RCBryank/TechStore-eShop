export default function Pagination({ TotalPages = 0, CurrentPage = 0, clickHandler }: { TotalPages: number, CurrentPage: number, clickHandler: Function }) {
    return (
        <>
            <div className='flex justify-center'>
                {
                    Array.from(Array(TotalPages).fill().map((x, i) => i + 1)).map((item) => {
                        if (TotalPages >= 5 && item == 1) {
                            return <p onClick={(e) => clickHandler(item)} className={'cursor-pointer px-1 select-none hover:text-red-700 ' + (item == CurrentPage ? 'text-red-900 font-bold' : '')}>{item}... </p>
                        }
                        else if (TotalPages >= 5 && item == TotalPages) {
                            return <p onClick={(e) => clickHandler(item)} className={'cursor-pointer px-1 select-none hover:text-red-700 ' + (item == CurrentPage ? 'text-red-900 font-bold' : '')}> ...{item}</p>
                        } else if (item == CurrentPage) {
                            return <p onClick={(e) => clickHandler(item)} className={'cursor-pointer px-1 select-none hover:text-red-700 ' + (item == CurrentPage ? 'text-red-900 font-bold' : '')}>{item}</p>
                        }
                        else if ((item == (CurrentPage - 1) || item == (CurrentPage + 1)) || (CurrentPage < 3 && item < 5) || (CurrentPage > (TotalPages - 3) && item > (TotalPages - 4))) {
                            return <p onClick={(e) => clickHandler(item)} className="cursor-pointer select-none px-1 hover:text-red-700 ">{item}</p>
                        }

                    })
                }
            </div>
        </>
    )
}