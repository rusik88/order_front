import { useAppDispatch } from '../../../store/hooks';
import { useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type OrdersFormData, ordersFormSchema } from '../../../schemas/OrderSchema';
import type { IApiAppResponse, IApiErrorData } from '../../../interfaces/common/ApiAppInterfaces';
import type {
    IOrderStatusItem,
    IOrderStatusResponseData
} from '../../../interfaces/manager/OrderStatusesInterfaces';
import {
    useGetOrderStatusesQuery
} from '../../../services/OrderStatusesApi';
import type { IOrderData, IOrderItem } from '../../../interfaces/manager/OrdersInterfaces';
import { useGetOrderQuery, useUpdateOrderMutation } from '../../../services/OrdersApi';
import { useEffect, useMemo } from 'react';
import { hideAlert, showAlert } from '../../../store/slices/AlertSlice';
import LoaderComponent from '../../../components/common/LoaderComponent';
import InputComponent from '../../../components/ui/form/InputComponent';
import SelectComponent from '../../../components/ui/form/SelectComponent';
import TextareaComponent from '../../../components/ui/form/TextareaComponent';
import ButtonComponent from '../../../components/ui/ButtonComponent';
import { fullLink } from '../../../functions/helperFunctions';
import { ENTITY_ROUTES } from '../../../router/routes';
import type { ISelectOption } from '../../../interfaces/ui/ElementsInterface';

const OrderUpdatePage = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();

    const orderId = id ? parseInt(id) : 0;

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors, isSubmitting },
    } = useForm<OrdersFormData>({
        resolver: zodResolver(ordersFormSchema),
    });

    const { data: dataOrder, isFetching: isFetchingOrder }: { data: IApiAppResponse<IOrderData>, isFetching: boolean } = useGetOrderQuery(orderId);
    const [updateOrder, { isLoading: isLoadingOrder }] = useUpdateOrderMutation();
    const { data: data_order_statuses, isFetching: isFetchingOrderStatuses }: { data: IApiAppResponse<IOrderStatusResponseData>, isFetching: boolean } = useGetOrderStatusesQuery(
        { page: 1, per_page: -1, name: '', sort_field: 'id', sort_direction: 'asc' }
    );

    const orderStatusesOptions: ISelectOption[] = useMemo(() => {
        return data_order_statuses?.data?.order_statuses.map((order_status: IOrderStatusItem) => ({
            label: order_status.name,
            value: order_status.id,
            isDisabled: false
        }));
    }, [data_order_statuses]);

    const order = dataOrder?.data?.order;

    useEffect(() => {
        if (dataOrder?.data?.order) {
            const order: IOrderItem = dataOrder.data.order;

            reset({
                name: order.name,
                total: order.total.toString(),
                order_status_id: order.order_status.id,
                comment: order.comment,
            });
        }
    }, [dataOrder, reset]);

    const onSubmit = async (
        data: OrdersFormData
    ) => {
        try {
            const res: IApiAppResponse<IOrderData> = await updateOrder({ id: orderId, ...data }).unwrap();
            if(
                (res.data !== undefined && res.data !== null) &&
                (res.data.order !== undefined && res.data.order !== null)
            ) {

                dispatch(showAlert({
                    text: `Order "${res.data.order.name}" was updated`,
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
            {(isSubmitting || isFetchingOrder || isLoadingOrder) && <LoaderComponent />}

            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">Update Order "{order?.name}"</h2>
                <ButtonComponent type={ 'inverse' } link={ fullLink(`${ENTITY_ROUTES.ORDERS}`) }>Back to List</ButtonComponent>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-slate-300 mb-2">Title</label>
                        <InputComponent type="text" placeholder="Title" {...register('name')} />
                        {errors.name && (
                            <p className="mt-2 text-sm text-red-400">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-slate-300 mb-2">Total($)</label>
                        <InputComponent type="text" placeholder="250.50" {...register('total')} />
                        {errors.total && (
                            <p className="mt-2 text-sm text-red-400">
                                {errors.total.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-slate-300 mb-2">Role</label>
                        {!isFetchingOrderStatuses &&
                            <Controller
                                name="order_status_id"
                                control={control}
                                render={({ field }) => (
                                    <SelectComponent
                                        options={orderStatusesOptions}
                                        changeHandle={field.onChange}
                                        value={field.value}
                                    />
                                )}
                            />
                        }
                        { isFetchingOrderStatuses && <p className="text-slate-300">Loading...</p> }
                    </div>

                    <div>
                        <label className="block text-slate-300 mb-2">Comment</label>
                        <TextareaComponent placeholder="Comment..." {...register('comment')} ></TextareaComponent>
                    </div>

                </div>
                <div className="flex justify-end gap-3 pt-4">
                    <ButtonComponent type={ 'inverse' } link={ fullLink(`${ENTITY_ROUTES.ORDERS}`) }>Cancel</ButtonComponent>
                    <ButtonComponent type={ 'inverse_info' } isDisabled={ isSubmitting && isLoadingOrder }>Update Order</ButtonComponent>
                </div>
            </form>
        </>
    );
};

export default OrderUpdatePage;