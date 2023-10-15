import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";
import i18next from '../../../lang-services/i18next'

const NavigatorContext = createContext();

const NavigatorProvider = ({ children }) => {
  const [showTutorial, setShowTutorial] = useState(true);
  const [privacyModalShow, setPrivacyModalShow] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    handleTutorialPermit();
    return () => {};
  }, []);

  async function handleTutorialPermit() {
    try {
      const permit = await AsyncStorage.getItem("showTutorial");
      const privacyResult = await AsyncStorage.getItem("showPrivacy");
      const userInfo = await AsyncStorage.getItem("UserInfo");
      const lang = await AsyncStorage.getItem("lang");
      if (permit !== null && permit === "true") {
        setShowTutorial(false);
      } else {
        setShowTutorial(true);
      }
      if (privacyResult !== null && privacyResult === "true") {
        setPrivacyModalShow(true);
      } else {
        setPrivacyModalShow(false);
      }
      if (userInfo !== null && userInfo !== undefined) {
        setCurrentUser(JSON.parse(userInfo));
      } else {
        setCurrentUser(null);
      }
      if (lang !== null && lang !== undefined) {
        i18next.changeLanguage(lang)
        setLanguage(lang);
      } else {
        i18next.changeLanguage(lang)
        setLanguage('en');
      }
    } catch (err) {  
      setPrivacyModalShow(false);
      setCurrentUser(null);
      setLanguage('en');
      i18next.changeLanguage('en')

    }
  }
  return (
    <NavigatorContext.Provider
      value={{
        showTutorial,
        setShowTutorial,
        privacyModalShow,
        setPrivacyModalShow,
        currentUser,
        setCurrentUser,
        language,
         setLanguage
      }}
    >
      {children}
    </NavigatorContext.Provider>
  );
};

export { NavigatorContext, NavigatorProvider };
