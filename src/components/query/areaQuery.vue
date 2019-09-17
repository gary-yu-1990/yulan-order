<template>
  <div id="areaQuery">
    <el-card shadow="hover">
      <div slot="header" class="clearfix">
        <span class="KCCX">提货单号查询</span>
      </div>
      <div class="ff">
        <el-tabs class="tabs_1"  v-model="activeName">
          <el-tab-pane label="区域提货单查询" name="first">
            <form
              target="TAB_2_CONTENT"
              action="queryBillList.jsp"
              method="POST"
              class="FORM_1"
              style="height:200px"
            >
              <div style="width:100%">
                <div style="width:62%;border:none;float:left">
                  市场
                  <el-select v-model= "value_1" placeholder="国内市场">
                    <el-option
                      v-for="item in AREA_CODE"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                  片区
                  <el-select v-model= "value_2" placeholder="----选择片区----">
                    <el-option
                      v-for="item in area_district"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                  客户类型
                  <el-select v-model= "value_3" placeholder="全部">
                    <el-option
                      v-for="item in customer_type"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                  <div style="margin-top:15px">
                    <el-date-picker
                      type="date"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      placeholder="开始日期区间"
                      v-model="beginTime_1"
                      style="width:30%;"
                    ></el-date-picker
                    >--
                    <el-date-picker
                      type="date"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      placeholder="结束日期区间"
                      v-model="finishTime_1"
                      style="width:31%;"
                    ></el-date-picker>
                    <el-checkbox style="margin-left:5px"
                      >仅有效客户</el-checkbox
                    >
                  </div>
                  <div style="margin-top:15px">
                    <div style="float:right">
                      <el-button
                        type="#DCDFE6"
                        icon="el-icon-refresh"
                        class="gx"
                        >更新区域</el-button
                      >
                      <el-button type="#DCDFE6" icon="el-icon-s-grid" class="cx"
                        >重置</el-button
                      >
                      <el-button
                        type="#DCDFE6"
                        icon="el-icon-search"
                        class="cx"
                        @click="queryQuYu_1"
                        style="margin-right:15px"
                        >查询</el-button
                      >
                    </div>
                  </div>
                </div>

                <div id="right" style="width:38%;float:right;">
                  <el-transfer
                    :titles="['可选用户', '已选用户']"
                    style="height:190px"
                    filterable
                    filter-placeholder="筛选"
                    v-model="value_4"
                    :data="data"
                    
                  >
                  </el-transfer>
                </div>
              </div>  
            </form>
            <hr />
        <div  v-if="query_1">
        <el-table
          :data="tableData"
          border
          highlight-current-row
          style="width: 100%"
          class="table_1"
         
        >
          <el-table-column prop="num" label width="80"></el-table-column>
          <el-table-column
            prop="THDH"
            label="提货单号"
            width="100"
          ></el-table-column>
          <el-table-column prop="ZT" label="状态"></el-table-column>
          <el-table-column prop="DDH" label="订单号"></el-table-column>
          <el-table-column prop="HTH" label="合同号"></el-table-column>
          <el-table-column prop="LX" label="类型"></el-table-column>
          <el-table-column prop="KDRQ" label="开单日期"></el-table-column>
          <el-table-column prop="THRQ" label="提货日期"></el-table-column>
          <el-table-column prop="KHMC" label="客户名称"></el-table-column>
          <el-table-column prop="JE" label="金额"></el-table-column>
          <el-table-column prop="XSZG" label="销售主管"></el-table-column>
          <el-table-column prop="XSBM" label="销售部门"></el-table-column>
          <el-table-column prop="WL" label="物流管理员"></el-table-column>
          <el-table-column prop="GC" label="工程主客户"></el-table-column>
        </el-table>
        <!-- 分页 -->
      <div style="margin:0 40%;" class="block">
        <el-pagination
          :current-page="currentPage"
          :page-size="limit"
          layout="prev, pager, next, jumper"
          :total="count"
        ></el-pagination>
      </div>
        </div>
          </el-tab-pane>



          <el-tab-pane label="工程主客户查询" name="second">
            <form
              target="TAB_2_CONTENT"
              action="queryBillList.jsp"
              method="POST"
              class="FORM_1"
            >
              <div
                class="CONDITION_DIV"
                style="height:50px;width:100%;border:none;"
              >
                <el-date-picker
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="开始日期区间"
                  v-model="beginTime_2"
                  style="width:14%;"
                ></el-date-picker
                >--
                <el-date-picker
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="结束日期区间"
                  v-model="finishTime_2"
                  style="width:14%;"
                ></el-date-picker>
                <el-select v-model="value_5" placeholder="----选择工程主客户----">
                  <el-option
                    v-for="item in customer_main"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <!-- <select style="width:145px;height:30px" id="CUSTOMER_MAIN" name="CUSTOMER_MAIN">
                      <option value="0">----选择工程主客户----</option>
                      <option>长虹电视</option>
                      <option>长虹空调</option>
                      <option>生活家</option>
                    </select> -->
                <el-button type="#DCDFE6" icon="el-icon-s-grid" class="cx_2"
                  >重置</el-button
                >
                <el-button
                  type="#DCDFE6"
                  icon="el-icon-search"
                  class="cx_2"
                  @click="queryQuYu_2"
                  >查询</el-button
                >
              </div>
            </form>
            <hr />
        <div  v-if="query_2">
        <el-table
          :data="tableData"
          border
          highlight-current-row
          style="width: 100%"
          class="table_1"
         
        >
          <el-table-column prop="num" label width="80"></el-table-column>
          <el-table-column
            prop="THDH"
            label="提货单号"
            width="100"
          ></el-table-column>
          <el-table-column prop="ZT" label="状态"></el-table-column>
          <el-table-column prop="DDH" label="订单号"></el-table-column>
          <el-table-column prop="HTH" label="合同号"></el-table-column>
          <el-table-column prop="LX" label="类型"></el-table-column>
          <el-table-column prop="KDRQ" label="开单日期"></el-table-column>
          <el-table-column prop="THRQ" label="提货日期"></el-table-column>
          <el-table-column prop="KHMC" label="客户名称"></el-table-column>
          <el-table-column prop="JE" label="金额"></el-table-column>
          <el-table-column prop="XSZG" label="销售主管"></el-table-column>
          <el-table-column prop="XSBM" label="销售部门"></el-table-column>
          <el-table-column prop="WL" label="物流管理员"></el-table-column>
          <el-table-column prop="GC" label="工程主客户"></el-table-column>
        </el-table>
        <!-- 分页 -->
      <div style="margin:0 40%;" class="block">
        <el-pagination
          :current-page="currentPage"
          :page-size="limit"
          layout="prev, pager, next, jumper"
          :total="count"
        ></el-pagination>
      </div>
        </div>
          </el-tab-pane>
        </el-tabs>

        
      </div>
      
    </el-card>
  </div>
