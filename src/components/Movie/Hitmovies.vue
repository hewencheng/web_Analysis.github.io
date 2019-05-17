<template>
  <div align="center">
     <div style="width: 1050px; margin: auto" >
      <el-carousel :interval="2000" type="card" height="150px" width="20px">
        <el-carousel-item v-for="item in 5" :key="item">
          <h3 class="medium">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div align="left">
      <el-input
        style="width: 200px"
        placeholder="请输入电影"
        v-model="input_movie"
        size="mini"
        clearable>
      </el-input>
      <el-button type="primary" size="mini" icon="el-icon-search" @click="Searchtype(input_movie)">搜索</el-button>
      <el-select v-model="typevalue" filterable placeholder="请选择" size="mini">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.label">
        </el-option>
      </el-select>
      <el-button type="primary" size="mini" icon="el-icon-zoom-in" style="margin-left: 0px" @click="exportExcel('电影统计',typevalue)">导出</el-button>
      <div style="margin: 15px 0;"></div>
      <el-radio-group v-model="type" size="mini" @change="TypeChange(type)">
        <span v-for="val in typelist" style="margin-left: 10px">
          <el-radio  :label="val"></el-radio>
        </span>
      </el-radio-group>
    </div>
    <div style="margin: 15px 0;"></div>
    <!--分页-->
      <div>
      <el-table
        id="out-table"
        v-loading="loading"
        element-loading-text="加载中"
        element-loading-spinner="el-icon-loading"
        :data="datatable"
        border
        style="width:100%"
        :cell-style="gettdClass"
        :header-cell-style="getRowClass">
        <el-table-column
          width="50"
          label="ID"
          prop="rank">
        </el-table-column>
        <el-table-column
          width="70"
          label="poster"
          prop="poster">
          <template slot-scope="scope" >
            <div v-if="scope.row.img_url != null">
              <img :src="getImgutl(scope.row.img_url)" style="height:50px">
            </div>
          </template>
        </el-table-column>
        <el-table-column width="75"
                         label="Choose">
          <template slot-scope="scope" >
            <div>
              <el-checkbox v-model="scope.row.star" @change="star_check(scope.row.star,pageIndex,scope.row._id)"></el-checkbox>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          width="130"
          label="name"
          prop="name">
        </el-table-column>
        <el-table-column
          width="60"
          label="Year"
          prop="Year">
        </el-table-column>
        <el-table-column
          width="100"
          label="Countries"
          prop="Countries">
        </el-table-column>
        <el-table-column
          width="250"
          label="Director"
          prop="Director">
        </el-table-column>
        <el-table-column
          width="60"
          label="Type"
          prop="Type">
        </el-table-column>
        <el-table-column
          label="quote"
          prop="quote">
        </el-table-column>
        <el-table-column
          width="60"
          label="score"
          prop="score">
        </el-table-column>
        <el-table-column
          label="importance"
          width="180">
          <template slot-scope="scope" >
          <el-rate
            v-model="scope.row.importance"
            disabled
            show-score
            text-color="#ff9900"
            >
          </el-rate>
          </template>
        </el-table-column>
        <el-table-column
          label="link"
          prop="link">
          <template slot-scope="scope" >
            <el-link type="primary" @click="rank_url(scope.row.link)">{{scope.row.link}}</el-link>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="padding-top:30px"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  const typelist = ["犯罪","剧情","爱情","喜剧","动画","纪录片","传记","动作","奇幻","儿童","悬疑","冒险","科幻",]
  export default {
    components:{
    },
    //请求数据
    data: function(){
      return{
        options: [{
          value: '选项1',
          label: 'xlsx'},
          {
            value: '选项2',
            label: 'txt'},
          {
            value: '选项3',
            label: 'csv'},
           ],
        typevalue:"xlsx",
        form:{
          quote:"",
        },
        dialogVisible: true,
        typelist:typelist,
        input_movie:"",
        movietype:"",
        value: 5.0,
        loading:true,
        type:"",
        pageSize: 10, // 每页大小默认值
        pageIndex: 1, // 默认第一页
        total:10,
        datatable:[{}]
      }
    },
    methods: {
      TypeChange(value) {
        this.loading=true
        this.movietype=value
        var path="asr/get_movie_report_list/?Type="+this.movietype
        this.RequestData(path)
        this.setTimeout_s()
      },

      Searchtype(input_movie){
        this.loading=true
        if(input_movie=="" && this.movietype!=""){
          var path="asr/get_movie_report_list/?Type="+this.movietype
        }else if(this.movietype=="" && input_movie!=""){
          var path="asr/get_movie_report_list/?name="+input_movie
        }else if(input_movie=="" && this.movietype==""){
          var path="asr/get_movie_report_list/"
        }else {
          var path="asr/get_movie_report_list/?name="+input_movie+"&Type="+this.movietype
        }
        this.RequestData(path)
        this.setTimeout_s()
      },

      getRowClass ({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          return 'padding:2;text-align:center;font-size:14px;color:#909399;background: DCDFE6;text-align:center'
        }
      },

      rank_url(url){
        window.open(url)
      },


      //选择
      star_check(check,pageIndex,id){
        var star = check
        var path="asr/update_movie_report_star/"
        var path2=this.RequestPath2(pageIndex)
        this.PublicModifystar_check(path,path2,star,id)
      },

      gettdClass({ row, column, rowIndex, columnIndex }) {
        if(columnIndex ==9 ){
          return 'padding:0;text-align:right;color:#F56C6C'
        }else if(columnIndex ==2){
          return 'padding:0;text-align:center;color:#F56C6C'
        }
        else {
          return 'padding:0;text-align:left;color:#909399'
        }},

      //选择第几页
      handleSizeChange (val) {
        this.RequestPath(val)
      },

      //请求下一页
      handleCurrentChange (val) {
        this.RequestPath(val)
      },

      //返回图片
      getImgutl(icon){
          return require("../../img/"+icon)
      },
    },
    created() {
      setTimeout(() => {
        this.loading=false
        var path="asr/get_movie_report_list/"
        this.RequestData(path)
      }, 1000);
    },
  }
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(n) {
    background-image:url('../../img/movie-1.png');
  }
  .el-carousel__item:nth-child(2n) {
    background-image:url('../../img/movie-2.png');
  }
  .el-carousel__item:nth-child(3n) {
    background-image:url('../../img/movie-3.png');
  }
  .el-carousel__item:nth-child(4n) {
    background-image:url('../../img/movie-4.png');
  }
  .el-carousel__item:nth-child(5n) {
    background-image:url('../../img/movie-5.png');
  }
</style>
