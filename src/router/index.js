import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: `/`,
    name: `Home`,
    component: HomeView
  },
  {
    path: `/login`,
    name: `Login`,
    component: () => import(`../views/LoginView.vue`)
  },
  {
    path: `/product`,
    name: `ProductList`,
    component: () => import(`../views/products/ProductListView.vue`)
  },
  {
    path: `/product/:id`,
    name: `ProductShow`,
    component: () => import(`../views/products/ProductShowView.vue`)
  },
  {
    path: `/ip/:id`,
    name: `IpShow`,
    component: () => import(`../views/products/IpShowView.vue`)
  },
  {
    path: `/cart`,
    name: `CartList`,
    component: () => import(`../views/mypage/CartListView.vue`),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: `/search`,
    name: `ProductSearch`,
    component: () => import(`../views/products/ProductSearchView.vue`),
  },
  {
    path: `/orders`,
    name: `OrdersList`,
    component: () => import(`../views/mypage/OrdersListView.vue`),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: `/order`,
    name: `Order`,
    component: () => import(`../views/mypage/Order.vue`),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: `/orders/:id`,
    name: `OrderShow`,
    component: () => import(`../views/mypage/OrderShowView.vue`),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: `/ipay`,
    name: `Ipay`,
    component: () => import(`../views/mypage/IpayView.vue`),
  },
  {
    path: `/wowcomplete`,
    name: `WowComplete`,
    component: () => import(`../views/mypage/WowCompleteView.vue`),
  },
  {
    path: `/mypage`,
    name: `MyPage`,
    component: () => import(`../views/mypage/MyPageView.vue`),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: `/my-page-detail`,
    name: `MyPageDetail`,
    component: () => import(`../views/mypage/MyPageDetailView.vue`),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: `/delivery-add`,
    name: `DeliveryAdd`,
    component: () => import(`../views/mypage/DeliveryAddView.vue`),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: `/delivery`,
    name: `DeliveryList`,
    component: () => import(`../views/mypage/DeliveryListView.vue`),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: `/notice`,
    name: `NoticeList`,
    component: () => import(`../views/mypage/NoticeListView.vue`)
  },
  {
    path: `/faq`,
    name: `FaqList`,
    component: () => import(`../views/mypage/FaqListView.vue`)
  },
  {
    path: `/inquiry`,
    name: `Inquiry`,
    component: () => import(`../views/mypage/InquiryView.vue`)
  },
  {
    path: `/inquiry-list`,
    name: `InquiryList`,
    component: () => import(`../views/mypage/InquiryListView.vue`),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: `/quit`,
    name: `Quit`,
    component: () => import(`../views/mypage/QuitView.vue`),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: `/inquiry-add`,
    name: `InquiryAdd`,
    component: () => import(`../views/mypage/InquiryAddView.vue`),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: `/product-inquiry-add`,
    name: `ProductInquiryAdd`,
    component: () => import(`../views/products/ProductInquiryAddView.vue`),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: `/company`,
    name: `Company`,
    component: () => import(`../views/company/CompanyView.vue`)
  },
  {
    path: `/community`,
    name: `CommunityList`,
    component: () => import(`../views/community/CommunityListView.vue`),
  },
  {
    path: `/community-add`,
    name: `CommunityAdd`,
    component: () => import(`../views/community/CommunityAddView.vue`),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: `/community-report`,
    name: `CommunityReport`,
    component: () => import(`../views/community/CommunityReportView.vue`),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: `/community/:id`,
    name: `CommunityShow`,
    component: () => import(`../views/community/CommunityShowView.vue`),
  },
  {
    path: `/tv`,
    name: `Tv`,
    component: () => import(`../views/tv/TvListView.vue`)
  },
  {
    path: '/identity',
    name: 'Identity',
    component: () => import(`../views/phone/Identity.vue`)
  },
  {
    path: '/identity-join',
    name: 'IdentityJoin',
    component: () => import(`../views/phone/IdentityJoinView.vue`)
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(`../views/mypage/Profile.vue`)
  },
  {
    path: '/sign-complete',
    name: 'SignComplete',
    component: () => import(`../views/mypage/SignCompleteView.vue`)
  },
  {
    path: '/identity-complete',
    name: 'IdentityComplete',
    component: () => import(`../views/phone/IdentityCompleteView.vue`)
  },
  {
    path: '/service-terms',
    name: 'ServiceTerms',
    component: () => import(`../views/common/ServiceTermsView.vue`)
  },
  {
    path: '/privacy-terms',
    name: 'PrivacyTerms',
    component: () => import(`../views/common/PrivacyTermsView.vue`)
  },
]

const router = new VueRouter({
  routes,
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition && from.path === `/community`) {
      // 이전에 저장된 위치가 있는 경우 해당 위치로 스크롤
      return savedPosition;
    } else {
      // 저장된 위치가 없는 경우 페이지 상단으로 스크롤
      return { x: 0, y: 0 };
    }
  },
})

router.beforeEach((to, from, next) => {
  //headerBreadcrumb
  // store.commit("RESET_BREADCRUMB");
  if (to.matched.some((route) => route.meta.requiresAuth)) {
    if (!localStorage.getItem("token")) {
      return next({
        name: "Login",
      });
    }
  }
  next();
});
export default router
