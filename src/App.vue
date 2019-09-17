<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  components: {},
  mounted() {
    window.onpopstate = () => {
      history.go(1);//阻止页面后退
      console.log('禁止后退')
    };
    // window.oncontextmenu = (e)=> {
    //     event.returnValue = false;//阻止右键菜单
    // };
  }
};
</script>

<style>
body {
  padding: 0;
  margin: 0;
}
#app {
  font-family: "PingFang SC", "Helvetica Neue", Helvetica, "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  border-left: 1px solid rgb(236, 245, 239);
  border-right: 1px solid rgb(236, 245, 239);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.el-scrollbar > div {
  margin-bottom: 0px !important;
}
.el-table__expand-icon--expanded {
  -webkit-transform: none !important;
  transform: none !important;
}
.el-table__expand-icon > .el-icon {
  position: inherit;
  left: 0%;
  top: 0%;
  margin-left: 0px;
  margin-top: 0px;
}
</style>
