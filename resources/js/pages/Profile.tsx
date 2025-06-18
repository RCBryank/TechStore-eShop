import ProfileUpdatePassword from "@/components/sections/profile-update-password";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

function Profile(sharedData: any) {

    type FormProfile = {
        Email: string,
        Name: string,
        LastName: any,
        Address: any,
        Phone: any
    }

    const { data, setData, put, processing, errors } = useForm<Required<FormProfile>>({
        Email: sharedData.Profile.Email,
        Name: sharedData.Profile.Name,
        LastName: sharedData.Profile.LastName ? sharedData.Profile.LastName : '',
        Address: sharedData.Profile.Address ? sharedData.Profile.Address : '',
        Phone: sharedData.Profile.Phone ? sharedData.Profile.Phone : '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('profile-update'), {
            onSuccess: (e) => {
                alert("Su información se ha actualizado");
            }/*,
            onFinish: (e) => {
                console.log(e);
            }*/
        })
    };

    return (
        <>
            <div className="container mx-auto">
                <div className="my-12">
                    <div className="my-6">
                        <form onSubmit={submit}>
                            <h1 className="text-4xl text-center">Perfil</h1>
                            <div className="flex flex-wrap">
                                <div className="w-full">
                                    <div className="w-3/12 p-2">
                                        <label>
                                            Email
                                            <input type="text" required value={data.Email} onChange={(e) => setData("Email", e.target.value)} name='email' className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" />
                                        </label>
                                    </div>
                                </div>
                                <div className="w-6/12 p-2">
                                    <label>
                                        Nombre(s)
                                        <input type="text" required value={data.Name} onChange={(e) => setData("Name", e.target.value)} name='text' className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" />
                                    </label>
                                </div>
                                <div className="w-6/12 p-2">
                                    <label>
                                        Apellidos
                                        <input type="text" value={data.LastName} onChange={(e) => setData("LastName", e.target.value)} name='text' className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" />
                                    </label>
                                </div>
                                <div className="w-6/12 p-2">
                                    <label>
                                        Direccion
                                        <input type="text" value={data.Address} onChange={(e) => setData("Address", e.target.value)} name='text' className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" />
                                    </label>
                                </div>
                                <div className="w-6/12 p-2">
                                    <label>
                                        Telefono
                                        <input type="text" value={data.Phone} onChange={(e) => setData("Phone", e.target.value)} name='text' className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" />
                                    </label>
                                </div>
                            </div>
                            <div className="justify-end my-6">
                                <button type='submit' className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full'>Guardar</button>
                            </div>
                        </form>
                    </div>
                    <ProfileUpdatePassword />
                </div>
            </div>
        </>
    )
}

export default Profile;