"use strict";(self["webpackChunksimple_twitter"]=self["webpackChunksimple_twitter"]||[]).push([[813],{5285:function(t,s,o){o.d(s,{Z:function(){return f}});var r=function(){var t=this,s=t._self._c;return s("div",{staticClass:"follow__card__wrapper"},["user-followers"===t.$route.name?t._l(t.followers,(function(o){return s("div",{key:o.id,staticClass:"follow__card"},[s("div",{staticClass:"follow__card__content"},[s("div",{staticClass:"follow__card__title"},[s("div",{staticClass:"follow__card__title__info"},[s("router-link",{attrs:{to:{name:"user-tweets",params:{id:o.id}}}},[s("img",{staticClass:"follow__card__avatar",attrs:{src:t._f("emptyAvatar")(o.avatar),alt:"avatar"}})]),s("div",[s("p",{staticClass:"follow__card__name"},[t._v(t._s(o.name))]),s("p",{staticClass:"follow__card__account"},[t._v("@"+t._s(o.account))])])],1),o.isFollowed?s("button",{staticClass:"follow__card__btn--following",attrs:{disabled:t.isProcessing},on:{click:function(s){return s.stopPropagation(),s.preventDefault(),t.deleteFollower(o.id)}}},[t._v(" 正在跟隨 ")]):s("button",{staticClass:"follow__card__btn--unfollowing",attrs:{disabled:t.isProcessing},on:{click:function(s){return s.stopPropagation(),s.preventDefault(),t.addFollower(o.id)}}},[t._v(" 跟隨 ")])]),s("div",{staticClass:"follow__card__description"},[t._v(" "+t._s(o.introduction)+" ")])])])})):t._e(),"user-followings"===t.$route.name?t._l(t.followings,(function(o){return s("div",{key:o.id,staticClass:"follow__card"},[s("div",{staticClass:"follow__card__content"},[s("div",{staticClass:"follow__card__title"},[s("div",{staticClass:"follow__card__title__info"},[s("router-link",{attrs:{to:{name:"user-tweets",params:{id:o.id}}}},[s("img",{staticClass:"follow__card__avatar",attrs:{src:t._f("emptyAvatar")(o.avatar),alt:"avatar"}})]),s("div",[s("p",{staticClass:"follow__card__name"},[t._v(t._s(o.name))]),s("p",{staticClass:"follow__card__account"},[t._v("@"+t._s(o.account))])])],1),o.isFollowed?s("button",{staticClass:"follow__card__btn--following",attrs:{disabled:t.isProcessing},on:{click:function(s){return s.stopPropagation(),s.preventDefault(),t.deleteFollowing(o.id)}}},[t._v(" 正在跟隨 ")]):s("button",{staticClass:"follow__card__btn--unfollowing",attrs:{disabled:t.isProcessing},on:{click:function(s){return s.stopPropagation(),s.preventDefault(),t.addFollowing(o.id)}}},[t._v(" 跟隨 ")])]),s("p",{staticClass:"follow__card__description"},[t._v(" "+t._s(o.introduction)+" ")])])])})):t._e()],2)},i=[],e=(o(1703),o(9682)),a=o(2064),l=o(629),n=o(6163),c=o(3459),_={mixins:[c.XR],data(){return{followers:[],followings:[],isProcessing:!1}},computed:{...(0,l.rn)(["currentUser"])},created(){const{id:t}=this.$route.params;this.fetchFollower(t),this.fetchFollowings(t)},methods:{async fetchFollower(t){try{const{data:s}=await e.Z.getFollowers({userId:t});if("error"===s.status)throw new Error(s.message);this.followers=[...s]}catch(s){console.log("error",s),n.bW.fire({title:"無法取得使用者資料，請稍後再試"})}},async fetchFollowings(t){try{const{data:s}=await e.Z.getFollowings({userId:t});if("error"===s.status)throw new Error(s.message);this.followings=[...s]}catch(s){console.log("error",s),n.bW.fire({title:"無法取得使用者資料，請稍後再試"})}},async deleteFollower(t){try{this.isProcessing=!0;const{data:s}=await a.Z.deleteFollow({followingId:t});if("error"===s.status)throw new Error(s.message);this.followers=this.followers.map((s=>s.id===t?{...s,isFollowed:!1}:s)),this.isProcessing=!1}catch(s){this.isProcessing=!1,console.error("error",s),n.bW.fire({title:"無法取消追蹤使用者，請稍後再試"})}},async addFollower(t){try{if(this.isProcessing=!0,this.currentUser.id===t)return n.KV.fire({title:"無法追蹤自己，謝謝"}),void(this.isProcessing=!1);const{data:s}=await a.Z.addFollow({id:t});if("error"===s.status)throw new Error(s.message);this.followers=this.followers.map((s=>s.id===t?{...s,isFollowed:!0}:s)),this.isProcessing=!1}catch(s){this.isProcessing=!1,console.error("error",s),n.bW.fire({title:"無法追蹤使用者，請稍後再試"})}},async deleteFollowing(t){try{this.isProcessing=!0;const{data:s}=await a.Z.deleteFollow({followingId:t});if("error"===s.status)throw new Error(s.message);this.followings=this.followings.map((s=>s.id===t?{...s,isFollowed:!1}:s)),this.isProcessing=!1}catch(s){this.isProcessing=!1,console.error("error",s),n.bW.fire({title:"無法取消追蹤使用者，請稍後再試"})}},async addFollowing(t){try{if(this.isProcessing=!0,this.currentUser.id===t)return n.KV.fire({title:"無法追蹤自己，謝謝"}),void(this.isProcessing=!1);const{data:s}=await a.Z.addFollow({id:t});if("error"===s.status)throw new Error(s.message);this.followings=this.followings.map((s=>s.id===t?{...s,isFollowed:!0}:s)),this.isProcessing=!1}catch(s){this.isProcessing=!1,console.error("error",s),n.bW.fire({title:"無法追蹤使用者，請稍後再試"})}}}},d=_,w=o(1001),u=(0,w.Z)(d,r,i,!1,null,"3485c316",null),f=u.exports},1425:function(t,s,o){o.d(s,{Z:function(){return n}});var r=function(){var t=this,s=t._self._c;return s("ul",{staticClass:"nav"},[s("li",{staticClass:"nav-item"},[s("router-link",{staticClass:"nav-link",class:{active:"user-followers"===t.$route.name},attrs:{to:{name:"user-followers"}}},[t._v("追蹤者")])],1),s("li",{staticClass:"nav-item"},[s("router-link",{staticClass:"nav-link",class:{active:"user-followings"===t.$route.name},attrs:{to:{name:"user-followings"}}},[t._v("正在追隨")])],1)])},i=[],e=o(1001),a={},l=(0,e.Z)(a,r,i,!1,null,"35866ea0",null),n=l.exports},813:function(t,s,o){o.r(s),o.d(s,{default:function(){return h}});var r=function(){var t=this,s=t._self._c;return t.isLoading?s("Spinner"):s("div",{staticClass:"follow__container"},[s("MainNav"),s("div",{staticClass:"user__follow__wrapper"},[s("div",{staticClass:"user__follow__header"},[s("router-link",{attrs:{to:{name:"user-tweets"}}},[s("img",{attrs:{src:o(7841),alt:"arrow"}})]),s("div",[s("h4",{staticClass:"header__name"},[t._v(t._s(t.user.name))]),s("p",{staticClass:"header__tweet__count"},[t._v(t._s(t.user.tweetCount)+"推文")])])],1),s("FollowPills"),s("FollowCard",{attrs:{user:t.user}})],1),s("PopularList")],1)},i=[],e=(o(1703),o(8189)),a=o(1425),l=o(5285),n=o(446),c=o(9682),_=o(6163),d=o(8428),w={components:{MainNav:e.Z,FollowPills:a.Z,FollowCard:l.Z,PopularList:n.Z,Spinner:d.Z},data(){return{user:{id:-1,name:"",tweetCount:""},isLoading:!0}},created(){const{id:t}=this.$route.params;this.fetchUser(t)},methods:{async fetchUser(t){try{const{data:s}=await c.Z.getUser({userId:t});if("error"===s.status)throw new Error(s.message);this.user={...this.user,...s},this.isLoading=!1}catch(s){this.isLoading=!1,console.log("error",s),_.bW.fire({title:"無法取得使用者資料，請稍後再試"})}}}},u=w,f=o(1001),g=(0,f.Z)(u,r,i,!1,null,"30000fc0",null),h=g.exports},7841:function(t){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAcCAYAAAAEN20fAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAB3SURBVHgB7dfBCcAgEATATSpICenM0q8E7cB44MME80iE288urPhzwAMR+J7Umlut7ynxg+vQDEKeCK8hODNERfDVCCGEEEL8RUTV3LD1zQluyt6WA/wUX9hXkzHM4hsmdFiFEUYYYZgYyr9mhjEQkzrg9kas5gJC0MMjt72jBgAAAABJRU5ErkJggg=="}}]);
//# sourceMappingURL=813.56fe4295.js.map