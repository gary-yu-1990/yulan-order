<template>
  <div id="stockQuery">
    <el-card shadow="hover">
      <div class="dormitory">
        <table class="header">
          <tr class="searchWord">
            <td class="cplx">产品类型</td>
            <td class="xuanze">
              <el-select v-model="productType" placeholder="全部">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </td>
            <td>产品型号</td>
            <td>
              <el-input
                size="10"
                v-model="search"
                placeholder="请输入内容"
              ></el-input>
            </td>

            <td>
              <el-button
                @keyup.enter.native="search()"
                class="NEWUI_BUTTON_1"
                type="primary"
                icon="el-icon-search"
                @click="_StockQuery"
                >查询</el-button
              >
            </td>
            <td>
              <el-button
                class="NEWUI_BUTTON_1"
                type="primary"
                icon="el-icon-back"
                @click="clear"
                >清空</el-button
              >
            </td>
          </tr>
        </table>

        <!--  遍历表格 -->
        <table>
          <td class="dormitoryData" style="width:40%;min-width:510px">
            <div class="BK_1">
              <el-table
                ref="dormitoryTable"
                :data="tables"
                tooltip-effect="dark"
                stripe
                class="table_2"
                max-height="500"
                @row-click="KC_CP_SC"
                border
              >
                <el-table-column
                  prop="ITEM_NO"
                  label="型号"
                  width="250"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="OLD_ITEM_NO"
                  label="版样型号"
                  width="250"
                  align="center"
                ></el-table-column>
              </el-table>
            </div>
            <!-- 分页 -->
            <div style="margin:0 25% 0 0;" class="block">
              <el-pagination
                :page-count="page_count"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="limit"
                layout="prev, pager, next, jumper"
                :total="count"
              ></el-pagination>
            </div>
          </td>
          <td>
            <div class="BK_2" style="width:100%">
              <el-card class="DETAIL_1">
                <div slot="header" class="clearfix">
                  <span class="CARD">库存信息：</span>
                </div>
                <div style="height:182px;">
                  <h1 v-show="stockInfo">
                    <TR>
                      <td colspan="6">
                        <el-table
                          width="100%"
                          :data="stockInfo_1"
                          max-height="200"
                        >
                          <el-table-column
                            prop="NOTE"
                            label="仓库名称"
                            align="center"
                            width="300"
                          ></el-table-column>
                          <el-table-column
                            prop="BATCH_NO"
                            label="批号"
                            align="center"
                            width="200"
                          ></el-table-column>
                          <el-table-column
                            prop="AREA"
                            label="区"
                            align="center"
                            width="60"
                          ></el-table-column>
                          <el-table-column
                            prop="SEAT"
                            label="位"
                            align="center"
                            width="50"
                          ></el-table-column>
                          <el-table-column
                            prop="BOX"
                            label="箱"
                            align="center"
                            width="50"
                          ></el-table-column>
                          <el-table-column
                            prop="QTY_SUM"
                            label="可分配量"
                            align="center"
                            width="100"
                          ></el-table-column>
                        </el-table>
                      </td>
                    </TR>
                  </h1>
                  <span v-show="empty"> </span>
                </div>
              </el-card>

              <el-card class="DETAIL_2" style="min-height:270px">
                <div slot="header" class="clearfix">
                  <span class="CARD">产品信息：</span>
                </div>
                <div style="max-height:270px;">
                  <h1 v-show="stockInfo">
                    <table
                      width="100%"
                      class="table_1"
                      border="1"
                      style="font-weight:normal;font-size:15px;align:center"
                      
                    >
                      <tr>
                        <td class="CPXXBJYS">型号</td>
                        <td style="width:70px">{{ dormitory.ITEM_NO }}</td>
                        <td class="CPXXBJYS">墙纸规格</td>
                        <td width="85px">
                          {{ dormitory.PRODUCT_PAPER_ID | transPaper }}
                        </td>
                        <td class="CPXXBJYS">毛重（kg）</td>
                        <td width="50px">{{ dormitory.GROSS }}</td>
                      </tr>
                      <tr>
                        <td class="CPXXBJYS">样版型号</td>
                        <td>{{ dormitory.OLD_ITEM_NO }}</td>
                        <td class="CPXXBJYS">墙纸基材</td>
                        <td width="50px">{{ dormitory.PROPERTY_TYPE_NAME }}</td>
                        <td class="CPXXBJYS">净重（kg）</td>
                        <td width="50px">{{ dormitory.NET_WEIGHT }}</td>
                      </tr>
                      <tr>
                        <td class="CPXXBJYS">产品类别</td>
                        <td width="50px">
                          {{ dormitory.ITEM_TYPE_1 }}
                        </td>
                        <td class="CPXXBJYS">墙纸功能</td>
                        <td width="50px">
                          {{ dormitory.MARK_TYPE | transMark }}
                        </td>
                        <td class="CPXXBJYS">拼花</td>
                        <td width="50px">{{ dormitory.DUIPIN_NOTE_1 }}</td>
                      </tr>
                      <tr>
                        <td class="CPXXBJYS">品牌</td>
                        <td width="50px">{{ dormitory.BRAND_NAME }}</td>
                        <td class="CPXXBJYS">长度（mm）</td>
                        <td width="50px">{{ dormitory.LENGTH }}</td>
                        <td class="CPXXBJYS">拼花尺寸</td>
                        <td width="50px">{{ dormitory.DUIPIN_SIZE }}</td>
                      </tr>
                      <tr>
                        <td class="CPXXBJYS">最新版本号</td>
                        <td width="50px">
                          {{ dormitory.PRODUCTVERSION_NAME }}
                        </td>
                        <td class="CPXXBJYS">宽度（mm）</td>
                        <td width="50px">{{ dormitory.WIDTH }}</td>
                        <td class="CPXXBJYS">图案</td>
                        <td width="50px">
                          {{ dormitory.PATTERN | transPattern }}
                        </td>
                      </tr>
                      <tr>
                        <td class="CPXXBJYS">自产代理</td>
                        <td width="50px">{{ dormitory.GET_ID | transId }}</td>
                        <td class="CPXXBJYS">规格</td>
                        <td width="50px">{{ dormitory.GRADE }}</td>
                        <td class="CPXXBJYS">颜色</td>
                        <td width="50px">
                          {{ dormitory.COLOUR | transColour }}
                        </td>
                      </tr>
                      <tr>
                        <td class="CPXXBJYS">计量单位</td>
                        <td width="50px">{{ dormitory.UNIT_NOTE_1 }}</td>
                        <td class="CPXXBJYS">纸箱规格</td>
                        <td width="50px">{{ dormitory.BOX_TYPE }}</td>
                        <td class="CPXXBJYS">风格</td>
                        <td width="50px">{{ dormitory.STYLE | transStyle }}</td>
                      </tr>
                      <tr>
                        <td class="CPXXBJYS">备注</td>
                        <td colspan="6"></td>
                      </tr>
                    </table>
                  </h1>
                  <span v-show="empty"> </span>
                </div>
              </el-card>
            </div>
          </td>
        </table>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import { mapState } from "vuex";
