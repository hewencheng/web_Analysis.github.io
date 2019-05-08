<template>
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
      :collapse="isCollapses" router>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-video-camera"></i>
          <span>电影</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/Hitmovies" >热搜-电影</el-menu-item>
          <el-menu-item index="/Scorechart" >数据-分析</el-menu-item>
          <el-menu-item index="/CreateData" >创建-数据</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-headset"></i>
          <span>音乐</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/" >热搜-音乐</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-row>
</template>

<script>
  export default {
    props:['isCollapses'],
    data:function(){
      return{
        isCollapse:false
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>
  .el-menu{
    height: 938px;
  }
</style>
