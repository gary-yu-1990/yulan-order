<template>
  <div id="orderQuery">
    <el-card shadow="hover">
     
       <el-dialog
        title="客户详情"
        :visible.sync="dialogVisible"
        width="40%"
        style="height:70%"
        
      >
      <div style="margin:0,auto">
      <el-card>
       <TABLE class="table_2">
        <tr>
          <td>客户名称:</td>
          <td>{{customerInfo.CUSTOMER_NAME}}</td>
        </tr>
        <tr>
          <td>联系人：</td>
          <td>{{customerInfo.LINKPERSON}}</td>
        </tr>
         <tr>
          <td>电话：</td>
          <td>{{customerInfo.TELEPHONE}}</td>
        </tr>
         <tr>
          <td>地址：</td>
          <td>{{customerInfo.POST_ADDRESS}}</td>
        </tr>
         <tr>
          <td style="width:150px">优惠券余额：</td>
          <td v-for="item of couponData" :key="item.index">当前余额 {{item.rebateMoneyOver}}元</td>
        </tr>
         <tr>
          <td>客户余额：</td>
          <td>{{moneySituation}}</td>
        </tr>
       </TABLE>
       </el-card>
      </div>
      </el-dialog>

       <el-dialog
        :show-close="true"
        :visible.sync="dialogVisible_1"
        width="65%"
      >
       <keep-alive>
        <checkExamine 
        v-if="dialogVisible_1"
        :isShowButton='false' 
        :ruleForm="ruleForm">
        </checkExamine>
        </keep-alive>
      </el-dialog>

      <div class="ff"> 
        <el-tabs class="tabs_1"  v-model="activeName" style="width:1340px">
          <el-tab-pane label="区域订单查询" name="first_1">
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
                  </el-select></div>
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
          :data="tableData"
          border
          highlight-current-row
          style="width: 100%;font-weight:normal;font-size:12px"
          class="table_1"
        >
          <el-table-column prop="num" label width="80" align="center">
            <template slot-scope="scope"><span>{{scope.$index+(currentPage - 1) * limit + 1}} </span></template>
          </el-table-column>
          <el-table-column label="订单号" align="center" width="200px">
            <template slot-scope="scope1">
              <el-button
              size="mini"
                @click="openDialog(scope1.row.ORDER_NO)"
                type="text"
                >{{ scope1.row.ORDER_NO }}</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="状态" width="150px" align="center" >
            <template slot-scope="scope2">
              {{scope2.row.STATUS_ID|transType}}
            </template>
          </el-table-column>
          <el-table-column prop="DATE_CRE" label="创建时间" align="center" width="150px">
            <template slot-scope="scope4">
              {{scope4.row.DATE_CRE|datatrans}}
            </template>
          </el-table-column>
          <el-table-column  label="客户" align="center" width="350px">
             <template slot-scope="scope3">
              <el-button
              size="mini"
               @click="customer_info(scope3.row)"
                type="text"
              >{{scope3.row.CUSTOMER_NAME}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="LINKPERSON" label="联系人" align="center" width="150px"></el-table-column>
          <el-table-column prop="TELEPHONE" label="联系电话" align="center"></el-table-column>
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

import checkExamine from "../order/checkExamine";
import { searchAssignments, orderDetail,manageCoupon } from "@/api/orderList";
// import { manageCoupon } from "@/api/orderList";
import { getUserMoney } from "@/api/user";
import { mapMutations, mapActions } from "vuex";
import { mapState } from "vuex";
import {
  getAreaCode,
  getDistrictByAreaCode,
  getCustomerByAreaCode,
  getPackDetails,
} from "@/api/areaInfoASP";
import {
  getOrderByAreaCustomer,
} from "@/api/orderInfoASP";
import Cookies from "js-cookie";
const Head = "http://14.29.223.114:10250/upload";
const Quest = "http://14.29.223.114:10250/yulan-capital";
export default {
  name: "OrderQuery",
  data() {  
    return {
      button_1:false,
      ruleForm: {},
      cid:"",
      order_no:"",
      couponData: [],
      isManager: Cookies.get("isManager"),
      moneySituation:"",
      customerInfo:[],
        dialogVisible: false,
      dialogVisible_1: false,
      status:"已提交",
      first:"",
      second:"",
       activeName: "first_1",
      query_1:false,//查询显示
      query_2:false,
      value_3:"",//客户类型初始值
      customerData:[],
      limit: 8,//每页条数
      count: 0,//最大搜索数量
      currentPage: 1,//初始页码
      value_4: [],//已选用户初始值
      value1: "",
      value2: "",
      beginTime_1: "",
      finishTime_1: "",
      AREA_DISTRICT: [],
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
          value: "0",
          label: "待提交"
        },
        {
          value: "1",
          label: "已提交"
        },
        {
          value: "2",
          label: "已受理"
        },
        {
          value: "3",
          label: "已作废"
        },
        {
          value: "4",
          label: "部分发货"
        },
        {
          value: "5",
          label: "余额不足待提交"
        },
        {
          value: "6",
          label: "余额不足可提交"
        },
        {
          value: "7",
          label: "已完成"
        },
        {
          value: "12",
          label: "已接收"
        },
      ],
      status_info:"",
    };
  },
  //生命周期
  created() {
    this._getAreaCode();
  },
  components: {
    checkExamine
  },
  filters: {
    transType(value) {
      switch (value) {
        case "0":
          return "待提交";
          break;
        case "1":
          return "已提交";
          break;
        case "2":
          return "已受理";
        case "3":
          return "已作废";
           case "4":
          return "部分发货";
           case "5":
          return "余额不足待提交";
           case "6":
          return "余额不足可提交";
           case "7":
          return "已完成";
           case "12":
          return "已接收";
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

  
  methods: {
    openDialog(val) {
      this.cid = Cookies.get("cid");
      this.order_no = val;
      Cookies.set("ORDER_NO",0)
      this.getDetail();
    },
      getDetail() {
      let url = "/order/getOrderContent.do";
      let data = {
        cid: this.cid,
        order_no: this.order_no
      };
      orderDetail(url, data).then(res => {
        this.ruleForm = res.data.data[0];
         Cookies.set("ORDER_NO", this.ruleForm.ORDER_NO);
        this.dialogVisible_1 = true;
      });
    },
    //点击客户
    async customer_info(val){
      
      this.customerInfo = val
      var res = await getUserMoney(
        {
          cid: this.cid,
          companyId: this.customerInfo.COMPANY_ID
        },
      )
      this.moneySituation = "当前余额 " + res.data + "元";
      var url = "/order/findRebate.do";
      var data = {
        cid: Cookies.get("cid"),
        companyId: this.customerInfo.COMPANY_ID
      };
      var res2 = await manageCoupon(url, data)
      this.couponData = res2.data;
      this.dialogVisible = true
    },
    
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
      this._queryQuYu_1();
    },
    //通过区域查询可选用户
    _getCustomerByAreaCode_1(val) {
      this.customerData=[]
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
      var data = {
        areaCode:val.areaCode,//市场
        district:val.district,//片区
        customerType:val.customerType,//客户类型
      };
      getCustomerByAreaCode(data).then(res => {
        this.customerData = res.data
      })       
    },
    //订单查询
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
      getOrderByAreaCustomer(data).then(res => {
        this.count = res.count;
        this.tableData = res.data
      }) 
      }      
    
    },
    //翻页获取订单
    handleCurrentChange(val) {
      this.currentPage = val;
      this.tableData = []
      this.queryQuYu_1();
    },  
    
    //重置
    reset(){
      this.currentPage = 1
      this.customerData=[]
      this.beginTime_1=""
      this.finishTime_1=""
      this.value_4=[]
      this.tableData=[]
      this.AREA_DISTRICT=[]
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
      this.status_info= ""
      this.STATUS=[
        {
          value: "",
          label: "全部"
        },
        {
          value: "0",
          label: "待提交"
        },
        {
          value: "1",
          label: "已提交"
        },
        {
          value: "2",
          label: "已受理"
        },
        {
          value: "3",
          label: "已作废"
        },
        {
          value: "4",
          label: "部分发货"
        },
        {
          value: "5",
          label: "余额不足待提交"
        },
        {
          value: "6",
          label: "余额不足可提交"
        },
        {
          value: "7",
          label: "已完成"
        },
        {
          value: "12",
          label: "已接收"
        },
      ],
      this.count = 0
      Cookies.set("ORDER_NO",0)
       this._getAreaCode();

    }
  }
};
</script>
<style>
.table_1 .el-table__row {
   height: 5px;
}
</style>
<style scoped>
.table_2{
  font-size: 20px
  
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