const e=document.querySelector("[data-form]"),t=document.querySelectorAll("[data-error]"),s=document.querySelectorAll("[data-icon]");class r{constructor(e){this.errors=e}displayErrorsOnChange(e){const t=e.target.attributes.name.value,s=this.errors[t].find((e=>e.message)),r=e.target.parentElement,a=r.querySelector("[data-error]"),i=r.querySelector("[data-icon]");a.textContent=s?.message||"",this.toggleIcon(s,i)}displayErrorsOnSubmit(){Object.values(this.errors).forEach(((e,r)=>{const a=t[r],i=s[r],n=e.find((e=>e.message));a.textContent=n?.message||"",this.toggleIcon(n,i)}));Object.values(this.errors).flat(1/0).find((e=>e.message))||(this.showSuccessModal(),e.reset(),this.resetIcons(s))}toggleIcon(e,t){const s=["fa-check","form__item__icon-success"],r=["fa-exclamation-circle","form__item__icon-failure"];e?.message?(t.classList.add(...r),t.classList.remove(...s)):(t.classList.add(...s),t.classList.remove(...r)),t.style.opacity=1}resetIcons(e){return e.forEach((e=>e.style.opacity=0))}showSuccessModal(){Swal.fire({position:"center",icon:"success",title:"Your  message has been sent",text:"I will respond soon 👋",timer:3e3,color:"#2c2323",confirmButtonColor:"green"})}}class a{static isLengthValid(e,t){return e.length>0||{message:t}}static isMinLength(e,t,s){return e.length>=t||{message:s}}static isOverMaxLength(e,t,s){return e.length<=t||{message:s}}static isEmailValid(e,t){return/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(e).toLowerCase())||{message:t}}}const i=document.querySelector("[data-form]");new class extends class{getErrors({name:e,email:t,subject:s,description:r}){return{name:[a.isLengthValid(e,"name is required"),a.isMinLength(e,3,"must be at least 3 characters"),a.isOverMaxLength(e,15,"must be maximum 15 characters")],email:[a.isLengthValid(t,"email is required"),a.isMinLength(t,3,"must be at least 3 characters"),a.isEmailValid(t,"email is not valid - has to contains @ and .")],subject:[a.isLengthValid(s,"subject is required"),a.isMinLength(s,3,"must be at least 3 characters"),a.isOverMaxLength(s,15,"must be maximum 15 characters")],description:[a.isLengthValid(r,"description is required"),a.isMinLength(r,3,"must be at least 3 characters")]}}}{constructor(e,t){super(t),this.form=e,this.init()}init(){this.addListenerOnChange(),this.addListenerOnSubmit()}addListenerOnChange(){this.form.addEventListener("keyup",(e=>{const t=this.getFormData(this.form),s=this.getErrors(t);new r(s).displayErrorsOnChange(e)}),!1)}addListenerOnSubmit(){this.form.addEventListener("submit",(e=>{e.preventDefault();const t=this.getFormData(this.form),s=this.getErrors(t);new r(s).displayErrorsOnSubmit(s)}),!1)}getFormData(e){return Object.fromEntries(new FormData(e).entries())}}(i);document.querySelector("[data-area]").addEventListener("keyup",(function({target:e}){e.style.height="auto";const t=e.scrollHeight;e.style.height=`${t}px`}));
//# sourceMappingURL=index.a42a4df3.js.map
