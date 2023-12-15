<script>
import axios from "axios";

export default {
  data() {
    return {
      PayMethod: ``,
      MID: process.env.VUE_APP_NEXT_DEV_INNO_MID,
      MerchantKey: process.env.VUE_APP_NEXT_DEV_PUBLIC_INNO_PAYMENTS_KEY,
      GoodsName: ``,
      Amt: ``,
      BuyerName: ``,
      BuyerTel: ``,
      BuyerEmail: ``,
      ResultYN: `N`,
      Moid: ``,
      BuyerHp: ``,
      ReturnURL: ``,
      Currency: ``,
      type: ``,
      accessToken: ``,
      dataLoaded: false,
    }
  },
  created() {
    this.handleSubmit();
  },
  mounted() {
    const script1 = document.createElement("script");

    script1.src = "https://pg.innopay.co.kr/ipay/js/jquery-2.1.4.min.js";
    script1.type = "text/javascript";
    script1.async = true;
    script1.onload = this.loadInnopayScript; // jQuery 로드 후 다음 스크립트 로드

    const script2 = document.createElement("script");
    script2.src = "https://pg.innopay.co.kr/ipay/js/innopay-epay.js";
    script2.type = "text/javascript";
    script2.async = true;
    document.head.appendChild(script1);
    document.head.appendChild(script2);

    setTimeout(() => {
      this.dataLoaded = true;
      this.requestPay();
    }, 2000); // 예시로 2초 후에 데이터 로드가 완료되었다고 가정
  },
  methods: {
    handleSubmit() {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      this.Moid = urlParams.get('moid');
      this.type = urlParams.get('type');
      this.accessToken = urlParams.get('accessToken');
      if (this.type === `1`) {
        this.PayMethod = 'EPAY';
      } else {
        this.PayMethod = 'CARD';
      }

      let header = {
        'Authorization': `Bearer ${this.accessToken}`
      };

      axios.get(`${process.env.VUE_APP_SERVICE_URL}v1/order?moid=${this.Moid}`, {
        headers: header
      })
          .then(res => {
            // 성공적으로 데이터를 가져왔을 때의 처리
            if (res.data.resultCode === 200) {
              this.GoodsName = res.data.data.goodsName;
              this.Amt = Number(res.data.data.amt);
              this.BuyerName = res.data.data.buyerName;
              this.BuyerTel = `01012345678`;
              this.BuyerEmail = res.data.data.buyerEmail;
              this.ReturnURL = res.data.data.returnURL;
              this.Moid = urlParams.get('moid');
              if (this.GoodsName && this.Amt && this.BuyerName && this.BuyerEmail && this.ReturnURL && this.BuyerTel) {
                this.dataLoaded = true;
              }
            }
          })
          .catch(error => {
            // 에러 발생 시의 처리
            console.error(error);
          });
    },
    requestPay() {
      innopay.goPayForm(document.getElementById('frm'));
    },
    // 결제결과 수신 Javascript 함수
    // ReturnURL이 없는 경우 아래 함수로 결과가 리턴됩니다 (함수명 변경불가!)
    innopay_result(data) {
      var a = JSON.stringify(data);
      // Sample
      var mid = data.MID;					// 가맹점 MID
      var tid = data.TID;					// 거래고유번호
      var amt = data.Amt;					// 금액
      var moid = data.MOID;				// 주문번호
      var authdate = data.AuthDate;		// 승인일자
      var authcode = data.AuthCode;		// 승인번호
      let resultcode = data.ResultCode;	// 결과코드(PG)
      var resultmsg = data.ResultMsg;		// 결과메세지(PG)
      var errorcode = data.ErrorCode;		// 에러코드(상위기관)
      var errormsg = data.ErrorMsg;		// 에러메세지(상위기관)
      var EPayCl = data.EPayCl;
      // alert("[" + resultcode + "]" + resultmsg);

      if (resultcode === 3001) {
        this.$router.push(`/wowcomplete`);
        window.postMessage(`success`);
      }
    },
    loadInnopayScript() {
      // jQuery 로드 후 실행할 로직
      const script3 = document.createElement("script");
      script3.src = "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js";
      script3.type = "text/javascript";
      script3.async = true;

      document.head.appendChild(script3);
      // 이후 로드한 스크립트를 사용하는 초기화 로직
    },
  }
}
</script>

