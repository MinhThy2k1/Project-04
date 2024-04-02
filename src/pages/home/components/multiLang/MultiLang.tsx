import React, { useState, ChangeEvent } from "react";
import { useTranslation } from 'react-i18next';

const MultiLanguage: React.FC = () => {
    const { i18n } = useTranslation();
    const [language, setLanguage] = useState('vi-VI');

    const handleLangChange = (evt: ChangeEvent<HTMLSelectElement>) => {
        const lang = evt.target.value;
        setLanguage(lang);
        i18n.changeLanguage(lang);
    };

    return (
        <select onChange={(e) => { handleLangChange(e) }} id="language" defaultValue={language}>
            <option value="vi-VI">VI
            </option>
            <option value="en-EN">EN
            </option>
        </select>
    );
};

export default MultiLanguage;