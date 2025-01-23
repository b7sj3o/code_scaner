// src/components/SettingsPage.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchVisibility, setBackgroundColor } from '../../redux/settingsSlice';
import "./SettingsPage.scss"

const SettingsPage: React.FC = () => {
    const dispatch = useDispatch();
    const settings = useSelector((state: any) => state.settings);

    const hideSearch= settings.hideSearch
    const backgroundColor = settings.backgroundColor;

    const handleToggleSearchVisibility = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchVisibility(event.target.checked));
    };

    const handleChangeBackgroundColor = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setBackgroundColor(event.target.value));
    };

    return (
        <div className="settings-page">
            <h2>Налаштування</h2>
            <div className="settings-item">
                <label>Показувати пошук:</label>
                <input
                    type="checkbox"
                    checked={hideSearch}
                    onChange={handleToggleSearchVisibility}
                />
            </div>

            <div className="settings-item">
                <label>Колір фону</label>
                <input
                    type="color"
                    value={backgroundColor}
                    onChange={handleChangeBackgroundColor}
                />
            </div>
        </div>
    );
};

export default SettingsPage;
