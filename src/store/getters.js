export default {

    totalCount(state){
        return state.cartFoods.reduce((AllCount,food)=>AllCount+food.count,0)
    },

     totalPri(state){
        return state.cartFoods.reduce((AllCount,food)=>AllCount+food.count*food.price,0)
    }

}