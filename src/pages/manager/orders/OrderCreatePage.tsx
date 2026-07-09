import { useAppDispatch } from '../../../store/hooks';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { IApiAppResponse, IApiErrorData } from '../../../interfaces/common/ApiAppInterfaces';
import { hideAlert, showAlert } from '../../../store/slices/AlertSlice';
import { type OrdersFormData, ordersFormSchema } from '../../../schemas/OrderSchema';
import { useCreateOrderMutation } from '../../../services/OrdersApi';
import type { IOrderData } from '../../../interfaces/manager/OrdersInterfaces';
import LoaderComponent from '../../../components/common/LoaderComponent';
import ButtonComponent from '../../../components/ui/ButtonComponent';
import { fullLink } from '../../../functions/helperFunctions';
import { ENTITY_ROUTES } from '../../../router/routes';
import InputComponent from '../../../components/ui/form/InputComponent';
import TextareaComponent from '../../../components/ui/form/TextareaComponent';
import { useGetOrderStatusesQuery } from '../../../services/OrderStatusesApi';
import type { ISelectOption } from '../../../interfaces/ui/ElementsInterface';
import { useMemo } from 'react';
import type { IOrderStatusItem, IOrderStatusResponseData } from '../../../interfaces/manager/OrderStatusesInterfaces';
import SelectComponent from '../../../components/ui/form/SelectComponent';

const OrderCreatePage = () => {
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors, isSubmitting },
    } = useForm<OrdersFormData>({
        resolver: zodResolver(ordersFormSchema),
        defaultValues: {

        },
    });

    const [createOrder, { isLoading }] = useCreateOrderMutation();
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

    const onSubmit = async (
        data: OrdersFormData
    ) => {
        try {
            const res: IApiAppResponse<IOrderData> = await createOrder(data).unwrap();
            if(
                (res.data !== undefined && res.data !== null) &&
                (res.data.order !== undefined && res.data.order !== null)
            ) {
                reset();

                dispatch(showAlert({
                    text: `Order "${res.data.order.name}" was created`,
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
            {(isSubmitting || isLoading) && <LoaderComponent />}

            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">Create Order</h2>
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
                        <InputComponent type="number" placeholder="250.50" {...register('total')} />
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
                        {errors.total && (
                            <p className="mt-2 text-sm text-red-400">
                                {errors.total.message}
                            </p>
                        )}
                    </div>

                </div>
                <div className="flex justify-end gap-3 pt-4">
                    <ButtonComponent type={ 'inverse' } link={ fullLink(`${ENTITY_ROUTES.ORDERS}`) }>Cancel</ButtonComponent>
                    <ButtonComponent type={ 'inverse_info' } isDisabled={ isSubmitting && isLoading }>Create Order</ButtonComponent>
                </div>
            </form>
        </>
    );
};

export default OrderCreatePage;