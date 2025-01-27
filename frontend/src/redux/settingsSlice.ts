import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
    isSearchVisible: boolean;
    backgroundColor: string;
}

const initialState: SettingsState = {
    isSearchVisible: JSON.parse(localStorage.getItem('isSearchVisible') || 'false'),
    backgroundColor: JSON.parse(localStorage.getItem('backgroundColor') || 'false'),
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setSearchVisibility(state, action: PayloadAction<boolean>) {
            state.isSearchVisible = action.payload;
            localStorage.setItem('isSearchVisible', JSON.stringify(state.isSearchVisible));
        },
        setBackgroundColor: (state, action) => {
            state.backgroundColor = action.payload;
            localStorage.setItem('backgroundColor', JSON.stringify(state.backgroundColor));

          },
    },
});

export const { setSearchVisibility, setBackgroundColor } = settingsSlice.actions;
export default settingsSlice.reducer;