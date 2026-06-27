import ButtonComponent from '../../../components/ui/ButtonComponent';
import type { IApiAppResponse, IApiErrorData } from '../../../interfaces/common/ApiAppInterfaces';
import { useGetSettingsQuery, useUpdateSettingsMutation } from '../../../services/SettingsApi';
import type {
    ISettingItem,
    ISettingItemValueOption,
    ISettingsData, settingValueType
} from '../../../interfaces/manager/SettingsInterfaces.ts';
import LoaderComponent from '../../../components/common/LoaderComponent';
import { InputComponent } from '../../../components/ui/form/InputComponent.tsx';
import SelectComponent from '../../../components/ui/form/SelectComponent.tsx';
import { useForm } from 'react-hook-form';
import { useEffect, useMemo, useState } from 'react';
import { hideAlert, showAlert } from '../../../store/slices/AlertSlice';
import { useAppDispatch } from '../../../store/hooks';

const SettingsPage = () => {
    const dispatch = useAppDispatch();

    const { register, reset, handleSubmit } = useForm();
    const [ roleId, setRoleId ] = useState<number | string>('');

    const { data, isFetching }: { data: IApiAppResponse<ISettingsData>, isFetching: boolean } = useGetSettingsQuery(undefined);
    const [updateSettings, { isLoading }] = useUpdateSettingsMutation();

    const settings: ISettingItem[] = data?.data?.settings;

    useEffect(() => {
        if (!settings) return;

        const values: Record<string, settingValueType> = {};

        settings.forEach((setting: ISettingItem) => {
            values[setting.key] = setting.value;
        });

        reset(values);
    }, [settings, reset]);

    const roleOptions = useMemo(() => {
        const roleSetting = settings?.find(
            item => item.key === 'default_role'
        );

        if (!roleSetting) return [];

        return (roleSetting.value as ISettingItemValueOption[]).map(role => ({
            label: role.name,
            value: role.id,
            selected: role.selected,
        }));
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
                    const role_values: ISettingItemValueOption[] = settings.find((setting: ISettingItem) => setting.key === 'default_role')!.value as ISettingItemValueOption[];
                    const default_role_id: number = role_values.find((role_value: ISettingItemValueOption) => role_value.selected)!.id;

                    value = roleId ? roleId : default_role_id;
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
            {isFetching || isLoading && <LoaderComponent />}

            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">
                    Settings
                </h2>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="rounded-2xl border border-white/10">
                    {settings &&
                        settings.map((setting: ISettingItem) => {
                            return (
                                <div className="w-full" key={ setting.key }>
                                    <div className="flex items-center justify-between w-full border-t border-white/10">
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
                                                <SelectComponent {...register(setting.key)} options={ roleOptions } changeHandle={ setRoleId } />
                                            }
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <ButtonComponent type={'inverse_info'} isDisabled={ isLoading }>Save Settings</ButtonComponent>
                </div>

            </form>
        </>
    );
};

export default SettingsPage;