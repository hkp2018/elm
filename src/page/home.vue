<template>
  <div>
    <div class="fixed bgfff">
      <mt-header>
        <span slot="left">elm</span>
        <mt-button @click="gologin" slot="right">登录|注册</mt-button>
      </mt-header>
    </div>

    <div class="padtop40 bgf5">
      <div class="ih50 padlr10 box bgfff">
        <span class>当前选择城市</span>
        <span class="right fs0-8 col9f">定位不准时，请在城市列表选择</span>
      </div>
      <mt-cell :title="locatedcity.name" class="col after" to="city" is-link value=""></mt-cell>

      <div class="mgtop10 bgfff">
        <mt-cell class="after" title="热门城市"></mt-cell>
        <div class="itembox ovhid col">
          <div @click="gocity({name:item.name,id:item.di})"  v-for="(item,index) in hotcitylist" :key="index">{{item.name}}</div>
        </div>
      </div>

      <div v-for="(items,key,index) in getlist" :key="index" class="mgtop10 bgfff">
        <mt-cell class="after" :title="key"></mt-cell>
        <div class="itembox ovhid">
          <div class="nowarp" @click="gocity({name:item.name,id:item.di})"  v-for="(item,index) in items" :key="index">{{item.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "../axios/index";
import {mapState} from 'vuex'
export default {
  data() {
    return {
      citylist: "",
      hotcitylist:""
    };
  },
  mounted() {
    this.getdata();
    this.gethot();
    this.getlocatecity();
  },

  methods: {
       getdata () {
      $.get("/cities", { params: { type: "group" } }).then(Response => {
        this.citylist = Response.data;
      });
    },
    gethot(){
      $.get("/cities",{params:{type:"hot"}}).then(Response =>{
        this.hotcitylist=Response.data;
      })
    },
        getlocatecity(){
      $.get("/cities",{params:{type:"guess"}}).then(Response =>{
        this.$store.state.nowcity={"name":Response.data.name,"id":Response.data.id};
      })
    },
   gocity(e) {
      this.$router.push("city");
      this.$store.state.nowcity=e;
    },
    gologin() {
      this.$router.push("login");
    }
  },
  computed: {
    getlist() {
      var mycitylist = {};
      for (var i = 65; i <= 90; i++) {
        var num = String.fromCharCode(i);
        mycitylist[num] = this.citylist[num];
      }
      return mycitylist;
    },
    ...mapState({
      locatedcity:"nowcity"
    })
  }
};
</script>
<style scoped>
.itembox > div {
  width: 25%;
  float: left;
  text-align: center;
  height: 40px;
  line-height: 40px;
  box-sizing: border-box;
  border-right: 1px solid #e4e4e4;
  border-bottom: 1px solid #e4e4e4;
}
.itembox > div:nth-child(4n) {
  border-right: 0px;
}
</style>

