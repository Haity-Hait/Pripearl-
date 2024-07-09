
// Next Imports
import { cookies } from 'next/headers';

// Config Imports
import themeConfig from '@configs/themeConfig';

export const getSettingsFromCookie = () => {
  const cookieStore = cookies();
  const cookieName = themeConfig.settingsCookieName;

  return JSON.parse(cookieStore.get(cookieName)?.value || '{}');
};

export const getMode = () => {
  const settingsCookie = getSettingsFromCookie();

  // Get mode from cookie or fallback to theme config
  const _mode = settingsCookie.mode || themeConfig.mode;

  return _mode;
};
