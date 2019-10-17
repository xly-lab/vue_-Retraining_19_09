<template>
  <div>
    <HeaderTop title="积分商城">
        <i class="iconfont icon-caret" slot="left" @click="$router.back()"></i>
    </HeaderTop>
      <div class="integral_container">
          <el-row>
            <el-col>
              <el-card :body-style="{ padding: '0px' }" >
                <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image"/>
                <div style="padding: 14px;" class="card_info">
                  <span class="card_info_text">好吃的汉堡</span>
                  <div class="bottom clearfix">
                    <time class="time">{{ new Date()|date-fromat }}</time>
                    <mt-button  class="button">看看</mt-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
      </div>
  </div>
</template>

<script>
  import HeaderTop from "../../../components/HeaderTop/HeaderTop";
    export default {
        name: "Integral",
        components:{
            HeaderTop
        }
    }
</script>

<style scoped lang="less">
.integral_container{
  margin: 10px;
  position: absolute;
  top: 50px;
}
.el-card{
  margin-top: 10px;
}
.card_info{
  display: flex;
  flex-direction: column;
}
.card_info .card_info_text{
  font-size: 20px;
  font-weight: 700;
}
.mint-button{
  background-color: #458aa7;
}
.image{
  width: 100%;
}
.bottom{
  display: flex;
}
.bottom .time{
  font-size: 16px;
  height: 41px;
}
  .bottom .mint-button{
    width: 200px;
  }
  .icon-caret{
    margin: 10px;
    font-size: 20px;
    position: absolute;
    color: white;
  }
</style>
