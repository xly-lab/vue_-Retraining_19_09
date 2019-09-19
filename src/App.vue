<template>
    <div>
        <keep-alive>
            <router-view/>
        </keep-alive>
        <FooterGuide v-if="$route.meta.shouwFooter"/>
    </div>
</template>

<script>
    import FooterGuide from "./components/FooterGuide/FooterGuide";
    import {mapActions} from 'vuex'
    export default {
        mounted(){
            this.getUserMsg();
        },
        components:{
            FooterGuide
        },
        methods:{
            ...mapActions(['getUserMsg'])
        }
    }
</script>

<style lang="stylus" ref="stylussheet/stylus">

</style>