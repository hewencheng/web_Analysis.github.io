<template>
  <div align="center"
       v-loading="loading"
       element-loading-text="加载中"
       element-loading-spinner="el-icon-loading">
    <!--<el-select v-model="typevalue" filterable placeholder="请选择" size="mini">-->
      <!--<el-option-->
        <!--v-for="item in options"-->
        <!--:key="item.value"-->
        <!--:label="item.label"-->
        <!--:value="item.label">-->
      <!--</el-option>-->
    <!--</el-select>-->
    <!--<el-button type="primary" size="mini" icon="el-icon-zoom-in" style="margin-left: 0px" @click="exportExcel('电影统计',typevalue)">导出</el-button>-->
    <div style="margin-top: 50px">
      <div id="main1" style="width:60%;height:350px;" class="borderradius"></div>
    </div>
    <div style="margin-top: 50px">
      <div id="main2" style="width:60%;height:350px;" class="borderradius"></div>
    </div>
  </div>
</template>

<script>
  var echarts = require('echarts');
  export default {
    components:{
    },
    data:function(){
      return{
        loading:true
      }
    },
    created(){
      this.showdata()
      setTimeout(() => {
        this.loading=false
      }, 1000);
    },
    methods:{
      showdata:function () {
        this._id=this.$route.query._id
        var path="asr/get_score_report_list/"
        var that = this;
        var url=this.PulicUrl(path)
        that.$http({      //调用接口
          method:'GET',
          url:url
        }).then(function(response){ //接口返回数
          var data= response.data.data
          var res_list=data.res_list
          var score_value=data.score_value
          console.log(response)
          this.drawLineChart(res_list,score_value)

          var typelist=data.typelist
          var a_countlist=data.a_countlist
          var type_total=data.type_total

          this.drawLineChart2(typelist,a_countlist,type_total)

        },function(error){
          console.log(错误)
        })
      },
      drawLineChart(data,M_value) {
        var wer_max=M_value.score_max
        var wer_min=M_value.score_min
        var datalist=[]
        for(var i in data){
          datalist.push(data[i][0])
        }
        this.chartLine = echarts.init(document.getElementById('main1'));
        this.chartLine.setOption({
          // backgroundColor:"#67C23A",
          title: {
            text: '评分趋势图',
            x: '15px',
            textStyle:{
              //文字颜色
              color:'#303133',
              //字体大小
              fontSize:15
            }
          },
          tooltip: {
            trigger: 'axis',
            formatter: function(data)
            {
              var str=data[0].axisValue
              var st2=str.split(',')
              var str=st2[0]
              var str2=st2[1]
              var str3=st2[2]
              var str4=st2[3]
              return "score: "+str+'<br/>'
                +"name: "+str2+'<br/>'
                +"rank: "+str3+'<br/>'
                +"quote: "+str4+'<br/>'
            }
          },
          legend: {
            data:['score'],
            textStyle:{
              fontSize:18,
              color:"#303133",
            },
          },
          color:["#F56C6C"],
          toolbox: {
            show : true,
            readOnly: true,
            feature : {
              dataView : {
                show: true,
                optionToContent: function (opt) {
                  let axisData = opt.xAxis[0].data; //坐标数据
                  let tdHeads = '<td width="50">score</td>'; //表头
                  let tdHeads2 = '<td width="250">name</td>'; //表头
                  let tdHeads3 = '<td width="50">rank</td>'; //表头
                  let tdHeads4 = '<td width="350">quote</td>'; //表头
                  let table = `<table border="1" style="width: 900px;margin-left:20px;border-collapse:collapse;font-size:14px;text-align:left"><tbody>
                                  <tr> ${tdHeads} ${tdHeads2} ${tdHeads3} ${tdHeads4} </tr>`;
                  for (let i = 0, l = axisData.length; i < l; i++) {
                    //组装表数据
                    table += `<tr>
                                <td >${axisData[i][0]}</td>
                                <td >${axisData[i][1]}</td>
                                <td >${axisData[i][2]}</td>
                                <td >${axisData[i][3]}</td>
                              </tr>`;
                  }
                  table += '</tbody></table>';
                  return table;
                }
              },
              mark: {show:true},
              restore:{show:true},
              magicType: {type: ['line', 'bar','pie']},
              saveAsImage:{show:true},
              restore : {show: true},
            }
          },
          calculable : true,
          grid: {
            left: '3%',
            right: '4%',
            bottom: '1%',
            top:"20%",
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: data,
            show:false,
            axisLabel : {//坐标轴刻度标签的相关设置。
              interval:0,
              rotate:"0",
            }
          },
          yAxis: {
            type: 'value',
            min: wer_min,
            max: wer_max,
            axisLabel:{
              textStyle:{
                color:"#303133",
              }
            },
          },
          series: [
            {
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              },
              markLine: {
                data: [
                  {type: 'average', name: '平均值'}
                ]
              },
              name: 'score',
              lineStyle:{
                normal:{
                  color:"#F56C6C",
                  width:1,
                },
              },
              type: 'line',
              data: datalist,
            },
          ]
        });
      },
      drawLineChart2(typelist,a_countlist,type_total) {
        this.chartLine = echarts.init(document.getElementById('main2'));
        this.chartLine.setOption({
            title : {
              text: '豆瓣电影Top'+type_total+'数据分析',
              subtext: '电影类型',
              x:'center'
            },
            tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
              orient : 'vertical',
              x : 'left',
              data:typelist
            },
            toolbox: {
              show : true,
              feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {
                  show: true,
                  type: ['pie', 'funnel'],
                  option: {
                    funnel: {
                      x: '25%',
                      width: '50%',
                      funnelAlign: 'left',
                      max: 1548
                    }
                  }
                },
                restore : {show: true},
                saveAsImage : {show: true}
              }
            },
            calculable : true,
            series : [
              {
                name:'访问来源',
                type:'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                  {value:a_countlist[0], name:typelist[0]},
                  {value:a_countlist[1], name:typelist[1]},
                  {value:a_countlist[2], name:typelist[2]},
                  {value:a_countlist[3], name:typelist[3]},
                  {value:a_countlist[4], name:typelist[4]},
                  {value:a_countlist[5], name:typelist[5]},
                  {value:a_countlist[6], name:typelist[6]},
                  {value:a_countlist[7], name:typelist[7]},
                  {value:a_countlist[8], name:typelist[8]},
                  {value:a_countlist[9], name:typelist[9]},
                  {value:a_countlist[10], name:typelist[10]},
                  {value:a_countlist[11], name:typelist[11]},
                  {value:a_countlist[12], name:typelist[12]},
                ]
              }
            ]
          });
       },
    }
  }
</script>

<style scoped>

</style>
