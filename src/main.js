/*
* 入口js
* */

import Vue from "vue"
import App from "./App.vue";
import router from "./router"
import store from './store'
import {Button} from 'mint-ui'
import {Input,Card,Row,Col,Tabs,TabPane} from 'element-ui'
import VueLazyload from 'vue-lazyload'

import loading from './common/images/loading.gif'
import './mock/mockServer'
import './filters'

Vue.use(VueLazyload,{
    loading
});
Vue.component(Button.name, Button);
Vue.component(Input.name, Input);
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Tabs)
Vue.use(TabPane)

new Vue({
    el:"#app",
    render:p=>p(App),
    router,
    store
});
