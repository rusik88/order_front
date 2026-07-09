import { useAppDispatch } from '../../../store/hooks';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type OrderStatusesFormData, orderStatusesFormSchema } from '../../../schemas/OrderStatusesSchema';
import { useCreateOrderStatusMutation } from '../../../services/OrderStatusesApi';
import type { IApiAppResponse, IApiErrorData } from '../../../interfaces/common/ApiAppInterfaces';
import { hideAlert, showAlert } from '../../../store/slices/AlertSlice';
import type { IOrderStatusData } from '../../../interfaces/manager/OrderStatusesInterfaces';
import LoaderComponent from '../../../components/common/LoaderComponent';
import ButtonComponent from '../../../components/ui/ButtonComponent';
import { fullLink } from '../../../functions/helperFunctions';
import { ENTITY_ROUTES } from '../../../router/routes';
import InputComponent from '../../../components/ui/form/InputComponent';

const OrderStatusesCreatePage = () => {
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<OrderStatusesFormData>({
        resolver: zodResolver(orderStatusesFormSchema),
        defaultValues: {

        },
    });

    const [createOrderStatus, { isLoading }] = useCreateOrderStatusMutation();

    const onSubmit = async (
        data: OrderStatusesFormData
    ) => {
        try {
            const res: IApiAppResponse<IOrderStatusData> = await createOrderStatus(data).unwrap();
            if(
                (res.data !== undefined && res.data !== null) &&
                (res.data.order_status !== undefined && res.data.order_status !== null)
            ) {
                reset();

                dispatch(showAlert({
                    text: `Order Status "${res.data.order_status.name}" was created`,
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
                <h2 className="text-3xl font-bold">Create Order Status</h2>
                <ButtonComponent type={ 'inverse' } link={ fullLink(`${ENTITY_ROUTES.ORDER_STATUSES}`) }>Back to List</ButtonComponent>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-slate-300 mb-2">Title</label>
                        <InputComponent type="text" placeholder="New" {...register('name')} />
                        {errors.name && (
                            <p className="mt-2 text-sm text-red-400">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-slate-300 mb-2">Slug</label>
                        <InputComponent type="text" placeholder="new" {...register('slug')} />
                        {errors.slug && (
                            <p className="mt-2 text-sm text-red-400">
                                {errors.slug.message}
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                    <ButtonComponent type={ 'inverse' } link={ fullLink(`${ENTITY_ROUTES.ORDER_STATUSES}`) }>Cancel</ButtonComponent>
                    <ButtonComponent type={ 'inverse_info' } isDisabled={ isSubmitting && isLoading }>Create Order Status</ButtonComponent>
                </div>
            </form>
        </>
    );
};

export default OrderStatusesCreatePage;