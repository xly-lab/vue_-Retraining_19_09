<template>
    <div class="shop-max-container">
        <ShopHeader/>
        <div class="tab">
                <div class="tab-item">
                    <router-link to="/shop/goods" replace>点餐</router-link>
                </div>
                <div class="tab-item">
                    <router-link to="/shop/retings" replace>评价</router-link>
                </div>

                <div class="tab-item">
                    <router-link to="/shop/info" replace>信息</router-link>
                </div>
        </div>
        <keep-alive>
            <router-view/>
        </keep-alive>
    </div>
</template>

<script>
    import ShopHeader from "../../components/ShopHeader/ShopHeader";
    export default {
        components:{
            ShopHeader,
        }
    }
</script>

<style lang="stylus" ref="stylussheet/stylus">
    @import "../../common/stylus/mixins.styl"

    .tab
        height 40px
        line-height 40px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        .tab-item
            float left
            width: 33.33333%
            text-align center
            font-size 14px
            color rgb(77, 85, 93)
            a
                display block
                &.router-link-active
                    color #2278a7
                    border-bottom 1px solid #2278a7

</style>