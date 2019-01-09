<template>
    <div>
        <mt-tabbar v-model="selected">
        <mt-tab-item id="miste">
            <icon slot="icon" name="miste"></icon>
            外卖
        </mt-tab-item>
                <mt-tab-item id="order">
            <icon slot="icon" name="dingdan"></icon>
            订单
        </mt-tab-item>
                <mt-tab-item id="search">
            <icon slot="icon" name="sousuo"></icon>
            搜索
        </mt-tab-item>
                <mt-tab-item id="profile">
            <icon slot="icon" name="wode"></icon>
            我的
        </mt-tab-item>
        </mt-tabbar>
    </div>

</template>
<script>
export default {
    data() {
        return{
            initselect:''
        }

    },

Comment:{

},
 mounted: function() {
 if(!sessionStorage.getItem("selectval")){
    sessionStorage.setItem("selectval",this.$store.state.selected);
    this.initselect=sessionStorage.getItem("selectval")
    } else {this.initselect=sessionStorage.getItem("selectval")}

  },
  beforeDestroy:function(){
         sessionStorage.removeItem("selectval")
  },

computed:{
     selected:{
         get(){ 
            //    console.log(this.initselect),
            //    console.log(this.$store.state.selected)
             return this.initselect
           
         },
         set(value){
             this.$store.commit('changeselect',value),
             this.$router.push(value)
         }
     }
},
methods:{
}
}

</script>
<style scoped>

</style>

