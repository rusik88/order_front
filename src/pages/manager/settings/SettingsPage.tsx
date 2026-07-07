import ButtonComponent from '../../../components/ui/ButtonComponent';
import type { IApiAppResponse, IApiErrorData } from '../../../interfaces/common/ApiAppInterfaces';
import { useGetSettingsQuery, useUpdateSettingsMutation } from '../../../services/SettingsApi';
import type {
    ISettingItem,
    ISettingItemValueOption,
    ISettingsData,
    settingValueType
} from '../../../interfaces/manager/SettingsInterfaces.ts';
import LoaderComponent from '../../../components/common/LoaderComponent';
import { InputComponent } from '../../../components/ui/form/InputComponent.tsx';
import SelectComponent from '../../../components/ui/form/SelectComponent.tsx';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useMemo } from 'react';
import { hideAlert, showAlert } from '../../../store/slices/AlertSlice';
import { useAppDispatch } from '../../../store/hooks';
import clsx from 'clsx';
import type { ISelectOption } from '../../../interfaces/ui/ElementsInterface.ts';

const SettingsPage = () => {
    const dispatch = useAppDispatch();

    const { register, reset, control, handleSubmit } = useForm();

    const { data: dataSettings, isFetching }: { data: IApiAppResponse<ISettingsData>, isFetching: boolean } = useGetSettingsQuery(undefined);
    const [updateSettings, { isLoading: isLoadingSettings }] = useUpdateSettingsMutation();

    const settings: ISettingItem[] = dataSettings?.data?.settings;

    useEffect(() => {
        if (!settings) return;

        const values: Record<string, settingValueType> = {};

        settings.forEach(setting => {
            if (setting.key === 'default_role') {
                const roles = setting.value as ISettingItemValueOption[];

                values.default_role =
                    roles.find(role => role.selected)?.id ?? '';
            } else {
                values[setting.key] = setting.value;
            }
        });

        reset(values);
    }, [settings, reset]);

    const roleOptions: { options: ISelectOption[], default: string | number } = useMemo(() => {
        const roleSetting = settings?.find(
            item => item.key === 'default_role'
        );

        const dataRolesOptions: { options: ISelectOption[], default: string | number } = {
            options: [],
            default: 0
        };

        if (!roleSetting) return dataRolesOptions;

        dataRolesOptions.options = (roleSetting.value as ISettingItemValueOption[]).map((role: ISettingItemValueOption): ISelectOption => {
            if(role.selected) dataRolesOptions.default = role.id;
            return {
                label: role.name,
                value: role.id,
                isDisabled: false,
            };
        });

        return dataRolesOptions;
    }, [settings]);

    const onSubmit = async (
        data: Record<string, settingValueType>
    ) => {
        const dataSettings: ISettingsData = {
            settings: []
        };

        settings.map((setting: ISettingItem) => {
            if(data[setting.key] !== undefined) {
                let value: string | number;

                if(setting.key === 'default_role') {
                    value = data[setting.key] as number;
                } else {
                    value = data[setting.key] as string;
                }

                const valueData: ISettingItem = {
                    title: setting.title,
                    key: setting.key,
                    type: setting.type,
                    value
                };

                dataSettings.settings.push(valueData);
            }
        });

        try {
            const res: IApiAppResponse<[]> = await updateSettings({ ...dataSettings }).unwrap();
            if(
                (res.success !== undefined && res.success) &&
                (res.data !== undefined && res.data !== null)
            ) {
                dispatch(showAlert({
                    text: 'Settings was updated',
                    type: 'success'
                }));

                setTimeout(() => {
                    hideAlert();
                }, 3000);
            } else {
                throw {
                    data: {
                        message: 'Error update settings'
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
            {(isFetching || isLoadingSettings) && <LoaderComponent />}

            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">
                    Settings
                </h2>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="rounded-2xl border border-white/10">
                    {settings &&
                        settings.map((setting: ISettingItem, key: number) => {
                            return (
                                <div className="w-full" key={ setting.key }>
                                    <div className={clsx(
                                        { 'border-t': key !== 0 },
                                        'flex items-center justify-between w-full border-white/10'
                                    )}>
                                        <div className="w-[30%] p-4 text-slate-300">
                                            { setting.title }
                                        </div>
                                        <div className="p-4 w-[65%]">
                                            {setting.type === 'text' &&
                                                <InputComponent
                                                    type="text"
                                                    {...register(setting.key)}
                                                />
                                            }
                                            {setting.type === 'number' &&
                                                <InputComponent
                                                    type="number"
                                                    {...register(setting.key)} />
                                            }
                                            {setting.type === 'role' &&
                                                <>
                                                    <Controller
                                                        name="default_role"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <SelectComponent
                                                                options={roleOptions.options}
                                                                value={field.value}
                                                                changeHandle={field.onChange}
                                                            />
                                                        )}
                                                    />
                                                </>
                                            }

                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <ButtonComponent type={'inverse_info'} isDisabled={ isLoadingSettings }>Save Settings</ButtonComponent>
                </div>

            </form>
        </>
    );
};

export default SettingsPage;