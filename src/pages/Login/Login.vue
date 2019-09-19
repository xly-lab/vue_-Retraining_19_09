<template>
    <div class="loginContainer">
        <div class="loginInner">
            <div class="login_header">
                <h2 class="login_logo"> 外卖</h2>
                <div class="login_header_title">
                    <a href="javascript:;" :class="{on : loginWay}" @click="loginWay=true">短信登录</a>
                    <a href="javascript:;" :class="{on : !loginWay}" @click="loginWay=false">密码登录</a>
                </div>
            </div>
            <div class="login_content">
                <form @submit.prevent="login">
                    <div :class="{on : loginWay}">
                        <section class="login_message">
                            <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
                            <button :disabled="!rightPhone" class="get_verification" :class="{right_phone :rightPhone}" @click.prevent="getCode">
                                {{computedTime>0?`已发送${computedTime}s`:'获取验证码'}}</button>
                        </section>
                        <section class="login_verification">
                            <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
                        </section>
                        <section class="login_hint">
                            温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                            <a href="javascript:;">《用户服务协议》</a>
                        </section>
                    </div >
                    <div :class="{on : !loginWay}">
                        <section>
                            <section class="login_message">
                                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="username">
                            </section>
                            <section class="login_verification">
                                <input :type="showPwd?'text':'password'" maxlength="8" placeholder="密码" v-model="pwd">
                                <div class="switch_button" :class="showPwd?'on':'off'" @click="showPwd=!showPwd">
                                    <div class="switch_circle" :class="{right:showPwd}"></div>
                                    <span class="switch_text">{{showPwd?'abc':'...'}}</span>
                                </div>
                            </section>
                            <section class="login_message">
                                <input type="text" maxlength="11" placeholder="验证码" v-model="viewcode">
                                <img class="get_verification"
                                     src="http://localhost:4000/captcha" alt="captcha"
                                     @click="changeCaptcha"
                                     ref="captcha">
                            </section>
                            <section class="login_hint">
                                温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                                <a href="javascript:;">《用户服务协议》</a>
                            </section>
                        </section>
                    </div>
                    <button class="login_submit">登录</button>
                </form>
                <a href="javascript:;" class="about_us">关于我们</a>
            </div>
            <span href="javascript:" class="go_back " @click="$router.back()">
                <i class="iconfont icon-arrow-left"></i>
            </span>
        </div>
        <AlterTip :alertText="alertText" v-show="showTip" @closeTip="closeTip"/>
    </div>
</template>

