# xlyshop

> A Vue.js project

## 总结
  - 再次学习vue收获了更多
      -  整个项目再次分析
            - 前台数据处理/交互/组件化  
                -   使用了vue全家桶/技术栈，滑动库，日期处理等。
                -   前后台交互，mock数据，postman接口测试，Ajax请求，重写Ajax（）并使用了promise编写
                
                        import axios from 'axios'
                        
                        export default function ajax(url,data={},type="GET") {
                            return new Promise((resolve, reject) => {
                                let promise;
                                let Str='';
                                if(type==='GET'){
                                    Object.keys(data).forEach(key=>{
                                        Str += key + "=" + data[key] + "&";
                                    });
                                    if(Str!==""){
                                        Str = Str.substring(0,Str.lastIndexOf("&"));
                                        url = url+"?"+Str;
                                    }
                                    promise = axios.get(url);
                                }else{
                                    promise = axios.post(url,data);
                                }
                                promise.then(response=>{
                                    resolve(response.data)
                                })
                                    .catch(err=>{
                                        reject(err)
                                    })
                            })
                        }
                -   模块化 es6 bable(bable整个项目都是简介接触的，比较模糊)
                -   项目构建/工程化 webpack vue-cli eslint

##心得
  - 对于vue还是很好上手的
    - vue里的vue-router 里面有两个重要元素  
        - route：$route对象表示当前的路由信息，包含了当前 URL 解析得到的信息。包含当前的路径，参数，query对象等。
        - router：$router对象是全局路由的实例，是router构造方法的实例。
    - vuex有了新的认识，几个重要的组成部分，下面写我对他们的认识
        - state：这个部分存储的全局所需的变量元素以及数据，和微信小程序里的全局变量很像（app.js里的任意定义数据可作为全局的数据存储单位，自己的理解），但没有这么麻烦
        - action：一个函数工厂吧，里面定义了很多发送同步，异步请求的函数，这些函数自带commit参数，我们可以通过配置好store来全局访问
                
                this.store.dispatch('函数名'，{可能会有的参数})
            调用该函数后，出发内部的Ajax请求函数得到请求的数据，然后通过commit把这写请求到的数据传以一个type(行为tag)给mutations
        - mutations: 定义了一些行为的执行方式(也是函数)，把commit传过来的数据存储到state里面，所以每一个行为函数都有一个state参数
        - getters：相当于vue生命周期里的computed一样，存放的有关属性操作相关的函数，只要对vuex里的state里的任何属性有什么操作都可以定义进来，所以每一个函数也都带有state参数
    - 对vue-lazyload再次熟悉，查查文档也差不多会了
    -   mockjs使用，会拦截Ajax请求...
    -   better-scroll的使用，这个东西的使用真的头大的很  new better-scroll(BS)对象的时机很重要，项目中很多数据的获取都是通过异步获取的，在数据更新前创建BS对象不会起作用，better-scroll的滑动实现不了处理
    解决此问题是用到了两种方法
        -   用watch：假如要确定goods(Array类型)是否已经有值了，在watch里定义一个相同变量名的函数：
        
                goods(value){
                    if(value){//如果goods里面有值了
                        this.$nextTick(()=>{
                            //write your code here
                            //执行你要执行的代码
                        })
                    }
                }
        -   或是通过store调用函数时这样
                
                你的组件里：
                 mounted(){
                        this.$store.dispatch('getGoods',()=>{
                            this.$nextTick(()=>{
                                
                            })
                        })
                    },
                 action里面：
                 async getGoods({commit},cb){
                         const result = await reqShopRetings();
                         if(result.code===0){
                             commit(RECEVIE_RETINGS,{retings:result.retings});
                             cb&&cb()
                         }
                     },
                 cb对应的就是this.$store.dispatch('函数名'，cb回调函数)
                 
        -   反正就是要注意数据是否已经有了啊，或是没有啊
    -  better-scroll补充，在使用时，css样式编辑时你的父元素高度或是宽度一定事固定死了的或是overflow:hidden    
    -   vue-layload 懒加载啊
    -   vue的动画编写transition
        -   学基础的时候没学好，现在理解起来就是难啊，其实也简单，背就好了(傻子一样)官网去理解了下2懂2懂的
    -  vue UI mint-ui 按需使用有些地方要改    
    
  - 现在再次学习vue，以前学的很懵，现在学了感觉都还不错，很多细节的部分也都有所注意和加强  
  - 温故而知新  
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
