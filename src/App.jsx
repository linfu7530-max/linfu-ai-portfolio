import { Link, Route, Routes, useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";

const projects = [
  {
    slug: "ai-sales-coach",
    name: { zh: "AI 销售话术教练", en: "AI Sales Script Coach" },
    problem: {
      zh: "新人面对异议处理不稳定，跟进话术依赖个人经验，质量波动大。",
      en: "New reps handle objections inconsistently, and script quality relies too much on personal experience.",
    },
    solution: {
      zh: "设计 AI 对话教练：自动识别通话关键节点，按销售阶段给出复盘建议和下一句推荐话术。",
      en: "Designed an AI coaching workflow that detects key call moments and suggests stage-based coaching plus next-line prompts.",
    },
    result: {
      zh: "首通有效对话率提升 18%，新人上手周期从 4 周缩短到 2 周。",
      en: "First-call qualified conversations improved by 18%, while onboarding time dropped from 4 weeks to 2.",
    },
    stack: "Conversation AI / Prompt Design / Dashboard",
  },
  {
    slug: "lead-scoring-insurance",
    name: { zh: "车险线索智能分层系统", en: "Insurance Lead Prioritization System" },
    problem: {
      zh: "线索池大且杂，销售时间被低意向客户消耗，高潜客户跟进不及时。",
      en: "Lead pools were noisy, reps spent too much time on low-intent leads, and high-potential leads were contacted too late.",
    },
    solution: {
      zh: "构建线索分层模型与跟进节奏面板，按意向强弱、报价阶段和失联风险给出优先级。",
      en: "Built a lead scoring and follow-up cadence panel prioritizing intent signals, quote stage, and churn risk.",
    },
    result: {
      zh: "高潜线索触达时效提升 33%，月度成交率提升 12%。",
      en: "Response speed for high-potential leads improved by 33%, and monthly close rate increased by 12%.",
    },
    stack: "CRM Workflow / Scoring / Automation",
  },
  {
    slug: "sales-bootcamp-ai",
    name: { zh: "销售训练营内容设计", en: "AI-Powered Sales Bootcamp Design" },
    problem: {
      zh: "培训内容碎片化，课堂知识难迁移到真实通话场景，复训成本高。",
      en: "Training content was fragmented and hard to transfer into real calls, leading to high retraining costs.",
    },
    solution: {
      zh: "将 7 年一线经验沉淀为场景化训练模块，配合 AI 角色扮演和个性化训练路径。",
      en: "Converted 7 years of frontline experience into scenario-based modules with AI role-play and adaptive training paths.",
    },
    result: {
      zh: "培训完成率提升 40%，三个月留存率提升 15%。",
      en: "Training completion rose by 40%, and 3-month retention improved by 15%.",
    },
    stack: "Learning Experience / AI Content / Operations",
  },
];

const insights = [
  {
    title: {
      zh: "从电话车险到 AI 设计：我的方法论迁移",
      en: "From Insurance Sales Calls to AI Design: How My Method Evolved",
    },
    date: "Apr 2026",
    summary: {
      zh: "如何把“听客户、识别顾虑、推进成交”的一线销售能力，转化为 AI 产品中的关键交互决策。",
      en: "How frontline skills in listening, objection discovery, and conversion became design decisions in AI products.",
    },
  },
  {
    title: { zh: "销售场景里，AI 不该只做助手", en: "In Sales, AI Should Be More Than an Assistant" },
    date: "Apr 2026",
    summary: {
      zh: "AI 在销售系统中的价值，不是堆功能，而是建立反馈闭环：识别问题、给出建议、验证结果。",
      en: "Real value comes from feedback loops, not feature stacking: identify issues, suggest actions, and validate outcomes.",
    },
  },
  {
    title: {
      zh: "训练新人的三层设计：知识、场景、复盘",
      en: "A 3-Layer Framework for Sales Training: Knowledge, Scenarios, Review",
    },
    date: "Apr 2026",
    summary: {
      zh: "把销售培训拆成可追踪的学习路径，让每次对话都成为可衡量、可改进的成长数据。",
      en: "Break training into trackable learning paths so every conversation becomes measurable, improvable growth data.",
    },
  },
];

const copy = {
  zh: {
    brand: "LINFU / AI SALES DESIGNER",
    nav: { about: "关于", projects: "项目", insights: "洞察", contact: "联系" },
    aboutTag: "AI 设计师 / 销售经验",
    title1: "我是 Linfu，一名 AI 设计师。",
    title2: "把 7 年电话车险销售经验，转化成更能成交的 AI 产品体验。",
    aboutBody:
      "我专注于销售场景中的 AI 产品设计，擅长把一线销售流程中的真实阻力拆解成可执行策略，并通过界面、对话流程和数据反馈机制，把经验沉淀成可复制的系统能力。",
    selectedProjects: "精选项目",
    salesAi: "销售 x AI",
    viewDetail: "查看详情",
    mediaInsights: "媒体与洞察",
    thinking: "思考",
    openTo: "欢迎合作",
    cta: "一起把销售经验变成可规模化的 AI 增长系统。",
    backHome: "返回首页",
    notFound: "未找到对应项目。",
    roleTagline: "AI 设计师 · 销售增长系统",
    downloadResume: "下载简历",
    wechatContact: "微信联系",
    quickTalk: "快速沟通",
    wechatHint: "微信：linfu7530（可改）",
    modulesTitle: "核心板块",
    modulesDesc: "鼠标移动到卡片会有动态晃动，点击卡片可查看下一步动作。",
    nextStepTitle: "下一步展示",
    enterModule: "进入板块",
    closePanel: "关闭",
    panelTitle: "板块详情流程",
  },
  en: {
    brand: "LINFU / AI SALES DESIGNER",
    nav: { about: "About", projects: "Projects", insights: "Insights", contact: "Contact" },
    aboutTag: "AI Designer / Sales Experience",
    title1: "I'm Linfu, an AI Designer.",
    title2: "I turn 7 years of insurance telesales experience into AI product experiences that convert.",
    aboutBody:
      "I design AI products for sales scenarios. I translate frontline friction points into practical strategies through interface design, conversation flows, and feedback systems.",
    selectedProjects: "Selected Projects",
    salesAi: "Sales x AI",
    viewDetail: "View details",
    mediaInsights: "Media & Insights",
    thinking: "Thinking",
    openTo: "Open to collaboration",
    cta: "Let's transform sales experience into scalable AI growth systems.",
    backHome: "Back to home",
    notFound: "Project not found.",
    roleTagline: "AI Designer · Sales Growth Systems",
    downloadResume: "Download Resume",
    wechatContact: "WeChat Contact",
    quickTalk: "Quick chat",
    wechatHint: "WeChat: linfu7530 (editable)",
    modulesTitle: "Core Sections",
    modulesDesc: "Cards react to your cursor. Click any section to reveal the next step plan.",
    nextStepTitle: "Next Step",
    enterModule: "Open Module",
    closePanel: "Close",
    panelTitle: "Module Detail Flow",
  },
};

const profile = {
  displayName: "Linfu",
  englishTagline: "Designing conversion-focused AI products for sales teams.",
  avatarText: "LF",
  // Replace with your own image URL later if needed.
  avatarUrl: "",
  resumeUrl: "#",
  wechatId: "linfu7530",
};

const boardModules = {
  about: {
    clipPath: "polygon(6% 0, 100% 0, 94% 100%, 0 92%)",
    spanClass: "col-span-3 row-span-2",
  },
  projects: {
    clipPath: "polygon(0 8%, 92% 0, 100% 92%, 8% 100%)",
    spanClass: "col-span-3 row-span-1",
  },
  insights: {
    clipPath: "polygon(10% 0, 100% 12%, 90% 100%, 0 88%)",
    spanClass: "col-span-2 row-span-1",
  },
  contact: {
    clipPath: "polygon(0 0, 94% 8%, 100% 100%, 8% 92%)",
    spanClass: "col-span-4 row-span-1",
  },
};

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [boardOrder, setBoardOrder] = useState(["about", "projects", "insights", "contact"]);
  const [draggingBoard, setDraggingBoard] = useState(null);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const lang = searchParams.get("lang") === "en" ? "en" : "zh";
  const t = copy[lang];

  const setLang = (nextLang) => {
    const next = new URLSearchParams(searchParams);
    next.set("lang", nextLang);
    setSearchParams(next);
  };

  const handleBoardDragOver = (event, targetKey) => {
    event.preventDefault();
    if (!draggingBoard || draggingBoard === targetKey) return;

    setBoardOrder((prev) => {
      const from = prev.indexOf(draggingBoard);
      const to = prev.indexOf(targetKey);
      if (from < 0 || to < 0) return prev;
      const next = [...prev];
      next.splice(from, 1);
      next.splice(to, 0, draggingBoard);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <main className="mx-auto w-full max-w-5xl px-6 pb-20 pt-10 md:px-10">
        <header className="mb-14 flex items-center justify-between border-b border-zinc-800 pb-6">
          <a href="#" className="text-sm font-semibold tracking-wide text-zinc-200">
            {t.brand}
          </a>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-zinc-500 md:inline">Drag & Snap Layout</span>
            <div className="flex rounded-lg border border-zinc-700 p-1 text-xs">
              <button
                type="button"
                onClick={() => setLang("zh")}
                className={`rounded px-2 py-1 transition ${lang === "zh" ? "bg-zinc-100 text-zinc-900" : "text-zinc-400 hover:text-zinc-100"}`}
              >
                中
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`rounded px-2 py-1 transition ${lang === "en" ? "bg-zinc-100 text-zinc-900" : "text-zinc-400 hover:text-zinc-100"}`}
              >
                EN
              </button>
            </div>
          </div>
        </header>

        <section className="border-b border-zinc-800 pb-14">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">Interactive Sections</h2>
            <p className="mt-2 text-sm text-zinc-400">拖动任意板块，其他板块会自动补位；松开后自动规整吸附。</p>
          </div>
          <div className="grid grid-flow-dense auto-rows-[110px] grid-cols-2 gap-3 md:auto-rows-[120px] md:grid-cols-6 md:gap-4">
            {boardOrder.map((key) => {
              const boardConfig = boardModules[key];
              const label = t.nav[key];
              const isDragging = draggingBoard === key;

              return (
                <button
                  key={key}
                  type="button"
                  draggable
                  onClick={() => setSelectedBoard(key)}
                  onDragStart={() => setDraggingBoard(key)}
                  onDragOver={(event) => handleBoardDragOver(event, key)}
                  onDrop={() => setDraggingBoard(null)}
                  onDragEnd={() => setDraggingBoard(null)}
                  className={`group relative flex items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-900/70 text-lg font-medium text-zinc-100 transition duration-200 hover:border-indigo-400 hover:text-white ${
                    boardConfig.spanClass
                  } ${isDragging ? "scale-95 opacity-60" : "cursor-grab active:cursor-grabbing"}`}
                  style={{ clipPath: boardConfig.clipPath }}
                >
                  <span className="pointer-events-none">{label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {selectedBoard === "about" ? (
          <section id="about" className="space-y-6 border-b border-zinc-800 pb-14 pt-10">
          <div className="flex items-center gap-4">
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={profile.displayName}
                className="h-16 w-16 rounded-full border border-zinc-700 object-cover"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-lg font-semibold text-zinc-200">
                {profile.avatarText}
              </div>
            )}
            <div>
              <p className="text-lg font-medium text-zinc-100">{profile.displayName}</p>
              <p className="text-sm text-zinc-500">{t.roleTagline}</p>
            </div>
          </div>
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">{t.aboutTag}</p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
            {t.title1}
            <span className="block text-zinc-400">{t.title2}</span>
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-zinc-400 sm:text-lg">{t.aboutBody}</p>
          <p className="max-w-3xl text-sm text-zinc-500">{profile.englishTagline}</p>
          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href={profile.resumeUrl}
              className="inline-flex items-center rounded-full bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-white"
            >
              {t.downloadResume}
            </a>
            <a
              href="#contact"
              className="inline-flex items-center rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition hover:border-zinc-500 hover:text-zinc-100"
            >
              {t.wechatContact}
            </a>
          </div>
          </section>
        ) : null}

        {selectedBoard === "projects" ? (
          <section id="projects" className="py-14">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">{t.selectedProjects}</h2>
            <span className="text-xs uppercase tracking-[0.18em] text-zinc-500">{t.salesAi}</span>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.slug}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 transition hover:border-zinc-700 hover:bg-zinc-900"
              >
                <h3 className="text-lg font-medium text-zinc-100">{project.name[lang]}</h3>
                <div className="mt-4 space-y-3 text-sm leading-relaxed">
                  <p className="text-zinc-300">
                    <span className="mr-2 inline-block rounded bg-zinc-800 px-2 py-0.5 text-xs uppercase tracking-wide text-zinc-400">
                      Problem
                    </span>
                    {project.problem[lang]}
                  </p>
                  <p className="text-zinc-300">
                    <span className="mr-2 inline-block rounded bg-zinc-800 px-2 py-0.5 text-xs uppercase tracking-wide text-zinc-400">
                      Solution
                    </span>
                    {project.solution[lang]}
                  </p>
                  <p className="text-emerald-300">
                    <span className="mr-2 inline-block rounded bg-emerald-900/40 px-2 py-0.5 text-xs uppercase tracking-wide text-emerald-300">
                      Result
                    </span>
                    {project.result[lang]}
                  </p>
                </div>
                <p className="mt-4 text-xs uppercase tracking-wide text-zinc-500">{project.stack}</p>
                <Link
                  to={`/projects/${project.slug}?lang=${lang}`}
                  className="mt-5 inline-flex text-sm text-zinc-200 underline underline-offset-4 transition hover:text-white"
                >
                  {t.viewDetail}
                </Link>
              </article>
            ))}
          </div>
          </section>
        ) : null}

        {selectedBoard === "insights" ? (
          <section id="insights" className="border-t border-zinc-800 py-14">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">{t.mediaInsights}</h2>
            <span className="text-xs uppercase tracking-[0.18em] text-zinc-500">{t.thinking}</span>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {insights.map((item) => (
              <article
                key={item.title.en}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5 transition hover:border-zinc-700 hover:bg-zinc-900"
              >
                <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">{item.date}</p>
                <h3 className="mt-3 text-lg font-medium text-zinc-100">{item.title[lang]}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{item.summary[lang]}</p>
              </article>
            ))}
          </div>
          </section>
        ) : null}

        {selectedBoard === "contact" ? (
          <section id="contact" className="border-t border-zinc-800 pt-10">
          <p className="text-sm text-zinc-500">{t.openTo}</p>
          <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">{t.cta}</h2>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-zinc-400">
            <span className="rounded-full border border-zinc-700 px-3 py-1 text-zinc-300">
              {t.wechatHint.replace("linfu7530", profile.wechatId)}
            </span>
            <a href="mailto:linfu7530@gmail.com" className="transition hover:text-zinc-100">
              linfu7530@gmail.com
            </a>
            <a href="https://github.com/linfu7530-max" target="_blank" rel="noreferrer" className="transition hover:text-zinc-100">
              GitHub
            </a>
          </div>
          <a
            href="mailto:linfu7530@gmail.com"
            className="mt-6 inline-flex rounded-full bg-zinc-100 px-5 py-2.5 text-sm font-medium text-zinc-900 transition hover:bg-white"
          >
            {t.quickTalk}
          </a>
          </section>
        ) : null}
      </main>
    </div>
  );
}

function ProjectDetailPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lang = searchParams.get("lang") === "en" ? "en" : "zh";
  const t = copy[lang];
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-zinc-950 px-6 py-20 text-zinc-100 md:px-10">
        <div className="mx-auto max-w-3xl">
          <p className="text-zinc-400">{t.notFound}</p>
          <Link to={`/?lang=${lang}`} className="mt-4 inline-flex text-zinc-200 underline underline-offset-4">
            {t.backHome}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 px-6 py-12 text-zinc-100 md:px-10">
      <main className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between gap-4">
          <Link
            to={`/?lang=${lang}`}
            className="text-sm text-zinc-400 underline underline-offset-4 transition hover:text-zinc-100"
          >
            ← {t.backHome}
          </Link>
          <div className="flex rounded-lg border border-zinc-700 p-1 text-xs">
            <button
              type="button"
              onClick={() => {
                const next = new URLSearchParams(searchParams);
                next.set("lang", "zh");
                setSearchParams(next);
              }}
              className={`rounded px-2 py-1 transition ${lang === "zh" ? "bg-zinc-100 text-zinc-900" : "text-zinc-400 hover:text-zinc-100"}`}
            >
              中
            </button>
            <button
              type="button"
              onClick={() => {
                const next = new URLSearchParams(searchParams);
                next.set("lang", "en");
                setSearchParams(next);
              }}
              className={`rounded px-2 py-1 transition ${lang === "en" ? "bg-zinc-100 text-zinc-900" : "text-zinc-400 hover:text-zinc-100"}`}
            >
              EN
            </button>
          </div>
        </div>
        <h1 className="mt-6 text-3xl font-semibold text-white sm:text-4xl">{project.name[lang]}</h1>
        <p className="mt-3 text-xs uppercase tracking-[0.15em] text-zinc-500">{project.stack}</p>

        <section className="mt-10 space-y-8">
          <div>
            <h2 className="text-sm uppercase tracking-[0.15em] text-zinc-500">Problem</h2>
            <p className="mt-2 text-base leading-relaxed text-zinc-300">{project.problem[lang]}</p>
          </div>
          <div>
            <h2 className="text-sm uppercase tracking-[0.15em] text-zinc-500">Solution</h2>
            <p className="mt-2 text-base leading-relaxed text-zinc-300">{project.solution[lang]}</p>
          </div>
          <div>
            <h2 className="text-sm uppercase tracking-[0.15em] text-emerald-400">Result</h2>
            <p className="mt-2 text-base leading-relaxed text-emerald-300">{project.result[lang]}</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects/:slug" element={<ProjectDetailPage />} />
    </Routes>
  );
}
