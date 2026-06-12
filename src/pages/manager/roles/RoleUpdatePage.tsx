import { InputComponent } from '../../../components/ui/form/InputComponent';
import ButtonComponent from '../../../components/ui/ButtonComponent';
import { fullLink }  from '../../../functions/helperFunctions';
import { ENTITY_ROUTES } from '../../../router/routes';
import type { IEntity, IRoleData } from '../../../interfaces/manager/RolesInterfaces';
import { useForm } from 'react-hook-form';
import { type RoleFormData, roleFormSchema } from '../../../schemas/RolesSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import LoaderComponent from '../../../components/common/LoaderComponent';
import { useGetRoleQuery, useUpdateRoleMutation } from '../../../services/RolesApi.ts';
import type { IApiAppResponse, IApiErrorData } from '../../../interfaces/common/ApiAppInterfaces';
import { useAppDispatch } from '../../../store/hooks.ts';
import { hideAlert, showAlert } from '../../../store/slices/AlertSlice';
import { entities_data } from '../../../utils/roles';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';


export const RoleUpdatePage = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();

    const roleId = id ? parseInt(id) : 0;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<RoleFormData>({
        resolver: zodResolver(roleFormSchema),
        defaultValues: {
            permissions: [],
        },
    });

    const { data, isFetching }: { data: IApiAppResponse<IRoleData>, isFetching: boolean } = useGetRoleQuery(roleId);
    const [updateRole, { isLoading }] = useUpdateRoleMutation();

    useEffect(() => {
        if (data?.data?.role) {
            const role = data.data.role;

            reset({
                name: role.name,
                slug: role.slug,
                permissions: JSON.parse(role.permissions || '[]'),
            });
        }
    }, [data, reset]);


    const onSubmit = async (
        data: RoleFormData
    ) => {
        try {
            const res: IApiAppResponse<IRoleData> = await updateRole({ id: roleId, ...data }).unwrap();
            if(
                (res.data !== undefined && res.data !== null) &&
                (res.data.role !== undefined && res.data.role !== null)
            ) {

                dispatch(showAlert({
                    text: `Role "${res.data.role.name}" was updated`,
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
            {(isSubmitting || isFetching || isLoading) && <LoaderComponent />}

            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">Create Order</h2>
                <ButtonComponent type={ 'inverse' } link={ fullLink(`${ENTITY_ROUTES.ROLES}`) }>Back to List</ButtonComponent>
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
                        <InputComponent type="text" placeholder="manager" {...register('slug')} />
                        {errors.slug && (
                            <p className="mt-2 text-sm text-red-400">
                                {errors.slug.message}
                            </p>
                        )}
                    </div>
                </div>

                { entities_data &&
                    (
                        <div className="rounded-2xl border border-white/10 overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-white/5">
                                <tr>
                                    <th className="p-4 text-left">Module</th>
                                    <th className="p-4 text-center">Read</th>
                                    <th className="p-4 text-center">Create</th>
                                    <th className="p-4 text-center">Update</th>
                                    <th className="p-4 text-center">Delete</th>
                                </tr>
                                </thead>

                                <tbody>
                                { entities_data.map((item: IEntity)=> {
                                    return (
                                        <tr className="border-t border-white/10" key={item.slug}>
                                            <td className="p-4">{ item.title }</td>

                                            <td className="text-center">
                                                <input type="checkbox" {...register('permissions')} value={ `${item.slug}:read` } />
                                                {errors.permissions && (
                                                    <p className="mt-2 text-sm text-red-400">
                                                        {errors.permissions.message}
                                                    </p>
                                                )}
                                            </td>

                                            <td className="text-center">
                                                <input type="checkbox" {...register('permissions')} value={ `${item.slug}:create` } />
                                            </td>

                                            <td className="text-center">
                                                <input type="checkbox" {...register('permissions')} value={ `${item.slug}:update` } />
                                            </td>

                                            <td className="text-center">
                                                <input type="checkbox" {...register('permissions')} value={ `${item.slug}:delete` } />
                                            </td>
                                        </tr>
                                    );
                                })}

                                </tbody>
                            </table>
                        </div>
                    )
                }

                <div className="flex justify-end gap-3 pt-4">
                    <ButtonComponent type={ 'inverse' } link={ fullLink(`${ENTITY_ROUTES.ROLES}`) }>Cancel</ButtonComponent>
                    <ButtonComponent type={ 'inverse_info' } isDisabled={ isSubmitting && isLoading }>Update Order</ButtonComponent>
                </div>
            </form>
        </>
    );
};

export default RoleUpdatePage;