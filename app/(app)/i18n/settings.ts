export const fallbackLng = "en";
export const languages = [fallbackLng, "zh", "ja", "ko"];
export const defaultNS = "common";
export const cookieName = "i18next";

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
