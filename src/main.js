// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import resource from './resource';//通过import引入
import ElementUI from 'element-ui'
import jquery from 'jquery'
import axios from 'axios'
Vue.prototype.$axios = axios
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
import moment from 'moment'
Vue.prototype.$moment = moment;//赋值使用
//引入element
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
//utils
import utils from './utils/utils.js'
import './utils/common.css';
//过滤器
import filters from './filters/';
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

Vue.use(utils);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  resource,//通过import引入，然后在这里调用
  components: { App },
  template: '<App/>'
})
