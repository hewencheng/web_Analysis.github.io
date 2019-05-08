export default {
  install(Vue, options) {

    //url
    Vue.prototype.PulicUrl = function (path) {
      var url="http://127.0.0.1:8009/"+path
      return url
    }
    
    //请求path
    Vue.prototype.RequestPath= function (val) {
      this.loading=true
      if(this.movietype!=""){
        var path="asr/get_movie_report_list/?page_idx="+val+"&Type="+this.movietype
      }else {
        var path="asr/get_movie_report_list/?page_idx="+val
      }
      this.RequestData(path)
      this.setTimeout_s()
    }
    
    //定时器
    Vue.prototype.setTimeout_s= function () {
      setTimeout(() => {
        this.loading=false
      }, 1000);
    }
    
    //请求path
    Vue.prototype.RequestPath2= function (val) {
      if(this.movietype!=""){
        var path="asr/get_movie_report_list/?page_idx="+val+"&Type="+this.movietype
      }else {
        var path="asr/get_movie_report_list/?page_idx="+val
      }
      return path
    }
    
    //请求数据
    Vue.prototype.RequestData = function (path) {
      var url="http://127.0.0.1:8009/"+path
      var that = this;
      that.$http({      //调用接口
        method:'GET',
        url:url
      }).then(function(response){ //接口返回数据
        if(response.body.code == 200){
          this.datatable = response.body.data.page_data;
          this.pageSize = response.body.data.page_cap;
          this.pageIndex = response.body.data.page_idx;
          this.page_total_cnts = response.body.data.page_total_cnts;
          this.total=this.pageSize*this.page_total_cnts
          this.pagination = response.body.data;
          console.log(response)
        }else{
          console.log("code返回错误"+response.body.code)
        }
      },function(error){
        console.log(错误)
      })
      
    }
  //请求数据2
    Vue.prototype.RequestData_3 = function (path) {
      var url="http://127.0.0.1:8009/"+path
      var that = this;
      that.$http({      //调用接口
        method:'GET',
        url:url
      }).then(function(response){ //接口返回数据
        if(response.body.code == 200){
          this.datatable = response.data.data;
          this.page_data = response.body.data.detil_dict.page_data;
          this.pageSize = response.body.data.detil_dict.page_cap;
          this.pageIndex = response.body.data.detil_dict.page_idx;
          this.page_total_cnts = response.body.data.detil_dict.page_total_cnts;
          this.total=this.pageSize*this.page_total_cnts
          console.log(response)
          console.log(this.datatable)
        }else{
          console.log("code返回错误"+response.body.code)
        }
      },function(error){
        console.log(错误)
      })
    }

    //修改star
    Vue.prototype.PublicModifystar_check = function (path,path2,star,id) {
      var star =star
      var aa= {'id':id,'star': star}
      var str = JSON.stringify(aa)
      var url=this.PulicUrl(path)
      var url2=this.PulicUrl(path2)
      var that = this
      this.$http.post(url,str,
        {
          emulateJSON:true
        })
        .then(function(response){
          if(response.body.msg =='success'){
            this.$message({
              message: '选择成功',
              duration:2000,
              type: 'success'})
            setTimeout(() => {
              that.$http({   //编辑后刷新数据
                method:'GET',
                url:url2
              }).then(function(response){ //接口返回数据
                if(response.body.code == 200){
                  this.datatable = response.body.data.page_data;
                  this.pageSize = response.body.data.page_cap;
                  this.pageIndex = response.body.data.page_idx;
                  this.page_total_cnts = response.body.data.page_total_cnts;
                  this.total=this.pageSize*this.page_total_cnts
                  this.pagination = response.body.data;
                  console.log(response)
                }else{
                  console.log("code返回错误"+response.body.code)
                }
              },function(error){
                console.log(错误)
              })
              this.loading=false
            },2000); }
          else if(response.body.msg =='fail'){
            this.$message({
              message: '修改失败',
              type: 'success'})}
          else if(response.body.msg =='not exist'){
            this.$message({
              message: '修改为空',
              type: 'success'})}
        })
    }
    
    
    //修改备注
    Vue.prototype.PublicModifyremark = function (path,path2) {
      let _index=this.listIndex
      //根据索引，赋值到list制定的数
      var id= this.datatable[_index]._id
      //关闭弹窗
      this.input1
      var remark =this.input1
      this.dialogVisible = false
      var aa
      if(path == "asr/update_ds_mark/"){
        aa= {'_id':id,'re_mark': remark}
      }else {
        aa= {'id':id,'remark': remark}
      }
      var str = JSON.stringify(aa)
      var url=this.PulicUrl(path)
      var url2=this.PulicUrl(path2)
      var that = this
      this.$http.post(url,str,
        {
          emulateJSON:true
        })
        .then(function(response){
          if(response.body.msg =='success'){
            this.$message({
              message: '编辑成功',
              duration:2000,
              type: 'success'})
            setTimeout(() => {
                  that.$http({   //编辑后刷新数据
                        method:'GET',
                        url:url2
                   }).then(function(response){ //接口返回数据
                    if(response.body.code == 200){
                      this.datatable = response.body.data.page_data;
                      this.pageSize = response.body.data.page_cap;
                      this.pageIndex = response.body.data.page_idx;
                      this.page_total_cnts = response.body.data.page_total_cnts;
                      this.total=this.pageSize*this.page_total_cnts
                      this.pagination = response.body.data;
                      console.log(response)
                    }else{
                      console.log("code返回错误"+response.body.code)
                    }
                  },function(error){
                    console.log(错误)
                  })
                this.loading=false
              },2000); }
           else if(response.body.msg =='fail'){
              this.$message({
              message: '编辑失败',
              type: 'success'})}
           else if(response.body.msg =='not exist'){
              this.$message({
              message: '编辑为空',
              type: 'success'})}
          })
       }

    //修改备注2
    Vue.prototype.PublicModifyremark_2= function (path,path2) {
      let _index=this.listIndex
      //根据索引，赋值到list制定的数
      var id= this.datatable[_index]._id
      //关闭弹窗
      this.input1
      this.resource
      this.input2
      this.input3
      this.input4
      this.input5
      this.input6

      var remark =this.input1
      var cpu_type =this.resource
      var app_ver =this.input2
      var b_type =this.input3
      var b_plate =this.input4
      var b_branch =this.input5
      var bg_ver =this.input6

      this.dialogVisible = false
      var aa= {'id':id,'remark': remark,'app_ver':app_ver,"cpu_type":cpu_type,"b_type":b_type,"b_plate":b_plate,"b_branch":b_branch,"bg_ver":bg_ver}
      var str = JSON.stringify(aa)
      var url=this.PulicUrl(path)
      var url2=this.PulicUrl(path2)
      var that = this
      this.$http.post(url,str,
        {
          emulateJSON:true
        })
        .then(function(response){
          if(response.body.msg =='success'){
            this.input2=""
            this.resource=""
            this.$message({
              message: '编辑成功',
              duration:2000,
              type: 'success'})
            setTimeout(() => {
              that.$http({   //编辑后刷新数据
                method:'GET',
                url:url2
              }).then(function(response){ //接口返回数据
                if(response.body.code == 200){
                  this.datatable = response.body.data.page_data;
                  this.pageSize = response.body.data.page_cap;
                  this.pageIndex = response.body.data.page_idx;
                  this.page_total_cnts = response.body.data.page_total_cnts;
                  this.total=this.pageSize*this.page_total_cnts
                  this.pagination = response.body.data;
                  console.log(response)
                }else{
                  console.log("code返回错误"+response.body.code)
                }
              },function(error){
                console.log(错误)
              })
              this.loading=false
            },2000); }
          else if(response.body.msg =='fail'){
            this.$message({
              message: '编辑失败',
              type: 'success'})}
          else if(response.body.msg =='not exist'){
            this.$message({
              message: '编辑为空',
              type: 'success'})}
        })
    }

    //关闭弹框
    Vue.prototype.CloseFrame = function (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }

    //显示弹框
    Vue.prototype.DisplayFrame = function (remark,_index) {
      //记录索引
      this.listIndex=_index;
      //显示弹窗
      this.dialogVisible=true;
      this.input1=remark
    }

    //显示弹框2
    Vue.prototype.DisplayFrame2 = function (remark,app_ver,cpu_type,b_type,b_plate,b_branch,bg_ver,_index) {
      //记录索引
      this.listIndex=_index;
      //显示弹窗
      this.dialogVisible=true;
      this.input1=remark
      this.input2=app_ver
      this.resource=cpu_type
      this.input3=b_type
      this.input4=b_plate
      this.input5=b_branch
      this.input6=bg_ver
    }
    
    //显示弹框
    Vue.prototype.Page_rt = function () {
      return {
        loading:true,
        input1:"",
        dialogVisible: false,
        pageSize: 10, // 每页大小默认值
        pageIndex: 1, // 默认第一页
        total:10,
        datatable:[{}]
      }
    }
  }
}
