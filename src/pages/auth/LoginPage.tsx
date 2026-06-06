import ButtonComponent from '../../components/ui/ButtonComponent.tsx';
import { Link } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormDataType } from '../../schemas/AuthSchema';

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitted, isValid }
    } = useForm<LoginFormDataType>({
        resolver: zodResolver(loginSchema),
        mode: 'onChange'
    });

    const onSubmit = async (data: LoginFormDataType) => {
        console.log(data);


    };

    console.log("Test", isSubmitted);

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
                    <div className="mt-8">
                        <ButtonComponent isDisabled={ isSubmitting || (isSubmitted && !isValid) }>Login</ButtonComponent>
                    </div>
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