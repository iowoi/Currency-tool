# KVB Pages

## Environment

Node.js > 8, npm > 5

## Dev

9000 port

```
npm i
npm start
```

## Build

```
npm run build
```

static files will locate in `dist` folder

## 注意事項

1. 須等 `npm start` 跑完再打開 `localhost:9000`，否則會出錯。
2. 新的 svg icon 在轉換前先把裡面的 `fill="XXX"` 移除，其他的不用動，注意檔名前綴為 `icn-`。
3. `assets/js/pages` 跟 `views` 裡的檔案沒有被 webpack watch 到，需要手動重新整理。
