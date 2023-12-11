<template>
  <div>
    <div>
      <form action="https://secure.wowplanet.io/phone_popup2.php" method="post" name="form1">
        <input type="hidden" name="MDL_TKN" :value="MDL_TKN"/>
        <input type="hidden" name="CP_CD" :value="CP_CD"/>
        <input type="hidden" name="SITE_NAME" :value="SITE_NAME"/>
        <input type="hidden" name="RETURN_URL" :value="RETURN_URL"/>
        <input type="hidden" name="tc" value="kcb.oknm.online.safehscert.popup.cmd.P931_CertChoiceCmd"/>
        <button type="button" @click="jsSubmit">휴대폰 본인인증</button>
      </form>
    </div>
    <div>
      <form name="kcbResultForm" method="post">
        <input type="hidden" name="CP_CD"/>
        <input type="hidden" name="TX_SEQ_NO"/>
        <input type="hidden" name="RSLT_CD"/>
        <input type="hidden" name="RSLT_MSG"/>

        <input type="hidden" name="RSLT_NAME"/>
        <input type="hidden" name="RSLT_BIRTHDAY"/>
        <input type="hidden" name="RSLT_SEX_CD"/>
        <input type="hidden" name="RSLT_NTV_FRNR_CD"/>

        <input type="hidden" name="DI"/>
        <input type="hidden" name="CI"/>
        <input type="hidden" name="CI_UPDATE"/>
        <input type="hidden" name="TEL_COM_CD"/>
        <input type="hidden" name="TEL_NO"/>

        <input type="hidden" name="RETURN_MSG"/>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  // mounted() {
  // },

  data() {
    return {
      MDL_TKN: localStorage.getItem('token'), // mdl_tkn 값
      CP_CD: "V60960000000", // cp_CD 값
      SITE_NAME: "와우플래닛",
      RETURN_URL: "http://localhost:8080/identity",
      kcbData: {},
    };
  },
  methods: {
    jsSubmit() {
      // window.open("http://localhost:8080/tv", "auth_popup", "width=430,height=640,scrollbars=yes");
      window.open(
          'https://secure.wowplanet.io/phone_popup2.php',
          'auth_popup',
          'width=430,height=640,scrollbars=yes'
      )
      const form1 = document.form1;
      form1.target = "auth_popup";

      form1.submit();
    },
    startKCBAuthentication() {
      const redirectURL = "https://your-domain.com/kcb-redirect"; // 리다이렉트할 URL 설정
      // 여기에 KCB 인증 시작 및 설정 코드 작성
    }
  }
};
</script>

<style>
/* 필요한 스타일이 있다면 추가하세요 */
</style>










<!--잘모르겠음ㅋㅋ-->
<!--<template>-->
<!--  <div>-->
<!--    <h1>Encoding Information</h1>-->
<!--    <table border="0" cellpadding="3" width="100%">-->
<!--      <tr>-->
<!--        <td class="e" width="30%">Locale Default Encoding</td>-->
<!--        <td class="v">{{ defaultLocale }}</td>-->
<!--      </tr>-->
<!--      <tr>-->
<!--        <td class="e" width="30%">File Encoding</td>-->
<!--        <td class="v">{{ fileEncoding }}</td>-->
<!--      </tr>-->
<!--      <tr>-->
<!--        <td class="e" width="30%">OutputStreamWriter Encoding</td>-->
<!--        <td class="v">{{ outputStreamWriterEncoding }}</td>-->
<!--      </tr>-->
<!--    </table>-->

<!--    <div>-->
<!--      <form @submit.prevent="jsSubmit" name="form1" action="./Identity.vue" method="post">-->
<!--        <table>-->
<!--          <tr>-->
<!--            <td colspan="2"><strong>- 휴대폰 본인확인 인증</strong></td>-->
<!--          </tr>-->
<!--          <tr>-->
<!--            <td>회원사코드</td>-->
<!--            <td>-->
<!--              <input v-model="CP_CD" type="text" maxlength="12" size="16" />-->
<!--            </td>-->
<!--          </tr>-->
<!--          <tr>-->
<!--            <td>요청사이트명</td>-->
<!--            <td>-->
<!--              <input v-model="SITE_NAME" type="text" maxlength="20" size="24" />-->
<!--            </td>-->
<!--          </tr>-->
<!--          <tr>-->
<!--            <td colspan="2" align="center">-->
<!--              <button type="submit">휴대폰 본인확인</button>-->
<!--            </td>-->
<!--          </tr>-->
<!--        </table>-->
<!--      </form>-->
<!--    </div>-->