import {
  GetItemByProductType,
  GetStockByUser,
  GetStockByItemNo
} from "@/api/itemInfoASP";
import Cookies from "js-cookie";
const Head = "http://14.29.223.114:10250/upload";
const Quest = "http://14.29.223.114:10250/yulan-capital";
export default {
  name: "StockQuery",
  data() {
    return {
      //产品类型
      options: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "W",
          label: "墙纸"
        },
        {
          value: "G",
          label: "墙纸/布胶"
        },
        {
          value: "P",
          label: "墙纸粉"
        },
        {
          value: "T",
          label: "其他"
        },
        {
          value: "C",
          label: "代理墙布"
        },
        {
          value: "V",
          label: "版本"
        },
        {
          value: "BY",
          label: "布艺"
        },
        {
          value: "H",
          label: "代理墙纸"
        },
        {
          value: "DY",
          label: "打样"
        },
        {
          value: "F",
          label: "宽幅墙布"
        },
        {
          value: "J",
          label: "基膜"
        },
        {
          value: "A",
          label: "宽幅墙纸"
        },
        {
          value: "E",
          label: "无纺墙布"
        },
        {
          value: "AV",
          label: "宽幅无纺墙纸"
        },
        {
          value: "K",
          label: "广告产品"
        }
      ],
      page_count: 3,
      stockInfo_1: [], //库存信息
      stockIds: [],
      productType: "", //产品类型查询初始值
      dormitory: [], //查询到的数据
      search: "", //搜索产品型号
      tables: [], //初始表格为空
      stockInfo: false, //库存信息显示
      empty: true, //库存信息为空
      limit: 15,
      count: 0,
      currentPage: 1,
      displayStsates: "none"
    };
  },
  //生命周期
  created() {
    this._GetStockByUser();
  },
  filters: {
    transType(value) {
      switch (value) {
        case "0":
          return "全部";
          break;
        case "W":
          return "墙纸";
          break;
        case "G":
          return "墙纸/布胶";
        case "P":
          return "墙纸粉";
        case "T":
          return "其他";
        case "C":
          return "代理墙布";
        case "V":
          return "版本";
        case "BY":
          return "布艺";
        case "H":
          return "代理墙纸";
        case "DY":
          return "打样";
        case "F":
          return "宽幅墙布";
        case "J":
          return "基膜";
        case "A":
          return "宽幅墙纸";
        case "E":
          return "无纺墙布";
        case "AV":
          return "宽幅无纺墙纸";
        case "K":
          return "广告商品";
          break;
      }
    },
    transPattern(value) {
      switch (value) {
        case "01":
          return "大马士革";
        case "02":
          return "花草";
        case "03":
          return "条纹几何";
        case "04":
          return "抽象";
        case "05":
          return "迪士尼";
        case "06":
          return "另类";
        case "07":
          return "欧式卷草纹";
          break;
      }
    },
    transColour(value) {
      switch (value) {
        case "01":
          return "灰白";
        case "02":
          return "青色";
        case "03":
          return "棕色";
        case "04":
          return "金色";
        case "05":
          return "银色";
        case "06":
          return "红色";
        case "07":
          return "粉色";
        case "08":
          return "黄色";
        case "09":
          return "绿色";
        case "10":
          return "蓝色";
        case "11":
          return "紫色";
        case "12":
          return "橙色";
          break;
      }
    },
    transStyle(value) {
      switch (value) {
        case "01":
          return "欧式风格";
        case "02":
          return "田园风格";
        case "03":
          return "迪士尼";
        case "04":
          return "现代简约";
        case "05":
          return "另类风格";
        case "06":
          return "新东方风格";
        case "07":
          return "新古典风格";
        case "08":
          return "青少年风格";
        case "09":
          return "美式风格";
          break;
      }
    },
    transPaper(value) {
      switch (value) {
        case "F":
          return "280CM";
        case "E":
          return "130CM";
        case "J":
          return "70CM";
        case "B":
          return "花边";
        case "P":
          return "墙身";
        case "D":
          return "138CM";
        case "F":
          return "106CM";
        case "C":
          return "93CM";
          break;
      }
    },
    transMark(value) {
      switch (value) {
        case "M":
          return "防霉";
        case "S":
          return "除甲醛";
        case "Z":
          return "阻燃+防霉";
        case "W":
          return "双重防霉+除甲醛";
        case "Y":
          return "吸放湿+防霉";
        case "T":
          return "除臭+防霉";
        case "Q":
          return "负离子+防霉";
        case "R":
          return "阻燃";
        case "K":
          return "抗菌";
        case "N":
          return "普通";
          break;
      }
    },
    transId(value) {
      switch (value) {
        case "A":
          return "自产产品";
        case "B":
          return "采购产品";
        case "C":
          return "代购产品";
        case "D":
          return "代理产品";
        case "E":
          return "委外加工产品";
        case "F":
          return "委外生产产品";
          break;
      }
    }
  },
  methods: {
    //用户权限
    _GetStockByUser() {
      this.stockIds = [];
      var userInfo = JSON.parse(Cookies.get("userInfo"));
      var data = {
        userid: userInfo.userId
      };
      GetStockByUser(data).then(res => {
        if(res.data.length != 0){
        for (var i = 0; i < res.data.length; i++) {
          this.stockIds.push(res.data[i].STOCK_NO);
        }
        }else{
            this.$alert("没有仓库权限，请联系管理员配置", "提示", {
            confirmButtonText: "确定",
            type: "success"
          });
        }
      });
    },
    //查询
    _StockQuery(){
      this.currentPage = 1;
      this.StockQuery();
    },
    StockQuery() {
      this.tables = [];
      this.dormitory = [];
      this.stockInfo = false; //库存信息显示
      var data = {
        productType: this.productType, //产品类型
        //itemNo:this.search.toUpperCase(),//产品型号
        limit: this.limit, //限制数
        page: this.currentPage, //页数
        stockIds: this.stockIds, //仓库号
        find: this.search
      };
    GetItemByProductType(data)
          .then(res => {
            this.count = res.count;
            if(this.count == 1){
              this.KC_CP_SC(res.data[0])
            }
            this.tables = res.data;
            // this.tables.itemNo = res.data.itemNo;
            // this.tables.OLD_ITEM_NO = res.data.OLD_ITEM_NO;
          })
          .catch(res => {
            console.log(res);
          });
 
    },
    //清空
    clear() {
      this.value = "";
      this.search = "";
      this.tables = [];
      this.dormitory = [];
      this.stockInfo_1 = [];
      this.stockInfo = false; //库存信息显示
      this.empty = true; //库存信息为空
      this.count = 0;
      this.currentPage = 1;
    },
    //点击行的事件
    KC_CP_SC(val) {
      this.stockInfo = true; //库存信息显示
      this.empty = false; //库存信息为空
      this.stockInfo_1 = [];
      var data_1 = {
        itemNo: val.ITEM_NO,
        stock_no: this.stockIds
      };
      //按行查询库存
      GetStockByItemNo(data_1, { loading: false })
        .then(res => {
          this.stockInfo_1 = res.data;
        })
        .catch(res => {
          console.log(res);
        });

      //获取数据
      let data = {
        ITEM_NO: val.ITEM_NO, //型号
        OLD_ITEM_NO: val.OLD_ITEM_NO, //样本型号
        PRODUCTVERSION_NAME: val.PRODUCTVERSION_NAME, //版本号
        ITEM_TYPE_1: val.ITEM_TYPE_1, //产品类别
        BOX_TYPE: val.BOX_TYPE, //纸箱规格
        GRADE: val.GRADE, //规格
        DUIPIN_SIZE: val.DUIPIN_SIZE, //拼花尺寸
        LENGTH: val.LENGTH, //长度
        WIDTH: val.WIDTH, //宽度
        GROSS: val.GROSS, //毛重
        BRAND_NAME: val.BRAND_NAME, //品牌
        PRODUCT_PAPER_ID: val.PRODUCT_PAPER_ID, //墙纸规格
        PROPERTY_TYPE_NAME: val.PROPERTY_TYPE_NAME, //墙纸基材
        NET_WEIGHT: val.NET_WEIGHT, //净重
        MARK_TYPE: val.MARK_TYPE, //墙纸功能
        DUIPIN_NOTE_1: val.DUIPIN_NOTE_1, //拼花类型
        PATTERN: val.PATTERN, //图案
        COLOUR: val.COLOUR, //颜色
        UNIT: val.UNIT, //单位
        STYLE: val.STYLE, //风格
        UNIT_NOTE_1: val.UNIT_NOTE_1, //计量单位
        GET_ID: val.GET_ID //代理
      };
      this.dormitory = data; //数据集合
    },
    //翻页获取订单
    handleCurrentChange(val) {
      this.currentPage = val;
      this.StockQuery();
    }
  }
};
</script>

<style scoped>
.table_1 {
  border-collapse: collapse;
  border: 1px solid black;
}
.CPXXBJYS {
  background: #d5ecb8;
  width: 55px;
}
.BK_1 {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  padding: 1px 5px 5px;
}
.BK_2 {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  padding: 2px 1px;
}

/* .STOCKSET{
  margin-left: 160px;
} */
/* .dd {
  margin-top: 3px;
} */

.clearfix {
  height: 13px;
}
.NEWUI_BUTTON_1 {
  width: 90px;
  background: #8bc34a;
  margin-left: 10px;
  color: rgb(255, 255, 255);
}

.searchWord {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
}

.CONDITION_DIV {
  height: 40px;
  margin-top: 10px;
  margin-left: 20px;
}
#productType {
  height: 30px;
  width: 150px;
  margin-right: 20px;
}
#ItemKey {
  width: 150px;
  height: 23px;
  margin-right: 30px;
}

td {
  text-align: center;
}
</style>