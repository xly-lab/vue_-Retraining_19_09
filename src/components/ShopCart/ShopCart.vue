<template>
    <div>
        <div class="shopcart">
            <div class="content">
                <div class="content-left" @click="toggleShow">
                    <div class="logo-wrapper">
                        <div class="logo" :class="{highlight:totalCount}">
                            <i class="iconfont " :class="totalCount?'icon-gouwucheman highlight':'icon-gouwuchekong'"></i>
                        </div>
                        <div class="num" v-if="totalCount">{{totalCount}}</div>
                    </div>
                    <div class="price" >￥{{totalPri}}</div>
                    <div class="desc">另需配送费￥{{info.deliveryPrice}}元</div>
                </div>
                <div class="content-right">
                    <div class="pay" :class="resultPri >0 ?'not-enough':'enough'">
                        {{resultPri >0 ? `￥${resultPri}元起送`:'结算'}}
                    </div>
                </div>
            </div>
            <transition name="fade">
                <div class="shopcart-list" v-show="sureShow">
                <div class="list-header">
                    <h1 class="title">购物车</h1>
                    <span class="empty" @click="emptyCart">清空</span>
                </div>
                <div class="list-content">
                    <ul>
                        <li class="food" v-for="(cartFood,i) in cartFoods" :key="i" >
                            <img :src="cartFood.icon" alt="icon" class="icon">
                            <span class="name">{{cartFood.name}}</span>
                            <div class="price"><span>￥{{cartFood.price}}</span></div>
                            <div class="cartcontrol-wrapper">
                                <CartControl :food="cartFood"/>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            </transition>
        </div>
        <div class="list-mask" v-show="sureShow" @click="toggleShow"></div>
    </div>
</template>

<script>
    import {mapGetters,mapState} from 'vuex'
    import BetterScroll from 'better-scroll'

    import CartControl from "../CartControl/CartControl";
    export default {
        data(){
            return{
                isShow:false
            }
        },
        mounted(){
            new BetterScroll('.list-content',{
                click:true,
            });
        },
        computed:{
            ...mapState(['cartFoods','info']),
            ...mapGetters(['totalCount','totalPri']),
            resultPri(){
                const {totalPri} = this;
                const {minPrice} = this.info;
                if(totalPri<=0){return minPrice}
                else if(totalPri<minPrice){
                    const re = (minPrice-totalPri).toFixed(1);
                    return re
                }
                else return minPrice-totalPri
            },
            sureShow(){
                if(this.totalCount===0){
                    this.isShow = false;
                    return false
                }
                return this.isShow
            }
        },
        components:{CartControl},
        methods:{
            emptyCart(){
                this.$store.dispatch('emptyCart')
            },
            toggleShow(){
                if(this.totalCount>0)
                this.isShow=!this.isShow
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../common/stylus/mixins.styl"
    .shopcart
        position: fixed
        left: 0
        bottom: 0
        z-index: 50
        width: 100%
        height: 48px
        .content
            display: flex
            background: #141d27
            font-size: 0
            color: rgba(255, 255, 255, 0.4)
            .content-left
                display flex
                flex: 1
                .logo-wrapper
                    display: inline-block
                    vertical-align: top
                    position: relative
                    top: -10px
                    margin: 0 12px
                    padding: 6px
                    width: 56px
                    height: 56px
                    box-sizing: border-box
                    border-radius: 50%
                    background: #141d27
                    .logo
                        width: 100%
                        height: 100%
                        border-radius: 50%
                        text-align: center
                        background: #2b343c
                        &.highlight
                            background: $green
                        .icon-gouwucheman,.icon-gouwuchekong
                            line-height: 44px
                            font-size: 24px
                            color: #80858a
                            &.highlight
                                color: #fff
                    .num
                        position: absolute
                        top: 0
                        right: 0
                        width: 24px
                        height: 16px
                        line-height: 16px
                        text-align: center
                        border-radius: 16px
                        font-size: 9px
                        font-weight: 700
                        color: #ffffff
                        background: rgb(240, 20, 20)
                        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
                .price
                    display: inline-block
                    vertical-align: top
                    margin-top: 12px
                    line-height: 24px
                    padding-right: 12px
                    box-sizing: border-box
                    border-right: 1px solid rgba(255, 255, 255, 0.1)
                    font-size: 16px
                    font-weight: 700
                    &.highlight
                        color: #fff
                .desc
                    flex 1
                    display: inline-block
                    vertical-align: top
                    text-align center
                    line-height 48px
                    font-size: 10px
            .content-right
                flex: 0 0 105px
                width: 105px
                .pay
                    height: 48px
                    line-height: 48px
                    text-align: center
                    font-size: 12px
                    font-weight: 700
                    &.not-enough
                        background: #2b333b
                    &.enough
                        background: $green
                        color: #fff
        .shopcart-list
            position: absolute
            left: 0
            bottom 48px
            z-index: -1
            width: 100%
            &.fade-enter-active,&.fade-leave-active
                transition all .4s
            &.fade-enter,&.fade-leave-to
                transform translateY(217px)
                opacity 0
            .list-header
                height: 40px
                line-height: 40px
                padding: 0 18px
                background: #f3f5f7
                border-bottom: 1px solid rgba(7, 17, 27, 0.1)
                .title
                    float: left
                    font-size: 14px
                    color: rgb(7, 17, 27)
                .empty
                    float: right
                    font-size: 12px
                    color: rgb(0, 160, 220)

            .list-content
                padding: 0 18px
                max-height: 217px
                overflow: hidden
                background: #fff
                .food
                    position: relative
                    padding: 12px 0
                    box-sizing: border-box
                    bottom-border-1px(rgba(7, 17, 27, 0.1))
                    .icon
                        width 14px
                        height 14px
                        margin-left 5px
                        margin-top 5px
                    .name
                        line-height: 24px
                        font-size: 14px
                        color: rgb(7, 17, 27)
                    .price
                        position: absolute
                        right: 90px
                        bottom: 12px
                        line-height: 24px
                        font-size: 14px
                        font-weight: 700
                        color: rgb(240, 20, 20)
                    .cartcontrol-wrapper
                        position: absolute
                        right: 0
                        bottom: 6px

    .list-mask
        position: fixed
        top: 0
        left: 0
        width: 100%
        height: 100%
        z-index: 40
        backdrop-filter: blur(10px)
        opacity: 1
        background: rgba(7, 17, 27, 0.6)
        &.fade-enter-active, &.fade-leave-active
            transition: all 0.5s
        &.fade-enter, &.fade-leave-to
            opacity: 0
</style>