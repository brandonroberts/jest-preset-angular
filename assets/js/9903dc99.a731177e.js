(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[3008],{3905:function(e,t,r){"use strict";r.d(t,{Zo:function(){return c},kt:function(){return m}});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var u=n.createContext({}),l=function(e){var t=n.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},c=function(e){var t=l(e.components);return n.createElement(u.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},g=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,u=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),g=l(r),m=a,f=g["".concat(u,".").concat(m)]||g[m]||p[m]||i;return r?n.createElement(f,o(o({ref:t},c),{},{components:r})):n.createElement(f,o({ref:t},c))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=g;var s={};for(var u in t)hasOwnProperty.call(t,u)&&(s[u]=t[u]);s.originalType=e,s.mdxType="string"==typeof e?e:a,o[1]=s;for(var l=2;l<i;l++)o[l]=r[l];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}g.displayName="MDXCreateElement"},4052:function(e,t,r){"use strict";r.r(t),r.d(t,{frontMatter:function(){return o},metadata:function(){return s},toc:function(){return u},default:function(){return c}});var n=r(2122),a=r(9756),i=(r(7294),r(3905)),o={id:"angular-ivy",title:"Angular Ivy"},s={unversionedId:"guides/angular-ivy",id:"version-8.x/guides/angular-ivy",isDocsHomePage:!1,title:"Angular Ivy",description:"Currently, jest-preset-angular is partially compatible with Angular Ivy. To make sure that Jest uses the Angular Ivy,",source:"@site/versioned_docs/version-8.x/guides/angular-ivy.md",sourceDirName:"guides",slug:"/guides/angular-ivy",permalink:"/jest-preset-angular/docs/8.x/guides/angular-ivy",editUrl:"https://github.com/thymikee/jest-preset-angular/edit/master/website/versioned_docs/version-8.x/guides/angular-ivy.md",version:"8.x",frontMatter:{id:"angular-ivy",title:"Angular Ivy"},sidebar:"version-8.x-docs",previous:{title:"Test environment",permalink:"/jest-preset-angular/docs/8.x/getting-started/test-environment"},next:{title:"ESM Support",permalink:"/jest-preset-angular/docs/8.x/guides/esm-support"}},u=[],l={toc:u};function c(e){var t=e.components,r=(0,a.Z)(e,["components"]);return(0,i.kt)("wrapper",(0,n.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Currently, ",(0,i.kt)("inlineCode",{parentName:"p"},"jest-preset-angular")," is partially compatible with Angular Ivy. To make sure that Jest uses the Angular Ivy,\nyou must run ",(0,i.kt)("inlineCode",{parentName:"p"},"ngcc")," before running tests. ",(0,i.kt)("inlineCode",{parentName:"p"},"ngcc")," will transform all Angular-format packages to be compatible\nwith Ivy compiler."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"jest-preset-angular")," also provides util script to help you to run ",(0,i.kt)("inlineCode",{parentName:"p"},"ngcc")," with Jest but this script only works via the\nJavaScript version of Jest config"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},"// jest.config.js\nrequire('jest-preset-angular/ngcc-jest-processor');\n\nmodule.exports = {\n  // [...]\n};\n")))}c.isMDXComponent=!0}}]);