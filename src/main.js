// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill'
import Axios from 'axios'
import { get, post, patch, put } from './api/http'
import qs from 'qs'
import Cookies from 'js-cookie'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/iconfont/iconfont.css'
import './assets/css/base.css'
import store from './store'
import { showFullScreenLoading, tryHideFullScreenLoading } from './api/loading'
import * as custom from './common/js/filter'
import * as Global from './common/js/global'

Vue.use(ElementUI);
Vue.use(Cookies);
Axios.defaults.withCredentials = true;

Vue.prototype.$axios = Axios;
Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;
Vue.prototype.Global = Global//引入全局变量

//请求拦截
Axios.interceptors.request.use(config => {
  //解决IE请求缓存
  if (config.method === 'get') {
    config.params.tForIE = new Date()
  }
  //一个取巧的方法，之后看能怎么优化
  //在axios中传入config，配置一个参数来控制。如果loading为false，则不需要loading（见main.vue getUserMoney方法）
  if (config.loading != undefined && config.loading == false)
    return config;
  if (config.url !== '/item/getGYList.do' && config.url !== '/salPromotion/selectSalPromotion.do')
    showFullScreenLoading();
  return config;
}, err => {
  tryHideFullScreenLoading();
  Message.error({ message: '请求超时!' });
  return Promise.resolve(err);
})

//响应拦截
Axios.interceptors.response.use(res => {
  tryHideFullScreenLoading()
  return Promise.resolve(res);
}, err => {
  tryHideFullScreenLoading();
  return Promise.reject(err);
})
Vue.config.productionTip = false


Object.keys(custom).forEach(key => {
  Vue.filter(key, custom[key])
})

/* eslint-disable no-new */
vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});

Vue.directive('enterNumber', {
  inserted: function (el) {
    el.addEventListener("keypress", function (e) {
      e = e || window.event;
      let charcode = typeof e.charCode === 'number' ? e.charCode : e.keyCode;
      let re = /\d/;
      if (!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey) {
        if (e.preventDefault) {
          e.preventDefault();
        } else {
          e.returnValue = false;
        }
      }
    });
  }
});

Vue.component('currency-input', {
  template: '\
    <span v-bind:class="classObject">\
      <input\
        class="el-input__inner"\
        v-bind:style="styleObject"\
        ref="input"\
        v-bind:placeholder="placeholder"\
        v-bind:value="value"\
        v-on:input="updateValue($event.target.value)"\
      >\
    </span>\
  ',
  data: function () {
    return {
      defaultStyle: {
        width: '85px'
      }
    }
  },
  computed: {
    styleObject: function () {
      return this.customStyle || this.defaultStyle
    },
    classObject: function () {
      return this.customClass || 'el-input--mini'
    }
  },
  props: ['value', 'placeholder', 'customClass', 'customStyle', "decimalNum"],
  methods: {
    // 不是直接更新值，而是使用此方法来对输入值进行格式化和位数限制
    updateValue: function (value) {
      var formattedValue = value;
      var decimalNum = this.decimalNum ? this.decimalNum : 2;//保留位数控制
      formattedValue = value
        //先把非数字的都替换掉，除了数字和小数点
        .replace(/[^\d\.]/g, '')
        .replace(/^0+/g, '0')
        //必须保证第一个为数字而不是小数点
        .replace(/^\./g, '')
        //保证只有出现一个小数点而没有多个. 
        .replace(/\.{2,}/g, '.')
        //保证小数点只出现一次，而不能出现两次以上 
        .replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
        //保留两位小数
        .slice(
          0,
          value.indexOf('.') === -1
            ? value.length
            : value.indexOf('.') + (decimalNum + 1)
        )
      // // 如果值尚不合规，则手动覆盖为合规的值
      if (formattedValue !== value) {
        this.$refs.input.value = formattedValue
      }
      // 通过 input 事件带出数值
      this.$emit('input', formattedValue)
    }
  }
})