import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enJson from './assets/lang/en.json'
import frJson from './assets/lang/fr.json'

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: { ...enJson } },
        fr: { translation: { ...frJson } },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    }
});
