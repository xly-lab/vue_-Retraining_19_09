/*
* 入口js
* */

import Vue from "vue"
import App from "./App.vue";
import router from "./router"
import store from './store'
import {Button} from 'mint-ui'
import VueLazyload from 'vue-lazyload'

import loading from './common/images/loading.gif'
import './mock/mockServer'
import './filters'

Vue.use(VueLazyload,{
    loading
});
Vue.component(Button.name, Button);

new Vue({
    el:"#app",
    render:p=>p(App),
    router,
    store
});