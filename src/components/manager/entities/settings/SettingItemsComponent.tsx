import InputComponent from '../../../ui/form/InputComponent';
import type { ISettingItem, SettingsProps } from '../../../../interfaces/manager/SettingsInterfaces';

const SettingItemComponent = ({ settings }: SettingsProps) => {
    return (
        <>
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
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </>
    );
};

export default SettingItemComponent;