<!--    &lt;!&ndash; 휴대폰 본인확인 팝업 처리결과 정보 = phone_popup3 에서 값 입력 &ndash;&gt;-->
<!--    <form name="kcbResultForm" method="post">-->
<!--      <input type="hidden" v-model="CP_CD" />-->
<!--      <input type="hidden" v-model="TX_SEQ_NO" />-->
<!--      <input type="hidden" v-model="RSLT_CD" />-->
<!--      &lt;!&ndash; ... (나머지 필드들) &ndash;&gt;-->
<!--    </form>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      defaultLocale: java.util.Locale.getDefault(),-->
<!--      fileEncoding: System.getProperty("file.encoding"),-->
<!--      outputStreamWriterEncoding: new java.io.OutputStreamWriter(System.out).getEncoding(),-->
<!--      CP_CD: "V60960000000",-->
<!--      SITE_NAME: "와우플래닛",-->
<!--    };-->
<!--  },-->
<!--  methods: {-->
<!--    jsSubmit() {-->
<!--      window.open("", "auth_popup", "width=430,height=640,scrollbars=yes");-->
<!--      const form = document.forms[0];-->
<!--      form.target = "auth_popup";-->
<!--      form.submit();-->
<!--    },-->
<!--  },-->
<!--};-->
<!--</script>-->

<!--<style scoped>-->
<!--/* 필요한 CSS 스타일링을 작성하세요. */-->
<!--</style>-->


<!--이건토큰만 가져오면 될거같음-->
<!--<template>-->
<!--  &lt;!&ndash; index.html &ndash;&gt;-->
<!--  <div>-->
<!--    <div id="app">-->
<!--      <button @click="requestAuthentication">본인확인</button>-->
<!--    </div>-->

<!--  </div>-->
<!--</template>-->
<!--<script>-->
<!--export default {-->
<!--  methods: {-->
<!--    requestAuthentication() {-->
<!--      let xhr = new XMLHttpRequest();-->
<!--      xhr.open('POST', 'https://safe.ok-name.co.kr/CommonSvl', true);-->
<!--      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');-->

<!--      xhr.onload = function () {-->
<!--        if (xhr.status >= 200 && xhr.status < 400) {-->
<!--          var response = xhr.responseText;-->
<!--        } else {-->
<!--          console.error('오류 발생');-->
<!--        }-->
<!--      };-->

<!--      xhr.onerror = function () {-->
<!--        console.error('네트워크 오류');-->
<!--      };-->

<!--      let requestBody = 'cp_cd=V60960000000&mdl_tkn=0850231577b04485b5578cbe7e42ce3a';-->
<!--      xhr.send(requestBody);-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->







<!--<template>-->
<!--  <form ref="form1" action="https://safe.ok-name.co.kr/CommonSvl" method="post">-->
<!--    &lt;!&ndash; 인증 요청 정보 &ndash;&gt;-->
<!--    &lt;!&ndash;// 필수 항목 &ndash;&gt;-->
<!--    <input type="hidden" name="tc" value="kcb.oknm.online.safehscert.popup.cmd.P931_CertChoiceCmd"/> &lt;!&ndash; 변경불가&ndash;&gt;-->
<!--    <input type="hidden" name="cp_cd" v-model="cpCd" /> &lt;!&ndash; 회원사코드 &ndash;&gt;-->
<!--    <input type="hidden" name="mdl_tkn" v-model="mdlTkn" /> &lt;!&ndash; 토큰 &ndash;&gt;-->
<!--    <input type="hidden" name="target_id" value="" />-->
<!--    &lt;!&ndash; 필수 항목 //&ndash;&gt;-->
<!--    <input type="button" value="test" @click="submitForm" />-->
<!--  </form>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      cpCd: "V60960000000", // 회원사코드-->
<!--      mdlTkn: "0850231577b04485b5578cbe7e42ce3a", // 토큰-->
<!--    };-->
<!--  },-->
<!--  methods: {-->
<!--    submitForm() {-->
<!--      this.$refs.form1.submit();-->
<!--    },-->
<!--  },-->
<!--};-->
<!--</script>-->