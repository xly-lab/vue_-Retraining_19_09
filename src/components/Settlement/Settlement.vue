<template>
    <div class="order_body">
      <HeaderTop title="下单">
        <i class="iconfont icon-caret" slot="left" @click="$router.back()"></i>
      </HeaderTop>
      <div class="get_way">
        <el-tabs type="border-card"  v-model="activeName"@tab-click="handleClick" >
          <el-tab-pane label="骑手信息" name="骑手" >
            <div class="way_info_first">
              <el-input
                placeholder="请输入你的地址"
                v-model="input"
                clearable />
              <div class="way_info_second">
                <el-input
                  disabled
                  placeholder="立即送出"
                  clearable />
                <el-input
                  disabled
                  placeholder="预计送达时间"
                  v-model="time"
                  clearable />
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="到店自取" name="自取">到店自取</el-tab-pane>
        </el-tabs>
      </div>
      <div class="order_list">
        <div class="cartFoodsList" v-if="cartFoods.length!==0">
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
      </div>
      <div class="get_money" @click="getMoney">
        <mt-button type="primary" size="large">￥{{activeName==='骑手'?totalPri +info.deliveryPrice:  totalPri}}  结算下单</mt-button>
      </div>
<!--        <mt-button-->
<!--          plain-->
<!--          @click="open1">-->
<!--          成功-->
<!--        </mt-button>-->
<!--        <mt-button-->
<!--          plain-->
<!--          @click="open2">-->
<!--          警告-->
<!--        </mt-button>-->
<!--        <mt-button-->
<!--          plain-->
<!--          @click="open3">-->
<!--          消息-->
<!--        </mt-button>-->
<!--        <mt-button-->
<!--          plain-->
<!--          @click="open4">-->
<!--          错误-->
<!--        </mt-button>-->
    </div>
</template>
<script>
  import HeaderTop from "../HeaderTop/HeaderTop";
  import CartControl from "../CartControl/CartControl";
  import {mapState,mapGetters} from 'vuex'
  import { Notification } from 'element-ui';
  import { Toast } from 'mint-ui';
    export default {
        name: "Settlement",
        data() {
            return {
                activeName: '骑手',
                input: '',
                time: ''
            }
        },
        computed: {
            ...mapState(['cartFoods', 'userinfo', 'info']),
            ...mapGetters(['totalPri'])
        },
        components: {
            HeaderTop, CartControl
        },
        methods: {
            // open1() {
            //     console.log(this.$notify);
            //
            // },
            // open2() {
            //     this.$notify({
            //         title: '警告',
            //         message: '这是一条警告的提示消息',
            //         type: 'warning'
            //     });
            // },
            // open3() {
            //     this.$notify.info({
            //         title: '消息',
            //         message: '这是一条消息的提示消息'
            //     });
            // },
            // open4() {
            //     this.$notify.error({
            //         title: '错误',
            //         message: '这是一条错误的提示消息'
            //     });
            // },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            getMoney() {
                Notification({
                    title: '成功',
                    message: '支付成功',
                    type: 'success',
                    offset:100
                });
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .order_body{
    overflow hidden
  }
  .icon-caret{
    margin: 10px;
    font-size: 20px;
    position: absolute;
    color: white;
  }
  .get_way{
    margin-top: 50px;
    margin-left: 10px;
    margin-right: 10px;
  }
  .way_info_first{
    margin-left: 10px;
    margin-right: 10px;
  }
  .el-input{
    margin-top: 5px;
  }
  .way_info_second{
    display: flex;
  }
  .way_info_second .el-input:nth-child(2){
    margin-left: 5px;
  }
  .get_money{
    width 80%
    position fixed
    bottom 0
    margin 10%
  }
  .mint-button--large{
    background #458aa7
  }
  .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
    color #458aa7
  }
  @import "../../common/stylus/mixins.styl"
     .cartFoodsList
      margin-top 63px
      margin-bottom 110px
      .food-item
        box-shadow 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04)
        display: flex
        margin: 10px
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
