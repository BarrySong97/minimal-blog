import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { getOptions } from "./settings";

const initI18next = async (lng: string, ns?: string) => {
  // on server side we create a new instance for each render, because during compilation everything seems to be executed in parallel
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`./locales/${language}/${namespace}.json`)
      )
    )
    .init(getOptions(lng, ns));
  return i18nInstance;
};

export async function useTranslation(lng: string, ns?: string, options?: any) {
  const i18nextInstance = await initI18next(lng, ns);
  return {
    t: (text: string) => {
      const _t = i18nextInstance.getFixedT(lng, ns, options?.keyPrefix);
      const arr = text.split(".");
      const key = arr.slice(1).join(".");
      return _t(key);
    },
    // t: i18nextInstance.getFixedT(lng, ns, options?.keyPrefix),
    i18n: i18nextInstance,
  };
}
