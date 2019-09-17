<template>
  <div>

    <el-card shadow="hover">
      <div slot="header">
        <span class="fstrong f16">投诉反馈</span>
      </div>
      <div id="tbar" class="tbarStyle">
        <el-date-picker
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder="查询开始日期"
          v-model="beginTime"
          style="width:14%;"
        ></el-date-picker> -- 
        <el-date-picker
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder="查询截止日期"
          v-model="finishTime"
          style="width:14%;"
        ></el-date-picker>
        <el-select v-model="status" style="margin-left: 10px" placeholder="全部状态">
          <el-option
            v-for="item in options"
            :key="item.label"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button size="medium" type="success" style="margin-left: 10px"  @click="searchBankList()">查询</el-button>
        <el-button style="float:right" size="medium" @click="newOne" type="primary">新增投诉单</el-button>
      </div>
      <el-table border :data="bankData" style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column width="130" prop="id" label="投诉单号" align="center"></el-table-column>
        <el-table-column label="投诉时间" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.createTs | datatrans}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="yulanBank" width="160" label="投诉类型" align="center"></el-table-column>
        <el-table-column prop="payerName" label="投诉人" align="center"></el-table-column>
        <el-table-column prop="payerAccount" width="160" label="投诉内容" align="center"></el-table-column>
        <el-table-column prop="payAmount" label="处理人" width="100" align="center"></el-table-column>
        <el-table-column label="处理时间" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.payDate | datatrans}}</span>
          </template>
        </el-table-column>
        <el-table-column width="80" label="状态" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.state | transStatus}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" width="200" label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.state =='SUBMITED'"
              @click="checkDetail(scope.row)"
              type="warning"
              icon="el-icon-search"
              circle
            ></el-button>
             <el-button
              v-if="scope.row.state =='SENDBACK'||scope.row.state=='PROCESED'"
              @click="editIt(scope.row)"
              type="primary"
              icon="el-icon-edit"
              circle
            ></el-button>
            <el-button
              v-if="scope.row.state =='CANCELED'"
              @click="deleteDetail(scope.row)"
              type="danger"
              icon="el-icon-delete"
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin:0 25%;" class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="limit"
          layout="prev, pager, next, jumper"
          :total="count"
        ></el-pagination>
      </div>
    </el-card>

    <el-dialog title="投诉登记表" :visible.sync="bankDetail" :close-on-click-modal="false" width="75%">
      <!-- 查看区 -->
      <div v-show="EDITorCHECK" class="table-c">
        
        <h2 style="text-align:center;">投诉登记表-[{{tableData.state | transStatus}}]</h2>
        <h3>建立时间：{{tableData.createTs | datatrans}}&nbsp;&nbsp;&nbsp;&nbsp;提交时间：{{tableData.submitTs | datatrans}}</h3>
        <h3 v-show="isBack">退回时间：{{tableData.sendbackTs | datatrans}}&nbsp;&nbsp;&nbsp;&nbsp;退回原因：{{tableData.sendbackReason}}</h3>
        <h3 v-show="isDelete">作废时间：{{tableData.cancelTs | datatrans}}</h3>
        <h3 v-show="isChuli">处理人：{{tableData.erpProcessOp}}&nbsp;&nbsp;&nbsp;&nbsp;处理时间：{{tableData.erpProcessTs | datatrans}}</h3>

        <table width="100%" border="0px" cellspacing="0px" cellpadding="0">
          <tr>
            <td class="grayTD">投诉单号</td>
            <td>{{tableData.id}}</td>
            <td class="grayTD">客户代码</td>
            <td>{{tableData.cid}}</td>
            <td class="grayTD">客户名称</td>
            <td>{{tableData.cname}}</td>
          </tr>
          <tr>
            <td class="grayTD">联系方式</td>
            <td>{{sumbit.cname}}</td>
            <td  colspan="4"></td>
          </tr>
          <tr>
            <td class="tableCol" style="font-size:20px;" colspan="6">投诉信息</td>
          </tr>
          <tr>
            <td class="grayTD" colspan="1">投诉类型</td>
            <td colspan="2">{{tableData.yulanBank}}</td>
            <td class="grayTD" colspan="1" rowspan="6" border="0px" >附件</td>
            <td colspan="2" rowspan="6">
              <el-tooltip class="item" effect="dark" content="点击放大图片" placement="top">
                <img @click="BIG" class="ISimg" :src="tableData.imgUrl" />
              </el-tooltip>
            </td>
          </tr>
          <tr>
            <td class="grayTD" colspan="1">投诉内容</td>
            <td colspan="2">{{tableData.payerName}}</td>
          </tr>
          <tr>
            <td class="grayTD" colspan="1" border="0px">投诉要求</td>
            <td colspan="2">{{tableData.payerAccount}}</td>
          </tr>
        </table>
      </div>

      <!-- 编辑区 -->
      <div v-show="!EDITorCHECK" class="table-c">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr class="tableCol" style="height:55px;">
            <td style="font-size:20px;" colspan="6">投诉登记表</td>
          </tr>

          <tr>
            <td class="grayTD">投诉单号</td>
            <td v-if="newORedit">{{sumbit.id}}</td>
            <td v-else>(提交后自动生成)</td>

            <td class="grayTD">客户代码</td>
            <td>{{sumbit.cid}}</td>

            <td class="grayTD">客户名称</td>
            <td>{{sumbit.cname}}</td>
          </tr>

          <tr>
            <td class="grayTD" >联系方式</td>
            <td>{{sumbit.cname}}</td>
            <td colspan="4"></td>
          </tr>

          <tr>
            <td class="tableCol" style="font-size:20px;" colspan="6">投诉信息</td>
          </tr>

          <tr>
            <td class="grayTD" colspan="1">投诉类型</td>

            <td colspan="2">
              <el-select v-model="sumbit.yulanBank" placeholder="选择相应类型" style="float:left">
                <el-option
                  v-for="item in bankArray"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </td>

            <td class="grayTD" colspan="1" :rowspan="ROWSPAN" border="0px" >附件</td>

            <td colspan="2" :rowspan="ROWSPAN">
              <el-upload
                class="avatar-uploader"
                accept="image/png, image/jpg, image/jpeg"
                action="http://14.29.223.114:10250/yulan-capital/upload/uploadPaymentBillImg.do"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="sumbit.imgUrl" :src="sumbit.imgUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </td>
          </tr>

          <tr style="height:130px;">
            <td class="grayTD" colspan="1">投诉内容</td>
            <td colspan="2">
              <el-input
                type="textarea"
                maxlength="200"
                :autosize="{ minRows:8, maxRow:12}"
                resize="none"
                v-model="sumbit.memo"
                placeholder="请输入您的投诉内容"
              ></el-input>
            </td>
          </tr>

          <tr style="height:130px;">
            <td class="grayTD" colspan="1">投诉要求</td>
            <td colspan="2">
              <el-input
                type="textarea"
                maxlength="200"
                :autosize="{ minRows:8, maxRow:12}"
                resize="none"
                v-model="sumbit.memo"
                placeholder="请输入您的投诉要求"
              ></el-input>
            </td>
          </tr>

          <tr>
            <td class="grayTD" colspan="1" border="0px" >服务评价</td>
            <td colspan="2"> <el-input
                type="textarea"
                resize="none"
                v-model="sumbit.memo"
                placeholder="请对我们的服务进行评价"
              ></el-input>
            </td>
          </tr>

        </table>

        <div style="margin:0 auto; width:75px;">
          <br />
          <el-button v-if="newORedit" type="success" @click="submitEDIT">确 定</el-button>             <!-- 编辑时的按钮 -->
          <el-button v-else type="success" @click="sumbitNEW">提 交</el-button>                        <!-- 新增时的按钮 -->
        </div>

      </div>
    </el-dialog>

    <!-- 浏览时点击图片，跳出大图对话框 -->
    <el-dialog width="650px" title="查看图片" :visible.sync="BigPic">      
      <div>
        <img class="BIGimg" :src="tableData.imgUrl" />      <!-- 根据vue找到图片的路径赋值给src,然后调整图片的样式 -->
      </div>
    </el-dialog>
  </div>
