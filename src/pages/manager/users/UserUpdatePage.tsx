import { useAppDispatch } from '../../../store/hooks.ts';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userUpdateFormSchema, type UserUpdateFormData } from '../../../schemas/UsersSchema.ts';
import type { IApiAppResponse, IApiErrorData } from '../../../interfaces/common/ApiAppInterfaces.ts';
import type { IUserData, IUserItem } from '../../../interfaces/manager/UsersInterfaces.ts';
import { useEffect, useMemo } from 'react';
import { hideAlert, showAlert } from '../../../store/slices/AlertSlice';
import { useGetUserQuery, useUpdateUserMutation } from '../../../services/UsersApi';
import LoaderComponent from '../../../components/common/LoaderComponent';
import ButtonComponent from '../../../components/ui/ButtonComponent';
import { fullLink } from '../../../functions/helperFunctions';
import { ENTITY_ROUTES } from '../../../router/routes';
import { InputComponent } from '../../../components/ui/form/InputComponent';
import type { IRoleResponseData } from '../../../interfaces/manager/RolesInterfaces';
import { useGetRolesQuery } from '../../../services/RolesApi';
import SelectComponent from '../../../components/ui/form/SelectComponent';
import type { ISelectOption } from '../../../interfaces/ui/ElementsInterface';
import { Controller } from 'react-hook-form';


const UserUpdatePage = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();

    const userId = id ? parseInt(id) : 0;

    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<UserUpdateFormData>({
        resolver: zodResolver(userUpdateFormSchema),
        defaultValues: {

        },
    });

    const { data, isFetching }: { data: IApiAppResponse<IUserData>, isFetching: boolean } = useGetUserQuery(userId);
    const [updateUser, { isLoading }] = useUpdateUserMutation();

    const { data: data_roles, isFetching: isFetchingRoles }: { data: IApiAppResponse<IRoleResponseData>, isFetching: boolean } = useGetRolesQuery(
        { page: 1, per_page: -1, name: '', sort_field: 'id', sort_direction: 'asc' }
    );

    const user: IUserItem = data?.data?.user;
    const isSuperAdmin = user?.role?.slug === 'super_admin';

    useEffect(() => {
        if (data?.data?.user) {
            const user: IUserItem = data.data.user;

            reset({
                name: user.name,
                email: user.email,
            });
        }
    }, [data, reset]);

    const roleOptions: ISelectOption[] = useMemo(() => {
        if(user === undefined) return [];

        return data_roles?.data?.roles.map(role => ({
            label: role.name,
            value: role.id,
            selected: role.id === user.role_id,
        }));
    }, [data_roles, user]);

    const onSubmit = async (
        dataSubmit: UserUpdateFormData
    ) => {
        try {

            const res: IApiAppResponse<IUserData> = await updateUser({ id: userId, ...dataSubmit }).unwrap();
            if(
                (res.data !== undefined && res.data !== null) &&
                (res.data.user !== undefined && res.data.user !== null)
            ) {

                dispatch(showAlert({
                    text: `User "${res.data.user.name}" was updated`,
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
            {(isSubmitting || isFetching || isLoading || isFetchingRoles) && <LoaderComponent />}

            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">
                    Update User "{user?.name}" - {user?.role?.name}
                </h2>
                <ButtonComponent type={ 'inverse' } link={ fullLink(`${ENTITY_ROUTES.USERS}`) }>Back to List</ButtonComponent>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-slate-300 mb-2">Title</label>
                        <InputComponent type="text" placeholder="Manager" {...register('name')} />
                        {errors.name && (
                            <p className="mt-2 text-sm text-red-400">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-slate-300 mb-2">Slug</label>
                        <InputComponent type="text" placeholder="manager" {...register('email')} />
                        {errors.email && (
                            <p className="mt-2 text-sm text-red-400">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div className="col-span-2">
                        <label className="block text-slate-300 mb-2">Role</label>
                        {!isFetchingRoles &&
                            <Controller
                                name="role_id"
                                control={control}
                                render={({ field }) => (
                                    <SelectComponent
                                        options={roleOptions}
                                        changeHandle={field.onChange}
                                    />
                                )}
                            />
                        }
                        { isFetchingRoles && <p className="text-slate-300">Loading...</p> }
                    </div>

                    <div>
                        <label className="block text-slate-300 mb-2">Password</label>
                        <InputComponent type="text" placeholder="Password" {...register('password')} />
                        {errors.password && (
                            <p className="mt-2 text-sm text-red-400">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-slate-300 mb-2">Password confirmation</label>
                        <InputComponent type="text" placeholder="Password confirmation" {...register('password_confirmation')} />
                        {errors.password_confirmation && (
                            <p className="mt-2 text-sm text-red-400">
                                {errors.password_confirmation.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <ButtonComponent type={ 'inverse' } link={ fullLink(`${ENTITY_ROUTES.USERS}`) }>Cancel</ButtonComponent>
                    <ButtonComponent type={ 'inverse_info' } isDisabled={ (isSubmitting || isLoading || isFetchingRoles || isFetching) || isSuperAdmin }>Update User</ButtonComponent>
                </div>
            </form>
        </>
    );

    
};

export default UserUpdatePage;