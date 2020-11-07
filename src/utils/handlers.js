export const smoothScroll = (e, url='/') => {
  e.preventDefault();
  window.history.pushState(null, null, url);  // Silently change url
  if (url.startsWith('#')) {
    document.querySelector(url).scrollIntoView({
      behavior: 'smooth'
    });
  }
  else window.scroll({ top: 0, behavior: 'smooth' });
};
