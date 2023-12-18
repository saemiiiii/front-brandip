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
  <v-app>
    <v-container>
      <div style="position: relative; height: 100vh;">
        <div class="pt-10 text-center"
             style="display: flex; flex-direction: column; align-items: start; justify-content: center; height: 60vh">
          <div style="font-family: Inter; font-size: 30px; font-weight: 700;">본인 인증이</div>
          <div style="font-family: Inter; font-size: 30px; font-weight: 700;">필요해요.</div>
          <p style="font-family: Inter;font-size: 18px;font-weight: 700;">회원 정보 확인이 필요합니다.</p>
        </div>
        <div style="position: absolute; bottom: 30px; width: 100%; text-align: center;">
          <v-btn
              rounded
              color="primary"
              dark
              width="100%"
              @click="goIdentity"
              style="font-family: Inter; font-size: 16px; font-weight: 700;"
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