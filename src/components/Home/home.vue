<template>
  <div v-loading="loading"
       element-loading-text="加载中"
       element-loading-spinner="el-icon-loading">
    <el-container>
      <el-row class="tac">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          :default-openeds="['1','2','3']"
          @open="handleOpen"
          @close="handleClose"
          background-color="#304156"
          text-color="#bfcbd9"
          active-text-color="#409eff"
          :collapse="isCollapse" router>
            <div style="height: 15px"></div>
            <span style="font-size: 28px;color: rgb(191, 203, 217)" v-show="isCollapse2">数据分析系统</span>
            <div style="height: 15px"></div>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-video-camera"></i>
                <span>电影</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/Hitmovies">热搜-电影</el-menu-item>
                <el-menu-item index="/Scorechart">数据-分析</el-menu-item>
                <el-menu-item index="/CreateData">创建-数据</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-headset"></i>
                <span>音乐</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/Hitmusic" >热搜-音乐</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-mic"></i>
                <span>斗鱼</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/Fish_anchor" >斗鱼-主播</el-menu-item>
                <el-menu-item index="/Fish_Statistics">数据-分析</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
        </el-menu>
      </el-row>
      <el-container>
        <div style="width: 100%;height: 2px;background-color:#67C23A"></div>
        <el-header style="font-size: 25px;color: #303133;position: relative" >
          <i class="el-icon-menu" style="position: absolute;top: 20px;left: 20px;cursor:pointer" @click="show()"></i>
          <div style="float: right">
              <div style="float:left;margin-right:10px">
                <el-dropdown @command="handleCommand">
                  <span class="el-dropdown-link">
                      Tiger_he<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="/home">首页</el-dropdown-item>
                    <el-dropdown-item command="/">退出</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div style="float: right">
                  <img src="../../img/user2.png" style="width: 60px;height: 60px;margin-right: 100px"></img>
              </div>
          </div>
          <!--<div style="width:30%;cursor:pointer;margin-left: 20px">-->
            <!--<el-tag-->
              <!--v-for="tag in tags"-->
              <!--:key="tag"-->
              <!--closable-->
              <!--@close="handleClose(tag)"-->
              <!--style="margin-left: 10px"-->
              <!--@click="tagtitle()">-->
              <!--{{tag}}-->
            <!--</el-tag>-->
          <!--</div>-->
          <!--娱乐数据分析系统-->
        </el-header>
        <div style="width: 100%;height: 1px;background-color:#DCDFE6"></div>
        <el-main>
          <Breads/>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
  .icon-bar {
    display: block;
    width: 25px;
    height: 2px;
    margin-left: 10px;
    margin-bottom: 4px;
    background-color: #777;
    border-radius: 1px;
    -moz-border-radius: 1px;
    -webkit-border-radius: 1px;
  }
  .navbar-toggle1{
    float: left;margin-top: 28px;width: 50px;height: 30px;margin-left:20px
  }
  .wiki-sz{
    margin-top: 10px;float: left;margin-left:70px;color: #409EFF;font-size:18px
  }
  .el-menu{
    height: 938px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>

<script>
  import Sidebar from "./Sidebar"
  // import Logoff from "../Login/Logoff"
  import Breads from '../Home/Bread'
  export default {
    components:{
      Sidebar:Sidebar,
      // Logoff:Logoff,
      Breads:Breads,
    },
    data:function () {
      return{
        isCollapse:false,
        isCollapse2:true,
        loading:false,
      }
    },
    methods:{
      handleCommand(command) {
        this.loading=true
        setTimeout(() => {
          this.loading=false
          this.$router.push({path:command})
        }, 2000);
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },

      show:function () {
        this.isCollapse=!this.isCollapse
        this.isCollapse2=!this.isCollapse2
      }
    },
  }
</script>
