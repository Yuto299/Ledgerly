import Link from "next/link";
import Button from "@/components/atoms/Button";
import Logo from "@/components/atoms/Logo";
import CheckIcon from "@/components/atoms/CheckIcon";
import Faq from "@/components/organisms/Faq";
import Reveal from "@/components/atoms/Reveal";
import type { Metadata } from "next";

const baseUrl = process.env.NEXTAUTH_URL || "https://ledgerly.com";

export const metadata: Metadata = {
  title: "ホーム",
  description:
    "請求書作成から経費管理、売上分析まで。フリーランス・個人事業主のための会計管理システム。無料プランで今すぐ始められます。",
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: "Ledgerly - フリーランス向け会計管理システム",
    description:
      "請求書作成から経費管理、売上分析まで。フリーランス・個人事業主のための会計管理システム。無料プランで今すぐ始められます。",
    url: baseUrl,
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ledgerly",
      },
    ],
  },
};

const FEATURES = [
  {
    icon: "description",
    title: "請求書作成",
    description:
      "プロフェッショナルな請求書を数クリックで作成。PDF出力で即送付可能。",
    points: ["PDF自動生成", "明細・備考対応"],
  },
  {
    icon: "credit_card",
    title: "経費管理",
    description: "カテゴリ別・案件別に経費を記録。確定申告の準備もスムーズに。",
    points: ["カテゴリ分類", "CSV出力対応"],
  },
  {
    icon: "trending_up",
    title: "売上分析",
    description: "月別・案件別の売上をグラフで可視化。ビジネスの状況を一目で把握。",
    points: ["売上推移グラフ", "案件別収支"],
  },
];

const PAINS = [
  {
    icon: "scatter_plot",
    title: "情報がバラバラ",
    description:
      "請求書はExcel、経費はレシート、入金は通帳。どこに何があるか分からず、毎月の集計に時間がかかる。",
  },
  {
    icon: "visibility_off",
    title: "利益が見えない",
    description:
      "売上は分かっても、経費を引いた本当の手残りが分からない。確定申告の時期になって慌てて計算する。",
  },
  {
    icon: "notifications_off",
    title: "回収を忘れる",
    description:
      "請求書を送ったあとは記憶頼み。入金されたか、督促が必要かが追いきれず、未回収を見落としてしまう。",
  },
];

const FLOW_STEPS = [
  {
    icon: "draft",
    title: "請求書を作成",
    badge: "下書き",
    badgeClass: "bg-gray-100 text-gray-600",
    description: "顧客と金額を入力して数クリックで発行。",
  },
  {
    icon: "send",
    title: "顧客へ送付",
    badge: "請求済",
    badgeClass: "bg-yellow-100 text-yellow-700",
    description: "PDFで送付し、入金待ちのステータスに。",
  },
  {
    icon: "account_balance",
    title: "入金を記録",
    badge: "入金済",
    badgeClass: "bg-green-100 text-green-700",
    description: "入金を記録すれば、利益に自動反映。",
  },
];

const STEPS = [
  {
    number: "1",
    title: "アカウント登録",
    description: "メールアドレスだけで30秒。クレジットカードは不要です。",
  },
  {
    number: "2",
    title: "請求書を発行・送付",
    description: "顧客と金額を入力すれば、PDFの請求書がすぐに完成します。",
  },
  {
    number: "3",
    title: "入金を記録して可視化",
    description: "入金を記録すれば、利益と回収状況がダッシュボードに反映。",
  },
];

const TESTIMONIALS = [
  {
    icon: "palette",
    attribute: "20代女性",
    role: "Webデザイナー / 個人事業",
    quote:
      "請求書の発行から入金の記録まで一つにまとまって、督促のタイミングを逃さなくなりました。",
  },
  {
    icon: "code",
    attribute: "30代男性",
    role: "フリーランスエンジニア",
    quote:
      "案件別に利益が見えるのが一番うれしい。どの仕事が割に合っているか一目で分かります。",
  },
  {
    icon: "edit_note",
    attribute: "40代女性",
    role: "ライター / 副業",
    quote:
      "確定申告のための経費整理が毎年憂鬱でしたが、カテゴリ別に記録するだけで内訳が出るので助かっています。",
  },
];

