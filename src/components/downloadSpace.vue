<template>
    <div>
     <el-card shadow="hover">
      <div slot="header">
        <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="6"  class="fstrong f16"><div>下载中心</div></el-col>
            <el-col :span="6">                    
                <div id="DownloadSearchBox">
                        <el-input clearable
                            v-model.trim="searchKey" 
                            @clear="_getTabDownloadFiles(0)"
                            @keyup.enter.native="searchFileInTab(0)"
                            placeholder="输入关键字"
                            size="mini">
                            <div id="searchBtn" slot="append" style="cursor:pointer;" class="fstrong f12" @click="searchFileInTab(0)" >搜索</div>
                        </el-input>
                    </div>
            </el-col>
        </el-row>
      </div>
      <div>
            <el-tabs :tab-position="tabPosition"  v-model="activeName" @tab-click="handleClick" >
                    <el-tab-pane label="所有">
                            <div>
                                 <el-table
                                 :data="tableDataAll"
                                 stripe
                                 style="width: 100%">
                                 <el-table-column
                                 prop="FileName"
                                 label="所有"
                                 width="777">
                                 </el-table-column>
                                 <el-table-column
                                 prop="Date"
                                 label=" " >
                                 </el-table-column>
                                 </el-table>
                            </div>
                    </el-tab-pane>
                    <el-tab-pane label="分类标签1">
                            <div>
                                 <el-table
                                 :data="tableData1"
                                 stripe
                                 style="width: 100%">
                                 <el-table-column
                                 prop="FileName"
                                 label="分类标签1"
                                 width="777">
                                 </el-table-column>
                                 <el-table-column
                                 prop="Date"
                                 label=" " >
                                 </el-table-column>
                                 </el-table>
                            </div>
                    </el-tab-pane>
                    <el-tab-pane label="分类标签2">
                            <div>
                                 <el-table
                                 :data="tableData2"
                                 stripe
                                 style="width: 100%">
                                 <el-table-column
                                prop="FileName"
                                 label="分类标签2"
                                 width="777">
                                 </el-table-column>
                                 <el-table-column
                                 prop="Date"
                                 label=" " >
                                 </el-table-column>
                                 </el-table>
                            </div>
                    </el-tab-pane>
                    <el-tab-pane label="分类标签3">
                            <div>
                                 <el-table
                                 :data="tableData3"
                                 stripe
                                 style="width: 100%">
                                 <el-table-column
                                 prop="FileName"
                                 label="分类标签3"
                                 width="777">
                                 </el-table-column>
                                 <el-table-column
                                 prop="Date" 
                                 label=" " >
                                 </el-table-column>
                                 </el-table>
                            </div>
                    </el-tab-pane>
                    <el-pagination
                        class="tc"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-size="pageSize"
                        layout="prev, pager, next, jumper"
                        :total="totalNumber">
                    </el-pagination>
            </el-tabs>
      </div>
    </el-card>
    </div>
</template>

<script>
import Cookies from 'js-cookie'
import { 
    getAllDownloadFiles,
    getSingleDownloadFile
} from '@/api/downloadSearch'


