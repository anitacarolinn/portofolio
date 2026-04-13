// EN + Traditional Chinese (zh-TW) copy for Anita Carolina's portfolio.
// Keep this file as the single source of truth for all display strings.
// Content is grounded in the real résumé (2026履歷表.pdf) — no fabricated stats.

export const translations = {
  en: {
    lang: "EN",
    nav: {
      about: "About",
      skill: "Skill",
      work: "Work",
      contact: "Contact",
    },
    header: {
      name: "Anita Carolina",
      role: "鄭如倪 · Frontend Dev",
    },
    subbar: {
      portfolio: "Portfolio — Vol. 01",
      route: "Taiwan",
    },
    hero: {
      first: "鄭如倪",
      last: "Anita Carolina",
      tagline:
        "Frontend developer crafting interfaces that feel inevitable — from Figma to production, deployed with care.",
      primary: "View Studio Index",
      secondary: "Download Résumé",
    },
    features: [
      {
        label: "FEATURE — SENIOR THESIS",
        status: "IoT + FULL-STACK",
        caption: "01 / HEALTHCARE SYSTEM",
        year: "2025 — 2026",
        title: "ResQBand\nSafety Belt",
        heading: "Arduino-powered patient restraint monitoring",
        body: "Senior thesis — Arduino sensors on hospital restraints stream alerts via Python WebSocket to a Flutter nurse dashboard. Bilingual UI, voice notes, role-based access.",
        tags: ["Flutter", "Python", "Arduino", "SQL Server"],
      },
      {
        label: "FEATURE — 文史處",
        status: "LIVE IN PRODUCTION",
        caption: "02 / EVENT PLATFORM",
        year: "2025 →",
        title: "Seminar\nCMS",
        heading: "Bilingual multi-site event CMS",
        body: "Designed & built a multi-site CMS powering 4 event websites for Tzu Chi global academic events.",
        tags: ["Next.js 15", "TypeScript", "Tailwind v4", "PocketBase"],
        gradient: "linear-gradient(135deg, #2a3328 0%, #3d4a38 50%, #4a5944 100%)",
      },
      {
        label: "FEATURE — UI DESIGN",
        status: "PORTFOLIO",
        caption: "03 / DESIGN WORK",
        year: "2024 — 2025",
        title: "Design\nPortfolio",
        heading: "UI/UX design portfolio",
        body: "Verde Maps, 基金會新聞, Disaster Dashboard, Hospital Payment System — UI/UX projects designed in Figma, Paper, and Pixso.",
        tags: ["Figma", "Paper", "Pixso"],
        gradient: "linear-gradient(135deg, #1a1814 0%, #2b2720 50%, #3d3830 100%)",
      },
    ],
    about: {
      eyebrow: "§ About",
      title: "Design-minded developer,\nmultilingual by default.",
      paragraphs: [
        "Born in Indonesia, I moved to Hualien in 2022 to study Information Technology & Management at Tzu Chi University with a full-funded scholarship. I'm a driven student who stays current with emerging technologies and thrives in fast-moving environments — eager to bring my design and development skills to a team building things that matter.",
        "Four languages taught me that communication is the real craft — and that interfaces are just another kind of translation. My favorite projects sit at the intersection of healthcare, mobile, and bilingual UX.",
        "Graduating 2026. Looking for my first full-time role building frontends that feel inevitable.",
      ],
      note:
        "I pair with AI tools like Claude Code as part of my daily workflow — they draft, I architect, review, integrate, and ship. Every deployed line is mine in the ways that matter.",
      monogram: "鄭",
      caption: "鄭如倪 · Class of 2026",
    },
    lookingFor: {
      eyebrow: "§ Currently",
      title: "Open to work",
      statusDot: "Available",
      blocks: [
        { label: "Role", value: "Frontend / UI Engineer · Junior Full-Stack" },
        { label: "Location", value: "Taipei · Hsinchu · Remote Taiwan" },
        { label: "Start", value: "Summer 2026" },
        { label: "Languages", value: "EN · 中文 · Bilingual welcomed" },
      ],
    },
    statsHeading: {
      title: "By the numbers",
      eyebrow: "§ Highlights",
    },
    stats: [
      { value: "4×", label: "Competition Wins" },
      { value: "4", label: "Fluent Languages" },
      { value: "90+", label: "Academic Avg" },
      { value: "∞", label: "Cups of Oolong", accent: true },
    ],
    details: {
      competitions: {
        title: "Competitions",
        items: [
          {
            year: "2026",
            rank: "1st Place",
            title: "Smart Medical & Sustainable Management Symposium",
            tier: "gold",
            proof: "/certs/comp-smart-healthcare-photo.jpg",
          },
          {
            year: "2025",
            rank: "1st Place",
            title: "Healthcare Info & Management Student Project",
            tier: "gold",
            proof: "/certs/comp-healthcare-photo.jpg",
          },
          {
            year: "2025",
            rank: "1st Place (Management)",
            title: "National Business Management Project",
            tier: "gold",
            proof: "/certs/comp-management-1st-photo.jpg",
          },
          {
            year: "2025",
            rank: "Honorable Mention (IT)",
            title: "National Business Management Project",
            tier: "merit",
            proof: "/certs/comp-management-honorable-cert.jpg",
          },
          {
            year: "2025",
            rank: "3rd Place",
            title: "National Business & Management Practice",
            tier: "bronze",
            proof: "/certs/comp-business-cert.jpg",
          },
        ],
      },
      languages: {
        title: "Languages",
        items: [
          { name: "Indonesian", native: "Bahasa", level: "Native" },
          { name: "English", native: "English", level: "Professional" },
          { name: "Chinese", native: "中文", level: "Advanced" },
          { name: "Korean", native: "한국어", level: "Advanced" },
        ],
      },
    },
    core: {
      title: "Core Skills",
      hint: "Hover to flip ↻",
      hintMobile: "Tap to flip ↻",
      cards: [
        {
          index: "/ i",
          mark: "i",
          front: "Programming\nLanguages",
          subtitle: "6 languages",
          body:
            "HTML, CSS, JavaScript, TypeScript, Dart, Python — plus a bit of Arduino C++ for IoT work. I pick the right tool for each project, not the trendy one.",
        },
        {
          index: "/ ii",
          mark: "ii",
          front: "Frameworks\n& Runtimes",
          subtitle: "Web · Mobile · IoT",
          body:
            "React + Next.js 15, Flutter for mobile, Svelte on the side. FastAPI and Node.js for backends. PocketBase and SQL Server for data. WebSocket when things need to be real-time.",
        },
        {
          index: "/ iii",
          mark: "iii",
          front: "Design &\nPrototyping",
          subtitle: "Figma → paper",
          body:
            "Figma for UI design — wireframes, user flows, paper prototypes. Designing from the user's experience inward, not the screen outward.",
        },
        {
          index: "/ iv",
          mark: "iv",
          front: "Full-Stack\nDelivery",
          subtitle: "End-to-end",
          body:
            "Architect the system, ship the UI by hand, pair with AI on the backend, debug it end-to-end. Frontend-leaning but I deliver — from Arduino firmware to Cloudflare Pages.",
        },
      ],
    },
    work: {
      title: "Studio Index",
      eyebrow: "§ WORK",
      hero: {
        caption: "01 / SENIOR THESIS",
        badge: "2025 — 2026",
        title: "ResQBand\nSafety Belt",
        subtitle:
          "Arduino + Python backend + Flutter app · Patient restraint monitoring system",
        stack: "Flutter · Python · Arduino · SQL Server · Svelte",
        image: "/work/resqband/cover.jpg",
      },
      cards: [
        {
          caption: "02 / PART-TIME · 文史處",
          badge: "LIVE",
          badgeLive: true,
          title: "Seminar CMS",
          subtitle:
            "Bilingual multi-site event CMS for Tzu Chi academic events",
          stack: "Next.js 15 · TypeScript · PocketBase",
          linkLabel: "Live site ↗",
          href: "https://academic-events.tzuchi.org/",
          dark: true,
          images: [
            "/work/seminar-cms/admin.jpeg",
            "/work/seminar-cms/schedule.jpeg",
            "/work/seminar-cms/style.jpeg",
          ],
        },
        {
          caption: "03 / PART-TIME · 靜思堂",
          badge: "6+ PROJECTS",
          title: "Tzu Chi\nDigital",
          subtitle:
            "CNY, NGO 60th, Disaster Dashboard, Forum, Vegetarian, AI Studio",
          stack: "React · Docker · PocketBase · Vite · Express",
          href: null,
          dark: true,
          green: true,
        },
      ],
      studio: {
        label: "STUDIO",
        labelLocal: "UI Showcase",
        count: "4 PROJECTS",
        title: "Design Work",
        projects: [
          { name: "Verde Maps", image: "/work/ui/verde-maps.png" },
          { name: "基金會新聞", image: "/work/ui/tzuchi-news.png" },
          { name: "Disaster Dashboard", image: "/work/ui/disaster-dashboard.png" },
          { name: "Hospital Payment", image: "/work/ui/hospital-payment.png" },
        ],
      },
      tzuchiProjects: [
        { name: "2026 CNY", desc: "Chinese New Year interactive site", href: "https://2026-cny-react.pages.dev/" },
        { name: "NGO 60th", desc: "60th anniversary celebration site", href: "https://60.tzuchi-org.tw/" },
        { name: "Forum", desc: "Community discussion platform", href: "https://forum.tzuchi-org.tw/" },
        { name: "Vegetarian", desc: "Vegetarian pledge campaign", href: "https://go-vegetarian.tzuchi.org.tw/" },
        { name: "Disaster Dashboard", desc: "Real-time disaster management", internal: true },
        { name: "AI Studio", desc: "Internal AI content tools", internal: true },
      ],
    },
    research: {
      eyebrow: "§ Research",
      title: "Research",
      subtitle:
        "Two co-authored undergraduate research papers under Dr. Tsai Tsung-Hung at Tzu Chi University. Field studies on digital healthcare adoption in Hualien.",
      items: [
        {
          number: "01",
          title: "Factors Affecting the Implementation of Electronic Prescriptions",
          titleLocal: "探究電子處方箋實施成效之影響因素",
          authors: "Lin Shih-Mei · Chou De-Nai · Cheng Ru-Ni (Anita Carolina)",
          advisor: "Advisor: Dr. Tsai Tsung-Hung",
          venue: "Tzu Chi University",
          year: "2025",
          abstract:
            "Field study (N=107) on post-pandemic e-prescription adoption in Hualien. Found digital trust and user satisfaction as core drivers, validated through SPSS factor analysis (Cronbach α 0.837–0.98).",
          tags: ["SPSS", "Factor Analysis", "Mediation", "Healthcare"],
          cover: "/research/e-prescription-study-cover.jpg",
        },
        {
          number: "02",
          title: "Telemedicine · Cross-Disciplinary Study",
          titleLocal: "遠距醫療成效影響因素之研究（跨領域）",
          authors: "Co-authored research team · Cheng Ru-Ni (Anita Carolina)",
          advisor: "Advisor: Dr. Tsai Tsung-Hung",
          venue: "Tzu Chi University",
          year: "2024",
          abstract:
            "A cross-disciplinary investigation of factors affecting telemedicine effectiveness in post-pandemic Taiwan. Companion work to the e-prescription study, exploring digital healthcare adoption from multiple angles.",
          tags: ["Research", "Healthcare", "Cross-disciplinary"],
          cover: "/research/telemedicine-study-cover.jpg",
        },
      ],
    },
    education: {
      eyebrow: "§ Education",
      title: "Education",
      items: [
        {
          year: "2022 — 2026",
          school: "Tzu Chi University",
          degree: "B.S. Information Technology & Management",
          location: "Hualien, Taiwan",
          highlights: [
            "GPA 90+, consistent Top 5 in class",
            "Senior thesis: Multi-functional Nursing Restraint Belt System",
            "Cross-disciplinary research: Telemedicine · E-prescription",
          ],
        },
        {
          year: "2017 — 2020",
          school: "Tzu Chi Da Ai High School",
          degree: "Natural Sciences · Math, Physics, Chemistry",
          location: "Indonesia",
          highlights: [],
        },
      ],
      certsTitle: "Certifications",
      certs: [
        { name: "ITS · HTML and CSS", year: "2024", href: "/certs/certiport-html-css.jpg" },
        { name: "ITS · Python", year: "2024", href: "/certs/certiport-python.jpg" },
        { name: "ITS · JavaScript", year: "2025", href: "/certs/certiport-js.jpg" },
      ],
    },
    contact: {
      eyebrow: "§ Contact",
      title: "Let's talk.",
      subtitle:
        "I reply within 24 hours — in English, 中文, or Bahasa Indonesia.",
      primaryLabel: "Download Résumé ↓",
      resumeHref: "/resume.pdf",
      channels: [
        {
          label: "Email",
          value: "anitacarolinn25@gmail.com",
          href: "mailto:anitacarolinn25@gmail.com",
        },
        {
          label: "GitHub",
          value: "@anitacarolinn25",
          href: "https://github.com/",
        },
        {
          label: "Phone",
          value: "+886 976 986 437",
          href: "tel:+886976986437",
        },
      ],
    },
    footer: {
      previously: "Experience",
      places: [
        "Tzu Chi 文史處 · Frontend Engineer · 2025 →",
        "Tzu Chi Hospital · ML Intern · Summer 2025 · 6 wks",
      ],
      email: "—— anitacarolinn25@gmail.com",
    },
  },

  zh: {
    lang: "中",
    nav: {
      about: "關於",
      skill: "技能",
      work: "作品",
      contact: "聯絡",
    },
    header: {
      name: "Anita Carolina",
      role: "鄭如倪 · Frontend Dev",
    },
    subbar: {
      portfolio: "作品集 — 第一卷",
      route: "台灣",
    },
    hero: {
      first: "鄭如倪",
      last: "Anita Carolina",
      tagline:
        "前端工程師，打造彷彿理所當然的介面 — 從 Figma 到正式環境，用心部署每一行。",
      primary: "瀏覽工作室索引",
      secondary: "下載履歷",
    },
    features: [
      {
        label: "精選 — 畢業專題",
        status: "IoT + 全端",
        caption: "01 / 醫療系統",
        year: "2025 — 2026",
        title: "ResQBand\n智慧約束帶",
        heading: "Arduino 病患約束監測系統",
        body: "我的畢業專題：一套醫院等級的病患安全系統。Arduino 感測器偵測約束帶上的動作與時間事件，Python WebSocket 後端將警報即時推送至護理師的 Flutter 行動儀表板 — 具備語音備註、雙語介面、角色權限控制。",
        tags: ["Flutter", "Python", "Arduino", "SQL Server"],
      },
      {
        label: "精選 — 文史處",
        status: "已上線",
        caption: "02 / 活動平台",
        year: "2025 →",
        title: "研討會\nCMS",
        heading: "雙語多站活動管理系統",
        body: "設計並建構支援 4 個活動網站的多站 CMS，服務慈濟全球學術活動。",
        tags: ["Next.js 15", "TypeScript", "Tailwind v4", "PocketBase"],
        gradient: "linear-gradient(135deg, #2a3328 0%, #3d4a38 50%, #4a5944 100%)",
      },
      {
        label: "精選 — UI 設計",
        status: "作品集",
        caption: "03 / 設計作品",
        year: "2024 — 2025",
        title: "設計\n作品集",
        heading: "UI/UX 設計作品集",
        body: "Verde 素食地圖、基金會新聞、災難儀表板、醫院繳費系統 — 使用 Figma、Paper、Pixso 設計的 UI/UX 專案。",
        tags: ["Figma", "Paper", "Pixso"],
        gradient: "linear-gradient(135deg, #1a1814 0%, #2b2720 50%, #3d3830 100%)",
      },
    ],
    about: {
      eyebrow: "§ 關於我",
      title: "設計思維的開發者，\n多語言是日常。",
      paragraphs: [
        "2003 年在印尼出生，2022 年以全額獎學金搬到花蓮就讀慈濟大學資訊科技與管理學系。我是一位積極進取的學生，持續學習新興技術，善於適應快速變化的環境 — 期待將設計與開發能力帶進一個打造有影響力產品的團隊。",
        "四種語言讓我學到：溝通才是真正的技藝 — 介面也不過是另一種翻譯。我最喜歡的專案，總是落在醫療、行動應用、雙語設計的交集。",
        "2026 年畢業。正在尋找第一份全職工作 — 打造讓人覺得理所當然的前端。",
      ],
      note:
        "日常工作中我會搭配 Claude Code 等 AI 工具 — 由它起草、我架構、審閱、整合、出貨。每一行上線的程式碼，在重要的層面上都是我的。",
      monogram: "鄭",
      caption: "鄭如倪 · 2026 畢業",
    },
    lookingFor: {
      eyebrow: "§ 目前狀態",
      title: "尋找工作中",
      statusDot: "開放合作",
      blocks: [
        { label: "職位", value: "前端 / UI 工程師 · 初階全端" },
        { label: "地點", value: "台北 · 新竹 · 遠端（台灣）" },
        { label: "開始", value: "2026 夏季" },
        { label: "語言", value: "中文 · English · 雙語歡迎" },
      ],
    },
    statsHeading: {
      title: "數字說話",
      eyebrow: "§ 亮點",
    },
    stats: [
      { value: "4×", label: "競賽優勝" },
      { value: "4", label: "流利語言" },
      { value: "90+", label: "學業平均" },
      { value: "∞", label: "烏龍茶杯數", accent: true },
    ],
    details: {
      competitions: {
        title: "競賽獎項",
        items: [
          {
            year: "2026",
            rank: "第一名",
            title: "智慧醫療與永續管理學術研討會",
            tier: "gold",
            proof: "/certs/comp-smart-healthcare-photo.jpg",
          },
          {
            year: "2025",
            rank: "第一名",
            title: "健康照護資訊與管理相關科系學生專題競賽",
            tier: "gold",
            proof: "/certs/comp-healthcare-photo.jpg",
          },
          {
            year: "2025",
            rank: "第一名（管理組）",
            title: "全國經營管理專題競賽",
            tier: "gold",
            proof: "/certs/comp-management-1st-photo.jpg",
          },
          {
            year: "2025",
            rank: "佳作（資訊組）",
            title: "全國經營管理專題競賽",
            tier: "merit",
            proof: "/certs/comp-management-honorable-cert.jpg",
          },
          {
            year: "2025",
            rank: "第三名",
            title: "全國商務與管理實務專題競賽",
            tier: "bronze",
            proof: "/certs/comp-business-cert.jpg",
          },
        ],
      },
      languages: {
        title: "語言能力",
        items: [
          { name: "印尼語", native: "Bahasa", level: "母語" },
          { name: "英語", native: "English", level: "專業" },
          { name: "中文", native: "中文", level: "高級" },
          { name: "韓語", native: "한국어", level: "進階" },
        ],
      },
    },
    core: {
      title: "核心能力",
      hint: "滑鼠移上翻面 ↻",
      hintMobile: "點擊翻面 ↻",
      cards: [
        {
          index: "/ i",
          mark: "i",
          front: "程式\n語言",
          subtitle: "六種語言",
          body:
            "HTML、CSS、JavaScript、TypeScript、Dart、Python — 加上一些 Arduino C++ 用於 IoT 開發。選擇合適的工具，而不是最流行的那一個。",
        },
        {
          index: "/ ii",
          mark: "ii",
          front: "框架與\n執行環境",
          subtitle: "Web · Mobile · IoT",
          body:
            "React + Next.js 15、Flutter 行動開發、偶爾寫 Svelte。後端使用 FastAPI 與 Node.js。資料層用 PocketBase 與 SQL Server。需要即時性時用 WebSocket。",
        },
        {
          index: "/ iii",
          mark: "iii",
          front: "設計與\n原型製作",
          subtitle: "Figma 到紙本",
          body:
            "擅長使用 Figma 進行介面設計，具備線框稿繪製、使用者流程規劃與紙本原型製作能力，能從使用者體驗出發，設計直覺且易用的產品介面。",
        },
        {
          index: "/ iv",
          mark: "iv",
          front: "全端\n交付",
          subtitle: "End-to-end",
          body:
            "規劃系統架構、親手刻 UI、搭配 AI 寫後端、從頭到尾除錯。前端為主，但我能獨立交付 — 從 Arduino 韌體到 Cloudflare Pages。",
        },
      ],
    },
    work: {
      title: "工作室索引",
      eyebrow: "§ 作品",
      hero: {
        caption: "01 / 畢業專題",
        badge: "2025 — 2026",
        title: "ResQBand\n智慧約束帶",
        subtitle: "Arduino + Python 後端 + Flutter App · 病患約束監測系統",
        stack: "Flutter · Python · Arduino · SQL Server · Svelte",
        image: "/work/resqband/cover.jpg",
      },
      cards: [
        {
          caption: "02 / 工讀生工作 · 文史處",
          badge: "LIVE",
          badgeLive: true,
          title: "學思會 CMS",
          subtitle: "慈濟全球共善學思會 · 雙語多站點活動管理 CMS",
          stack: "Next.js 15 · TypeScript · PocketBase",
          linkLabel: "看實際網站 ↗",
          href: "https://academic-events.tzuchi.org/",
          dark: true,
          images: [
            "/work/seminar-cms/admin.jpeg",
            "/work/seminar-cms/schedule.jpeg",
            "/work/seminar-cms/style.jpeg",
          ],
        },
        {
          caption: "03 / 工讀生工作 · 靜思堂",
          badge: "6+ PROJECTS",
          title: "慈濟\n數位",
          subtitle: "新春、60 週年、災難儀表板、論壇、蔬食、AI 工作室",
          stack: "React · Docker · PocketBase · Vite · Express",
          href: null,
          dark: true,
          green: true,
        },
      ],
      studio: {
        label: "工作室",
        labelLocal: "UI 作品集",
        count: "4 個專案",
        title: "設計作品",
        projects: [
          { name: "Verde 素食地圖", image: "/work/ui/verde-maps.png" },
          { name: "基金會新聞", image: "/work/ui/tzuchi-news.png" },
          { name: "災難儀表板", image: "/work/ui/disaster-dashboard.png" },
          { name: "醫院繳費系統", image: "/work/ui/hospital-payment.png" },
        ],
      },
      tzuchiProjects: [
        { name: "2026 新春", desc: "農曆新年互動網站", href: "https://2026-cny-react.pages.dev/" },
        { name: "60 週年", desc: "60 週年慶典網站", href: "https://60.tzuchi-org.tw/" },
        { name: "論壇", desc: "社區討論平台", href: "https://forum.tzuchi-org.tw/" },
        { name: "蔬食", desc: "蔬食響應活動", href: "https://go-vegetarian.tzuchi.org.tw/" },
        { name: "災難儀表板", desc: "即時災難管理系統", internal: true },
        { name: "AI 工作室", desc: "內部 AI 內容工具", internal: true },
      ],
    },
    research: {
      eyebrow: "§ 研究",
      title: "研究",
      subtitle:
        "在慈濟大學蔡宗宏老師指導下的兩篇共同作者研究論文，針對花蓮地區的數位醫療採用進行田野調查。",
      items: [
        {
          number: "01",
          title: "探究電子處方箋實施成效之影響因素",
          titleLocal: "Factors Affecting the Implementation of Electronic Prescriptions",
          authors: "林世美 · 周德耐 · 鄭如倪",
          advisor: "指導老師：蔡宗宏",
          venue: "慈濟大學",
          year: "2025",
          abstract:
            "以花蓮地區 107 位醫療工作者為對象的田野研究，探討後疫情時代電子處方箋的採用。發現數位信任與使用者滿意度是核心驅動因素，經 SPSS 因素分析驗證（Cronbach α 0.837–0.98）。",
          tags: ["SPSS", "因素分析", "中介效果", "醫療"],
          cover: "/research/e-prescription-study-cover.jpg",
        },
        {
          number: "02",
          title: "遠距醫療成效影響因素之研究（跨領域）",
          titleLocal: "Telemedicine · Cross-Disciplinary Study",
          authors: "研究團隊共同作者 · 鄭如倪",
          advisor: "指導老師：蔡宗宏",
          venue: "慈濟大學",
          year: "2024",
          abstract:
            "針對後疫情時代台灣遠距醫療成效影響因素的跨領域研究。與電子處方箋研究為同一研究團隊的系列作品，從多個角度探索數位醫療採用。",
          tags: ["研究", "醫療", "跨領域"],
          cover: "/research/telemedicine-study-cover.jpg",
        },
      ],
    },
    education: {
      eyebrow: "§ 學歷",
      title: "學歷",
      items: [
        {
          year: "2022 — 2026",
          school: "慈濟大學",
          degree: "資訊科技與管理學系 學士",
          location: "台灣花蓮",
          highlights: [
            "學業成績平均 90 分以上，每學期維持班上前五名",
            "畢業專題：植基於安全照護需求之多功能護理約束帶系統",
            "跨領域研究：遠距醫療成效 · 電子處方箋實施成效",
          ],
        },
        {
          year: "2017 — 2020",
          school: "慈濟大愛高中",
          degree: "自然科學組 · 數學、物理、化學",
          location: "印尼",
          highlights: [],
        },
      ],
      certsTitle: "專業證照",
      certs: [
        { name: "ITS · HTML and CSS", year: "2024", href: "/certs/certiport-html-css.jpg" },
        { name: "ITS · Python", year: "2024", href: "/certs/certiport-python.jpg" },
        { name: "ITS · JavaScript", year: "2025", href: "/certs/certiport-js.jpg" },
      ],
    },
    contact: {
      eyebrow: "§ 聯絡",
      title: "聊聊吧。",
      subtitle: "24 小時內回覆 — 中文、English、或 Bahasa Indonesia 都可以。",
      primaryLabel: "下載履歷 ↓",
      resumeHref: "/resume.pdf",
      channels: [
        {
          label: "Email",
          value: "anitacarolinn25@gmail.com",
          href: "mailto:anitacarolinn25@gmail.com",
        },
        {
          label: "GitHub",
          value: "@anitacarolinn25",
          href: "https://github.com/",
        },
        {
          label: "電話",
          value: "+886 976 986 437",
          href: "tel:+886976986437",
        },
      ],
    },
    footer: {
      previously: "經歷",
      places: [
        "慈濟文史處 · 前端工程師 · 2025 →",
        "慈濟醫院 · 機器學習實習 · 2025 暑期 · 6 週",
      ],
      email: "—— anitacarolinn25@gmail.com",
    },
  },
};
