<template>
    <section class="order">
        <HeaderTop title="订单"/>
        <section class="order_no_login" v-if="cartFoods.length===0||userinfo._id===0">
            <img src="./images/person.png" alt="">
            <h3 v-if="userinfo._id===0">登录后查看外卖订单</h3>
            <h3 v-else-if="cartFoods.length===0">你购物车为空</h3>
            <router-link to="/login" v-if="userinfo._id===0" tag="button">立即登陆</router-link>
        </section>
        <div class="cartFoodsList" v-if="cartFoods.length!==0&&userinfo._id!==0">
            <ul>
                    <li class="food-item bottom-border-1px" v-for="(food,i) in cartFoods" :key="i" @click="showFood(food)">
                    <div class="icon">
                        <img width="57" height="57"
                             v-lazy="food.icon">
                    </div>
                    <div class="content">
                        <h2 class="name">{{food.name}}</h2>
                        <p class="desc">{{food.description}}</p>
                        <div class="extra">
                            <span class="count">月售{{food.sellCount}}份</span>
                            <span>好评率{{food.rating}}%</span>
                        </div>
                        <div class="makeLevel">
                            <div class="price">
                                <span class="now">￥{{food.price}}</span>
                            </div>
                            <div class="cartcontrol-wrapper">
                                <CartControl :food="food"/>
                            </div>
                        </div>

                    </div>
                </li>
            </ul>

        </div>
    </section>
</template>

<script>
    import HeaderTop from "../../components/HeaderTop/HeaderTop";
    import CartControl from "../../components/CartControl/CartControl";
    import {mapState} from 'vuex'
    export default {
        computed:{
            ...mapState(['userinfo','cartFoods'])
        },
        components:{
            HeaderTop,CartControl
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixins.styl"

    .order  //订单
        width 100%
        overflow hidden
        .order_no_login
            padding-top 140px
            width 60%
            margin 0 auto
            text-align center
            >img
                display block
                width 100%
                height 30%
            >h3
                padding 10px 0
                font-size 17px
                color #6a6a6a
            >button
                display inline-block
                background #458aa7
                font-size 14px
                color #fff
                border 0
                outline none
                border-radius 5px
                padding 10px 20px
        .cartFoodsList
            margin-top 63px
            margin-bottom 68px
            .food-item
                display: flex
                margin: 18px
                bottom-border-1px(rgba(7, 17, 27, 0.1))
                &:last-child
                    border-none()
                    margin-bottom: 0
                .icon
                    flex: 0 0 57px
                    margin-right: 10px
                .content
                    display flex
                    flex-direction column
                    flex: 1
                    .name
                        margin: 2px 0 8px 0
                        height: 14px
                        line-height: 14px
                        font-size: 14px
                        color: rgb(7, 17, 27)
                    .desc, .extra
                        line-height: 10px
                        font-size: 10px
                        color: rgb(147, 153, 159)
                    .makeLevel
                        display flex
                        height 48px
                    .desc
                        line-height: 12px
                        margin-bottom: 8px
                    .extra
                        display flex
                        .count
                            margin-right: 12px
                    .price
                        font-weight: 700
                        line-height: 48px
                        .now
                            margin-right: 8px
                            font-size: 14px
                            color: rgb(240, 20, 20)
                        .old
                            text-decoration: line-through
                            font-size: 10px
                            color: rgb(147, 153, 159)
                    .cartcontrol-wrapper
                        position: absolute
                        right: 0
                        bottom: 5px
</style>
