<template>
  <div id="orderQuery">
    <el-card shadow="hover">
      <div slot="header" class="clearfix">
        <span class="KCCX">订单查询</span>
      </div>

      <!-- dialog -->
      <el-dialog
        title="客户详情"
        :visible.sync="dialogVisible"
        width="50%"
      >
        <el-table :data="dialogData">
    <el-table-column property="HTH" label="客户" width="150"></el-table-column>
    <el-table-column property="name" label="姓名" width="200"></el-table-column>
    <el-table-column property="address" label="地址"></el-table-column>
  </el-table>

      </el-dialog>
 <el-dialog
        title="订单详情"
        :visible.sync="dialogVisible_2"
        width="50%"
      >
        <el-table :data="dialogData">
    <el-table-column property="HTH" label="客户" width="150"></el-table-column>
    <el-table-column property="name" label="姓名" width="200"></el-table-column>
    <el-table-column property="address" label="地址"></el-table-column>
  </el-table>

      </el-dialog>

      <div class="ff">
      <form target="TAB_2_CONTENT" action="queryBillList.jsp" method="POST" class="FORM_1">
          <div class="CONDITION_DIV" style="height:50px;width:100%;border:none;">
           

                 
                    <!-- <select
                      style="width:150px;height:30px"
                      id="AREA_DISTRICT"
                      name="AREA_DISTRICT"
                      onchange="loadAreaCustomers($(&quot;AREA_CODE&quot;).value,this.value)"
                    >
                     
                    </select> -->
                  

                <el-date-picker
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder="日期区间"
         
          style="width:15%;"
        ></el-date-picker> --
        <el-date-picker
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder="日期区间"
          
          style="width:15%;"
        ></el-date-picker>
                    <el-select v-model= "value" placeholder="----选择工程主客户----" style="margin-left:10px">
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

<el-button type="#DCDFE6" icon="el-icon-s-grid" class="cz_1" style="margin-left:10px">重置</el-button>
        <el-button type="#DCDFE6" icon="el-icon-search" class="cz_1" @click="queryQuYu">查询</el-button>
          </div>
        </form>
        <hr />
        <el-table
          :data="tableData"
          border
          highlight-current-row
         
          style="width: 100%"
          class="table_1"

        >
          <el-table-column prop="num" label width="50" align="center"></el-table-column>
          <el-table-column label="订单号" align="center">
            <template slot-scope="scope1">
              <!-- <el-button @click="toOrderDetail(scope1.row.ORDER_NO,scope1.row.STATUS_ID)" type="text">{{scope1.row.ORDER_NO}}</el-button> -->
              <el-button
               @click="dialogVisible_2 = true"
                type="text"
              >{{scope1.row.THDH}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="ZT" label="状态" width="100" align="center"></el-table-column>
          <el-table-column prop="DDH" label="创建时间" align="center"></el-table-column>
          <el-table-column  label="客户" align="center">
             <template slot-scope="scope1">
              <!-- <el-button @click="toOrderDetail(scope1.row.ORDER_NO,scope1.row.STATUS_ID)" type="text">{{scope1.row.ORDER_NO}}</el-button> -->
              <el-button
               @click="dialogVisible = true"
                type="text"
              >{{scope1.row.HTH}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="LX" label="联系人" align="center"></el-table-column>
          <el-table-column prop="LXDH" label="联系电话" align="center"></el-table-column>
        </el-table>
      </div>
       <!-- 分页 -->
            <div style="margin:0 40%;" class="block">
        <el-pagination
        
          :current-page="currentPage"
          :page-size="limit"
          layout="prev, pager, next, jumper"
          :total="count"
        ></el-pagination>
      </div>
    </el-card>               
  </div>
</template>

<script>
import Axios from "axios";
import Cookies from "js-cookie";
import { mapMutations, mapActions } from "vuex";
import { mapState } from "vuex";
export default {
  name:"OrderQuery",
  data() {
    return {
      value:"",
       limit: 8,
      count: 18,
      currentPage: 1,
      dialogVisible: false,
      dialogVisible_2: false,
        value_1: [],
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
      customer_main:[
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
        },
      ],

      tableData: [
        {
          num: "1",
          THDH: "000000",
          ZT: "0",
          DDH: "2019-10-10",
          HTH: "小明公司",
          LX: "小明",
          LXDH: "0000000",  
        },
        {
          num: "2",
          THDH: "000001",
          ZT: "1",
          DDH: "2019-10-11",
          HTH: "小红公司",
          LX: "小红",
          LXDH: "0000001",  
        },
       
      ] ,
      dialogData: [{
         num: "1",
          THDH: "000000",
          ZT: "0",
          DDH: "2019-10-10",
          HTH: "",
          LX: "小明",
          LXDH: "0000000",  
      }
          
        ]

    };
  },

  methods: {
    queryQuYu() {
      
    }
  }
};
</script>

<style scoped>
.cz_1{
     background: #8bc34a;
  color: rgb(255, 255, 255);
}
.tabs_1{
margin-left: 10px
}
.gx{
  background: #8bc34a;
  color: rgb(255, 255, 255);
}
.FORM_1 {
  margin-left: -10px;
}
.CONDITION_DIV_TABLE2 {
  height: 100px;
}
.ff {
  background: rgb(236, 245, 239);
}
.cz {
  text-align: center
  
}
.cx {
  margin-left: 10px;
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


</style>