// Open the requested existing lesson, including on a fresh page visit.
document.addEventListener('DOMContentLoaded',()=>{
 const lesson=new URLSearchParams(location.search).get('lesson');
 const keys=['w','f','t','v'];
 if(keys.includes(lesson)&&typeof showL==='function'){
  const button=document.querySelectorAll('.ltab')[keys.indexOf(lesson)];
  if(button)showL(lesson,button);
 }
 document.querySelectorAll('a[target="_blank"]').forEach(a=>a.setAttribute('rel','noopener'));
});
