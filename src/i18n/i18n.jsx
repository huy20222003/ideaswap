import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
//en
import {
  NAVBAR_EN,
  BLOGS_EN,
  ACCOUNT_EN,
  SETTING_EN,
  VIDEOS_EN,
  DASHBOARD_CREATOR_EN,
  DOCUMENTS_EN,
  DONATE_EN,
  COURSES_EN,
  CONTENT_CREATOR_EN,
  AUTH_EN,
  NOTIFICATION_EN,
  FOOTER_EN,
  PAGE404_EN,
} from '../locales/en';
//de
import {
  NAVBAR_DE,
  BLOGS_DE,
  ACCOUNT_DE,
  SETTING_DE,
  VIDEOS_DE,
  DASHBOARD_CREATOR_DE,
  DOCUMENTS_DE,
  DONATE_DE,
  COURSES_DE,
  CONTENT_CREATOR_DE,
  AUTH_DE,
  NOTIFICATION_DE,
  FOOTER_DE,
  PAGE404_DE,
} from '../locales/de';

const resources = {
  en: {
    navbar: NAVBAR_EN,
    blogs: BLOGS_EN,
    account: ACCOUNT_EN,
    setting: SETTING_EN,
    videos: VIDEOS_EN,
    dashboardCreator: DASHBOARD_CREATOR_EN, // Fixed typo
    contentCreator: CONTENT_CREATOR_EN,
    documents: DOCUMENTS_EN,
    donate: DONATE_EN,
    courses: COURSES_EN,
    auth: AUTH_EN,
    notification: NOTIFICATION_EN,
    footer: FOOTER_EN,
    page404: PAGE404_EN,
  },
  de: {
    navbar: NAVBAR_DE,
    blogs: BLOGS_DE,
    account: ACCOUNT_DE,
    setting: SETTING_DE,
    videos: VIDEOS_DE,
    dashboardCreator: DASHBOARD_CREATOR_DE, // Fixed typo
    contentCreator: CONTENT_CREATOR_DE,
    documents: DOCUMENTS_DE,
    donate: DONATE_DE,
    courses: COURSES_DE,
    auth: AUTH_DE,
    notification: NOTIFICATION_DE,
    footer: FOOTER_DE,
    page404: PAGE404_DE,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  ns: [
    'navbar',
    'blogs',
    'account',
    'setting',
    'videos',
    'dashboardCreator',
    'contentCreator',
    'documents',
    'donate',
    'courses',
    'auth',
    'notification',
    'footer',
    'page404',
  ],
  debug: true, // Enable debug logs
  interpolation: {
    escapeValue: false,
  },
});

i18n.reloadResources(['en', 'de']);

export default i18n;
