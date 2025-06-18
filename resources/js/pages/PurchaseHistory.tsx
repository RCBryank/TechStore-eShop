import ButtonPagination from "@/components/ui/button-pagination";
import { useEffect, useState } from "react";

export default function PurchaseHistory() {

    var [ListItems, setListItems] = useState([]);
    var [SelectPages, setSelectPages] = useState([]);
    var [SelectedPageIndex, setSelectedPageIndex] = useState(1);

    const renderlistitems = ListItems.map((option) => { return option; })

    useEffect(() => {
        fetch(route('get-purchasehistory-paginated', SelectedPageIndex)).then(response => response.json()).then(function (data){
            ReadListItems(data.List);
            ReadPagesList(data.lastPage);
        });
    }, [SelectedPageIndex])/**/

    function ReadListItems(list: []) {
        const rows = [];
        for (var i = 0; i < list.length; i++) {
            let item = list[i];
            let _element = <li key={item.ID}>
                <div className="grid grid-cols-4">
                    <div>
                        {item.Name}
                    </div>
                    <div>
                        ${item.PriceUnitProduct}
                    </div>
                    <div>
                        Cantidad: {item.Quantity}
                    </div>
                    <div>
                        {item.DatePurchase}
                    </div>
                </div>
            </li>
            rows.push(_element);
        }

        setListItems(rows);
    }

    function ReadPagesList(lastPage: any) {
        const rows = [];
        for (var i = 0; i < lastPage; i++) {
            rows.push(i);
        }

        setSelectPages(rows);
    };

    function PaginationClick(e: HTMLElement, page: any) {
        setSelectedPageIndex(page);
    }

    return (
        <>
            <div className="container mx-auto">
                <div className="my-12 p-6 bg-gray-100 rounded-2xl">
                    <h1 className="text-4xl text-center">Historial de Compras</h1>
                    <ul className="list-none my-12">
                        {renderlistitems}
                    </ul>
                    <div>
                        <ul className="flex flex-wrap items-center justify-center gap-2">
                            {SelectPages.map((option) => {
                                return <li key={option}><ButtonPagination text={option + 1} page={option + 1} indexactive={option + 1 == SelectedPageIndex} onClick={PaginationClick} /></li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}