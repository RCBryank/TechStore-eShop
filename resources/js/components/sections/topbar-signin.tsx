import { useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";


export default function TopBarSignIn() {
    type LoginForm = {
        email: string,
        password: string
    }

    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: ''
    });

    const [PopUpVisibility, setPopUpVisibility] = useState(true);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('attemptlogin'), {
            onSuccess: (data) => {
            }
        })
    };

    function CheckAppClick(e: any) {
        const divpopup = document.getElementById("divSignInPopUp");
        if (e.target != divpopup) {
            if (divpopup?.contains(e.target))
                return;
            ShowSignInPopUp(false);
        }
    }

    function ShowSignInPopUp(show: boolean) {
        setPopUpVisibility(!show);

        const divapp = document.getElementById("app");
        if (show) {
            divapp?.addEventListener("click", CheckAppClick)
        } else {
            divapp?.removeEventListener("click", CheckAppClick);
        }
    }

    return (
        <>
            <div className="relative my-auto z-50">
                <p className="text-brand-white font-centuryghotic cursor-pointer" onClick={() => ShowSignInPopUp(true)}> Iniciar Sesión </p>
                <div id="divSignInPopUp" className="absolute right-0 top-0 bg-white border-1 rounded-2xl w-96 h-64 p-6" hidden={PopUpVisibility}>
                    <form onSubmit={(submit)}>
                        <h3 className='text-center font-bold text-2xl text-brand-black'>Inicia sesión</h3>
                        <label className="block my-5">
                            <input value={data.email} onChange={(e) => setData('email', e.target.value)} type="email" name='email' className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Email" />
                        </label>
                        <label className="block my-5">
                            <input value={data.password} onChange={(e) => setData('password', e.target.value)} type="password" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder='Contraseña' />
                        </label>
                        <p>{errors.email}</p>
                        <div className='flex justify-center'>
                            <button type='submit' className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full'>Iniciar Sesion</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}