export default {
    name: 'DownloadSpace',
    data(){
        return{
            tabPosition: 'left',
            searchKey: '',  //搜索的关键词
            chooseTab: '',  //当前的选择
            numberList: [],
            tableDataAll: [
                {
                    FileType: '1', //型号
                    FileName:'条目1',
                    Date:'2019-09-09',
                    number: '',     //计量
                    anotherNumber: '',  //辅助计量
                    status: '0',    //状态
                },
                {
                    FileName:'条目2',
                    Date:'2019-09-09',
                },
                {
                    FileName:'条目3',
                    Date:'2019-09-06',
                },
                {
                    FileName:'条目4',
                    Date:'2019-09-06',
                },
                {
                    FileName:'条目5',
                    Date:'2019-09-06',
                },
                {
                    FileName:'条目6',
                    Date:'2019-09-03',
                },
                {
                    FileName:'条目7',
                    Date:'2019-09-03',
                },
                                {
                    FileName:'条目8',
                    Date:'2019-09-01',
                },
                {
                    FileName:'条目9',
                    Date:'2019-08-26',
                },
                {
                    FileName:'条目10',
                    Date:'2019-08-26',
                },
                {
                    FileName:'条目11',
                    Date:'2019-08-19',
                },],
            tableData1: [
                {
                    FileName: 'xxx表', 
                    Date:'2019-09-09',
                },
                {
                    FileName: 'xxx表', 
                    Date:'2019-09-06',
                }],
            tableData2: [
                {
                    FileName: 'xxxx表', //文件名
                    Date:'2019-09-09',
                }],
            tableData3: [
                {
                    FileName: 'xxxx表', //文件名
                    Date:'2019-09-09',
                }],
            currentPage: 1,     //当前的页数
            pageSize: 10,       //每页的个数
            totalNumber: 0,   //总条数
            //创建一个总的data，这样只需加载一次请求
            allData: [
                [],[],[],[],[],[],[]
            ],
        }
    },
    props:[ 'tableData',],
    methods: {

        //获取每页的条数
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        //获取当前页
        handleCurrentChange(val) {
            this.currentPage = val;
            if(this.searchKey.length === 0)  this._getTabDownloadFiles(1);
            else{
                this.searchFileInTab(1);
            }    
            console.log(`当前页: ${val}`);
            console.log(this.searchKey.length);
        },
        //创建每类文件的的数量
        createNumberList(len){
            this.numberList = [];
            for(var i = 0; i < len; i++){
                this.numberList.push({
                    value: '',  //主计量
                    value1: ''  //辅助计量
                });
            }
        },
        //获取对应标签下的文件信息
        _getTabDownloadFiles(flag){
            this.tableData = [];
            var status = 0;
            if(flag !== 1){
                switch(this.chooseTab){
                    case '分类标签1':
                        if(this.allData[0].length !== 0){
                            this.tableData = this.allData[0];
                            this.totalNumber = this.tableData[0].total;
                            this.createNumberList(this.allData[0].length);
                            status = 0; 
                            return;
                        } 
                        break;
                    case '分类标签2':
                        if(this.allData[1].length !== 0){
                            this.tableData = this.allData[1];
                            this.totalNumber = this.tableData[1].total;
                            this.createNumberList(this.allData[1].length);
                            return;
                        }
                        status = 1;
                        break;
                    case '分类标签3':
                        if(this.allData[2].length !== 0){
                            this.tableData = this.allData[2];
                            this.totalNumber = this.tableData[2].total;
                            this.createNumberList(this.allData[2].length);
                            return;
                        }
                        status = 2;
                        break;
                    case '分类标签4':
                        if(this.allData[3].length !== 0){
                            this.tableData = this.allData[3];
                            this.totalNumber = this.tableData[3].total;
                            this.createNumberList(this.allData[3].length);
                            return;
                        }
                        status = 3;
                        break;
                }
                getAllDownloadFiles({
                    FileType: this.chooseTab,
                    FileName: this.searchKey.toUpperCase(),
                    limit: this.pageSize,
                    page: this.currentPage
                }).then(res =>{
                    console.log(res.data);
                    res.data = this.unique(res.data);
                    res.data = this.changeUnit(res.data);
                    this.allData[status] = res.data;
                    this.allNumber[status] = res.data[0].total;
                    this.totalNumber = this.allNumber[status];
                    this.tableData = this.allData[status];
                    this.createNumberList(this.tableData.length);
                }).catch( err =>{
                    console.log('暂无数据');
                })
            }
            else{
                switch(this.chooseTab){
                    case '分类标签1':
                        status = 0;    
                        break;
                    case '分类标签2':
                        status = 1;
                        break;
                    case '分类标签3':
                        status = 2;
                        break;
                    case '分类标签4':
                        status = 3;
                        break;
                }
                getAllDownloadFiles({
                    itemType: this.chooseTab,
                    cid: this.cid,
                    limit: this.pageSize,
                    page: this.currentPage
                }).then(res =>{
                    console.log(res.data);
                    res.data = this.unique(res.data);
                    res.data = this.changeUnit(res.data);
                    this.tableData = res.data;
                    this.totalNumber = this.allNumber[status];
                    this.createNumberList(this.tableData.length);
                }).catch( err =>{
                    console.log('暂无数据');
                })
            }
        }, 
        //某类文件的的模糊搜索
        searchFileInTab(flag){
            if(flag === 0)
                this.currentPage = 1;
            getSingleDownloadFile({
                FileType: this.chooseTab,
                FileName: this.searchKey.toUpperCase(),
                limit: this.pageSize,
                page: this.currentPage
            }).then(res =>{
                console.log(res);
                this.tableData = this.unique(res.data);
                this.tableData = this.changeUnit(this.tableData);
                this.totalNumber = this.tableData[0].total;
                this.createNumberList(this.tableData.length);
            }).catch(err =>{
                this.tableData = [];
                this.totalNumber = 0;
            });
        },
       //切换标签页时的触发事件
        handleClick(tab, event) {
            if(tab.name == this.chooseTab)  return ;
            this.chooseTab = tab.name;
            this.searchKey = '';
            this.currentPage = 1;
            console.log(this.chooseTab);
            Cookies.set('activeNameDownload', tab.name);
            this._getTabDownloadFiles(0);
            console.log(Cookies.get('activeNameDownload'));
        },
    },
    computed:{
        msg(){
            return this.tableData;
        },
        //获取当前的标签页选项
        activeName: {
            get(){
                if(Cookies.get('activeNameDownload') === undefined){
                    Cookies.set('activeNameDownload','所有');
                    this.chooseTab = Cookies.get('activeNameDownload');
                    this._getTabDownloadFiles(0);
                }
                else    this.chooseTab = Cookies.get('activeNameDownload');
                return Cookies.get('activeNameDownload');
            },
            set(value){
                Cookies.set('activeNameDownload',value);                
            }
        }
    },
    created(){
          
            if(Cookies.get('activeNameDownload') !== undefined)
            {
                 this.chooseTab = Cookies.get('activeNameDownload');
                 this._getTabDownloadFiles(0);
            }
    },
    }
</script>


<style scoped>
#DownloadSearchBox div:hover{
    cursor: pointer;
}
#searchBtn{
    color: #101010;
    cursor: pointer;
}
</style>