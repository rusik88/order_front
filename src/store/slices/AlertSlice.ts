import { createSlice } from '@reduxjs/toolkit';
import type {IAlertPayload, IAlertState} from '../../interfaces/common/AlertInterfaces';


const initialState: IAlertState = {
    isVisible: false,
    text: '',
    type: 'success',
};

const AlertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        showAlert: (state, action: { payload: IAlertPayload } ) => {
            state.isVisible = true;
            state.text = action.payload.text;
            state.type = action.payload.type;
        },

        hideAlert: state => {
            state.isVisible = false;
            //state.text = '';
        },
    },
});

export const { showAlert, hideAlert } = AlertSlice.actions;
export default AlertSlice.reducer;