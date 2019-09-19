/*
* 通过mutations 间接更新数据的方法
* */
import {
    RECEVIE_ADDRESS,RECEVIE_CATEGORYS,RECEVIE_SHOPS,RECIVIE_SEARCH_SHOPS,
    RECEVIE_USER_INFO,RESET_USER_INFO,RECEVIE_GOODS,EMPTY_CART,
    RECEVIE_INFO,RECEVIE_RETINGS,ADD_FOOD_COUNT,REDUCE_FOOD_COUNT
} from './mutatin-types'
import {
    reqAdress,reqCategorys,reqShops,reqUserInfo,reqLogout,
    reqShopGoods,reqShopInfo,reqShopRetings,reqSearchShops
} from '../api/index'

export default {
    async getAddress({commit,state}){
        const geohash = state.latitude+','+state.longitude;
        const result  = await reqAdress(geohash);
        commit(RECEVIE_ADDRESS,{address:result.data})
    },
    async getCategorys({commit}){
        const result = await reqCategorys();
        commit(RECEVIE_CATEGORYS,{categorys:result.data})
    },
    async getShops({commit,state}){
        const {latitude,longitude} = state;
        const result = await reqShops(latitude,longitude);
        commit(RECEVIE_SHOPS,{shops:result.data})
    },
    getUserInfo({commit},userinfo){
        commit(RECEVIE_USER_INFO,{userinfo})
    },
    async getUserMsg({commit}){
        const result = await reqUserInfo();
        if(result.code===0){
            commit(RECEVIE_USER_INFO,{userinfo:result.data})
        }else commit(RESET_USER_INFO)
    },
    async resetUser({commit}){
        const result = await reqLogout();
        if(result.code === 0){
            commit(RESET_USER_INFO)
        }
    },
    async getGoods({commit},cb){
        const result = await reqShopGoods();
        commit(RECEVIE_GOODS,{goods:result.goods});
        cb && cb()
    },
    async getInfo({commit}){
        const result = await reqShopInfo();
        commit(RECEVIE_INFO,{info:result.info})
    },
    async getRetings({commit},cb){
        const result = await reqShopRetings();
        if(result.code===0){
            commit(RECEVIE_RETINGS,{retings:result.retings});
            cb&&cb()
        }
    },
    controlCount({commit},{isAdd,food}){
        if(isAdd){
            commit(ADD_FOOD_COUNT,{food})
        }else     commit(REDUCE_FOOD_COUNT,{food})
    },
    emptyCart({commit}){
        commit(EMPTY_CART)
    },
    async getSearchShops({commit,state},{keyWord}){
        const geohash = state.latitude+','+state.longitude;
        const result = await reqSearchShops(geohash,keyWord);
        if(result.code===0){
            commit(RECIVIE_SEARCH_SHOPS,{searchShops:result.data})
        }
    }
}