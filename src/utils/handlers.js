export const smoothScroll = (event, url='/') => {
  event.preventDefault();
  window.history.pushState(null, null, url);  // silently change url
  if (url.startsWith('#')) {
    document.querySelector(url).scrollIntoView({
      behavior: 'smooth'
    });
  }
  else window.scroll({ top: 0, behavior: 'smooth' });
};
