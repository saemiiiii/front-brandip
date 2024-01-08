<script>
import axios from "axios";
import jwt from "jsonwebtoken";
import AWS from 'aws-sdk';
import router from "@/router";

const s3 = new AWS.S3({
  accessKeyId: process.env.VUE_APP_NEXT_S3_KEY,
  secretAccessKey: process.env.VUE_APP_NEXT_S3_SEC,
  region: ``,
});
export default {
  data() {
    return {
      community: {},
      typeKo: ``,
      comments: [],
      uploadedImages: [],
      uploadedImagesComment: [],
      comment: ``,
      commentReply: ``,
      parentIdx: 0,
      selectedFiles: [],
      selectedFilesComment: [],
      isVisible: false,
      sub: null,
      dialog: false,
      dialogReport: false,
      dialogDelete: false,
      message: `삭제하시겠습니까?`,
      commentDialog: false,
      commentDialogReport: false,
      commentDialogDelete: false,
      commentIdx: null,
      commentUp: ``,
      deleteUpload: 0,
      commentFileUp: 0,
      page: 0,
      last: false,
      addData: [],
    }
  },
  mounted() {
    this.page = 0;
    this.getCommunityDetail();
    this.getComments();
    this.decodeToken();
  },
  methods: {
    getCommunityDetail() {
      let typeKo = ``;
      axios.get(`${process.env.VUE_APP_SERVICE_URL}v1/community/${this.$route.params.id}`)
          .then(res => {
            this.community = res.data.data
            if (this.community.type === `normal`) {
              typeKo = `잡담`;
            } else if (this.community.type === `quesion`) {
              typeKo = `궁금한거`;
            } else if (this.community.type === 'delivery') {
              typeKo = `buy`;
            } else if (this.community.type === `buy`) {
              typeKo = `사요`;
            } else {
              typeKo = `팔아요`;
            }
            this.typeKo = typeKo;
          })
          .catch(err => {
            console.error(err);
          })
    },
    formatTimeAgo(dateString) {
      if (!dateString) return '';
      const offset = new Date().getTimezoneOffset();
      const date = new Date(dateString);
      const now = Date.now();

      const SEC = 1000;
      const MIN = SEC * 60;
      const HOUR = MIN * 60;
      const DAY = HOUR * 24;
      const WEEK = DAY * 7;
      const MON = DAY * 30;
      const YEAR = DAY * 365;

      const cur = now - date.getTime() + offset * 60 * 1000;

      const seconds = `${Math.floor(cur / SEC)} 초전`;
      const minutes =
          Number(cur / MIN) >= 1 ? `${Math.floor(cur / MIN)}분 전` : false;
      const hours =
          Number(cur / HOUR) >= 1 ? `${Math.floor(cur / HOUR)}시간 전` : false;
      const days = Number(cur / DAY) >= 1 ? `${Math.floor(cur / DAY)}일 전` : false;
      const weeks =
          Number(cur / WEEK) >= 1 ? `${Math.floor(cur / WEEK)}주 전` : false;
      const months =
          Number(cur / MON) >= 1 ? `${Math.floor(cur / MON)}달 전` : false;
      const years =
          Number(cur / YEAR) >= 1 ? `${Math.floor(cur / YEAR)}년 전` : false;
      return years || months || weeks || days || hours || minutes || seconds;
    },
    replaceNewline(text) {
      return text?.replace(/\n/g, '<br>');
    },
    updateLike(communityIdx) {
      axios.post(`${process.env.VUE_APP_SERVICE_URL}v1/community/like`, {
        communityIdx: communityIdx,
      },)
          .then(() => {
            this.getCommunityDetail();
          })
          .catch(err => {
            console.error(err);
          })
    },
    updateCommentLike(communityIdx) {
      axios.post(`${process.env.VUE_APP_SERVICE_URL}v1/community/comment/like`, {
        communityReplyIdx: communityIdx,
      },)
          .then(() => {
            this.getComments();
          })
          .catch(err => {
            console.error(err);
          })
    },
    getComments() {
      let comments = [];
      axios.get(`${process.env.VUE_APP_SERVICE_URL}v1/community/comment?communityIdx=${this.$route.params.id}&page=${this.page}`)
          .then(res => {
            if (res.data.data.list.length > 0) {
              res.data.data.list.map((item) => {
                comments.push({
                  communityReplyIdx: item.communityReplyIdx,
                  communityReplyLikeIdx: item.communityReplyLikeIdx,
                  parentIdx: item.parentIdx,
                  userIdx: item.userIdx,
                  comment: item.comment,
                  profile: item.profile,
                  nickname: item.nickname,
                  like: item.like,
                  url: item.url,
                  status: item.status,
                  createdDt: item.createdDt,
                  isOpen: false,
                });
              });
            }
            this.addData = comments;
            this.comments = [...this.comments, ...comments];
            console.log(this.comments);
            this.last = res.data.data.last;
          })
          .catch(err => {
            console.error(err);
          })
    },
    openFileInput() {
      this.$refs.fileInputOne.click();
    },
    openFileInputComment() {
      this.$refs.fileInputTwo.click();
    },
    handleFileUpload(event) {
      let selectedFile = event.target.files[0];
      if (selectedFile) {
        this.selectedFiles = selectedFile;
        this.uploadImage(selectedFile);
      }
    },
    handleFileUploadComment(event) {
      let selectedFile = event.target.files[0];
      if (selectedFile) {
        this.selectedFilesComment = selectedFile;
        this.uploadImageComment(selectedFile);
      }
    },
    // s3 파일 업로드, 파일 하나만 업로드 되도록
    uploadImage(file) {
      this.uploadedImages = [];
      const params = {
        Bucket: 'wownft-develop-upload-s3',
        Key: `renewal/user/${this.sub}/profile/${file.name}`,
        Body: file,
        ContentType: file.type,
      };
      s3.upload(params, (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        this.uploadedImages.push(data.Location);
      });
    },
    uploadImageComment(file) {
      this.uploadedImagesComment = [];
      const params = {
        Bucket: 'wownft-develop-upload-s3',
        Key: `renewal/user/${this.sub}/profile/${file.name}`,
        Body: file,
        ContentType: file.type,
      };
      s3.upload(params, (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        this.uploadedImagesComment.push(data.Location);
      });
    },
    decodeToken() {
      try {
        const decoded = jwt.decode(localStorage.getItem('token'));
        this.decodedToken = decoded;
        this.sub = this.decodedToken.sub;
      } catch (error) {
        console.error('토큰을 복호화할 수 없습니다.', error);
      }
    },
    deleteImage(deleteImg, index) {
      this.uploadedImages.splice(index, 1);
      this.selectedFiles = [];
      this.deleteUpload = 1;
    },
    addComment() {
      if (this.commentUp) {
        if (!this.comment) {
          alert('내용을 입력해주세요.');
          return false;
        }
        const formData = new FormData();
        formData.append(`communityReplyIdx`, this.commentIdx);
        formData.append(`comment`, this.comment);
        formData.append(`deleteFile`, this.deleteUpload);
        if (this.selectedFiles.name) {
          formData.append("file", this.selectedFiles);
        }
        axios.put(`${process.env.VUE_APP_SERVICE_URL}v1/community/comment`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
            .then(() => {
              this.comment = ``;
              this.comments = [];
              this.selectedFiles = [];
              this.uploadedImages = [];
              this.page = 0;
              this.getComments();
            })
            .catch(err => {
              console.error(err);
            })
      } else {
        if (!this.comment) {
          alert('내용을 입력해주세요.');
          return false;
        }
        const formData = new FormData();
        formData.append(`communityIdx`, this.$route.params.id);
        formData.append(`parentIdx`, this.parentIdx);
        formData.append(`comment`, this.comment);
        if (this.selectedFiles.name) {
          formData.append("file", this.selectedFiles);
        }
        axios.post(`${process.env.VUE_APP_SERVICE_URL}v1/community/comment`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
            .then(() => {
              this.comment = ``;
              this.comments = [];
              this.selectedFiles = [];
              this.uploadedImages = [];
              this.page = 0;
              this.getComments();
            })
            .catch(err => {
              console.error(err);
            })
      }
    },
    addCommentReply(parentIdx) {
      if (!this.commentReply) {
        alert('내용을 입력해주세요.');
        return false;
      }
      const formData = new FormData();
      formData.append(`communityIdx`, this.$route.params.id);
      formData.append(`parentIdx`, parentIdx);
      formData.append(`comment`, this.commentReply);
      if (this.selectedFilesComment.name) {
        formData.append("file", this.selectedFilesComment);
      }
      axios.post(`${process.env.VUE_APP_SERVICE_URL}v1/community/comment`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
          .then(() => {
            this.commentReply = ``;
            this.comments = [];
            this.selectedFilesComment = [];
            this.uploadedImagesComment = [];
            this.page = 0;
            this.getComments();
          })
          .catch(err => {
            console.error(err);
          })
    },
    toggleCollapse(index) {
      this.comments[index].isOpen = !this.comments[index].isOpen;
    },
    logData(comm) {
      this.$router.push({path: '/community-add', query: {comm: JSON.stringify(comm)}}).catch(()=>{});
    },
    deleteCommunity(idx) {
      axios.delete(`${process.env.VUE_APP_SERVICE_URL}v1/community?communityIdx=${idx}`)
          .then(() => {
            this.dialogDelete = false;
            router.push('/community').catch(() => {
            });
          })
          .catch(err => {
            console.error(err);
          })
    },
    commentModal(idx, comment) {
      this.commentDialog = true;
      this.commentIdx = idx;
      this.commentUp = comment.comment;
      this.commentFileUp = comment.url !== "" ? comment.url : "";
    },
    commentModalReport(idx) {
      this.commentDialogReport = true;
      this.commentIdx = idx;
    },
    deleteComment() {
      axios.delete(`${process.env.VUE_APP_SERVICE_URL}v1/community/comment?communityReplyIdx=${this.commentIdx}`)
          .then(() => {
            this.page = 0;
            this.getComments();
            this.commentDialogDelete = false;
            this.commentDialog = false;
          })
          .catch(err => {
            console.error(err);
          })
    },
    commentReport() {
      this.$router.push({path: '/community-report', query: {commentIdx: this.commentIdx}}).catch(() => {
      });
    },
    updateComment() {
      this.uploadedImages = [];
      this.commentDialog = false;
      this.$refs.commentField.focus();
      this.comment = this.commentUp;
      if (this.commentFileUp) {
        this.uploadedImages.push(this.commentFileUp);
      }
    },
    likeCountView(number) {
      if (isNaN(number) || number === undefined) return '';
      const bill = 1000000000;
      const mill = 1000000;
      const kill = 1000;
      if (number > bill) {
        return Math.floor((number * 10) / bill) / 10 + 'B';
      }
      if (number > mill) {
        return Math.floor((number * 10) / mill) / 10 + 'M';
      }
      if (number > kill) {
        return Math.floor((number * 10) / kill) / 10 + 'K';
      }
      return number;
    },
    async handleIntersection(entries) {
      if (entries[0].isIntersecting && !this.last) {
        // 스크롤이 일정 부분 내려가면 추가 데이터 로딩
        this.page ++;
        await this.getComments();
      }
    }
  }
}
</script>

<template>
  <v-app>
    <v-container>
      <div class="mt-20 mb-20 pb-14 pl-1 pr-1">
        <div>
          <v-chip
              class="white--text"
              color="#FC9DC3"
              style="font-family: Inter; font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center; max-width: 63px; height: 25px"
          >
            {{ typeKo }}
          </v-chip>
        </div>
        <div class="text-left mt-5" style="display: flex; align-items: center;">
          <v-avatar style="box-shadow: 0px 4px 4px 0px #00000040;">
            <img :src="community.profile">
          </v-avatar>
          <div style="display: flex; flex-direction: column; margin-left: 10px;">
            <span style="font-family: Inter; font-size: 18px; font-weight: 700;">{{ community.nickname }}</span>
            <span style="font-family: Inter; font-size: 14px; color: #888;">{{
                formatTimeAgo(community.createdDt)
              }}</span>
          </div>
          <v-spacer></v-spacer>
          <div>
            <div v-if="Number(sub) === Number(community.userIdx)" @click.stop="dialog = true" class="cursor-pointer px-2">
              <img src="@/assets/icons/ico-dot.svg"/>
            </div>
            <div v-else @click.stop="dialogReport = true" class="cursor-pointer px2">
              <img src="@/assets/icons/ico-dot.svg"/>
            </div>
          </div>
        </div>
        <hr class="mt-5"/>
        <div class="mt-5 pb-14">
          <p
              style="font-family: Inter;font-size: 20px;font-weight: 700;text-align: left;">
            {{ community.title }}
          </p>
          <div
              style="font-family: Inter; font-size: 17px; font-weight: 400; text-align: left; white-space: normal; word-break: break-all;"
              v-html="replaceNewline(community.contents)">
          </div>
          <div v-for="url in community.urls" :key="url.communityFileIdx">
            <img :src="url.url">
            <br>
          </div>
          <div>
            <div class="float-left mt-2"
                 style="width: 30%; display: flex; align-items: center;">
              <img src="@/assets/icons/ico-pink-heart.png" class="float-right cursor-pointer"
                   v-if="community.communityLikeIdx"
                   @click.stop="updateLike(community.communityIdx)">
              <img src="@/assets/icons/ico-white-heart.png" class="float-right cursor-pointer" v-else
                   @click.stop="updateLike(community.communityIdx)">
              <span class="ml-1 mr-4"
                    style="font-family: Inter;font-size: 13px;font-weight: 700;color: black">{{
                  likeCountView(community.like)
                }}</span>
              <img src="@/assets/icons/ico-comment.svg" class="float-right">
              <span class="ml-1" style="font-family: Inter;font-size: 13px;font-weight: 700; color: black">{{
                  community.comment
                }}</span>
            </div>
            <!--            <div class="float-right mt-2"-->
            <!--                 style="font-family: Inter; font-size: 15px; font-weight: 700; display: flex; align-items: center;">-->
            <!--              <img src="@/assets/icons/ico-share.svg" class="mr-2" style="float: left;">-->
            <!--              <span>공유하기</span>-->
            <!--            </div>-->
          </div>
        </div>
        <!--            커뮤니티 댓글-->
        <div>
          <div>
            <v-card width="70" height="70" elevation="0" outlined v-for="(image, index) in uploadedImages" :key="index"
                    class="mb-1">
              <img :src="image" width="22" height="22">
              <img src="@/assets/icons/ico-x-box.svg" class="text-right" style="position: absolute; top: 0; right: 0;"
                   @click.stop="deleteImage(index)">
            </v-card>
            <v-text-field ref="commentField" background-color="#EFEFEF" dense flat solo
                          style="border-radius: 40px;font-family: Inter;font-size: 15px;font-weight: 400;"
                          class="mr-2" placeholder="댓글을 입력하세요" v-model="comment" @keydown.enter.stop="addComment">
              <template v-slot:prepend>
                <img src="@/assets/icons/ico-black-no-img.svg" @click.stop="openFileInput" class="cursor-pointer">
              </template>
              <template v-slot:append-outer>
                <img src="@/assets/icons/ico-blue-upload.svg" @click.stop="addComment" class="cursor-pointer">
              </template>
            </v-text-field>
            <input type="file" ref="fileInputOne" hidden="hidden" @change="handleFileUpload" accept="image/*"/>
            <input type="file" ref="fileInputTwo" hidden="hidden" @change="handleFileUploadComment" accept="image/*"/>
          </div>
          <div v-for="(comm, idx) in comments" :key="idx" :style="{ marginLeft: comm.parentIdx === 0? '10px' : '30px'}">
            <div class="text-left mt-5 ml-1" style="display: flex; align-items: center;">
              <v-avatar style="box-shadow: 0px 4px 4px 0px #00000040;">
                <img :src="comm.profile">
              </v-avatar>
              <div style="display: flex; flex-direction: column; margin-left: 10px;">
                <span style="font-family: Inter; font-size: 18px; font-weight: 700;">{{ comm.nickname }}</span>
                <span style="font-family: Inter; font-size: 14px; color: #888;">{{
                    formatTimeAgo(comm.createdDt)
                  }}</span>
              </div>
              <v-spacer></v-spacer>
              <div v-if="comm.status !== 1">
                <div @click.stop="commentModal(comm.communityReplyIdx, comm)" v-if="Number(sub) === Number(comm.userIdx)"
                     class="cursor-pointer px-2">
                  <img src="@/assets/icons/ico-dot.svg"/>
                </div>
                <div @click.stop="commentModalReport(comm.communityReplyIdx)" class="cursor-pointer px-2" v-else>
                  <img src="@/assets/icons/ico-dot.svg"/>
                </div>
              </div>
            </div>
            <div class="mt-5 ml-2">
              <div :style="{backgroundColor: Number(sub) === Number(comm.userIdx) ? `#DCE2F4` : `#F2F2F2`}"
                   style="border-radius: 0px 25px 25px 25px;" class="pa-4" v-if="comm.status === 1">
                <div
                    style="font-family: Inter; font-size: 15px; font-weight: 400; text-align: left; white-space: normal; word-break: break-all;">
                  삭제되었습니다.
                </div>
              </div>
              <div :style="{backgroundColor: Number(sub) === Number(comm.userIdx) ? `#DCE2F4` : `#F2F2F2`}"
                   style="border-radius: 0px 25px 25px 25px;" class="pa-4" v-else>
                <div
                    style="font-family: Inter; font-size: 17px; font-weight: 400; text-align: left; white-space: normal; word-break: break-all;"
                    v-html="replaceNewline(comm.comment)">
                </div>
                <img :src="comm.url" v-if="comm.url">
              </div>
              <div>
                <div class="mt-2" style="display: flex; align-items: center;" v-if="comm.status !== 1">
                  <img src="@/assets/icons/ico-pink-heart.png" class="float-right cursor-pointer"
                       v-if="comm.communityReplyLikeIdx && comm.status !== 1"
                       @click.stop="updateCommentLike(comm.communityReplyIdx)">
                  <img src="@/assets/icons/ico-white-heart.png" class="float-right cursor-pointer" v-else
                       @click.stop="updateCommentLike(comm.communityReplyIdx)">
                  <span class="ml-1 mr-4"
                        style="font-family: Inter;font-size: 13px;font-weight: 700;color: black">{{
                      likeCountView(comm.like)
                    }}</span>
                  <img v-if="comm.parentIdx === 0" src="@/assets/icons/ico-two-comment.svg" class="float-right">
                  <span v-if="comm.parentIdx === 0 " class="ml-1 cursor-pointer"
                        style="font-family: Inter;font-size: 13px;font-weight: 700; color: black"
                        @click.stop="toggleCollapse(idx)">댓글달기</span>
                </div>
                <div v-if="comm.isOpen" class="mt-5">
                  <v-card width="70" height="70" elevation="0" outlined v-for="(image, index) in uploadedImagesComment"
                          :key="index"
                          class="mb-1">
                    <img :src="image" width="22" height="22">
                    <img src="@/assets/icons/ico-x-box.svg" class="text-right"
                         style="position: absolute; top: 0; right: 0;"
                         @click.stop="deleteImage(index)">
                  </v-card>
                  <v-text-field background-color="#EFEFEF" dense flat solo
                                style="border-radius: 40px;font-family: Inter;font-size: 15px;font-weight: 400;"
                                class="mr-2" placeholder="댓글을 입력하세요" v-model="commentReply"
                                @keydown.enter.stop="addCommentReply(comm.communityReplyIdx)">
                    <template v-slot:prepend>
                      <img src="@/assets/icons/ico-black-no-img.svg" @click.stop="openFileInputComment">
                    </template>
                    <template v-slot:append-outer>
                      <img src="@/assets/icons/ico-blue-upload.svg" @click.stop="addCommentReply(comm.communityReplyIdx)">
                    </template>
                  </v-text-field>
                </div>
              </div>
            </div>
          </div>
          <div ref="intersectionTarget" class="intersection-target" v-intersect="handleIntersection"></div>
        </div>
        <!--        커뮤니티 모달-->
        <div>
          <v-dialog content-class="bottom-dialog"
                    v-model="dialog" scrollable
                    hide-overlay transition="dialog-bottom-transition">
            <v-card max-width="100%" style="background-color: #FFFFFF">
              <v-divider></v-divider>
              <v-row class="ma-3">
                <v-col cols="12">
                  <div style="font-family: Inter;font-size: 20px;font-weight: 700;text-align: left" class="mb-5">
                    게시글
                  </div>
                  <p style="font-family: Inter;font-size: 16px;font-weight: 500;text-align: left"
                     @click.stop="logData(community)" class="cursor-pointer">수정하기</p>
                  <p style="font-family: Inter;font-size: 16px;font-weight: 500;text-align: left"
                     @click.stop="dialogDelete = true" class="cursor-pointer">삭제하기</p>
                </v-col>
              </v-row>
            </v-card>
          </v-dialog>
        </div>
        <div>
          <v-dialog content-class="bottom-dialog"
                    v-model="dialogReport" scrollable
                    hide-overlay transition="dialog-bottom-transition">
            <v-card max-width="100%" style="background-color: #FFFFFF">
              <v-divider></v-divider>
              <v-row class="ma-3">
                <v-col cols="12">
                  <div style="font-family: Inter;font-size: 20px;font-weight: 700;text-align: left" class="mb-5">
                    게시글
                  </div>
                  <p style="font-family: Inter;font-size: 16px;font-weight: 500;text-align: left"
                     @click.stop="$router.push({ path: '/community-report', query: { id: community.communityIdx} }).catch(()=>{})"
                     class="cursor-pointer">신고하기</p>
                </v-col>
              </v-row>
            </v-card>
          </v-dialog>
        </div>
        <div class="text-center">
          <v-dialog
              v-model="dialogDelete"
              max-width="328"
              style="z-index: 999"
          >
            <v-card height="163" style="border-radius: 15px">
              <v-card-text style="font-family: Inter;font-size: 20px;font-weight: 700;" class="mt-5">
                {{ message }}
              </v-card-text>
              <v-card-actions class="mt-10">
                <v-btn
                    rounded
                    color="primary"
                    width="100%"
                    @click="deleteCommunity(community.communityIdx)"
                >
                  확인
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
        <!--        커뮤니티 모달 끝-->


        <!--        댓글모달-->
        <div>
          <v-dialog content-class="bottom-dialog"
                    v-model="commentDialog" scrollable
                    hide-overlay transition="dialog-bottom-transition">
            <v-card max-width="100%" style="background-color: #FFFFFF">
              <v-divider></v-divider>
              <v-row class="ma-3">
                <v-col cols="12">
                  <div style="font-family: Inter;font-size: 20px;font-weight: 700;text-align: left" class="mb-5">
                    댓글
                  </div>
                  <p style="font-family: Inter;font-size: 16px;font-weight: 500;text-align: left" class="cursor-pointer"
                     @click.stop="updateComment">수정하기</p>
                  <p style="font-family: Inter;font-size: 16px;font-weight: 500;text-align: left"
                     @click.stop="commentDialogDelete = true" class="cursor-pointer">삭제하기</p>
                </v-col>
              </v-row>
            </v-card>
          </v-dialog>
        </div>
        <div>
          <v-dialog content-class="bottom-dialog"
                    v-model="commentDialogReport" scrollable
                    hide-overlay transition="dialog-bottom-transition">
            <v-card max-width="100%" style="background-color: #FFFFFF">
              <v-divider></v-divider>
              <v-row class="ma-3">
                <v-col cols="12">
                  <div style="font-family: Inter;font-size: 20px;font-weight: 700;text-align: left" class="mb-5">
                    댓글
                  </div>
                  <p style="font-family: Inter;font-size: 16px;font-weight: 500;text-align: left" @click.stop="commentReport"
                     class="cursor-pointer">신고하기</p>
                </v-col>
              </v-row>
            </v-card>
          </v-dialog>
        </div>
        <div class="text-center">
          <v-dialog
              v-model="commentDialogDelete"
              max-width="328"
              style="z-index: 999"
          >
            <v-card height="163" style="border-radius: 15px">
              <v-card-title style="font-family: Inter;font-size: 20px;font-weight: 700;">
                {{ message }}
              </v-card-title>
              <v-card-actions class="mt-10">
                <v-btn
                    rounded
                    color="primary"
                    width="100%"
                    @click="deleteComment()"
                >
                  확인
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>
    </v-container>
  </v-app>
</template>
<style>
.bottom-dialog {
  margin-bottom: 0;
  align-self: flex-end;
  border-radius: 25px 25px 0px 0px;
  overflow: hidden;
  max-width: 460px;
  @media screen and (max-width: 1024px) {
    max-width: 100%;
  }
}

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