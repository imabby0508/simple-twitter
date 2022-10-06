<template>

  <div class="container main-container">

    <MainNav />
    <!-- Tweet -->
    <div class="tweet">
      <div class="tweet__post">
        <h4 class="tweet__title">首頁</h4>

        <div class="tweet__content">
          <div class="tweet__description">
            <img
              class="tweet__avatar"
              src="@/assets/image/avatar-1.png"
              alt="avatar"
            >
            <h5>有什麼新鮮事?</h5>
          </div>
          <button>推文</button>
        </div>
      </div>

      <TweetCard />
      <TweetCard />
      <TweetCard />
      <TweetCard />
      <TweetCard />
      <TweetCard />
      <TweetCard />
      <TweetCard />
    </div>

    <PopularList />

  </div>
</template>

<script>
import MainNav from "./../components/MainNav";
import TweetCard from "./../components/TweetCard";
import PopularList from "./../components/PopularList";

export default {
  components: {
    MainNav,
    TweetCard,
    PopularList
  },
}

</script>

<style lang="scss" scoped>
//Main
.main-container {
  display: grid;
  grid-auto-flow: column;
}

.tweet {
  border: 1px solid #000;

  .tweet__title {
    padding: 24px;
    margin-bottom: 0;
  }

  .tweet__content {
    position: relative;
    height: 136px;
    padding: 16px 24px;
    border-top: 1px solid #000;
    border-bottom: 10px solid #000;

    .tweet__description {
      display: flex;

      .tweet__avatar {
        border-radius: 50%;
        width: 50px;
        height: 50px;
      }

      h5 {
        padding-left: 8px;
        line-height: 50px;
      }
    }

    button {
      position: absolute;
      right: 40px;
      bottom: 16px;
      width: 64px;
      height: 40px;
      border-radius: 50px;
      border: none;
    }
  }

  .tweet__card {
    .tweet__card__content {
      display: flex;
      padding: 16px 24px;

      .tweet__card__avatar {
        border-radius: 50%;
        width: 50px;
        height: 50px;
      }

      .tweet__card__title {
        display: flex;

        p {
          margin: 0
        }

        .tweet__card__name {
          margin: 0 8px 0 0;
        }
      }

      .tweet__card__right {
        padding-left: 8px;

        .tweet__card__content {
          margin: 0;
          padding: 10px 0;
        }
      }
    }

    .tweet__card__footer {
      display: flex;
      align-items: center;

      img {
        width: 13px;
        height: 13px;
      }

      p {
        margin: 0 40px 0 10px;
      }
    }
  }
}
</style>