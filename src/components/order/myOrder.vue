<template>
  <el-card class="centerCard">
    <div>
      <el-tabs
        style="display:inline-block;width:580px;"
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane label="待处理" name="pending"></el-tab-pane>
        <el-tab-pane label="窗帘审核订单" name="LJPending"></el-tab-pane>
        <el-tab-pane label="生效订单" name="YLPending"></el-tab-pane>
        <el-tab-pane label="已作废" name="invalid"></el-tab-pane>
        <el-tab-pane label="全部订单" name="allOrder"></el-tab-pane>
      </el-tabs>
      <a
        target="_blank"
        style="float:right;"
        href="http://www.luxlano.com/ddkc/"
        >玉兰·兰居尚品->订单及库存查询</a
      >
    </div>

    <div>
      <el-date-picker
        type="date"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        placeholder="日期区间"
        v-model="date1"
        style="width:14%;"
      ></el-date-picker
      >&nbsp;至
      <el-date-picker
        type="date"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        placeholder="日期区间"
        v-model="date2"
        style="width:14%;"
      ></el-date-picker>
      <el-select
        style="width:160px;"
        v-model="CommodityType"
        placeholder="请选择商品类型"
      >
        <el-option
          v-for="item in commodityTypeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select
        style="width:160px;"
        v-model="orderStatus"
        placeholder="请选择审核状态"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input
        @keyup.enter.native="search()"
        placeholder="请输入相关信息搜索订单"
        v-model="find"
        style="width:280px;"
      >
        <el-button @click="search()" slot="append" icon="el-icon-search"
          >搜索</el-button
        >
      </el-input>
    </div>
    <div id="outDiv">
      <el-card
        style="position:relative;"
        v-for="(item, index) of data"
        :key="index"
      >
        <div slot="header">
          <span class="zoomLeft">时间：</span>
          <span class="zoomRight">{{ item.DATE_CRE }}</span>
          <span class="zoomLeft">订单号：</span>
          <span class="zoomRight">{{ item.ORDER_NO }}</span>
          <span class="zoomLeft">状态：</span>
          <span style="color:#8BC34A;font-weight:bold;" class="zoomRight"
            >{{ item.STATUS_ID | transStatus
            }}{{ item.CURTAIN_STATUS_ID | curtainStatus }}</span
          >
          <el-tooltip
            v-if="
              item.STATUS_ID == 5 ||
                item.STATUS_ID == 6 ||
                item.STATUS_ID == 0 ||
                (item.STATUS_ID == 1 &&
                  item.CURTAIN_STATUS_ID !== '' &&
                  item.CURTAIN_STATUS_ID == 0)
            "
            class="item"
            effect="dark"
            content="作废订单"
            placement="top"
          >
            <i
              style="float:right;cursor: pointer;"
              class="el-icon-delete"
              @click="deleteOrder(item.ORDER_NO)"
            ></i>
          </el-tooltip>
          <el-tooltip
            v-if="item.STATUS_ID == 3 && item.ORDER_NO.slice(0, 1) == 'X'"
            class="item"
            effect="dark"
            content="退回数据到购物车"
            placement="top"
          >
            <i
              style="float:right;cursor: pointer;"
              class="el-icon-sell"
              @click="copyCart(item.ORDER_NO)"
            ></i>
          </el-tooltip>
        </div>

        <div class="outDiv" style="float:left;width:90%">
          <el-table
            border
            :data="data[index].ORDERBODY"
            style="width: 100%;margin-bottom:5px;"
            :row-class-name="tableRowClassName"
          >
            <el-table-column
              prop="ITEM_NO"
              label="型号"
              align="center"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="BRAND_NAME"
              label="品牌"
              align="center"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="NOTE"
              label="类型"
              align="center"
              width="120"
            ></el-table-column>
            <el-table-column label="数量" align="center" width="100">
              <template slot-scope="scope1">
                <span v-if="scope1.row.UNIT == '平方米'"
                  >{{ scope1.row.CURTAIN_WIDTH }}×{{
                    scope1.row.CURTAIN_HEIGHT
                  }}={{ scope1.row.QTY_REQUIRED }}</span
                >
                <span v-else>{{ scope1.row.QTY_REQUIRED }}</span>
              </template>
            </el-table-column>
            <el-table-column label="单位" align="center">
              <template slot-scope="scope1">
                <span v-if="scope1.row.UNIT == '°ü'">包</span>
                <span v-else>{{ scope1.row.UNIT }}</span>
              </template>
            </el-table-column>
            <el-table-column label="实际单价" align="center">
              <template slot-scope="scope1">
                <span v-if="isManager === '0'">***</span>
                <!-- <span v-else>{{scope1.row.UNIT_PRICE}}</span> -->
                <span v-else>{{
                  (scope1.row.FINAL_COST / scope1.row.QTY_REQUIRED)
                    | priceFilter
                }}</span>
              </template>
            </el-table-column>
            <el-table-column label="应付金额" align="center">
              <template slot-scope="scope1">
                <span v-if="isManager === '0'">***</span>
                <span v-else>{{ scope1.row.FINAL_COST }}</span>
                <!-- <span v-else>{{scope1.row.UNIT_PRICE*scope1.row.QTY_REQUIRED | priceFilter}}</span> -->
              </template>
            </el-table-column>
            <el-table-column width="150" align="center" label="出货详情">
              <template slot-scope="scope">
                <el-button
                  :disabled="scope.row.packDetailId == 0 ? true : false"
                  @click="shipmentDetail(scope.row)"
                  type="primary"
                  size="small"
                  >查看详情</el-button
                >
                <!-- :disabled="scope.row.packDetailId==0?true:false" -->
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="buttonDiv">
          <p
            style="width:100px; font-size:18px; color:tomato; text-align:center;"
          >
            {{ item.status }}
          </p>
          <router-link to="/order/checkOrder">
            <p>
              <el-button
                @click="summitCurtain(item)"
                v-if="
                  (item.CURTAIN_STATUS_ID == 0 ||
                    item.CURTAIN_STATUS_ID == 4) &&
                    item.STATUS_ID == 0
                "
                size="medium"
                type="primary"
                plain
                >提交订单</el-button
              >
            </p>
          </router-link>
          <p>
            <el-button
              v-if="item.STATUS_ID == 5 || item.STATUS_ID == 6"
              @click="refreshPay(item)"
              size="medium"
              type="danger"
              plain
              >提交订单</el-button
            >
          </p>
          <router-link to="/order/checkExamine">
            <p>
              <el-button
                @click="
                  toCheckExamine(
                    item.ORDER_NO,
                    item.CURTAIN_STATUS_ID,
                    item.STATUS_ID
                  )
                "
                size="medium"
                type="success"
                >订单详情</el-button
              >
            </p>
          </router-link>
        </div>
      </el-card>
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
</template>

