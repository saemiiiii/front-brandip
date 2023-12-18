import Vue from "vue";
import App from "@/App.vue";
import router from "./router"
import store from "@/store";
import axios from "axios";
import vuetify from "./plugins/vuetify";
import "@/assets/css/index.css";
import "@/assets/css/common.css";
import "@/assets/css/font.css";
require("@/store/subscriber");

Vue.config.productionTip = false;

// Object.defineProperty(Vue.prototype, "$moment", { value: moment });
window.axios = require("axios");
Vue.prototype.axios = window.axios;
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept-Language"] = "ko"//navigator.language;
axios.defaults.baseURL = process.env.VUE_APP_AXIOS_BASE_URL;
axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("token");

axios.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    // Do something with request error
    if (error.response.status === 403) {
        if(localStorage.removeItem('token')) {
            localStorage.removeItem('token');
            return false;
        } else {
            router.push(`/login`).catch(()=>{});
        }
    }
    // 요청 오류에 대한 처리
    return Promise.reject(error);
});

axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 403 || error.response.status === 401) {
            // 403 에러 처리
            if(localStorage.removeItem('token')) {
                localStorage.removeItem('token');
                return false;
            } else {
                router.push(`/login`).catch(()=>{});
            }
            // store.dispatch(`auth/refreshToken`);
            // 특정 동작 수행
        }
        return Promise.reject(error);
    }
);

// axios.interceptors.response.use(
//     function (response) {
//         return response;
//     },
    // function (error) {
    //     // if (error.response.status === 500) {
    //     //     store.dispatch("auth/logout");
    //     //     router.push({
    //     //         name: "Login",
    //     //     });
    //     // }
    //     if (error.response.status === 401) {
    //         store.dispatch("auth/logout");
    //         router.push({
    //             name: "Login",
    //         });
    //     }
    //     if (error.response.status) {
    //         // store.dispatch("auth/logout");
    //         // router.push({
    //         //     name: "Login",
    //         // });
    //     }
    //     return Promise.reject(error);
    // }
// );

store.dispatch("auth/attempt", localStorage.getItem("token")).then(() => {
    new Vue({
        router,
        store,
        vuetify,
        render: (h) => h(App),
        mounted() {
            window.Kakao.init(process.env.VUE_APP_NEXT_PUBLIC_KAKAO_JAVACRIPT_KEY);
        }
    }).$mount("#app");
});
