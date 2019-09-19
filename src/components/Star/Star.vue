<template>
    <div :class="`star star-${size}`">
        <span v-for="(star,index) in starClass" class="star-item" :class="star" :key="index"></span>
    </div>
</template>

<script>
    export default {
        props:{
            size:Number,
            score:Number
        },
        computed:{
            starClass(){
                const {score} = this;
                const classArr=[];
                var count = 1;
                // debugger
                const times = Math.floor((score*10)/10);
                if(times===5){
                    return ['on','on','on','on','on']
                }
                for(let i =0 ;i<times;i++){
                    classArr.push("on");
                    count++;
                }
                if((score*10)%10>5){
                    classArr.push('half')
                } else classArr.push('off');
                for(let j = 0 ; j < 5-count ;j++)classArr.push('off');
                return classArr;
            }
        }
    }
</script>

<style lang="stylus" ref="stylussheet/stylus">
    @import "../../common/stylus/mixins.styl"
    .star //2x图 3x图
        float left
        font-size 0
        .star-item
            display inline-block
            background-repeat no-repeat
        &.star-48
            .star-item
                width 20px
                height 20px
                margin-right 22px
                background-size 20px 20px
                &:last-child
                    margin-right: 0
                &.on
                    bg-image('./images/star48_on')
                &.half
                    bg-image('./images/star48_half')
                &.off
                    bg-image('./images/star48_off')
        &.star-36
            .star-item
                width 15px
                height 15px
                margin-right 6px
                background-size 15px 15px
                &:last-child
                    margin-right 0
                &.on
                    bg-image('./images/star36_on')
                &.half
                    bg-image('./images/star36_half')
                &.off
                    bg-image('./images/star36_off')
        &.star-24
            .star-item
                width 10px
                height 10px
                margin-right 3px
                background-size 10px 10px
                &:last-child
                    margin-right 0
                &.on
                    bg-image('./images/star24_on')
                &.half
                    bg-image('./images/star24_half')
                &.off
                    bg-image('./images/star24_off')

</style>