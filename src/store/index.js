import Vue from 'vue'
import Vuex from 'vuex'
Vue.use (Vuex)
const state={
    nowcity:{"name":"","id":""}
}
const store = new Vuex.Store({
    state
})
export default store