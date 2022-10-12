<template>
  <Spinner v-if="isLoading" />
  <div v-else class="user__edit__modal">
    <div class="modal-card">
      <form @submit.stop.prevent="handleSubmit">
        <div class="edit__header">
          <button>
            <img
              @click.stop.prevent="closeUserEditModal()"
              src="@/assets/image/orange-cross.png"
              alt="cancel"
            />
          </button>
          <h5>編輯個人資料</h5>
          <button type="submit" class="save">儲存</button>
        </div>

        <div class="user__edit__image">
          <div class="user__cover">
            <img class="user__cover__img" :src="user.backgroundImage" alt="" />
            <div class="user__cover__mask"></div>
            <div class="user__cover__icons">
              <input
                id="backgroundImage"
                type="file"
                name="backgroundImage"
                accept="image/*"
                class="upload__coverImage__file d-none"
                ref="coverInput"
                @change="handleCoverFileChange"
              />
              <button @click.stop.prevent="onPickFile('cover')">
                <img
                  class="upload"
                  src="@/assets/image/upload.png"
                  alt="upload"
                />
              </button>

              <button @click.stop.prevent="deleteCover()">
                <img
                  class="cancel"
                  src="@/assets/image/white-cross.png"
                  alt="cancel"
                />
              </button>
            </div>
          </div>

          <div class="user__avatar">
            <img
              class="user__avatar__img"
              :src="user.avatar | emptyAvatar"
              alt="user-avatar"
            />
            <div class="user__avatar__mask"></div>

            <input
              id="avatar"
              type="file"
              name="avatar"
              accept="image/*"
              class="upload__avatarImage__file d-none"
              ref="avatarInput"
              @change="handleFileChange"
            />
            <button @click.stop.prevent="onPickFile('avatar')">
              <img
                class="upload"
                src="@/assets/image/upload.png"
                alt="upload"
              />
            </button>
          </div>
        </div>

        <div class="user__edit__content">
          <div class="form__wrapper">
            <label for="name" class="d-block">名稱</label>
            <input
              type="text"
              id="name"
              name="name"
              :placeholder="user.name ? user.name : '請輸入名稱'"
              required
              autofocus
              class="d-block"
              v-model="user.name"
            />
            <div class="compute">
              <div class="words__compute--warn">
                {{ nameThreshold > 50 ? "字數超出上限!" : "" }}
              </div>
              <div class="words__compute">{{ nameThreshold }}/50</div>
            </div>
          </div>

          <div class="form__wrapper">
            <label for="introduction" class="d-block">自我介紹</label>
            <textarea
              type="text"
              id="introduction"
              name="introduction"
              :placeholder="
                user.introduction ? user.introduction : '請輸入自我介紹'
              "
              class="d-block introduction"
              v-model="user.introduction"
            ></textarea>
            <div class="compute">
              <div class="words__compute--warn">
                {{ introductionThreshold > 160 ? "字數超出上限!" : "" }}
              </div>
              <div class="words__compute">{{ introductionThreshold }}/160</div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import userAPI from "@/apis/user";
import { Toast } from "../utils/helpers";
import Spinner from "./../components/Spinner";
import { emptyAvatarFilter } from '../utils/mixins'

