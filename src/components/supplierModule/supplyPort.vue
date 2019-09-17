<template>
  <div>
    <el-card shadow="hover">
      <div id="supplyCon">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="新采购单" name="first" align="center">
            待确认采购单 [供应商代码：XXX]
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="pur_no" label="单号" width="120" align="center"></el-table-column>
              <el-table-column prop="bd_order_no" label="壁达订单号" width="180" align="center"></el-table-column>
              <el-table-column prop="status" label="状态" width="120" align="center"></el-table-column>
              <!--不确定-->
              <el-table-column prop="Date_req" label="建立日期" width="120" align="center"></el-table-column>
              <el-table-column prop="notes" label="备注" width="500" align="center"></el-table-column>
             
                <el-table-column width="150" align="center" label="">
              <template slot-scope="scope">
                <el-button
                  :disabled="scope.row.packDetailId==0?true:false"
                  @click="shipmentDetail(scope.row)"
                  type="primary"
                  size="small"
                >查看详情</el-button>
                <!-- :disabled="scope.row.packDetailId==0?true:false" -->
              </template>
            </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="已确认采购单" name="second" align="center">
            已确认采购单 [供应商代码：XXX]
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="pur_no" label="单号" width="120" align="center"></el-table-column>
              <el-table-column prop="bd_order_no" label="壁达订单号" width="180" align="center"></el-table-column>
              <el-table-column prop="status" label="状态" width="120" align="center"></el-table-column>
              <!--不确定-->
              <el-table-column prop="Date_req" label="建立日期" width="120" align="center"></el-table-column>
              <el-table-column prop="notes" label="备注" width="500" align="center"></el-table-column>
              <el-table-column prop="sure" label="确认" width="50" align="center"></el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="入库单" name="third">
            <div class="block">
              <span class="demonstration"></span>
              <el-date-picker
                v-model="value2"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions"
              ></el-date-picker>
              <span class="demonstration">至</span>
              <el-date-picker
                v-model="value2"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions"
              ></el-date-picker>
              <el-button :id="'test111'">查询</el-button>
              <el-button :id="'test111'">导出Excel</el-button>
              <el-table :data="1" style="width: 100%">
                <!--不确定-->
                <el-table-column prop="trans_no" label="单据号" width="120" align="center"></el-table-column>
                <el-table-column prop="bill_no" label="原始单号" width="180" align="center"></el-table-column>
                <el-table-column prop="grade" label="型号" width="120" align="center"></el-table-column>
                <el-table-column prop="batch_no" label="批号" width="120" align="center"></el-table-column>
                <el-table-column prop="qty_trans" label="实际数量" width="120" align="center"></el-table-column>
                <el-table-column prop="unit_price" label="含税单价" width="120" align="center"></el-table-column>
                <el-table-column prop="money_tax" label="含税总价" width="120" align="center"></el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "supplierModule/supplyPort1",
  data() {
    return {
      activeName: "first",
      tableData: [
        {
          pur_no: "2016-05-02",
          bd_order_no: "王小虎",
          notes: "上海市普陀区金沙江路 1518 弄"
        },
        {
          pur_no: "2016-05-04",
          bd_order_no: "王小虎",
          notes: "上海市普陀区金沙江路 1517 弄"
        },
        {
          pur_no: "2016-05-01",
          bd_order_no: "王小虎",
          notes: "上海市普陀区金沙江路 1519 弄"
        },
        {
          pur_no: "2016-05-03",
          bd_order_no: "王小虎",
          notes: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  }
};
</script>

<style scoped>
</style>