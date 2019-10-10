<template>
  <div>
    <el-card shadow="hover">
      <div id="trans">
        <div class="block">
          <div class="first_1">
          <span class="demonstration"></span>
          <el-date-picker
             v-model="date1"
            align="right"
            type="date"
             format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
            placeholder="选择日期"
          >
          </el-date-picker>
          <span class="demonstration">至</span>
          <el-date-picker
            v-model="date2"
            align="right"
            type="date"
             format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          ></el-date-picker>
          <el-button :id="'test111'" @click="autoSearch()"  icon="el-icon-search" style="margin-left:8px" class="button_1">搜索</el-button>
         
            </div>
            <hr>
          <el-table
            :data="tableData"
       :span-method="arraySpanMethod"
            style="width: 100%"
          >
            <el-table-column
              prop="TRANS_NO"
              label="单据号"
              
              align="center"
            ></el-table-column>
            <el-table-column
              prop="BILL_NO"
              label="原始单号"
             
              align="center"
            ></el-table-column>
            <el-table-column
              prop="ITEM_NO"
              label="型号"
              
              align="center"
            ></el-table-column>
            <el-table-column
              prop="BATCH_NO"
              label="批号"
              
              align="center"
            ></el-table-column>
            <el-table-column
              prop="QTY_TRANS"
              label="实际数量"
              
              align="center"
            ></el-table-column>
            <el-table-column
              prop="UNIT_PRICE"
              label="含税单价"
              
              align="center"
            >
           <template slot-scope="scope">
                  <span>{{ scope.row.UNIT_PRICE | numFilter }}</span>
                </template>
            </el-table-column>
            <el-table-column
              prop="SUM_PRICE_TAX"
              label="含税总价"
              
              align="center"
            ></el-table-column>
            <el-table-column
              
              label="开单日期"
              
              align="center"
            >
             <template slot-scope="scope">
                  <span>{{ scope.row.DATE_LIST | datatrans }}</span>
                </template>
            </el-table-column>
          </el-table>
        </div>
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
      </div>
    </el-card>
  </div>
</template>

<script>
import { GetTransDetail } from "@/api/supplierASP";
import Cookies from "js-cookie";
export default {
  name: "trans",
  data() {
    return {
      cid: Cookies.get("cid"),
      companyId: Cookies.get("companyId"),
      currentPage: 1,
      limit: 10,
      count: 0,
      tableData:[],
      arr_index: [],
      arr_span: [],
      arr_index0: [],
      arr_span0: [],
      date1: "",
      date2: "",
      activeName: "third",
      
    };
  },

  created() {
    this.autoSearch();

  },
  methods: {
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

    //计算合并行的index和需合并的行数，太慢拖累加载速度 在表个后加 :span-method="arraySpanMethod" 原32
    mergeColumnIndex() {
      this.arr_index.splice(0,this.arr_index.length);
       this.arr_span.splice(0,this.arr_span.length);
      //遍历表格需要合并的列
      var arr = this.tableData;
      var intSpan=1;
      var intIndex=0;
      var len = 0;
      for (var i = 1, len = arr.length; i < len; i++) {//从第二行开始与前一行比较
        if (arr[i].TRANS_NO === arr[i - 1].TRANS_NO ) {
          intSpan = intSpan + 1;//如果相同,该合并的rowSpan+1
          intIndex = i +1- intSpan;//row
          console.log("相同则累加合并项");
          console.log(intSpan);
          console.log(intIndex);
        } 
        else if (arr[i].TRANS_NO != arr[i - 1].TRANS_NO  ) {
          this.arr_index.push(intIndex);
          this.arr_span.push(intSpan);
          console.log("不相同则追加数组");
          console.log(this.arr_index);
          console.log( this.arr_span);
          intSpan = 1;
          intIndex = i; 
        }
         if (i==len -1){
          //  intSpan = 1;
          // intIndex = i-1; 
          this.arr_index.push(intIndex);
          this.arr_span.push(intSpan);
          console.log("末尾则追加数组");
          console.log(this.arr_index);
          console.log( this.arr_span);
        }
      }
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {//特别注意：查询出那列就合并那列，index别写成别的列
      if(this.arr_index.indexOf(rowIndex)>-1){
        var i=this.arr_index.indexOf(rowIndex);
         return [this.arr_span[i], 1];
      }
       else return{
              rowspan: 0,
              colspan: 0
          }
       
      } 
    },
    
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } 
          else {
            return {
              rowspan: 1,
              colspan: 1
            };
          }
        }
      },
      //查询语句
          autoSearch() {
      var data = {
        cid: Cookies.get("cid"),
        companyId: Cookies.get("companyId"),
        beginTime: this.date1,
        finishTime: this.date2,
        limit: this.limit,
        page: this.currentPage,
        current_id: Cookies.get("companyId"),
        supply_type: "",
        po_type: this.po_type //  status状态   cancel    efficient 生效（新采购单）   enforce 已执行（已确认）   fulfill 已完成
      };
        if (!data.beginTime) {
        data.beginTime = "0001/1/1";
      }
      if (!data.finishTime) {
        data.finishTime = "9999/12/19";
      } else {
        data.finishTime = data.finishTime + " 23:59:59";
      }
      GetTransDetail(data).then(res => {
        this.count = res.count;
        this.tableData = res.data;
           this.mergeColumnIndex();
           this.arraySpanMethod();
      });
   
    },
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
};
</script>

<style scoped>
.first_1{
  margin-bottom: 5px;
}
.button_1{
  width: 100px;
  background: #8bc34a;
  margin-left: 10px;
  color: rgb(255, 255, 255);
  text-align: center
}
</style>