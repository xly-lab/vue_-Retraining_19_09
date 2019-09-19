<template>
    <div class="footer_guide border-1px">
        <span class="guide_item"  :class="{on:$route.path ==='/msite' }" @click="goto('/msite')">
            <span class="item_icon">
              <i class="iconfont 48icon_Store icon-icon_Store" ></i>
            </span>
            <span>外卖</span>
        </span>
        <span class="guide_item" :class="{on:$route.path ==='/search' }" @click="goto('/search')">
            <span class="item_icon">
              <i class="iconfont 48icon_Sreach icon-icon_Search"></i>
            </span>
            <span>搜索</span>
        </span>
        <span class="guide_item" :class="{on:$route.path ==='/order' }" @click="goto('/order')">
            <span class="item_icon">
              <i class="iconfont 48icon_Cart icon-icon_Cart"></i>
            </span>
            <span>订单</span>
        </span>
        <span class="guide_item" :class="{on:$route.path ==='/profile' }" @click="goto('/profile')">
            <span class="item_icon">
              <i class="iconfont 48icon_User icon-icon_User"></i>
            </span>
            <span>我的</span>
        </span>
    </div>
</template>

<script>
    export default {
        methods:{
            goto(path){
                this.$router.replace(path);
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixins.styl"
    .footer_guide
        top-border-1px(#e4e4e4)
        position fixed
        z-index 100
        left 0
        right 0
        bottom 0
        background-color #fff
        width 100%
        height 50px
        display flex
        .guide_item
            display flex
            flex 1
            text-align center
            flex-direction column
            align-items center
            margin 5px
            color #999999
            &.on
                color #458aa7
            span
                font-size 12px
                margin-top 2px
                margin-bottom 2px
                .iconfont
                    font-size 22px
</style>