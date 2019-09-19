import Vue from 'vue'
// import moment from 'moment'
import {format} from 'date-fns'

Vue.filter('date-fromat',(value,formatStr='yyyy-MM-dd HH:mm:ss')=>{
    return format(value,formatStr)
});