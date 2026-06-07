export type AlertType = 'success' | 'warning' | 'error';

export interface IAlertPayload {
    text: string,
    type: AlertType
};

export interface IAlertState extends IAlertPayload {
    isVisible: boolean;
}
