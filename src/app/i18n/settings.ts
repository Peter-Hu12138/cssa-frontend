export const fallbackLng = 'en'
export const languages = [fallbackLng, 'zh']
export const defaultNS = 'translation'
export const cookieName = 'i18next'

export type NamespaceInput = string | string[];

export function getOptions(lng: string = fallbackLng, ns: NamespaceInput = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns
  }
}
