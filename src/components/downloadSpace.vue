<template>
  <div>
    <div style="height:40px;" class="buttonClass">
      <el-button
        v-show="false"
        :disabled="multipleSelection.length == 0"
        icon="el-icon-download"
        type="primary"
        plain
        >下载</el-button
      >
      <el-input
        @keyup.enter.native="search()"
        placeholder="搜索文件"
        v-model="find"
        style="width:350px;float:right;margin-right:50px;"
      >
        <el-button @click="search()" slot="append" icon="el-icon-search"
          >搜索</el-button
        >
      </el-input>
    </div>
    <div style="margin:5px;">
      <a
        style="font-size:14px;"
        v-if="navigationList.length > 1"
        class="islink"
        @click="gotoUp()"
        >返回上一级</a
      >
      <span v-if="navigationList.length > 1">|</span>
      <i
        title="刷新"
        :class="refreshClass"
        style="color:black;cursor:pointer;"
        @click="refresh"
      ></i>
      <a
        style="font-size:14px;"
        v-for="(item, index) in navigationList"
        :key="index"
        :class="[index == navigationList.length - 1 ? 'nolink' : 'islink']"
        @click="gotoIndex(item, index)"
        >&nbsp;{{ item.FILE_NAME }}>&nbsp;</a
      >
    </div>
    <el-table :data="fileData" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="35"></el-table-column>
      <el-table-column label="文件名">
        <template slot-scope="scope">
          <span>
            <div class="format" :class="formatClass(scope.row.FILE_NAME)"></div>
            <div style="display:inline-block;">
              <a
                :class="[scope.row.FILE_TYPE == 0 ? 'nolink' : 'link']"
                style="margin-left:5px;"
                @click="gotoNext(scope.row)"
                >{{ scope.row.FILE_NAME }}</a
              >
            </div>
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="150">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.FILE_TYPE != 1"
            @click="downLoad(scope.row.FILE_ID)"
            type="primary"
            size="mini"
            icon="el-icon-download"
            circle
            plain
          ></el-button>
        </template>
      </el-table-column>
      <el-table-column label="文件大小" width="150"
        ><template slot-scope="scope">
          <span v-if="scope.row.FILE_TYPE == 1">-</span>
          <span v-else>{{ scope.row.FILE_SIZE | fileSizeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="上传时间"
        prop="UPLOAD_TIME"
        width="200"
      ></el-table-column>
      <el-table-column v-if="dirShow" label="所在目录" width="200"
        ><template slot-scope="scope">
          <a
            style="text-decoration: underline;cursor:pointer;"
            @click="gotoTarget(scope.row.FILE_PID)"
            >{{ filterDir(scope.row.FILE_PID) }}</a
          >
        </template></el-table-column
      >
    </el-table>
  </div>
</template>

<script>
import { GetAllFile, DownLoad } from "@/api/fileCenterASP";
import { downLoadFile } from "@/common/js/downLoadFile";

export default {
  name: "DownloadSpace",
  data() {
    return {
      refreshClass: "el-icon-refresh-left",
      downLoadUrl: "http://47.107.56.156:1001/",//测试
      //downLoadUrl: "http://14.29.223.114:1001/",//正式
      find: "",
      dirShow: false,
      fileData: [],
      multipleSelection: [],
      navigationList: [
        {
          FILE_ID: 0,
          FILE_NAME: "全部文件"
        }
      ],
      allData: []
    };
  },
  filters:{
    fileSizeFilter(size){
       var unit;
       var units = ['B', 'KB', 'MB', 'GB', 'TB'];
       while ( (unit = units.shift()) && size > 1024 ) {
         size = size / 1024;
       }
       return (unit === 'B' ? size : size.toFixed(1)) +' ' + unit;
    }
  },
  methods: {
    formatClass(FILE_NAME) {
      if (FILE_NAME) {
        var startIndex = FILE_NAME.lastIndexOf(".");
        if (startIndex != -1) {
          var format = FILE_NAME.substring(
            startIndex + 1,
            FILE_NAME.length
          ).toLowerCase();
          switch (format) {
            case "apk":
              return "android-mini";
            case "xls":
            case "xlsx":
              return "excel-mini";
            case "exe":
              return "exe-mini";
            case "pdf":
              return "pdf-mini";
            case "jpg":
            case "jpeg":
            case "png":
            case "bmp":
            case "gif":
            case "svg":
            case "ico":
              return "picture-mini";
            case "ppt":
            case "pptx":
              return "ppt-mini";
            case "txt":
              return "text-mini";
            case "mp3":
            case "mp4":
            case "rmvb":
            case "avi":
            case "mkv":
            case "flv":
            case "mov":
            case "wav":
              return "video-mini";
            case "html":
              return "web-mini";
            case "doc":
            case "docx":
              return "word-mini";
            case "zip":
            case "rar":
              return "zip-mini";
            default:
              return "unknow-mini";
          }
        } else return "folder-mini";
      } else {
        return "unknow-mini";
      }
    },
    getFile() {
      GetAllFile({ condition: "" }).then(res => {
        this.allData = res.data;
        this.fileData = this.filterFile(0);
      });
    },
    refresh() {
      this.refreshClass = "el-icon-loading";
      GetAllFile({ condition: "" }).then(res => {
        this.allData = res.data;
        if (this.dirShow) {
          if (this.find) {
            var reg = new RegExp(this.find, "i");
            this.fileData = this.allData.filter(
              item =>
                item.FILE_TYPE == 0 &&
                reg.test(
                  item.FILE_NAME.substring(0, item.FILE_NAME.lastIndexOf("."))
                )
            );
          } else {
            this.navigationList = this.navigationList.slice(0, 1);
            this.fileData = this.filterFile(
              this.navigationList[this.navigationList.length - 1].FILE_ID
            );
            this.dirShow = false;
          }
        } else {
          this.fileData = this.filterFile(
            this.navigationList[this.navigationList.length - 1].FILE_ID
          );
        }
        this.refreshClass = "el-icon-refresh-left";
      });
    },
    search() {
      if (this.find) {
        this.navigationList = this.navigationList.slice(0, 1);
        var reg = new RegExp(this.find, "i");
        this.fileData = this.allData.filter(
          item =>
            item.FILE_TYPE == 0 &&
            reg.test(
              item.FILE_NAME.substring(0, item.FILE_NAME.lastIndexOf("."))
            )
        );
        this.navigationList.push({
          FILE_ID: -1,
          FILE_NAME: '搜索:"' + this.find + '"'
        });
        this.dirShow = true;
      }
    },
    filterFile(id) {
      return this.allData.filter(item => item.FILE_PID == id);
    },
    gotoNext(folder) {
      if (folder.FILE_TYPE == 1) {
        this.fileData = this.filterFile(folder.FILE_ID);
        this.navigationList.push(folder);
        this.dirShow = false;
      }
    },
    gotoUp() {
      this.gotoIndex(
        this.navigationList[this.navigationList.length - 2],
        this.navigationList.length - 2
      );
    },
    gotoIndex(item, index) {
      this.fileData = this.filterFile(item.FILE_ID);
      this.navigationList = this.navigationList.slice(0, index + 1);
      this.dirShow = false;
    },
    filterDir(id) {
      if (id == 0) {
        return "全部文件";
      } else {
        var dirItem = this.allData.filter(item => item.FILE_ID == id);
        if (dirItem.length > 0) {
          return dirItem[0].FILE_NAME;
        } else {
          return "-";
        }
      }
    },
    gotoTarget(id) {
      this.fileData = this.filterFile(id);
      this.navigationList = this.navigationList.slice(0, 1);
      this.navigationList = this.addListToTarget(id, this.navigationList);
      this.dirShow = false;
    },
    addListToTarget(id, result) {
      var item = this.allData.filter(item => item.FILE_ID == id);
      if (item.length > 0) {
        result.splice(1, 0, item[0]);
        if (item[0].FILE_PID != 0) {
          this.addListToTarget(item[0].FILE_PID, result);
        }
      }
      return result;
    },
    downLoad(id) {
      downLoadFile(this.Global.fileCenterUrl + `FILE_CENTERAPI/DownloadFile?FILE_ID=${id}`);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  },
  created() {
    this.getFile();
  }
};
</script>


<style scoped>
.nolink {
  cursor: default;
  color: #000;
}
.islink {
  cursor: pointer;
  color: #09aaff;
}
.islink :hover {
  text-decoration: underline;
}
.link {
  cursor: pointer;
  color: #666;
}
.link:hover {
  color: #09aaff;
}
.format {
  width: 25px;
  height: 25px;
  margin-bottom: -5px;
  display: inline-block;
  background-size: cover;
}
.android-mini {
  background: url("../assets/img//format/Android.png") no-repeat;
}
.excel-mini {
  background: url("../assets/img//format/Excel.png") no-repeat;
}
.exe-mini {
  background: url("../assets/img//format/EXE.png") no-repeat;
}
.folder-mini {
  background: url("../assets/img//format/Folder.png") no-repeat;
}
.pdf-mini {
  background: url("../assets/img//format/PDF.png") no-repeat;
}
.picture-mini {
  background: url("../assets/img//format/Picture.png") no-repeat;
}
.ppt-mini {
  background: url("../assets/img//format/PPT.png") no-repeat;
}
.text-mini {
  background: url("../assets/img//format/TEXT.png") no-repeat;
}
.unknow-mini {
  background: url("../assets/img//format/UnKnow.png") no-repeat;
}
.video-mini {
  background: url("../assets/img//format/Video.png") no-repeat;
}
.web-mini {
  background: url("../assets/img//format/Web.png") no-repeat;
}
.word-mini {
  background: url("../assets/img//format/Word.png") no-repeat;
}
.zip-mini {
  background: url("../assets/img//format/ZIP.png") no-repeat;
}
</style>
