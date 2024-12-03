import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
    hideSearch: boolean;
    backgroundColor: string;
}

const initialState: SettingsState = {
    hideSearch: JSON.parse(localStorage.getItem('hideSearch') || 'false'),
    backgroundColor: JSON.parse(localStorage.getItem('backgroundColor') || 'false'),
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setSearchVisibility(state, action: PayloadAction<boolean>) {
            state.hideSearch = action.payload;
            localStorage.setItem('hideSearch', JSON.stringify(state.hideSearch));
        },
        setBackgroundColor: (state, action) => {
            state.backgroundColor = action.payload;
            localStorage.setItem('backgroundColor', JSON.stringify(state.backgroundColor));

          },
    },
});

export const { setSearchVisibility, setBackgroundColor } = settingsSlice.actions;
export default settingsSlice.reducer;