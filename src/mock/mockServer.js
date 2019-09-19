
import data from './data'
import Mock from 'mockjs'

Mock.mock('/goods',{code:0,goods:data.goods}) ;

Mock.mock('/retings',{code:0,retings:data.ratings});

Mock.mock('/info',{
    code:0,
    info:{
        "name": Mock.mock('@ctitle(5,8)'),
        "description": "硅谷专送",
        "deliveryTime|10-30": 28,
        "score|1-4.1":4.7,
        "serviceScore|1-4.1": 4.1,
        "foodScore|1-4.1": 4.3,
        "rankRate|1-100.1": 69.2,
        "minPrice|10-20.1": 20,
        "deliveryPrice|1-5": 4,
        "ratingCount|10-100": 24,
        "sellCount|1-100": 90,
        "distance|100-5000": 1000,
        "bulletin": Mock.mock('@csentence(40)'),
        "supports": [
        {
            "type": 0,
            "name": "首单",
            "content": "新用户下单立减17元(不与其它活动同享)"
        },
        {
            "type": 1,
            "name": "满减",
            "content": "满35减19，满65减35"
        },
        {
            "type": 2,
            "name": "特价",
            "content": "【立减19.5元】欢乐小食餐"
        },
        {
            "type": 2,
            "name": "特价",
            "content": "【立减29元】火烤菠萝皇堡双人餐"
        },
        {
            "type": 2,
            "name": "特价",
            "content": "【立减16.5元】火烤菠萝皇堡单人餐"
        },
        {
            "type": 2,
            "name": "特价",
            "content": "【立减15】经典安格斯单人餐"
        },
        {
            "type": 2,
            "name": "特价",
            "content": "【立减11.95】皇堡双人餐"
        },
        {
            "type": 2,
            "name": "特价",
            "content": "【立减19.8】半价单人餐"
        }
    ],
        "avatar": "https://fuss10.elemecdn.com/8/40/02872ce8aefe75c16d3190e75ad61jpeg.jpeg",
        "bgImg": "https://fuss10.elemecdn.com/f/5c/ead54394c3de198d3e6d3e9111bbfpng.png",
        "pics": [
        "https://fuss10.elemecdn.com/f/7f/d1422ec824a0a9d1fb879c57ab533jpeg.jpeg",
        "https://fuss10.elemecdn.com/6/82/2cd3d681f5e93292b3eb49d6b412ajpeg.jpeg",
        "https://fuss10.elemecdn.com/8/93/4cf527b6462eea634f69755374f88jpeg.jpeg",
        "https://fuss10.elemecdn.com/3/f2/2a8796ba025a5773fd685a95ac369jpeg.jpeg",
        "https://fuss10.elemecdn.com/a/c4/5a78f477fd616a51ce33586a76ddbjpeg.jpeg"
    ],
        "category": Mock.mock('@csentence(4,7)'),
        "phone": "18501083744",
        "address": "北京市丰台区太平桥44号",
        "workTime": "09:35-24:00"
},});

