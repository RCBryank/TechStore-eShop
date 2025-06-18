import { MouseEventHandler, useEffect, useState } from "react";

export default function ButtonPagination({ text, page, indexactive, onClick }) {

    return (<>
        <label className={`bg-gray hover:bg-red-700 focus:bg-red-950 text-white font-bold py-2 px-4 rounded-full ${indexactive == true ? "bg-red-500" : "bg-red-950"}`}> {text}
            <input type="radio" name="pagination" onClick={(e) => { onClick(e.target, page); }} className='hidden' />
        </label>
    </>)
}