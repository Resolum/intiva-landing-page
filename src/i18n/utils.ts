import { ui, defaultLang } from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return key in ui[lang] ? (ui[lang] as any)[key] : ui[defaultLang][key];
  }
}

export function getRouteFromUrl(url: URL): string | undefined {
  const pathname = new URL(url).pathname;
  const parts = pathname.split('/');
  
  if (parts.length > 1 && (parts[1] === 'en' || parts[1] === 'es')) {
    parts.splice(1, 1);
    const newPath = parts.join('/');
    return newPath === '/' ? '' : newPath;
  }
  return pathname === '/' ? '' : pathname;
}
