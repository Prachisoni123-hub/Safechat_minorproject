// simple theme toggle persisted in localStorage
const themeBtn = document.getElementById('themeBtn');
function applyTheme(){
  const t = localStorage.getItem('safechat-theme') || 'light';
  document.documentElement.setAttribute('data-theme', t === 'dark' ? 'dark' : 'light');
  if(themeBtn) themeBtn.textContent = t === 'dark' ? '☀️' : '🌙';
}
if(themeBtn){
  themeBtn.addEventListener('click', () => {
    const curr = localStorage.getItem('safechat-theme') === 'dark' ? 'light' : 'dark';
    localStorage.setItem('safechat-theme', curr);
    applyTheme();
  });
}
applyTheme();

// optional: register service worker for FCM
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then(() => console.log('SW registered'))
    .catch(e => console.warn('SW register failed', e));
}
