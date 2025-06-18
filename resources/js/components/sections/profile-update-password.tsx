import { useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect, useState } from "react";

function ProfileUpdatePassword() {

    const [NewPassword, SetNewPassword] = useState('');
    const [ConfirmationPassword, SetConfirmationPassword] = useState('');
    const [DisabledState, setDisabledState] = useState(true);

    useEffect(() => {
        ValidatePassword(NewPassword, ConfirmationPassword);
    }, [NewPassword, ConfirmationPassword]);

    function ValidatePassword(password1: string, password2: string) {
        let _validated = password1.trim() != '' && password2.trim() != '' && password1 == password2;
        let _disabled = !_validated;

        setDisabledState(_disabled);
        if (_validated)
            setData("NewPassword", password1);
    }

    const { data, setData, put, processing, errors, reset } = useForm({
        NewPassword: ''
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('password-update'), {
            onSuccess: (e) => {
                alert("Tu contraseña se ha actualizado exitosamente");
            }
        })
    };

    return (
        <>
            <div>
                <h1 className="text-2xl text-center">Actualizar Contraseña</h1>
                <form onSubmit={submit}>
                    <div className="grid grid-cols-2 gap-6 my-3 w-6/12 mx-auto">
                        <div>
                            <label>
                                Nueva Contraseña
                                <input type="password" onChange={(e) => { SetNewPassword(e.target.value); }} required className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" />
                            </label>
                        </div>
                        <div>
                            <label>
                                Repite tu nueva Contraseña
                                <input type="password" onChange={(e) => { SetConfirmationPassword(e.target.value); }} required className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" />
                            </label>
                        </div>
                    </div>
                    <div className="w-6/12 text-right mx-auto">
                        <p className="text-red-400" hidden={!DisabledState}>Las contraseñas no coinciden o no han sido llenadas adecuadamente</p>
                        <button type='submit' className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full disabled:bg-red-300' disabled={DisabledState}>Establecer nueva Contraseña</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ProfileUpdatePassword;
