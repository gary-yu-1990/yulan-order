<template>
  <div>
    <el-card class="studyMain">
      <el-table
        style="width: 95%"
        :data="studyData"
        :row-class-name="tableRowClassName"
      >
        <el-table-column label="主题" header-align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.TITLE }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="150">
          <template slot-scope="scope">
            {{ scope.row.completeStatus | comFilter }}
          </template>
        </el-table-column>
        <el-table-column align="center" width="150" label="操作">
          <template slot-scope="scope">
            <el-button
              :disabled="scope.row.completeStatus == 2"
              @click="editStudy(scope.row)"
              type="primary"
              icon="el-icon-edit"
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        :show-close="true"
        :close-on-click-modal="false"
        :visible.sync="detailVisible"
        width="900px"
        top="5vh"
        center
      >
        <header>
          <h2 class="studyTitle">{{ selectData.TITLE }}</h2>
        </header>
        <header>
          <h2 class="studySubTitle">
            {{ selectData.DESCP }}
          </h2>
        </header>
        <div class="studyContent">
          <!-- 循环组 -->
          <el-card
            shadow="hover"
            v-for="group in studyContextData"
            :key="group.ORDERINDEX"
          >
            <div v-if="studyContextData.length > 1" slot="header">
              <span class="fstrong f16"
                >{{ group.TITLE }} [{{ group.QUESTIONCOUNT }}]</span
              >
            </div>
            <!-- 循环问题 -->
            <div
              class="controllerItem"
              v-for="context in group.contextList"
              :key="context.SID"
            >
              <div class="questionItem">
                <h2 class="questionTitle">
                  {{ context.ORDERINDEX }}.{{ context.TITLE }}
                </h2>
                <!-- 分类加载答案 -->
                <div
                  class="optionClass"
                  v-if="context.TYPE == 'STAND_5_SINGLE'"
                >
                  <el-radio-group v-model="context.optionResultValue">
                    <el-radio
                      class="optionSingle"
                      :label="index + 1"
                      v-for="(option, index) in context.optionList"
                      :key="index"
                      >{{ option.OPTIONTEXT }}</el-radio
                    >
                  </el-radio-group>
                </div>
                <div
                  class="optionClass"
                  v-else-if="context.TYPE == 'STAND_6_SINGLE'"
                >
                  <span style="display:inline-block;margin-right:10px;">{{
                    context.OPTIONTEXT1
                  }}</span>
                  <span style="display:inline-block;"
                    ><el-rate
                      class="optionSingle"
                      v-model="context.optionResultValue"
                      :colors="colors"
                    >
                    </el-rate
                  ></span>
                  <span style="display:inline-block;">{{
                    context.OPTIONTEXT6
                  }}</span>
                </div>
                <div
                  class="optionClass"
                  v-else-if="context.TYPE == 'CUSTM_SINGLE'"
                >
                  <el-radio-group v-model="context.optionResultValue">
                    <div
                      :style="{
                        display:
                          context.DIPLAYTYPE == 'VERTICAL'
                            ? 'block'
                            : 'inline-block'
                      }"
                      v-for="(option, index) in context.optionList"
                      :key="index"
                    >
                      <el-radio
                        class="optionSingle"
                        :label="index + 1"
                        @change="radioChange(context)"
                      >
                        <template
                          v-if="
                            context.LASTOPTIONEEDINPUT == 1 &&
                              index == context.optionList.length - 1
                          "
                        >
                          <el-input
                            :disabled="context.optionResultValue != index + 1"
                            v-model="context.optionExtraValue"
                          ></el-input>
                        </template>
                        <span v-else>{{ option.OPTIONTEXT }}</span></el-radio
                      >
                    </div>
                  </el-radio-group>
                </div>
                <div
                  class="optionClass"
                  v-else-if="context.TYPE == 'CUSTM_MULTIP'"
                >
                  <el-checkbox-group v-model="context.optionResultValue">
                    <div
                      :style="{
                        display:
                          context.DIPLAYTYPE == 'VERTICAL'
                            ? 'block'
                            : 'inline-block'
                      }"
                      v-for="(option, index) in context.optionList"
                      :key="index"
                    >
                      <el-checkbox
                        class="optionSingle"
                        :label="index + 1"
                        @change="radioChange2(context)"
                      >
                        <template
                          v-if="
                            context.LASTOPTIONEEDINPUT == 1 &&
                              index == context.optionList.length - 1
                          "
                        >
                          <el-input
                            :disabled="
                              context.optionResultValue.indexOf(index + 1) == -1
                            "
                            v-model="context.optionExtraValue"
                          ></el-input>
                        </template>
                        <span v-else>{{ option.OPTIONTEXT }}</span></el-checkbox
                      >
                    </div>
                  </el-checkbox-group>
                </div>
                <div
                  class="optionClass"
                  v-else-if="context.TYPE == 'SHORT_INPUT'"
                >
                  <el-input
                    class="optionSingle"
                    style="width:15%;"
                    v-model="context.optionResultValue"
                  ></el-input>
                </div>
                <div
                  class="optionClass"
                  v-else-if="context.TYPE == 'LONG_INPUT'"
                >
                  <el-input
                    class="optionSingle"
                    type="textarea"
                    style="width:50%;"
                    :autosize="{ minRows: 3, maxRow: 4 }"
                    resize="none"
                    v-model="context.optionResultValue"
                  ></el-input>
                </div>
              </div>
            </div>
          </el-card>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitStudy">提交调查表</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import {
  GetCustomerStudy,
  GetGroupContextOption,
  BeginEditStudy,
  SubmitStudy
} from "@/api/studyASP";
import Cookies from "js-cookie";

