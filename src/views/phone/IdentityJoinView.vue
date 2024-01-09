<script>
export default {
  methods: {
    goIdentity() {
      this.$router.push({
        path: '/identity',
        query: {
          accessToken: localStorage.getItem(`token`)
        },
      }).catch(()=>{})
    }
  }
}
</script>

<template>
  <v-app style="background-color: #242424">
    <v-container>
      <div style="position: relative; height: 100vh;color: #FFFFFF;margin-left: 10px;margin-right: 10px;">
        <div class="pt-10 text-center"
             style="display: flex; flex-direction: column; align-items: start; justify-content: center; height: 60vh">
          <div style="font-family: Inter; font-size: 30px; font-weight: 700;">본인 인증이</div>
          <div style="font-family: Inter; font-size: 30px; font-weight: 700;">필요해요.</div>
          <p style="font-family: Inter;font-size: 20px;font-weight: 700;" class="mt-5">회원 정보 확인이 필요합니다.</p>
        </div>
        <div style="position: absolute; bottom: 30px; width: 100%; text-align: center;">
          <v-btn
              rounded
              color="primary"
              dark
              @click="goIdentity"
              style="font-family: Inter; font-size: 16px; font-weight: 700;"
              :width="$vuetify.breakpoint.width <= 1024 ? `100%` : `400px`"
              height="50"
              class="mb-5"
          >
            다음으로
          </v-btn>
        </div>
      </div>
    </v-container>
  </v-app>
</template>


<style scoped>

</style>