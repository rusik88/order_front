export type settingValueType = ISettingItemValueOption[] | string | number;

export interface ISettingsData {
    settings: ISettingItem[]
}

export interface SettingsProps extends ISettingsData {
    settings: ISettingItem[]
}

export interface ISettingData {
    setting: ISettingItem
}

export interface ISettingItemValueOption {
    id: number;
    name: string;
    selected: boolean;
}

export interface ISettingItem {
    title: string,
    key: string,
    type: string,
    value: settingValueType
}

