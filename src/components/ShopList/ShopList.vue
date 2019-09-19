<template>
    <div class="msite_shop_list border-1px">
        <div class="shop_header">
            <i class="iconfont icon-xuanxiang"></i>
            <span class="shop_header_title">附近商家</span>
        </div>
        <div class="shop_container">
            <ul class="shop_list" v-if="Shops">
                <li class="shop_li border-1px" v-for="(shop, index) in Shops" :key="index">
                    <router-link to="/shop">
                        <div class="shop_left">
                            <img class="shop_img" v-lazy="shop.image_path">
                        </div>
                        <div class="shop_right">
                            <section class="shop_detail_header">
                                <h4 class="shop_title" >{{shop.name}}</h4>
                                <ul class="shop_detail_ul">
                                    <li class="supports" v-for="(support,index) in shop.supports" :key="index">
                                        {{support.icon_name}}
                                    </li>
                                </ul>
                            </section>
                            <section class="shop_rating_order">
                                <section class="shop_rating_order_left">
                                    <Star :size="24" :score="shop.rating" />
                                    <div class="rating_section">
                                        {{shop.rating}}
                                    </div>
                                    <div class="order_section">
                                        月售{{shop.recent_order_num}}单
                                    </div>
                                </section>
                                <section class="shop_rating_order_right">
                                    <span class="delivery_style delivery_left">{{shop.delivery_mode.text==='硅谷专送'?'小谢专送':null}}</span>
                                    <span class="delivery_style delivery_right">准时达</span>
                                </section>
                            </section>
                            <section class="shop_distance">
                                <p class="shop_delivery_msg">
                                    <span>¥{{shop.float_minimum_order_amount}}起送</span>
                                    <span class="segmentation">/</span>
                                    <span>{{shop.piecewise_agent_fee.tips}}</span>
                                </p>
                            </section>
                        </div>
                    </router-link>
                </li>
            </ul>
            <ul v-else>
                <li v-for="i in 6">
                    <img src="./images/shop_back.svg" alt="back1">
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import Star from "../Star/Star";
    import {mapState} from "vuex"
    export default {
        components:{
            Star
        },
        data(){
            return{
                imgs:[
                    'http://elm.cangdu.org/img/164ad0b6a3917599.jpg',
                    'http://elm.cangdu.org/img/1676f0f8d4023093.png',
                    'http://elm.cangdu.org/img/169b328521729704.jpeg',
                    'http://elm.cangdu.org/img/169b8d2863929794.jpg',
                    'http://elm.cangdu.org/img/169c8276d5730064.jpg',
                    'http://elm.cangdu.org/img/169c828963230065.jpg',
                    'http://elm.cangdu.org/img/169c88224f030081.jpg',
                    "http://elm.cangdu.org/img/169c88224f030081.jpg",
                    'http://elm.cangdu.org/img/16a81d493f534281.jpg',
                    'http://elm.cangdu.org/img/16a96313efb38079.jpg',
                    'http://elm.cangdu.org/img/16ade95518e40718.jpg',
                    'http://elm.cangdu.org/img/16b218200c241687.png',
                    'http://elm.cangdu.org/img/16b409b52a542527.jpg',
                    'http://elm.cangdu.org/img/16b409d3da142529.jpg',
                    'http://elm.cangdu.org/img/16b409e7d0b42530.jpg',
                    'http://elm.cangdu.org/img/16b409fd2fd42531.jpg',
                    'http://elm.cangdu.org/img/16b53c62dd345765.jpg',
                    'http://elm.cangdu.org/img/16b7261e13946470.jpg',
                    'http://elm.cangdu.org/img/16b7261e13946470.jpg',
                    'http://elm.cangdu.org/img/16c199354d849644.jpg'
                ],
            }
        },
        computed:{
            ...mapState(['shops']),
            Shops(){
                const {shops,imgs} = this;
                const newShops = [];
                shops.forEach((item,index)=>{
                    item.image_path=imgs[index]
                    newShops.push(item)
                });
                return newShops;
            }
        }
    }
</script>

<style lang="stylus" ref="stylussheet/stylus">
@import "../../common/stylus/mixins.styl"
.msite_shop_list
    z-index 0
    top-border-1px(#e4e4e4)
    margin-top 10px
    background #fff
    .shop_header
        padding 10px 10px 0 10px
        .shop_icon
            margin-left 5px
            color #999
        .shop_header_title
            color #999
            font-size 14px
            line-height 20px
    .shop_container
        margin-bottom 50px
        .shop_list
            .shop_li
                bottom-border-1px(#f1f1f1)
                width 100%
                >a
                    clearFix()
                    display block
                    box-sizing border-box
                    padding 15px 8px
                    width 100%
                    .shop_left
                        float left
                        box-sizing border-box
                        width 23%
                        height 75px
                        padding-right 10px
                        .shop_img
                            display block
                            width 100%
                            height 100%
                    .shop_right
                        float right
                        width 77%
                        .shop_detail_header
                            clearFix()
                            width 100%
                            .shop_title
                                text_ellipsis()
                                float left
                                width 200px
                                color #333
                                font-size 16px
                                line-height 16px
                                font-weight 700
                                &::before
                                    content '品牌'
                                    display inline-block
                                    font-size 11px
                                    line-height 11px
                                    color #333
                                    background-color #ffd930
                                    padding 2px 2px
                                    border-radius 2px
                                    margin-right 5px
                            .shop_detail_ul
                                float right
                                margin-top 3px
                                .supports
                                    float left
                                    font-size 10px
                                    color #999
                                    border 1px solid #f1f1f1
                                    padding 0 2px
                                    border-radius 2px
                        .shop_rating_order
                            clearFix()
                            width 100%
                            margin-top 18px
                            margin-bottom 8px
                            .shop_rating_order_left
                                float left
                                color #ff9a0d
                                .rating_section
                                    float left
                                    font-size 10px
                                    color #ff6000
                                    margin-left 4px
                                .order_section
                                    float left
                                    font-size 10px
                                    color #666
                                    transform scale(.8)
                            .shop_rating_order_right
                                float right
                                font-size 0
                                .delivery_style
                                    transform-origin 35px 0
                                    transform scale(.7)
                                    display inline-block
                                    font-size 12px
                                    padding 1px
                                    border-radius 2px
                                .delivery_left
                                    color #fff
                                    margin-right -10px
                                    background-color #458aa7
                                    border 1px solid #458aa7
                                .delivery_right
                                    color #458aa7
                                    border 1px solid #458aa7
                        .shop_distance
                            clearFix()
                            width 100%
                            font-size 12px
                            .shop_delivery_msg
                                float left
                                transform-origin 0
                                transform scale(.9)
                                width: 200px
                                color #666
                            .segmentation
                                color #ccc
</style>