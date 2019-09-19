<template>
    <div class="msite">
        <!--首页头部-->
        <HeaderTop :title="address.name">
            <router-link class="header_search" slot="left" to="/search">
                <i class="iconfont icon-icon_Search"></i>
            </router-link>
            <router-link class="header_login" slot="right" :to="userinfo._id!==0 ? '/userinfo' : '/login' ">
                <span class="header_login_text" :class=" userinfo._id!==0? 'iconfont icon-wode' : '' ">{{userinfo._id!==0 ? null:'登录|注册'}}</span>
            </router-link>
        </HeaderTop>
        <!--首页导航-->
        <nav class="msite_nav border-1px">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(categorys,index) in categorysArr" :key="index" v-if="categorys">
                        <a href="javascript:" class="link_to_food" v-for="(category,i) in categorys" :key="i">
                            <div class="food_container">
                                <img :src="'https://fuss10.elemecdn.com'+category.image_url">
                            </div>
                            <span>{{category.title}}</span>
                        </a>
                    </div>
                    <img v-else src="./images/msite_back.svg" alt="back">
                </div>
                <!-- Add Pagination -->
                <div class="swiper-pagination"></div>
            </div>
        </nav>
        <!--首页附近商家-->
        <ShopList/>
    </div>
</template>

<script>
    import Swiper from "swiper"
    import 'swiper/dist/css/swiper.min.css'

    import HeaderTop from "../../components/HeaderTop/HeaderTop";
    import ShopList from "../../components/ShopList/ShopList";

    import {mapState,mapActions} from 'vuex'
    export default {
        mounted(){
            this.getCategorys();
            this.getAddress();
            this.getShops();
        },
        watch:{
            categorysArr(v){
                //
                this.$nextTick(()=>{
                    new Swiper(".swiper-container",{
                        loop:true,
                        pagination:{
                            el:'.swiper-pagination'
                        }
                    })
                })
            }
        },
        components:{
            HeaderTop,ShopList
        },
        methods:{
            ...mapActions(['getAddress','getCategorys','getShops'])
        },
        computed:{
            ...mapState(['address','categorys','userinfo']),

            categorysArr(){
                const {categorys} = this;
                const CategorysArr = [];
                let minArr = [];
                // debugger
                categorys.forEach(c =>{
                    if(minArr.length===8)minArr=[];
                    if(minArr.length===0)CategorysArr.push(minArr);
                    minArr.push(c);
                });
                return CategorysArr;
            }

        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixins.styl"
    .msite
        width 100%
        .msite_nav
            bottom-border-1px(#e4e4e4)
            margin-top 45px
            height 200px
            background #fff
            .swiper-container
                width 100%
                height 100%
                .swiper-wrapper
                    width 100%
                    height 100%
                    .swiper-slide
                        display flex
                        justify-content center
                        align-items flex-start
                        flex-wrap wrap
                        .link_to_food
                            width 25%
                            .food_container
                                display block
                                width 100%
                                text-align center
                                padding-bottom 10px
                                font-size 0
                                img
                                    display inline-block
                                    width 50px
                                    height 50px
                            span
                                display block
                                width 100%
                                text-align center
                                font-size 13px
                                color #666
                .swiper-pagination
                    >span.swiper-pagination-bullet-active
                        background #458aa7

</style>