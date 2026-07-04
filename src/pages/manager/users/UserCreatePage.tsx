import { useAppDispatch } from '../../../store/hooks.ts';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type UserCreateFormData, userCreateFormSchema } from '../../../schemas/UsersSchema';
import { useGetRolesQuery } from '../../../services/RolesApi.ts';
import type { IApiAppResponse, IApiErrorData } from '../../../interfaces/common/ApiAppInterfaces.ts';
import type { IRoleItem, IRoleResponseData } from '../../../interfaces/manager/RolesInterfaces.ts';
import { hideAlert, showAlert } from '../../../store/slices/AlertSlice.ts';
import type { IUserData } from '../../../interfaces/manager/UsersInterfaces.ts';
import type { ISelectOption } from '../../../interfaces/ui/ElementsInterface.ts';
import {useEffect, useMemo} from 'react';
import LoaderComponent from '../../../components/common/LoaderComponent.tsx';
import ButtonComponent from '../../../components/ui/ButtonComponent.tsx';
import { fullLink } from '../../../functions/helperFunctions.ts';
import { ENTITY_ROUTES } from '../../../router/routes.ts';
import { InputComponent } from '../../../components/ui/form/InputComponent.tsx';
import SelectComponent from '../../../components/ui/form/SelectComponent.tsx';
import { useCreateUserMutation } from '../../../services/UsersApi';
import type { ISettingData } from '../../../interfaces/manager/SettingsInterfaces.ts';
import { useGetSettingQuery } from '../../../services/SettingsApi.ts';

const UserCreatePage = () => {
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors, isSubmitting },
    } = useForm<UserCreateFormData>({
        resolver: zodResolver(userCreateFormSchema),
        defaultValues: {
            
        },
    });

    const [createUser, { isLoading }] = useCreateUserMutation();
    const { data: data_roles, isFetching: isFetchingRoles }: { data: IApiAppResponse<IRoleResponseData>, isFetching: boolean } = useGetRolesQuery(
        { page: 1, per_page: -1, name: '', sort_field: 'id', sort_direction: 'asc' }
    );

    const { data: data_setting, isFetching: isFetchingSetting }: { data: IApiAppResponse<ISettingData>, isFetching: boolean } = useGetSettingQuery('default_role');

    const roleOptions: ISelectOption[] = useMemo(() => {
        return data_roles?.data?.roles.map((role: IRoleItem) => ({
            label: role.name,
            value: role.id,
            isDisabled: role.slug === 'super_admin'
        }));
    }, [data_roles, data_setting]);

    useEffect(() => {
        if (data_setting?.data?.setting?.value) {
            reset({
                role_id: Number(data_setting.data.setting.value),
            });
        }
    }, [data_setting, reset]);


    const onSubmit = async (
        data: UserCreateFormData
    ) => {
        try {
            const res: IApiAppResponse<IUserData> = await createUser(data).unwrap();
            if(
                (res.data !== undefined && res.data !== null) &&
                (res.data.user !== undefined && res.data.user !== null)
            ) {
                reset();

                dispatch(showAlert({
                    text: `User "${res.data.user.name}" was created`,
                    type: 'success'
                }));

                setTimeout(() => {
                    hideAlert();
                }, 3000);
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
                dispatch(showAlert({
                    text: err_request.data.message,
                    type: 'error'
                }));

                setTimeout(() => {
                    hideAlert();
                }, 3000);
            }
        }
    };
    
    return (
        <>
            {(isSubmitting || isLoading || isFetchingRoles || isFetchingSetting) && <LoaderComponent />}

            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">
                    Create User
                </h2>
                <ButtonComponent type={ 'inverse' } link={ fullLink(`${ENTITY_ROUTES.USERS}`) }>Back to List</ButtonComponent>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-slate-300 mb-2">Name</label>
                        <InputComponent type="text" placeholder="Manager" {...register('name')} />
                        {errors.name && (
                            <p className="mt-2 text-sm text-red-400">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-slate-300 mb-2">Email</label>
                        <InputComponent type="text" placeholder="test@test.com" {...register('email')} />
                        {errors.email && (
                            <p className="mt-2 text-sm text-red-400">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div className="col-span-2">
                        <label className="block text-slate-300 mb-2">Role</label>
                        {!isFetchingRoles && !isFetchingSetting &&
                            <Controller
                                name="role_id"
                                control={control}
                                render={({ field }) => (
                                    <SelectComponent
                                        options={roleOptions}
                                        changeHandle={field.onChange}
                                        value={field.value}
                                    />
                                )}
                            />
                        }
                        { isFetchingRoles && <p className="text-slate-300">Loading...</p> }
                    </div>

                    <div>
                        <label className="block text-slate-300 mb-2">Password</label>
                        <InputComponent type="password" placeholder="Password" {...register('password')} />
                        {errors.password && (
                            <p className="mt-2 text-sm text-red-400">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-slate-300 mb-2">Password confirmation</label>
                        <InputComponent type="password" placeholder="Password confirmation" {...register('password_confirmation')} />
                        {errors.password_confirmation && (
                            <p className="mt-2 text-sm text-red-400">
                                {errors.password_confirmation.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <ButtonComponent type={ 'inverse' } link={ fullLink(`${ENTITY_ROUTES.USERS}`) }>Cancel</ButtonComponent>
                    <ButtonComponent type={ 'inverse_info' } isDisabled={ (isSubmitting || isLoading || isFetchingRoles || isFetchingSetting) }>Create User</ButtonComponent>
                </div>
            </form>
        </>
    );
};

export default UserCreatePage;