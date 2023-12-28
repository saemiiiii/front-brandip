import axios from "axios";
import router from "@/router";

export default {
    namespaced: true,

    state: {
        token: null,
        user: {},
        type: null,
    },

    getters: {
        authenticated(state) {
            return state.token;
        },

        user(state) {
            return state.user;
        },

        type(state) {
            return state.type;
        },
    },

    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
        },

        SET_USER(state, data) {
            state.user = data;
        },

        SET_LOGIN_TYPE(state, data) {
            state.type = data;
        },
    },

    actions: {
        async login({commit, dispatch}, payload) {
            await axios.post("v1/signin/" + payload.provider, {token: payload.token}).then((res) => {
                commit("SET_LOGIN_TYPE", res.data.data.type)
                dispatch("attempt", res.data.data.accessToken);
            }).catch((err) => {
                if(err.response.data.resultCode) {
                    alert(err.response.data.message);
                    return false;
                }
            });
        },

        async refreshToken({dispatch}) {
            await axios.post("v1/auth/accesstoken").then((res) => {
                dispatch("attempt", res.data.data.accessToken);
            });

            // await axios.post('v1/auth/accesstoken', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': `Bearer ${localStorage.getItem('token')}`, // 리프레시 토큰을 헤더에 포함
            //     },
            // })
            //     .then(res => {
            //         const newAccessToken = res.data.data.accessToken;
            //         // 새로운 액세스 토큰을 사용하여 현재 사용 중인 토큰을 업데이트
            //         dispatch("attempt", newAccessToken);
            //     })
            //     .catch(error => {
            //         console.error(error);
            //         // 갱신 실패에 대한 처리
            //     });
        },
        async attempt({commit, state, dispatch}, token) {
            if (token) {
                commit("SET_TOKEN", token);
            }

            if (!state.token) {
                return;
            }

            await axios
                .get("v1/me")
                .then((res) => {
                    commit("SET_USER", res.data.data);
                })
                .catch((err) => {
                    if(localStorage.getItem(`token`) || err.response.status === 403) {
                        dispatch("logout");
                        return false;
                    } else {
                        router.push(`/`);
                    }
                });
        },

        async logout({commit}) {
            await axios.post("v1/auth/logout").then(() => {
                commit("SET_TOKEN", null);
                commit("SET_USER", {});
                localStorage.removeItem('token');
                localStorage.clear();
            })
        },
    },
};
