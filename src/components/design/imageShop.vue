<template>
  <div>
    <el-card shadow="hover">
      <div id="tbar" class="tbarStyle">
        <el-date-picker
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder="查询开始日期"
          v-model="beginTime"
          style="width:14%;"
        ></el-date-picker>
        --
        <el-date-picker
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder="查询截止日期"
          v-model="finishTime"
          style="width:14%;"
        ></el-date-picker>
        <el-select
          v-model="status"
          style="margin-left: 10px"
          placeholder="全部状态"
        >
          <el-option
            v-for="item in options"
            :key="item.label"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button size="medium" type="success" style="margin-left: 10px"  @click="searchBankList()"
          >查询</el-button
        >
        <el-button
          style="float:right"
          size="medium"
          @click="newOne"
          type="primary"
          >新增申请单</el-button
        >
      </div>
      <el-table
        border
        :data="bankData"
        style="width: 100%"
        :row-class-name="tableRowClassName"
      >
        <el-table-column
          width="130"
          prop="id"
          label="业务单号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="payerName"
          label="申请人"
          align="center"
          width="100"
        ></el-table-column>
        <el-table-column label="申请时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createTs | datatrans }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="payerName"
          label="联系人"
          align="center"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="payAmount"
          label="联系方式"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="yulanBank"
          width="120"
          label="店面形式"
          align="center"
        ></el-table-column>
        <el-table-column label="计划动工时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.payDate | datatrans }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="yulanBank"
          width="100"
          label="实施形式"
          align="center"
        ></el-table-column>
        <el-table-column width="100" label="状态" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.state | transStatus }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" width="100" label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.state == 'SUBMITED'"
              @click="checkDetail(scope.row)"
              type="warning"
              icon="el-icon-search"
              circle
            ></el-button>
            <el-button
              v-if="
                scope.row.state == 'SENDBACK' || scope.row.state == 'PROCESED'
              "
              @click="editIt(scope.row)"
              type="primary"
              icon="el-icon-edit"
              circle
            ></el-button>
            <el-button
              v-if="scope.row.state == 'CANCELED'"
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

    <el-dialog
      title="形象店建设申请表"
      :visible.sync="bankDetail"
      :close-on-click-modal="false"
      width="55%"
    >
      <!-- 查看区 -->
      <div v-show="EDITorCHECK" class="table-c">
        <h2 style="text-align:center;">
          形象店建设申请表-[{{ tableData.state | transStatus }}]
        </h2>
        <h3>
          建立时间：{{
            tableData.createTs | datatrans
          }}&nbsp;&nbsp;&nbsp;&nbsp;提交时间：{{
            tableData.submitTs | datatrans
          }}
        </h3>
        <h3 v-show="isBack">
          退回时间：{{
            tableData.sendbackTs | datatrans
          }}&nbsp;&nbsp;&nbsp;&nbsp;退回原因：{{ tableData.sendbackReason }}
        </h3>
        <h3 v-show="isDelete">
          作废时间：{{ tableData.cancelTs | datatrans }}
        </h3>
        <h3 v-show="isChuli">
          处理人：{{
            tableData.erpProcessOp
          }}&nbsp;&nbsp;&nbsp;&nbsp;处理时间：{{
            tableData.erpProcessTs | datatrans
          }}
        </h3>

        <table border="0px" cellspacing="0px" cellpadding="0">
          <tr>
            <td
              class="grayTD"
              colspan="1"
              rowspan="3"
              border="0px"
              style=" height:12px;"
            >
              基本信息
            </td>
            <td class="grayTD" colspan="1" style=" height:12px;">客户名称</td>
            <td colspan="1" style=" height:12px;">{{ tableData.cname }}</td>
            <td class="grayTD" colspan="1" style=" height:12px;">年销售任务</td>
            <td colspan="1" style=" height:12px;">年销售额300万人名币</td>
          </tr>
          <tr>
            <td class="grayTD" colspan="1" style=" height:12px;">店面地址</td>
            <td colspan="3" style=" height:12px;">
              广东省佛山市南海区海一路商会大厦B座66号
            </td>
          </tr>
          <tr>
            <td class="grayTD" colspan="1" style="width:17%;height:12px;">
              联系人
            </td>
            <td colspan="1" style="width:27%;height:12px;">陈建祥</td>
            <td class="grayTD" colspan="1" style="width:17%;height:12px;">
              联系电话
            </td>
            <td colspan="1" style="width:27%;height:12px;">13579263841</td>
          </tr>

          <tr>
            <td
              class="grayTD"
              colspan="1"
              rowspan="2"
              border="0px"
              style=" height:12px;"
            >
              店面信息
            </td>
            <td class="grayTD" colspan="1" style=" height:12px;">店面形式</td>
            <td colspan="3" style=" height:12px;">商城店</td>
          </tr>

          <tr>
            <td class="grayTD" colspan="1" style=" height:12px;">店面面积</td>
            <td colspan="1" style=" height:12px;">86平方米</td>
            <td class="grayTD" colspan="1" style=" height:12px;">层数</td>
            <td colspan="1" style=" height:12px;">1</td>
          </tr>

          <tr>
            <td
              class="grayTD"
              colspan="1"
              rowspan="5"
              border="0px"
              style=" height:12px;"
            >
              设计需求
            </td>
            <td class="grayTD" colspan="1" style=" height:12px;">
              计划动工时间
            </td>
            <td colspan="3" rowspan="1" style=" height:12px;">2019/09/17</td>
          </tr>

          <tr>
            <td class="grayTD" colspan="1" style="height:10px;">实施形式</td>
            <td colspan="3" style=" height:12px;">100%按公司设计方案落地</td>
          </tr>

          <tr style="height:30px">
            <td class="grayTD" colspan="1">是否需要上门测量</td>
            <td colspan="1">否</td>
            <td colspan="2" style="font-size:11px;color:gray">
              (仅100%按公司设计方案落地客户可预约上门测量，并需承担上门人员食宿费用，
              如后期未100%按效果图实施，需承担上门人员交通费用。)
            </td>
          </tr>

          <tr>
            <td class="grayTD" colspan="1" style="height:50px">其他需求说明</td>
            <td colspan="3" style="height:50px">
              希望能够保存形象店设计开工的各式文件
            </td>
          </tr>

          <tr>
            <td class="grayTD" colspan="1" style="height:20px;">附件</td>

            <td colspan="1" style="height:20px;">
              <el-tooltip
                class="item"
                effect="dark"
                content="点击放大图片"
                placement="top"
              >
                <img @click="BIG" class="ISimg" :src="tableData.imgUrl" />
              </el-tooltip>
            </td>

            <td colspan="2" style="font-size:11px;color:gray;height:20px;">
              (上传jpg、dwg、pdf等格式平面图，
              平面图尺寸要表达清晰，消防位等有阻碍设计的地方要标注清楚)
            </td>
          </tr>

          <tr>
            <td class="grayTD" colspan="1" border="0px" style="height:12px;">
              付款信息
            </td>
            <td class="grayTD" colspan="1" style="height:12px;">付款凭证</td>
            <td colspan="3" style="height:12px;">
              工行转账流水号：62232150123226486931
            </td>
          </tr>

          <tr>
            <td colspan="3" border="0px" style="height:12px;">
              责任人签字：马健博
            </td>
            <td colspan="2" style="height:12px;">日期：2019/09/04</td>
          </tr>
        </table>
      </div>

      <!-- 编辑区 -->
      <div v-show="!EDITorCHECK" class="table-c">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td
              class="grayTD"
              colspan="5"
              rowspan="1"
              border="0px"
              style="height:30px;text-align:center;"
            >
              形象店建设申请表
            </td>
          </tr>

          <tr>
            <td
              class="grayTD"
              colspan="1"
              rowspan="3"
              border="0px"
              style="height:12px;"
            >
              基本信息
            </td>
            <td class="grayTD" colspan="1" style="height:12px;">客户名称</td>
            <td v-if="newORedit" style="height:12px;">{{ sumbit.cname }}</td>
            <td v-else style="height:12px;">(系统带出)</td>
            <td class="grayTD" colspan="1" style="height:12px;">年销售任务</td>
            <td style="height:12px;">
              <input placeholder="（客户填写）" clearable class="inputStyle" />
            </td>
          </tr>

          <tr>
            <td class="grayTD" colspan="1" style="height:12px;">店面地址</td>
            <td v-if="newORedit" colspan="3" style="height:12px;">
              {{ sumbit.id }}
            </td>
            <td v-else colspan="3" style="height:12px;">
              <input placeholder="（客户必填）" clearable class="inputStyle" />
            </td>
          </tr>

          <tr>
            <td class="grayTD" colspan="1" style="width:17%;height:12px;">
              联系人
            </td>
            <td v-if="newORedit" style="width:27%;height:12px;">
              {{ sumbit.id }}
            </td>
            <td v-else style="width:27%;height:12px;">(系统带出)</td>
            <td class="grayTD" colspan="1" style="width:17%;height:12px;">
              联系电话
            </td>
            <td v-if="newORedit" style="width:27%;height:12px;">
              {{ sumbit.id }}
            </td>
            <td v-else style="width:27%;height:12px;">(系统带出)</td>
          </tr>

          <tr>
            <td
              class="grayTD"
              colspan="1"
              rowspan="2"
              border="0px"
              style="height:12px;"
            >
              店面信息
            </td>
            <td class="grayTD" colspan="1" style="height:12px;">店面形式</td>
            <td colspan="3" style="height:12px;">
              <input
                placeholder="（街边店/商城店）"
                clearable
                class="inputStyle"
              />
            </td>
          </tr>

          <tr>
            <td class="grayTD" colspan="1" style="height:12px;">店面面积</td>
            <td colspan="1" style="height:12px;">
              <input placeholder="（客户必填）" clearable class="inputStyle" />
            </td>
            <td class="grayTD" colspan="1" style="height:12px;">层数</td>
            <td colspan="1" style="height:12px;">
              <input placeholder="（客户必填）" clearable class="inputStyle" />
            </td>
          </tr>

          <tr>
            <td
              class="grayTD"
              colspan="1"
              rowspan="5"
              border="0px"
              style="height:12px;"
            >
              设计需求
            </td>
            <td class="grayTD" colspan="1" style="height:12px;">
              计划动工时间
            </td>
            <td colspan="3" rowspan="1" style="height:12px;">
              <input placeholder="（客户必填）" clearable class="inputStyle" />
            </td>
          </tr>

          <tr>
            <td class="grayTD" colspan="1" style="height:30px;">实施形式</td>
            <td colspan="3" style="height:30px;">
              <input
                placeholder="①100%按公司设计方案落地，软装物料由公司配置，享受公司建店支持  ②自行落地"
                clearable
                style="border:0; height:100%;width:100%;font-size:13px;"
              />
            </td>
          </tr>

          <tr>
            <td class="grayTD" colspan="1" style="height:35px">
              是否需要上门测量
            </td>
            <td colspan="1" style="height:35px">
              <input placeholder="（是/否）" clearable class="inputStyle" />
            </td>
            <td colspan="2" style="font-size:11px;color:gray;height:35px">
              (仅100%按公司设计方案落地客户可预约上门测量，并需承担上门人员食宿费用，
              如后期未100%按效果图实施，需承担上门人员交通费用。)
            </td>
          </tr>

          <tr>
            <td class="grayTD" colspan="1" style="height:50px">其他需求说明</td>
            <td colspan="3" style="height:50px">
              <input
                clearable
                style="border:0; height:100%;width:100%;font-size:16px;"
              />
            </td>
          </tr>

          <tr>
            <td class="grayTD" colspan="1" style="height:14px;">附件</td>

            <td colspan="1" style="height:14px;">
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

            <td colspan="2" style="font-size:11px;color:gray">
              (上传jpg、dwg、pdf等格式平面图，
              平面图尺寸要表达清晰，消防位等有阻碍设计的地方要标注清楚)
            </td>
          </tr>

          <tr>
            <td class="grayTD" colspan="1" border="0px" style="height:12px;">
              付款信息
            </td>
            <td class="grayTD" colspan="1" style="height:12px;">付款凭证</td>
            <td colspan="3" style="height:12px;">
              <input placeholder="（是/否）" clearable class="inputStyle" />
            </td>
          </tr>

          <tr>
            <td colspan="3" border="0px" style="height:12px;">责任人签字：</td>
            <td colspan="2" style="height:12px;">日期：</td>
          </tr>

          <tr style="height:60px">
            <td
              colspan="5"
              border="0px"
              style="font-size:11px;color:gray;text-align:left"
            >
              1.请提前15个工作日提交设计需求申请。<br />
              2.请附上店面平面图（清晰标注尺寸以及消防位等障碍位置）。<br />
              3.硬装部分有客户自行落地。<br />
              4.公司物料配置包含标识、展具、上样、情景四大模块，根据成本清单提供40%建店支持（不包含硬装）。以实用面积为100平店面测算出软装包成本约2700元/m²，店面面积越大，每平方价格相应降低。<br />
              5.申请2.0形象店设计需交10000元设计落地保证金，落地后抵扣软装包款项，如未100%按设计落地，保证金不予返还。<br />
            </td>
          </tr>
        </table>

        <div style="margin:0 auto; width:75px;">
          <br />
          <el-button v-if="newORedit" type="success" @click="submitEDIT"
            >确 定</el-button
          >
          <el-button v-else type="success" @click="sumbitNEW">提 交</el-button>
        </div>
      </div>
    </el-dialog>

    <el-dialog width="500px" title="查看图片" :visible.sync="BigPic">
      <div>
        <img class="BIGimg" :src="tableData.imgUrl" />
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
  name: "ImageShop",
  data() {
    return {
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
      beginTime: "", //div中（html中绑定的）
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
        }
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
  methods: {
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
.inputStyle {
  border: 0;
  height: 100%;
  width: 100%;
  font-size: 16px;
  text-align: center;
}
.lowHeightRow {
  height: 10px;
}
.ISimg {
  width: 30px;
  height: 30px;
  cursor: pointer;
}
.BIGimg {
  width: 450px;
  height: 450px;
}
.inputWidth {
  width: 220px;
}
.tbarStyle {
  margin-bottom: 13px;
}
.statusCombobox {
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
  font-size: 12px;
  color: #8c939d;
  width: 14px;
  height: 14px;
  line-height: 14px;
  text-align: center;
}
.avatar {
  width: 14px;
  height: 14px;
  display: block;
}
</style>