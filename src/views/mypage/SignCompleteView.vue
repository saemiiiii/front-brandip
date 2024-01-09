<script>
import {mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user",
    }),
  },
}
</script>

<template>
  <v-app style="background-color: #242424">
    <v-container>
      <div class="text-center" style="color: #FFFFFF">
        <div class="mt-20 pt-16">
          <div class="mt-12 mb-12 text-center">
            <img src="@/assets/icons/ico-join-comp.png" class="mt-5 mb-5 mx-auto"/>
            <img src="@/assets/icons/ico-medium-brandip-logo.svg" class="mt-5 mb-5 mx-auto"/>
            <p style="font-family: Inter; font-size: 20px; font-weight: 700;">{{ this.user.nickname }}님 환영합니다!</p>
            <p style="font-family: Inter; font-size: 20px; font-weight: 400;">회원가입이 완료되었습니다.</p>
          </div>
        </div>
        <div class="mt-12 mb-12 text-center">
          <v-btn
              rounded
              color="primary"
              dark
              @click="$router.push(`/`)"
              style="font-family: Inter; font-size: 16px; font-weight: 700; width: 100%; max-width: 400px;"
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