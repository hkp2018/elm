import Vue from 'vue'
import Vuex from 'vuex'
Vue.use (Vuex)
const state={
    nowcity:{"name":"","id":""},
    selected:"miste"
}
const mutations={
    changeselect(state,selectedvalue){
            state.selected=selectedvalue
    }
}
const store = new Vuex.Store({
    state,
    mutations
})
export default store