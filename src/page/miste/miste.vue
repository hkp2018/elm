<template>
  <div>
    <!-- 首页顶部 -->
    <mt-header :title="located" class="fs1-2" fixed>
      <mt-button slot="left">
        <icon scale="3" name="search" class="searchicon"></icon>
      </mt-button>
      <mt-button slot="right" style="font-size: 0.8rem">登录|注册</mt-button>
    </mt-header>
    <!-- 首页轮播菜单切换  这里循环两次是因为category 是重组过的数组 不是原来获取的json-->
    <div class="padtop40">
      <mt-swipe :auto="0" class="myswipe">
        <mt-swipe-item v-for="(items,index) in category" :key="index" class="myitem"> 
          <div v-for="(item,index) in items" :key="index">
            <div class="imgbox">
              <img :src="imgBaseUrl+item.image_url">
            </div>
            <div class="fs0-8 col9f mgtop5">{{item.title}}</div>
          </div>
        </mt-swipe-item>
      </mt-swipe>
    
    <!-- 附近商家 -->
    <div class="mgtop10 bgfff maindiv">
      <div class="ih30 pad10">
        <div class="svgbox">
          <icon name="shop" class="shopicon"></icon>
        </div>
        <div class="fs0-8 col9f fujin">附近商家</div>
      </div>
        <div v-for="(item,index) in shoplist" :key="index"   class="shoplist after">
            <div class="shopimgbox">
                <img :src="imgshopUrl+item.image_path">
            </div>
            <div class="rightbox">
                <div class="shoptop">
                  <span class="pinpai fs10 mgl">品牌</span>
                  <span class="shopname">{{item.name}}</span>
                  <span class="rightspan right fs10 mgr"><span v-for="(itemsupports,index) in item.supports" :key="index"    class="">{{itemsupports.icon_name}}</span></span>
                </div>
                <div class="xxdiv">
                  <div class="xxbox fs10 mgl">
                    <span v-for="(itemxx,index) in 5" :key="index"    class="xxspan1"><icon v-if="index+1<=item.rating" name="xx" class="xx"></icon><icon v-if="index+1>item.rating" name="xx2" class="xx"></icon><span v-if="item.rating-(index)>0&&item.rating-(index)<1" :class="xxclass+(item.rating*10-index*10)"><icon name="xx" class="xx"></icon></span></span>
                  </div>
                  <span class="colred fs10 mgl mgleft8">{{item.rating}}</span>
                  <span class="fs10 mgl">月售{{item.recent_order_num}}单</span>
                  <span class="rightspan fs10 right mgr">
                      <span v-if="item.delivery_mode" class="fn">{{item.delivery_mode.text}}</span>
                      <span class="zs ">准时达</span>
                  </span>
                </div>
                <div class="shopfoot">
                    <div><span class="fs10 mgl">￥{{item.float_minimum_order_amount}}起送/{{item.piecewise_agent_fee.tips}}</span></div>
                    <div><span class="right fs10 mgr"><span class="">{{item.distance}}/</span><span class="col">{{item.order_lead_time}}</span></span></div>
                </div>
            </div>
        </div>
      </div>
    </div>
    <foot class="foot"></foot>
  </div>
