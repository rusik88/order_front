import ButtonComponent from '../../components/ui/ButtonComponent.tsx';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormDataType } from '../../schemas/AuthSchema';
import { useLoginMutation } from '../../services/AuthApi';
import type { IApiAppResponse, IApiErrorData, IApiLoginData } from '../../interfaces/auth/AuthApiInterfaces';
import { setToken } from '../../store/slices/AuthSlice';
import { useDispatch } from 'react-redux';


const LoginPage = () => {
    const [errorForm, setErrorForm] = useState<string>('');
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitted, isValid }
    } = useForm<LoginFormDataType>({
        resolver: zodResolver(loginSchema),
        mode: 'onChange',
        defaultValues: {
            device: 'web',
        },
    });

    const [login, { isLoading }] = useLoginMutation();

    const onSubmit = async (data: LoginFormDataType) => {
        try {
            const res: IApiAppResponse<IApiLoginData> = await login(data).unwrap();
            if(
                (res.data !== undefined && res.data !== null) &&
                (res.data.auth_token !== undefined && res.data.auth_token !== null)
            ) {
                dispatch(setToken(res.data));
            } else {
               throw {
                    data: {
                        message: 'Authentication failed. Please check your credentials and try again.'
                    }
               };
            }
        } catch(err) {
            const err_request = err as IApiErrorData;
            if(err_request.data !== undefined && err_request.data.message !== undefined) {
                setErrorForm(err_request.data.message);
                setTimeout(() => {
                    setErrorForm('');
                }, 2000);
            }
        }
    };

    return (
        <>
            <form action="/" method="POST" onSubmit={handleSubmit(onSubmit)}>
                <div className="w-[600px] rounded-3xl border border-gray-600 bg-gray-300/5 p-10 backdrop-blur-sm shadow-2xl">
                    <h1 className="mb-2 text-center text-4xl font-bold text-white">Login</h1>
                    <p className="mb-6 text-center text-xl text-slate-400">Sign in to your account</p>
                    <div className="mb-5">
                        <label className="mb-3 block text-lg font-medium text-white">Email:</label>
                        <div className="flex items-center rounded-xl border border-white/10 bg-white/5 px-4">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                {...register('email')}
                                className="h-13 w-full bg-transparent text-lg text-white placeholder:text-slate-500 focus:outline-none"
                            />
                        </div>
                        {errors.email && isSubmitted && (
                            <p className="mt-1 text-sm text-red-400">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <div className="mb-5">
                        <label className="mb-3 block text-lg font-medium text-white">Password:</label>
                        <div className="flex items-center rounded-xl border border-white/10 bg-white/5 px-4">
                            <input
                                type="password"
                                placeholder="Enter your password"
                                {...register('password')}
                                className="h-13 w-full bg-transparent text-lg text-white placeholder:text-slate-500 focus:outline-none"
                            />
                        </div>
                        {errors.password && isSubmitted && (
                            <p className="mt-1 text-sm text-red-400">
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                    <input
                        type="hidden"
                        {...register('device')}
                        className="h-13 w-full bg-transparent text-lg text-white placeholder:text-slate-500 focus:outline-none"
                    />
                    <div className="mt-8">
                        <ButtonComponent isDisabled={ isLoading || (isSubmitted && !isValid) } classNames="w-full">Login</ButtonComponent>
                    </div>
                    {errorForm && (
                        <p className="mt-1 text-sm text-red-400">
                            {errorForm}
                        </p>
                    )}
                    <div className="mt-8 mb-3 flex items-center">
                        <div className="h-px flex-1 bg-white/10" />
                        <span className="mx-4 text-slate-400">or</span>
                        <div className="h-px flex-1 bg-white/10" />
                    </div>

                    <p className="text-center text-lg text-slate-400">
                        Don't have an account?
                        <Link to="/register" className="font-semibold text-blue-500 hover:text-blue-400 ml-1">Sign up</Link>
                    </p>
                </div>
            </form>
        </>
    );
};

export default LoginPage;