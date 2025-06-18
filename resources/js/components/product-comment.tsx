import { ConvertoDateTimeFormat } from "@/hooks/use-datetimeformat";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useRef } from "react";

export default function ProductComment({ deletefunction, idcomment, message, username, date, isauth, profilepicture }: { deletefunction: Function, idcomment: number, message: string, username: string, date: string, isauth: boolean, profilepicture?: string }) {

    const myRef = useRef(null);

    type FormData = {
        IDComment: number
    }

    const { data, setData, post, processing, errors, reset } = useForm<Required<FormData>>({
        IDComment: idcomment
    });

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();


        post(route('delete-comment'), {
            preserveScroll: true,
            onSuccess: (response) => {
                if (myRef.current != null) {
                    const _htmlelement = myRef.current as HTMLElement;
                    _htmlelement.classList.add("animation-collapse");
                };
                setTimeout(() => {
                    deletefunction(idcomment);
                }, 600);
            }
        })
    }

    return (
        <>
            <div ref={myRef} className='flex grow-0'>
                <div className='flex-[80px]'>
                    <div className='bg-white rounded-2xl aspect-square p-2'>
                        <img src='/build/images/Logo.png' className='w-full h-full object-contain'></img>
                    </div>
                </div>
                <div className='flex-11/12 px-6'>
                    <div>
                        <p className='text-sm inline-block'>{username} comento el {ConvertoDateTimeFormat(date)}:</p>
                        {isauth ?
                            <form onSubmit={onSubmit} className="inline-block">
                                <button type="submit" className="mx-6 text-sm cursor-pointer text-red-400">Eliminar</button>
                            </form>
                            :
                            ''
                        }
                    </div>
                    <p>{message}</p>
                </div>
            </div>
        </>
    )
}