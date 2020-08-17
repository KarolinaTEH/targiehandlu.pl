export const availableLocales = ['pl', 'en', 'de'];
export const DEFAULT_LOCALE = 'pl';
export const CHANGE_LOCALE = 'CHANGE_LOCALE';
export const CHANGE_LOCALE_MSGS = 'CHANGE_LOCALE_MSGS';

export { default as resolveBrowserLocale } from './TranslationUtils';
export { default as translate } from './translate';
export { default as Translate } from './TranslateRender';
export { default as TranslationProvider, Context } from './TranslationProvider';

export function changeLocale(locale) {
  if (availableLocales.indexOf(locale) > -1) {
    return {
      type: CHANGE_LOCALE,
      locale: locale
    };
  }
}
