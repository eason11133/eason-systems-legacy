import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  Database,
  LineChart,
  ShieldCheck,
  Bot,
  Search,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Layers,
  Mail,
  Workflow,
  AlertTriangle,
  UserCheck,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function Card({ children, className = "" }) {
  return <div className={`rounded-3xl border border-white/10 bg-white/[0.08] ${className}`}>{children}</div>;
}

function CardContent({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

function Button({ children, variant = "solid", className = "" }) {
  const base = "inline-flex items-center justify-center rounded-2xl px-6 py-3.5 text-[0.98rem] font-medium transition";
  const styles =
    variant === "outline"
      ? "border border-slate-600 bg-transparent text-slate-100 hover:bg-white/10"
      : "bg-cyan-300 text-slate-950 hover:bg-cyan-200";

  return <button className={`${base} ${styles} ${className}`}>{children}</button>;
}

const content = {
  zh: {
    navContact: "聯絡評估",
    badge: "查詢導覽・FAQ 分流・資料回報｜小型服務入口工具",
    heroTop: "Eason Systems",
    heroHighlight: "把使用者一直問的問題，變成可自助查詢的入口",
    heroText:
      "我協助協會、課程單位、公益與服務型組織，把常被問的問題、據點 / 資源查詢、報名 / 申請入口、資料錯誤回報，整理成 LINE / Web 上可以自助查詢、導覽、回報的小型工具。不是泛用網頁或 CRM，而是先解決使用者找不到資訊、窗口重複回覆、資料不好更新的問題。",
    heroButton: "看適合做哪種入口工具",
    stat1Title: "負責人",
    stat1Text: "黃元逸 Eason",
    stat2Title: "身分",
    stat2Text: "高中生 / 學生開發者",
    stat3Title: "案例",
    stat3Text: "公廁 Bot 3 萬+ 使用者",
    rightBadge: "Who / What / Pricing",
    rightSmall: "先把合作方式講清楚",
    rightTitle: "不是大型系統公司，也不是免費顧問；我提供的是小型第一版 LINE / Web 查詢導覽工具。",
    rightCards: [
      ["負責人", "黃元逸 Eason"],
      ["身分", "高中生 / Eason Systems 學生開發者"],
      ["服務方式", "前期 15–20 分鐘了解需求不收費，只判斷是否適合；正式功能規劃、流程設計、開發與上線協助會依範圍報價。"],
      ["代表案例", "公共廁所查詢 LINE Bot，累積 3 萬+ 使用者。"],
    ],
    miniStats: [["身份", "學生開發者"], ["主軸", "查詢導覽"], ["案例", "3萬+使用者"]],
    fitLabel: "適合情況",
    fitTitle: "適合找我的狀況",
    fitText: "如果貴單位的問題是「使用者找不到資訊、一直問窗口、資料常常要更新、回報無處整理」，我比較適合協助。重點不是先做大型後台，而是先做出能被民眾、會員、家長或使用者實際使用的第一版入口工具。",
    fitSituations: [
      "民眾、會員、家長常重複詢問相同問題",
      "服務流程、報名入口、FAQ、資料下載散在不同頁面",
      "服務據點、資源清單、合作單位或課程資訊需要定期更新",
      "使用者查不到、資料錯誤或資訊過期時，需要有回報入口",
      "想先做一個可上線測試的小型第一版，而不是大型系統",
    ],
    problemLabel: "發現問題",
    problemTitle: "民眾找不到資訊，同仁就會一直重複回覆",
    painPoints: [
      "活動資訊、報名連結、捐款入口、志工資訊散在不同頁面",
      "民眾、家長或參與者常在 LINE、私訊、Email 重複問同樣問題",
      "同仁知道資料在哪裡，但民眾不知道該從哪個入口開始",
      "LINE 官方帳號目前只是公告欄，還沒有變成查詢與分流入口",
      "已經有 netiCRM、Google 表單或報名系統，但民眾進去前還是一直問",
      "活動後還要手動整理查詢次數、熱門問題、名單或成果資料",
    ],
    googleLabel: "不是重做系統",
    googleTitle: "不一定要換掉原本工具，很多時候只是缺前面的入口",
    googleText: "如果貴單位已經有 Google 表單、netiCRM、報名系統、捐款系統或官網，我不會建議一開始就重做。真正需要補上的，通常是民眾進入這些工具前的 LINE / Web 導覽層。",
    googlePoints: [
      ["Google 工具適合做什麼", "單純報名、基本問卷、表格收資料、少量人工整理，這些不需要硬做系統。"],
      ["系統該解決什麼", "報名後自動通知、依狀態追蹤名單、LINE FAQ 分流、後台更新資料、活動後整理成果數據。"],
      ["我會先幫你判斷", "先確認哪些沿用 Google 就好，哪些真的值得客製，避免把預算花在不必要的功能上。"],
    ],
    frontEntryLabel: "我的解法",
    frontEntryTitle: "既有系統負責資料，我負責入口、導覽與分流",
    frontEntryText:
      "我不是來取代你們原本的 netiCRM、Google 表單、報名系統或官網，而是協助整理它們前面的入口。讓民眾可以先透過 LINE / Web 找到正確活動、確認報名資格、閱讀常見問題、了解需要準備什麼，最後再被導到原本的表單、報名頁、捐款頁或官網。",
    frontEntryNote: "這類補強方式適合已經有工具，但民眾仍常透過 LINE、私訊或 Email 重複詢問的單位。目的不是多做一個系統，而是降低民眾找不到資訊與同仁重複回覆的成本。",
    frontEntryCards: [
      ["LINE / Web 前端導覽", "整理活動分類、報名資格、常見問題、聯絡窗口與報名連結，讓民眾不用到處找資訊。"],
      ["FAQ 與報名前分流", "讓民眾在進入表單前，先確認自己適合哪個活動、需要準備什麼資料、是否符合資格。"],
      ["導回既有系統", "最後仍導回原本的 netiCRM、Google 表單、報名頁、捐款頁或官網，不需要一開始改動既有資料流程。"],
    ],
    audienceLabel: "About",
    audienceTitle: "是的，我是學生開發者，但主軸不是泛用網頁或 CRM",
    audienceText: "我是黃元逸 Eason，目前以 Eason Systems 承接小型 LINE / Web 工具開發。我擅長的不是單純形象網站，而是把使用者會查、會問、會回報的資訊流程整理成可以實際使用的服務入口。前期 15–20 分鐘簡單了解需求不收費；若需要正式功能規劃、流程設計、系統開發、部署或上線協助，會依實際功能範圍報價。",
    audienceGroups: [
      ["真實上線經驗", "公廁查詢 LINE Bot 已實際上線，累積超過 3 萬名使用者。"],
      ["LINE / Web 查詢入口", "熟悉 LINE Bot、查詢流程、資料整理、簡易後台與 Dashboard 的整合。"],
      ["流程拆解能力", "會先整理使用者會問什麼、查什麼、回報什麼，再決定第一版要做什麼。"],
      ["早期合作彈性", "目前仍在累積案例階段，價格與合作方式會比一般客製系統更彈性。"],
    ],
    eventSystemLabel: "課程 / 營隊 / 活動系統",
    eventSystemTitle: "課程、營隊與活動流程系統",
    eventSystemText: "若單位正在經營課程、營隊、親子活動、工作坊或系列活動，我可以協助把活動前、中、後的資訊與報名流程整理成一套系統：不是多做一個網頁，而是減少主辦方反覆回覆、手動整理名單與活動後補資料的壓力。",
    eventSystemPoints: [
      ["活動網站 / 課程資訊頁", "課程介紹、活動說明、時間地點、交通資訊、注意事項與聯絡窗口"],
      ["報名流程整合", "串接既有報名表，或整理報名欄位、報名後通知與確認流程"],
      ["LINE 導覽與 FAQ 分流", "活動資訊、交通、報到方式、常見問題、聯絡窗口快速查詢"],
      ["名單管理 / 報到輔助", "報名資料整理、狀態分類、QR Code 或名單核對流程評估"],
      ["問卷與成果統計", "活動後問卷、查詢數、點擊數、報名狀況或成果摘要整理"],
      ["後台資料管理", "活動資訊、FAQ、連結、名單或資料內容可由管理者更新"],
    ],
    buildLabel: "可以補上的部分",
    buildTitle: "我能補上的，是使用者查詢、導覽、回報前的那段混亂流程",
    buildText:
      "也就是 LINE 詢問、FAQ 分流、據點 / 資源查詢、報名前導覽、資料錯誤回報、既有表單 / 官網 / 社群連結整合、使用者查詢紀錄，以及後續資料維護。這些才是我主要協助的地方。",
    features: [
      { icon: Bot, title: "LINE 詢問分流", text: "把常見問題、活動分類、聯絡窗口與報名連結整理成 LINE / Web 查詢入口。" },
      { icon: MapPin, title: "活動資訊入口", text: "讓民眾從一個清楚入口找到活動內容、報名方式、捐款入口、志工資訊或官網頁面。" },
      { icon: Search, title: "報名前導覽", text: "在民眾進入表單前，先確認適合哪個活動、是否符合資格、需要準備什麼資料。" },
      { icon: LineChart, title: "使用者查詢紀錄", text: "可留下查詢、點擊、熱門問題或分流紀錄，協助活動後整理成果與優化入口。" },
    ],
    flowLabel: "Service Flow",
    flowTitle: "合作通常怎麼開始？",
    offerSteps: [
      ["01｜先了解目前流程", "你只要簡單說明目前怎麼報名、怎麼回覆、資料放在哪裡。"],
      ["02｜我協助整理可優化的地方", "判斷哪些地方適合系統化，哪些維持 Google 表單或原本工具就好。"],
      ["03｜確認第一版功能", "先做最必要的功能，不一開始做過大系統。"],
      ["04｜報價、開發、測試與上線", "依功能範圍確認價格、交付內容、測試方式與後續維護，完成後提供操作說明。"],
    ],
    outcomes: ["把模糊想法整理成清楚功能與流程", "讓使用者能真的在線上完成查詢或操作", "讓資料或內容可以由管理者自己維護", "讓系統未來能累積使用紀錄與成果數據"],
    packageLabel: "Plans & Pricing",
    packageTitle: "常見做法：先補查詢入口、導覽與回報，不急著重做系統",
    packageText: "合作時會先看使用者目前怎麼找資訊、怎麼問問題、怎麼進入表單或既有系統，以及資料錯誤時誰負責更新。通常會優先補 LINE / Web 查詢導覽、FAQ 分流、據點 / 資源查詢、回報入口與既有連結整合；只有在資料真的需要長期維護時，才會加入簡易後台。",
    midPlanLabel: "Main Focus",
    midPlanTitle: "目前比較值得主推的合作方向",
    midPlanText: "這些不是泛用網頁或 CRM，而是以「使用者自助查詢、服務導覽、資料回報、資訊維護」為核心的第一版工具。適合有大量重複詢問、服務據點 / 資源清單、課程活動資訊、申請流程或資料更新需求的單位。",
    midPlans: [
      { name: "LINE / Web 查詢導覽第一版", price: "NT$ 30,000–80,000 起", subtitle: "適合常被問重複問題、資訊分散、想先做自助查詢入口的單位", items: ["LINE / Web 入口流程設計", "常見問題與服務分類導覽", "導回既有表單、官網或報名頁", "測試、上線與操作說明"] },
      { name: "資源 / 據點查詢系統", price: "NT$ 50,000–120,000 起", subtitle: "適合救傷中心、社福據點、合作店家、服務地點、會員機構查詢", items: ["使用者定位或條件查詢", "最近據點 / 合適資源推薦", "Google Maps 導航連結", "據點資料維護與查詢紀錄"] },
      { name: "FAQ 分流 + 報名 / 申請導覽", price: "NT$ 30,000–90,000 起", subtitle: "適合課程、營隊、協會活動、證書 / 積分、申請流程與報名前問題", items: ["報名前資格與流程導覽", "繳費、證書、退費、文件 FAQ", "導回既有報名表或系統", "熱門問題與點擊紀錄"] },
      { name: "資料回報 / 缺口整理工具", price: "NT$ 50,000–120,000 起", subtitle: "適合資料會過期、使用者會回報錯誤、需要後台確認與更新的單位", items: ["使用者回報錯誤或缺漏資料", "管理者確認與處理狀態", "資料更新紀錄與基礎統計", "可搭配 LINE 或 Web 查詢入口"] },
    ],
    midPlanNote: "中型系統案會先用 Email 或 LINE 確認需求，再視情況安排 15–30 分鐘線上討論，確認功能範圍、時程、報價、付款節點、驗收方式與上線後維護。",
    midPlanButton: "詢問這個中型系統案",
    midPlanMailSubject: "中型系統合作詢問｜",
    smallPlanLabel: "Small Starter Plans",
    smallPlanTitle: "小型入門方案（非主推）",
    smallPlanText: "小方案只保留給需求單純、想先整理資訊或測試合作的客戶。若需求包含資料管理、查詢、後台、Dashboard、定位、長期更新或多角色流程，會直接建議改談上方中型系統案。",
    smallPlans: [
      { name: "一頁式活動 / 課程網頁", price: "NT$ 8,000–15,000", subtitle: "適合活動、課程、營隊、講座、工作坊", items: ["活動介紹與重點整理", "報名連結 / 表單整合", "時間地點與注意事項", "FAQ 與聯絡資訊"] },
      { name: "LINE 官方帳號整理", price: "NT$ 5,000–10,000", subtitle: "適合已經有 LINE，但資訊分散或選單不好用", items: ["圖文選單規劃", "常見問題分類", "表單 / 官網 / 社群連結整理", "基礎回覆文字整理"] },
      { name: "小店 / 個人品牌資訊頁", price: "NT$ 6,000–18,000", subtitle: "適合小店、餐飲、個人品牌、自由工作者或市集品牌", items: ["店家 / 個人介紹", "菜單 / 服務項目 / 價格整理", "Google 地圖 / 預約 / 表單連結", "LINE / IG / 電話整合"] },
      { name: "FAQ / 資訊整理版", price: "NT$ 10,000–20,000", subtitle: "適合重複詢問很多，但暫時不需要後台的單位", items: ["5–10 個常見問題整理", "基本分流與按鈕導覽", "外部連結整合", "基礎測試與操作說明"] },
    ],
    upgradeNote: "小方案以資訊整理與簡單頁面 / LINE 流程為主，不包含客製後台、資料庫、Dashboard、定位查詢或複雜流程。若合作過程中發現需要長期更新、資料管理或查詢功能，會改以中型系統案重新評估。",
    smallPlanButton: "選這個方案來信討論",
    smallPlanMailSubject: "小方案合作詢問｜",
    crmPlanButton: "選這個 CRM 方案來信討論",
    crmMailSubject: "接案 CRM / 管理系統詢問｜",
    crmLabel: "Other / Internal Tools",
    crmTitle: "其他可評估：內部後台 / CRM 不是主推，只在真的有資料管理痛點時做",
    crmText: "CRM、後台、名單管理不是目前主推產品，因為這類工具市場很成熟，也常常已有既定流程。只有在貴單位真的沒有可用工具、資料需要長期維護，或查詢導覽工具必須搭配後台更新內容時，才會另外評估簡易後台、名單管理或工作追蹤工具。",
    crmExplainTitle: "CRM 是什麼？",
    crmExplainText: "不用把它想得很企業。它可以只是把名單、Email、狀態、日期、方案、預計收入、實際收款與每日任務放在同一個畫面，讓你不用一直翻表格或忘記追蹤。",
    crmPreviewTitle: "實例預覽：接案名單追蹤系統",
    crmPreviewText: "可做成像接案工作台一樣：上方看總收益與進度，中間用日期滾輪看今天要寄信、追蹤或交付什麼，下方再用名單一覽管理每位客戶。",
    crmPreviewStats: [["100", "客戶名單"], ["100", "已寄信"], ["500K", "預計收益"], ["今日", "任務檢查"]],
    crmPreviewRows: ["日期滾輪：寄信 / 追蹤 / 工作 / 交付", "名單一覽：狀態、方案、Email、下一步", "每日任務：達成或未達成延到明天"],
    crmPlans: [
      { name: "個人本機管理工具", price: "NT$ 15,000 起", subtitle: "適合個人接案者、學生或小型業務自己使用", items: ["客戶名單與狀態追蹤", "日期滾輪與每日事項", "預計收益 / 實際收款", "資料存在使用者瀏覽器"] },
      { name: "客製欄位管理工具", price: "NT$ 25,000–40,000 起", subtitle: "適合有固定流程、欄位與追蹤需求的工作室", items: ["客製狀態與欄位", "批量貼上與搜尋篩選", "進行中工作與交付日期", "依實際流程調整版面"] },
      { name: "雲端團隊管理工具", price: "NT$ 50,000 起，依需求評估", subtitle: "適合多人共用，需要登入、資料庫或權限管理", items: ["登入與雲端資料庫", "多人共用與權限規劃", "備份與資料管理", "可加 Dashboard / 統計分析"] },
    ],
    crmNote: "個人本機版適合自己使用，價格較低，但資料主要存在同一台電腦與瀏覽器。若需要多人登入、雲端同步、權限、正式資料庫、備份或長期維護，會建議改做雲端團隊版，價格也會依需求提高。",
    maintenancePlanButton: "選這個維護方案來信討論",
    maintenanceMailSubject: "維護方案詢問｜",
    maintenanceLabel: "Maintenance Options",
    maintenanceTitle: "上線後也可以選擇單次修改或每月維護",
    maintenanceText: "小方案或完整系統完成後，如果需要後續調整、內容更新、穩定代管或使用數據整理，可以依需求選擇單次維護或月維護。維護費是處理、檢查與協助的服務費；主機費、資料庫費或外部平台費用則依實際平台另計。",
    maintenancePlans: [
      { name: "單次修改 / 小維護", price: "NT$ 1,000–5,000 起 / 次", subtitle: "適合偶爾改文字、連結、圖片或小功能", items: ["文字、連結、FAQ 小幅更新", "表單或按鈕連結調整", "簡單錯誤修正", "不含大型功能重做"] },
      { name: "每月基礎維護", price: "NT$ 1,500–6,000 起 / 月", subtitle: "適合希望系統有人定期檢查與小幅調整", items: ["每月小幅內容更新", "基礎問題排查", "簡易使用狀況整理", "LINE / 網站連結與功能檢查"] },
      { name: "月報 / 資料更新維護", price: "NT$ 2,000–8,000 起 / 月", subtitle: "適合有後台、活動資料或 Dashboard 的系統", items: ["協助更新資料或活動資訊", "整理查詢、點擊或表單紀錄", "簡易月報或成果摘要", "依資料量與更新頻率調整"] },
      { name: "主機與系統代管", price: "NT$ 300–500 起 / 月", subtitle: "主機費另計，適合需要長期穩定上線的系統", items: ["部署與環境設定協助", "每月基本上線檢查", "小型異常判斷與重啟協助", "平台費用另計，不含新增功能"] },
    ],
    maintenanceNote: "實際維護範圍會在合作前確認。目前為早期案例累積階段，價格會比一般客製系統更彈性，但仍會正式確認功能範圍、時程、付款與驗收方式。若只是靜態一頁式網頁，通常不一定需要月維護；若有後台、資料庫、LINE Bot、Dashboard 或長期活動資料更新，建議至少保留基本維護與主機費預算。主機代管服務費通常是協助部署、檢查、重啟與基本問題排查，不等於平台本身收取的主機費。",
    cooperationNotes: [
      ["學生開發者，真實案例驗證", "目前由學生開發者接案與交付，已有公廁 Bot、Dashboard 與 LINE 系統實際上線經驗；其他規劃中專案會清楚標示為實作經驗，不會誤寫成完成案例。價格會比一般市場客製行情低一些，但合作前仍會先確認範圍、時程、付款與驗收方式。"],
      ["早期合作階段", "目前仍在累積正式案例，因此價格會比一般客製系統更彈性；但合作前仍會正式確認功能範圍、時程、付款、驗收與維護方式。"],
      ["UI 設計可彈性處理", "可由我協助做基礎介面與簡單視覺整理；若需要更完整品牌視覺、插圖或高階設計，也可由客戶提供設計稿或另找設計師。若需配合外部設計，開發時程可能會略微延長。"],
    ],
    packages: [
      { name: "基礎導入版", price: "NT$ 30,000 起", timeline: "開發時程：約 1 個月", subtitle: "適合把初步想法做成第一個可用版本", items: ["LINE 基礎入口", "基本流程設計", "簡易資料/資訊頁", "表單或外部連結整合"] },
      { name: "標準查詢版", price: "NT$ 50,000–90,000 起", timeline: "開發時程：約 2–3 個月", subtitle: "適合需要查詢流程、資料管理或後台的專案", items: ["LINE Bot 客製流程", "資料查詢或定位搜尋", "基礎後台資料管理", "測試、上線與操作說明"], featured: true },
      { name: "進階系統版", price: "NT$ 100,000 起，依需求評估", timeline: "開發時程：約 4 個月以上", subtitle: "適合需要演算法、數據追蹤或長期擴充的專案", items: ["定位搜尋與推薦排序", "NTS / Trust Score 版本比較", "Dashboard 與使用行為紀錄", "權限、月報表或進階維護方案"] },
    ],
    featured: "常見起步版本",
    estimatorLabel: "Feature Estimator",
    estimatorTitle: "勾選需要的功能，先看各功能加總後的大概預算",
    estimatorText: "可依需求勾選功能項目，系統會自動加總並產生初步預算區間。實際金額仍會依資料量、流程複雜度與交付範圍調整。" ,
    estimateOptions: [
      ["line-entry", "LINE Bot 基礎入口", 8000, "Webhook、基本訊息回覆、LINE 官方帳號串接"],
      ["menu-flow", "圖文選單 / 基本導覽流程", 4000, "讓使用者能用按鈕進入主要功能"],
      ["one-page-web", "一頁式網頁 / 活動頁", 8000, "活動、課程、服務或品牌介紹頁，可放報名連結、FAQ 與聯絡方式"],
      ["faq", "FAQ / 分類引導流程", 10000, "把常見問題或服務流程整理成可操作選單"],
      ["custom-form", "客製化表單", 5000, "簡易欄位設計、填寫流程、資料紀錄或表單結果整理" ],
      ["external-link", "外部連結 / 表單串接", 2000, "加入 Google Form、報名表、網站、地圖或其他外部頁面連結" ],
      ["data-query", "資料查詢功能", 10000, "讓使用者能查詢名單、資料清單、活動資訊或服務內容"],
      ["location", "定位搜尋 / 據點推薦", 15000, "依使用者位置回傳附近據點、導航連結或推薦結果"],
      ["admin-basic", "基礎後台資料管理", 15000, "管理者可新增、修改、刪除資料，不必每次找工程師"],
      ["admin-advanced", "進階後台 / 權限管理", 12000, "登入、角色權限、多資料表或更完整管理流程"],
      ["dashboard", "Dashboard / 使用紀錄", 15000, "紀錄查詢、點擊、熱門需求，提供成果追蹤"],
      ["ranking", "排序模型 / NTS 或 Trust Score 類功能", 20000, "需要更精準推薦、版本比較或資料可信度排序時使用"],
    ],
    clearAll: "一鍵清除",
    otherCustom: "其他客製功能",
    otherDesc: "例如特殊流程、第三方 API、會員功能、通知、匯出報表或其他未列出的需求。",
    modulePrice: "功能項目約 + NT$",
    otherPrice: "功能項目先暫估 + NT$ 6,000 起",
    estimateTitle: "功能加總預估",
    chooseFirst: "請先勾選功能",
    estimateDesc: "估價會把左側勾選的功能項目費用加總，再抓一個約 20% 的彈性範圍。此為早期案例累積階段的粗估區間，通常會比一般市場客製行情低一些；正式報價仍需確認資料量、畫面數、流程細節、驗收範圍與維護需求。",
    subtotal: "功能項目加總",
    rangeNote: "右上方區間 = 已選功能項目加總 ～ 加總約 1.2 倍。",
    monthlyTitle: "上線後固定成本提醒",
    monthlyDefault: "正式上線後主機費約 US$7 / 月起（另計）",
    monthlyDesc: "主機、資料庫或外部平台費用會依實際架構調整，通常不包含在一次性開發費內。",
    selectedTitle: "已選功能",
    noneSelected: "尚未選擇功能。",
    reminder: "提醒：這裡比較像功能配件表，用來抓預算量級；不是每個功能獨立成案的價格。目前為早期案例累積階段，價格會比一般客製系統更彈性。正式成案仍需把功能範圍、資料量、交付內容、測試期與後續維護一起確認。若系統需要穩定長期運行，主機費通常至少約 US$7 / 月起，屬於每月固定成本，與一次性開發費分開計算。",
    discussButton: "帶著已選功能來討論",
    resultsLabel: "Real Results",
    resultsTitle: "真實上線案例：公廁查詢 LINE Bot",
    resultsText: "這是目前最重要的信任素材。公廁 Bot 是已實際上線的 LINE / Web 系統，整合 LINE Bot、定位查詢、公廁資料、候選點排序與後台 Dashboard，累積超過 3 萬名使用者，並能查看查詢紀錄與使用數據。",
    cases: [
      { title: "公廁 Bot：公共服務據點查詢系統", tag: "真實上線案例", text: "整合 LINE Bot、定位查詢、公廁資料、候選點排序與後台 Dashboard。系統實際上線後累積超過 3 萬名使用者，並能查看查詢紀錄與使用數據。", links: [["查看案例介紹", "https://toilet-mvp-dev.vercel.app/#media"], ["查看 Dashboard", "https://school-i9co.onrender.com/dashboard"]] },
      { title: "LINE Bot 實際上線入口", tag: "實際使用入口", text: "這是公廁 Bot 的實際上線入口，可讓潛在客戶直接體驗使用者如何透過 LINE 完成查詢、定位與結果回傳。", links: [["加入 / 體驗 LINE Bot", "https://line.me/R/ti/p/@439avyvf"]] },
      { title: "野生動物救傷 LINE Bot", tag: "實作規劃經驗", text: "目前屬於需求討論與流程規劃中的公益單位系統方向，包含動物分類、外來種判斷、救傷資訊、位置查詢與基礎資料管理。此處作為相關實作規劃經驗，不標示為已完成合作案例。", links: [] },
    ],
    contactLabel: "Start With a Process Check",
    contactTitle: "你不用先決定要做什麼系統，先告訴我使用者一直問什麼、查不到什麼",
    contactText: "如果你有課程、活動、公益服務、據點資源、申請流程或資料回報需求，但不確定第一版該做什麼，可以先做一次簡單需求判斷。我會先確認哪些沿用 Google 表單、官網或既有系統就好，哪些真的值得做成 LINE / Web 查詢導覽、FAQ 分流或資料回報工具。",
    contactSmall: "可以先簡單聊聊",
    contactPrompt: "你現在想做什麼？使用者會怎麼操作？有哪些資料需要被查詢或管理？第一版最重要的功能是什麼？",
    contactButton: "先寄信討論流程",
    mailSubject: "查詢導覽 / FAQ 分流 / 資料回報工具初步詢問",
    mailHello: "您好，我想先簡單了解是否適合做 LINE / Web 查詢導覽、FAQ 分流或資料回報工具。",
    mailSelected: "我目前勾選的功能：",
    mailSubtotal: "功能項目加總：",
    mailEstimate: "初步估價區間：",
    mailMonthly: "固定營運成本：",
    mailBrief: "我想做的服務/問題簡述：",
    mailPlaceholder: "（請在這裡補充你的想法、使用者流程、資料來源或目前遇到的問題）",
  },
  en: {
    navContact: "Contact",
    badge: "Organizing the path before users enter your systems｜LINE / Web guidance",
    heroTop: "When information is scattered",
    heroHighlight: "I organize the path before users enter your systems",
    heroText:
      "Many organizations already have websites, Google Forms, netiCRM, registration pages, or donation systems. The real problem is often before users enter those tools: they cannot find the right entry, so they ask again through LINE, DMs, or email. I help organize activity information, FAQs, registration methods, donation entries, volunteer information, and existing links into a clear LINE / Web guidance flow.",
    heroButton: "View plans, pricing, and cases",
    stat1Title: "30,000+",
    stat1Text: "Real users in a LINE system case",
    stat2Title: "Flow",
    stat2Text: "Events, forms, FAQs",
    stat3Title: "Data",
    stat3Text: "Query, click, and event analytics",
    rightBadge: "Real system evidence",
    rightSmall: "What I can actually build",
    rightTitle: "Existing systems handle the data. I handle the entry, guidance, and routing layer.",
    rightCards: [
      ["LINE / web information entry", "Organize course details, event descriptions, FAQs, and registration links so users do not need to search across many places."],
      ["Registration and data cleanup", "Turn Google Forms, participant lists, and registration status into flows that are easier to search and manage."],
      ["Admin and outcome records", "Let internal teams update data, view lists, track query records, or organize event outcomes."],
    ],
    miniStats: [["Identity", "Student dev"], ["Pricing", "Free first check"], ["Case", "30k+ users"]],
    fitLabel: "Best Fit",
    fitTitle: "When I can help",
    fitText: "I am a better fit when a small organization needs a first usable workflow tool, rather than a large enterprise system.",
    fitSituations: [
      "Event info, registration data, and FAQs are scattered across different platforms",
      "Lists are still managed manually through Google Forms or Excel",
      "Participants, parents, or users repeatedly ask the same questions",
      "Service locations, resource lists, or event information need regular updates",
      "You want a small first-version tool before building a large system",
    ],
    problemLabel: "發現問題",
    problemTitle: "The problem is usually not a prettier page — it is too much scattered manual work",
    painPoints: [
      "Registration is in Google Forms, FAQs are in LINE, and reminders are copied manually",
      "It is hard to know who has been notified, replied, confirmed, or still needs follow-up",
      "Information is scattered across Excel, websites, PDFs, Google Forms, social posts, and LINE chats",
      "Your LINE official account should become a service and routing entry, not just an announcement board",
      "Every update, reply, and list cleanup depends on manual work",
      "You want query, click, registration status, or event outcome data without rebuilding reports by hand",
    ],
    googleLabel: "不是重做系統",
    googleTitle: "Not replacing Google — integrating what Google does not solve",
    googleText: "If all you need is a simple registration form, I would not recommend paying for a custom system; Google Forms and Sheets are already useful. But if the real issue is follow-up notifications, FAQ routing, list status, LINE replies, data cleanup, and outcome reports spread across tools, I can help connect them into one workflow.",
    googlePoints: [
      ["What Google tools are good for", "Simple sign-ups, surveys, collecting spreadsheet data, and small amounts of manual processing."],
      ["What a system should solve", "Post-registration notifications, status tracking, LINE FAQ routing, admin updates, and outcome data summaries."],
      ["Start with an honest check", "We first decide what should stay in Google tools and what is worth custom-building, so budget is not wasted on unnecessary features."],
    ],
    frontEntryLabel: "我的解法",
    frontEntryTitle: "Existing systems handle the data; I handle the entry, guidance, and routing layer",
    frontEntryText:
      "If your organization already uses netiCRM, Google Forms, an event registration system, a donation system, or other internal tools, I would not recommend replacing the existing workflow. What I can add is the LINE / Web guidance layer in front of those tools: helping people find the right activity, registration method, donation entry, volunteer information, and FAQs before routing them back to the existing system.",
    frontEntryNote: "Simply put: existing systems handle the data; I handle the entry, guidance, and routing layer. This is especially useful for teams that already have tools, but still receive repeated questions through LINE, DMs, or email.",
    frontEntryCards: [
      ["LINE / Web frontend guide", "Organize activity categories, eligibility, FAQs, contact windows, and registration links so users do not need to search everywhere."],
      ["FAQ and pre-registration routing", "Before users enter a form, help them confirm which activity fits, what documents are needed, and whether they are eligible."],
      ["Route back to existing systems", "Route users back to netiCRM, Google Forms, registration pages, donation pages, or the official website without changing the existing data workflow first."],
    ],
    audienceLabel: "About",
    audienceTitle: "Student developer with real live-system experience",
    audienceText: "I am Eason, the developer behind Eason Systems. I am currently a high school student, but this is not just practice work: I have already built and launched LINE / Web systems used by real users. I mainly help event, course, nonprofit, and small-organization teams turn scattered information and manual workflows into usable, maintainable systems.",
    audienceGroups: [
      ["Live system experience", "The public toilet LINE Bot has launched publicly and accumulated 30,000+ users."],
      ["LINE / Web systems", "Experience with LINE Bots, search flows, data organization, admin panels, and dashboards."],
      ["Workflow breakdown", "I first clarify how users search and how admins maintain data, then decide what belongs in version one."],
      ["Flexible early cooperation", "I am still building case experience, so pricing and cooperation can be more flexible than typical custom systems."],
    ],
    eventSystemLabel: "Course / Camp / Event Systems",
    eventSystemTitle: "Course, camp, and event workflow systems",
    eventSystemText: "For courses, camps, parent-child activities, workshops, or event series, I can help organize the before-during-after information and registration workflow into one system: participants find information faster, while organizers manage data and outcome records more easily.",
    eventSystemPoints: [
      ["Event website / course page", "Course details, event descriptions, time, location, transportation, notes, and contact windows"],
      ["Registration flow integration", "Connect existing forms or organize fields, confirmation messages, and follow-up information"],
      ["LINE navigation and FAQ routing", "Fast access to event info, transportation, check-in method, FAQs, and contact windows"],
      ["Participant list / check-in support", "Organize registration data, statuses, QR code or list verification workflow"],
      ["Survey and outcome analytics", "Post-event surveys, query logs, clicks, registration status, and outcome summary"],
      ["Admin content management", "Allow organizers to update event info, FAQs, links, lists, or data content"],
    ],
    buildLabel: "可以補上的部分",
    buildTitle: "I organize the messy process before users enter your systems",
    buildText:
      "Not every project needs to start big. I first check what is currently the most confusing: users cannot find information, registration follow-up is messy, LINE receives repeated questions, data needs frequent updates, or internal lead tracking is scattered. Then we decide whether version one should be a web page, LINE Bot, search system, admin panel, dashboard, or CRM.",
    features: [
      { icon: MapPin, title: "LINE / web information entry", text: "Organize course details, event information, FAQs, and registration links so users do not need to search across many places." },
      { icon: Database, title: "Registration and data cleanup", text: "Turn Google Forms, lists, and registration statuses into data flows that are easier to search and manage." },
      { icon: Bot, title: "FAQ and message routing", text: "Turn repeated questions into LINE or web query flows to reduce manual replies." },
      { icon: LineChart, title: "Admin and outcome records", text: "Let internal teams update data, view lists, track query records, or organize event outcomes." },
    ],
    flowLabel: "Service Flow",
    flowTitle: "How cooperation usually starts",
    offerSteps: [
      ["01｜Process check", "Clarify the problem, user flow, data source, admin workflow, and first-version priorities."],
      ["02｜LINE or web entry", "Build a LINE Bot, search flow, form integration, data search, or simple website so users can start using it."],
      ["03｜Admin and data", "If content must be updated long-term, add an admin panel so changes do not always require engineering work."],
      ["04｜Advanced ranking and analytics", "For a more product-like system, add ranking models, usage logs, dashboards, reports, permissions, or maintenance plans."],
    ],
    outcomes: ["Turn vague ideas into clear features and flows", "Let users complete real actions online", "Allow admins to maintain content and data", "Let the system accumulate usage and outcome data"],
    packageLabel: "Plans & Pricing",
    packageTitle: "Common approach: start with entry and routing, not system replacement",
    packageText: "If the need is only a simple event page or form, an existing tool or starter plan may be enough. If the need includes registration follow-up, LINE FAQ routing, list status tracking, data search, admin management, dashboards, or long-term updates, it is better scoped as a mid-sized system.",
    midPlanLabel: "Main Focus",
    midPlanTitle: "Common cooperation directions",
    midPlanText: "These are the most suitable formal cooperation types: nonprofits, associations, course/event teams, local teams, multi-location services, and small organizations. If you need users to search, submit, receive responses, and let admins update data and view records, these plans are more suitable than a simple page.",
    midPlans: [
      { name: "LINE Bot + admin data management", price: "NT$ 50,000–100,000+", subtitle: "For nonprofits, associations, event teams, and small organizations", items: ["LINE Bot flow and FAQ routing", "Admin add/edit data", "Data search and basic analytics", "Testing, launch, and usage guide"] },
      { name: "Location search / map recommendation system", price: "NT$ 60,000–150,000+", subtitle: "For rescue centers, social service points, service locations, and local data", items: ["User location and nearest-point recommendation", "Google Maps navigation links", "Admin management for location data", "Search logs and outcome tracking"] },
      { name: "Event / course workflow system", price: "NT$ 50,000–120,000+", subtitle: "For camps, course centers, workshops, and parent-child activities", items: ["Event info and registration flow", "LINE navigation and FAQ", "Admin updates for event data", "Pre-event info and basic stats"] },
      { name: "Small CRM / internal management tool", price: "NT$ 50,000–120,000+", subtitle: "For teams managing leads, projects, statuses, and delivery dates", items: ["Lead / client / project management", "Status tracking and date reminders", "Revenue stats and search filters", "Custom fields and layout by workflow"] },
    ],
    midPlanNote: "Mid-sized system projects usually start with email or LINE requirement checks. If suitable, we can arrange a 15–30 minute online meeting to confirm scope, timeline, price, payment milestones, acceptance criteria, and post-launch maintenance.",
    midPlanButton: "Email about this system project",
    midPlanMailSubject: "Mid-sized system inquiry｜",
    smallPlanLabel: "Small Starter Plans",
    smallPlanTitle: "Small starter plans",
    smallPlanText: "Small plans are for simple needs or first-time cooperation. If the project already involves data management, search, admin panels, dashboards, location search, long-term updates, or multi-role workflows, it should be scoped as a mid-sized system above.",
    smallPlans: [
      { name: "One-page event / course page", price: "NT$ 8,000–15,000", subtitle: "For events, courses, camps, lectures, and workshops", items: ["Event introduction and key information", "Registration link / form integration", "Time, location, and reminders", "FAQ and contact information"] },
      { name: "LINE official account cleanup", price: "NT$ 5,000–10,000", subtitle: "For existing LINE accounts with scattered information or unclear menus", items: ["Rich menu planning", "FAQ categorization", "Form / website / social link organization", "Basic reply text cleanup"] },
      { name: "Small shop / personal brand info page", price: "NT$ 6,000–18,000", subtitle: "For shops, restaurants, personal brands, freelancers, or market brands", items: ["Shop / personal introduction", "Menu / services / pricing cleanup", "Map / booking / form links", "LINE / IG / phone integration"] },
      { name: "FAQ / info cleanup", price: "NT$ 10,000–20,000", subtitle: "For teams with repeated questions but no admin panel yet", items: ["5–10 common questions", "Basic flow and button navigation", "External link integration", "Basic testing and usage guide"] },
    ],
    upgradeNote: "Small plans focus on information cleanup and simple web / LINE flows. They do not include custom admin panels, databases, dashboards, location search, or complex workflows. If long-term updates, data management, or search features are needed during discussion, the project will be re-scoped as a mid-sized system.",
    smallPlanButton: "Email about this plan",
    smallPlanMailSubject: "Small plan inquiry｜",
    crmPlanButton: "Email about this CRM plan",
    crmMailSubject: "CRM / internal tool inquiry｜",
    crmLabel: "Other / Internal Tools",
    crmTitle: "Other custom work: simple admin or list management if no internal tool exists",
    crmText: "If your organization already uses netiCRM, Google Forms, or other registration / donation / membership systems, I would not recommend rebuilding a CRM. I would first add the LINE / Web guidance layer before those tools, helping people find the right activity, eligibility, donation entry, volunteer information, and FAQs before routing them back to the existing system. If you do not have any internal tool yet, we can separately evaluate a simple admin panel, list manager, or workflow tracker.",
    crmExplainTitle: "What is a CRM?",
    crmExplainText: "It does not have to be an enterprise system. It can simply put leads, emails, statuses, dates, plans, estimated revenue, received payments, and daily tasks in one place so you do not need to keep switching spreadsheets.",
    crmPreviewTitle: "Example preview: freelance lead tracker",
    crmPreviewText: "It can work like a small business dashboard: top cards show progress and revenue, a date wheel shows today's emails, follow-ups, work, and delivery items, and the lead table manages each client.",
    crmPreviewStats: [["100", "Leads"], ["100", "Emailed"], ["500K", "Projected"], ["Today", "Tasks"]],
    crmPreviewRows: ["Date wheel: email / follow-up / work / delivery", "Lead table: status, plan, email, next step", "Daily tasks: done or move unfinished work to tomorrow"],
    crmPlans: [
      { name: "Personal local manager", price: "From NT$ 15,000", subtitle: "For individual freelancers, students, or small sales workflows", items: ["Lead and status tracking", "Date wheel and daily tasks", "Estimated / received revenue", "Data stored in the user's browser"] },
      { name: "Custom-field manager", price: "From NT$ 25,000–40,000", subtitle: "For studios with fixed fields, processes, and tracking needs", items: ["Custom statuses and fields", "Bulk paste, search, and filters", "Work tasks and delivery dates", "Layout adjusted to the actual workflow"] },
      { name: "Cloud team manager", price: "From NT$ 50,000, evaluated by scope", subtitle: "For teams that need login, cloud database, or permission management", items: ["Login and cloud database", "Team access and permission planning", "Backup and data management", "Optional dashboard / analytics"] },
    ],
    crmNote: "The personal local version is suitable for individual use and costs less, but the data is mainly stored in the same computer and browser. If you need team login, cloud sync, permissions, a formal database, backups, or long-term maintenance, the cloud team version is recommended and will be priced by scope.",
    maintenancePlanButton: "Email about this maintenance plan",
    maintenanceMailSubject: "Maintenance plan inquiry｜",
    maintenanceLabel: "Maintenance Options",
    maintenanceTitle: "After launch, choose one-time edits or monthly maintenance",
    maintenanceText: "After a small plan or full system is delivered, follow-up edits, content updates, stable hosting, or usage summaries can be handled through one-time maintenance or monthly maintenance. Maintenance is a service fee for handling, checking, and support; hosting, database, or third-party platform fees are charged separately by the actual platform.",
    maintenancePlans: [
      { name: "One-time edit / small maintenance", price: "From NT$ 1,000–5,000 / time", subtitle: "For occasional text, link, image, or small feature updates", items: ["Small text, link, or FAQ updates", "Form or button link changes", "Simple bug fixes", "Does not include major feature rebuilds"] },
      { name: "Basic monthly maintenance", price: "From NT$ 1,500–6,000 / month", subtitle: "For teams that want regular checks and minor updates", items: ["Monthly small content updates", "Basic issue checks", "Simple usage summary", "LINE / website link and function checks"] },
      { name: "Monthly report / data maintenance", price: "From NT$ 2,000–8,000 / month", subtitle: "For systems with admin panels, event data, or dashboards", items: ["Update data or event information", "Organize query, click, or form records", "Simple monthly report or outcome summary", "Adjusted by data volume and update frequency"] },
      { name: "Hosting and system management", price: "NT$ 300–500/month", subtitle: "Hosting fee separate. For systems that need stable long-term operation", items: ["Render / Vercel / database deployment and basic setup support", "Monthly basic uptime and environment checks", "Small incident diagnosis and restart / redeploy assistance", "Hosting, database, and third-party platform fees are charged separately by the platform", "Does not include new features, major redesigns, or large data updates"] },
    ],
    maintenanceNote: "The actual maintenance scope will be confirmed before cooperation. These are early cooperation rates, slightly lower than typical market pricing. If the cooperation goes well, a testimonial, recommendation letter, or case feedback would be appreciated. Static one-page websites may not need monthly maintenance, while admin panels, databases, LINE Bots, dashboards, or long-term content updates should reserve a basic maintenance and hosting budget. Hosting management service fees usually cover deployment support, checks, restarts, and basic issue diagnosis, not the platform hosting fee itself.",
    cooperationNotes: [
      ["Student developer with real cases", "The project is handled and delivered by a student developer with real public Toilet Bot, dashboard, and LINE system launch experience; projects still in planning will be clearly labeled as implementation experience rather than completed cases. Pricing is slightly lower than typical custom development market pricing, but scope, timeline, payment, and acceptance criteria will still be confirmed before development."],
      ["Early-stage rate and testimonial feedback", "Because this is a early cooperation rate and part of portfolio building, a testimonial, recommendation letter, case feedback, or referral would be appreciated if the cooperation goes well."],
      ["Flexible UI design options", "Basic interface layout and simple visual refinement can be included. If a more complete brand identity, illustration, or advanced UI design is needed, the client may provide design files or work with an external designer. Coordinating with external design may slightly extend the timeline."],
    ],
    packages: [
      { name: "Starter Version", price: "From NT$ 30,000", timeline: "Development time: about 1 month", subtitle: "For turning an initial idea into the first usable version", items: ["LINE basic entry", "Basic flow design", "Simple data/info page", "Form or external link integration"] },
      { name: "Standard Search Version", price: "From NT$ 50,000–90,000", timeline: "Development time: about 2–3 months", subtitle: "For projects needing search flows, data management, or an admin panel", items: ["Custom LINE Bot flow", "Data search or location search", "Basic admin panel", "Testing, launch, and documentation"], featured: true },
      { name: "Advanced System Version", price: "From NT$ 100,000, evaluated by scope", timeline: "Development time: about 4+ months", subtitle: "For projects needing algorithms, analytics, or long-term expansion", items: ["Location search and ranking", "NTS / Trust Score version comparison", "Dashboard and usage logs", "Permissions, reports, or maintenance plan"] },
    ],
    featured: "Common starting point",
    estimatorLabel: "Feature Estimator",
    estimatorTitle: "Select needed features to estimate a rough budget",
    estimatorText: "Select the modules you need, and the estimator will calculate a rough budget range. Final pricing may vary based on data volume, workflow complexity, and delivery scope.",
    estimateOptions: [
      ["line-entry", "LINE Bot basic entry", 8000, "Webhook, basic replies, LINE official account integration"],
      ["menu-flow", "Rich menu / basic navigation", 4000, "Let users enter main functions through buttons"],
      ["one-page-web", "One-page website / event page", 8000, "For events, courses, services, or brand pages with registration links, FAQs, and contact info"],
      ["faq", "FAQ / category flow", 10000, "Turn common questions or service flows into menus"],
      ["custom-form", "Custom form", 5000, "Simple field setup, submission flow, data records, or form result organization" ],
      ["external-link", "External link / form integration", 2000, "Add Google Forms, registration forms, websites, maps, or other external page links" ],
      ["data-query", "Data search feature", 10000, "Let users search lists, data, events, or service content"],
      ["location", "Location search / service point recommendation", 15000, "Return nearby points, navigation links, or recommendations from user location"],
      ["admin-basic", "Basic admin panel", 15000, "Admins can add, edit, and delete data without calling an engineer every time"],
      ["admin-advanced", "Advanced admin / permissions", 12000, "Login, roles, permissions, multiple tables, or more complete workflows"],
      ["dashboard", "Dashboard / usage logs", 15000, "Log queries, clicks, and popular needs for outcome tracking"],
      ["ranking", "Ranking model / NTS or Trust Score-like feature", 20000, "For more precise recommendation, version comparison, or data reliability ranking"],
    ],
    clearAll: "Clear all",
    otherCustom: "Other custom feature",
    otherDesc: "Special workflows, third-party APIs, members, notifications, report export, or other needs not listed here.",
    modulePrice: "Module estimate + NT$",
    otherPrice: "Temporary module estimate + NT$ 6,000+",
    estimateTitle: "Module total estimate",
    chooseFirst: "Select features first",
    estimateDesc: "The estimate adds selected module costs and gives a 20% flexible range. It is a rough early cooperation rate project range, usually slightly lower than typical custom development market pricing. Final pricing depends on data volume, screens, flow details, acceptance scope, and maintenance needs.",
    subtotal: "Module subtotal",
    rangeNote: "Upper range = selected modules subtotal × about 1.2.",
    monthlyTitle: "Post-launch fixed cost reminder",
    monthlyDefault: "After launch, hosting usually starts from about US$7/month, not included",
    monthlyDesc: "Hosting, database, or external platform fees depend on architecture and are usually separate from one-time development fees.",
    selectedTitle: "Selected features",
    noneSelected: "No features selected yet.",
    reminder: "Reminder: this is a feature-module estimate for budgeting, not a standalone price for each feature. These are early cooperation rates; if the cooperation goes well, a testimonial or case feedback would be appreciated. Final projects still need scope, data volume, deliverables, testing period, and maintenance terms confirmed. Stable long-term systems usually require hosting costs from about US$7/month, separate from one-time development fees.",
    discussButton: "Discuss with selected features",
    resultsLabel: "Real Results",
    resultsTitle: "View real launch results first",
    resultsText: "This section appears early so potential partners can first verify real launch experience, real users, and real dashboard/data interfaces. The public toilet Bot and dashboard are public implementation results; planning-stage projects are clearly labeled as requirement or implementation planning experience rather than completed client cases.",
    cases: [
      { title: "Public Toilet Bot: public service location search system", tag: "Live system case", text: "Using LINE as the entry, the system combines location search, public toilet data, candidate filtering, and NTS / Trust Score version comparison. This case shows that I can turn open data, LINE user flows, search logic, and dashboard analytics into a system used by real users.", links: [["View case page", "https://toilet-mvp-dev.vercel.app/#media"], ["View Dashboard", "https://school-i9co.onrender.com/dashboard"]] },
      { title: "Live LINE Bot entry", tag: "Live system entry", text: "This is the public toilet Bot live entry, where potential clients can directly experience how users complete search, location sharing, and result retrieval in LINE.", links: [["Add / try the LINE Bot", "https://line.me/R/ti/p/@439avyvf"]] },
      { title: "Wildlife rescue LINE Bot", tag: "Implementation planning experience", text: "This is currently a nonprofit system direction under requirement discussion and process planning, including animal category guidance, invasive species logic, rescue information, location search, and basic data management. It is presented as implementation planning experience, not as a completed client case.", links: [] },
    ],
    contactLabel: "Start With a Process Check",
    contactTitle: "You do not need to know the system yet — just tell me which workflow causes the most manual firefighting",
    contactText: "If registration, reminders, FAQs, LINE replies, data cleanup, or outcome reports are messy but you are not sure whether a system is needed, we can start with a process check. I can help decide what can stay in Google tools, what is worth custom-building, and what can wait for phase two.",
    contactSmall: "We can start simple",
    contactPrompt: "What do you want to build? How will users operate it? What data needs to be searched or managed? What is the most important first-version feature?",
    contactButton: "Email to discuss the flow",
    mailSubject: "System development idea discussion｜Initial feature estimate",
    mailHello: "Hello, I would like to discuss an initial system development idea.",
    mailSelected: "Selected features:",
    mailSubtotal: "Feature module subtotal:",
    mailEstimate: "Initial estimate range:",
    mailMonthly: "Monthly operating cost:",
    mailBrief: "Brief description of my service/problem:",
    mailPlaceholder: "(Please describe your idea, user flow, data source, or current problem here.)",
  },
};

function LegacyHomePage() {
  const [language, setLanguage] = useState("zh");
  const isEnglish = language === "en";
  const t = content[language];
  const estimateOptions = useMemo(
    () => t.estimateOptions.map(([id, label, price, desc]) => ({ id, label, price, desc })),
    [t]
  );
  const [selected, setSelected] = useState(["line-entry", "menu-flow"]);
  const [otherEnabled, setOtherEnabled] = useState(false);

  const selectedItems = useMemo(
    () => estimateOptions.filter((item) => selected.includes(item.id)),
    [estimateOptions, selected]
  );

  const subtotal = selectedItems.reduce((sum, item) => sum + item.price, 0) + (otherEnabled ? 6000 : 0);
  const monthlyCostLabel = t.monthlyDefault;
  const estimatedLow = subtotal === 0 ? 0 : subtotal;
  const estimatedHigh = subtotal === 0 ? 0 : Math.round((subtotal * 1.2) / 1000) * 1000;
  const estimateLabel = subtotal === 0 ? t.chooseFirst : `NT$ ${estimatedLow.toLocaleString()} – ${estimatedHigh.toLocaleString()}`;

  const selectedFeatureText = selectedItems.map((item) => `- ${item.label}（約 + NT$ ${item.price.toLocaleString()} 起）`).join("%0D%0A");
  const otherFeatureText = otherEnabled ? `%0D%0A- ${t.otherCustom}（+ NT$ 6,000 起）` : "";
  const mailSubject = encodeURIComponent(t.mailSubject);
  const mailBody = `${t.mailHello}%0D%0A%0D%0A${t.mailSelected}%0D%0A${selectedFeatureText || "- 尚未勾選功能"}${otherFeatureText}%0D%0A%0D%0A${t.mailSubtotal}${subtotal === 0 ? "尚未估算" : `NT$ ${subtotal.toLocaleString()}`}%0D%0A${t.mailEstimate}${estimateLabel}%0D%0A${t.mailMonthly}${monthlyCostLabel}%0D%0A%0D%0A${t.mailBrief}%0D%0A${t.mailPlaceholder}`;
  const estimateMailto = `mailto:archived-contact@example.invalid?subject=${mailSubject}&body=${mailBody}`;

  const buildSmallPlanMailto = (plan) => {
    const subject = encodeURIComponent(`${t.smallPlanMailSubject}${plan.name}`);
    const body = encodeURIComponent(
      `${t.mailHello}

` +
      `${isEnglish ? "Selected small plan" : "我想詢問的小方案"}：${plan.name}
` +
      `${isEnglish ? "Price range" : "方案價格"}：${plan.price}
` +
      `${isEnglish ? "Suitable for" : "適合情境"}：${plan.subtitle}
` +
      `${isEnglish ? "Student-rate note" : "早期合作說明"}：${isEnglish ? "This is an early-stage cooperation rate, and the scope, timeline, payment, and acceptance criteria will still be confirmed formally." : "目前為早期案例累積階段，價格會比一般客製系統更彈性。"}

` +
      `${isEnglish ? "Brief description of my need" : "我想做的內容簡述"}：
` +
      `${t.mailPlaceholder}`
    );
    return `mailto:archived-contact@example.invalid?subject=${subject}&body=${body}`;
  };

  const buildMidPlanMailto = (plan) => {
    const subject = encodeURIComponent(`${t.midPlanMailSubject}${plan.name}`);
    const body = encodeURIComponent(
      `${t.mailHello}

` +
      `${isEnglish ? "Selected mid-sized system" : "我想詢問的中型系統案"}：${plan.name}
` +
      `${isEnglish ? "Price range" : "方案價格"}：${plan.price}
` +
      `${isEnglish ? "Suitable for" : "適合情境"}：${plan.subtitle}

` +
      `${isEnglish ? "Brief description of my need" : "目前想解決的問題 / 需求簡述"}：
` +
      `${t.mailPlaceholder}`
    );
    return `mailto:archived-contact@example.invalid?subject=${subject}&body=${body}`;
  };

  const buildCrmPlanMailto = (plan) => {
    const subject = encodeURIComponent(`${t.crmMailSubject}${plan.name}`);
    const body = encodeURIComponent(
      `${t.mailHello}

` +
      `${isEnglish ? "Selected CRM / internal tool plan" : "我想詢問的 CRM / 內部管理系統方案"}：${plan.name}
` +
      `${isEnglish ? "Price range" : "方案價格"}：${plan.price}
` +
      `${isEnglish ? "Suitable for" : "適合情境"}：${plan.subtitle}
` +
      `${isEnglish ? "Student-rate note" : "早期合作說明"}：${isEnglish ? "This is an early-stage cooperation rate, and the scope, timeline, payment, and acceptance criteria will still be confirmed formally." : "目前為早期案例累積階段，價格會比一般客製系統更彈性。"}

` +
      `${isEnglish ? "Current workflow / tracking needs" : "目前想管理的流程或欄位"}：
` +
      `${isEnglish ? "(Please describe what you want to track, who will use it, and whether it needs cloud sync or login.)" : "（請簡單說明想追蹤什麼、誰會使用、是否需要雲端同步或登入）"}`
    );
    return `mailto:archived-contact@example.invalid?subject=${subject}&body=${body}`;
  };

  const buildMaintenancePlanMailto = (plan) => {
    const subject = encodeURIComponent(`${t.maintenanceMailSubject}${plan.name}`);
    const body = encodeURIComponent(
      `${t.mailHello}

` +
      `${isEnglish ? "Selected maintenance plan" : "我想詢問的維護方案"}：${plan.name}
` +
      `${isEnglish ? "Price range" : "方案價格"}：${plan.price}
` +
      `${isEnglish ? "Suitable for" : "適合情境"}：${plan.subtitle}

` +
      `${isEnglish ? "Current system / website status" : "目前系統 / 網頁狀況"}：
` +
      `${isEnglish ? "(Please describe what has been launched and what needs to be updated or maintained.)" : "（請簡單說明目前已上線的內容，以及想修改、維護或定期處理的項目）"}`
    );
    return `mailto:archived-contact@example.invalid?subject=${subject}&body=${body}`;
  };

  const toggleOption = (id) => {
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  const clearEstimate = () => {
    setSelected([]);
    setOtherEnabled(false);
  };

  return (
    <div id="top" className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,#0e7490_0%,transparent_28%),radial-gradient(circle_at_85%_12%,#312e81_0%,transparent_30%),linear-gradient(135deg,#020617_0%,#07111f_45%,#0f172a_100%)] text-slate-100 antialiased [font-feature-settings:'palt']">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.42)_58%,rgba(2,6,23,0.92)_100%)]" />
        <div className="absolute -right-32 -top-40 h-[30rem] w-[30rem] rounded-full bg-cyan-500/25 blur-3xl" />
        <div className="absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -left-28 top-96 h-96 w-96 rounded-full bg-indigo-500/25 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />
      </div>

      <header className="relative z-20 mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between">
        <a href="#top" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-400/15 ring-1 ring-cyan-300/25">
            <Bot className="h-5 w-5 text-cyan-300" />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-wide text-white">Eason Systems</p>
            <p className="text-xs text-slate-400">查詢導覽・FAQ 分流・資料回報</p>
          </div>
        </a>

        <div className="flex flex-wrap items-center justify-end gap-3">
          <nav className="order-2 flex w-full flex-wrap items-center gap-1 rounded-full border border-white/10 bg-white/[0.05] p-1 md:order-1 md:w-auto">
            {[
              ["#fit", "適合情況"],
              ["#problem", "問題"],
              ["#solution", "解法"],
              ["#packages", "方案"],
              ["#results", "案例"],
              ["#estimate", "估價"],
              ["#contact", "聯絡"],
            ].map(([href, label]) => (
              <a key={href} href={href} className="rounded-full px-3 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white md:px-4">
                {label}
              </a>
            ))}
          </nav>
          <div className="order-1 flex rounded-full border border-white/10 bg-white/[0.05] p-1 text-sm md:order-2">
            <button type="button" onClick={() => setLanguage("zh")} className={`rounded-full px-4 py-2.5 transition ${!isEnglish ? "bg-cyan-300 text-slate-950" : "text-slate-300 hover:text-white"}`}>中文</button>
            <button type="button" onClick={() => setLanguage("en")} className={`rounded-full px-4 py-2.5 transition ${isEnglish ? "bg-cyan-300 text-slate-950" : "text-slate-300 hover:text-white"}`}>EN</button>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section className="mx-auto grid max-w-6xl gap-10 px-6 pb-16 pt-14 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.82fr)] md:items-center md:pt-16">
          <motion.div className="min-w-0" initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-[0.95rem] leading-none text-cyan-200">
              <Sparkles className="h-4 w-4" />
              {t.badge}
            </div>
            <h1 className="max-w-[44rem] break-words text-[2.45rem] font-semibold leading-[1.18] tracking-normal text-white md:text-[3rem] lg:text-[3.25rem] xl:text-[3.45rem]">
              <span className="block whitespace-normal">{t.heroTop}</span>
              <span className="mt-1 block whitespace-normal text-cyan-300">{t.heroHighlight}</span>
            </h1>
            <p className="mt-6 max-w-[40rem] break-words text-base leading-8 text-slate-300 md:text-[1.05rem]">{t.heroText}</p>

            <div className="mt-7 grid max-w-[37rem] gap-3 sm:grid-cols-3">
              {[[t.stat1Title, t.stat1Text, true], [t.stat2Title, t.stat2Text], [t.stat3Title, t.stat3Text]].map(([title, text, accent]) => (
                <div key={title} className={`rounded-2xl border p-4 ${accent ? "border-cyan-300/20 bg-cyan-300/10" : "border-white/10 bg-white/[0.06]"}`}>
                  <p className="text-[1.65rem] font-semibold leading-none text-white md:text-[1.85rem]">{title}</p>
                  <p className={`mt-1 text-sm ${accent ? "text-cyan-100" : "text-slate-300"}`}>{text}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#fit"><Button>{t.heroButton} <ArrowRight className="ml-2 h-4 w-4" /></Button></a>
            </div>
          </motion.div>

          <motion.div className="w-full min-w-0 md:max-w-xl md:justify-self-end" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }}>
            <Card className="bg-white/10 shadow-2xl backdrop-blur">
              <CardContent className="p-5 md:p-7">
                <div className="mb-6 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3"><div className="h-3 w-3 rounded-full bg-red-400" /><div className="h-3 w-3 rounded-full bg-yellow-400" /><div className="h-3 w-3 rounded-full bg-green-400" /></div>
                  <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs text-cyan-200">{t.rightBadge}</span>
                </div>
                <div className="rounded-3xl bg-slate-900/70 p-5 ring-1 ring-white/10 md:p-6">
                  <p className="text-sm font-semibold text-cyan-200">{t.rightSmall}</p>
                  <h3 className="mt-3 break-words text-xl font-semibold leading-snug tracking-normal text-white md:text-[1.45rem]">{t.rightTitle}</h3>
                  <div className="mt-5 space-y-3">
                    {t.rightCards.map(([title, text], idx) => (
                      <div key={title} className={`rounded-2xl border p-4 ${idx >= 2 ? "border-cyan-300/20 bg-cyan-300/10" : "border-white/10 bg-white/[0.06]"}`}>
                        <div className="flex items-start gap-3">
                          {idx >= 2 ? <LineChart className="mt-0.5 h-5 w-5 text-cyan-200" /> : <div className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-300" />}
                          <div><p className="font-semibold text-white">{title}</p><p className="mt-1 text-sm leading-7 text-slate-300">{text}</p></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 grid grid-cols-3 gap-3 text-center text-sm">
                    {t.miniStats.map(([title, text]) => (
                      <div key={title} className="rounded-2xl bg-white/[0.08] p-3"><p className="text-lg font-bold text-white">{title}</p><p className="mt-1 text-xs text-slate-400">{text}</p></div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        


        <section id="fit" className="scroll-mt-24 border-y border-white/10 bg-white/[0.04]">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div>
                <p className="text-sm font-semibold text-cyan-300">{t.fitLabel}</p>
                <h2 style={{ textWrap: "balance" }} className="mt-3 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-[2.35rem]">{t.fitTitle}</h2>
                <p className="mt-5 leading-7 text-slate-300">{t.fitText}</p>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {t.fitSituations.map((item, idx) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                    <div className="flex gap-4">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-cyan-300/10 text-sm font-bold text-cyan-200">{idx + 1}</div>
                      <p className="text-sm leading-7 text-slate-200">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="problem" className="scroll-mt-24 border-y border-white/10 bg-white/[0.03]"><div className="mx-auto max-w-7xl px-6 py-16"><div className="max-w-5xl"><p className="text-sm font-semibold text-cyan-300">{t.problemLabel}</p><h2 style={{ textWrap: "balance" }} className="mt-3 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-[2.35rem]">{t.problemTitle}</h2></div><div className="mt-8 grid gap-3 md:grid-cols-3">{t.painPoints.map((item) => <div key={item} className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-slate-300">{item}</div>)}</div></div></section>

        <section className="mx-auto max-w-7xl px-6 py-20"><div className="grid gap-8 rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-6 md:grid-cols-[0.9fr_1.1fr] md:p-8"><div><p className="text-sm font-semibold text-cyan-200">{t.googleLabel}</p><h2 style={{ textWrap: "balance" }} className="mt-3 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-[2.35rem]">{t.googleTitle}</h2><p className="mt-5 leading-7 text-slate-300">{t.googleText}</p></div><div className="grid gap-4">{t.googlePoints.map(([title, text]) => <Card key={title} className="bg-slate-950/45"><CardContent className="flex gap-4 p-5"><div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-300/10"><ShieldCheck className="h-5 w-5 text-cyan-200" /></div><div><p className="font-semibold text-white">{title}</p><p className="mt-2 text-sm leading-6 text-slate-300">{text}</p></div></CardContent></Card>)}</div></div></section>

        <section className="mx-auto max-w-7xl px-6 pb-20">
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 md:p-8">
            <div className="mb-8 max-w-5xl">
              <p className="text-sm font-semibold text-cyan-300">{t.frontEntryLabel}</p>
              <h2 style={{ textWrap: "balance" }} className="mt-3 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-[2.35rem]">{t.frontEntryTitle}</h2>
              <p className="mt-5 leading-7 text-slate-300">{t.frontEntryText}</p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {t.frontEntryCards.map(([title, text]) => (
                <Card key={title} className="bg-slate-950/45">
                  <CardContent className="p-5">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-300/10">
                      <ArrowRight className="h-5 w-5 text-cyan-200" />
                    </div>
                    <p className="font-semibold text-white">{title}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="mt-6 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-sm leading-7 text-cyan-50">{t.frontEntryNote}</p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20"><div className="mb-10 max-w-5xl"><p className="text-sm font-semibold text-cyan-300">{t.audienceLabel}</p><h2 style={{ textWrap: "balance" }} className="mt-3 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-[2.35rem]">{t.audienceTitle}</h2><p className="mt-5 leading-7 text-slate-300">{t.audienceText}</p></div><div className="grid gap-5 md:grid-cols-2">{t.audienceGroups.map(([title, text]) => <Card key={title} className="bg-slate-900/70"><CardContent className="p-6"><p className="text-lg font-bold text-white">{title}</p><p className="mt-3 text-sm leading-6 text-slate-300">{text}</p></CardContent></Card>)}</div></section>

        <section className="mx-auto max-w-7xl px-6 pb-20">
          <div className="rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-6 md:p-8">
            <div className="mb-8 max-w-5xl">
              <p className="text-sm font-semibold text-cyan-200">{t.eventSystemLabel}</p>
              <h2 style={{ textWrap: "balance" }} className="mt-3 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-[2.35rem]">{t.eventSystemTitle}</h2>
              <p className="mt-5 leading-7 text-slate-300">{t.eventSystemText}</p>
            </div>
            <div className="grid gap-5 lg:grid-cols-2 lg:grid-cols-3">
              {t.eventSystemPoints.map(([title, text]) => (
                <Card key={title} className="bg-slate-950/35">
                  <CardContent className="p-5">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-300/10">
                      <ShieldCheck className="h-5 w-5 text-cyan-200" />
                    </div>
                    <p className="font-bold text-white">{title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="solution" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-20"><div className="mb-10 max-w-5xl"><p className="text-sm font-semibold text-cyan-300">{t.buildLabel}</p><h2 style={{ textWrap: "balance" }} className="mt-3 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-[2.35rem]">{t.buildTitle}</h2><p className="mt-5 leading-7 text-slate-300">{t.buildText}</p></div><div className="grid gap-5 md:grid-cols-4">{t.features.map((feature) => { const Icon = feature.icon; return <Card key={feature.title}><CardContent className="p-6"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300/10"><Icon className="h-6 w-6 text-cyan-300" /></div><h3 className="text-lg font-semibold text-white">{feature.title}</h3><p className="mt-3 text-sm leading-6 text-slate-300">{feature.text}</p></CardContent></Card>; })}</div></section>

        <section id="results" className="mx-auto max-w-7xl scroll-mt-24 px-6 pb-20"><div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 md:p-8"><div className="mb-8 max-w-5xl"><p className="text-sm font-semibold text-cyan-300">{t.resultsLabel}</p><h2 style={{ textWrap: "balance" }} className="mt-3 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-[2.35rem]">{t.resultsTitle}</h2><p className="mt-4 leading-7 text-slate-300">{t.resultsText}</p></div><div className="grid gap-5 md:grid-cols-3">{t.cases.map((item) => <Card key={item.title} className="bg-white/[0.05]"><CardContent className="flex h-full flex-col p-6"><div className="mb-4 inline-flex w-fit rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-medium text-cyan-200">{item.tag}</div><h3 className="text-xl font-bold text-white">{item.title}</h3><p className="mt-3 text-sm leading-6 text-slate-300">{item.text}</p><div className="mt-auto pt-5 space-y-2">{item.links?.map(([label, href]) => <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-300/30 hover:bg-cyan-300/10"><span>{label}</span><ExternalLink className="h-4 w-4 text-cyan-200" /></a>)}</div></CardContent></Card>)}</div></div></section>

        <section className="border-y border-white/10 bg-white/[0.03]"><div className="mx-auto max-w-7xl px-6 py-20"><div className="mb-10 max-w-5xl"><p className="text-sm font-semibold text-cyan-300">{t.flowLabel}</p><h2 style={{ textWrap: "balance" }} className="mt-3 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-[2.35rem]">{t.flowTitle}</h2></div><div className="grid gap-5 md:grid-cols-4">{t.offerSteps.map(([title, text]) => <Card key={title} className="bg-slate-900/70"><CardContent className="p-6"><p className="text-sm font-semibold text-cyan-300">{title}</p><p className="mt-4 text-sm leading-7 text-slate-300">{text}</p></CardContent></Card>)}</div><div className="mt-8 grid gap-3 md:grid-cols-4">{t.outcomes.map((item) => <div key={item} className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-sm leading-6 text-cyan-50">{item}</div>)}</div></div></section>


        <section id="packages" className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-10 max-w-5xl"><p className="text-sm font-semibold text-cyan-300">{t.packageLabel}</p><h2 style={{ textWrap: "balance" }} className="mt-3 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-[2.35rem]">{t.packageTitle}</h2><p className="mt-5 leading-7 text-slate-300">{t.packageText}</p></div>

          <div className="mb-14">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-5xl">
                <p className="text-sm font-semibold text-cyan-200">{t.midPlanLabel}</p>
                <h3 className="mt-3 text-3xl font-bold leading-tight text-white md:text-[2.6rem]">{t.midPlanTitle}</h3>
                <p className="mt-4 leading-7 text-slate-300">{t.midPlanText}</p>
              </div>
              <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-sm leading-6 text-cyan-50 md:max-w-xs">
                中型案重點：先確認流程與資料，再決定功能範圍，不用一開始就做滿全部功能。
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              {t.midPlans.map((item, index) => (
                <Card key={item.name} className="group overflow-hidden border-white/10 bg-white/[0.055] transition hover:border-cyan-300/30 hover:bg-white/[0.075]">
                  <CardContent className="flex h-full flex-col p-6 md:p-7">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold tracking-wide text-cyan-200">方案 {String(index + 1).padStart(2, '0')}</p>
                        <h4 className="mt-2 text-[1.45rem] font-bold leading-tight text-white md:whitespace-nowrap">{item.name}</h4>
                      </div>
                      <div className="shrink-0 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
                        中型系統
                      </div>
                    </div>

                    <p className="mt-3 min-h-[2.5rem] text-sm leading-6 text-slate-300">{item.subtitle}</p>

                    <div className="my-5 h-px bg-white/10" />

                    <div className="grid gap-2 md:grid-cols-2">
                      {item.items.map((feature) => (
                        <div key={feature} className="rounded-2xl border border-white/10 bg-slate-950/25 px-3 py-2 text-sm leading-6 text-slate-300">
                          <span className="mr-2 text-cyan-300">•</span>{feature}
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-950/35 p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-xs font-semibold text-slate-400">預估價格</p>
                        <p className="mt-1 whitespace-nowrap text-lg font-bold leading-tight text-cyan-200 md:text-xl">{item.price}</p>
                      </div>
                      <a href={buildMidPlanMailto(item)} className="shrink-0">
                        <Button className="w-full whitespace-nowrap px-5 py-3 text-sm sm:w-auto">{t.midPlanButton}</Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <p className="mt-5 rounded-2xl border border-white/10 bg-slate-950/35 p-4 text-sm leading-6 text-slate-300">{t.midPlanNote}</p>
          </div>

          <div className="mb-12 rounded-3xl border border-white/10 bg-slate-900/70 p-6 md:p-8">
            <div className="mb-7 max-w-3xl">
              <p className="text-sm font-semibold text-cyan-300">{t.smallPlanLabel}</p>
              <h3 className="mt-3 text-2xl font-bold leading-tight text-white md:text-3xl">{t.smallPlanTitle}</h3>
              <p className="mt-4 leading-7 text-slate-300">{t.smallPlanText}</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {t.smallPlans.map((item) => (
                <Card key={item.name} className="bg-slate-950/35">
                  <CardContent className="flex h-full flex-col p-5">
                    <h4 className="text-lg font-bold leading-tight text-white md:whitespace-nowrap">{item.name}</h4>
                    <p className="mt-2 whitespace-nowrap text-lg font-bold text-cyan-200 md:text-xl">{item.price}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{item.subtitle}</p>
                    <div className="my-4 h-px bg-white/10" />
                    <ul className="space-y-3 text-sm leading-6 text-slate-300">
                      {item.items.map((feature) => (
                        <li key={feature} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" /><span>{feature}</span></li>
                      ))}
                    </ul>
                    <a href={buildSmallPlanMailto(item)} className="mt-auto pt-5">
                      <Button className="w-full whitespace-nowrap text-sm">{t.smallPlanButton} <ExternalLink className="ml-2 h-4 w-4" /></Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="mt-6 rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm leading-6 text-slate-300">{t.upgradeNote}</p>
          </div>

          <div className="mb-12 grid gap-5 md:grid-cols-2">
            {t.cooperationNotes.map(([title, text]) => (
              <div key={title} className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
                <p className="text-sm font-semibold text-cyan-300">{title}</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">{text}</p>
              </div>
            ))}
          </div>

          <div className="mb-12 rounded-3xl border border-white/10 bg-slate-900/70 p-6 md:p-8">
            <div className="mb-6 max-w-3xl">
              <p className="text-sm font-semibold text-cyan-300">{t.maintenanceLabel}</p>
              <h3 className="mt-3 text-2xl font-bold leading-tight text-white md:text-3xl">{t.maintenanceTitle}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">{t.maintenanceText}</p>
            </div>
            <div className="grid gap-5 lg:grid-cols-2 lg:grid-cols-4">
              {t.maintenancePlans.map((plan) => (
                <div key={plan.name} className="flex h-full min-h-[430px] flex-col rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                  <div className="space-y-4">
                    <p className="text-base font-semibold leading-7 text-white">{plan.name}</p>
                    <p className="text-lg font-bold leading-8 text-cyan-200">{plan.price}</p>
                    <p className="text-sm leading-6 text-slate-400">{plan.subtitle}</p>
                  </div>
                  <div className="my-5 h-px bg-white/10" />
                  <ul className="space-y-2 text-sm leading-6 text-slate-300">
                    {plan.items.map((item) => (
                      <li key={item} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" /><span>{item}</span></li>
                    ))}
                  </ul>
                  <a href={buildMaintenancePlanMailto(plan)} className="mt-auto block pt-6">
                    <Button className="min-h-[64px] w-full text-sm leading-6">{t.maintenancePlanButton} <ExternalLink className="ml-2 h-4 w-4 shrink-0" /></Button>
                  </a>
                </div>
              ))}
            </div>
            <p className="mt-6 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-sm leading-6 text-cyan-50">{t.maintenanceNote}</p>
          </div>

          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div className="max-w-5xl"><p className="text-sm font-semibold text-cyan-300">{t.estimatorLabel}</p><h3 className="mt-3 text-2xl font-bold leading-tight text-white md:text-3xl">{t.estimatorTitle}</h3><p className="mt-4 leading-7 text-slate-300">{t.estimatorText}</p></div><button type="button" onClick={clearEstimate} className="w-fit rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-3 text-sm text-slate-200 transition hover:border-cyan-300/30 hover:bg-cyan-300/10">{t.clearAll}</button></div>
          <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            <Card className="bg-slate-900/70"><CardContent className="p-5 md:p-7"><div className="grid gap-5 lg:grid-cols-2">
              {estimateOptions.map((item) => { const checked = selected.includes(item.id); return <button key={item.id} type="button" onClick={() => toggleOption(item.id)} className={`rounded-2xl border p-4 text-left transition ${checked ? "border-cyan-300/50 bg-cyan-300/10" : "border-white/10 bg-white/[0.04] hover:border-cyan-300/30 hover:bg-white/[0.07]"}`}><div className="flex items-start gap-3"><div className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${checked ? "border-cyan-300 bg-cyan-300 text-slate-950" : "border-slate-500"}`}>{checked && <span className="text-xs font-black">✓</span>}</div><div><p className="font-semibold text-white">{item.label}</p><p className="mt-1 text-sm leading-6 text-slate-400">{item.desc}</p><p className="mt-3 text-sm font-semibold text-cyan-200">{t.modulePrice} {item.price.toLocaleString()} 起</p></div></div></button>; })}
              <button type="button" onClick={() => setOtherEnabled((value) => !value)} className={`rounded-2xl border p-4 text-left transition ${otherEnabled ? "border-cyan-300/50 bg-cyan-300/10" : "border-white/10 bg-white/[0.04] hover:border-cyan-300/30 hover:bg-white/[0.07]"}`}><div className="flex items-start gap-3"><div className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${otherEnabled ? "border-cyan-300 bg-cyan-300 text-slate-950" : "border-slate-500"}`}>{otherEnabled && <span className="text-xs font-black">✓</span>}</div><div><p className="font-semibold text-white">{t.otherCustom}</p><p className="mt-1 text-sm leading-6 text-slate-400">{t.otherDesc}</p><p className="mt-3 text-sm font-semibold text-cyan-200">{t.otherPrice}</p></div></div></button>
            </div></CardContent></Card>

            <Card className="border-cyan-300/25 bg-cyan-300/10 shadow-2xl shadow-cyan-950/30"><CardContent className="sticky top-6 p-6 md:p-8"><p className="text-sm font-semibold text-cyan-200">{t.estimateTitle}</p><h3 className="mt-3 text-4xl font-bold text-white">{estimateLabel}</h3><p className="mt-4 text-sm leading-6 text-slate-300">{t.estimateDesc}</p><div className="my-6 h-px bg-white/10" /><div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"><div className="flex items-center justify-between gap-4"><span className="text-sm text-slate-300">{t.subtotal}</span><span className="text-lg font-bold text-cyan-200">{subtotal === 0 ? "—" : `NT$ ${subtotal.toLocaleString()}`}</span></div><p className="mt-2 text-xs leading-5 text-slate-500">{t.rangeNote}</p></div><div className="my-6 h-px bg-white/10" /><div className="mb-6 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4"><p className="text-sm font-semibold text-cyan-100">{t.monthlyTitle}</p><p className="mt-2 text-sm leading-6 text-slate-200">{monthlyCostLabel}</p><p className="mt-1 text-xs leading-5 text-slate-400">{t.monthlyDesc}</p></div><p className="text-sm font-semibold text-white">{t.selectedTitle}</p><div className="mt-4 space-y-3">{selectedItems.length === 0 && !otherEnabled ? <p className="text-sm text-slate-400">{t.noneSelected}</p> : <>{selectedItems.map((item) => <div key={item.id} className="flex justify-between gap-4 text-sm text-slate-300"><span>{item.label}</span><span className="shrink-0 text-cyan-200">{item.price.toLocaleString()}</span></div>)}{otherEnabled && <div className="flex justify-between gap-4 text-sm text-slate-300"><span>{t.otherCustom}</span><span className="shrink-0 text-cyan-200">6,000+</span></div>}</>}</div><div className="mt-8 rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-sm leading-6 text-slate-300">{t.reminder}</div><a href={estimateMailto}><Button className="mt-6 w-full">{t.discussButton} <ExternalLink className="ml-2 h-4 w-4" /></Button></a></CardContent></Card>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-6 pb-24"><div className="rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-8 md:p-10"><div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center"><div><p className="text-sm font-semibold text-cyan-200">{t.contactLabel}</p><h2 style={{ textWrap: "balance" }} className="mt-3 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-[2.35rem]">{t.contactTitle}</h2><p className="mt-5 leading-7 text-slate-300">{t.contactText}</p></div><div className="rounded-3xl bg-slate-950/60 p-6 ring-1 ring-white/10"><p className="text-sm text-slate-400">{t.contactSmall}</p><p className="mt-4 text-sm leading-7 text-slate-300">{t.contactPrompt}</p><a href={estimateMailto}><Button className="mt-6 w-full">{t.contactButton} <ExternalLink className="ml-2 h-4 w-4" /></Button></a><div className="mt-5 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-sm leading-7 text-cyan-50"><p className="font-semibold text-white">{isEnglish ? "LINE contact" : "LINE 聯絡"}</p><p className="mt-1">LINE：Archived contact details removed</p><p className="text-xs text-cyan-100/80">{isEnglish ? "You can also email me through the button above." : "也可以直接用上方按鈕寄信說明目前流程。"}</p></div></div></div></div></section>
      </main>
    </div>
  );
}



export default function App() {
  useEffect(() => {
    document.title = "Eason Systems｜LINE / Web 前端導覽與流程系統";
  }, []);

  return <LegacyHomePage />;
}
