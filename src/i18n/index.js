import Vue from 'vue';
import VueI18n from 'vue-i18n';

import fa from './lang/fa';
import en from './lang/en';

Vue.use(VueI18n);

const messages = {
  fa,
  en
};

localStorage.setItem("language", "fa");
const language = localStorage.getItem("language");

const i18n = new VueI18n({
  locale: language,
  messages
});

export default i18n;