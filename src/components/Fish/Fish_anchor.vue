<template>
  <div align="center" style="margin-top: 50px">
    <div align="left">
      <el-input
        style="width: 200px"
        placeholder="请输入电影"
        size="mini"
        clearable>
      </el-input>
      <el-button type="primary" size="mini" icon="el-icon-search" >搜索</el-button>
      <el-select v-model="typevalue" filterable placeholder="请选择" size="mini">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.label">
        </el-option>
      </el-select>
      <el-button type="primary" size="mini" icon="el-icon-zoom-in" style="margin-left: 0px" @click="exportExcel('斗鱼统计',typevalue)">导出</el-button>
      <div style="margin: 15px 0;"></div>
    </div>
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
          width="200"
          label="主播"
          prop="主播">
        </el-table-column>
        <el-table-column
          width="120"
          label="房间号"
          prop="房间号">
        </el-table-column>
        <el-table-column
          width="350"
          label="房间名"
          prop="房间名">
        </el-table-column>
        <el-table-column
          width="150"
          label="分区"
          prop="分区">
        </el-table-column>
        <el-table-column
          width="100"
          label="人气"
          prop="人气">
        </el-table-column>
        <el-table-column
          label="图片"
          prop="图片">
          <template slot-scope="scope" >
            <el-link type="primary" @click="rank_url(scope.row.图片)">{{scope.row.图片}}</el-link>
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
</template>

<script>
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
        loading:true,
        type:"",
        pageSize: 10, // 每页大小默认值
        pageIndex: 1, // 默认第一页
        total:10,
        datatable:[{}]
      }
    },
    methods: {

      getRowClass ({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          return 'padding:2;text-align:center;font-size:14px;color:#909399;background: DCDFE6;text-align:center'
        }
      },

      rank_url(url){
        window.open(url)
      },

      gettdClass({ row, column, rowIndex, columnIndex }) {
        if(columnIndex ==4 ){
          return 'padding:0;text-align:right;color:#F56C6C'
        }else if(columnIndex ==2){
          return 'padding:0;text-align:left;color:#F56C6C'
        }
        else {
          return 'padding:0;text-align:left;color:#909399'
        }},

      //选择第几页
      handleSizeChange (val) {
        this.loading=true
        var path="asr/get_fishdata_report_list/?page_idx="+val
        this.RequestData(path)
        this.setTimeout_s()
      },

      //请求下一页
      handleCurrentChange (val) {
        this.loading=true
        var path="asr/get_fishdata_report_list/?page_idx="+val
        this.RequestData(path)
        this.setTimeout_s()
      },
    },

    created() {
      setTimeout(() => {
        this.loading=false
        var path="asr/get_fishdata_report_list/"
        this.RequestData(path)
      }, 1000);
    },
  }
</script>

<style scoped>

</style>
