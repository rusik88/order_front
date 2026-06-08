import { config_app } from '../../config.ts';

export const fullLink = (url :string): string => {
    return '/'+config_app.MANAGER_PANEL+'/'+url;
};