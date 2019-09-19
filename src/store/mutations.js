/*
* 直接更新state的多个方法
* */
import Vue from 'vue'
import {
    RECEVIE_ADDRESS,RECEVIE_CATEGORYS,RECEVIE_SHOPS,RECIVIE_SEARCH_SHOPS,
    RECEVIE_USER_INFO,RESET_USER_INFO,RECEVIE_GOODS,EMPTY_CART,
    RECEVIE_RETINGS,RECEVIE_INFO,REDUCE_FOOD_COUNT,ADD_FOOD_COUNT
} from './mutatin-types'

export default {
    [RECEVIE_ADDRESS] (state,{address}) {
        state.address=address;
    },
    [RECEVIE_CATEGORYS](state,{categorys}){
        state.categorys=categorys;
    },
    [RECEVIE_SHOPS](state,{shops}){
        state.shops=shops;
    },
    [RECEVIE_USER_INFO](state,{userinfo}){
        state.userinfo=userinfo;
    },
    [RESET_USER_INFO](state){
        state.userinfo={_id:0}
    },
    [RECEVIE_GOODS](state,{goods}){
        state.goods=goods
    },
    [RECEVIE_INFO](state,{info}){
        state.info=info
    },
    [RECEVIE_RETINGS](state,{retings}){
        state.retings=retings
    },
    [ADD_FOOD_COUNT](state,{food}){
        if(!food.count)
        {Vue.set(food,'count',1);state.cartFoods.push(food)}
        else
        {food.count++}
    },
    [REDUCE_FOOD_COUNT](state,{food}){
        if(food.count){
            food.count--;
            if(food.count===0)state.cartFoods.splice(state.cartFoods.indexOf(food),1)
        }
    },
    [EMPTY_CART](state){
        state.cartFoods.forEach(f=>f.count=0);
        state.cartFoods=[]
    },
    [RECIVIE_SEARCH_SHOPS](state,{searchShops}){
        state.searchShops=searchShops
    }
}
