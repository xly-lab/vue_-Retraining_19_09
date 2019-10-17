/*
* 路由器对象模块
* */
import Vue from "vue"
import VueRouter from 'vue-router'


// import Msite from "../pages/Msite/Msite";
// import Search from "../pages/Search/Search";
// import Order from "../pages/Order/Order";
// import Profile from "../pages/Profile/Profile";
//按需加载
const Msite = () => import("../pages/Msite/Msite");
const Search = () => import("../pages/Search/Search");
const Order = () => import("../pages/Order/Order");
const Profile = () => import("../pages/Profile/Profile");

import Login from "../pages/Login/Login";
import ShopGoods from "../pages/Shop/ShopGoods/ShopGoods";
import Shop from "../pages/Shop/Shop";
import ShopInfo from "../pages/Shop/ShopInfo/ShopInfo";
import ShopRetings from "../pages/Shop/ShopRetings/ShopRetings";
import Integral from "../pages/Profile/Integral/Integral";
import Settlement from "../components/Settlement/Settlement";

//声明使用插件
Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/msite',
            meta:{
                shouwFooter:true
            }
        },
        {
            path: '/msite',
            component: Msite,
            meta:{
                shouwFooter:true
            }
        },
        {
            path: '/search',
            component: Search,
            meta:{
                shouwFooter:true
            }
        },
        {
            path: '/order',
            component: Order,
            meta:{
                shouwFooter:true
            }
        },
        {
            path: '/profile',
            component: Profile,
            meta:{
                shouwFooter:true
            }
        },
        {
          path:'/integral',
          component:Integral
        },
        {
            path:'/login',
            component:Login
        },
        {
            path:'/shop',
            component:Shop,
            children:[
                {
                    path:'/shop/goods',
                    component:ShopGoods
                },{
                path: '/shop/retings',
                    component: ShopRetings
                },
                {
                    path: '/shop/info',
                    component: ShopInfo
                },
                {
                    path: '',
                    redirect: '/shop/goods'
                }
            ]

        },
        {
          path:'/settlement',
          component:Settlement
        },
    ]
})
