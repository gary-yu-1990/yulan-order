<template>
  <div>
    <el-card class="centerCard">
      <el-dialog
        :show-close="true"
        :visible.sync="detailVisible"
        disabled="true"
        width="70%"
        top="8vh"
      >
        <div style="margin-bottom:10px">
          <h1>广东玉兰集团股份有限公司采购单（{{ pur_headForm.PUR_NO }}）</h1>
          <span style="float:right">{{
            pur_headForm.DATE_PUR | datatrans
          }}</span>
        </div>
        <div>
          <h1>收货人：</h1>
        </div>
        <div style="margin-bottom:10px">
          <h1>备注信息：</h1>
        </div>
        <hr />
        <div style="width:100%">
          <el-table :data="gridData" style="width:100%" max-height="400px">
            <el-table-column
              property="ITEM_NO"
              label="物料号"
              width="90"
            ></el-table-column>
            <el-table-column
              property="MGUIGE"
              label="物料型号"
              width="90"
            ></el-table-column>
            <el-table-column
              property="MNAME"
              label="名称"
              width="50"
            ></el-table-column>
            <el-table-column
              property="GRADE"
              label="规格"
              width="50"
            ></el-table-column>
            <el-table-column
              property="QTY_PUR"
              label="数量"
              width="60"
            ></el-table-column>
            <el-table-column label="含税单价" width="80">
              <template slot-scope="scope">
                <span>{{ scope.row.PRICE_TAXIN | numFilter }}</span>
              </template></el-table-column
            >
            <el-table-column
              property="UNIT1"
              label="单位"
              width="60"
            ></el-table-column>
            <el-table-column
              property="TOTAL_MONEY"
              label="金额"
              width="100"
            ></el-table-column>
            <el-table-column
              property="NOTE"
              label="备注"
              width="170"
            ></el-table-column>
            <el-table-column property="DATE_REQ" label="约定日期" width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.DATE_REQ | datatrans }}</span>
              </template>
            </el-table-column>
            
             <el-table-column
                      
                      label="送货日期1"
                      width="120"
                    >
                       <template slot-scope="scope">
                      <el-date-picker
                       v-model="scope.row.DATE_DELIVER"
            align="right"
            type="date"
             format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            placeholder="选择日期"
          >
          </el-date-picker>
          </template>
                    </el-table-column>
            <el-table-column
              label="说明"
               width="130"
            >
            <template slot-scope="scope">
                        <el-input
                            type="textarea"
                            v-model="scope.row.SUPPLY_NOTES"
                            clearable>
                        </el-input>
                       
                    </template>
            </el-table-column>
          </el-table>
          <hr />
          <div style="margin-top:10px">
            <div style="margin-bottom:10px;width:100%" class="data_1">
              <el-card class="DETAIL_2" style="min-height:100px">
                <div slot="header" class="clearfix">
                  <span class="CARD">送货日期：</span>
                </div>
                <div>
                  <div>
                    <el-button style="width:15%" class="button_clolur" @click="Unitdeliver"
                      >统一设置送货期</el-button
                    >
                    <el-date-picker
                      type="date"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      placeholder="选择时间"
                      v-model="date_deliver"
                      style="width:15%"
                    ></el-date-picker>
                  </div>
                  <div>
                    <el-button
                      style="width:16%;margin-top:10px"
                      class="button_clolur"
                      @click="AllAccordPromise"
                      >全部设为约定日期</el-button
                    >
                  </div>
                </div>
              </el-card>
            </div>
            <div
              style="margin-bottom:10px;width:100%;margin-top:10px"
              class="data_1"
            >
              <el-card class="DETAIL_2" style="min-height:100px">
                <div slot="header" class="clearfix">
                  <span class="CARD">说明</span>
                </div>
                <div>
                 
                  <el-input
                        v-model="supply_check_notes"
                    placeholder="说明:"
                    style="width:30%;height:20px"
                    type="textarea"
                  clearable></el-input>
           
                </div>
                <div style="margin-top:40px">
                  <el-button
                    @click="SaveNotes()"
                
                    style="width:10%;"
                    class="button_clolur"
                    >保存说明</el-button
                  >
                </div>
              </el-card>
            </div>
          </div>
          <div>
            <el-button
              @click="SubmitVue"
              style="width:10%;margin-left:35%;margin-top:10px"
              type="warning"
              size="small"
              >确认</el-button>
               <el-button
              @click="returnMain"
              style="width:10%;margin-left:5%;margin-top:10px"
              type="primary"
              size="small"
              >返回</el-button>
              
          </div>
        </div>
        <keep-alive> </keep-alive>
      </el-dialog>
      <el-dialog
        title=""
        :visible.sync="detailVisible1"
        :show-close="true"
        width="100%"
        top="8vh"
      >
        <div style="width:100% ;margin:0 auto;">
          <table style=" width:100% ;margin:0 auto; ">
            <tbody>
             <tr><td colspan="2" style="font-family:黑体;font-size:1.6em;font-weight:bold;" align="center">
			采购单</td>
	</tr>
              <tr>
                <td style="border-bottom:solid 3px gray;text-align:left">
                  订单状态
                  <span style="margin-left:font-weight:bold;">{{
                    pur_headForm.STATUS | pur_headStatus
                  }}</span>
                </td>
                <td style="border-bottom:solid 3px gray;" align="right">
                  <span style="margin-left:font-weight:bold;">{{
                    now.getFullYear() + "-" + Month + "-" + now.getDate()
                  }}</span>
                </td>
              </tr>
              <tr>
                <td
                  style="border-right:solid 1px gray;border-bottom:solid 3px gray;"
                  width="50%"
                  valign="top"
                >
                  <table class="PUR_HEAD_COLUMNS" style="text-align:right">
                    <tbody>
                      <tr>
                        <th>流水号:</th>
                        <td style="text-align:left">
                          {{ pur_headForm.PUR_NO }}
                        </td>
                      </tr>
                      <tr>
                        <th>采购员:</th>
                        <td style="text-align:left">
                          {{ pur_headForm.BUYER }}
                        </td>
                      </tr>
                      <tr>
                        <th>建立日期:</th>
                        <td style="text-align:left">
                          {{ pur_headForm.DATE_PUR }}
                        </td>
                      </tr>
                      <tr>
                        <th>采购商:</th>
                        <td style="text-align:left">
                          {{ pur_headForm.PUR_MYFACT }}
                        </td>
                      </tr>
                      <tr>
                        <th>采购商地址:</th>
                        <td style="text-align:left">
                          {{ pur_headForm.C_ADDRESS }}
                        </td>
                      </tr>
                      <tr>
                        <th>开户银行:</th>
                        <td style="text-align:left">
                          {{ pur_headForm.C_BANK }}
                        </td>
                      </tr>
                      <tr>
                        <th>邮政编码:</th>
                        <td style="text-align:left">
                          {{ pur_headForm.C_POST }}
                        </td>
                      </tr>
                      <tr>
                        <th>银行账号:</th>
                        <td style="text-align:left">
                          {{ pur_headForm.C_BANKNO }}
                        </td>
                      </tr>
                      <tr>
                        <th>税务登记号:</th>
                        <td style="text-align:left">
                          {{ pur_headForm.C_TAX }}
                        </td>
                      </tr>
                      <tr>
                        <th>联系电话:</th>
                        <td style="text-align:left">
                          {{ pur_headForm.OWN_TEL }}
                        </td>
                      </tr>
                      <tr>
                        <th>付款方式:</th>
                        <td style="text-align:left">
                          {{ pur_headForm.PAY_TYPE }}
                        </td>
                      </tr>
                      <tr>
                        <th>付款期限:</th>
                        <td style="text-align:left">
                          {{ pur_headForm.PAY_DATELIMIT }}
                        </td>
                      </tr>
                      <tr>
                        <th>备注:</th>
                        <td style="text-align:left">
                          {{ pur_headForm.NOTES }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>

                <td
                  style="border-left:solid 1px gray;border-bottom:solid 3px gray;"
                  width="50%"
                >
                  <table class="PUR_HEAD_COLUMNS" style="text-align:right">
                    <tbody>
                      <tr>
                        <th>采购部门:</th>
                        <td colsan="3" style="text-align:left">
                          {{ pur_headForm.DEPT_NO }}
                        </td>
                      </tr>
                      <tr>
                        <th>使用部门:</th>
                        <td style="text-align:left">
                          {{ pur_headForm.DEPT_NO2 }}
                        </td>
                      </tr>
                      <tr>
                        <th>合同号:</th>
                        <td colsan="3" style="text-align:left"></td>
                      </tr>
                      <tr>
                        <th>供应商:</th>
                        <td colsan="3" style="text-align:left">
                          {{ pur_headForm.SUPPLY_CODE }}
                        </td>
                      </tr>
                      <tr>
                        <th>供应商地址:</th>
                        <td colsan="3" style="text-align:left">
                          {{ pur_headForm.G_ADDRESS }}
                        </td>
                      </tr>
                      <tr>
                        <th>联系人:</th>
                        <td colsan="3" style="text-align:left">
                          {{ pur_headForm.G_LINK }}
                        </td>
                      </tr>
                      <tr>
                        <th>传真号码:</th>
                        <td colsan="3" style="text-align:left">
                          {{ pur_headForm.G_TYPE }}
                        </td>
                      </tr>
                      <tr>
                        <th>电话:</th>
                        <td colsan="3" style="text-align:left">
                          {{ pur_headForm.G_PHONE }}
                        </td>
                      </tr>
                      <tr>
                        <th>手机:</th>
                        <td colsan="3" style="text-align:left">
                          {{ pur_headForm.G_PHONE }}
                        </td>
                      </tr>
                      <tr>
                        <th>B2B订单号:</th>
                        <td colsan="3" style="text-align:left">
                          {{ pur_headForm.ORDER_NO }}
                        </td>
                      </tr>
                      <tr>
                        <th>ERP订单号:</th>
                        <td colsan="3" style="text-align:left">
                          {{ pur_headForm.OA_NO }}
                        </td>
                      </tr>

                      <tr>
                        <th>接单人:</th>
                        <td colsan="3" style="text-align:left">
                          {{ pur_headForm.ORDER_MAN }}
                        </td>
                      </tr>
                      <tr>
                        <th>收货人:</th>
                        <td colsan="3" style="text-align:left"></td>
                      </tr>
                      <tr>
                        <th>客户名称:</th>
                        <td colsan="3" style="text-align:left">
                          {{ pur_headForm.CUSTOMER_NAME }}
                        </td>
                      </tr>
                      <tr>
                        <th>联系人:</th>
                        <td colsan="3" style="text-align:left">
                          {{ pur_headForm.LINKMAN }}
                        </td>
                      </tr>
                      <tr>
                        <th>联系电话:</th>
                        <td colsan="4" style="text-align:left">
                          {{ pur_headForm.LINKTEL }}
                        </td>
                      </tr>
                      <tr>
                        <th>发货地址:</th>
                        <td colsan="4" style="text-align:left">
                          {{ pur_headForm.POST_ADDRESS }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <el-table
                    :data="gridData"
                    id="PURCHASEDETAILLISTTABLE"
                    class="GCGRID"
                    object_class="_Object:GridTable"
                    object_hashcode="6"
                    cellpadding="0"
                    style="width:100%"
                  >
                    <el-table-column
                      property="ITEM_NO"
                      label="物料号"
                      width="150"
                    ></el-table-column>
                    <el-table-column
                      property="MGUIGE"
                      label="物料型号"
                      width="150"
                    ></el-table-column>
                    <el-table-column
                      property="MNAME"
                      label="名称"
                      width="150"
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
                    <el-table-column label="含税单价" width="80">
                      <template slot-scope="scope">
                        <span>{{ scope.row.PRICE_TAXIN | numFilter }}</span>
                      </template></el-table-column
                    >
                    <el-table-column
                      property="UNIT1"
                      label="单位"
                      width="60"
                    ></el-table-column>
                    <el-table-column
                      property="TOTAL_MONEY"
                      label="金额"
                      width="100"
                    ></el-table-column>
                    <el-table-column
                      property="NOTE"
                      label="备注"
                      width="200"
                    ></el-table-column>
                    <el-table-column
                      property="DATE_REQ"
                      label="约定日期"
                      width="100"
                    >
                      <template slot-scope="scope">
                        <span>{{ scope.row.DATE_REQ | datatrans }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      property="DATE_DELIVER"
                      label="送货日期"
                      width="100"
                    >
                      <template slot-scope="scope">
                        <span>{{ scope.row.DATE_DELIVER | datatrans }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      property="SUPPLY_CHECK_NOTES"
                      label="说明"
                    ></el-table-column>
                    ></el-table
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </el-dialog>

      <div id="supplyCon">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="待确认" name="first" align="left">
            <div align="right">
            <template>
  <el-select v-model="selvalue" @change="SelectClick" placeholder="全部" >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      >
    </el-option>
  </el-select>
</template>
</div>

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
                label="备注"
                align="left"
              ></el-table-column>
              <el-table-column label="" width="120" align="center">
                <template slot-scope="scope">
                  <el-button
                    @click="openDialog(scope.row.PUR_NO)"
                    type="primary"
                    size="small"
                    >前往确认</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>

          <el-tab-pane label="已确认" name="second" align="left">
                      <div align="right">
                          采购单号：（精确）
    <el-input
    prefix-icon="el-icon-search"
   style="width:10%; min-width:200px;"
   @blur="SelectClick"
    v-model="po">
  </el-input>
                        <el-date-picker
             v-model="date1"
              @change="SelectClick"
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
            @change="SelectClick"
            align="right"
            type="date"
             format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          ></el-date-picker>
            <template>
  <el-select v-model="selvalue" @change="SelectClick" placeholder="全部" >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      >
    </el-option>
  </el-select>
</template>
</div>
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
                label="备注"
                align="center"
              ></el-table-column>
              <el-table-column label="" width="120" align="center">
                <template slot-scope="scope">
                  <el-button
                    @click="openDialog1(scope.row.PUR_NO)"
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
import { GetPoDetail, GetRelativePo,SaveHeadNotes,Submit } from "@/api/supplierASP";
import Cookies from "js-cookie";
// const Head = "http://14.29.223.114:10250/upload";
// const Quest = "http://14.29.223.114:10250/yulan-capital";
const Head = "http://192.168.123.43:8080/upload";
const Quest = "http://192.168.123.43:8080/yulan-capital";
export default {
  name: "SupplyPort",
  data() {
    return {
      is_check:0,
      po:"",
      date1: "",
      date2: "",
      now: new Date(),
      Month: new Date().getMonth() + 1,
      input: "",
      supply_check_notes:"",
      selvalue:"all",
      date_deliver: "",
      current_id: Cookies.get("cid"),
      // companyId: Cookies.get("companyId"),
      gridData: [],
      detailVisible: false,
      detailVisible1: false,
      po_type: "all",
      limit: 10,
      count: 0,
      currentPage: 1,
      activeName: "first",
      count: 0,
      check_flag:0,
      pur_headData: [],
      pur_headForm: {},
      options: [ 
        {
          value: 'all',
          label: '所有状态'
        }, {
          value: 'cancel',
          label: '取消'
        }, 
        {
          value: 'efficient',
          label: '生效'
        },{
          value: 'enforce',
          label: '执行'
        }, {
          value: 'fulfill',
          label: '完成'
        }],
      
    };
  },
  methods: {
    //获取当月第一天零时
     getCurrentMonthFirst(){
      var date=new Date();
      date.setDate(1);
      date.setHours(0,0,0);
      return date;
},
    //打开确认页面
    openDialog(PUR_NO) {
      this.is_check=0;
      this.detailVisible = true;
      this.autoSearchDetail(PUR_NO);
      //查看详情页
    },
    openDialog1(PUR_NO) {
      this.is_check=0;
      this.detailVisible1 = true;
      this.autoSearchDetail(PUR_NO);
      //将表头内容填充到明细
    },
    //统一送货日期
    Unitdeliver(){
      if(this.date_deliver==""){
         this.$alert('请选择一个统一的时间！', '提示', {
                                confirmButtonText: '好的',
                                type: 'warning'
                            });
                            return;
      }
       for (let i=0;i<this.gridData.length;i++){
      this.gridData[i].DATE_DELIVER=this.date_deliver
      }
    },
     //全部按约定日期
    AllAccordPromise(){
       for (let i=0;i<this.gridData.length;i++){
      this.gridData[i].DATE_DELIVER=this.gridData[i].DATE_REQ
      }
    },
    //选择或输入条件后搜索
       SelectClick() {
      this.currentPage = 1;
      this.po_type=this.selvalue;
      this.autoSearch();
    },
    //标签页切换
    handleClick(tab) {
      var tabName = tab.name;
      this.currentPage = 1;
      switch (tabName) {
        case "first":
          this.check_flag = 0;
          this.selvalue="all";
          this.po_type="all";
          this.po="";
          this.date1 = "0001/1/1";
          this.date2 = "9999/1/1";
          break;
        case "second":
          this.check_flag = 1;
           this.selvalue="all";
           this.po_type="all";
             this.po="";
             this.date1=this.getCurrentMonthFirst();
    this.date2=new Date();
          break;
      }
         this.autoSearch();
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
    SaveNotes() {
      var data = {
        PUR_NO: this.pur_headForm.PUR_NO,
        NOTE:this.supply_check_notes,
      };
      SaveHeadNotes(data).then(res => {
        // this.count = res.count;
        // this.pur_headData = res.data;
      });
    },

    UpdateFlag() {
      var data = {
        PUR_NO: this > pur_headForm.PUR_NO
      };
      UpdateCheckFlag(data).then(res => {
        // this.count = res.count;
        // this.pur_headData = res.data;
      });
    },
    returnMain(){
      if (this.is_check==1){
      this.autoSearch();
      this.is_check=0;
      }
      this.detailVisible = false;
    },
 //确认之前要检查是否填好必要的信息
     SubmitVue() {
       this.pur_headForm.SUPPLY_CHECK_NOTES=this.supply_check_notes;
        for (let i=0;i<this.gridData.length;i++){
      if(this.gridData[i].DATE_DELIVER=="9999/12/31 00:00:00"||this.gridData[i].DATE_DELIVER=="") {
           this.$alert('送货日期不能为空！', '提示', {
            confirmButtonText: '好的',
            type: 'warning'
             });
              return;
      }
      }
      var data = {

        pur_headForm:this.pur_headForm,
        gridData:this.gridData,
      };
     
      Submit(data).then(res => {
          if (res.code == 0) {
          this.$alert("确认成功", "提示", {
            confirmButtonText: "确定",
            type: "success"
          });
          this.autoSearch();
          this.is_check=1;
          this.detailVisible = false;
        } else {
          this.$alert("确认失败，请稍后重试", "提示", {
            confirmButtonText: "确定",
            type: "warning"
          });
        }
        
      });
    },
    autoSearch() {
      var data = {
        
        limit: this.limit,
        page: this.currentPage,
        current_id: Cookies.get("cid"),
        customer:"",
        po_type: this.po_type, //  status状态   cancel    efficient 生效（新采购单）   enforce 已执行（已确认）   fulfill 已完成
        check_flag:this.check_flag,
        beginTime: this.date1,
        finishTime: this.date2,
        po:this.po,
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
     for (let i=0;i<this.gridData.length;i++){
      if(this.gridData[i].DATE_DELIVER=="9999/12/31 00:00:00") {
        this.gridData[i].DATE_DELIVER=""
      }
      }
        
        this.pur_headForm.PUR_NO = this.gridData[0].PUR_NO;
        this.pur_headForm.LINKMAN = this.gridData[0].LINKMAN;
        this.pur_headForm.DATE_PUR = this.gridData[0].DATE_PUR;
        this.pur_headForm.DATE_DELIVER = this.gridData[0].DATE_DELIVER;
        this.pur_headForm.NOTES = this.gridData[0].NOTES;
        this.pur_headForm.SUPPLY_CHECK_NOTES = this.gridData[0].SUPPLY_CHECK_NOTES;
        this.pur_headForm.DEPT_NO = this.gridData[0].DEPT_NO;
        this.pur_headForm.DEPT_NO2 = this.gridData[0].DEPT_NO2;
        this.pur_headForm.SUPPLY_CODE = this.gridData[0].SUPPLY_CODE;
        this.pur_headForm.G_ADDRESS = this.gridData[0].G_ADDRESS;
        this.pur_headForm.G_LINK = this.gridData[0].G_LINK;
        this.pur_headForm.G_TYPE = this.gridData[0].NOTES;
        this.pur_headForm.G_PHONE = this.gridData[0].G_PHONE;
        this.pur_headForm.ORDER_NO = this.gridData[0].ORDER_NO;
        this.pur_headForm.OA_NO = this.gridData[0].OA_NO;
        this.pur_headForm.ORDER_MAN = this.gridData[0].ORDER_MAN;
        this.pur_headForm.CUSTOMER_NAME = this.gridData[0].CUSTOMER_NAME;
        this.pur_headForm.PUR_MYFACT = this.gridData[0].PUR_MYFACT;
        this.pur_headForm.BUYER = this.gridData[0].BUYER;
        this.pur_headForm.PAY_TYPE = this.gridData[0].PAY_TYPE;
        this.pur_headForm.PAY_DATELIMIT = this.gridData[0].PAY_DATELIMIT;
        this.pur_headForm.C_BANK = this.gridData[0].C_BANK;
        this.pur_headForm.C_ADDRESS = this.gridData[0].C_ADDRESS;
        this.pur_headForm.C_POST = this.gridData[0].C_POST;
        this.pur_headForm.C_BANKNO = this.gridData[0].C_BANKNO;
        this.pur_headForm.C_TAX = this.gridData[0].C_TAX;
        this.pur_headForm.OWN_TEL = this.gridData[0].OWN_TEL;
        this.pur_headForm.LINKTEL = this.gridData[0].LINKTEL;
        this.pur_headForm.POST_ADDRESS = this.gridData[0].POST_ADDRESS;
        this.pur_headForm.STATUS = this.gridData[0].STATUS;
        this.input=this.pur_headForm.SUPPLY_CHECK_NOTES;
        this.supply_check_notes=this.pur_headForm.SUPPLY_CHECK_NOTES;
        this.date_deliver="";
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
    numFilter(value) {
      // 截取当前数据到小数点后两位
      let realVal = parseFloat(value).toFixed(2);
      return realVal;
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
    this.po_type = "all";
     this.date1 = "0001/1/1";
          this.date2 = "9999/1/1";
    this.autoSearch();
  }
};
</script>

<style scoped>
.button_clolur {
  background: #8bc34a;
  color: rgb(255, 255, 255);
}
.data_1 {
  font-size: 1.5em;
}
td {
  text-align: center;
}
</style>