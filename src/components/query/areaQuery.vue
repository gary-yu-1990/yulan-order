<template>
  <div id="areaQuery">
    <el-card shadow="hover">
      <el-dialog
        title="提货单详情"
        :visible.sync="detailVisible"
        :close-on-click-modal="false"
        width="80%"
        style="heitht:100%"
      >
        <div style="width:90% ;margin:0 auto;">
          <table style="width:100%;height:180px" class="table_2" border="1">
            <tr>
              <td class="td_1">提货单</td>
              <td  class="td_1">{{tableDetail_1.SALE_NO}}</td>
              <td  class="td_1">日期</td>
              <td class="td_1">{{tableDetail_1.BILL_DATE|datatrans}}</td>
              <td class="td_1">状态</td>   
              <td class="td_1">{{tableDetail_1.STATUS_ID|transStatus}}</td>
              <td class="td_1">业务员</td>
              <td class="td_1" style="width:100px">{{tableDetail_1.SALE_NAME}}</td>
            </tr>
            <tr>
              <td class="td_1">合同号</td>
              <td class="td_1">{{tableDetail_1.HTBM}}</td>
              <td class="td_1">金额</td>
              <td class="td_1">{{tableDetail_1.MONEY_SUM}}</td>
              <td class="td_1">提货日期</td>   
              <td class="td_1">{{tableDetail_1.DATE_OUT_STOCK|datatrans}}</td>
              <td class="td_1">部门</td>
              <td class="td_1"></td>
            </tr>
            <tr>
              <td class="td_1">客户</td>
              <td colspan="5">{{tableDetail_1.CUSTOMER_NAME}}/联系人:{{tableDetail_1.LINKMAN}}</td>
              <td class="td_1">物流</td>
              <td class="td_1"></td>
            </tr>
            <tr>
              <td class="td_1">备注</td>
              <td colspan="7">{{tableDetail_1.NOTES}}</td>
            </tr>
          </table>
       <el-table
       max-height="500"
            :data="tableDetail"
            border
            style="width: 100%; margin:10px auto;heitht:400px"
          >
            <el-table-column width="100" label="状态" align="center">
              <template slot-scope="scope1">
                <span>{{scope1.row.STATUS_ID|transStatus}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="ITEM_NO" label="型号" width="130" align="center">
            </el-table-column>
            <el-table-column prop="BATCH_NO" label="批次" width="200" align="center">

            </el-table-column>
            <el-table-column prop="PRODUCTVERSION_NAME" label="版本" width="150" align="center"></el-table-column>
            <el-table-column prop="NOTE" label="仓库" align="center"></el-table-column>
            <el-table-column prop="AREA" label="区位" width="100" align="center"></el-table-column>
            <el-table-column prop="QTY_DELIVER" label="计划数" width="80" align="center"></el-table-column>
            <el-table-column prop="TRANS_PRICE" label="物流单价" width="80" align="center"></el-table-column>
            <el-table-column prop="SALE_PRICE" label="单价" width="80" align="center">
            </el-table-column>
            <el-table-column prop="MONEY" label="金额" width="110" align="center"></el-table-column>
          </el-table>
           </div>
      </el-dialog>

      <div class="ff"> 
        <el-tabs class="tabs_1"  v-model="activeName" style="width:1340px">
          <el-tab-pane label="区域提货单查询" name="first">
            <form
              target="TAB_2_CONTENT"
              action="queryBillList.jsp"
              method="POST"
              class="FORM_1"
              style="height:250px"
            >
              <div style="width:100%">
                <div style="width:40%;border:none;float:left">
                  市场
                  <el-select v-model= "AREACODE.AREA_NAME" placeholder="----选择市场----" style="width:210px"
                  @change="areaCode(AREACODE.AREA_NAME)"
                  >
                    <el-option
                      v-for="item in AREACODE"
                      :key="item.AREA_CODE"
                      :label="item.AREA_NAME"
                      :value="item.AREA_CODE"
                    >
                    </el-option>
                  </el-select>
                  片区
                  <el-select v-model= "AREA_DISTRICT.DISTRICT_NAME" placeholder="----选择片区----" style="width:210px"
                    @change="district_code(AREA_DISTRICT.DISTRICT_NAME)">
                    <el-option
                      v-for="item in AREA_DISTRICT"
                      :key="item.DISTRICT_ID"
                      :label="item.DISTRICT_NAME"
                      :value="item.DISTRICT_ID"
                    ></el-option>
                  </el-select>
                 
                  
                  <div style="margin-top:15px">日期
                    <el-date-picker
                      type="date"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      placeholder="开始日期区间"
                      v-model="beginTime_1"
                      style="width:210px"
                    ></el-date-picker
                    >
                    <span style="margin-left:10px">--</span>
                    <el-date-picker
                      type="date"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      placeholder="结束日期区间"
                      v-model="finishTime_1"
                      style="width:210px;margin-left:12px"
                    ></el-date-picker>
                  </div>
                  <div style="margin-top:15px">客户类型
                  <el-select v-model= "CUSTOMER_TYPE.label" placeholder="全部" style="width:180px"
                  @change="customer_type(CUSTOMER_TYPE.label)">
                    <el-option
                      v-for="item in CUSTOMER_TYPE"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                  状态搜索
                  <el-select v-model= "STATUS.label" placeholder="全部" style="width:178px"
                  @change="status_id(STATUS.label)">
                    <el-option
                      v-for="item in STATUS"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                  </div>
                  <div style="margin-top:15px">
                    <div>
                      <el-button type="#DCDFE6" icon="el-icon-s-grid" class="cx" @click="reset"
                        >重置</el-button
                      >
                      <el-button
                        type="#DCDFE6"
                        icon="el-icon-search"
                        class="cx"
                        @click="_queryQuYu_1"
                        style="margin-left:65px"
                        >查询</el-button
                      >
                    </div>
                  </div>
                </div>

                <div id="right" style="float:right;margin-right:100px">
                  <el-transfer
                    :titles="['可选用户', '已选用户']"
                    style="height:240px;width:700px"
                    filterable
                    filter-placeholder="筛选"
                    v-model="value_4"
                    :data="customerData"
                    :props= "{
                      key:'CUSTOMER_CODE',
                      label:'CUSTOMER_NAME',
                      }"
                  >
                  </el-transfer>
                </div>
              </div>  
            </form> 
            <hr />
        <div  v-if="query_1">
        <el-table
         :summary-method="getSummaries"
         show-summary
          :data="tableData"
          border
          highlight-current-row
          style="width: 100%;font-weight:normal;font-size:12px"
          class="table_1"
         
        >
          <el-table-column prop="num" label width="50" align="center">
            <template slot-scope="scope"><span>{{scope.$index+(currentPage - 1) * limit + 1}} </span></template>
          </el-table-column>
          <el-table-column label="提货单号" width="110" align="center">
            <template slot-scope="scope1">
              <el-button
              size="mini"
               @click="openDia(scope1.row)"
                type="text"
                >{{ scope1.row.SALE_NO }}</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="状态"  align="center" width="70">
            <template slot-scope="scope2">
              {{ scope2.row.STATUS_ID|transStatus }}
            </template>
          </el-table-column>
          <el-table-column prop="CONTRACT_NO" label="订单号"  align="center" width="130px"></el-table-column>
          <el-table-column prop="HTBM" label="合同号"  align="center" width="130px"></el-table-column>
          <el-table-column prop="ORDERTYPE_NAME" label="类型" width="100" align="center"></el-table-column>
          <el-table-column label="开单日期" width="110"  align="center">
            <template slot-scope="scope4">
              {{ scope4.row.BILL_DATE|datatrans }}
            </template>
          </el-table-column>
          <el-table-column prop="DATE_OUT_STOCK" label="提货日期" width="110" align="center">
            <template slot-scope="scope5">
              {{ scope5.row.DATE_OUT_STOCK|datatrans }}
            </template>
          </el-table-column>
          <el-table-column prop="CUSTOMER_NAME" label="客户名称" align="center">
            <template slot-scope="scope3">
              {{ scope3.row.CUSTOMER_NAME}}/联系人:{{scope3.row.LINKMAN}}
            </template>
          </el-table-column>
          <el-table-column prop="MONEY_SUM" label="金额" width="100" align="center"></el-table-column>
          <el-table-column prop="NAME" label="物流管理员" align="center" width="100"></el-table-column>
        </el-table>
        <!-- 分页 -->
      <div style="margin:0 40%;" class="block">
        <el-pagination
        @current-change="handleCurrentChange"
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
import { mapMutations, mapActions } from "vuex";
import { mapState } from "vuex";
import {
  getAreaCode,
  getDistrictByAreaCode,
  getCustomerByAreaCode,
  getPackDetails,
  getPackDetailsBySaleNo
} from "@/api/areaInfoASP";
import Cookies from "js-cookie";
export default {
  name: "AreaQuery",
  data() {
    return {
      detailVisible: false,
      startDate:"",
      endDate:"",
      tableDetail: [],
      tableDetail_1: [],
      theBody: {},
      first:"",
      second:"",
       activeName: "first",
      query_1:false,//查询显示
      query_2:false,
      value_3:"",//客户类型初始值
      customerData:[],
      limit: 8,
      count: 0,
      currentPage: 1,
      value_4: [],//已选用户初始值
      value1: "",
      value2: "",
      beginTime_1: "",//区域提货单查询
      finishTime_1: "",
      AREA_DISTRICT: [],
      CUSTOMER_TYPE: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "notspeciality",
          label: "非专业市场客户"
        },
        {
          value: "speciality",
          label: "专业市场客户"
        }
      ],
      AREACODE: [],
      tableData: [],
      STATUS:[
        {
          value: "",
          label: "全部"
        },
        {
          value: "1",
          label: "待提"
        },
        {
          value: "2",
          label: "已提货"
        },
        {
          value: "3",
          label: "作废"
        },
        {
          value: "4",
          label: "已月结"
        }
      ],
      status_info:"",
    };
  },
  filters: {
    transStatus(value) {
      switch (value) {
        case "1":
          return "待提";
        case "2":
          return "已提货";
        case "3":
          return "作废";
        case "4":
          return "已月结";
          break;
      }
    },
    datatrans(value) {
      //时间戳转化大法
      if (value == null || value == "9999/12/31 00:00:00") {
        return "";
      }
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " "; /* + h + ':' + m + ':' + s; */
    }
  },
  //生命周期
  created() {
    this._getAreaCode();
  },
  methods: {
    
    //根据用户查区域市场
    _getAreaCode(){
      this.tableData = []
      this.value_4= []
      this.AREACODE= [];
      var userInfo = JSON.parse(Cookies.get("userInfo"));
      var data = {
        userid:userInfo.loginName
      }
      getAreaCode(data).then(res => {
          this.AREACODE = res.data;
        //console.log(this.stockIds)
      }).catch((res)=>{
              console.log(res)
      })

    },
    //根据市场区域查片区
    areaCode(val){          //点击选择市场事件
    this.tableData = []
    this.value_4= []
          var data = {
            areaCode:val
          }
          this.first = val
          getDistrictByAreaCode(data).then(res =>{
            this.AREA_DISTRICT = res.data
          })
         this._getCustomerByAreaCode_1(val);
       
      },
      //根据市场和片区查可选用户
    district_code(val){
      this.tableData = []
      this.value_4= []
      this.second = val
         var data = {
           areaCode:this.first,
            AREA_DISTRICT:val
         }
         this._getCustomerByAreaCode_2(data);
      },
      //根据市场，片区，客户类型查可选用户
    customer_type(val){
      this.tableData = [] 
      this.value_4= []
        var data = {
           areaCode:this.first,
            district:this.second,
          customerType:val
         }
         this._getCustomerByAreaCode_3(data);
      },
      //状态搜索
    status_id(val){
      this.status_info = val
      this.tableData = []
      this._queryQuYu_1();
    },
    //通过区域查询可选用户
    _getCustomerByAreaCode_1(val) {
      this.tableData = []
      this.customerData=[]
      this.value_4= []
      var data = {
        areaCode:val,//市场
        district:this.AREA_DISTRICT,//片区
        customerType:this.customer_type,//客户类型
      };
      getCustomerByAreaCode(data).then(res => {
        this.customerData = res.data
      })       
    },
    _getCustomerByAreaCode_2(val) {
      this.customerData=[]
      this.tableData = []
      this.value_4= []
      var data = {
        areaCode:val.areaCode,//市场
        district:val.AREA_DISTRICT,//片区
        customerType:this.customer_type,//客户类型
      };
      getCustomerByAreaCode(data).then(res => {
        this.customerData = res.data
      })       
    },
    _getCustomerByAreaCode_3(val) {
      this.customerData=[]
      this.tableData = []
      this.value_4= []
      var data = {
        areaCode:val.areaCode,//市场
        district:val.district,//片区
        customerType:val.customerType,//客户类型
      };
      getCustomerByAreaCode(data).then(res => {
        this.customerData = res.data
      })       
    },
    //提货单查询
    _queryQuYu_1(){
      this.currentPage = 1
      this.queryQuYu_1()
    },
    queryQuYu_1() {      
      this.query_1 = true
      this.tableData = []
      if(this.value_4 == []){
        return this.tableData = []
      }else{
      var data = {
        costomerCodes:this.value_4,//已选用户
        beginTime: this.beginTime_1, //起始时间
        finishTime: this.finishTime_1, //结束时间
        limit: this.limit, //限制数
        page: this.currentPage, //页数
        status: this.status_info,//状态
      }
      if (!data.beginTime) {
        data.beginTime = "0001/1/1";
      }
      if (!data.finishTime) {
        data.finishTime = "9999/12/31";
      } else {
        data.finishTime = data.finishTime + " 23:59:59";
      }
      getPackDetails(data).then(res => {
        this.count = res.count;
        this.tableData = res.data
      })   
      }    
      // this.$router.push("/QYTable");
    },
    //计算表格末行
    getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总价';
            return;
          }else if(index == 9){
            var values = data.map(item => Number(item[column.property])); 
            if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] = sums[index].toFixed(2);
            if (this.isManager == "0")
              sums[index] = "***";
          } else {
            sums[index] = "";
          }
          }
         else {
            sums[index] = '';
          }
        });
        return sums;
      },

    //翻页获取订单
    handleCurrentChange(val) {
      this.currentPage = val;
      this.queryQuYu_1();
    },  
    //重置
    reset(){
      this.customerData=[]
      this.beginTime_1=""
      this.finishTime_1=""
      this.value_4=[]
      this.tableData=[]
      this.AREA_DISTRICT=[]
      this.status_info= ""
      this.CUSTOMER_TYPE = [
        {
          value: "",
          label: "全部"
        },
        {
          value: "notspeciality",
          label: "非专业市场客户"
        },
        {
          value: "speciality",
          label: "专业市场客户"
        }
      ],
      this.STATUS=[
        {
          value: "",
          label: "全部"
        },
        {
          value: "1",
          label: "待提"
        },
        {
          value: "2",
          label: "已提货"
        },
        {
          value: "3",
          label: "作废"
        },
        {
          value: "4",
          label: "已月结"
        }
      ]
      this.tableDetail = []
      this.count = 0
      this.currentPage = 1
      this._getAreaCode();
    },

    //打开弹窗显示详情数据
    openDia(val) { 
      this.tableDetail = []
      this.tableDetail_1 = []
      this._getPackDetailsBySaleNo(val)
      let data_1 = {
        SALE_NO:val.SALE_NO,//提货单
        BILL_DATE:val.BILL_DATE,//日期
        STATUS_ID:val.STATUS_ID,//状态
        SALE_NAME:val.SALE_NAME,//业务员
        HTBM:val.HTBM,//合同号
        MONEY_SUM:val.MONEY_SUM,//金额
        DATE_OUT_STOCK:val.DATE_OUT_STOCK,//提货日期
        CUSTOMER_NAME:val.CUSTOMER_NAME,//客户名称
        LINKMAN:val.LINKMAN,
        NOTES:val.NOTES,//备注
      }
      this.tableDetail_1 = data_1 
      
    },
    _getPackDetailsBySaleNo(val){
      this.tableDetail = []
      var data_2 = {
        saleNo:val.SALE_NO,//所选提货单
      } 
      getPackDetailsBySaleNo(data_2).then(res => { 
        this.tableDetail = res.data;
        this.detailVisible = true;
      })      
}
   
  }
};
</script>
<style>
.table_1 .el-table__row {
   height: 3px;
}
</style>
<style scoped>
 .td_1{
   text-align: center
 }
.table_2{
  border-collapse:collapse;
  border: 1px solid black;
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
  background: #8bc34a;
  color: rgb(255, 255, 255);
}
.jiange {
  margin-left: 10px;
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