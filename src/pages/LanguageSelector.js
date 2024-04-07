import React from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSelector() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <button onClick={() => changeLanguage('en')}>En</button>
      <button onClick={() => changeLanguage('fr')}>Fr</button>
      <button onClick={() => changeLanguage('nl')}>Nl</button>
    </div>
  );
}

export default LanguageSelector;