</template>


<script>
import {
  getBankList,
  getPayBillContent,
  changeStatus,
  sumbitForm,
  getHistory
} from "@/api/bank";
import Cookies from "js-cookie";
const Head = "http://14.29.223.114:10250/upload";
const Quest = "http://14.29.223.114:10250/yulan-capital";
export default {
  name: "Complaint",
  data() {
    return {
      ROWSPAN: 6,
      BigPic: false,
      showtheHistory: false,
      historyList: [
        {
          PAYER_NAME: "测试", //汇款人名
          PAYER_ACCOUNT: "45544521112565445" //汇款账号
        },
        {
          PAYER_NAME: "测试3",
          PAYER_ACCOUNT: "121212121"
        },
        {
          PAYER_NAME: "测试4",
          PAYER_ACCOUNT: "1212121"
        }
      ],
      sqlpath: "", //保存图片相对路径
      newORedit: false, //决定显示新建或者编辑
      EDITorCHECK: false, //决定显示编辑或者查看
      tableData: {
        id: "PZ19071100003", //流水号
        cid: "C01613", //公司id
        cname: "测试—客户A", //客户名
        createTs: 1562816972000, //创建时间
        yulanBank: "工商银行", //汇款银行
        payerName: "测试客户", //汇款人名
        payAmount: 100, //汇款金额
        payDate: 1562816972000, //汇款日期
        imgFileName: "PZ19071100003-C01613.jpeg", //图片名
        submitTs: 1562816911000, //提交时间
        memo: "test", //备注
        cancelTs: null, //作废日期
        sendbackTs: null, //退回日期
        sendbackReason: null, //退回理由
        erpProcessTs: null, //处理日期
        erpProcessOp: null, //处理人状态(SUBMITED（已提交）,PROCESED（已处理）,SENDBACK（退回）,CANCELED（作废）)
        payerAccount: "45544521112565445", //汇款人银行账号
        imgUrl:
          "http://106.14.159.244:8080/upload/paymentBill-image/PZ19071100004-C01613.jpeg" //图片相对路径
      },
      sumbit: {
        cid: "", //公司号
        cname: "", //客户名
        yulanBank: "", //汇款银行
        payerName: "", //汇款人名
        payAmount: "", //汇款金额
        imgFileName: "", //文件名
        memo: "", //备注
        payerAccount: "", //账号
        payDate: "", //汇款时间,
        imgUrl: "" //相对路径
      },
      isDelete: false,
      isChuli: false,
      isBack: false,
      bankDetail: false,
      limit: 8,
      count: 88,
      currentPage: 1,
      beginTime: "",    //div中（html中绑定的）
      finishTime: "",
      status: "",
      options: [
        {
          label: "全部状态",
          value: ""
        },
        {
          label: "已提交",
          value: "SUBMITED"
        },
        {
          label: "已处理",
          value: "PROCESED"
        },
        {
          label: "退回",
          value: "SENDBACK"
        },
        {
          label: "作废",
          value: "CANCELED"
        }
      ],
      bankArray: [
        {
          label: "产品质量",
          value: "产品质量"
        },
        {
          label: "产品描述",
          value: "产品描述"
        },
        {
          label: "服务态度",
          value: "服务态度"
        },
        {
          label: "售前售后",
          value: "售前售后"
        },
        {
          label: "物流",
          value: "物流"
        },
        {
          label: "其他",
          value: "其他"
        },
      ],
      bankData: []
    };
  },
  created: function() {
    this._getBankList();
    this._getHistory();
  },
  filters: {
    transStatus(value) {
      switch (value) {
        case "SUBMITED":
          return "已提交";
          break;
        case "PROCESED":
          return "已处理";
          break;
        case "SENDBACK":
          return "退回";
          break;
        case "CANCELED":
          return "作废";
          break;
      }
    },
    datatrans(value) {
      //时间戳转化大法
      if (value == null) {
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
  watch: {
    showtheHistory(val) {
      if (val) {
        this.ROWSPAN = 7;
      } else {
        this.ROWSPAN = 6;
      }
    }
  },
  methods: {
    //焦点显示历史记录
    showHistory() {
      this.showtheHistory = true;
    },
    //填充历史记录
    writeHistory(payerName, payerAccount) {
      this.sumbit.payerName = payerName;
      this.sumbit.payerAccount = payerAccount;
      this.showtheHistory = false;
    },
    //确定新建
    sumbitNEW() {
      let url = Quest + "/PaymentBill/insertPaymentBill.do";
      let data = this.sumbit;
      this.sumbit.cid = Cookies.get("companyId");
      //判断是否填完所有信息
      if (
        this.sumbit.yulanBank == "" ||
        this.sumbit.payerName == "" ||
        this.sumbit.payAmount == "" ||
        this.sumbit.payerAccount == "" ||
        this.sumbit.payDate == "" ||
        this.sumbit.payDate == null
      ) {
        this.$alert("请完善信息", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      //判断是否上传图片
      if (this.sumbit.imgFileName == "") {
        this.$alert("请上传凭证", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      this.sumbit.imgUrl = this.sqlpath; //转换为相对地址
      sumbitForm(url, data).then(res => {
        console.log(res);
        if (res.code == 0) {
          this.$alert("提交成功", "提示", {
            confirmButtonText: "确定",
            type: "success"
          });
          this.currentPage = 1;
          this._getBankList();
          this.bankDetail = false;
        } else {
          this.$alert("提交失败，请稍后重试", "提示", {
            confirmButtonText: "确定",
            type: "warning"
          });
        }
      });
    },
    //编辑修改
    submitEDIT() {
      let url = Quest + "/PaymentBill/updatePayBill.do"; //创建
      let data = this.sumbit;
      this.sumbit.cid = Cookies.get("companyId");
      //判断是否填完所有信息
      if (
        this.sumbit.yulanBank == "" ||
        this.sumbit.payerName == "" ||
        this.sumbit.payAmount == "" ||
        this.sumbit.payerAccount == "" ||
        this.sumbit.payDate == "" ||
        this.sumbit.payDate == null
      ) {
        this.$alert("请完善信息", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      //判断是否上传图片
      if (this.sumbit.imgFileName == "") {
        this.$alert("请上传凭证", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      this.sumbit.imgUrl = this.sqlpath;
      this.sumbit.submitTs = null;
      this.sumbit.cancelTs = null;
      this.sumbit.createTs = null;
      sumbitForm(url, data).then(res => {
        console.log(res.data);
        if (res.code == 0) {
          this.$alert("修改成功", "提示", {
            confirmButtonText: "确定",
            type: "success"
          });
          this.currentPage = 1;
          this._getBankList();
          this.bankDetail = false;
        } else {
          this.$alert("修改失败，请稍后重试", "提示", {
            confirmButtonText: "确定",
            type: "warning"
          });
        }
      });
    },
    //新建
    newOne() {
      this.EDITorCHECK = false;
      this.bankDetail = true;
      this.newORedit = false;
      this.sumbit = {
        cid: Cookies.get("companyId"), //公司号
        cname: Cookies.get("realName"), //客户名
        yulanBank: "", //汇款银行
        payerName: "", //汇款人名
        payAmount: "", //汇款金额
        imgFileName: "", //文件名
        memo: "", //备注
        payerAccount: "", //账号
        payDate: "", //汇款时间,
        imgUrl: "" //相对路径
      };
    },
    //编辑列表详情
    editIt(tab) {
      console.log(tab.id);
      let url = Quest + "/PaymentBill/getPayBillContent.do";
      let data = {
        id: tab.id
      };
      getPayBillContent(url, data).then(res => {
        console.log(res);
        console.log(this.sumbit);
        this.sqlpath = res.data.imgUrl; //先保存一个
        res.data.imgUrl = Head + res.data.imgUrl;
        this.sumbit = res.data;
        this.EDITorCHECK = false;
        this.newORedit = true; //显示流水号 等编辑一类
        this.bankDetail = true;
      });
    },
    //查看列表详情
    checkDetail(tab) {
      //判断是否为作废
      if (tab.state == "CANCELED") {
        this.isDelete = true;
      } else {
        this.isDelete = false;
      }

      if (tab.state == "PROCESED") {
        this.isChuli = true;
      } else {
        this.isChuli = false;
      }

      if (tab.state == "SENDBACK") {
        this.isBack = true;
      } else {
        this.isBack = false;
      }
      console.log(tab.id);
      let url = Quest + "/PaymentBill/getPayBillContent.do";
      let data = {
        id: tab.id
      };
      getPayBillContent(url, data).then(res => {
        console.log(res.data);
        res.data.imgUrl = Head + res.data.imgUrl;
        this.tableData = res.data;
        this.EDITorCHECK = true;
        this.bankDetail = true;
      });
    },
    //作废列表详情
    deleteDetail(tab) {
      console.log(tab.id);
      let url = Quest + "/PaymentBill/updatePayBillState.do";
      let data = {
        id: tab.id,
        state: "CANCELED"
      };
      this.$confirm("确定作废该汇款凭证?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning"
      })
        .then(() => {
          changeStatus(url, data).then(res => {
            console.log(res);
            this._getBankList();
            this.$alert("删除成功", "提示", {
              confirmButtonText: "确定",
              type: "success"
            });
          });
        })
        .catch(() => {
          console.log("还没删");
        });
    },
    //搜索
    searchBankList() {
      this.currentPage = 1;
      this.bankData = [];
      this._getBankList();
    },
    //获取银行列表
    _getBankList() {
      let url = Quest + "/PaymentBill/getPayBills.do";
      if (this.beginTime == null) this.beginTime = "";
      if (this.finishTime == null) this.finishTime = "";
      let data = {
        cid: Cookies.get("companyId"), //公司id
        state: this.status, //状态状态(SUBMITED（已提交）,PROCESED（已处理）,SENDBACK（退回）,CANCELED（作废）)
        beginTime: this.beginTime, //起始时间
        finishTime: this.finishTime, //结束时间
        limit: this.limit, //限制数
        page: this.currentPage //页数
      };
      if (this.beginTime != "" || this.finishTime != "") {
        data.beginTime = this.beginTime + "00:00:00";
        data.finishTime = this.finishTime + "23:59:59";
      }
      console.log(data);
      getBankList(url, data).then(res => {
        console.log(res.data);
        this.count = res.count;
        this.bankData = res.data;
      });
    },
    //隔行变色
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 0) {
        return "success-row";
      }
      return "";
    },
    //获取历史记录
    _getHistory() {
      let url = Quest + "/PaymentBill/getPayNameAndAccount.do";
      let data = {
        companyId: Cookies.get("companyId")
      };
      getHistory(url, data).then(res => {
        console.log(res.data);
        this.historyList = res.data;
      });
    },
    //放大图片
    BIG() {
      this.BigPic = true;
    },
    //翻页获取订单
    handleCurrentChange(val) {
      this.currentPage = val;
      this.bankData = [];
      this._getBankList();
    },
    handleAvatarSuccess(res, file) {
      this.sumbit.imgUrl = URL.createObjectURL(file.raw);
      console.log(res);
      if (res.code == 0) {
        this.sqlpath = res.sqlpath;
        this.sumbit.imgUrl = Head + res.sqlpath;
        this.sumbit.imgFileName = res.fileName;
      }
      console.log(this.sumbit);
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isLt2M;
    }
  }
};
</script>

<style scoped>
.table-c table {
  border-right: 1px solid black;
  border-bottom: 1px solid black;
}
.table-c table td {
  border-left: 1px solid black;
  border-top: 1px solid black;
  height: 45px;
  text-align: center;
  font-size: 16px;
}
.tableCol {
  background: #f0f9eb;
}
.grayTD {
  background: rgb(241, 242, 243);
}
.ISimg {
  width: 300px;
  height: 300px;
  cursor: pointer;
}
.BIGimg {
  width: 666px;
  height:666px;
}
.inputWidth {
  width: 220px;
}
.tbarStyle{
  margin-bottom: 13px;
}
.statusCombobox{
 margin-left: 10px;
}
</style>

<style>
.el-table .success-row {
  background: #f0f9eb;
}

.avatar-uploader .el-upload {
  border: 1px dashed black;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 300px;
  height: 300px;
  line-height: 300px;
  text-align: center;
}
.avatar {
  width: 300px;
  height: 300px;
  display: block;
}
</style>