export default {
  mixins: [emptyAvatarFilter],
  components: {
    Spinner,
  },
  data() {
    return {
      user: {
        id: -1,
        backgroundImage: "",
        avatar: "",
        name: "",
        introduction: "",
      },
      isLoading: true,
      backgroundImageIsDefault: false,
    };
  },
  created() {
    const { id: userId } = this.$route.params;
    this.fetchUser(userId);
  },
  computed: {
    nameThreshold() {
      const nameLength = this.user.name.length;
      return nameLength;
    },
    introductionThreshold() {
      const introductionLength = this.user.introduction.length;
      return introductionLength;
    },
  },
  updated() {
    if (this.nameThreshold > 50) {
      document.getElementById("name").style.borderBottomColor = "#FC5A5A";
    } else {
      document.getElementById("name").style.borderBottomColor = null;
    }
    if (this.introductionThreshold > 160) {
      document.getElementById("introduction").style.borderBottomColor =
        "#FC5A5A";
    } else {
      document.getElementById("introduction").style.borderBottomColor = null;
    }
  },

  methods: {
    async fetchUser(userId) {
      try {
        const { data } = await userAPI.getUser({ userId });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        this.user = {
          ...this.user,
          ...data,
        };
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法取得使用者資料，請稍後再試",
        });
      }
    },
    closeUserEditModal() {
      this.$emit("after-click-button");
    },
    handleFileChange(e) {
      const { files } = e.target;
      if (files.length === 0) {
        this.user.avatar = "";
      } else {
        const imageURL = window.URL.createObjectURL(files[0]);
        this.user.avatar = imageURL;
      }
    },
    handleCoverFileChange(e) {
      const { files } = e.target;
      if (files.length === 0) {
        this.user.backgroundImage = "";
      } else {
        const imageURL = window.URL.createObjectURL(files[0]);
        this.user.backgroundImage = imageURL;
        this.backgroundImageIsDefault = false;
      }
    },
    onPickFile(imageFile) {
      if (imageFile === "avatar") {
        this.$refs.avatarInput.click();
      } else {
        this.$refs.coverInput.click();
      }
    },
    deleteCover() {
      this.user.backgroundImage = require("./../assets/image/user-cover.png");
      this.backgroundImageIsDefault = true;
    },
    async handleSubmit(e) {
      const form = e.target;
      const formData = new FormData(form);

      if (this.backgroundImageIsDefault) {
        const response = await fetch("https://i.imgur.com/4kLBkAL.jpeg");
        const blob = await response.blob();
        const file = new File([blob], "default.jpeg", { type: "image/jpeg" });
        formData.set("backgroundImage", file);
      }

      try {
        if (!this.user.name) {
          Toast.fire({
            icon: "warning",
            title: "名稱不可空白",
          });
          return;
        } else if (this.user.name.length > 50) {
          Toast.fire({
            icon: "warning",
            title: "名稱不可超過50字",
          });
          return;
        }

        if (this.user.introduction.length > 160) {
          Toast.fire({
            icon: "warning",
            title: "自我介紹不可超過160字",
          });
          return;
        }
        const { data } = await userAPI.update({
          userId: this.user.id,
          formData,
        });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        Toast.fire({
          icon: "success",
          title: "成功儲存",
        });

      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法更新使用者資料，請稍後再試",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.user__edit__modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(23, 23, 37, 0.4);
  z-index: 999;
  .modal-card {
    position: absolute;
    top: 56px;
    left: 50vw;
    transform: translate(-50%, 0);
    border-radius: 14px;
    background: $scale-gray1;
    width: 50vw;
    height: 60vh;
    max-width: 634px;
    min-height: 640px;
    .edit__header {
      display: flex;
      align-items: center;
      height: 57px;
      img {
        width: 15px;
        height: 15px;
        margin: 20px;
      }
      h5 {
        font-size: 18px;
        font-weight: 700;
      }
      .save {
        position: absolute;
        top: 8px;
        right: 16px;
        width: 64px;
        height: 40px;
        padding: 8px 16px;
        background-color: $brand-orange;
        border-radius: 50px;
        font-size: 16px;
        font-weight: 400;
        color: $scale-gray1;
      }
    }
    .user__edit__image {
      position: relative;
      .user__cover {
        .user__cover__img {
          height: 200px;
          object-fit: cover;
          object-position: center;
          opacity: 70%;
        }
        .user__cover__mask {
          background: rgba(23, 23, 37, 0.5);
          position: absolute;
          top: 0;
          height: 200px;
          width: 100%;
        }
        .user__cover__icons {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 999;
          display: flex;
          width: 75px;
          justify-content: space-between;
          align-items: center;
        }
        .upload {
          width: 20px;
          height: 20px;
        }
        .cancel {
          width: 15px;
          height: 15px;
        }
      }
      .user__avatar {
        .user__avatar__img {
          position: absolute;
          top: 124px;
          left: 16px;
          height: 140px;
          width: 140px;
          border: 4px solid $scale-gray1;
          border-radius: 50%;
        }
        .user__avatar__mask {
          background: rgba(23, 23, 37, 0.5);
          position: absolute;
          top: 124px;
          left: 16px;
          height: 140px;
          width: 140px;
          border: 4px solid $scale-gray1;
          border-radius: 50%;
        }
        .upload {
          position: absolute;
          top: 200px;
          left: 86px;
          transform: translate(-50%, -50%);
          height: 20px;
          width: 20px;
        }
      }
    }
    .user__edit__content {
      padding: 60px 16px 40px 16px;
      label {
        padding: 2px 18px;
        color: $scale-gray8;
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
        background-color: $form-bg;
        margin: 0;
        border-radius: 2px 0;
      }
      input,
      textarea {
        padding: 0 18px 2px 18px;
        width: 100%;
        border: 0px;
        background-color: $form-bg;
        font-size: 16px;
        line-height: 26px;
        color: $scale-gray10;
        border-bottom: 2px solid $form-border;
        text-align: start;
        &.introduction {
          height: 147px;
          resize: none;
        }
        &:hover,
        :focus {
          border-bottom: 2px solid $sider-blue;
        }
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 100px $form-bg inset;
        }
      }
      .compute {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        font-weight: 500;
        margin: 4px 0 8px 0;
        .words__compute--warn {
          color: $error-red;
        }
        .words__compute {
          color: $scale-gray8;
        }
      }
    }
  }
}
</style>
