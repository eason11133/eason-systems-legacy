**Archived — Eason Systems 早期客製軟體與市場驗證版本｜2026.05－07**

# Eason Systems Legacy Archive

這是 **Eason Systems 的歷史版本**，不是目前的正式官網，也不是現在的主要產品方向。

2026 年 5–7 月，在一次外部軟體合作之後，我開始主動尋找外部需求，嘗試把「能做系統」變成一套可以被市場理解與回應的服務。這個階段建立了對外官網、接案／CRM 追蹤流程，並透過 Email、LINE 等方式進行需求開發與市場測試。

這段探索最後**沒有形成商業成交**。後續 Eason Systems 已從 broad custom development 轉向自主產品開發；目前的 Eason Systems、LTA 與 EOT 請以 current repo 與正式網站為準。

**Current Eason Systems:** https://github.com/eason11133/eason-systems  
**Current website:** https://eason-systems.vercel.app/

> 這個 repository 保留早期「軟體接案與市場驗證」階段，作為開發過程、商業驗證與方向轉型的歷史證據。

## 這個階段在做什麼

當時的核心問題不是單純「做網站」，而是觀察中小型組織在 LINE、網站、表單與既有工具之間，是否反覆出現資訊難找、窗口重複回覆、資料分散與流程難維護等問題。

我把這些問題整理成一個可對外說明、可報價、可測試反應的服務網站，並同時建立名單追蹤與外部接觸流程。

Legacy 網站當時主要呈現：

- LINE / Web 查詢與導覽
- FAQ 與報名／申請分流
- 資源／據點查詢
- 資料回報與維護
- 不同規模的方案
- 功能與價格估算
- 中型系統案與小型入門方案
- 合作流程與聯絡入口

## 市場驗證紀錄

這一階段的外部開發紀錄為：

| 項目 | 數量 |
| --- | ---: |
| 建立名單 | 671 |
| 寄送 | 670 |
| 持續追蹤 | 595 |
| 收到回覆 | 125 |
| 最終成案 | **0** |

這些數字代表的是**市場測試與需求探索過程**，不是營收或成交成果。

這次驗證讓我實際看到：有回覆不等於有足夠強的付費需求；能把服務拆成方案、報價與流程，也不代表這個商業模式值得繼續投入。這也是後續 Eason Systems 從客製接案逐步轉向自主產品的重要原因。

## 網站當時呈現的主要方向

### 1. LINE / Web 查詢與導覽

把常見問題、活動分類、服務資訊與外部連結整理成清楚入口，降低使用者到處找資訊的成本。

### 2. FAQ 與申請分流

讓使用者在進入既有表單或系統前，先確認資格、流程、需要準備的資料與常見問題。

### 3. 資源與據點查詢

針對服務地點、合作單位、課程或其他清單型資料，設計搜尋、篩選、位置與導覽等使用情境。

### 4. 方案與報價

網站把模糊的「做網站／做系統」拆成不同層級的功能與價格區間，用來測試潛在需求是否能理解服務範圍，以及哪些模組最容易產生回應。

### 5. CRM / 名單追蹤概念

這個階段也整理了接觸名單、寄送、追蹤、回覆與後續任務等工作流程。Public repository **不保存實際客戶名單、Email 清單或 CRM 私人資料**。

## 與現在 Eason Systems 的關係

這個 repo 保存的是 **service / market-validation phase**。

後續方向已經改變：

**Toilet Bot / real software work → custom systems & market validation → independent products**

Current Eason Systems 不再以這份 legacy 網站中的接案服務選單作為主要定位。目前的 public product 是 **LTA**，**EOT** 仍在開發中。

請見：

- Current repo: https://github.com/eason11133/eason-systems
- Current website: https://eason-systems.vercel.app/

## 技術

這個 legacy website 使用：

- React 19
- Vite 8
- Tailwind CSS 4
- Framer Motion
- Lucide React

它是一個單頁式 React application，保留當時的服務說明、方案、估價器、CRM 預覽與市場測試用 landing page 結構。

## 專案結構

```text
src/
├── App.jsx       主要 legacy 頁面、文案與互動
├── App.css       頁面樣式
├── index.css     全域樣式
├── main.jsx      React 入口
└── assets/       網站素材

public/           公開靜態資源
index.html        Vite HTML 入口
package.json      專案依賴與 scripts
vite.config.js    Vite 設定
```

## 本機執行

需求：Node.js 與 npm。

```powershell
npm install
npm run dev
```

建立正式版本：

```powershell
npm run build
```

## Archive note

這個 repository 的目的是保留 **2026.05–07 的探索紀錄**，不是重新啟用當時的接案服務。

為了讓 archive 可以安全公開，source 中不保留實際外部開發名單、CRM 私人資料或真實聯絡方式；早期網站中的個人 Email / LINE 聯絡資訊已改為 archive placeholder。