<template>
  <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

    <!-- 샘플 HTML -->
    <title>INNOPAY 전자결제서비스</title>
  </head>
  <body id="app" style="display: flex; align-items: center; justify-content: center; height: 100vh;">
  <div class="mb-20" style="padding: 20px; max-width: 380px;">
    <v-layout align-center justify-center>
      <v-progress-circular
          :size="70"
          :width="10"
          indeterminate
          style="color: #FF1A77"
      ></v-progress-circular>
    </v-layout>
    <p class="mt-10" style="font-family: Inter;font-size: 25px;font-weight: 800;">결제중입니다.<br> 잠시만 기다려 주십시오</p>
  </div>
  </body>
  <body style="display: none">
  <div style="padding:20px;display:inline-block;max-width:380px;">
    <header>
      <h1 class="logo"><a href="http://web.innopay.co.kr/" target="_blank"><img
          src="https://pg.innopay.co.kr/ipay/images/innopay_logo.png" alt="INNOPAY 전자결제서비스 logo" height="26px"
          width="auto" border="0"></a></h1>
    </header>
    <article>
      <h2>쇼핑몰 결제요청 샘플 페이지</h2>
      <form action="" name="frm" id="frm" method="post">
        <table>
          <caption>쇼핑몰 결제요청 폼</caption>
          <tbody>
          <tr>
            <td class="title">
              <div><b>결제수단</b></div>
            </td>
            <td>
              <div id="pay_method">
                <select style="width:100%;" name="PayMethod" id="PayMethod" v-model="PayMethod">
                  <!-- 아래 각 결제수단별로 서비스를 신청하셔야 합니다 -->
                  <option value="CARD">신용카드(일반)</option>
                  <!--                <option value="BANK">계좌이체</option>-->
                  <!--                <option value="VBANK">무통장입금(가상계좌)</option>-->
                  <!--                <option value="CARS">ARSPAY Web LINK</option>-->
                  <!--                <option value="CSMS">SMS카드결제 Web LINK(인증)</option>-->
                  <!--                <option value="DSMS">SMS카드결제 Web LINK(수기)</option>-->
                  <option value="EPAY">간편결제</option>
                  <!--                <option value="EBANK">계좌간편결제</option>-->
                </select>
              </div>
            </td>
          </tr>
          <tr>
            <td class="title">
              <div><b>상점 MID</b></div>
            </td>
            <td class=''>
              <div>
                <input type="text" name="MID" value="" style="width:40%;" v-model="MID"> (발급받은 상점MID를 입력)
                <!-- <input type="text" name="MID" value="i00000001m" style="width:40%;"> (발급받은 상점MID를 입력) -->
              </div>
            </td>
          </tr>
          <!--        <tr>-->
          <!--          <td class="title"><div><b>상점 라이센스키</b></div></td>-->
          <!--          <td class=''>-->
          <!--            <div>-->
          <input type="hidden" style="width:100%;" name="MerchantKey" v-model="MerchantKey" value="">
          <input type="text" name="Moid" id="Moid" v-model="Moid" value="">
          <!-- 발급된 가맹점키 -->
          <!--            </div>-->
          <!--          </td>-->
          <!--        </tr>-->
          <tr>
            <td class="title">
              <div><b>상품명</b></div>
            </td>
            <td>
              <div>
                <input type="text" name="GoodsName" id="GoodsName" value="" v-model="GoodsName" placeholder="">
              </div>
            </td>
          </tr>
          <tr>
            <td class="title">
              <div><b>상품가격</b></div>
            </td>
            <td>
              <div>
                <input type="text" name="Amt" id="Amt" v-model="Amt"
                       onKeyUp="javascript:numOnly(this,document.frm,false);">
              </div>
            </td>
          </tr>
          <tr>
            <td class="title">
              <div><b>구매자명</b></div>
            </td>
            <td>
              <div>
                <input type="text" name="BuyerName" id="BuyerName" v-model="BuyerName" value="" placeholder="">
              </div>
            </td>
          </tr>
          <tr>
            <td class="title">
              <div><b>구매자 연락처</b></div>
            </td>
            <td>
              <div>
                <input type="text" name="BuyerTel" id="BuyerTel" v-model="BuyerTel" value="">
              </div>
            </td>
          </tr>
          <tr>
            <td class="title">
              <div><b>구매자 이메일 주소</b></div>
            </td>
            <td>
              <div>
                <input type="text" name="BuyerEmail" id="BuyerEmail" v-model="BuyerEmail" value="">
              </div>
            </td>
          </tr>
          <!--        <tr>-->
          <!--          <td class="title"><div><b>PG결제결과창 유무</b></div></td>-->
          <!--          <td class="">-->
          <!--            <div>-->
          <input type="hidden" name="ResultYN" value="" v-model="ResultYN" style="width:8%;">
          <!--            </div>-->
          <!--          </td>-->
          <!--        </tr>-->
          <tr height="10">
            <td></td>
            <td></td>
          </tr>
          <!-- 선택 파라미터 -->
          <tr>
            <td class="title">
              <div>결제결과전송 URL</div>
            </td>
            <td>
              <div>
                <input type="text" name="ReturnURL" id="ReturnURL" v-model="ReturnURL" value="" placeholder="">
                <br> (ReturnURL 이 없는 경우 현재페이지로 결제결과가 전송됩니다)
              </div>
            </td>
          </tr>
          </tbody>
        </table>
        <div align="center" style="height:50px;">
          <input type="button" class="btn_submit" name="btn_pay" value="결제요청" @click="requestPay">
        </div>
        <div style="height:10px;"></div>
      </form>
      <!-- End Form -->
    </article>
    <footer style="margin-top: 20px;">
      <ul class='lb'>
        <li>고객지원: 1688-1250</li>
        <li>
          <span>결제내역조회</span>
          <a href="http://web.innopay.co.kr/" title="결제내역조회 페이지 이동 ">web.innopay.co.kr</a>
        </li>
      </ul>
    </footer>
  </div>
  </body>
  </html>
</template>

<style>
body {
  margin: 0;
}

article h2 {
  display: block;
  width: 100%;
  font-size: 16px;
  text-align: center;
  margin-bottom: 20px;
}

form {
  width: 100%;
}

form table {
  padding: 20px 0 0 0px;
  width: 100%;
}

form td {
  padding: 0 0px 5px 0;
  text-align: left;
  font-size: 12px;
}

form td.title {
  width: 180px;
  font-size: 12px;
}

.hidden {
  height: 100%;
  min-height: 100%;
  overflow: hidden !important;
  touch-action: none;
}

form input {
  border: 1px solid #aaa;
  border-radius: 0;
  padding-left: 10px;
  width: 100%;
}

form .btn_submit {
  width: 150px;
  border-radius: 4px;
  padding: 0;
  margin: 20px 0;
  height: 30px;
  background-color: #1e5dd2;
  border: none;
  color: #fff;
  font-weight: bold;
  font-size: 12px;
}

.lb {
  font-size: 12px;
}

.logo {
  text-align: center;
  margin-bottom: 10px;
}

@media screen and (max-device-width: 736px) {
  form {
    width: 100%;
  }

  form input {
    width: 200px;
  }
}
</style>