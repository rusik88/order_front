export interface ISettingsQuery {
    settings: Record<string, ISettingItem>
}

export interface ISettingItemValueOption {
    id: number;
    name: string;
    selected: boolean;
}

export interface ISettingItem {
    title: string,
    value: ISettingItemValueOption[] | string | number
}