<template>
  <div class="user__edit__modal">
    <div class="modal-card">
      <div class="edit__header">
        <img src="@/assets/image/orange-cross.png" alt="cancel">
        <h5>編輯個人資料</h5>
        <button>儲存</button>
      </div>

      <div class="user__edit__image">
        <div class="user__cover">
          <img class="user__cover__img" src="@/assets/image/user-cover.png" alt="user-cover-img">
          <div class="user__cover__mask"></div>
          <div class="user__cover__icons">
            <img class="upload" src="@/assets/image/upload.png" alt="upload">
            <img class="cancel" src="@/assets/image/white-cross.png" alt="cancel">
          </div>
        </div>
        
        <div class="user__avatar">
          <img class="user__avatar__img" src="@/assets/image/avatar-1.png" alt="user-avatar">
          <div class="user__avatar__mask"></div>
          <img class="upload" src="@/assets/image/upload.png" alt="upload"> 
        </div>      
      </div>

      <div class="user__edit__content">
        <div class="form__wrapper">
          <label for="name" class="d-block">名稱</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="請輸入名稱"
            required
            autofocus
            class="d-block"          
          >
          <div class="compute">
            <div class="words__compute--warn">字數超出上限</div>
            <div class="words__compute">8/50</div>
          </div>
        </div>

        <div class="form__wrapper">
          <label for="bio" class="d-block">自我介紹</label>
          <textarea
            type="text"
            id="bio"
            name="bio"
            placeholder="請輸入自我介紹"
            required            
            class="d-block bio"
          ></textarea>
          <div class="compute">
            <div class="words__compute--warn">字數超出上限</div>
            <div class="words__compute">0/160</div>
          </div>
        </div>
      </div>
    </div>       
  </div>

</template>

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
        padding-left: 16px;
      }
      button {
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
          object-position: bottom;
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
      padding: 80px 16px 40px 16px;
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
      input, textarea {
        padding: 0 18px 2px 18px;
        width: 100%;
        border: 0px;
        background-color: $form-bg;
        font-size: 16px;
        line-height: 26px;
        color: $scale-gray10;
        border-bottom: 2px solid $form-border;
        text-align: start;
        &.bio {
          height: 147px;    
          resize: none;
        }
        &:hover, :focus {
          border-bottom: 2px solid $sider-blue;
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