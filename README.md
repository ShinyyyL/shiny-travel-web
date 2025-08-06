# 🌟 Shiny Travel Web 更新流程清單

這份文件記錄了如何從本機更新網站，並透過 GitHub Actions 自動部署到 Firebase Hosting 🚀

---

## 1️⃣ 修改檔案
在本機 (`travel_web/public/`) 編輯或新增檔案：
- `index.html`
- `style.css`
- `images/`
- `svg/`
- …  

---

## 2️⃣ 檢查修改狀態
```bash
cd "C:\Users\Shiny lin\Desktop\travel_web"
git status

## 3️⃣ 查修改狀態
git add .

## 4️⃣ 建立 Commit
git commit -m "更新首頁內容與樣式"

## 5️⃣ 推送到 GitHub
git push origin main

## 6️⃣ 等待 GitHub Actions 自動部署
進 GitHub repo → 點上方 Actions

找到 firebase-hosting-merge.yml

出現綠勾勾 ✅ → 部署成功 → Firebase Hosting 已更新

## 7️⃣ 驗證網站
打開妳的 Firebase Hosting 網址（例如：
https://shiny-travel-web-b3e71.web.app/）
查看修改是否生效 🎉

⚠️ 注意
不用再手動 firebase deploy，因為 GitHub Actions 已經幫妳自動做了

不用動 GA 程式碼，只要它在 HTML 裡，部署上去就會追蹤

如果 push 之後 Actions 失敗（紅叉），通常是檔案路徑或 GitHub Secrets 設定問題，要去檢查 log
