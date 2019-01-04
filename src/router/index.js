import Vue from 'vue'
import Router from 'vue-router'
import home from '../page/home'
import login from '../page/login'
import city from '../page/city/city'
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      component:()=>import('../App.vue'),
      children: [
        {
          path:'',
          redirect:'/home'
        },
        {
          path:'/home',
          component:home
        },
        {
          path:'/login',
          component:login
        },
        {
          path:'/city',
          component:city
        }
         ]
    
    }]
})





    // {
    //   path:'/',
    //   redirect:'/home'
      
    // },
    // {
    //   path:'/home',
    //   name:'home',
    //   component:home,
    //   children:[
    //     {
    //       path:'login',
    //       component:login
    //     }
    //   ]
    // }




      // path:'/home',
      //     component:home
      //   },
      //   {
      //     path:'/',
      //     component:login
      //   },
      //   {
      //     path:'',
      //     redirect:'/home'
      //   }
