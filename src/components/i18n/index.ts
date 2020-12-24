import i18nFactory from "@plusnew/i18n";
import type base from "./locales/base/en";

export default i18nFactory({
  fallbackLanguage: "de",
  translations: {
    base: (language): Promise<typeof base> =>
      import(
        /* webpackChunkName: "locales/base/"*/ `./locales/base/${language}`
      ).then((module) => module.default),
  },
});
