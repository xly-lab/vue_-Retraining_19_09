<template>
    <section class="search" ref="search">
        <HeaderTop title="搜索"/>
        <form class="search_form"  action="#" @submit.prevent="search">
            <input type="search"
                   name="search"
                   placeholder="请输入商家或美食名称"
                   class="search_input"
                   v-model="keyWord">
            <input type="submit" class="search_submit" >
<!--            @click.prevent="search"-->
        </form>
        <section class="list" v-if="searchShops.length" ref="list">
            <ul class="list_container">
                <router-link :to="{path:'/shop', query:{id:item.id}}" tag="li" v-for="item in searchShops" :key="item.id" class="list_li">
                    <section class="item_left">
                        <i  class=" iconfont icon-shangpin"></i>
                    </section>
                    <section class="item_right">
                        <div class="item_right_text">
                            <p>
                                <span>{{item.name}}</span>
                            </p>
                            <p>月售 {{item.month_sales||item.recent_order_num}} 单</p>
                            <p>{{item.delivery_fee||item.float_minimum_order_amount}} 元起送 / 距离{{item.distance}}</p>
                        </div>
                    </section>
                </router-link>
            </ul>
        </section>

        <div class="search_none" v-if="emptyResult">很抱歉！无搜索结果</div>
    </section>
</template>

<script>
    import HeaderTop from "../../components/HeaderTop/HeaderTop";
    import BS from 'better-scroll'
    import {mapState} from 'vuex'
    export default {
        data(){
            return{
                keyWord:'',
                emptyResult:false,
                k:false
            }
        },
        methods:{
            search () {
                const keyWord = this.keyWord.trim();
                if(keyWord) {
                    this.emptyResult = false;
                    this.$store.dispatch('getSearchShops', {keyWord})
                }
            }
        },
        computed:{
            ...mapState(['searchShops']),
        },
        watch: {
            searchShops (val) {
                if(!val.length) {
                    this.emptyResult = true
                }
            }
        },
        components:{
            HeaderTop
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../common/stylus/mixins.styl"

    .search  //搜索
        width 100%
        height 100%
        overflow hidden
        display flex
        .search_form
            position fixed
            width 100%
            clearFix()
            margin-top 45px
            background-color #fff
            padding 12px 8px
            input
                height 35px
                padding 0 4px
                border-radius 2px
                font-weight bold
                outline none
                &.search_input
                    float left
                    width 79%
                    border 4px solid #f2f2f2
                    font-size 14px
                    color #333
                    background-color #f2f2f2
                &.search_submit
                    flex 1
                    margin-left 20px
                    border 4px solid #458aa7
                    font-size 16px
                    color #fff
                    background-color #458aa7
        .list
            margin-top 104px
            margin-bottom 50px
            .list_container
                width 100%
                background-color: #fff;
                .list_li
                    display: flex;
                    justify-content: center;
                    padding: 10px
                    border-bottom: 1px solid $bc;
                    .item_left
                        flex 1
                        height 50px
                        .icon-shangpin
                            margin 16px
                            padding-top 20xp

                    .item_right
                        width 80%
                        font-size 12px
                        .item_right_text
                            display: flex
                            flex-direction column
                            p
                                line-height 12px
                                margin-bottom 6px
                                span
                                    display block
                                &:last-child
                                    margin-bottom 0
        .search_none
            margin: 0 auto
            margin-top 104px
            color: #333
            background-color: #fff
            text-align: center
</style>