<template>
    <div>
        <div class="goods">
            <div class="menu-wrapper">
                <ul>
                    <li class="menu-item" v-for="(good,i) in goods" :key="i" :class="{current : currentIndex===i}" @click="moveY(i)">
                        <img class="icon" :src="good.icon" v-if="good.icon" >
                        <span class="text bottom-border-1px">{{good.name}}</span>
                    </li>
                </ul>
            </div>
            <div class="foods-wrapper">
                <ul ref="ulArr">
                    <li class="food-list-hook" v-for="(good,i) in goods" :key="i">
                        <h1 class="title">{{good.name}}</h1>
                        <ul>
                            <li class="food-item bottom-border-1px" v-for="(food,i) in good.foods" :key="i" @click="showFood(food)">
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
                    </li>
                </ul>
            </div>
            <ShopCart/>
        </div>

            <Food :food="food" ref="food"/>

    </div>
</template>

<script>
    import {mapState}  from 'vuex'
    import BetterScroll from 'better-scroll'

    import CartControl from "../../../components/CartControl/CartControl";
    import Food from "../../../components/Food/Food";
    import ShopCart from "../../../components/ShopCart/ShopCart";

    export default {
        data(){
            return{
                SCY:0,
                tops:[],
                food:{}
            }
        },
        mounted() {
            this.$store.dispatch('getGoods',()=>{
                this.$nextTick(()=>{
                    this._initScroll();
                    this._initLis()
                })
            })
        },
        computed:{
            ...mapState(['goods']),
            currentIndex(){
                const {SCY,tops} = this;
                let index =-1;
                tops.findIndex((top,i)=>{
                    if(SCY>=top && SCY<tops[i+1]){
                        index = i;
                        return true;
                    }
                });
                return index
            }
        },
        methods:{
            _initScroll(){
                new BetterScroll('.menu-wrapper',{
                    click:true,
                });
                this.scY =  new BetterScroll('.foods-wrapper',{
                    click:true,
                    probeType:3
                });
                this.scY.on('scroll',({x,y})=>{
                    this.SCY = Math.abs(y)
                })
            },
            _initLis(){
                const tops = [];
                let top =0 ;
                tops.push(top);
                const lis = this.$refs.ulArr.children;
                Array.prototype.slice.call(lis).forEach(li=>{
                    top+=li.clientHeight;
                    tops.push(top);
                });
                this.tops=tops;
            },
            moveY(i){
                this.SCY=this.tops[i];
                this.scY.scrollTo(0,-this.tops[i],300)
            },
            showFood(food){
                this.food=food;
                this.$refs.food.toggleShow()
            }
        },
        components:{
            CartControl,Food,ShopCart

        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../../common/stylus/mixins.styl"
    .goods
        display: flex
        position: absolute
        top: 275px
        bottom: 46px
        width: 100%
        background: #fff;
        overflow: hidden
        .menu-wrapper
            flex: 0 0 80px
            width: 80px
            background: #f3f5f7
            .menu-item
                display: flex
                justify-content: center
                justify-items: center
                height: 54px
                width: 56px
                padding: 0 12px
                line-height: 14px
                &.current
                    position: relative
                    z-index: 10
                    margin-top: -1px
                    background: #fff
                    color: $green
                    font-weight: 700
                    .text
                        border-none()
                .icon
                    margin-top 22px
                    width: 12px
                    height: 12px
                    margin-right: 5px
                    background-size: 12px 12px
                    background-repeat: no-repeat
                .text
                    flex 1
                    width: 56px
                    vertical-align: middle
                    bottom-border-1px(rgba(7, 17, 27, 0.1))
                    font-size: 12px
                    line-height: 56px
        .foods-wrapper
            flex: 1
            .title
                padding-left: 14px
                height: 26px
                line-height: 26px
                border-left: 2px solid #d9dde1
                font-size: 12px
                color: rgb(147, 153, 159)
                background: #f3f5f7
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
