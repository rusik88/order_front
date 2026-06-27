import ButtonComponent from '../../../components/ui/ButtonComponent';
import type { IApiAppResponse } from '../../../interfaces/common/ApiAppInterfaces';
import { useGetSettingsQuery } from '../../../services/SettingsApi';
import type { ISettingItem, ISettingsData } from '../../../interfaces/manager/SettingsInterfaces.ts';
import LoaderComponent from '../../../components/common/LoaderComponent';
import { InputComponent } from '../../../components/ui/form/InputComponent.tsx';
import type { ISelectOption } from '../../../interfaces/ui/ElementsInterface.ts';
import SelectComponent from '../../../components/ui/form/SelectComponent.tsx';



const SettingsPage = () => {

    const { data, isFetching }: { data: IApiAppResponse<ISettingsData>, isFetching: boolean } = useGetSettingsQuery(undefined);

    const settings = data?.data?.settings;
    const role_options: ISelectOption[] = [];

    if(settings !== undefined) {
        settings.map((item: ISettingItem) => {
            const value = item.value as string | number;
            role_options.push({ label: item.key, value: value });
        });
    }

    return (
        <>
            {isFetching && <LoaderComponent />}

            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">
                    Settings
                </h2>
            </div>

            <form className="space-y-6">

                <div className="rounded-2xl border border-white/10 overflow-hidden">
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
                                                <InputComponent type="text" />
                                            }
                                            {setting.type === 'number' &&
                                                <InputComponent type="number" />
                                            }
                                            {setting.type === 'role' &&
                                                <SelectComponent options={ role_options } changeHandle={ () => {} } />
                                            }
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <ButtonComponent type={'inverse_info'}>Save Settings</ButtonComponent>
                </div>

            </form>
        </>
    );
};

export default SettingsPage;