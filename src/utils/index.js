import { navigate } from 'gatsby';

export * from './constants';

/**
 * Smooth scroll or soft navigate to internal urls.
 */
export const smoothScroll = (e, url='/') => {
  e.preventDefault();
  window.history.pushState(null, null, url);  // Silently change url
  if (url === '/') window.scroll({ top: 0, behavior: 'smooth' });
  else if (url.startsWith('#')) {
    document.querySelector(url).scrollIntoView({
      behavior: 'smooth'
    });
  }
  else navigate(url);
};
