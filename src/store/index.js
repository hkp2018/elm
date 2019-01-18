import Vue from 'vue'
import Vuex from 'vuex'
Vue.use (Vuex)
const state={
    nowcity:{"name":"","id":""},
    selected:"miste",
    located:""
}
const mutations={
    changeselect(state,selectedvalue){   //改变选择页面
            state.selected=selectedvalue
    },
    changecity(state,nowcity){
        state.nowcity=nowcity;
       if( localStorage.getItem("nowcity")){
           localStorage.setItem("nowcity",nowcity.name) //多余了 直接改就好
       } else {
        localStorage.setItem("nowcity",nowcity.name)
       }

    },
    changelocated(state,located){
        state.located=located;
        localStorage.setItem("located",located)
    }
}
const store = new Vuex.Store({
    state,
    mutations
})
export default store