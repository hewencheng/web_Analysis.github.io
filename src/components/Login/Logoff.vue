<template>
  <div style="float:right;font-size: 15px;text-align: center"@click="logout">
    <img src="@/img/logout.net.png" ><p style="float: right">退出</p>
  </div>
</template>

<script>
    export default {
        name: "Logoff",
        methods:{
          //退出登录
          logout: function () {
            var _this = this;
            this.$confirm('确认退出吗?', '提示', {
              //type: 'warning'
            }).then(() => {
              sessionStorage.removeItem('user');
              _this.$router.push('/');
            }).catch(() => {
            })
        }
        }
    }
</script>

<style scoped>

</style>
