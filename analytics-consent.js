(()=>{
 'use strict';
 const id='G-H4Z971JT41',key='dal_analytics_choice_v1',lifetime=180*24*60*60*1000;
 let loaded=false,banner;
 const production=['digitalartlab.ie','www.digitalartlab.ie'].includes(location.hostname);
 function read(){try{const c=JSON.parse(localStorage.getItem(key));return c&&Date.now()-c.at<lifetime&&['accepted','rejected'].includes(c.value)?c.value:null;}catch{return null;}}
 function save(value){try{localStorage.setItem(key,JSON.stringify({value,at:Date.now()}));}catch{}}
 function cleanUrl(value){try{const u=new URL(value);return u.origin+u.pathname;}catch{return '';}}
 function start(){
  if(loaded||!production)return;
  loaded=true;window['ga-disable-'+id]=false;
  window.dataLayer=window.dataLayer||[];
  window.gtag=function(){window.dataLayer.push(arguments);};
  window.gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
  window.gtag('consent','update',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
  window.gtag('js',new Date());
  window.gtag('config',id,{allow_google_signals:false,allow_ad_personalization_signals:false,cookie_expires:15552000,cookie_update:false,page_location:cleanUrl(location.href),page_referrer:cleanUrl(document.referrer)});
  const tag=document.createElement('script');tag.async=true;tag.src='https://www.googletagmanager.com/gtag/js?id='+id;tag.id='dal-google-analytics';document.head.append(tag);
 }
 function clearCookies(){
  const domains=[null,location.hostname,'.'+location.hostname,'digitalartlab.ie','.digitalartlab.ie'];
  document.cookie.split(';').forEach(cookie=>{const name=cookie.split('=')[0].trim();if(name==='_ga'||name.startsWith('_ga_'))domains.forEach(domain=>{document.cookie=name+'=; Max-Age=0; path=/'+(domain?'; domain='+domain:'')+'; SameSite=Lax; Secure';});});
 }
 function choose(value){
  const wasLoaded=loaded;save(value);banner.hidden=true;
  if(value==='accepted')start();
  else{window['ga-disable-'+id]=true;clearCookies();if(wasLoaded)location.reload();}
 }
 function init(){
  const style=document.createElement('style');style.textContent=`.dal-cookie-panel{position:fixed;bottom:18px;left:18px;right:18px;z-index:10000;max-width:850px;margin:auto;padding:22px;background:#fff;color:#251d32;border:1px solid #b6a6cc;border-radius:12px;box-shadow:0 8px 45px #21103230;font:15px/1.6 Arial,sans-serif}.dal-cookie-panel[hidden]{display:none}.dal-cookie-panel h2{font:700 20px/1.3 Arial,sans-serif;margin:0 0 8px;color:#251d32}.dal-cookie-panel p{margin:0 0 14px;color:#45384f}.dal-cookie-panel a{color:#513083;text-decoration:underline}.dal-cookie-actions{display:flex;gap:12px;flex-wrap:wrap}.dal-cookie-actions button,.dal-cookie-settings{font:700 14px/1.4 Arial,sans-serif;cursor:pointer}.dal-cookie-actions button{background:#fff;color:#48256f;border:2px solid #583580;border-radius:6px;padding:11px 18px;flex:1;min-width:160px}.dal-cookie-actions button:hover{background:#f0e9f8}.dal-cookie-actions button:focus-visible,.dal-cookie-settings:focus-visible{outline:3px solid #db8c33;outline-offset:4px}.dal-cookie-settings{position:fixed;bottom:10px;right:12px;z-index:9999;background:#fff;color:#48256f;padding:7px 12px;border:1px solid #9c89b6;border-radius:5px;font-size:12px}`;
  document.head.append(style);
  banner=document.createElement('section');banner.className='dal-cookie-panel';banner.setAttribute('role','region');banner.setAttribute('aria-label','Analytics cookie choices');
  banner.innerHTML='<h2>Help improve Digital Art Lab?</h2><p>With your permission, Google Analytics measures visits, scrolling, outbound links and resource downloads. You can use DAL without analytics and change your choice at any time. <a href="privacy.html">Privacy and cookies</a></p><div class="dal-cookie-actions"><button type="button" data-choice="rejected">Reject analytics</button><button type="button" data-choice="accepted">Accept analytics</button></div>';
  banner.querySelectorAll('[data-choice]').forEach(b=>b.addEventListener('click',()=>choose(b.dataset.choice)));
  const settings=document.createElement('button');settings.type='button';settings.className='dal-cookie-settings';settings.textContent='Cookie settings';settings.addEventListener('click',()=>{banner.hidden=false;banner.querySelector('button').focus();});
  document.body.append(settings,banner);
  const choice=read();banner.hidden=!!choice;if(choice==='accepted')start();
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
