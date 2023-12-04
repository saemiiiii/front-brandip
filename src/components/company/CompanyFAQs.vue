<template>
  <v-container>
    <div>
      <div class="lg:space-y-lg-25dy">
        <div class="pt-sm-25dy md:pt-md-25dy mb-2" v-for="(item, index) in items"
             :key="index">
          <button @click="toggleFaq(item.id)" class="flex w-full justify-between items-center">
            <h6 class="font-bold text-gray-60 text-sm-28dx md:text-md-28dx lg:text-lg-18dx text-left">
              {{ item.question }}
            </h6>
            <img
                v-if="faq[item.id]"
                width="14.5"
                height="8"
                class="h-auto"
                src="/img/common/ico-gray-up.svg"
                alt="up & down"
            />
            <img
                v-else
                width="14.5"
                height="8"
                class="h-auto"
                src="/img/common/ico-gray-down.svg"
                alt="up & down"
            />
          </button>
          <p v-if="faq[item.id]"
             class="text-gray-60 text-sm-28dx md:text-md-28dx lg:text-lg-18dx mt-sm-25dy md:mt-md-25dy text-left">
            {{ item.answer }}
          </p>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
        faq: {
          1: false,
          2: false,
          3: false,
          4: false,
          5: false,
          6: false,
          7: false
        },
        items: [
          {
            id: 1,
            question: `Q. 와우플래닛은 무엇을 후원하는 플랫폼인가요?`,
            answer: `와우플래닛은 웹툰, 웹소설, 아트/디자인, 음악, 방송/영상 전시, 공연 등 다양한 콘텐츠 아이디어를 후원할 수 있으며, 크리에이터는 후원금으로
              창작활동을 하여 아이디어를 실현하고, 서포터는 한정판 굿즈도 받고 팬이 되어 자신이 후원한 아이디어를 홍보하면 리워드까지 받을 수 있는 ‘콘텐츠 아이디어 후원 플랫폼’입니다.`,
          },
          {
            id: 2,
            question: `Q. 마음에 드는 아이디어에 어떻게 후원하나요?`,
            answer: `마음에 드는 아이디어를 찾으셨나요? 원하는 후원금액을 선택하여 [후원하기]를 클릭해주세요. 후원은 프로젝트 성공 시 성공일 다음날 예약한 결제 수단으로
              결제가 진행됩니다. 후원자 분들을 위한 한정판 굿즈와 창작활동 계획은 각 아이디어의 상세설명을 참고해 주세요.`,
          },
          {
            id: 3,
            question: `Q. 리워드는 무엇인가요?`,
            answer: `마음에 드는 아이디어를 후원하셨나요? 후원한 아이디어가 많이 알려질 수 있도록 주변분들에게 알려주세요. 와우플래닛이 제공하는 홍보방법에 따라
              홍보를 할 경우 리워드로 포인트를 제공하며, 포인트는 아이디어 후원 등 다양한 서비스를 통해 이용할 수 있습니다.`,
          },
          {
            id: 4,
            question: `Q. 나만의 아이디어에 후원을 받고 싶어요.`,
            answer: `나만의 콘텐츠 아이디어를 가지고 계신가요? ‘아이디어 등록하기’를 통해 후원 프로젝트를 신청해주세요. 프로젝트 신청 가이드를 통해 누구나 쉽게
              신청할 수 있습니다 (해당 기능은 홈페이지 리뉴얼 후 선보일 예정입니다.)`,
          },
          {
            id: 5,
            question: `Q. 커뮤니티는 무엇인가요?`,
            answer: `커뮤니티는 크리에이터와 팬들의 공간입니다. 아이디어별로 창작활동에 대한 공지사항과 크리에이터와 팬간에 자유롭게 소통하고 자신이 후원한 아이디어를
              알리고 인증할 수 있는 공간입니다.`,
          },
          {
            id: 6,
            question: `Q. 포인트는 어떻게 사용하나요?`,
            answer: `포인트는 아이디어 후원 등 결제 및 와우플래닛의 다양한 이벤트 참가 등에 사용할 수 있습니다.`,
          },
          {
            id: 7,
            question: `Q. 내가 후원한 아이디어는 어떻게 확인할 수 있나요?`,
            answer: `후원해 주신 아이디어는 ‘마이페이지’ 메뉴에서 확인하실 수 있습니다.`,
          },
        ],
    };
  },
  methods: {
    toggleFaq(index) {
      this.$set(this.faq, index, !this.faq[index]);
    }
  }
};
</script>
