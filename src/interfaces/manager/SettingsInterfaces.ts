export interface ISettingsData {
    settings: ISettingItem[]
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
    value: ISettingItemValueOption[] | string | number
}

export interface SettingsProps {
    settings: ISettingItem[]
}