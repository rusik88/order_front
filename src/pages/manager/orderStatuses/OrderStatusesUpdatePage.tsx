import { useAppDispatch } from '../../../store/hooks';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { type RoleFormData, roleFormSchema } from '../../../schemas/RolesSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import type { IApiAppResponse, IApiErrorData } from '../../../interfaces/common/ApiAppInterfaces';
import { useEffect } from 'react';
import { useGetOrderStatusQuery, useUpdateOrderStatusMutation } from '../../../services/OrderStatusesApi';
import type { IOrderStatusData } from '../../../interfaces/manager/OrderStatusesInterfaces';
import { hideAlert, showAlert } from '../../../store/slices/AlertSlice';
import type { OrderStatusesFormData } from '../../../schemas/OrderStatusesSchema';
import { fullLink } from '../../../functions/helperFunctions';
import { ENTITY_ROUTES } from '../../../router/routes';
import InputComponent from '../../../components/ui/form/InputComponent';
import LoaderComponent from '../../../components/common/LoaderComponent';
import ButtonComponent from '../../../components/ui/ButtonComponent';

const OrderStatusesUpdatePage = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();

    const orderStatusId = id ? parseInt(id) : 0;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<RoleFormData>({
        resolver: zodResolver(roleFormSchema),
        defaultValues: {

        },
    });

    const { data, isFetching }: { data: IApiAppResponse<IOrderStatusData>, isFetching: boolean } = useGetOrderStatusQuery(orderStatusId);
    const [updateOrderStatus, { isLoading }] = useUpdateOrderStatusMutation();

    const order_status = data?.data?.order_status;

    useEffect(() => {
        if (data?.data?.order_status) {
            const order_status = data.data.order_status;

            reset({
                name: order_status.name,
                slug: order_status.slug,
            });
        }
    }, [data, reset]);

    const onSubmit = async (
        data: OrderStatusesFormData
    ) => {
        try {
            const res: IApiAppResponse<IOrderStatusData> = await updateOrderStatus({ id: orderStatusId, ...data }).unwrap();
            if(
                (res.data !== undefined && res.data !== null) &&
                (res.data.order_status !== undefined && res.data.order_status !== null)
            ) {

                dispatch(showAlert({
                    text: `Order Status "${res.data.order_status.name}" was updated`,
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
                <h2 className="text-3xl font-bold">
                    Update Order Status "{order_status?.name}"
                </h2>
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

                <div className="flex justify-end gap-3 pt-4">
                    <ButtonComponent type={ 'inverse' } link={ fullLink(`${ENTITY_ROUTES.ORDER_STATUSES}`) }>Cancel</ButtonComponent>
                    <ButtonComponent type={ 'inverse_info' } isDisabled={ (isSubmitting && isLoading) }>Update Order Status</ButtonComponent>
                </div>
            </form>
        </>
    );
};

export default OrderStatusesUpdatePage;