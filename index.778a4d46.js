function e(){Swal.fire({position:"center",icon:"success",title:"Your  message has been sent",text:"I will respond soon 👋",timer:3e3,color:"#2c2323",confirmButtonColor:"green"})}function t(e){Swal.fire({icon:"error",title:"Email has not been sent 😕",text:`${e.text?e.text:"Something went wront, please send it again"}`,confirmButtonColor:"crimson"})}const r=document.querySelector(".form"),o=document.querySelector(".form__list"),n=document.querySelectorAll(".form__item-icon-success");function i(o){o.preventDefault();const i=document.querySelector(".js-form__field-name"),l=document.querySelector(".js-form__field-email"),u=document.querySelector(".js-form__field-subject"),a=document.querySelector(".js-form__field-message"),{name:f,email:y,subject:_,message:d}=Object.fromEntries(new FormData(r).entries());c(i,(()=>s(f)),"minimum 3 characters required"),c(l,(()=>m(y)),"email is invalid"),c(u,(()=>s(_)),"minimum 3 characters required"),c(a,(()=>s(d)),"minimum 3 characters required");const p=document.querySelectorAll(".form__item-error-text");var q;!Array.from(p).find((e=>""!==e.textContent))?(e(),r.reset(),q=n,Array.from(q).forEach((e=>e.style.opacity=0))):t()}function c(e,t,r){const o=e.parentElement.querySelector(".form__item-error-text"),n=function(e,t,r){const o=e.parentElement,n=o.querySelector(".form__item-icon-failure"),i=o.querySelector(".form__item-icon-success"),c=[];e.value||c.push({message:"field is required"});t()||c.push({message:r});return i.style.opacity=0,n.style.opacity=1,c}(e,t,r)||[];n.length&&(o.textContent=n.length?n[0].message:""),n.length||function(e){const t=e.parentElement,r=t.querySelector(".form__item-icon-failure"),o=t.querySelector(".form__item-icon-success");t.querySelector(".form__item-error-text").textContent="",r.style.opacity=0,o.style.opacity=1}(e)}o.addEventListener("keyup",(({target:e})=>{const t=e.parentElement;"email"===e.attributes[1].nodeValue?(e.parentElement.children[3].style.opacity=""+(m(e.value)?1:0),t.querySelector(".form__item-error-text").textContent="",t.querySelector(".form__item-icon-failure").style.opacity=0):(e.parentElement.children[3].style.opacity=""+(s(e.value)?1:0),t.querySelector(".form__item-error-text").textContent="",t.querySelector(".form__item-icon-failure").style.opacity=0)})),r.addEventListener("submit",i);const m=e=>/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(e).toLowerCase());function s(e){return e.length>=3}
//# sourceMappingURL=index.778a4d46.js.map