</template>

<script>
export default {
  name: "AreaQuery",
  data() {
    const generateData = _ => {
      const data = [];
      for (let i = 1; i <=10; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`
        });
      }
      return data;
    };

    return {
       activeName: "first",
      query_1:false,//查询显示
      query_2:false,
      value_1:"C000",//市场初始值
      value_2:"",//片区初始值
      value_3:"0",//客户类型初始值
      value_5:"",//选择工程主客户初始值
      data: generateData(),
      limit: 8,
      count: 18,
      currentPage: 1,
      value_4: [],//可选用户初始值
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value1: "",
      value2: "",
      beginTime_1: "",//区域提货单查询
      finishTime_1: "",
       beginTime_2: "",//工程主客户查询
      finishTime_2: "",
      area_district: [
        {
          value: "04",
          label: "内蒙古自治区"
        },
        {
          value: "05",
          label: "辽宁省"
        },
        {
          value: "06",
          label: "吉林省"
        },
        {
          value: "07",
          label: "黑龙江省"
        },
        {
          value: "09",
          label: "浙江省"
        },
        {
          value: "10",
          label: "安徽省"
        },
        {
          value: "11",
          label: "福建省"
        },
        {
          value: "12",
          label: "江西省"
        },
        {
          value: "13",
          label: "山东省"
        },
        {
          value: "14",
          label: "河南省"
        },
        {
          value: "15",
          label: "湖北省"
        },
        {
          value: "16",
          label: "湖南省"
        },
        {
          value: "17",
          label: "广西壮族自治区"
        },
        {
          value: "18",
          label: "海南省"
        },
        {
          value: "20",
          label: "贵州省"
        },
        {
          value: "21",
          label: "云南省"
        },
        {
          value: "23",
          label: "陕西省"
        },
        {
          value: "24",
          label: "甘肃省"
        },
        {
          value: "25",
          label: "宁夏回族自治区"
        },
        {
          value: "26",
          label: "青海省"
        },
        {
          value: "27",
          label: "新疆维吾尔自治区"
        },
        {
          value: "28",
          label: "其他（工厂）"
        },
        {
          value: "51",
          label: "成都市"
        },
        {
          value: "49",
          label: "电商"
        },
        {
          value: "48",
          label: "直营"
        },
        {
          value: "52",
          label: "陕北"
        },
        {
          value: "55",
          label: "深圳（东莞以东）"
        },
        {
          value: "56",
          label: "广东（东莞以西）"
        },
        {
          value: "36",
          label: "浙南"
        },
        {
          value: "42",
          label: "江苏其他"
        },
        {
          value: "46",
          label: "东莞"
        },
        {
          value: "44",
          label: "豫南"
        },
        {
          value: "41",
          label: "鲁西南"
        },
        {
          value: "45",
          label: "川北"
        },
        {
          value: "35",
          label: "苏南"
        },
        {
          value: "38",
          label: "鄂西"
        },
        {
          value: "40",
          label: "辽西南"
        },
        {
          value: "43",
          label: "川南"
        },
        {
          value: "30",
          label: "北京市"
        },
        {
          value: "31",
          label: "天津市"
        },
        {
          value: "32",
          label: "上海市"
        },
        {
          value: "33",
          label: "重庆市"
        },
        {
          value: "02",
          label: "河北省"
        },
        {
          value: "03",
          label: "山西省"
        }
      ],
      customer_main: [
        {
          value: "1",
          label: "长虹电视"
        },
        {
          value: "2",
          label: "长虹空调"
        },
        {
          value: "3",
          label: "生活家"
        }
      ],
      customer_type: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "NOT08",
          label: "非专业市场客户"
        },
        {
          value: "08",
          label: "专业市场客户"
        }
      ],

      AREA_CODE: [
        {
          value: "C000",
          label: "国内市场"
        },
        {
          value: "C031",
          label: "北京办事处"
        },
        {
          value: "C032",
          label: "太原办事处"
        },
        {
          value: "C033",
          label: "上海办事处"
        },
        {
          value: "C034",
          label: "南京办事处"
        },
        {
          value: "C035",
          label: "杭州办事处"
        },
        {
          value: "C036",
          label: "广州办事处"
        },
        {
          value: "C037",
          label: "南宁办事处"
        },
        {
          value: "C038",
          label: "成都办事处"
        },
        {
          value: "C039",
          label: "重庆办事处"
        },
        {
          value: "C040",
          label: "郑州办事处"
        },
        {
          value: "C041",
          label: "济南办事处"
        },
        {
          value: "C042",
          label: "沈阳办事处"
        },
        {
          value: "C043",
          label: "长春办事处"
        },
        {
          value: "C044",
          label: "兰州办事处"
        },
        {
          value: "C045",
          label: "西安办事处"
        },
        {
          value: "C046",
          label: "长沙办事处"
        },
        {
          value: "C047",
          label: "武汉办事处"
        },
        {
          value: "C048",
          label: "福州办事处"
        },
        {
          value: "C049",
          label: "深圳办事处"
        },
        {
          value: "C050",
          label: "电商直营部"
        },
        {
          value: "C051",
          label: "本厂部门"
        },
        {
          value: "C053",
          label: "南昌办事处"
        },
        {
          value: "C054",
          label: "石家庄办事处"
        },
        {
          value: "C055",
          label: "呼和浩特办事处"
        },
        {
          value: "C056",
          label: "合肥办事处"
        },
        {
          value: "C057",
          label: "昆明办事处"
        },
        {
          value: "C058",
          label: "贵阳办事处"
        },
        {
          value: "F000",
          label: "国际市场"
        },
        {
          value: "F001",
          label: "东南亚"
        },
        {
          value: "F002",
          label: "中东"
        },
        {
          value: "F003",
          label: "中东直销"
        },
        {
          value: "F004",
          label: "东亚"
        },
        {
          value: "F005",
          label: "独联体"
        },
        {
          value: "F006",
          label: "港澳"
        },
        {
          value: "F007",
          label: "边贸"
        },
        {
          value: "F008",
          label: "非洲"
        },
        {
          value: "F009",
          label: "拉美"
        },
        {
          value: "F010",
          label: "欧州"
        },
        {
          value: "F012",
          label: "美洲"
        },
        {
          value: "F013",
          label: "南亚"
        },
        {
          value: "F014",
          label: "台湾"
        },
        {
          value: "F110",
          label: "北美洲"
        },
        {
          value: "F111",
          label: "伊朗"
        }
      ],

      tableData: [
        {
          num: "1",
          THDD: "",
          ZT: "",
          DDH: "",
          LX: "",
          KDRQ: "",
          THRQ: "",
          KHMC: "",
          JE: "",
          XSZG: "",
          XSBM: "",
          WL: "",
          GC: ""
        },
        {
          num: "2",
          THDD: "",
          ZT: "",
          DDH: "",
          LX: "",
          KDRQ: "",
          THRQ: "",
          KHMC: "",
          JE: "",
          XSZG: "",
          XSBM: "",
          WL: "",
          GC: ""
        },
        {
          num: "3",
          THDD: "",
          ZT: "",
          DDH: "",
          LX: "",
          KDRQ: "",
          THRQ: "",
          KHMC: "",
          JE: "",
          XSZG: "",
          XSBM: "",
          WL: "",
          GC: ""
        },
        {
          num: "4",
          THDD: "",
          ZT: "",
          DDH: "",
          LX: "",
          KDRQ: "",
          THRQ: "",
          KHMC: "",
          JE: "",
          XSZG: "",
          XSBM: "",
          WL: "",
          GC: ""
        },
        {
          num: "5",
          THDD: "",
          ZT: "",
          DDH: "",
          LX: "",
          KDRQ: "",
          THRQ: "",
          KHMC: "",
          JE: "",
          XSZG: "",
          XSBM: "",
          WL: "",
          GC: ""
        },
       
        {
          num: "",
          THDD: "",
          ZT: "",
          DDH: "",
          LX: "",
          KDRQ: "",
          THRQ: "",
          KHMC: "页面汇总",
          JE: "0.00",
          XSZG: "",
          XSBM: "",
          WL: "",
          GC: ""
        },
        {
          num: "",
          THDD: "",
          ZT: "",
          DDH: "",
          LX: "",
          KDRQ: "",
          THRQ: "",
          KHMC: "总金额",
          JE: "0.00",
          XSZG: "",
          XSBM: "",
          WL: "",
          GC: ""
        }
      ]
    };
  },
  methods: {
    queryQuYu_1() {
      this.query_1 = true
      // this.$router.push("/QYTable");
    },
    queryQuYu_2() {
      this.query_2 = true
      // this.$router.push("/QYTable");
    }
  }
};
</script>



<style scoped>
.el-transfer-panel__list.is-filterable{
    height:200px;

}
.el-transfer-panel{
    height: 200px;
}

.gx {
  background: #8bc34a;
  color: rgb(255, 255, 255);
}

.CONDITION_DIV_TABLE2 {
  height: 100px;
}

.cz {
  text-align: center;
}
.cx {
  margin-left: 59px;
  background: #8bc34a;
  color: rgb(255, 255, 255);
}
.jiange {
  margin-left: 10px;
}
.NEWUI_BUTTON_0 {
  padding: 0.5em;
}
.CONDITION_DIV {
  margin-left: 10px;
  height: 250px;
  background: rgb(255, 255, 255);
}
.CUSTOMERLISTSELECT {
  color: #000;
}
.SELECTEDCUSTOMERCODE {
  width: 350px;
}
.CUSTOMER_CODE {
  width: 430px;
  margin-left: 500px;
  margin-top: -85px;
}
.OPTION0 {
  background: rgb(209, 243, 200);
}

.cx_2 {
  margin-left: 10px;
  background: #8bc34a;
  color: rgb(255, 255, 255);
}
</style>