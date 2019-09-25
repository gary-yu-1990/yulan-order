<template>
  <div>
    <el-card class="centerCard">
      <el-dialog
        title="采购单详情"
        :show-close="true"
        :visible.sync="detailVisible"
        disabled="true"
        width="80%"
        top="28vh"
      >
        <div>
          <el-form
          label-position="left"
         label-width="70px"
            :inline="true"
            :model="pur_headForm"
     
            class="demo-form-inline"
          >
            <el-form-item label="采购单号" >
              <el-input
          
              readonly="true"
                v-model="pur_headForm.PUR_NO"
                placeholder="采购单号"
              ></el-input>
            </el-form-item>
            <el-form-item label="联系人" >
              <el-input
              readonly="true"
                v-model="pur_headForm.linkMan"
                
              >
              </el-input>
              <!-- <el-select v-model="pur_headForm.linkMan" placeholder="活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select> -->
            </el-form-item>
            <el-form-item label="下单时间">
              <el-input
              readonly="true"
                v-model="pur_headForm.DATE_PUR"
                placeholder="下单时间"
              ></el-input>
            </el-form-item>
            <el-form-item label="备注信息">
              <el-input
              readonly="true"
                v-model="pur_headForm.NOTES"
                placeholder="备注信息"
              ></el-input>
            </el-form-item>
            <el-form-item label="说 明">
              <el-input
                v-model="pur_headForm.SUPPLY_CHECK_NOTES"
                placeholder="说明"
              ></el-input>
            </el-form-item>
            <el-form-item label="配送日期">
              <el-input
                v-model="pur_headForm.DATE_DELIVER"
                placeholder="配送日期"
              >
               <template slot-scope="scope">
              <span>{{ scope.row.DATE_DELIVER | datatrans }}</span>
            </template></el-input>
            </el-form-item>
          </el-form>
        </div>
        <el-table :data="gridData">
          <el-table-column
            property="ITEM_NO"
            label="物料号"
            width="110"
          ></el-table-column>
          <el-table-column
            property="MGUIGE"
            label="物料型号"
            width="110"
          ></el-table-column>
          <el-table-column
            property="MNAME"
            label="名称"
            width="100"
          ></el-table-column>
          <el-table-column
            property="GRADE"
            label="规格"
            width="100"
          ></el-table-column>
          <el-table-column
            property="QTY_PUR"
            label="数量"
            width="60"
          ></el-table-column>
          <el-table-column
            
            label="含税单价"
            width="80"
          >
          <template slot-scope="scope">
              <span>{{ scope.row.PRICE_TAXIN|numFilter }}</span>
            </template></el-table-column>
          <el-table-column
            property="UNIT1"
            label="单位"
            width="60"
          ></el-table-column>
          <el-table-column
            property="TOTAL_MONEY"
            label="金额"
            width="60"
          ></el-table-column>
          <el-table-column
            property="NOTE"
            label="备注"
            width="150"
          ></el-table-column>
          <el-table-column property="DATE_PUR" label="约定日期" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.DATE_PUR | datatrans }}</span>
            </template>
          </el-table-column>
          <el-table-column property="DATE_DELIVER" label="送货日期" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.DATE_DELIVER | datatrans }}</span>
            </template>
          </el-table-column>
          <el-table-column
            property="SUPPLY_CHECK_NOTES"
            label="说明"
            width="150"
          ></el-table-column>
        </el-table>
        <keep-alive> </keep-alive>
      </el-dialog>

      <div id="supplyCon">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="待确认" name="first" align="left">
            <el-table border :data="pur_headData" style="width: 100%">
              <el-table-column type="index" :index="indexMethod">
              </el-table-column>
              <el-table-column
                prop="PUR_NO"
                width="160"
                label="单号"
                align="center"
              ></el-table-column>
              <el-table-column label="状态" width="100" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.STATUS | pur_headStatus }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="DATE_PUR"
                width="160"
                label="建立日期"
                align="center"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.DATE_PUR | datatrans }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="NOTES"
                width="400"
                label="备注"
                align="center"
              ></el-table-column>
              <el-table-column label="" width="120" align="center">
                <template slot-scope="scope">
                  <el-button
                    @click="openDialog(scope.row.PUR_NO)"
                    type="primary"
                    size="small"
                    >查看详情</el-button
                  >
                </template>
              </el-table-column>
              <el-table-column label="" width="120" align="center">
                <template>
                  <el-button type="warning" size="small">确认</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>

          <el-tab-pane label="已确认" name="second" align="left">
            <el-table border :data="pur_headData" style="width: 100%">
              <el-table-column type="index" :index="indexMethod">
              </el-table-column>
              <el-table-column
                prop="PUR_NO"
                width="160"
                label="单号"
                align="center"
              ></el-table-column>
              <el-table-column label="状态" width="100" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.STATUS | pur_headStatus }}</span>
                </template>
              </el-table-column>
              <el-table-column
                fomate="yyyy-MM-dd"
                width="160"
                label="建立日期"
                align="center"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.DATE_PUR | datatrans }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="NOTES"
                width="400"
                label="备注"
                align="center"
              ></el-table-column>
              <el-table-column label="" width="120" align="center">
                <template slot-scope="scope">
                  <el-button
                    @click="openDialog(scope.row.PUR_NO)"
                    type="primary"
                    size="small"
                    >查看详情</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <div style="margin:0 25%;" class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="limit"
              layout="total,sizes, prev, pager, next, jumper"
              :total="count"
            ></el-pagination>
          </div>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script>