export default {
  name: "MarketInfo",
  data() {
    return {
      studyData: [],
      detailVisible: false,
      studyContextData: [],
      selectData: [],
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"]
    };
  },
  filters: {
    comFilter(value) {
      switch (value) {
        case 0:
          return "未开始";
          break;
        case 1:
          return "未完成";
          break;
        case 2:
          return "已完成";
          break;
      }
    }
  },
  methods: {
    getDetail() {
      GetCustomerStudy({ cid: Cookies.get("cid") }).then(res => {
        this.studyData = res.data;
      });
    },
    radioChange(context) {
      if (
        context.LASTOPTIONEEDINPUT == 1 &&
        context.optionResultValue != context.OPTIONNUM &&
        context.optionExtraValue
      ) {
        context.optionExtraValue = "";
      }
    },
    radioChange2(context) {
      if (
        context.LASTOPTIONEEDINPUT == 1 &&
        context.optionResultValue.indexOf(context.OPTIONNUM) == -1 &&
        context.optionExtraValue
      ) {
        context.optionExtraValue = "";
      }
    },
    editStudy(studyItem) {
      this.selectData = studyItem;
      this.studyContextData = [];
      BeginEditStudy({ cid: Cookies.get("cid"), sfid: studyItem.SID });
      GetGroupContextOption({ sfid: studyItem.SID }).then(res => {
        this.studyContextData = res.data;
        for (var i = 0; i < this.studyContextData.length; i++) {
          for (
            var j = 0;
            j < this.studyContextData[i].contextList.length;
            j++
          ) {
            if (
              this.studyContextData[i].contextList[j].TYPE == "STAND_6_SINGLE"
            )
              this.studyContextData[i].contextList[j].optionResultValue = 0;
            else if (
              this.studyContextData[i].contextList[j].TYPE == "CUSTM_MULTIP"
            )
              this.studyContextData[i].contextList[j].optionResultValue = [];
          }
        }
        this.detailVisible = true;
      });
    },
    submitStudy() {
      var finalResult = [];
      for (var i = 0; i < this.studyContextData.length; i++) {
        for (var j = 0; j < this.studyContextData[i].contextList.length; j++) {
          var context = this.studyContextData[i].contextList[j];
          if (
            !context.optionResultValue ||
            context.optionResultValue.length == 0
          ) {
            if (this.studyContextData.length == 1) {
              this.$alert("第" + (j + 1) + "题没有填写", "提示", {
                type: "warning",
                confirmButtonText: "好的"
              });
            } else {
              this.$alert(
                "第" + (i + 1) + "组第" + (j + 1) + "题没有填写",
                "提示",
                {
                  type: "warning",
                  confirmButtonText: "好的"
                }
              );
            }
            return;
          } else {
            if (
              context.LASTOPTIONEEDINPUT == 1 &&
              (context.optionResultValue == context.OPTIONNUM ||
                (context.TYPE === "CUSTM_MULTIP" &&
                  context.optionResultValue.indexOf(context.OPTIONNUM) > -1)) &&
              !context.optionExtraValue
            ) {
              if (this.studyContextData.length == 1) {
                this.$alert("第" + (j + 1) + "题没有填写完整", "提示", {
                  type: "warning",
                  confirmButtonText: "好的"
                });
              } else {
                this.$alert(
                  "第" + (i + 1) + "组第" + (j + 1) + "题没有填写完整",
                  "提示",
                  {
                    type: "warning",
                    confirmButtonText: "好的"
                  }
                );
              }
              return;
            }
          }
          var option = "";
          if (context.TYPE === "CUSTM_MULTIP") {
            option =
              context.optionResultValue.join(",") +
              (context.optionExtraValue
                ? "_;_" + context.optionExtraValue
                : "");
          } else {
            option =
              context.optionResultValue +
              (context.optionExtraValue
                ? "_;_" + context.optionExtraValue
                : "");
          }
          finalResult.push({
            sid: context.SID,
            option: option
          });
        }
      }
      SubmitStudy({
        resultValue: finalResult,
        cid: Cookies.get("cid"),
        sfid: this.selectData.SID
      }).then(res => {
        this.detailVisible = false;
        this.getDetail();
      });
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 0) {
        return "success-row";
      }
      return "";
    }
  },
  created() {
    this.studyData = [];
    this.getDetail();
  }
};
</script>

<style scoped>
.studyTitle {
  margin-bottom: 2rem;
  text-align: center;
  font-size: 3rem;
  color: #555;
}
.studySubTitle {
  margin-bottom: 2rem;
  margin-left: 3rem;
  margin-right: 3rem;
  text-indent: 2em;
  font-size: 1.6rem;
  color: #555;
}
.studyContent {
  padding: 1rem 0;
  border-top: 0.2rem solid #ccc;
  border-bottom: 0.2rem solid #ccc;
}
.questionTitle {
  padding: 1.5rem 2rem;
  font-size: 2rem;
  color: #555;
}
.optionClass {
  margin-left: 4rem;
}
.optionSingle {
  margin-bottom: 10px;
  margin-right: 10px;
  font-size: 1.5rem;
}
.questionItem {
  padding: 0;
}
.controllerItem :hover {
  background-color: #fafafa;
}
</style>
<style>
.studyContent .el-card__body {
  padding: 0;
}
.studyMain .el-dialog__header {
  padding: 0;
}
</style>