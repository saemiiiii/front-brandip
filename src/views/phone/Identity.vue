<script>
export default {
  data() {
    return {
      MDL_TKN: localStorage.getItem('token'), // mdl_tkn 값
      CP_CD: "V60960000000", // cp_CD 값
      SITE_NAME: "와우플래닛",
      RETURN_URL: "http://192.168.0.81:8080/tv",
      kcbData: {},
    }
  },
  mounted() {

  },
  methods: {
    jsSubmit() {
      window.open("", "auth_popup", "width=430,height=640,scrollbars=yes");
      const form1 = document.form1;
      form1.target = "auth_popup";
      form1.submit();
    },
  }
};
</script>
<template>
  <v-app>
    <v-container>
      <div>
        <div class="mt-10 mb-10 text-left">
          <p class="text-xl font-bold">본인 인증이</p>
          <p class="text-xl font-bold">필요해요.</p>
          <p class="font-bold text-sm">회원 정보 확인이 필요합니다.</p>
        </div>
        <div>
          <v-btn> 본인인증</v-btn>
          <v-btn
              rounded
              color="primary"
              dark
              width="100%"
              @click="$router.push('/profile')"
          >
            다음으로
          </v-btn>
        </div>

        <form action="https://secure.wowplanet.io/phone_popup2.php" method="post" name="form1">
          <input type="hidden" name="MDL_TKN" :value="MDL_TKN"/>
          <input type="hidden" name="CP_CD" :value="CP_CD"/>
          <input type="hidden" name="SITE_NAME" :value="SITE_NAME"/>
          <input type="hidden" name="RETURN_URL" :value="RETURN_URL"/>
          <input type="hidden" name="tc" value="kcb.oknm.online.safehscert.popup.cmd.P931_CertChoiceCmd"/>
          <button type="button" @click="jsSubmit">휴대폰 본인인증</button>
        </form>
      </div>
    </v-container>
  </v-app>
</template>

