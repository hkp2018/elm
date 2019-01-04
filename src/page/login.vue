<template>
    <div>
    <mt-header title="密码登录" class="fs1-2" fixed>
     <mt-button  @click="goback"  slot="left" icon="back"> </mt-button>
    </mt-header>
    <form>
        <div class='padtop40'>
            <mt-field class='mgtop10 after' placeholder="账号"></mt-field>
            <mt-field class='after' placeholder="密码" :type="mytype">
                <mt-switch v-model="value"></mt-switch>
            </mt-field>
            <mt-field class='after' placeholder="验证码">
                <img src="" height="45px" width="100px">
            </mt-field>
        </div>
    </form>
        <div class="padlr10 fs0-8 colred">
        <p>温馨提示:未注册过的账号，登录时自动注册</p>
        <p>注册过的用户可凭账号密码登录</p>
    </div>
    <div class="padlr10"> 
      <mt-button size="large" type="primary">登录</mt-button>
    </div>
    <div class="padlr10 mgtop10">
       <span class="col right"> 重置密码</span>
    </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            value:true
        }},
        methods:{
         goback(){
             return this.$router.push('home')
         }
        },
        computed: {
          mytype:function (){
              return this.value?'password':''
          }
        }
    
}
</script>