<script>
    import AlterTip from "../../components/AlterTip/AlterTip";
    import {reqSendCode,reqPhoneLogin,reqPwdLogin} from '../../api'
    export default {
        components:{
            AlterTip
        },
        data(){
            return{
                loginWay:true,
                phone:'',
                computedTime:0,
                showPwd:false,
                pwd:'',
                username:'',
                viewcode:'',
                code:'',
                showTip:false,
                alertText:''
            }
        },
        mounted() {
            this.phone='';
            this.pwd='';
            this.code='';
            this.username='';
            this.viewcode=''
        },
        methods:{
            //提示信息
            alertShow(alertText){
                this.showTip=true;
                this.alertText=alertText
            },
            //关闭提示框
            closeTip(){
                this.showTip=false;
                this.alertText=''
            },
            //获取验证码
            async getCode() {
                if(!this.computedTime){
                    this.computedTime=30;
                     this.IntervalID =  setInterval(()=>{
                       this.computedTime--;
                       if(this.computedTime===0) clearInterval(this.IntervalID);
                    },1000)
                }
                const result =await reqSendCode(this.phone);
                if(result.code === 1){
                    this.computedTime=0;
                    this.alertShow(result.msg);
                    clearInterval(this.IntervalID);
                }
            },
            //登录前台验证
            async login(){
                let result;
                if(this.loginWay){
                    const phoneReg=/^[1][3,4,5,7,8][0-9]{9}$/;
                    if(this.phone.length<11||this.phone.length>11 ){
                        //电话号码不正确
                        if(phoneReg.test(this.phone)){
                            this.alertShow("电话号码不正确 ")
                        }else this.alertShow("电话号码长度不正确 ")
                        return;
                    }
                    if(!this.code){
                        //验证码不正确
                        this.alertShow("验证码不能为空");
                        return;
                    }
                    result = await reqPhoneLogin(this.phone,this.code)
                }else{
                    if(!this.username){
                        //用户名不能为空
                        this.alertShow("用户名不能为空");
                        return ;
                    }else if(!this.pwd){
                        //密码不能为空
                        this.alertShow("密码不能为空");
                        return ;

                    }else if(!this.viewcode){
                        //验证码不能为空
                        this.alertShow("验证码不能为空");
                        return ;
                    }
                    result = await reqPwdLogin({name:this.username,pwd:this.pwd,captcha:this.viewcode})
                }
                if(result.code ===0){
                    const userinfo = result.data;
                    this.$store.dispatch('getUserInfo',userinfo)
                    this.$router.replace('profile')
                }else {
                    this.username='';
                    this.pwd='';
                    this.viewcode='';
                    this.changeCaptcha();
                    const msg =result.msg;
                    this.alertShow(msg)
                }
            },
            //改变验证图片
            changeCaptcha(){
                this.$refs.captcha.src = "http://localhost:4000/captcha?time="+Date.now()
            }
        },
        computed:{
            rightPhone(){
                const {phone} =this;
                const phoneReg=/^[1][3,4,5,7,8][0-9]{9}$/;
                return phoneReg.test(phone);
            }
        },
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../common/stylus/mixins.styl"
    .loginContainer
        width 100%
        height 100%
        background #fff
        .loginInner
            padding-top 60px
            width 80%
            margin 0 auto
            .login_header
                .login_logo
                    font-size 40px
                    font-weight bold
                    color #458aa7
                    text-align center
                .login_header_title
                    display flex
                    padding-top 40px
                    padding-left 30px
                    justify-content space-around
                    >a
                        color #333
                        font-size 14px
                        padding-bottom 4px
                        &:first-child
                            margin-right 40px
                        &.on
                            color #458aa7
                            font-weight 700
                            border-bottom 2px solid #458aa7
            .login_content
                >form
                    >div
                        display none
                        &.on
                            display block
                        input
                            width 100%
                            height 100%
                            padding-left 10px
                            box-sizing border-box
                            border 1px solid #ddd
                            border-radius 4px
                            outline 0
                            font 400 14px Arial
                            &:focus
                                border 1px solid #458aa7
                            &.worse_phone
                                border 1px solid #dd2525
                        .login_message
                            position relative
                            margin-top 16px
                            height 48px
                            font-size 14px
                            background #fff
                            .get_verification
                                position absolute
                                top 50%
                                right 10px
                                transform translateY(-50%)
                                border 0
                                color #ccc
                                font-size 14px
                                background transparent
                                &.right_phone
                                    color #458aa7
                        .login_verification
                            position relative
                            margin-top 16px
                            height 48px
                            font-size 14px
                            background #fff
                            .switch_button
                                font-size 12px
                                border 1px solid #ddd
                                border-radius 8px
                                transition background-color .3s,border-color .3s
                                padding 0 6px
                                width 30px
                                height 16px
                                line-height 16px
                                color #fff
                                position absolute
                                top 50%
                                right 10px
                                transform translateY(-50%)
                                &.off
                                    background #fff
                                    .switch_text
                                        float right
                                        color #ddd
                                &.on
                                    background #458aa7
                                >.switch_circle
                                    //transform translateX(27px)
                                    position absolute
                                    top -1px
                                    left -1px
                                    width 16px
                                    height 16px
                                    border 1px solid #ddd
                                    border-radius 50%
                                    background #fff
                                    box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                                    transition transform .3s
                                    &.right
                                        transform translateX(30px)
                        .login_hint
                            margin-top 12px
                            color #999
                            font-size 14px
                            line-height 20px
                            >a
                                color #458aa7
                    .login_submit
                        display block
                        width 100%
                        height 42px
                        margin-top 30px
                        border-radius 4px
                        background #4082a7
                        color #fff
                        text-align center
                        font-size 16px
                        line-height 42px
                        border 0
                .about_us
                    display block
                    font-size 12px
                    margin-top 20px
                    text-align center
                    color #999
            .go_back
                position absolute
                top 10px
                left 10px
                width 30px
                height 30px
                >.iconfont
                    font-size 20px
                    color #999
</style>