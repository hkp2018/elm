<template>
  <div>
    <mt-header :title="titlevalue" class="fs1-2" fixed>
      <mt-button @click="goback" slot="left" icon="back"></mt-button>
      <mt-button @click="goback" slot="right" style="font-size: 0.8rem">切换城市</mt-button>
    </mt-header>
    <div class="mgtop50 padlr10 bgfff padbot10">
      <input
        type="search"
        class="cityinput"
        placeholder="输入商务楼，学校，地址"
        required
        v-model="inputval"
      >
      <mt-button type="primary" @click="searchcity" size="large" class="submit bgcol ih40">提交</mt-button>
    </div>

    <!-- <div>
           <form>
        <div class="padtop40">
            <mt-field class='mgtop10 after' placeholder="输入学校、商务楼、地址"></mt-field>
                  <mt-button size="large" type="primary">提交</mt-button>
        </div>
    </form>
    </div>-->
    <div class="main">
      <div v-if="!vif" class="his after">
        <div class="maintop fs0-8 padlr10">搜索历史</div>
        <div   v-if="his!==''" class="mainbody bgfff">
          <div  @click="gomiste(item.name)"  v-for="(item,index) in his" :key="index" class="pad10 after">
            <div class="ih30">{{item.name}}</div>
            <div class="ih30 fs0-8 col9f">{{item.address}}</div>
          </div>
          <div @click="removeall"    class="clearall ih30 pad10 col9f">清空所有</div>
        </div>
      </div>

      <div v-if="vif" class="search bgfff">
        <div  v-for="(item,index) in list" @click="gomiste(item.name);goaddress({name:item.name,latitude:item.latitude,longitude:item.longitude,address:item.address,geohash:item.geohash})"          :key="index" class="pad10 after">
          <div class="ih30">{{item.name}}</div>
          <div class="ih30 fs0-8 col9f">{{item.address}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "../../axios/index";
export default {
  data() {
    return {
      inputval: "",
      list: "",
      vif: false,
      his: "",
      titlevalue:""
    };
  },
  mounted: function() {
    if(localStorage.getItem("his")){
      this.his=JSON.parse(localStorage.getItem("his"));
    };
    if(!sessionStorage.getItem("titlevalue")){
    sessionStorage.setItem("titlevalue",this.$store.state.nowcity.name);
    this.titlevalue=sessionStorage.getItem("titlevalue")
    } else {this.titlevalue=sessionStorage.getItem("titlevalue")}

    // console.log(this.$store.state.nowcity.name)
  },
  beforeDestroy:function(){
         sessionStorage.removeItem("titlevalue")
  },
  computed: {

    
  },
  methods: {
    goback() {
      return this.$router.push("home");
    },
    gomiste:function(e){
      this.$router.push("miste");
      this.$store.commit('changelocated',e) //改变选择地点 绑定到两个事件里面 一个历史记录点击 一个搜索记录点击
    },
    searchcity() {
      if (this.inputval) {
        $.get("v1/pois", {
          params: {
            city_id: this.$store.state.nowcity.id,
            keyword: this.inputval,
            type: "search"
          }
        }).then(Response => {
          this.list = Response.data;
          if(Response.data==""){
            this.$toast('抱歉，没有找到相关数据')
          };
          if (Response.data.message == "参数错误") {
            this.vif = false;
            console.log("提交参数错误");
          } else {
            this.vif = true;
          }
          console.log(Response.data);
        });
      }
    },
    goaddress(e) {
      var arr = [];
      if (localStorage.getItem("his")) {
        arr = JSON.parse(localStorage.getItem("his"));
      for (var i=0;i<arr.length;i++){
        if (arr[i].geohash==e.geohash){
          var isok=true;
        }
      }
      if(!isok){
        arr.unshift(e)
      }
 
      } else {
        arr.unshift(e);
      };
      localStorage.setItem("his",JSON.stringify(arr));
      this.his=JSON.parse(localStorage.getItem("his"));
      console.log(this.his);
    },
    removeall(){
      localStorage.clear();
      this.his="";
    }
  }
};
</script>
<style scoped>
.cityinput {
  width: 100%;
  height: 40px;
  margin: 10px 0px;
  outline: 0px;
  padding: 0px 5px;
  box-sizing: border-box;
}
.submit {
  text-align: center;
  color: white;
  border-radius: 3px;
}
.fs0-8 {
  font-size: 0.8rem !important;
}

.main {
  border-top: 2px solid #e4e4e4;
}
.maintop {
  border-bottom: 2px solid #e4e4e4;
}
.clearall {
  text-align: center;
}
</style>