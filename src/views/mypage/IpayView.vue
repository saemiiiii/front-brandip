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
      ResultYN: `Y`,
      Moid: ``,
      BuyerHp: ``,
      ReturnURL: ``,
      Currency: ``,
      type: ``,
      accessToken: ``,
    }
  },
  mounted() {
    this.handleSubmit();
  },
  methods: {
    handleSubmit() {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      this.Moid = urlParams.get('moid');
      this.type = urlParams.get('type');
      this.accessToken = urlParams.get('accessToken');
      const data = {data: 'success'};
      console.log(data);
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
            console.log('bbbb');
            console.log(res.data);
            if (res.data.resultCode === 200) {
              this.GoodsName = res.data.data.goodsName;
              this.Amt = Number(res.data.data.amt);
              this.BuyerName = res.data.data.buyerName;
              this.BuyerTel = res.data.data.buyerTel;
              this.BuyerEmail = res.data.data.buyerEmail;
              this.ReturnURL = res.data.data.returnURL;
              if(this.GoodsName && this.Amt && this.BuyerName && this.BuyerEmail && this.ReturnURL && this.BuyerTel) {
                innopay.goPay({
                      //// 필수 파라미터
                      PayMethod: this.PayMethod,		// 결제수단(CARD,BANK,VBANK,CARS,CSMS,DSMS,EPAY,EBANK)
                      MID: this.MID,							// 가맹점 MID
                      MerchantKey: this.MerchantKey,	// 가맹점 라이센스키
                      GoodsName: this.GoodsName,		// 상품명
                      Amt: Number(this.Amt),							// 결제금액(과세)
                      BuyerName: this.BuyerName,		// 고객명
                      BuyerTel: this.BuyerTel,				// 고객전화번호
                      BuyerEmail: this.BuyerEmail,			// 고객이메일
                      ResultYN: this.ResultYN,				// 결제결과창 출력유뮤
                      Moid: this.Moid,			// 가맹점에서 생성한 주문번호 셋팅
                      BuyerHp: this.BuyerTel,
                      //// 선택 파라미터
                      ReturnURL: this.ReturnURL,			// 결제결과 전송 URL(없는 경우 아래 innopay_result 함수에 결제결과가 전송됨)
                      Currency: ''										// 통화코드가 원화가 아닌 경우만 사용(KRW/USD)
                    }
                );
              }
            }
          })
          .catch(error => {
            // 에러 발생 시의 처리
            console.error(error);
          });
    },
    requestPay() {

    },
    // 결제결과 수신 Javascript 함수
    // ReturnURL이 없는 경우 아래 함수로 결과가 리턴됩니다 (함수명 변경불가!)
    innopay_result(data) {
      console.log(data);
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
      alert("[" + resultcode + "]" + resultmsg);
      console.log('결제완료');
      console.log("[" + resultcode + "]" + resultmsg)

      if (resultcode === 3001) {
        this.$router.push(`/wowcomplete`);
        window.postMessage(`success`);
      }
    }
  }
}
</script>

<template>
  <html>
  <body>
  <div style="padding:20px;display:inline-block;max-width:600px;">
    <header>
      <script type="application/javascript" src="https://pg.innopay.co.kr/ipay/js/jquery-2.1.4.min.js"></script>
      <script type="application/javascript" src="https://pg.innopay.co.kr/ipay/js/innopay-2.0.js"
              charset="utf-8"></script>
      <script type="application/javascript" src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
      <h1 class="logo"><a href="http://web.innopay.co.kr/" target="_blank"><img
          src="https://pg.innopay.co.kr/ipay/images/innopay_logo.png" alt="INNOPAY 전자결제서비스 logo" height="26px"
          width="auto" border="0"></a></h1>
    </header>
    <h1>쇼핑몰 결제요청 샘플 페이지</h1>
    <form action="" name="frm" id="frm" method="post">
      <!-- 나머지 폼 요소들 추가 -->
      <table>
        <caption>쇼핑몰 결제요청 폼</caption>
        <tbody>
        <tr>
          <td class="title">
            <div><b>결제수단</b></div>
          </td>
          <td>
            <div id="pay_method">
              <select style="width:100%;" name="PayMethod" v-model="PayMethod">
                <!-- 아래 각 결제수단별로 서비스를 신청하셔야 합니다 -->
                <option value="CARD">신용카드(일반)</option>
                <!--                <option value="BANK">계좌이체</option>-->
                <!--                <option value="VBANK">무통장입금(가상계좌)</option>-->
                <!--                <option value="CARS">ARSPAY Web LINK</option>-->
                <!--                <option value="CSMS">SMS카드결제 Web LINK(인증)</option>-->
                <!--                <option value="DSMS">SMS카드결제 Web LINK(수기)</option>-->
                <option value="EPAY" selected>간편결제</option>
                <!--                <option value="EBANK">계좌간편결제</option>-->
              </select>
            </div>
          </td>
        </tr>
        <!--        <tr>-->
        <!--          <input value="" id="type"/>-->
        <!--          <input value="" id="moid"/>-->
        <!--          <input value="" id="accessToken"/>-->
        <!--        </tr>-->
<!--        <tr>-->
<!--          <td class="title">-->
<!--            <div><b>상점 MID</b></div>-->
<!--          </td>-->
<!--          <td class=''>-->
<!--            <div>-->
              <input type="hidden" name="MID" v-model="MID" style="width:40%;">
<!--            </div>-->
<!--          </td>-->
<!--        </tr>-->
        <input type="hidden" style="width:100%;" name="MerchantKey" v-model="MerchantKey">
        <tr>
          <td class="title">
            <div><b>상품명</b></div>
          </td>
          <td>
            <div>
              <input type="text" name="GoodsName" v-model="GoodsName" value="" placeholder="">
            </div>
          </td>
        </tr>
        <tr>
          <td class="title">
            <div><b>상품가격</b></div>
          </td>
          <td>
            <div>
              <input type="number" name="Amt" v-model="Amt" value="">
            </div>
          </td>
        </tr>
        <tr>
          <td class="title">
            <div><b>구매자명</b></div>
          </td>
          <td>
            <div>
              <input type="text" name="BuyerName" v-model="BuyerName" value="" placeholder="">
            </div>
          </td>
        </tr>
        <tr>
          <td class="title">
            <div><b>구매자 연락처</b></div>
          </td>
          <td>
            <div>
              <input type="text" name="BuyerTel" v-model="BuyerTel" value="">
            </div>
          </td>
        </tr>
        <tr>
          <td class="title">
            <div><b>구매자 이메일 주소</b></div>
          </td>
          <td>
            <div>
              <input type="text" name="BuyerEmail" v-model="BuyerEmail" value="">
            </div>
          </td>
        </tr>
        <input type="hidden" name="ResultYN" v-model="ResultYN" style="width:8%;">
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
              <input type="text" name="ReturnURL" v-model="ReturnURL" value="" placeholder="">
              <br> (ReturnURL 이 없는 경우 현재페이지로 결제결과가 전송됩니다)
            </div>
          </td>
        </tr>
        </tbody>
      </table>
      <div style="height:50px;">
        <input type="button" class="btn_submit" name="btn_pay" value="결제요청" @click="requestPay">
      </div>
      <div style="height:10px;"></div>
    </form>
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