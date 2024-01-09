<script>
export default {
  data() {
    return {
      dialog: true,
      message: `본인 인증 완료!`
    }
  },
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
              @click="$router.push('/profile').catch(()=>{})"
              style="font-family: Inter; font-size: 16px; font-weight: 700;"
              :width="$vuetify.breakpoint.width <= 1024 ? `100%` : `400px`"
              height="50"
              class="mb-5"
          >
            다음으로
          </v-btn>
        </div>
      </div>
      <div class="text-center">
        <v-dialog
            v-model="dialog"
            max-width="360"
        >
          <v-card height="145" style="border-radius: 15px">
            <v-card-text style="font-family: Inter;font-size: 20px;font-weight: 700;color: #000000" class="mt-5 text-center">
              {{ message }}
            </v-card-text>
            <v-card-actions class="mt-5">
              <v-btn
                  rounded
                  color="primary"
                  width="100%"
                  @click="$router.push('/profile').catch(()=>{})"
                  style="font-family: Inter;font-size: 17px;font-weight: 700;"
              >
                확인
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-container>
  </v-app>
</template>


<style>
.v-dialog__content--active {
  left: 230px;
  @media screen and (max-width: 1024px) {
    left: 0 !important;
  }
}

.v-dialog__content {
  left: 230px;
  @media screen and (max-width: 1024px) {
    left: 0 !important;
  }
}
</style>