</template>
<script>
import foot from "../../components/foot/foot.vue";
import $ from "../../axios/index"
export default {
  data() {
    return {
      category:[],
      imgBaseUrl:'https://fuss10.elemecdn.com',//图片域名地址
      shoplist:"",
      located:"",
      imgshopUrl:'http://elm.cangdu.org/img/',
      xxclass:"xxspan2 w"
    };
  },

  components: {
    foot
  },
  mounted: function() {
    $.get("v2/index_entry")
    .then (Response=>{
      let mybody=Response.data;
      let num=parseInt(mybody.length/8);
      let category=[];
      let arr=[];
      for (let i=0;i<num;i++){
        arr=[];
      for(var h= 0;h<8;h++){
            arr.push(mybody[i*8+h]);
          }
          category.push(arr);
        }
        arr=[];
        if(num*8<mybody.length){
          for(var k=num*8;k<mybody.length;k++){
              arr.push(mybody[num*8+k]) 
          }
          category.push(arr);
        }
        this.category=category;

    });
         this.located=localStorage.getItem("located");// 从loacalstorage获取位置
         $.get("shopping/restaurants",{ 
           params:{
             latitude:31.22967,
             longitude:121.4762
           }})
           .then( Respons=>{
             this.shoplist=Respons.data;
             //console.log(this.shoplist[0].image_path)
           })
             
           
         
  },
  computed: {},
  methods: {
  }
};
</script>
<style scoped>
.fs10 {
  font-size: 12px;
  transform: scale(0.8);
  display: inline-block;
}
.mgr {
  transform-origin: 100% 50% 0; /*改变缩放基点*/
}
.mgl {
  transform-origin: 0 50% 0; /*改变缩放基点*/
}
.myswipe {
  height: 210px;
  box-sizing: border-box;
  padding-bottom: 30px;
  padding-top: 10px;
  background-color: #ffffff;
  border-bottom: 1px solid #e4e4e4;
}
.myswipe .mint-swipe-indicators .is-active {
  background-color: #26a2ff;
}

.myitem > div {
  width: 25%;
  height: 50%;
  box-sizing: border-box;
  float: left;
  text-align: center;
}
.imgbox {
  height: 60%;
}
.imgbox img {
  height: 100%;
}
.shopicon {
  width: 110%;
  height: 110%;
  margin-bottom: -2px;
}
.searchicon {
  margin-bottom: -5px;
}
.svgbox {
  width: 15px;
  height: 15px;
}
.mgleft10 {
  margin-left: 10px;
}
.foot{
  position: fixed;
  display: flex;
  z-index: 100;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 1.95rem
}
.fujin {
  margin-top: -15px;
  margin-left: 25px;
}
.shoplist {
  padding: 10px;
  overflow: hidden;
  display: flex;
}
.shoplist > div {
  float: left;
}
.shopimgbox {
  width: 60px;
  height: 60px;
  margin-right: 5px;
}
.shopimgbox > img {
  height: 100%;
  width: 100%;
  background-color: red;
}
.maindiv {
  border-top: 1px solid #e4e4e4;
}

.search2 {
  width: 20px;
  height: 20px;
}
.rightbox {
  font-size: 0.8rem;
  flex: 1;
}
.shoptop,
.xxdiv {
  height: 25px;
  line-height: 25px;
}
.pinpai {
  display: inline-block;
  width: 30px;
  text-align: center;
  font-weight: bold;
  height: 20px;
  line-height: 20px;
  background-color: #ffd930;
  border-radius: 3px;
}
.shopname {
  font-weight: bold;
  font-size: 0.8rem;
}
.rightspan > span {
  display: inline-block;
  height: 14px;
  border: 1px solid #a3acb7;
  margin-left: 3px;
  padding: 1px;
  color: #a3acb7;
  line-height: 14px;
  font-size: 12px;
}

.xx {
  width: 10px;
  height: 10px;
}
.xxbox {
  display: inline-block;
  height: 25px;
  box-sizing: border-box;
}
.xxbox > span {
  margin-right: -2px;
}
.xxspan1 {
  position: relative;
  display: inline-block;
}
.xxspan2 {
  display: inline-block;
  position: absolute;
  left: 0px;
  overflow: hidden;
}
.w1 {
  width: 10%;
}
.w2 {
  width: 20%;
}
.w3 {
  width: 30%;
}
.w4 {
  width: 40%;
}
.w5 {
  width: 50%;
}
.w6 {
  width: 60%;
}
.w7 {
  width: 70%;
}
.w8 {
  width: 80%;
}
.w9 {
  width: 90%;
}
.fn {
  background-color: #3190e8;
  color: white !important;
  border-color: #3190e8 !important;
}
.zs {
  color: #3190e8 !important;
  border-color: #3190e8 !important;
}
.mgleft8 {
  margin-left: -8px;
}
.shopfoot > div {
  width: 50%;
  float: left;
}
</style>

