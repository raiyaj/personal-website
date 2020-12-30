import { navigate } from 'gatsby';

/**
 * Smooth scroll or soft navigate to internal urls.
 */
export const smoothScroll = (e, url='/') => {
  e.preventDefault();
  if (url.startsWith('/') && url.length > 1) {
    return navigate(url);
  }
  window.history.pushState(null, null, url);  // Silently change url
  if (url.startsWith('#')) {
    document.querySelector(url).scrollIntoView({
      behavior: 'smooth'
    });
  }
  else window.scroll({ top: 0, behavior: 'smooth' });
};
