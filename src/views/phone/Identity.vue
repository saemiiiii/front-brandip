<script>
import axios from "axios";

export default {
  data() {
    return {
      kcbData: {},
      mobile: {},
    }
  },
  created() {
    this.getAuthMobile();
  },
  mounted() {
    setTimeout(() => {
      this.jsSubmit();
    }, 2000);
  },
  methods: {
    jsSubmit() {
      // window.open("", "auth_popup", "width=430,height=640,scrollbars=yes");
      // const form1 = document.form1;
      // form1.target = "auth_popup";
      // form1.submit();
      try {
        document.form1.action = "https://safe.ok-name.co.kr/CommonSvl";
        document.form1.method = "post";
        document.form1.submit();
      } catch (err) {
        this.$router.go(-1);
      }
    },
    getAuthMobile() {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const accessToken = urlParams.get('accessToken');
      let header = {
        'Authorization': `Bearer ${accessToken}`
      };
      axios.get(`v1/auth/mobile`, {
        headers: header
      })
          .then(res => {
            this.mobile = res.data.data;
          })
          .catch(err => {
            console.error(err);
          })
    }
  }
};
</script>
<template>
  <v-app>
    <v-container>
      <div class="text-center">
        <form method="post" name="form1">
          <input type="hidden" name="mdl_tkn" :value="mobile.mdl_tkn"/>
          <input type="hidden" name="cp_cd" :value="mobile.cp_cd"/>
          <input type="hidden" name="tc" :value="mobile.tc"/>
          <input type="hidden" name="target_id" value=""/>
        </form>
      </div>
    </v-container>
  </v-app>
</template>