import { GetPoDetail, GetRelativePo } from "@/api/supplierASP";
import Cookies from "js-cookie";
// const Head = "http://14.29.223.114:10250/upload";
// const Quest = "http://14.29.223.114:10250/yulan-capital";
const Head = "http://192.168.123.43:8080/upload";
const Quest = "http://192.168.123.43:8080/yulan-capital";
export default {
  name: "SupplyPort",
  data() {
    return {
      current_id: Cookies.get("cid"),
      // companyId: Cookies.get("companyId"),
      gridData: [],
      detailVisible: false,
      po_type: "",
      limit: 10,
      count: 0,
      currentPage: 1,
      activeName: "first",
      count: 0,
      pur_headData: [],
      pur_headForm: {
        PUR_NO: "",
        linkMan: "",
        DATE_DELIVER: "",
        DATE_PUR: "",
        DATE_REQ: "",
        NOTES: "",
        SUPPLY_CODE: "",
        SUPPLY_CHECK_NOTES: ""
      }
    };
  },
  methods: {
    //查看详情页
    openDialog(PUR_NO) {
      this.detailVisible = true;
      this.autoSearchDetail(PUR_NO);
      
    

      //将表头内容填充到明细
    },
    //标签页切换
    handleClick(tab) {

      var tabName = tab.name;
      this.currentPage = 1;
      switch (tabName) {
        case "first":
          this.po_type = "efficient";
          this.autoSearch();
          break;
        case "second":
          this.po_type = "cancel";
          this.autoSearch();
          break;
      }
    },
    //首列序号自定义
    indexMethod(index) {
      return index + 1;
    },
    //页面条数
    handleSizeChange(val) {
      this.limit = val;
      this.currentPage = 1;
      this.autoSearch();
    },
    //翻页获取订单
    handleCurrentChange(val) {
      this.currentPage = val;
      this.autoSearch();
    },

    autoSearch() {
      var data = {
        limit: this.limit,
        page: this.currentPage,
        current_id: Cookies.get("cid"),
        // companyId: Cookies.get("companyId"),
        supply_type: "",
        po_type: this.po_type //  status状态   cancel    efficient 生效（新采购单）   enforce 已执行（已确认）   fulfill 已完成
      };
      GetRelativePo(data).then(res => {
        this.count = res.count;
        this.pur_headData = res.data;
      });
    },
    autoSearchDetail(PUR_NO) {
      var data = {
        PUR_NO: PUR_NO
      };
      GetPoDetail(data).then(res => {
        this.gridData = res.data;
       this.pur_headForm.PUR_NO = this.gridData[0].PUR_NO;
       this.pur_headForm.linkMan = this.gridData[0].linkMan;
       this.pur_headForm.DATE_PUR = this.gridData[0].DATE_PUR;
       this.pur_headForm.DATE_DELIVER = this.gridData[0].DATE_DELIVER;
       this.pur_headForm.NOTES = this.gridData[0].NOTES;
       this.pur_headForm.SUPPLY_CHECK_NOTES = this.gridData[0].SUPPLY_CHECK_NOTES;
      });
    }
  },
  filters: {
    pur_headStatus(value) {
      switch (value) {
        case "cancel":
          return "取消";
          break;
        case "efficient":
          return "生效";
          break;
        case "enforce":
          return "执行";
          break;
        case "fulfill":
          return "完成";
          break;
      }
    },
      numFilter (value) {
    // 截取当前数据到小数点后两位
    let realVal = parseFloat(value).toFixed(2)
    return realVal
  },

    datatrans(value) {
      //时间戳转化大法
      if (value == null) {
        return "";
      }
      let date = new Date(value);
      let y = date.getFullYear();
      if (y > 5000) {
        return "";
      }
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
  


  created() {
    this.po_type = "efficient";
    this.autoSearch();
  }
};
</script>

<style scoped>
</style>