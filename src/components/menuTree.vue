<template>
  <!-- 有子节点，用el-menu-item-group -->
  <el-submenu
    v-if="
      menuTreeItem.children &&
        menuTreeItem.children.length >= 1 &&
        menuTreeItem.MENU_TYPE == 'menu'
    "
    :index="menuTreeItem.MENU_LINK"
  >
    <template slot="title">
      <i
        v-if="
          menuTreeItem.ICON_CLASS != '' &&
            menuTreeItem.ICON_CLASS.indexOf('&') > -1
        "
        class="iconfont icon-color"
        v-html="menuTreeItem.ICON_CLASS"
        >{{ menuTreeItem.ICON_CLASS }}</i
      >
      <i
        v-else-if="
          menuTreeItem.ICON_CLASS != '' &&
            menuTreeItem.ICON_CLASS.indexOf('&') == -1
        "
        :class="menuTreeItem.ICON_CLASS"
      ></i>
      <span>{{ menuTreeItem.MENU_NAME }}</span>
    </template>
    <el-menu-item-group>
      <menuTree
        v-for="item in menuTreeItem.children"
        :key="item.SYSTEMMENU_ID"
        :menuTreeItem="item"
      ></menuTree>
    </el-menu-item-group>
  </el-submenu>
  <!-- 没有子节点，直接el-menu-item -->
  <router-link
    v-else-if="menuTreeItem.MENU_TYPE == 'menu'"
    :to="'/' + menuTreeItem.MENU_LINK"
    tag="div"
  >
    <el-menu-item
      :index="menuTreeItem.MENU_LINK"
      v-if="
        menuTreeItem.MENU_LINK != 'painting' &&
          menuTreeItem.MENU_LINK != 'refundCompensation'
      "
    >
      <i
        v-if="
          menuTreeItem.ICON_CLASS != '' &&
            menuTreeItem.ICON_CLASS.indexOf('&') > -1
        "
        class="iconfont icon-color"
        v-html="menuTreeItem.ICON_CLASS"
        >{{ menuTreeItem.ICON_CLASS }}</i
      >
      <i
        v-else-if="
          menuTreeItem.ICON_CLASS != '' &&
            menuTreeItem.ICON_CLASS.indexOf('&') == -1
        "
        :class="menuTreeItem.ICON_CLASS"
      ></i>
      <span>{{ menuTreeItem.MENU_NAME }}</span>
    </el-menu-item>
  </router-link>
</template>

<script>
export default {
  name: "menuTree",
  props: {
    menuTreeItem: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.el-menu i {
  font-size: 18px;
  margin: 0 10px;
}
.icon-color {
  color: #303133;
}
.el-menu-item-group span {
  margin-left: 20px;
}
.el-icon-goods {
  color: #303133;
}
.el-menu-item.is-active {
  background: #8bc34a;
  color: white;
}
</style>