<script>
import { getOrderlist, passExamine } from "@/api/orderList";
import {
  getAllOrders,
  InsertOperationRecord,
  cancelOrderNew,
  copyCartItem
} from "@/api/orderListASP";
import { cancelOrder, payAgain, queryCash } from "@/api/orderList";
import { mapMutations, mapActions } from "vuex";
import { mapState } from "vuex";
import Cookies from "js-cookie";
export default {
  name: "MyOrder",
  data() {
    return {
      isManager: Cookies.get("isManager"),
      data: [],
      date1: "",
      date2: "",
      find: "",
      CommodityType: "",
      orderStatus: "",
      state_id: "",
      activeName: "pending",
      limit: 5,
      count: 0,
      currentPage: 1,
      Initial_balance: 0,
      buttonShow: true,
      statusIdOptionValue1: ["0", "5", "6", "21", "22"],
      commodityTypeOptions: [
        {
          label: "墙纸配套类",
          value: "W"
        },
        {
          label: "窗帘",
          value: "X"
        },
        {
          label: "软装",
          value: "Y"
        }
      ],
      options: [
        {
          label: "待提交",
          value: "0"
        },
        {
          label: "余额不足待提交",
          value: "5"
        },
        {
          label: "余额不足可提交",
          value: "6"
        },
        {
          label: "待确认",
          value: "22"
        },
        {
          label: "待修改",
          value: "21"
        }
      ],
      options1: [
        {
          label: "待提交",
          value: "0"
        },
        {
          label: "余额不足待提交",
          value: "5"
        },
        {
          label: "余额不足可提交",
          value: "6"
        },
        {
          label: "待确认",
          value: "22"
        },
        {
          label: "待修改",
          value: "21"
        }
      ],
      options2: [
        {
          label: "待审核",
          value: "20"
        },
        {
          label: "兰居待修改",
          value: "23"
        }
      ],
      options3: [
        {
          label: "已提交",
          value: "1"
        },
        {
          label: "已接收",
          value: "12"
        },
        {
          label: "已受理",
          value: "2"
        },
        {
          label: "部分发货",
          value: "4"
        },
        {
          label: "已完成",
          value: "7"
        }
      ],
      options4: [
        {
          label: "已作废",
          value: "3"
        }
      ],
      options5: [
        {
          label: "待提交",
          value: "0"
        },
        {
          label: "余额不足待提交",
          value: "5"
        },
        {
          label: "余额不足可提交",
          value: "6"
        },
        {
          label: "待确认",
          value: "22"
        },
        {
          label: "待修改",
          value: "21"
        },
        {
          label: "待审核",
          value: "20"
        },
        {
          label: "兰居待修改",
          value: "23"
        },
        {
          label: "已提交",
          value: "1"
        },
        {
          label: "已接收",
          value: "12"
        },
        {
          label: "已受理",
          value: "2"
        },
        {
          label: "部分发货",
          value: "4"
        },
        {
          label: "已完成",
          value: "7"
        },
        {
          label: "已作废",
          value: "3"
        }
      ]
    };
  },
  activated: function() {
    this.refresh();
  },
  filters: {
    transStatus(value) {
      switch (value) {
        case "0":
          return "待提交";
          break;
        case "1":
          return "已提交";
          break;
        case "12":
          return "已接收";
          break;
        case "2":
          return "已受理";
          break;
        case "3":
          return "已作废";
          break;
        case "4":
          return "部分发货";
          break;
        case "5":
          return "余额不足待提交";
          break;
        case "6":
          return "余额不足可提交";
          break;
        case "7":
          return "已完成";
          break;
      }
    },
    curtainStatus(value) {
      switch (value) {
        case "0":
          return "待审核";
          break;
        case "1":
          return "待修改";
          break;
        case "2":
          return "待确认";
          break;
        case "3":
          return "兰居待修改";
          break;
        case "4":
          return "已通过";
          break;
      }
    },
    priceFilter(value) {
      //四舍五入过滤大法
      let realVal = parseFloat(value).toFixed(2);
      //防止出现-0.00；
      if (realVal <= 0) {
        realVal = 0.0;
      }

      return realVal;
    }
  },
  methods: {
    //窗帘提交订单
    summitCurtain(item) {
      let orderBody = item.ORDERBODY;
      let transCookies = [];
      for (let i = 0; i < item.ORDERBODY.length; i++) {
        transCookies[i] = new Object();
        //预留
        transCookies[i].width = item.ORDERBODY[i].CURTAIN_WIDTH;
        transCookies[i].height = item.ORDERBODY[i].CURTAIN_HEIGHT;
        transCookies[i].orderNumber = item.ORDER_NO;
        transCookies[i].lineNo = item.ORDERBODY[i].LINE_NO;
        transCookies[i].activityId = item.ORDERBODY[i].PROMOTION_TYPE;
        transCookies[i].quantity = item.ORDERBODY[i].QTY_REQUIRED;
        transCookies[i].price = item.ORDERBODY[i].UNIT_PRICE;
        transCookies[i].splitShipment = item.ORDERBODY[i].PART_SEND_ID;
        transCookies[i].activityName = item.ORDERBODY[i].PROMOTION;
        transCookies[i].unit = "米";
        transCookies[i].item = new Object();
        transCookies[i].item.itemNo = item.ORDERBODY[i].ITEM_NO;
        transCookies[i].item.note = item.ORDERBODY[i].NOTES;
        transCookies[i].item.itemVersion = item.ORDERBODY[i].PRODUCTION_VERSION;
        //orderType
        transCookies[i].salPromotion = new Object();
        transCookies[i].salPromotion.orderType =
          item.ORDERBODY[i].PROMOTION_TYPE;
        transCookies[i].salPromotion.arrearsFlag = item.ARREARSFLAG;
      }
      transCookies[0].item.groupType = "E";
      sessionStorage.setItem("shopping", JSON.stringify(transCookies));
      sessionStorage.setItem("shoppingHead", JSON.stringify(item));
      Cookies.set("cur_status", 3);
      this.addTab("order/checkOrder");
    },
    //查看审核
    toCheckExamine(value, ID, status) {
      Cookies.set("ORDER_NO", value);
      Cookies.set("CURTAIN_STATUS_ID", ID);
      Cookies.set("status_ID", status);
      this.addTab("order/checkExamine");
    },
    //订单详情
    toOrderDetail(val, status) {
      Cookies.set("ORDER_NO", val);
      Cookies.set("status_ID", status);
      this.addTab("order/orderDetail");
    },
    //订单获取
    refresh() {
      // var url = "/order/getOrders.do";
      // var data = {
      //   companyId: Cookies.get("companyId"),
      //   limit: "4",
      //   page: this.currentPage /* .toString(), */,
      //   cid: Cookies.get("cid"),
      //   state_id: this.state_id,
      //   find: this.find /* "W1610030066", */,
      //   beginTime: this.date1,
      //   finishTime: this.date2,
      //   orderType: this.CommodityType,
      //   curtainStatusId: ""
      // };
      // if (this.date1 != "" || this.date2 != "") {
      //   data.beginTime = this.date1 + " 00:00:00";
      //   data.finishTime = this.date2 + " 23:59:59";
      // }
      // getOrderlist(url, data).then(res => {
      //   console.log(res);
      //   this.count = res.count;
      //   console.log(res.count);
      //   this.data = [];
      //   this.data = res.data;
      //   console.log(this.data);
      // });
      //新后台
      var data = {
        companyId: Cookies.get("companyId"),
        limit: this.limit,
        page: this.currentPage,
        cid: Cookies.get("cid"),
        statusId: this.orderStatus || this.statusIdOptionValue1,
        find: this.find,
        beginTime: this.date1,
        finishTime: this.date2,
        orderType: this.CommodityType
      };
      if (!data.beginTime) {
        data.beginTime = "0001/1/1";
      }
      if (!data.finishTime) {
        data.finishTime = "9999/12/31";
      } else {
        data.finishTime = data.finishTime + " 23:59:59";
      }
      getAllOrders(data).then(res => {
        this.count = res.count;
        this.data = [];
        this.data = res.data;
      });
    },
    //出货详情
    shipmentDetail(tab) {
      this.$router.push({
        name: `shipment`,
        params: {
          itemNo: tab.ITEM_NO,
          orderId: tab.ORDER_NO,
          lineNo: tab.LINE_NO
        }
      });
      this.addTab("order/shipment");
    },
    //标签页切换
    handleClick(tab) {
      var tabName = tab.name;
      this.orderStatus = "";
      this.CommodityType = "";
      this.currentPage = 1;
      switch (tabName) {
        case "pending":
          this.options = this.options1;
          this.statusIdOptionValue1 = ["0", "5", "6", "21", "22"];
          this.isAll = false;
          break;
        case "LJPending":
          this.options = this.options2;
          this.statusIdOptionValue1 = ["20", "23"];
          this.isAll = false;
          break;
        case "YLPending":
          this.options = this.options3;
          this.statusIdOptionValue1 = ["1", "2", "4", "7", "12"];
          this.isAll = false;
          break;
        case "invalid":
          this.options = this.options4;
          this.statusIdOptionValue1 = ["3"];
          this.isAll = false;
          break;
        case "allOrder":
          this.options = this.options5;
          this.statusIdOptionValue1 = [];
          this.isAll = true;
          break;
      }
      this.refresh();
    },
    //搜索
    search() {
      this.currentPage = 1;
      this.refresh();
    },
    //页面条数
    handleSizeChange(val) {
      this.limit = val;
      this.currentPage = 1;
      this.refresh();
    },
    //翻页获取订单
    handleCurrentChange(val) {
      this.currentPage = val;
      this.refresh();
    },
    //删除订单
    deleteOrder(pushOrderNum) {
      var url = "/order/cancelOrder.do";
      var data = {
        cid: Cookies.get("cid"),
        orderNo: pushOrderNum
      };
      this.$confirm("确定作废订单？", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning"
      })
        .then(() => {
          //cancelOrder(url, data).then(res => {
          cancelOrderNew(data)
            .then(res => {
              if (pushOrderNum.slice(0, 1) == "X") {
                this.$confirm("作废成功，是否退回数据到购物车？", "提示", {
                  confirmButtonText: "是",
                  cancelButtonText: "否",
                  type: "warning"
                })
                  .then(() => {
                    var data3 = {
                      orderNo: pushOrderNum
                    };
                    copyCartItem(data3).then(res => {
                      this.$alert("复制成功，请到购物车中查看", "提示", {
                        confirmButtonText: "确定",
                        type: "success"
                      });
                    });
                  })
                  .catch(() => {});
              } else {
                this.$alert("删除成功", "提示", {
                  confirmButtonText: "确定",
                  type: "success"
                });
              }
              this.refresh();
              this.$root.$emit("refreshMoneyEvent"); //触发主页面刷新余额
            })
            .catch(res => {
              this.$alert("删除失败,请刷新订单", "提示", {
                confirmButtonText: "确定",
                type: "success"
              });
            });
          //预留接口-删除订单
        })
        .catch(() => {
          console.log("还没删");
        });
    },
    copyCart(orderNo) {
      this.$confirm("是否是否退回数据到购物车？", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning"
      })
        .then(() => {
          var data = {
            orderNo: orderNo
          };
          copyCartItem(data).then(res => {
            this.$alert("复制成功，请到购物车中查看", "提示", {
              confirmButtonText: "确定",
              type: "success"
            });
          });
        })
        .catch(() => {});
    },
    refreshPay(item) {
      var url = "/order/getResidemoney.do";
      var data = {
        cid: Cookies.get("cid"),
        companyId: Cookies.get("companyId")
      };
      //每次重新提交的时候判断一下余额
      queryCash(url, data).then(res => {
        this.Initial_balance = res.data;
        var url2 = "/order/putAgainOrder.do";
        var data2 = {
          cid: Cookies.get("cid"),
          orderNo: item.ORDER_NO
        };
        if (item.ALL_SPEND > this.Initial_balance && item.STATUS_ID == 5) {
          //欠款可提交的话可以跳过判断
          this.$alert(
            "余额不足，当前订单还需充值" +
              (item.ALL_SPEND - this.Initial_balance).toFixed(2) +
              "元才能提交",
            "提示",
            {
              confirmButtonText: "确定",
              type: "warning"
            }
          );
        } else {
          payAgain(url2, data2)
            .then(res => {
              var recordData = {
                ORDER_NO: item.ORDER_NO,
                OPERATION_PERSON: Cookies.get("cid"),
                OPERATION_NAME: "重新提交"
              };
              InsertOperationRecord(recordData); //插入操作记录
              this.$alert("提交成功", "提示", {
                confirmButtonText: "确定",
                type: "success"
              });
              this.refresh();
              this.$root.$emit("refreshMoneyEvent"); //触发主页面刷新余额
            })
            .catch(res => {
              this.$alert("操作失败，请稍后重试", "提示", {
                confirmButtonText: "确定",
                type: "warning"
              });
            });
        }
      });
    },
    ...mapMutations("navTabs", ["addTab"]),
    ...mapActions("navTabs", ["closeTab", "closeToTab"]),
    //隔行变色
    tableRowClassName({ row, rowIndex }) {
      if (row.STATUS_ID == "3") {
        return "fuck-row";
      }
      if (rowIndex % 2 == 0) {
        return "success-row";
      }
      return "";
    }
  },
  //生命周期
  created() {
    this.refresh();
  }
};
</script>

<style scoped>
.centerCard {
  margin: 0 auto;
  position: relative;
}
.zoomLeft {
  font-size: 15px;
}
p {
  font-size: 13px;
  margin: 2px;
}
.buttonDiv {
  float: right;
  margin-right: 15px;
  width: 8%;
  /* position: absolute;
  top: 50%;
  left: 90%;
  width: 8%; */
}
.zoomRight {
  font-weight: 400;
  font-size: 15px;
  margin-right: 10px;
  font-weight: bold;
}
</style>
<style>
.el-table .success-row {
  background: #f0f9eb;
}
.el-table .fuck-row {
  background: #f0f9eb;
  color: tomato;
  text-decoration: line-through;
}
#outDiv .el-card__header {
  padding: 12px 20px;
  background-color: rgb(245, 245, 245);
}
#outDiv .el-card__body {
  padding: 5px 10px;
}
#outDiv .el-card {
  margin-top: 5px;
  border: 1px solid rgb(140, 214, 198);
}
</style>