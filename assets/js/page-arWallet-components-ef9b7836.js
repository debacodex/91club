import{G as v,I as i,P as s,an as d,J as e,O as p,aA as c,aB as u,aC as m,N as r}from"./common.modules-6670d68a.js";import{g as w,_ as f}from"./page-activity-ActivityDetail-88cfafe3.js";const n=t=>(u("data-v-d0cbe577"),t=t(),m(),t),h={class:"wallet_header"},g={key:0,class:"no_active"},C={class:"ar_logo"},A={class:"logo"},B=["src"],I={class:"ar_amount_txt"},W={class:"ar_amount"},V=n(()=>e("span",null,"ARB",-1)),y=n(()=>e("div",{class:"divider"},null,-1)),k=v({__name:"walletInfo",props:{isActive:{type:Boolean,default:!1},arWallet:{type:Object,default:()=>{}}},emits:["goWallet"],setup(t,{emit:_}){return(a,l)=>{var o;return r(),i("div",h,[t.isActive?d("v-if",!0):(r(),i("div",g,s(a.$t("arNoActive2")),1)),e("div",C,[e("div",A,[e("img",{src:p(w)("common","ar_wallet"),alt:""},null,8,B),c(" AR"+s(a.$t("wallet")),1)]),e("div",{class:"go_wallet",onClick:l[0]||(l[0]=$=>_("goWallet"))},s(a.$t("comminWallet")),1)]),e("div",I,s(a.$t("walletBalance")),1),e("div",W,[c(s(t.isActive?(o=t.arWallet)==null?void 0:o.balance:0)+" ",1),V]),y,d(` <div class="ar_address">\r
			<div class="ad_title">\r
				<div>{{$t('walletAddress')}}:</div>\r
				<div>{{ isActive? arWallet?.walletAddress : '' }} </div>\r
			</div>\r
\r
			<svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none" @click="copy(arWallet?.walletAddress)">\r
				<path\r
					fill-rule="evenodd"\r
					clip-rule="evenodd"\r
					d="M3.5 1.125C3.5 0.572716 3.94772 0.125 4.5 0.125H13C13.5523 0.125 14 0.572715 14 1.125V11.375C14 11.9273 13.5523 12.375 13 12.375H11.375V4.25C11.375 3.42157 10.7034 2.75 9.875 2.75H3.5V1.125ZM1 3.625C0.447715 3.625 0 4.07272 0 4.625V14.875C0 15.4273 0.447715 15.875 1 15.875H9.5C10.0523 15.875 10.5 15.4273 10.5 14.875V4.625C10.5 4.07272 10.0523 3.625 9.5 3.625H1Z"\r
					fill="#B6BAC5"\r
				/>\r
			</svg>\r
		</div> `)])}}});const N=f(k,[["__scopeId","data-v-d0cbe577"],["__file","/Users/juneqiu/Desktop/june/project/ar_v2_vue/src/views/arWallet/components/walletInfo.vue"]]);export{N as W};
