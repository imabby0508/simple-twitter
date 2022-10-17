# simple-twitter

此專案係仿造並簡化 [Twitter](https://twitter.com/) 產品之內容及功能， 為採前後端分離開發之多人協作專案。

### Demo

👉 [專案 Demo](https://imabby0508.github.io/simple-twitter/)

### 採用技術

- vue2 + vuex + vue-router + axios + scss + sweetalert2
- 後端佈署於 heroku ([後端 GitHub](https://github.com/PigeonShogi/twitter-api-2020))

### Getting Started

#### 1.將本專案下載至本地

```
git clone https://github.com/imabby0508/simple-twitter.git
```

#### 2.進到專案資料夾

```
cd simple-twitter
```

#### 3.安裝所需套件

```
npm install
```

#### 4.在本地啟動專案

```
npm run serve
```

#### 5.將專案打包

```
npm run build
```

### 測試帳號

- 一般使用者
  - account: `user1` / password: `12345678`
  - account: `user2` / password: `12345678`
  - account: `user3` / password: `12345678`
  - account: `user4` / password: `12345678`
  - account: `user5` / password: `12345678`
- 後台管理員
  - account: `root` / password: `12345678`

### Features

- 前台登入
  - 註冊/登入/登出
  - 推文
    - 瀏覽
    - 回覆
    - 喜愛(新增/取消)
  - 使用者
    - 設定資料
    - 編輯大頭照、背景圖片、名稱、自我介紹
    - 追蹤他人(新增/取消)
- 後台登入
  - 推文
    - 瀏覽
    - 刪除
  - 使用者
    - 瀏覽

### 備註

- 若使用 node v14環境，可能會遇到 node-sass相容問題，解法可以參考這篇文章 [文章](https://ericwu.asia/2021/07/28/%E9%97%9C%E6%96%BC%E3%80%8Enode-sass-version-6-0-0-is-incompatible-with4-0-0%E3%80%8F%E8%A7%A3%E6%B3%95/)
