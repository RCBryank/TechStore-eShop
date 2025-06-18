import { SharedData } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import { FormEventHandler, useEffect, useState } from "react";
import StarRating from "../star-rating";

export default function ProductViewAuthRating({ idproduct }: { idproduct: number }) {

    type FormData = {
        ID_Product: number,
        Rating: number
    }

    const page = usePage<SharedData>();
    const { auth } = page.props;

    const [CanRate, setCanRate] = useState(false);

    useEffect(() => {
        fetch("/canrate/" + idproduct).then(response => response.json()).then(data => {
            setCanRate(data.Validated);
            if (data.Validated) {
                fetch('/getauthproductrated/' + idproduct).then(response => response.json()).then(data => {
                    setData("Rating", data.Rating);
                })
            }
        })
    }, []);

    const { data, setData, post, processing, errors, reset } = useForm<Required<FormData>>({
        ID_Product: idproduct,
        Rating: 1
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('rate-product'), {
            preserveScroll: true,
            onSuccess: (data) => {
                alert("Gracias por calificar este producto");
            }
        })
    }

    return CanRate ?
        (
            <>
                <div className='mb-20'>
                    <p className='mb-6'>Califica este producto</p>
                    <StarRating filled={data.Rating} clickhandler={(item: any) => { setData("Rating", item); }} />
                    {/* {<ul className="flex flex-wrap gap-2 mb-2">
                        {Array.from(Array(5).fill().map((x, i) => i + 1)).map((item) => {
                            return (
                                <li key={item} className="cursor-pointer select-none" onClick={() => { setData("Rating", item) }}><img className={item <= data.Rating ? 'transition-all duration-300 brightness-100' : 'brightness-0'} src="/build/images/Misc/RateStars_Filled.png" /></li >
                            )
                        })
                        }
                    </ul>} */}
                    <form onSubmit={submit}>
                        <button className='bg-brand-red-lighter cursor-pointer p-2 px-3 rounded-sm text-brand-white hover:bg-brand-darkred'>Envia tu calificación</button>
                    </form>
                </div>
            </>
        ) :
        <>
            <div className='mb-20'>
                <p className='mb-6'>Podrás calificar este producto una vez lo hayas comprado</p>

            </div>
        </>
}