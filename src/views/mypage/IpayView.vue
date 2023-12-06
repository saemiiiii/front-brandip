<!--&lt;!&ndash;<script>&ndash;&gt;-->
<!--&lt;!&ndash;import axios from "axios";&ndash;&gt;-->

<!--&lt;!&ndash;export default {&ndash;&gt;-->
<!--&lt;!&ndash;  data() {&ndash;&gt;-->
<!--&lt;!&ndash;    return {&ndash;&gt;-->
<!--&lt;!&ndash;      PayMethod: ``,&ndash;&gt;-->
<!--&lt;!&ndash;      MID: process.env.VUE_APP_NEXT_DEV_INNO_MID,&ndash;&gt;-->
<!--&lt;!&ndash;      MerchantKey: process.env.VUE_APP_NEXT_DEV_PUBLIC_INNO_PAYMENTS_KEY,&ndash;&gt;-->
<!--&lt;!&ndash;      GoodsName: ``,&ndash;&gt;-->
<!--&lt;!&ndash;      Amt: ``,&ndash;&gt;-->
<!--&lt;!&ndash;      BuyerName: ``,&ndash;&gt;-->
<!--&lt;!&ndash;      BuyerTel: ``,&ndash;&gt;-->
<!--&lt;!&ndash;      BuyerEmail: ``,&ndash;&gt;-->
<!--&lt;!&ndash;      ResultYN: `Y`,&ndash;&gt;-->
<!--&lt;!&ndash;      Moid: ``,&ndash;&gt;-->
<!--&lt;!&ndash;      BuyerHp: ``,&ndash;&gt;-->
<!--&lt;!&ndash;      ReturnURL: ``,&ndash;&gt;-->
<!--&lt;!&ndash;      Currency: ``,&ndash;&gt;-->
<!--&lt;!&ndash;      type: ``,&ndash;&gt;-->
<!--&lt;!&ndash;      accessToken: ``,&ndash;&gt;-->
<!--&lt;!&ndash;    }&ndash;&gt;-->
<!--&lt;!&ndash;  },&ndash;&gt;-->
<!--&lt;!&ndash;  mounted() {&ndash;&gt;-->
<!--&lt;!&ndash;    // const script1 = document.createElement("script");&ndash;&gt;-->
<!--&lt;!&ndash;    // script1.src = "https://pg.innopay.co.kr/ipay/js/jquery-2.1.4.min.js";&ndash;&gt;-->
<!--&lt;!&ndash;    // script1.type = "text/javascript";&ndash;&gt;-->
<!--&lt;!&ndash;    // script1.async = true;&ndash;&gt;-->
<!--&lt;!&ndash;    // script1.onload = this.loadInnopayScript; // jQuery 로드 후 다음 스크립트 로드&ndash;&gt;-->
<!--&lt;!&ndash;    //&ndash;&gt;-->
<!--&lt;!&ndash;    // const script2 = document.createElement("script");&ndash;&gt;-->
<!--&lt;!&ndash;    // script2.src = "https://pg.innopay.co.kr/ipay/js/innopay-2.0.js";&ndash;&gt;-->
<!--&lt;!&ndash;    // script2.type = "text/javascript";&ndash;&gt;-->
<!--&lt;!&ndash;    // script2.async = true;&ndash;&gt;-->

<!--&lt;!&ndash;    // document.head.appendChild(script1);&ndash;&gt;-->
<!--&lt;!&ndash;    // document.head.appendChild(script2);&ndash;&gt;-->

<!--&lt;!&ndash;    this.handleSubmit();&ndash;&gt;-->
<!--&lt;!&ndash;  },&ndash;&gt;-->
<!--&lt;!&ndash;  methods: {&ndash;&gt;-->
<!--&lt;!&ndash;    handleSubmit() {&ndash;&gt;-->
<!--&lt;!&ndash;      const queryString = window.location.search;&ndash;&gt;-->
<!--&lt;!&ndash;      const urlParams = new URLSearchParams(queryString);&ndash;&gt;-->
<!--&lt;!&ndash;      this.Moid = urlParams.get('moid');&ndash;&gt;-->
<!--&lt;!&ndash;      this.type = urlParams.get('type');&ndash;&gt;-->
<!--&lt;!&ndash;      this.accessToken = urlParams.get('accessToken');&ndash;&gt;-->
<!--&lt;!&ndash;      const data = {data: 'success'};&ndash;&gt;-->
<!--&lt;!&ndash;      console.log(data);&ndash;&gt;-->
<!--&lt;!&ndash;      if (this.type === `1`) {&ndash;&gt;-->
<!--&lt;!&ndash;        this.PayMethod = 'EPAY';&ndash;&gt;-->
<!--&lt;!&ndash;      } else {&ndash;&gt;-->
<!--&lt;!&ndash;        this.PayMethod = 'CARD';&ndash;&gt;-->
<!--&lt;!&ndash;      }&ndash;&gt;-->

<!--&lt;!&ndash;      let header = {&ndash;&gt;-->
<!--&lt;!&ndash;        'Authorization': `Bearer ${this.accessToken}`&ndash;&gt;-->
<!--&lt;!&ndash;      };&ndash;&gt;-->

<!--&lt;!&ndash;      axios.get(`${process.env.VUE_APP_SERVICE_URL}v1/order?moid=${this.Moid}`, {&ndash;&gt;-->
<!--&lt;!&ndash;        headers: header&ndash;&gt;-->
<!--&lt;!&ndash;      })&ndash;&gt;-->
<!--&lt;!&ndash;          .then(res => {&ndash;&gt;-->
<!--&lt;!&ndash;            // 성공적으로 데이터를 가져왔을 때의 처리&ndash;&gt;-->
<!--&lt;!&ndash;            console.log('bbbb');&ndash;&gt;-->
<!--&lt;!&ndash;            console.log(res.data.data);&ndash;&gt;-->
<!--&lt;!&ndash;            if (res.data.resultCode === 200) {&ndash;&gt;-->
<!--&lt;!&ndash;              this.GoodsName = res.data.data.goodsName;&ndash;&gt;-->
<!--&lt;!&ndash;              this.Amt = Number(res.data.data.amt);&ndash;&gt;-->
<!--&lt;!&ndash;              this.BuyerName = res.data.data.buyerName;&ndash;&gt;-->
<!--&lt;!&ndash;              this.BuyerTel = `01012345678`;&ndash;&gt;-->
<!--&lt;!&ndash;              this.BuyerEmail = res.data.data.buyerEmail;&ndash;&gt;-->
<!--&lt;!&ndash;              this.ReturnURL = res.data.data.returnURL;&ndash;&gt;-->
<!--&lt;!&ndash;              // if (this.GoodsName && this.Amt && this.BuyerName && this.BuyerEmail && this.ReturnURL && this.BuyerTel) {&ndash;&gt;-->
<!--&lt;!&ndash;              //   console.log('페이실행')&ndash;&gt;-->
<!--&lt;!&ndash;              //   this.requestPay();&ndash;&gt;-->
<!--&lt;!&ndash;              // }&ndash;&gt;-->
<!--&lt;!&ndash;            }&ndash;&gt;-->
<!--&lt;!&ndash;          })&ndash;&gt;-->
<!--&lt;!&ndash;          .catch(error => {&ndash;&gt;-->
<!--&lt;!&ndash;            // 에러 발생 시의 처리&ndash;&gt;-->
<!--&lt;!&ndash;            console.error(error);&ndash;&gt;-->
<!--&lt;!&ndash;          });&ndash;&gt;-->
<!--&lt;!&ndash;    },&ndash;&gt;-->
<!--&lt;!&ndash;    requestPay() {&ndash;&gt;-->
<!--&lt;!&ndash;      // innopay.goPay({&ndash;&gt;-->
<!--&lt;!&ndash;      //       //// 필수 파라미터&ndash;&gt;-->
<!--&lt;!&ndash;      //       PayMethod: this.PayMethod,		// 결제수단(CARD,BANK,VBANK,CARS,CSMS,DSMS,EPAY,EBANK)&ndash;&gt;-->
<!--&lt;!&ndash;      //       MID: this.MID,							// 가맹점 MID&ndash;&gt;-->
<!--&lt;!&ndash;      //       MerchantKey: this.MerchantKey,	// 가맹점 라이센스키&ndash;&gt;-->
<!--&lt;!&ndash;      //       GoodsName: this.GoodsName,		// 상품명&ndash;&gt;-->
<!--&lt;!&ndash;      //       Amt: this.Amt,							// 결제금액(과세)&ndash;&gt;-->
<!--&lt;!&ndash;      //       BuyerName: this.BuyerName,		// 고객명&ndash;&gt;-->
<!--&lt;!&ndash;      //       BuyerTel: this.BuyerTel,				// 고객전화번호&ndash;&gt;-->
<!--&lt;!&ndash;      //       BuyerEmail: this.BuyerEmail,			// 고객이메일&ndash;&gt;-->
<!--&lt;!&ndash;      //       ResultYN: this.ResultYN,				// 결제결과창 출력유뮤&ndash;&gt;-->
<!--&lt;!&ndash;      //       Moid: this.Moid,			// 가맹점에서 생성한 주문번호 셋팅&ndash;&gt;-->
<!--&lt;!&ndash;      //       BuyerHp: this.BuyerTel,&ndash;&gt;-->
<!--&lt;!&ndash;      //       //// 선택 파라미터&ndash;&gt;-->
<!--&lt;!&ndash;      //       ReturnURL: this.ReturnURL,			// 결제결과 전송 URL(없는 경우 아래 innopay_result 함수에 결제결과가 전송됨)&ndash;&gt;-->
<!--&lt;!&ndash;      //       Currency: ''										// 통화코드가 원화가 아닌 경우만 사용(KRW/USD)&ndash;&gt;-->
<!--&lt;!&ndash;      //     }&ndash;&gt;-->
<!--&lt;!&ndash;      // );&ndash;&gt;-->
<!--&lt;!&ndash;      innopay.goPay({&ndash;&gt;-->
<!--&lt;!&ndash;            //// 필수 파라미터&ndash;&gt;-->
<!--&lt;!&ndash;            PayMethod: frm.PayMethod.value,		// 결제수단(CARD,BANK,VBANK,CARS,CSMS,DSMS,EPAY,EBANK)&ndash;&gt;-->
<!--&lt;!&ndash;            MID: frm.MID.value,							// 가맹점 MID&ndash;&gt;-->
<!--&lt;!&ndash;            MerchantKey: frm.MerchantKey.value,	// 가맹점 라이센스키&ndash;&gt;-->
<!--&lt;!&ndash;            GoodsName: this.GoodsName,		// 상품명&ndash;&gt;-->
<!--&lt;!&ndash;            Amt: this.Amt,							// 결제금액(과세)&ndash;&gt;-->
<!--&lt;!&ndash;            BuyerName: frm.BuyerName.value,		// 고객명&ndash;&gt;-->
<!--&lt;!&ndash;            BuyerTel: frm.BuyerTel.value,				// 고객전화번호&ndash;&gt;-->
<!--&lt;!&ndash;            BuyerEmail: frm.BuyerEmail.value,			// 고객이메일&ndash;&gt;-->
<!--&lt;!&ndash;            ResultYN: frm.ResultYN.value,				// 결제결과창 출력유뮤&ndash;&gt;-->
<!--&lt;!&ndash;            Moid: this.Moid,			// 가맹점에서 생성한 주문번호 셋팅&ndash;&gt;-->
<!--&lt;!&ndash;            BuyerHp: frm.BuyerTel.value,&ndash;&gt;-->
<!--&lt;!&ndash;            //// 선택 파라미터&ndash;&gt;-->
<!--&lt;!&ndash;            ReturnURL: frm.ReturnURL.value,			// 결제결과 전송 URL(없는 경우 아래 innopay_result 함수에 결제결과가 전송됨)&ndash;&gt;-->
<!--&lt;!&ndash;//			ArsConnType:'02', 							///* ARS 결제 연동시 필수 01:호전환, 02(가상번호), 03:대표번호 */&ndash;&gt;-->

<!--&lt;!&ndash;//			FORWARD:'',									// 결제창 연동방식 (X:레이어, 기본값)&ndash;&gt;-->
<!--&lt;!&ndash;//			GoodsCnt:'',									// 상품갯수 (가맹점 참고용)&ndash;&gt;-->
<!--&lt;!&ndash;//			MallReserved:'',								// 가맹점 데이터&ndash;&gt;-->
<!--&lt;!&ndash;//			OfferingPeriod:'',								// 제공기간&ndash;&gt;-->
<!--&lt;!&ndash;//			DutyFreeAmt:'',								// 결제금액(복합과세/면세 가맹점의 경우 금액설정)&ndash;&gt;-->
<!--&lt;!&ndash;//			EncodingType:'utf-8',						// 가맹점 서버 인코딩 타입 (utf-8, euc-kr)&ndash;&gt;-->
<!--&lt;!&ndash;//			MallIP:'',											// 가맹점 서버 IP&ndash;&gt;-->
<!--&lt;!&ndash;//			UserIP:'',											// 고객 PC IP&ndash;&gt;-->
<!--&lt;!&ndash;//			mallUserID:'',									// 가맹점 고객ID&ndash;&gt;-->
<!--&lt;!&ndash;//			User_ID:'',										// Innopay에 등록된 영업사원ID&ndash;&gt;-->
<!--&lt;!&ndash;            Currency: ''										// 통화코드가 원화가 아닌 경우만 사용(KRW/USD)&ndash;&gt;-->
<!--&lt;!&ndash;          }&ndash;&gt;-->
<!--&lt;!&ndash;      );&ndash;&gt;-->
<!--&lt;!&ndash;    },&ndash;&gt;-->
<!--&lt;!&ndash;    // 결제결과 수신 Javascript 함수&ndash;&gt;-->
<!--&lt;!&ndash;    // ReturnURL이 없는 경우 아래 함수로 결과가 리턴됩니다 (함수명 변경불가!)&ndash;&gt;-->
<!--&lt;!&ndash;    innopay_result(data) {&ndash;&gt;-->
<!--&lt;!&ndash;      console.log(data);&ndash;&gt;-->
<!--&lt;!&ndash;      var a = JSON.stringify(data);&ndash;&gt;-->
<!--&lt;!&ndash;      // Sample&ndash;&gt;-->
<!--&lt;!&ndash;      var mid = data.MID;					// 가맹점 MID&ndash;&gt;-->
<!--&lt;!&ndash;      var tid = data.TID;					// 거래고유번호&ndash;&gt;-->
<!--&lt;!&ndash;      var amt = data.Amt;					// 금액&ndash;&gt;-->
<!--&lt;!&ndash;      var moid = data.MOID;				// 주문번호&ndash;&gt;-->
<!--&lt;!&ndash;      var authdate = data.AuthDate;		// 승인일자&ndash;&gt;-->
<!--&lt;!&ndash;      var authcode = data.AuthCode;		// 승인번호&ndash;&gt;-->
<!--&lt;!&ndash;      let resultcode = data.ResultCode;	// 결과코드(PG)&ndash;&gt;-->
<!--&lt;!&ndash;      var resultmsg = data.ResultMsg;		// 결과메세지(PG)&ndash;&gt;-->
<!--&lt;!&ndash;      var errorcode = data.ErrorCode;		// 에러코드(상위기관)&ndash;&gt;-->
<!--&lt;!&ndash;      var errormsg = data.ErrorMsg;		// 에러메세지(상위기관)&ndash;&gt;-->
<!--&lt;!&ndash;      var EPayCl = data.EPayCl;&ndash;&gt;-->
<!--&lt;!&ndash;      alert("[" + resultcode + "]" + resultmsg);&ndash;&gt;-->
<!--&lt;!&ndash;      console.log('결제완료');&ndash;&gt;-->
<!--&lt;!&ndash;      console.log("[" + resultcode + "]" + resultmsg)&ndash;&gt;-->

<!--&lt;!&ndash;      if (resultcode === 3001) {&ndash;&gt;-->
<!--&lt;!&ndash;        this.$router.push(`/wowcomplete`);&ndash;&gt;-->
<!--&lt;!&ndash;        window.postMessage(`success`);&ndash;&gt;-->
<!--&lt;!&ndash;      }&ndash;&gt;-->
<!--&lt;!&ndash;    },&ndash;&gt;-->
<!--&lt;!&ndash;    loadInnopayScript() {&ndash;&gt;-->
<!--&lt;!&ndash;      // jQuery 로드 후 실행할 로직&ndash;&gt;-->
<!--&lt;!&ndash;      const script3 = document.createElement("script");&ndash;&gt;-->
<!--&lt;!&ndash;      script3.src = "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js";&ndash;&gt;-->
<!--&lt;!&ndash;      script3.type = "text/javascript";&ndash;&gt;-->
<!--&lt;!&ndash;      script3.async = true;&ndash;&gt;-->

<!--&lt;!&ndash;      document.head.appendChild(script3);&ndash;&gt;-->

<!--&lt;!&ndash;      // 이후 로드한 스크립트를 사용하는 초기화 로직&ndash;&gt;-->
<!--&lt;!&ndash;    },&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->
<!--&lt;!&ndash;</script>&ndash;&gt;-->

<!--&lt;!&ndash;<template>&ndash;&gt;-->
<!--&lt;!&ndash;  <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">&ndash;&gt;-->
<!--&lt;!&ndash;  <html>&ndash;&gt;-->
<!--&lt;!&ndash;  <head>&ndash;&gt;-->
<!--&lt;!&ndash;    <meta charset="utf-8">&ndash;&gt;-->
<!--&lt;!&ndash;    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">&ndash;&gt;-->

<!--&lt;!&ndash;    &lt;!&ndash; 샘플 HTML &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;    <title>INNOPAY 전자결제서비스</title>&ndash;&gt;-->
<!--&lt;!&ndash;  </head>&ndash;&gt;-->
<!--&lt;!&ndash;  <body>&ndash;&gt;-->
<!--&lt;!&ndash;  <div style="padding:20px;display:inline-block;max-width:600px;">&ndash;&gt;-->
<!--&lt;!&ndash;    <header>&ndash;&gt;-->
<!--&lt;!&ndash;      <h1 class="logo"><a href="http://web.innopay.co.kr/" target="_blank"><img&ndash;&gt;-->
<!--&lt;!&ndash;          src="https://pg.innopay.co.kr/ipay/images/innopay_logo.png" alt="INNOPAY 전자결제서비스 logo" height="26px"&ndash;&gt;-->
<!--&lt;!&ndash;          width="auto" border="0"></a></h1>&ndash;&gt;-->
<!--&lt;!&ndash;    </header>&ndash;&gt;-->
<!--&lt;!&ndash;    <article>&ndash;&gt;-->
<!--&lt;!&ndash;      <h2>쇼핑몰 결제요청 샘플 페이지</h2>&ndash;&gt;-->
<!--&lt;!&ndash;      <form action="" name="frm" id="frm" method="post">&ndash;&gt;-->
<!--&lt;!&ndash;        <table>&ndash;&gt;-->
<!--&lt;!&ndash;          <caption>쇼핑몰 결제요청 폼</caption>&ndash;&gt;-->
<!--&lt;!&ndash;          <tbody>&ndash;&gt;-->
<!--&lt;!&ndash;          <tr>&ndash;&gt;-->
<!--&lt;!&ndash;            <td class="title">&ndash;&gt;-->
<!--&lt;!&ndash;              <div><b>결제수단</b></div>&ndash;&gt;-->
<!--&lt;!&ndash;            </td>&ndash;&gt;-->
<!--&lt;!&ndash;            <td>&ndash;&gt;-->
<!--&lt;!&ndash;              <div id="pay_method">&ndash;&gt;-->
<!--&lt;!&ndash;                <select style="width:100%;" name="PayMethod" id="PayMethod">&ndash;&gt;-->
<!--&lt;!&ndash;                  &lt;!&ndash; 아래 각 결제수단별로 서비스를 신청하셔야 합니다 &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;                  <option value="CARD">신용카드(일반)</option>&ndash;&gt;-->
<!--&lt;!&ndash;                  &lt;!&ndash;                <option value="BANK">계좌이체</option>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;                  &lt;!&ndash;                <option value="VBANK">무통장입금(가상계좌)</option>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;                  &lt;!&ndash;                <option value="CARS">ARSPAY Web LINK</option>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;                  &lt;!&ndash;                <option value="CSMS">SMS카드결제 Web LINK(인증)</option>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;                  &lt;!&ndash;                <option value="DSMS">SMS카드결제 Web LINK(수기)</option>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;                  <option value="EPAY">간편결제</option>&ndash;&gt;-->
<!--&lt;!&ndash;                  &lt;!&ndash;                <option value="EBANK">계좌간편결제</option>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;                </select>&ndash;&gt;-->
<!--&lt;!&ndash;              </div>&ndash;&gt;-->
<!--&lt;!&ndash;            </td>&ndash;&gt;-->
<!--&lt;!&ndash;          </tr>&ndash;&gt;-->
<!--&lt;!&ndash;          <tr>&ndash;&gt;-->
<!--&lt;!&ndash;            <td class="title">&ndash;&gt;-->
<!--&lt;!&ndash;              <div><b>상점 MID</b></div>&ndash;&gt;-->
<!--&lt;!&ndash;            </td>&ndash;&gt;-->
<!--&lt;!&ndash;            <td class=''>&ndash;&gt;-->
<!--&lt;!&ndash;              <div>&ndash;&gt;-->
<!--&lt;!&ndash;                <input type="text" name="MID" value="testpay01m" style="width:40%;"> (발급받은 상점MID를 입력)&ndash;&gt;-->
<!--&lt;!&ndash;                &lt;!&ndash; <input type="text" name="MID" value="i00000001m" style="width:40%;"> (발급받은 상점MID를 입력) &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;              </div>&ndash;&gt;-->
<!--&lt;!&ndash;            </td>&ndash;&gt;-->
<!--&lt;!&ndash;          </tr>&ndash;&gt;-->
<!--&lt;!&ndash;          &lt;!&ndash;        <tr>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;          &lt;!&ndash;          <td class="title"><div><b>상점 라이센스키</b></div></td>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;          &lt;!&ndash;          <td class=''>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;          &lt;!&ndash;            <div>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;          <input type="hidden" style="width:100%;" name="MerchantKey"&ndash;&gt;-->
<!--&lt;!&ndash;                 value="Ma29gyAFhvv/+e4/AHpV6pISQIvSKziLIbrNoXPbRS5nfTx2DOs8OJve+NzwyoaQ8p9Uy1AN4S1I0Um5v7oNUg==">&ndash;&gt;-->
<!--&lt;!&ndash;          &lt;!&ndash; 발급된 가맹점키 &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;          &lt;!&ndash;            </div>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;          &lt;!&ndash;          </td>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;          &lt;!&ndash;        </tr>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;          <tr>&ndash;&gt;-->
<!--&lt;!&ndash;            <td class="title">&ndash;&gt;-->
<!--&lt;!&ndash;              <div><b>상품명</b></div>&ndash;&gt;-->
<!--&lt;!&ndash;            </td>&ndash;&gt;-->
<!--&lt;!&ndash;            <td>&ndash;&gt;-->
<!--&lt;!&ndash;              <div>&ndash;&gt;-->
<!--&lt;!&ndash;                <input type="text" name="GoodsName" id="GoodsName" value="" v-model="GoodsName" placeholder="">&ndash;&gt;-->
<!--&lt;!&ndash;              </div>&ndash;&gt;-->
<!--&lt;!&ndash;            </td>&ndash;&gt;-->
<!--&lt;!&ndash;          </tr>&ndash;&gt;-->
<!--&lt;!&ndash;          <tr>&ndash;&gt;-->
<!--&lt;!&ndash;            <td class="title">&ndash;&gt;-->
<!--&lt;!&ndash;              <div><b>상품가격</b></div>&ndash;&gt;-->
<!--&lt;!&ndash;            </td>&ndash;&gt;-->
<!--&lt;!&ndash;            <td>&ndash;&gt;-->
<!--&lt;!&ndash;              <div>&ndash;&gt;-->
<!--&lt;!&ndash;                <input type="text" name="Amt" id="Amt" v-model="Amt" onKeyUp="javascript:numOnly(this,document.frm,false);">&ndash;&gt;-->
<!--&lt;!&ndash;              </div>&ndash;&gt;-->
<!--&lt;!&ndash;            </td>&ndash;&gt;-->
<!--&lt;!&ndash;          </tr>&ndash;&gt;-->
<!--&lt;!&ndash;          <tr>&ndash;&gt;-->
<!--&lt;!&ndash;            <td class="title">&ndash;&gt;-->
<!--&lt;!&ndash;              <div><b>구매자명</b></div>&ndash;&gt;-->
<!--&lt;!&ndash;            </td>&ndash;&gt;-->
<!--&lt;!&ndash;            <td>&ndash;&gt;-->
<!--&lt;!&ndash;              <div>&ndash;&gt;-->
<!--&lt;!&ndash;                <input type="text" name="BuyerName" id="BuyerName" v-model="BuyerName" value="" placeholder="">&ndash;&gt;-->
<!--&lt;!&ndash;              </div>&ndash;&gt;-->
<!--&lt;!&ndash;            </td>&ndash;&gt;-->
<!--&lt;!&ndash;          </tr>&ndash;&gt;-->
<!--&lt;!&ndash;          <tr>&ndash;&gt;-->
<!--&lt;!&ndash;            <td class="title">&ndash;&gt;-->
<!--&lt;!&ndash;              <div><b>구매자 연락처</b></div>&ndash;&gt;-->
<!--&lt;!&ndash;            </td>&ndash;&gt;-->
<!--&lt;!&ndash;            <td>&ndash;&gt;-->
<!--&lt;!&ndash;              <div>&ndash;&gt;-->
<!--&lt;!&ndash;                <input type="text" name="BuyerTel" id="BuyerTel" v-model="BuyerTel" value="">&ndash;&gt;-->
<!--&lt;!&ndash;              </div>&ndash;&gt;-->
<!--&lt;!&ndash;            </td>&ndash;&gt;-->
<!--&lt;!&ndash;          </tr>&ndash;&gt;-->
<!--&lt;!&ndash;          <tr>&ndash;&gt;-->
<!--&lt;!&ndash;            <td class="title">&ndash;&gt;-->
<!--&lt;!&ndash;              <div><b>구매자 이메일 주소</b></div>&ndash;&gt;-->
<!--&lt;!&ndash;            </td>&ndash;&gt;-->
<!--&lt;!&ndash;            <td>&ndash;&gt;-->
<!--&lt;!&ndash;              <div>&ndash;&gt;-->
<!--&lt;!&ndash;                <input type="text" name="BuyerEmail" id="BuyerEmail" v-model="BuyerEmail" value="">&ndash;&gt;-->
<!--&lt;!&ndash;              </div>&ndash;&gt;-->
<!--&lt;!&ndash;            </td>&ndash;&gt;-->
<!--&lt;!&ndash;          </tr>&ndash;&gt;-->
<!--&lt;!&ndash;          &lt;!&ndash;        <tr>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;          &lt;!&ndash;          <td class="title"><div><b>PG결제결과창 유무</b></div></td>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;          &lt;!&ndash;          <td class="">&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;          &lt;!&ndash;            <div>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;          <input type="hidden" name="ResultYN" value="" v-model="ResultYN" style="width:8%;">&ndash;&gt;-->
<!--&lt;!&ndash;          &lt;!&ndash;            </div>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;          &lt;!&ndash;          </td>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;          &lt;!&ndash;        </tr>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;          <tr height="10">&ndash;&gt;-->
<!--&lt;!&ndash;            <td></td>&ndash;&gt;-->
<!--&lt;!&ndash;            <td></td>&ndash;&gt;-->
<!--&lt;!&ndash;          </tr>&ndash;&gt;-->
<!--&lt;!&ndash;          &lt;!&ndash; 선택 파라미터 &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;          <tr>&ndash;&gt;-->
<!--&lt;!&ndash;            <td class="title">&ndash;&gt;-->
<!--&lt;!&ndash;              <div>결제결과전송 URL</div>&ndash;&gt;-->
<!--&lt;!&ndash;            </td>&ndash;&gt;-->
<!--&lt;!&ndash;            <td>&ndash;&gt;-->
<!--&lt;!&ndash;              <div>&ndash;&gt;-->
<!--&lt;!&ndash;                <input type="text" name="ReturnURL" id="ReturnURL" v-model="ReturnURL" value="" placeholder="">&ndash;&gt;-->
<!--&lt;!&ndash;                <br> (ReturnURL 이 없는 경우 현재페이지로 결제결과가 전송됩니다)&ndash;&gt;-->
<!--&lt;!&ndash;              </div>&ndash;&gt;-->
<!--&lt;!&ndash;            </td>&ndash;&gt;-->
<!--&lt;!&ndash;          </tr>&ndash;&gt;-->
<!--&lt;!&ndash;          </tbody>&ndash;&gt;-->
<!--&lt;!&ndash;        </table>&ndash;&gt;-->
<!--&lt;!&ndash;        <div align="center" style="height:50px;">&ndash;&gt;-->
<!--&lt;!&ndash;          <input type="button" class="btn_submit" name="btn_pay" value="결제요청" @click="requestPay">&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--&lt;!&ndash;        <div style="height:10px;"></div>&ndash;&gt;-->
<!--&lt;!&ndash;      </form>&ndash;&gt;-->
<!--&lt;!&ndash;      &lt;!&ndash; End Form &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;    </article>&ndash;&gt;-->
<!--&lt;!&ndash;    <footer style="margin-top: 20px;">&ndash;&gt;-->
<!--&lt;!&ndash;      <ul class='lb'>&ndash;&gt;-->
<!--&lt;!&ndash;        <li>고객지원: 1688-1250</li>&ndash;&gt;-->
<!--&lt;!&ndash;        <li>&ndash;&gt;-->
<!--&lt;!&ndash;          <span>결제내역조회</span>&ndash;&gt;-->
<!--&lt;!&ndash;          <a href="http://web.innopay.co.kr/" title="결제내역조회 페이지 이동 ">web.innopay.co.kr</a>&ndash;&gt;-->
<!--&lt;!&ndash;        </li>&ndash;&gt;-->
<!--&lt;!&ndash;      </ul>&ndash;&gt;-->
<!--&lt;!&ndash;    </footer>&ndash;&gt;-->
<!--&lt;!&ndash;  </div>&ndash;&gt;-->
<!--&lt;!&ndash;  </body>&ndash;&gt;-->
<!--&lt;!&ndash;  </html>&ndash;&gt;-->
<!--&lt;!&ndash;</template>&ndash;&gt;-->

<!--&lt;!&ndash;<style>&ndash;&gt;-->
<!--&lt;!&ndash;body {&ndash;&gt;-->
<!--&lt;!&ndash;  margin: 0;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;article h2 {&ndash;&gt;-->
<!--&lt;!&ndash;  display: block;&ndash;&gt;-->
<!--&lt;!&ndash;  width: 100%;&ndash;&gt;-->
<!--&lt;!&ndash;  font-size: 16px;&ndash;&gt;-->
<!--&lt;!&ndash;  text-align: center;&ndash;&gt;-->
<!--&lt;!&ndash;  margin-bottom: 20px;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;form {&ndash;&gt;-->
<!--&lt;!&ndash;  width: 100%;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;form table {&ndash;&gt;-->
<!--&lt;!&ndash;  padding: 20px 0 0 0px;&ndash;&gt;-->
<!--&lt;!&ndash;  width: 100%;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;form td {&ndash;&gt;-->
<!--&lt;!&ndash;  padding: 0 0px 5px 0;&ndash;&gt;-->
<!--&lt;!&ndash;  text-align: left;&ndash;&gt;-->
<!--&lt;!&ndash;  font-size: 12px;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;form td.title {&ndash;&gt;-->
<!--&lt;!&ndash;  width: 180px;&ndash;&gt;-->
<!--&lt;!&ndash;  font-size: 12px;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;.hidden {&ndash;&gt;-->
<!--&lt;!&ndash;  height: 100%;&ndash;&gt;-->
<!--&lt;!&ndash;  min-height: 100%;&ndash;&gt;-->
<!--&lt;!&ndash;  overflow: hidden !important;&ndash;&gt;-->
<!--&lt;!&ndash;  touch-action: none;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;form input {&ndash;&gt;-->
<!--&lt;!&ndash;  border: 1px solid #aaa;&ndash;&gt;-->
<!--&lt;!&ndash;  border-radius: 0;&ndash;&gt;-->
<!--&lt;!&ndash;  padding-left: 10px;&ndash;&gt;-->
<!--&lt;!&ndash;  width: 100%;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;form .btn_submit {&ndash;&gt;-->
<!--&lt;!&ndash;  width: 150px;&ndash;&gt;-->
<!--&lt;!&ndash;  border-radius: 4px;&ndash;&gt;-->
<!--&lt;!&ndash;  padding: 0;&ndash;&gt;-->
<!--&lt;!&ndash;  margin: 20px 0;&ndash;&gt;-->
<!--&lt;!&ndash;  height: 30px;&ndash;&gt;-->
<!--&lt;!&ndash;  background-color: #1e5dd2;&ndash;&gt;-->
<!--&lt;!&ndash;  border: none;&ndash;&gt;-->
<!--&lt;!&ndash;  color: #fff;&ndash;&gt;-->
<!--&lt;!&ndash;  font-weight: bold;&ndash;&gt;-->
<!--&lt;!&ndash;  font-size: 12px;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;.lb {&ndash;&gt;-->
<!--&lt;!&ndash;  font-size: 12px;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;.logo {&ndash;&gt;-->
<!--&lt;!&ndash;  text-align: center;&ndash;&gt;-->
<!--&lt;!&ndash;  margin-bottom: 10px;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;@media screen and (max-device-width: 736px) {&ndash;&gt;-->
<!--&lt;!&ndash;  form {&ndash;&gt;-->
<!--&lt;!&ndash;    width: 100%;&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->

<!--&lt;!&ndash;  form input {&ndash;&gt;-->
<!--&lt;!&ndash;    width: 200px;&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->
<!--&lt;!&ndash;</style>&ndash;&gt;-->
<!--<template>-->
<!--<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">-->
<!--<html>-->
<!--<head>-->
<!--  <meta charset="utf-8">-->
<!--  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">-->

<!--  &lt;!&ndash; InnoPay 결제연동 스크립트(필수) &ndash;&gt;-->
<!--  &lt;!&ndash; <script type="text/javascript" src="./js/innopay-2.0.js" charset="utf-8"></script> &ndash;&gt;-->
<!--  <script type="text/javascript">-->
<!--    jQuery(document).ready(function () {-->
<!--      const queryString = window.location.search;-->
<!--      const urlParams = new URLSearchParams(queryString);-->
<!--      const moid = urlParams.get('moid');-->
<!--      const type = urlParams.get('type');-->
<!--      const accessToken = urlParams.get('accessToken');-->
<!--      $("#type").val(type)-->
<!--      $("#moid").val(moid)-->
<!--      $("#accessToken").val(accessToken)-->
<!--      const data = {data: `success`}-->
<!--      console.log(data);-->
<!--      let header = {-->
<!--        'Authorization': `Bearer ${accessToken}`-->
<!--        // 다른 헤더도 필요하다면 추가할 수 있습니다.-->
<!--      };-->
<!--      axios.get(`http://192.168.0.77:9100/v1/order?moid=${moid}`, {-->
<!--        headers: header-->
<!--      })-->
<!--          .then(res => {-->
<!--            // 성공적으로 데이터를 가져왔을 때의 처리-->
<!--            console.log(res.data);-->
<!--            if (res.data.resultCode === 200) {-->
<!--              let payType = ``;-->
<!--              if (type === "1") {-->
<!--                payType = `EPAY`;-->
<!--              } else {-->
<!--                payType = `CARD`;-->
<!--              }-->
<!--              $(`#PayMethod`).val(payType);-->
<!--              $(`#GoodsName`).val(res.data.data.goodsName);-->
<!--              $(`#Amt`).val(Number(res.data.data.amt));-->
<!--              $(`#BuyerName`).val(res.data.data.buyerName);-->
<!--              $(`#BuyerTel`).val(`01023451234`);-->
<!--              $(`#BuyerEmail`).val(res.data.data.buyerEmail);-->
<!--              $(`#ReturnURL`).val(res.data.data.returnURL);-->

<!--              innopay.goPay({-->
<!--                    //// 필수 파라미터-->
<!--                    PayMethod: frm.PayMethod.value,		// 결제수단(CARD,BANK,VBANK,CARS,CSMS,DSMS,EPAY,EBANK)-->
<!--                    MID: frm.MID.value,							// 가맹점 MID-->
<!--                    MerchantKey: frm.MerchantKey.value,	// 가맹점 라이센스키-->
<!--                    GoodsName: frm.GoodsName.value,		// 상품명-->
<!--                    Amt: frm.Amt.value,							// 결제금액(과세)-->
<!--                    BuyerName: frm.BuyerName.value,		// 고객명-->
<!--                    BuyerTel: frm.BuyerTel.value,				// 고객전화번호-->
<!--                    BuyerEmail: frm.BuyerEmail.value,			// 고객이메일-->
<!--                    ResultYN: frm.ResultYN.value,				// 결제결과창 출력유뮤-->
<!--                    Moid: moid,			// 가맹점에서 생성한 주문번호 셋팅-->
<!--                    BuyerHp: frm.BuyerTel.value,-->
<!--                    //// 선택 파라미터-->
<!--                    ReturnURL: frm.ReturnURL.value,			// 결제결과 전송 URL(없는 경우 아래 innopay_result 함수에 결제결과가 전송됨)-->
<!--//			ArsConnType:'02', 							///* ARS 결제 연동시 필수 01:호전환, 02(가상번호), 03:대표번호 */-->

<!--//			FORWARD:'',									// 결제창 연동방식 (X:레이어, 기본값)-->
<!--//			GoodsCnt:'',									// 상품갯수 (가맹점 참고용)-->
<!--//			MallReserved:'',								// 가맹점 데이터-->
<!--//			OfferingPeriod:'',								// 제공기간-->
<!--//			DutyFreeAmt:'',								// 결제금액(복합과세/면세 가맹점의 경우 금액설정)-->
<!--//			EncodingType:'utf-8',						// 가맹점 서버 인코딩 타입 (utf-8, euc-kr)-->
<!--//			MallIP:'',											// 가맹점 서버 IP-->
<!--//			UserIP:'',											// 고객 PC IP-->
<!--//			mallUserID:'',									// 가맹점 고객ID-->
<!--//			User_ID:'',										// Innopay에 등록된 영업사원ID-->
<!--                    Currency: ''										// 통화코드가 원화가 아닌 경우만 사용(KRW/USD)-->
<!--                  }-->
<!--              );-->
<!--            }-->
<!--          })-->
<!--          .catch(error => {-->
<!--            // 에러 발생 시의 처리-->
<!--            console.error(error);-->
<!--          });-->


<!--      // jQuery("input[name=btn_pay]").click(function () {-->
<!--      // 결제요청 함수-->

<!--      // });-->
<!--    });-->

<!--    /**-->
<!--     * 결제결과 수신 Javascript 함수-->
<!--     * ReturnURL이 없는 경우 아래 함수로 결과가 리턴됩니다 (함수명 변경불가!)-->
<!--     */-->
<!--    function innopay_result(data) {-->
<!--      var a = JSON.stringify(data);-->
<!--      // Sample-->
<!--      var mid = data.MID;					// 가맹점 MID-->
<!--      var tid = data.TID;					// 거래고유번호-->
<!--      var amt = data.Amt;					// 금액-->
<!--      var moid = data.MOID;				// 주문번호-->
<!--      var authdate = data.AuthDate;		// 승인일자-->
<!--      var authcode = data.AuthCode;		// 승인번호-->
<!--      var resultcode = data.ResultCode;	// 결과코드(PG)-->
<!--      var resultmsg = data.ResultMsg;		// 결과메세지(PG)-->
<!--      var errorcode = data.ErrorCode;		// 에러코드(상위기관)-->
<!--      var errormsg = data.ErrorMsg;		// 에러메세지(상위기관)-->
<!--      var EPayCl = data.EPayCl;-->
<!--      alert("[" + resultcode + "]" + resultmsg);-->
<!--      // const data = {data : `success`}-->
<!--      if (resultcode === 3001) {-->
<!--        window.location.href = `/wowcomplete`;-->
<!--        // window.postMessage(data);-->
<!--      }-->
<!--    }-->
<!--  </script>-->

<!--  &lt;!&ndash; 샘플 HTML &ndash;&gt;-->
<!--  <title>INNOPAY 전자결제서비스</title>-->
<!--</head>-->
<!--<body>-->
<!--<div style="padding:20px;display:inline-block;max-width:600px; display: none">-->
<!--  <header>-->
<!--    <h1 class="logo"><a href="http://web.innopay.co.kr/" target="_blank"><img-->
<!--        src="https://pg.innopay.co.kr/ipay/images/innopay_logo.png" alt="INNOPAY 전자결제서비스 logo" height="26px"-->
<!--        width="auto" border="0"></a></h1>-->
<!--  </header>-->
<!--  <article>-->
<!--    &lt;!&ndash;        <h2>쇼핑몰 결제요청 샘플 페이지</h2>&ndash;&gt;-->
<!--    <form action="" name="frm" id="frm" method="post">-->
<!--      <table>-->
<!--        <caption>쇼핑몰 결제요청 폼</caption>-->
<!--        <tbody>-->
<!--        <tr>-->
<!--          <td class="title" class="title">-->
<!--            <div><b>결제수단</b></div>-->
<!--          </td>-->
<!--          <td>-->
<!--            <div id="pay_method">-->
<!--              <select style="width:100%;" name="PayMethod" id="PayMethod">-->
<!--                &lt;!&ndash; 아래 각 결제수단별로 서비스를 신청하셔야 합니다 &ndash;&gt;-->
<!--                <option value="CARD">신용카드(일반)</option>-->
<!--                &lt;!&ndash;                <option value="BANK">계좌이체</option>&ndash;&gt;-->
<!--                &lt;!&ndash;                <option value="VBANK">무통장입금(가상계좌)</option>&ndash;&gt;-->
<!--                &lt;!&ndash;                <option value="CARS">ARSPAY Web LINK</option>&ndash;&gt;-->
<!--                &lt;!&ndash;                <option value="CSMS">SMS카드결제 Web LINK(인증)</option>&ndash;&gt;-->
<!--                &lt;!&ndash;                <option value="DSMS">SMS카드결제 Web LINK(수기)</option>&ndash;&gt;-->
<!--                <option value="EPAY">간편결제</option>-->
<!--                &lt;!&ndash;                <option value="EBANK">계좌간편결제</option>&ndash;&gt;-->
<!--              </select>-->
<!--            </div>-->
<!--          </td>-->
<!--        </tr>-->
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
<!--              <input type="text" name="MID" value="testpay01m" style="width:40%;"> (발급받은 상점MID를 입력)-->
<!--              &lt;!&ndash; <input type="text" name="MID" value="i00000001m" style="width:40%;"> (발급받은 상점MID를 입력) &ndash;&gt;-->
<!--            </div>-->
<!--          </td>-->
<!--        </tr>-->
<!--        &lt;!&ndash;        <tr>&ndash;&gt;-->
<!--        &lt;!&ndash;          <td class="title"><div><b>상점 라이센스키</b></div></td>&ndash;&gt;-->
<!--        &lt;!&ndash;          <td class=''>&ndash;&gt;-->
<!--        &lt;!&ndash;            <div>&ndash;&gt;-->
<!--        <input type="hidden" style="width:100%;" name="MerchantKey"-->
<!--               value="Ma29gyAFhvv/+e4/AHpV6pISQIvSKziLIbrNoXPbRS5nfTx2DOs8OJve+NzwyoaQ8p9Uy1AN4S1I0Um5v7oNUg==">-->
<!--        &lt;!&ndash; 발급된 가맹점키 &ndash;&gt;-->
<!--        &lt;!&ndash;            </div>&ndash;&gt;-->
<!--        &lt;!&ndash;          </td>&ndash;&gt;-->
<!--        &lt;!&ndash;        </tr>&ndash;&gt;-->
<!--        <tr>-->
<!--          <td class="title" class="title">-->
<!--            <div><b>상품명</b></div>-->
<!--          </td>-->
<!--          <td>-->
<!--            <div>-->
<!--              <input type="text" name="GoodsName" id="GoodsName" value="" placeholder="">-->
<!--            </div>-->
<!--          </td>-->
<!--        </tr>-->
<!--        <tr>-->
<!--          <td class="title">-->
<!--            <div><b>상품가격</b></div>-->
<!--          </td>-->
<!--          <td>-->
<!--            <div>-->
<!--              <input type="text" name="Amt" id="Amt" value=""-->
<!--                     onKeyUp="javascript:numOnly(this,document.frm,false);">-->
<!--            </div>-->
<!--          </td>-->
<!--        </tr>-->
<!--        <tr>-->
<!--          <td class="title">-->
<!--            <div><b>구매자명</b></div>-->
<!--          </td>-->
<!--          <td>-->
<!--            <div>-->
<!--              <input type="text" name="BuyerName" id="BuyerName" value="" placeholder="">-->
<!--            </div>-->
<!--          </td>-->
<!--        </tr>-->
<!--        <tr>-->
<!--          <td class="title">-->
<!--            <div><b>구매자 연락처</b></div>-->
<!--          </td>-->
<!--          <td>-->
<!--            <div>-->
<!--              <input type="text" name="BuyerTel" id="BuyerTel" value="">-->
<!--            </div>-->
<!--          </td>-->
<!--        </tr>-->
<!--        <tr>-->
<!--          <td class="title">-->
<!--            <div><b>구매자 이메일 주소</b></div>-->
<!--          </td>-->
<!--          <td>-->
<!--            <div>-->
<!--              <input type="text" name="BuyerEmail" id="BuyerEmail" value="">-->
<!--            </div>-->
<!--          </td>-->
<!--        </tr>-->
<!--        &lt;!&ndash;        <tr>&ndash;&gt;-->
<!--        &lt;!&ndash;          <td class="title"><div><b>PG결제결과창 유무</b></div></td>&ndash;&gt;-->
<!--        &lt;!&ndash;          <td class="">&ndash;&gt;-->
<!--        &lt;!&ndash;            <div>&ndash;&gt;-->
<!--        <input type="hidden" name="ResultYN" value="Y" style="width:8%;">-->
<!--        &lt;!&ndash;            </div>&ndash;&gt;-->
<!--        &lt;!&ndash;          </td>&ndash;&gt;-->
<!--        &lt;!&ndash;        </tr>&ndash;&gt;-->
<!--        <tr height="10">-->
<!--          <td></td>-->
<!--          <td></td>-->
<!--        </tr>-->
<!--        &lt;!&ndash; 선택 파라미터 &ndash;&gt;-->
<!--        <tr>-->
<!--          <td class="title">-->
<!--            <div>결제결과전송 URL</div>-->
<!--          </td>-->
<!--          <td>-->
<!--            <div>-->
<!--              <input type="text" name="ReturnURL" id="ReturnURL" value="" placeholder="">-->
<!--              <br> (ReturnURL 이 없는 경우 현재페이지로 결제결과가 전송됩니다)-->
<!--            </div>-->
<!--          </td>-->
<!--        </tr>-->
<!--        </tbody>-->
<!--      </table>-->
<!--      <div align="center" style="height:50px;">-->
<!--        <input type="button" class="btn_submit" name="btn_pay" value="결제요청">-->
<!--      </div>-->
<!--      <div style="height:10px;"></div>-->
<!--    </form>-->
<!--    &lt;!&ndash; End Form &ndash;&gt;-->
<!--  </article>-->
<!--  <footer style="margin-top: 20px;">-->
<!--    <ul class='lb'>-->
<!--      <li>고객지원: 1688-1250</li>-->
<!--      <li>-->
<!--        <span>결제내역조회</span>-->
<!--        <a href="http://web.innopay.co.kr/" title="결제내역조회 페이지 이동 ">web.innopay.co.kr</a>-->
<!--      </li>-->
<!--    </ul>-->
<!--  </footer>-->
<!--</div>-->
<!--</body>-->
<!--</html>-->
<!--</template>-->
<!--&lt;!&ndash; UI 스타일 시작 &ndash;&gt;-->
<!--&lt;!&ndash; 아래 스타일 시트는 샘플페이지를 위해 작성된 내용으로 결제요청시에는 포함하지 않아도 됩니다. &ndash;&gt;-->
<!--<style type="text/css">-->
<!--body {-->
<!--  margin: 0;-->
<!--}-->

<!--article h2 {-->
<!--  display: block;-->
<!--  width: 100%;-->
<!--  font-size: 16px;-->
<!--  text-align: center;-->
<!--  margin-bottom: 20px;-->
<!--}-->

<!--form {-->
<!--  width: 100%;-->
<!--}-->

<!--form table {-->
<!--  padding: 20px 0 0 0px;-->
<!--  width: 100%;-->
<!--}-->

<!--form td {-->
<!--  padding: 0 0px 5px 0;-->
<!--  text-align: left;-->
<!--  font-size: 12px;-->
<!--}-->

<!--form td.title {-->
<!--  width: 180px;-->
<!--  font-size: 12px;-->
<!--}-->

<!--.hidden {-->
<!--  height: 100%;-->
<!--  min-height: 100%;-->
<!--  overflow: hidden !important;-->
<!--  touch-action: none;-->
<!--}-->

<!--form input {-->
<!--  border: 1px solid #aaa;-->
<!--  border-radius: 0;-->
<!--  padding-left: 10px;-->
<!--  width: 100%;-->
<!--}-->

<!--form .btn_submit {-->
<!--  width: 150px;-->
<!--  border-radius: 4px;-->
<!--  padding: 0;-->
<!--  margin: 20px 0;-->
<!--  height: 30px;-->
<!--  background-color: #1e5dd2;-->
<!--  border: none;-->
<!--  color: #fff;-->
<!--  font-weight: bold;-->
<!--  font-size: 12px;-->
<!--}-->

<!--.lb {-->
<!--  font-size: 12px;-->
<!--}-->

<!--.logo {-->
<!--  text-align: center;-->
<!--  margin-bottom: 10px;-->
<!--}-->

<!--@media screen and (max-device-width: 736px) {-->
<!--  form {-->
<!--    width: 100%;-->
<!--  }-->

<!--  form input {-->
<!--    width: 200px;-->
<!--  }-->
<!--}-->
<!--</style>-->
<!--&lt;!&ndash; UI 스타일 끝 &ndash;&gt;-->