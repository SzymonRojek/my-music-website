// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }
      
      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module;

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module() {
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({6:[function(require,module,exports) {
const e=document.querySelector(".form"),t=document.querySelector(".js-submitButton"),r=document.getElementsByClassName("form__item-error-text"),o=document.getElementsByClassName(".form__list"),n=document.querySelector(".form__list"),i=document.querySelectorAll(".form__item-icon-success"),c=0,s=1;function m(){n.addEventListener("keyup",({target:e})=>{const t=e.parentElement;"email"===e.attributes[1].nodeValue?(e.parentElement.children[3].style.opacity=`${p(e.value)?s:c}`,t.querySelector(".form__item-error-text").textContent="",t.querySelector(".form__item-icon-failure").style.opacity=c):(e.parentElement.children[3].style.opacity=`${q(e.value)?s:c}`,t.querySelector(".form__item-error-text").textContent="",t.querySelector(".form__item-icon-failure").style.opacity=c)}),e.addEventListener("submit",l)}function l(t){t.preventDefault();const r=document.querySelector(".js-form__field-name"),o=document.querySelector(".js-form__field-email"),n=document.querySelector(".js-form__field-subject"),c=document.querySelector(".js-form__field-message");a(r,()=>q(r.value),"minimum 3 characters required"),a(o,()=>p(o.value),"email is invalid"),a(n,()=>q(n.value),"minimum 3 characters required"),a(c,()=>q(c.value),"minimum 3 characters required");const{name:s,subject:m,email:l,description:f}=Object.fromEntries(new FormData(e).entries()),y={name:s,subject:m,email:l,description:f},_=document.querySelectorAll(".form__item-error-text");!Array.from(_).find(e=>""!==e.textContent)&&(u(y),S(i))}function u(t){emailjs.send(void 0,void 0,t).then(t=>{200===t.status&&(_(),e.reset())}).catch(e=>d(e))}function a(e,t,r){const o=e.parentElement.querySelector(".form__item-error-text"),n=f(e,t,r)||[];n.length&&(o.textContent=n.length?n[0].message:""),n.length||y(e)}function f(e,t,r){const o=e.parentElement,n=o.querySelector(".form__item-icon-failure"),i=o.querySelector(".form__item-icon-success"),m=[];return e.value||m.push({message:"field is required"}),t()||m.push({message:r}),i.style.opacity=c,n.style.opacity=s,m}function y(e){const t=e.parentElement,r=t.querySelector(".form__item-icon-failure"),o=t.querySelector(".form__item-icon-success");t.querySelector(".form__item-error-text").textContent="",r.style.opacity=c,o.style.opacity=s}function _(){Swal.fire({position:"center",icon:"success",title:"Your  message has been sent",text:"I will respond soon 👋",timer:3e3,color:"#2c2323",confirmButtonColor:"green"})}function d(e){Swal.fire({icon:"error",title:"Email has not been sent 😕",text:`${e.text?e.text:"Something went wront, please send it again"}`,confirmButtonColor:"crimson"})}m();const p=e=>{return/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(e).toLowerCase())};function q(e){return e.length>=3}function S(e){return Array.from(e).forEach(e=>e.style.opacity=c)}
},{}]},{},[6])