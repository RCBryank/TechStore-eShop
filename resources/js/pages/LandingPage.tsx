import { Head, useForm } from '@inertiajs/react';
import { AppButtonPrimary } from '@/components/app-button-primary';
import { FormEventHandler } from 'react';
import { LandingPageSignUpLayout } from '@/layouts/app/landingpage-signup-layout';
import { Link } from '@inertiajs/react';
import { BodyWrapper } from '@/components/bodywrapper';

export default function LandingPage() {
    /*async function LoginAttempt(formData) {
        'use server'
        const email = formData.get("email");
        const password = formData.get("password");
    }*/

    /*
const xhr = new XMLHttpRequest();
xhr.open('GET', '/sanctum/csrf-cookie');
xhr.onload = function () {
    console.log(xhr.status);
    if (xhr.status === 200) {
        console.log(JSON.parse(xhr.responseText));
    }
};
xhr.send();*/

    type LoginForm = {
        email: string,
        password: string,
    }

    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('attemptlogin'), {
            onFinish: () => { setData('password', '') },
        });/**/
        /*post(route('signup'), {});*/
    };

    function ShowSignUpModal() {
        document.getElementById("div_signin")?.classList.add('hidden');
        document.getElementById("div_signup")?.classList.remove('hidden');
    }

    function ShowSignInModal() {
        document.getElementById("div_signup")?.classList.add('hidden');
        document.getElementById("div_signin")?.classList.remove('hidden');
    }

    return (
        <>
            <Head title="Tech Store" key="landing-page">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <BodyWrapper URI="LandingPage">
                <div className='container h-screen flex flex-wrap justify-center mx-auto'>
                    <div className='bg-brand-darkred h-auto sm:h-full flex w-12/12 sm:w-3/12 md:w-6/12'>
                        <div className='align-middle mx-auto my-auto'>
                            <img className='w-4/12 sm:w-8/12 mx-auto' src='build/images/Logo.png' />
                            <p className='my-18 text-center text-2xl text-brand-cream'>Lo ultimo en tecnologia <br /> con los mejores precios</p>
                        </div>
                    </div>
                    <div className='h-full w-2/12 hidden sm:inline-flex'>
                        <img src="build/images/LandingPage_Separator.png" className='h-full'></img>
                    </div>
                    <div className='bg-brand-cream py-8 px-8 sm:py-0 sm:px-0 sm:my-auto w-12/12 sm:w-5/12 md:w-4/12 p-0 sm:p-0 md:p-7'>
                        <div id='div_signin' className='bg-white p-6 rounded-2xl animate__animated animate__fadeInDown'>
                            <div>
                                <form onSubmit={submit}>
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
                            <div className='my-5'>
                                <p className='text-center'>Si no tienes una cuenta puedes crear una <button onClick={ShowSignUpModal} className='bg-red-500 hover:bg-red-700 text-white font-bold px-4 rounded-full'> aqui </button> </p>
                            </div>
                            <div className='my-5'>
                                <p className='text-center'>o continua haciendo clic <Link href='/inicio' className='bg-red-500 hover:bg-red-700 text-white font-bold px-4 rounded-full'> aqui </Link> </p>
                            </div>
                        </div>
                        <LandingPageSignUpLayout showModal={null} hideModal={ShowSignInModal} />
                    </div>
                </div>
            </BodyWrapper>
        </>
    );
}

// <body className='bg-gradient-to-r from-brand-darkred from-60% to-brand-cream to-60%'>

/*
     <div className='container h-screen flex justify-center mx-auto'>
                <div className='bg-brand-darkred h-full sm:w-full md:w-6/12 lg:w-6/12 flex'>
                    <div className='align-middle mx-auto my-auto'> 
                        <img className='w-8/12 mx-auto' src='build/images/Logo.png' />
                        <p className='my-18 text-center text-2xl text-brand-cream'>Lo ultimo en tecnologia <br/> con los mejores precios</p>
                    </div>
                </div>
                <div className='h-full sm:w-12/12 md:w-2/12'>
                    <img src="build/images/LandingPage_Separator.png" className='h-full'></img>
                </div>
                <div className='bg-brand-cream md:w-4/12 flex flex-col my-auto md:mx-12'>
                    <div className='bg-blue-200 p-6 rounded-2xl'>
                        <div>
                            <form onSubmit={submit}>
                                <label className="block my-5">
                                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                                        Email
                                    </span>
                                    <input value={data.email} onChange={(e) => setData('email', e.target.value)} type="email" name='email' className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="you@example.com" />
                                </label>
                                <label className="block my-5">
                                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                                        Password
                                    </span>
                                    <input value={data.password} onChange={(e) => setData('password', e.target.value)} type="password" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" />
                                </label>
                                <p>{errors.email}</p>
                                <br />
                                <div className='flex justify-end'>
                                    <button type='submit' className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full'>Iniciar Sesion</button>
                                </div>
                            </form>
                        </div>
                        <div className='justify-center my-2'>
                            <p className='justify-self-center'>o</p>
                        </div>
                        <div className='justify-center mx-auto'>
                            <AppButtonPrimary texto="Click aqui para seguir sin iniciar sesión"></AppButtonPrimary>
                        </div>
                    </div>
                </div>
            </div>
*/

/*
<div className='h-full overflow-hidden absolute sm:left-4/12 md:left-6/12 bg-gradient-to-r from-brand-darkred from-60% to-brand-cream to-60%'>
                <img src="build/images/LandingPage_Separator.png" className='h-full'></img>
            </div>
            <div className="container mx-auto h-screen grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-2">
                <div className='sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1 bg-amber-400 mr-64'>
                    <div className='bg-amber-100 h-full'>
                        <img className='size-24' src='build/images/Logo.png'/>
                    </div>
                </div>
                <div className='flex sm:col-span-1 md:col-span-2 lg:col-span-1 xl:col-span-1'>
                    <div className='flex flex-col m-auto bg-amber-200 p-5 animate__animated animate__backInDown '>
                        <div className='bg-amber-50 '>
                            <form onSubmit={submit}>
                                <label className="block my-5">
                                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                                        Email
                                    </span>
                                    <input value={data.email} onChange={(e) => setData('email', e.target.value)} type="email" name='email' className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="you@example.com" />
                                </label>
                                <label className="block my-5">
                                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                                        Password
                                    </span>
                                    <input value={data.password} onChange={(e) => setData('password', e.target.value)} type="password" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" />
                                </label>
                                <p>{errors.email}</p>
                                <br />
                                <div className='flex justify-end'>
                                    <button type='submit' className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full'>Iniciar Sesion</button>
                                </div>
                            </form>
                        </div>
                        <div className='justify-center my-2'>
                            <p className='justify-self-center'>o</p>
                        </div>
                        <div className='justify-center mx-auto'>
                            <AppButtonPrimary texto="Click aqui para seguir sin iniciar sesión"></AppButtonPrimary>
                        </div>
                    </div>
                </div>
            </div>
*/