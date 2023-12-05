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
    path: `/product/:id`,
    name: `ProductShow`,
    component: () => import(`../views/products/ProductShowView.vue`)
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
    path: `/order`,
    name: `Order`,
    component: () => import(`../views/mypage/Order.vue`),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: `/ipay`,
    name: `Ipay`,
    component: () => import(`../views/mypage/IpayView.vue`),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: `/wowcomplete`,
    name: `Complete`,
    component: () => import(`../views/mypage/CompleteView.vue`),
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
    component: () => import(`../views/mypage/InquiryListView.vue`)
  },
  {
    path: `/inquiry-add`,
    name: `InquiryAdd`,
    component: () => import(`../views/mypage/InquiryAddView.vue`)
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
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: `/tv`,
    name: `Tv`,
    component: () => import(`../views/tv/TvView.vue`)
  },
  {
    path: '/identity',
    name: 'Identity',
    component: () => import(`../views/phone/Identity.vue`)
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
  mode: "history"
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
