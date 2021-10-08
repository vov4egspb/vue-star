import IceRatingStar from './components/IceRatingStar.vue';

export function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('IceRatingStar', IceRatingStar);
}

const plugin = {
  install,
};

let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

export default IceRatingStar;

// const directives = [
//   maskPhone,
// ];

// const install = (Vue) => {
//   if (install.installed) return;
//   install.installed = true;
//   directives.forEach((directive) => {
//     Vue.directive(directive.name, directive);
//   });
// };

// export {
//   install,
//   maskPhone,
// };

// export default {
//   install,
// };