const FAQS = [
  {
    question: "本当に無料で使えますか？",
    answer:
      "はい。フリープランは月10件までの請求書作成・基本的な経費管理・顧客管理（10件まで）を無料でご利用いただけます。クレジットカードの登録も不要です。",
  },
  {
    question: "確定申告に使えますか？",
    answer:
      "経費をカテゴリ別に記録し、売上・利益をレポートで確認できます。CSV出力にも対応しているため、確定申告の準備をスムーズに進められます。",
  },
  {
    question: "スマホからも使えますか？",
    answer:
      "ブラウザベースのため、スマートフォンやタブレットからもご利用いただけます。外出先で請求書を確認・発行することも可能です。",
  },
  {
    question: "あとからプランは変更できますか？",
    answer:
      "いつでもアップグレード・ダウングレードが可能です。まずは無料プランで使い心地を確かめてから、必要に応じてスタンダードプランへ切り替えてください。",
  },
];

const BENEFITS = [
  {
    icon: "bolt",
    iconBg: "bg-slate-100",
    iconText: "text-slate-700",
    title: "登録後3分で請求書完成",
    description:
      "面倒な初期設定は一切不要。テンプレートを選んで、顧客情報と金額を入力するだけ。今日から請求業務を効率化できます。",
  },
  {
    icon: "touch_app",
    iconBg: "bg-slate-100",
    iconText: "text-slate-700",
    title: "迷わない操作性",
    description:
      "会計ソフトが初めての方でも安心。直感的なデザインで、やりたいことがすぐに見つかる。ストレスフリーな会計管理を実現します。",
  },
  {
    icon: "verified",
    iconBg: "bg-slate-100",
    iconText: "text-slate-700",
    title: "ずっと無料で使える",
    description:
      "月10件までの請求書なら永久無料。クレジットカードの登録も不要。事業が成長したら、お得な有料プランへ簡単アップグレード。",
  },
];

