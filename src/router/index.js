import Vue from 'vue'
import store from '../store/index';
import Router from 'vue-router'
import Login from '@/components/login'
import Main from '@/components/main'
import WallPaper from '@/components/shops/wallPaper'
import Curtain from '@/components/shops/curtain'
import SoftSuit from '@/components/shops/softSuit'
import BankProof from '@/components/bankProof'
import painting from '@/components/painting'
import yulanPainting from '@/components/yulanPainting'
import DeputeBrush from '@/components/deputeBrush'
import DownloadSpace from '@/components/downloadSpace'
import MarketInfo from '@/components/marketInfo'
import RefundCompensation from '@/components/refundCompensation'
import Statement from '@/components/statement'
import Shopping from '@/components/shoppingCar/shopping'
import MyOrder from '@/components/order/myOrder'
import ImageShop from '@/components/design/imageShop'
import LanJu from '@/components/design/lanJu'
import DetailWallPaper from '@/components/detail/detailWallPaper'
import DetailCurtain from '@/components/detail/detailCurtain'
import DetailSoftSuit from '@/components/detail/detailSoftSuit'
import ShoppingCurtainDetail from '@/components/shops/shoppingCurtainDetail'
import orderDetail from '@/components/order/orderDetail'
import checkOrder from '@/components/order/checkOrder'
import shipment from '@/components/order/shipment'
import examine from '@/components/order/examine'
import ExamineDetail from '@/components/order/examineDetail'
import checkExamine from '@/components/order/checkExamine'
import myCoupon from '@/components/center/myCoupon'
import DetailRefund from '@/components/detail/detailRefund'
import notificationMain from '@/components/notification/notificationMain'
import Complaint from '@/components/complaint'
import ComplaintReply from '@/components/complaintReply'
import StockQuery from '@/components/query/stockQuery'
import AreaQuery from '@/components/query/areaQuery'
import OrderQuery from '@/components/query/orderQuery'
import SupplyPort from '@/components/supplierModule/supplyPort'
import Trans from '@/components/supplierModule/trans'
import ISExamineMarket from '@/components/design/ISExamineMarket'
import ISExamineGM from '@/components/design/ISExamineGM'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      component: Login,
      name: 'login'
    },
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '',
      redirect: '/login'
    },
    {
      path: '/main',
      name: 'main',
      component: Main,
      //redirect: '/shops/wallPaper',
      children: [
        {
          path: '/shops/curtain',
          name: 'curtain',
          component: Curtain,
          meta: {
            keepAlive: true
          }
        },
        {
          path: '/shops/wallPaper',
          name: 'wallPaper',
          component: WallPaper,
          meta: {
            keepAlive: true
          }
        },
        {
          path: '/shops/softSuit',
          name: 'softSuit',
          component: SoftSuit,
          meta: {
            keepAlive: true
          }
        },
        {
          path: '/shops/shoppingCurtainDetail',
          name: 'shoppingCurtainDetail',
          component: ShoppingCurtainDetail,
          meta: {
            returnMain: true//该页面刷新回到主界面
          }
        },
        {
          path: '/bankProof',
          name: 'bankProof',
          component: BankProof
        },
        {
          path: '/painting',
          name: 'painting',
          component: painting
        },
        {
          path: '/yulanPainting',
          name: 'yulanPainting',
          component: yulanPainting
        },
        {
          path: '/deputeBrush',
          name: 'deputeBrush',
          component: DeputeBrush
        },
        {
          path: '/downloadSpace',
          name: 'downloadSpace',
          component: DownloadSpace
        },
        {
          path: '/marketInfo',
          name: 'marketInfo',
          component: MarketInfo
        },
        {
          path: '/refundCompensation',
          name: 'refundCompensation',
          component: RefundCompensation,
          meta: {
            keepAlive: true
          }
        },
        {
          path: '/detail/detailRefund',
          name: 'detailRefund',
          component: DetailRefund,
          meta: {
            returnMain: true//该页面刷新回到主界面
          }
        },
        {
          path: '/statement',
          name: 'statement',
          component: Statement,
        },
        {
          path: '/shoppingCar/shopping',
          name: 'shopping',
          component: Shopping,
          meta: {
            returnMain: true//暂时用这个，该了后台再去掉
          }
        },
        {
          path: '/detail/detailCurtain',
          name: 'detailCurtain',
          component: DetailCurtain,
          meta: {
            returnMain: true//该页面刷新回到主界面
          }
        },
        {
          path: '/detail/detailSoftSuit',
          name: 'detailSoftSuit',
          component: DetailSoftSuit,
          meta: {
            returnMain: true//该页面刷新回到主界面
          }
        },
        {
          path: '/detail/detailWallPaper',
          name: 'detailWallPaper',
          component: DetailWallPaper,
          meta: {
            returnMain: true//该页面刷新回到主界面
          }
        },
        {
          path: '/order/myOrder',
          name: 'myOrder',
          component: MyOrder,
          meta: {
            keepAlive: true
          }
        },
        {
          path: '/design/imageShop',
          name: 'imageShop',
          component: ImageShop
        },
        {
          path: '/design/lanJu',
          name: 'lanJu',
          component: LanJu
        },
        {
          path: '/order/orderDetail',
          name: 'orderDetail',
          component: orderDetail,
          meta: {
            returnMain: true//该页面刷新回到主界面
          }
        },
        {
          path: '/order/examine',
          name: 'examine',
          component: examine,
          meta: {
            keepAlive: true
          }
        },
        {
          path: '/order/examineDetail',
          name: 'examineDetail',
          component: ExamineDetail,
          meta: {
            returnMain: true//该页面刷新回到主界面
          }
        },
        {
          path: '/order/checkExamine',
          name: 'checkExamine',
          component: checkExamine,
          meta: {
            returnMain: true//该页面刷新回到主界面
          }
        },
        {
          path: '/order/checkOrder',
          name: 'checkOrder',
          component: checkOrder,
          meta: {
            returnMain: true//该页面刷新回到主界面
          }
        },
        {
          path: '/order/shipment',
          name: 'shipment',
          component: shipment,
          meta: {
            returnMain: true//该页面刷新回到主界面
          }
        },
        {
          path: '/myZone/myCoupon',
          name: 'MyCoupon',
          component: myCoupon
        },
        {
          path: '/notification/notificationMain',
          name: 'notificationMain',
          component: notificationMain
        },
        {
          path: '/complaint',
          name: 'complaint',
          component: Complaint,
        },
        {
          path: '/complaintReply',
          name: 'complaintReply',
          component: ComplaintReply,
        },
        // 查询
        {
          path: '/query/stockQuery',
          name: 'stockQuery',
          component: StockQuery,
          meta: {
            keepAlive: true
          }
        },
        {
          path: '/query/areaQuery',
          name: 'areaQuery',
          component: AreaQuery,
          meta: {
            keepAlive: true
          }
        },
        {
          path: '/query/orderQuery',
          name: 'orderQuery',
          component: OrderQuery,
          meta: {
            keepAlive: true
          }
        },
        {
          path: '/supplierModule/trans',
          name: 'trans',
          component: Trans
        },
        {
          path: '/supplierModule/supplyPort',
          name: 'supplyPort',
          component: SupplyPort
        },
        {
          path: '/design/ISExamineMarket',
          name: 'ISExamineMarket',
          component: ISExamineMarket
        },
        {
          path: '/design/ISExamineGM',
          name: 'ISExamineGM',
          component: ISExamineGM
        },
      ]
    }
  ]
})
//解决刷新后点击tab报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

import Cookies from 'js-cookie'
//路由守卫
router.beforeEach((to, from, next) => {
  //console.log(to.meta.keepAlive ? true : false);
  if (!Cookies.get('cid') && !Cookies.get('customerType') && to.name != 'login') {//判断用户信息，不合法返回登陆界面
    next('/login')
  } else {
    if (from.path == '/' && to.meta.returnMain) {//如果是刷新判断是否需要回到主界面
      if (to.name == 'login' || to.name == 'main' || to.name == 'wallPaper') {
        next()
      }
      else {
        next('/main');
      }
    }
    else {//不是刷新
      next();
      history.pushState(null, null, location.href);//禁止后退，搭配APP.VUE里面的mounted
    }
  }

})

export default router;
