import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from '../langs/en.json'
import welsh from '../langs/welsh.json'

export const languageResource={
    en:{translation:en},
    welsh:{translation:welsh},
}

i18next.use(initReactI18next).init({
    compatibilityJSON:'v3',
    lng:'en',
    fallbackLng:'en',
    resources:languageResource,
})

export default i18next