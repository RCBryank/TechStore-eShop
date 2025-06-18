import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export function LandingPageSignUpLayout({ showModal, hideModal }) {

    type SignUpForm = {
        email: string,
        password: string,
        name: string,
        lastname: string,
        address: string,
        phone: string
    }

    const { data, setData, post, processing, errors, reset } = useForm<Required<SignUpForm>>({
        email: '',
        password: '',
        name: '',
        lastname: '',
        address: '',
        phone: ''
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('signup'), {
            onError: (e) => {
                for (const [key, value] of Object.entries(e)) {
                    alert(`${value}`);
                }
            },
            onFinish: (e) => {
                //console.log(e);
            },
            onSuccess: (e) => {
                alert("Te has registrado con éxito. Puedes iniciar sesión con el email y la contraseña especificados.");
                hideModal();
                reset('email', 'password', 'name', 'lastname', 'address', 'phone');
            }
        });
    };

    return (
        <>
            <div id='div_signup' className='bg-white p-6 rounded-2xl hidden animate__animated animate__fadeInDown'>
                <form onSubmit={submit}>
                    <h3 className='text-center font-bold text-2xl text-brand-black'>Nueva Cuenta</h3>
                    <label className="block my-5">
                        <input value={data.email} onChange={(e) => setData('email', e.target.value)} type="email" name='email' required className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Email" />
                    </label>
                    <label className="block my-5">
                        <input value={data.password} onChange={(e) => setData('password', e.target.value)} type="password" required className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder='Contraseña' />
                    </label>
                    <label className="block my-5">
                        <input value={data.name} onChange={(e) => setData('name', e.target.value)} type="text" maxLength='255' required className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder='Nombres' />
                    </label>
                    <label className="block my-5">
                        <input value={data.lastname} onChange={(e) => setData('lastname', e.target.value)} type="text" maxLength='255' className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder='Apellidos (Opcional)' />
                    </label>
                    <label className="block my-5">
                        <input value={data.address} onChange={(e) => setData('address', e.target.value)} type="text" maxLength='255' className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder='Dirección (Opcional)' />
                    </label>
                    <label className="block my-5">
                        <input value={data.phone} onChange={(e) => setData('phone', e.target.value)} type="text" maxLength='24' className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder='Teléfono (Opcional)' />
                    </label>
                    <p>{errors.email}</p>
                    <div className='flex justify-between'>
                        <button type='button' onClick={hideModal} className='bg-red-500 hover:bg-red-700 text-white font-bold p-3 px-6 rounded-full'> Regresar </button>
                        <button type='submit' className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full'>Registrarse</button>
                    </div>
                </form>
            </div>
        </>
    );
}