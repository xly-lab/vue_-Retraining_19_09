<template>
    <div class="cartcontrol">
        <transition name="move">
            <div class="iconfont icon-jian" v-if="food.count" @click.stop="controlCount(false)"></div>
        </transition>
        <div class="cart-count" v-if="food.count">{{food.count}}</div>
        <div class="iconfont icon-jia" @click.stop="controlCount(true)"></div>
    </div>
</template>

<script>
    export default {
        props:{
            food:Object
        },
        methods:{
            controlCount(isAdd){
                this.$store.dispatch('controlCount',{isAdd,food:this.food})
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixins.styl"
    .cartcontrol
        font-size: 0
        .cart-decrease
            display: inline-block
            padding: 6px
            line-height: 24px
            font-size: 24px
            color $green
        .icon-jian
            display: inline-block
            padding 6px
            line-height 24px
            font-size 24px
            color $green
            &.move-enter-active,&.move-leave-active
                transition all.3s
            &.move-enter,&.move-leave-to
                transform translateX(20px) rotate(180deg)
                opacity 0
        .cart-count
            display: inline-block
            vertical-align: top
            width: 12px
            padding-top: 6px
            line-height: 24px
            text-align: center
            font-size: 10px
            color: rgb(147, 153, 159)
        .icon-jia
            display: inline-block
            padding: 6px
            line-height: 24px
            font-size: 24px
            color $green
</style>