const PLANS = [
  {
    name: "フリープラン",
    price: "¥0",
    period: "/月",
    tagline: "個人事業を始めたばかりの方に",
    features: [
      "請求書作成（月10件まで）",
      "基本的な経費管理",
      "顧客管理（10件まで）",
      "基本的なレポート",
      "PDF出力",
    ],
    cta: "無料で始める",
    featured: false,
    disabled: false,
  },
  {
    name: "スタンダードプラン",
    price: "¥580",
    period: "/月",
    tagline: "安定した収入がある方に",
    features: [
      "請求書作成（月15件まで）",
      "経費管理・分析",
      "顧客管理（15件まで）",
      "詳細なレポート",
      "CSV出力",
    ],
    cta: "スタンダードを始める",
    featured: true,
    disabled: false,
  },
  {
    name: "プレミアムプラン",
    price: "近日公開",
    period: "",
    tagline: "本格的にビジネスを成長させたい方に",
    features: [
      "請求書作成（無制限）",
      "高度な経費管理・分析",
      "顧客管理（無制限）",
      "詳細なレポート・分析",
      "優先サポート",
    ],
    cta: "近日公開",
    featured: false,
    disabled: true,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="backdrop-blur-md bg-white/90 border-b border-gray-200/80 sticky top-0 z-50">
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between"
          aria-label="メインナビゲーション"
        >
          <Logo href="/" size="md" />
          <Link href="/login">
            <Button aria-label="ログインページへ">ログイン</Button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-28 px-4 overflow-hidden border-b border-gray-100">
        {/* 控えめな背景装飾（黒一辺倒の印象を和らげる） */}
        <div
          className="pointer-events-none absolute top-0 right-0 w-[700px] h-[500px] bg-gradient-to-br from-blue-100/50 via-slate-100/40 to-transparent blur-3xl -translate-y-1/4 translate-x-1/4"
          aria-hidden="true"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-6 sm:space-y-8 animate-fade-in">
              <div className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium tracking-wide">
                フリーランス・個人事業主向け
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-gray-900 leading-[1.12] tracking-tight">
                会計管理を、
                <br />
                もっとシンプルに。
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
                請求書作成から経費管理、売上分析まで。フリーランスの会計業務を一つのツールで完結させましょう。
              </p>

              <div>
                <Link href="/signup">
                  <Button size="lg" aria-label="無料で会員登録を始める">
                    今すぐ無料で始める
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap gap-4 sm:gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckIcon className="text-green-600" />
                  <span>クレジットカード不要</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="text-green-600" />
                  <span>30秒で登録完了</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="text-green-600" />
                  <span>無料プランで全機能利用可</span>
                </div>
              </div>
            </div>

            {/* Right Column - Dashboard Preview（実際のダッシュボード画面を模したモック） */}
            <div className="relative mt-8 lg:mt-0 animate-fade-in">
              <div className="bg-white rounded-2xl shadow-xl ring-1 ring-gray-900/5 border border-gray-200/80 overflow-hidden">
                {/* ブラウザバー */}
                <div className="bg-gray-50 px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-200 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-400 rounded-full"></div>
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-500 ml-2 font-medium">
                    Ledgerly Dashboard
                  </span>
                </div>
                <div className="p-4 sm:p-5 bg-gray-50/50">
                  {/* KPIカード（実画面: 売上 / 経費 / 利益 / 未回収） */}
                  <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mb-4">
                    {[
                      { label: "今月の売上", value: "¥850,000", icon: "payments", iconBg: "bg-blue-50 text-blue-600", change: "+12.5%", changeClass: "text-green-600", valueClass: "text-gray-900" },
                      { label: "今月の経費", value: "¥120,000", icon: "receipt_long", iconBg: "bg-purple-50 text-purple-600", change: "-3.2%", changeClass: "text-green-600", valueClass: "text-gray-900" },
                      { label: "今月の利益", value: "¥730,000", icon: "savings", iconBg: "bg-green-50 text-green-600", change: "+18.4%", changeClass: "text-green-600", valueClass: "text-green-600" },
                      { label: "未回収金額", value: "¥180,000", icon: "hourglass_top", iconBg: "bg-orange-50 text-orange-600", change: null, changeClass: "", valueClass: "text-orange-600" },
                    ].map((kpi) => (
                      <div
                        key={kpi.label}
                        className="bg-white p-3 rounded-xl shadow-sm border border-gray-200/80"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`material-symbols-outlined text-[18px] rounded-lg w-7 h-7 flex items-center justify-center ${kpi.iconBg}`}
                            aria-hidden="true"
                          >
                            {kpi.icon}
                          </span>
                          {kpi.change && (
                            <span className={`text-[10px] font-semibold ${kpi.changeClass}`}>
                              {kpi.change}
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-gray-500 mb-0.5">
                          {kpi.label}
                        </div>
                        <div className={`text-sm font-bold tabular-nums ${kpi.valueClass}`}>
                          {kpi.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 月別推移（エリアチャート風） */}
                  <div className="bg-white rounded-xl border border-gray-200/80 p-3">
                    <div className="text-xs font-semibold text-gray-900 mb-2">
                      月別推移
                    </div>
                    <svg
                      viewBox="0 0 300 90"
                      className="w-full h-28"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <defs>
                        <linearGradient id="lpArea" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#0f172a" stopOpacity="0.16" />
                          <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0 70 L50 58 L100 62 L150 40 L200 44 L250 22 L300 26 L300 90 L0 90 Z"
                        fill="url(#lpArea)"
                      />
                      <path
                        d="M0 70 L50 58 L100 62 L150 40 L200 44 L250 22 L300 26"
                        fill="none"
                        stroke="#0f172a"
                        strokeWidth="2"
                      />
                      <path
                        d="M0 80 L50 74 L100 76 L150 66 L200 68 L250 58 L300 60"
                        fill="none"
                        stroke="#16a34a"
                        strokeWidth="2"
                      />
                    </svg>
                    <div className="flex items-center gap-3 mt-1.5 text-[10px] text-gray-500">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-0.5 bg-slate-900 inline-block"></span>売上
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-0.5 bg-green-600 inline-block"></span>利益
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points（課題提起） */}
      <section
        className="py-24 px-4 bg-gray-50"
        aria-labelledby="pains-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <h2
              id="pains-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight tracking-tight"
            >
              お金まわりが、なぜか大変。
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
              フリーランスの会計には、こんな悩みがつきものです
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {PAINS.map((pain, i) => (
              <Reveal
                key={pain.title}
                delay={i * 80}
                className="bg-white rounded-2xl shadow-sm border border-gray-200/80 p-6 sm:p-8 transition-shadow hover:shadow-md"
              >
                <div
                  className="bg-gray-100 text-gray-500 rounded-xl w-12 h-12 flex items-center justify-center mb-5"
                  aria-hidden="true"
                >
                  <span className="material-symbols-outlined text-[26px]">
                    {pain.icon}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 leading-snug">
                  {pain.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-7">
                  {pain.description}
                </p>
              </Reveal>
            ))}
          </div>

          <p className="text-center text-base sm:text-lg text-gray-700 mt-12 leading-relaxed">
            その全部を、
            <span className="font-bold text-gray-900">
              Ledgerly のひとつの台帳
            </span>
            で解決します。
          </p>
        </div>
      </section>

      {/* Features */}
      <section
        className="py-24 px-4 bg-white"
        aria-labelledby="features-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal as="div" className="text-center mb-16">
            <h2
              id="features-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight tracking-tight"
            >
              必要な機能を、すべて
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
              フリーランスの会計業務に必要な機能を厳選
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {FEATURES.map((feature, i) => (
              <Reveal
                key={feature.title}
                delay={i * 80}
                className="group bg-white rounded-2xl shadow-sm border border-gray-200/80 p-6 sm:p-8 transition-all hover:shadow-md hover:border-gray-300 hover:-translate-y-0.5"
              >
                <div
                  className="bg-slate-100 text-slate-700 rounded-lg w-11 h-11 flex items-center justify-center mb-5"
                  aria-hidden="true"
                >
                  <span className="material-symbols-outlined text-[24px]">
                    {feature.icon}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 leading-tight tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {feature.description}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {feature.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center text-sm text-gray-600 leading-relaxed"
                    >
                      <CheckIcon className="w-4 h-4 mr-2" />
                      {point}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Flow（請求 → 入金まで） */}
      <section
        className="py-24 px-4 bg-gray-50"
        aria-labelledby="flow-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal as="div" className="text-center mb-16">
            <h2
              id="flow-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight tracking-tight"
            >
              請求してからが、本番。
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
              発行・送付・入金まで、ひとつの流れで見届けられます
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 max-w-5xl mx-auto">
            {FLOW_STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 120} className="relative">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200/80 p-6 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="bg-slate-100 text-slate-700 rounded-lg w-11 h-11 flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <span className="material-symbols-outlined text-[22px]">
                        {step.icon}
                      </span>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${step.badgeClass}`}
                    >
                      {step.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {i < FLOW_STEPS.length - 1 && (
                  <div
                    className="hidden md:flex absolute top-1/2 -right-5 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white border border-gray-200 shadow-sm items-center justify-center text-slate-700"
                    aria-hidden="true"
                  >
                    <span className="material-symbols-outlined text-[22px]">
                      arrow_forward
                    </span>
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section
        className="py-24 px-4 bg-white"
        aria-labelledby="benefits-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal as="div" className="text-center mb-16">
            <h2
              id="benefits-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight tracking-tight"
            >
              なぜLedgerlyなのか
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
              フリーランスのために設計された3つの理由
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {BENEFITS.map((benefit, i) => (
              <Reveal
                key={benefit.title}
                delay={i * 80}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200/80 transition-all hover:shadow-md hover:border-gray-300 hover:-translate-y-0.5"
              >
                <div
                  className={`rounded-xl w-14 h-14 flex items-center justify-center mb-6 ${benefit.iconBg} ${benefit.iconText}`}
                >
                  <span className="material-symbols-outlined text-[28px]">
                    {benefit.icon}
                  </span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 leading-snug">
                  {benefit.title}
                </h4>
                <p className="text-sm sm:text-base text-gray-600 leading-7">
                  {benefit.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How to start（使い方3ステップ） */}
      <section
        className="py-24 px-4 bg-gray-50"
        aria-labelledby="steps-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal as="div" className="text-center mb-16">
            <h2
              id="steps-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight tracking-tight"
            >
              はじめ方は、3ステップ。
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
              難しい設定は不要。登録したその日から始められます
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 max-w-5xl mx-auto">
            {STEPS.map((step, i) => (
              <Reveal
                key={step.number}
                delay={i * 100}
                className="text-center md:text-left"
              >
                <div
                  className="bg-slate-900 text-white rounded-full w-11 h-11 flex items-center justify-center font-bold mb-5 mx-auto md:mx-0 ring-4 ring-slate-900/5"
                  aria-hidden="true"
                >
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-7">
                  {step.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials（お客様の声） */}
      <section
        className="py-24 px-4 bg-white"
        aria-labelledby="testimonials-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal as="div" className="text-center mb-16">
            <h2
              id="testimonials-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight tracking-tight"
            >
              使った人から、選ばれている。
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
              さまざまな働き方のフリーランスに使われています
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.role} delay={i * 80}>
              <figure
                className="bg-gray-50 rounded-2xl border border-gray-200/80 p-6 sm:p-8 flex flex-col h-full transition-shadow hover:shadow-md"
              >
                <blockquote className="text-sm sm:text-base text-gray-700 leading-7 flex-1">
                  「{t.quote}」
                </blockquote>
                <figcaption className="flex items-center gap-3 mt-6">
                  <span
                    className="w-10 h-10 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center flex-shrink-0"
                    aria-hidden="true"
                  >
                    <span className="material-symbols-outlined text-[22px]">
                      {t.icon}
                    </span>
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-gray-900 leading-snug">
                      {t.attribute}
                    </span>
                    <span className="block text-xs text-gray-500 leading-snug">
                      {t.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section
        className="py-24 px-4 bg-gray-50"
        aria-labelledby="pricing-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal as="div" className="text-center mb-16">
            <div className="inline-block mb-6">
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium tracking-wide">
                シンプルな料金プラン
              </span>
            </div>
            <h2
              id="pricing-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight tracking-tight"
            >
              あなたに合ったプランを
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
              まずは無料で始めて、成長に合わせてアップグレード
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto items-start">
            {PLANS.map((plan) => (
              <article
                key={plan.name}
                className={`relative bg-white rounded-xl p-6 sm:p-8 transition-all ${
                  plan.featured
                    ? "border-2 border-slate-900 md:-mt-2"
                    : "border border-gray-200/80 hover:border-gray-300"
                } ${plan.disabled ? "opacity-70" : ""}`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span
                      className="bg-slate-900 text-white px-3.5 py-1 rounded-full text-xs font-semibold"
                      aria-label="おすすめプラン"
                    >
                      おすすめ
                    </span>
                  </div>
                )}
                <div className="text-center mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 leading-tight tracking-tight">
                    {plan.name}
                  </h3>
                  <div className="flex items-end justify-center gap-2 mb-4">
                    <span
                      className={`font-bold leading-none tracking-tight text-gray-900 ${
                        plan.disabled
                          ? "text-2xl sm:text-3xl text-gray-500"
                          : "text-4xl sm:text-5xl"
                      }`}
                    >
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-gray-500 mb-1.5 text-sm sm:text-base">
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {plan.tagline}
                  </p>
                </div>

                <ul className="space-y-3.5 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <CheckIcon
                        className={`w-5 h-5 mr-3 mt-0.5 ${plan.disabled ? "text-gray-300" : ""}`}
                      />
                      <span className={plan.disabled ? "text-gray-500" : "text-gray-700"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {plan.disabled ? (
                  <Button
                    className="w-full py-3"
                    variant="secondary"
                    disabled
                    aria-label={`${plan.name}近日公開`}
                  >
                    {plan.cta}
                  </Button>
                ) : (
                  <Link href="/signup" className="block">
                    <Button
                      className="w-full py-3"
                      variant={plan.featured ? "primary" : "secondary"}
                      aria-label={`${plan.name}で登録`}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="py-24 px-4 bg-white"
        aria-labelledby="faq-heading"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal as="div" className="text-center mb-16">
            <h2
              id="faq-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight tracking-tight"
            >
              よくある質問
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
              ご登録の前に、気になる点を確認できます
            </p>
          </Reveal>
          <Reveal as="div">
            <Faq items={FAQS} />
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section
        className="relative py-24 px-4 bg-gradient-to-b from-slate-900 to-slate-950 text-white overflow-hidden"
        aria-labelledby="cta-heading"
      >
        {/* 上部に控えめな装飾光 */}
        <div
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/10 blur-3xl rounded-full"
          aria-hidden="true"
        />
        <Reveal
          as="div"
          className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h2
            id="cta-heading"
            className="text-3xl sm:text-4xl font-bold mb-4 leading-tight tracking-tight"
          >
            今すぐ始めませんか？
          </h2>
          <p className="text-base sm:text-lg mb-8 text-slate-300 leading-relaxed">
            アカウント作成は30秒。今日から会計業務を効率化。
          </p>
          <Link href="/signup" className="inline-block w-full sm:w-auto">
            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto transition-transform hover:scale-[1.03]"
              aria-label="無料で会員登録を開始"
            >
              無料で始める
            </Button>
          </Link>
          <p className="mt-6 text-sm text-slate-400">
            まずは無料で試せる • 解約自由 • データ安全管理
          </p>
        </Reveal>
      </section>

      {/* Footer */}
      <footer
        className="bg-gray-950 text-gray-400"
        aria-label="フッター"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {/* ブランド */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <span
                  className="w-9 h-9 bg-white rounded-lg flex items-center justify-center"
                  aria-hidden="true"
                >
                  <span className="text-gray-950 font-bold">L</span>
                </span>
                <span className="text-xl font-bold text-white tracking-tight">
                  Ledgerly
                </span>
              </div>
              <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
                請求から入金まで、フリーランスの会計管理をひとつの台帳でシンプルに。
              </p>
            </div>

            {/* リンク列 */}
            <div className="grid grid-cols-2 gap-8 md:col-span-2 md:justify-items-end">
              <nav aria-label="プロダクト">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">
                  プロダクト
                </h3>
                <ul className="space-y-3 text-sm">
                  <li>
                    <Link
                      href="/signup"
                      className="text-gray-300 hover:text-white hover:underline underline-offset-4 transition-colors"
                    >
                      無料で始める
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/login"
                      className="text-gray-300 hover:text-white hover:underline underline-offset-4 transition-colors"
                    >
                      ログイン
                    </Link>
                  </li>
                </ul>
              </nav>
              <nav aria-label="サポート">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">
                  サポート
                </h3>
                <ul className="space-y-3 text-sm">
                  <li>
                    <a
                      href="#faq-heading"
                      className="text-gray-300 hover:text-white hover:underline underline-offset-4 transition-colors"
                    >
                      よくある質問
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

        {/* コピーライト帯 */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-500">
              &copy; 2026 Ledgerly. All rights reserved.
            </p>
            <p className="text-xs text-gray-600">
              個人事業主・フリーランス向け会計管理システム
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
