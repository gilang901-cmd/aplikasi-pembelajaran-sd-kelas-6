import React, { useState, useEffect } from 'react';
import {
  TEACHER_INFO,
  TOPIC_MODULES,
  PRACTICE_QUESTIONS,
  TopicId,
} from './data/mathContent';
import { InteractiveSimulation } from './components/InteractiveSimulations';
import { PracticeSection } from './components/PracticeSection';
import { QuizSection, QuizAttempt } from './components/QuizSection';
import {
  BookOpen,
  CheckCircle2,
  ArrowRight,
  ClipboardCheck,
  Menu,
  X,
  Share2,
  Award,
  Sliders,
  Check,
  GraduationCap,
} from 'lucide-react';

type NavView = 'beranda' | 'materi' | 'latihan' | 'kuis' | 'rapor';

function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

export default function App() {
  const [activeView, setActiveView] = useState<NavView>('beranda');
  const [activeTopicId, setActiveTopicId] = useState<TopicId>('konsep-rasio');
  const [practiceTopicFilter, setPracticeTopicFilter] = useState<TopicId | 'all'>('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Quick Hero Ratio Explorer State
  const [quickA, setQuickA] = useState(8);
  const [quickB, setQuickB] = useState(12);

  // Persistent Student Progress in localStorage
  const [completedTopics, setCompletedTopics] = useState<TopicId[]>(() => {
    try {
      const saved = localStorage.getItem('mk_completed_topics');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [solvedPracticeIds, setSolvedPracticeIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mk_solved_practice');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>(() => {
    try {
      const saved = localStorage.getItem('mk_quiz_attempts');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('mk_completed_topics', JSON.stringify(completedTopics));
    } catch {
      // ignore storage errors
    }
  }, [completedTopics]);

  useEffect(() => {
    try {
      localStorage.setItem('mk_solved_practice', JSON.stringify(solvedPracticeIds));
    } catch {
      // ignore storage errors
    }
  }, [solvedPracticeIds]);

  useEffect(() => {
    try {
      localStorage.setItem('mk_quiz_attempts', JSON.stringify(quizAttempts));
    } catch {
      // ignore storage errors
    }
  }, [quizAttempts]);

  const toggleTopicComplete = (id: TopicId) => {
    setCompletedTopics((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleMarkPracticeSolved = (qId: string) => {
    setSolvedPracticeIds((prev) => (prev.includes(qId) ? prev : [...prev, qId]));
  };

  const handleSaveQuizAttempt = (attempt: QuizAttempt) => {
    setQuizAttempts((prev) => [attempt, ...prev]);
  };

  const navigateToTopic = (topicId: TopicId) => {
    setActiveTopicId(topicId);
    setActiveView('materi');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToPracticeTopic = (topicId: TopicId | 'all') => {
    setPracticeTopicFilter(topicId);
    setActiveView('latihan');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShareLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const currentModule =
    TOPIC_MODULES.find((m) => m.id === activeTopicId) || TOPIC_MODULES[0];

  const quickFpb = gcd(quickA, quickB);
  const bestQuizScore =
    quizAttempts.length > 0 ? Math.max(...quizAttempts.map((a) => a.score)) : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900">
      {/* =====================================================================
       * TOP BAR CONTRACT: Strictly 3 Zones (Brand Wordmark | 5 Nav Links | Action)
       * ===================================================================== */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xs border-b border-slate-200 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#beranda"
            onClick={(e) => {
              e.preventDefault();
              setActiveView('beranda');
              setMobileMenuOpen(false);
            }}
            className="font-display text-lg sm:text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap"
          >
            MATH KARANGPETE
          </a>

          {/* Zone 2: 5 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            {[
              { id: 'beranda', label: 'Beranda' },
              { id: 'materi', label: 'Materi & Simulasi' },
              { id: 'latihan', label: 'Latihan Soal' },
              { id: 'kuis', label: 'Kuis Evaluasi' },
              { id: 'rapor', label: 'Rapor Belajar' },
            ].map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveView(item.id as NavView);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`py-1 transition-colors whitespace-nowrap cursor-pointer border-b-2 ${
                    isActive
                      ? 'text-sky-700 border-sky-700 font-semibold'
                      : 'text-slate-600 border-transparent hover:text-slate-900 hover:border-slate-300'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setActiveView('kuis');
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              Mulai Kuis
            </button>

            <button
              type="button"
              aria-label="Buka Menu Navigasi"
              onClick={() => setMobileMenuOpen((o) => !o)}
              className="md:hidden p-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1">
            {[
              { id: 'beranda', label: 'Beranda Utama' },
              { id: 'materi', label: 'Materi & Simulasi (4 Bab)' },
              { id: 'latihan', label: 'Latihan Soal Pilihan Ganda' },
              { id: 'kuis', label: 'Kuis Evaluasi Skor Otomatis' },
              { id: 'rapor', label: 'Rapor & Progres Belajar' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveView(item.id as NavView);
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                  activeView === item.id
                    ? 'bg-sky-50 text-sky-800 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* =====================================================================
       * MAIN VIEWPORT CONTENT
       * ===================================================================== */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* -------------------------------------------------------------------
         * VIEW 1: HALAMAN UTAMA (BERANDA)
         * ------------------------------------------------------------------- */}
        {activeView === 'beranda' && (
          <div className="space-y-12">
            {/* Hero Section */}
            <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Column: Editorial Intro & Teacher Metadata */}
                <div className="lg:col-span-7 space-y-5">
                  {/* Unboxed Metadata Line (Zero-Pill Discipline) */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-sky-800">
                    <span>{TEACHER_INFO.schoolName}</span>
                    <span aria-hidden="true">·</span>
                    <span>{TEACHER_INFO.grade}</span>
                    <span aria-hidden="true">·</span>
                    <span>Guru: {TEACHER_INFO.teacherName}</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-slate-900 leading-tight">
                    Belajar Matematika Rasio Lebih Mudah, Visual, dan Menyenangkan.
                  </h1>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                    {TEACHER_INFO.welcomeQuote}
                  </p>

                  {/* Primary Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => navigateToTopic('konsep-rasio')}
                      className="px-5 py-3 text-sm font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4" />
                      Mulai Pelajari Materi
                    </button>
                    <button
                      type="button"
                      onClick={() => navigateToPracticeTopic('all')}
                      className="px-5 py-3 text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Latihan Soal (12 Soal)
                    </button>
                    <button
                      type="button"
                      onClick={handleShareLink}
                      className="px-4 py-3 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                    >
                      {copiedLink ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span className="text-emerald-700 font-semibold">Tautan Disalin!</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-4 h-4" />
                          <span>Salin Tautan Web</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Quick Progress Summary Strip */}
                  <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-6 text-xs text-slate-600 tabular-nums">
                    <div>
                      Materi Selesai:{' '}
                      <strong className="text-slate-900 font-mono">
                        {completedTopics.length}/4 Bab
                      </strong>
                    </div>
                    <div>
                      Latihan Terjawab:{' '}
                      <strong className="text-slate-900 font-mono">
                        {solvedPracticeIds.length}/{PRACTICE_QUESTIONS.length} Soal
                      </strong>
                    </div>
                    <div>
                      Skor Kuis Tertinggi:{' '}
                      <strong className="text-sky-700 font-mono">
                        {bestQuizScore !== null ? `${bestQuizScore}/100` : 'Belum mengikuti'}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Right Column: Interactive Mini Ratio Calculator Widget */}
                <div className="lg:col-span-5 bg-[#F8FAFC] border border-slate-200 rounded-xl p-6 space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div>
                      <div className="text-xs text-slate-500">Alat Peraga Cepat</div>
                      <h2 className="text-base font-semibold text-slate-900">
                        Kalkulator Penyederhana Rasio
                      </h2>
                    </div>
                    <Sliders className="w-4 h-4 text-sky-700" />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                        <label htmlFor="hero-a">Bilangan Pertama (a)</label>
                        <span className="font-mono font-semibold text-sky-700 tabular-nums">
                          a = {quickA}
                        </span>
                      </div>
                      <input
                        id="hero-a"
                        type="range"
                        min={1}
                        max={24}
                        value={quickA}
                        onChange={(e) => setQuickA(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                        <label htmlFor="hero-b">Bilangan Kedua (b)</label>
                        <span className="font-mono font-semibold text-amber-700 tabular-nums">
                          b = {quickB}
                        </span>
                      </div>
                      <input
                        id="hero-b"
                        type="range"
                        min={1}
                        max={24}
                        value={quickB}
                        onChange={(e) => setQuickB(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Live Output */}
                  <div className="p-4 bg-white border border-slate-200 rounded-lg space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>Rasio Awal: {quickA} : {quickB}</span>
                      <span className="font-mono">FPB = {quickFpb}</span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs font-medium text-slate-700">
                        Rasio Paling Sederhana:
                      </span>
                      <span className="text-2xl font-mono font-bold text-sky-700 tabular-nums">
                        {quickA / quickFpb} : {quickB / quickFpb}
                      </span>
                    </div>
                    <div className="h-5 w-full rounded-md overflow-hidden flex border border-slate-200">
                      <div
                        style={{ width: `${(quickA / (quickA + quickB)) * 100}%` }}
                        className="bg-sky-600 text-white text-[11px] font-mono flex items-center justify-center tabular-nums"
                      >
                        {quickA}
                      </div>
                      <div
                        style={{ width: `${(quickB / (quickA + quickB)) * 100}%` }}
                        className="bg-amber-600 text-white text-[11px] font-mono flex items-center justify-center tabular-nums"
                      >
                        {quickB}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 4 Curriculum Modules Grid */}
            <section className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div>
                  <div className="text-xs text-slate-500">
                    Kurikulum Matematika Kelas 6 SD · 4 Sub-Bab Utama
                  </div>
                  <h2 className="text-2xl font-semibold text-slate-900 mt-0.5">
                    Pilih Modul Materi & Simulasi Interaktif
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveView('materi')}
                  className="text-xs font-semibold text-sky-700 hover:text-sky-900 flex items-center gap-1 whitespace-nowrap"
                >
                  Buka Ruang Materi Lengkap
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {TOPIC_MODULES.map((mod) => {
                  const isDone = completedTopics.includes(mod.id);
                  return (
                    <div
                      key={mod.id}
                      className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between gap-5 hover:border-sky-300 transition-colors"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span className="font-mono font-semibold text-sky-700">
                            MODUL {mod.number}
                          </span>
                          {isDone ? (
                            <span className="font-mono text-emerald-700 font-semibold">
                              ● SUDAH DIPELAJARI
                            </span>
                          ) : (
                            <span>Materi & Simulasi</span>
                          )}
                        </div>

                        <h3 className="text-xl font-semibold text-slate-900">
                          {mod.number}. {mod.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {mod.summary}
                        </p>

                        <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
                          <strong className="text-slate-700">Contoh Penerapan:</strong>{' '}
                          {mod.realWorldContext}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200">
                        <button
                          type="button"
                          onClick={() => navigateToTopic(mod.id)}
                          className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                        >
                          Pelajari & Coba Simulasi
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => navigateToPracticeTopic(mod.id)}
                          className="text-xs font-medium text-sky-700 hover:text-sky-900 whitespace-nowrap cursor-pointer"
                        >
                          Latihan Soal Bab Ini →
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Teacher & School Information Section */}
            <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-8 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-sky-800 font-semibold">
                    <GraduationCap className="w-4 h-4" />
                    <span>Profil Pengembang & Panduan Belajar Siswa</span>
                  </div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    Disusun oleh Bapak {TEACHER_INFO.teacherName} — {TEACHER_INFO.schoolName}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Aplikasi web <strong>MATH KARANGPETE</strong> dirancang khusus untuk
                    mendampingi siswa-siswi Kelas 6 <strong>{TEACHER_INFO.schoolName}</strong> agar
                    dapat belajar kapan saja melalui HP maupun komputer. Ikuti 3 langkah mudah:
                    (1) Pahami materi & mainkan simulasi interaktifnya, (2) Kerjakan 12 latihan
                    soal beserta pembahasannya, lalu (3) Uji kemampuanmu di Kuis Skor Otomatis!
                  </p>
                </div>

                <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveView('kuis');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-5 py-3 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                  >
                    <ClipboardCheck className="w-4 h-4" />
                    Ikuti Kuis Evaluasi (10 Soal)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveView('rapor');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-5 py-2.5 text-xs font-medium text-slate-700 bg-[#F8FAFC] hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors text-center whitespace-nowrap cursor-pointer"
                  >
                    Lihat Rapor Progres Belajar
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* -------------------------------------------------------------------
         * VIEW 2: MATERI & SIMULASI INTERAKTIF (4 MODUL)
         * ------------------------------------------------------------------- */}
        {activeView === 'materi' && (
          <div className="space-y-8">
            {/* Module Selector Tabs */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
              <div>
                <div className="text-xs text-slate-500">
                  Ruang Materi & Simulasi Interaktif · Kelas 6 {TEACHER_INFO.schoolName}
                </div>
                <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 mt-1">
                  {currentModule.number}. {currentModule.title}
                </h1>
                <p className="text-sm text-slate-600 mt-1">{currentModule.subtitle}</p>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-200/70 rounded-xl w-fit">
                {TOPIC_MODULES.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setActiveTopicId(m.id)}
                    className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                      activeTopicId === m.id
                        ? 'bg-white text-slate-900 shadow-xs font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {m.number}. {m.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Two-Zone Sandbox First (No Wall-of-Text before interactive canvas!) */}
            <InteractiveSimulation topicId={currentModule.id} />

            {/* Bite-Sized Concept Cards & Examples */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left 8 cols: Key Concepts & Worked Examples */}
              <div className="lg:col-span-8 space-y-6">
                {currentModule.keyConcepts.map((concept, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-slate-200 rounded-xl p-6 space-y-4"
                  >
                    <h3 className="text-lg font-semibold text-slate-900">
                      {idx + 1}. {concept.heading}
                    </h3>
                    <p className="text-sm text-slate-700 leading-relaxed">{concept.body}</p>

                    {concept.formula && (
                      <div className="p-3.5 bg-[#F8FAFC] border border-slate-200 rounded-lg font-mono text-xs sm:text-sm font-semibold text-sky-800">
                        {concept.formula}
                      </div>
                    )}

                    <div className="pt-3 border-t border-slate-100 space-y-2">
                      <div className="text-xs font-semibold text-slate-900">
                        {concept.exampleTitle}:
                      </div>
                      <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 list-disc list-inside">
                        {concept.exampleSteps.map((step, sIdx) => (
                          <li key={sIdx} className="leading-relaxed">
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right 4 cols: Learning Goals & Module Completion Action */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
                  <h3 className="text-base font-semibold text-slate-900">
                    Tujuan Pembelajaran Bab Ini
                  </h3>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                    {currentModule.learningGoals.map((goal, gIdx) => (
                      <li key={gIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{goal}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 border-t border-slate-200 space-y-3">
                    <button
                      type="button"
                      onClick={() => toggleTopicComplete(currentModule.id)}
                      className={`w-full py-2.5 px-4 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer ${
                        completedTopics.includes(currentModule.id)
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                          : 'bg-sky-700 text-white hover:bg-sky-800'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      {completedTopics.includes(currentModule.id)
                        ? '● Materi Ini Sudah Dipahami'
                        : 'Tandai Materi Sudah Dipahami'}
                    </button>

                    <button
                      type="button"
                      onClick={() => navigateToPracticeTopic(currentModule.id)}
                      className="w-full py-2.5 px-4 rounded-lg text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                    >
                      Latihan Soal {currentModule.title}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------------
         * VIEW 3: LATIHAN SOAL PILIHAN GANDA
         * ------------------------------------------------------------------- */}
        {activeView === 'latihan' && (
          <PracticeSection
            solvedIds={solvedPracticeIds}
            onMarkSolved={handleMarkPracticeSolved}
            onResetPractice={() => setSolvedPracticeIds([])}
            initialTopicFilter={practiceTopicFilter}
          />
        )}

        {/* -------------------------------------------------------------------
         * VIEW 4: KUIS DENGAN SKOR OTOMATIS
         * ------------------------------------------------------------------- */}
        {activeView === 'kuis' && (
          <QuizSection
            attempts={quizAttempts}
            onSaveAttempt={handleSaveQuizAttempt}
          />
        )}

        {/* -------------------------------------------------------------------
         * VIEW 5: RAPOR BELAJAR & RINGKASAN PROGRES SISWA
         * ------------------------------------------------------------------- */}
        {activeView === 'rapor' && (
          <div className="space-y-8">
            <div className="border-b border-slate-200 pb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="text-xs text-slate-500">
                  Rekam Jejak Belajar Mandiri · {TEACHER_INFO.schoolName}
                </div>
                <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 mt-1">
                  Rapor Progres Belajar Matematika Kelas 6
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Guru Pengampu: <strong>{TEACHER_INFO.teacherName}</strong> · Materi: Bab Rasio
                </p>
              </div>

              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 text-xs font-medium bg-white border border-slate-200 rounded-lg hover:bg-slate-100 text-slate-700 whitespace-nowrap no-print"
              >
                Cetak Halaman Rapor
              </button>
            </div>

            {/* 3 Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <div className="text-xs text-slate-500">Ketuntasan Modul Materi</div>
                <div className="text-3xl font-mono font-bold text-sky-700 tabular-nums mt-1">
                  {completedTopics.length} / 4 Bab
                </div>
                <p className="text-xs text-slate-600 mt-2">
                  {completedTopics.length === 4
                    ? '● Seluruh modul materi telah selesai dipelajari!'
                    : 'Pelajari keempat modul dan tandai selesai pada halaman Materi.'}
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <div className="text-xs text-slate-500">Latihan Soal Pilihan Ganda</div>
                <div className="text-3xl font-mono font-bold text-emerald-700 tabular-nums mt-1">
                  {solvedPracticeIds.length} / {PRACTICE_QUESTIONS.length} Soal
                </div>
                <p className="text-xs text-slate-600 mt-2">
                  Persentase latihan terjawab benar:{' '}
                  <strong className="font-mono tabular-nums">
                    {Math.round((solvedPracticeIds.length / PRACTICE_QUESTIONS.length) * 100)}%
                  </strong>
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <div className="text-xs text-slate-500">Skor Kuis Evaluasi Tertinggi</div>
                <div className="text-3xl font-mono font-bold text-amber-700 tabular-nums mt-1">
                  {bestQuizScore !== null ? `${bestQuizScore} / 100` : '—'}
                </div>
                <p className="text-xs text-slate-600 mt-2">
                  Total percobaan kuis: <strong className="font-mono">{quizAttempts.length}×</strong>
                </p>
              </div>
            </div>

            {/* Quiz Attempts Table */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                  <Award className="w-4 h-4 text-sky-700" />
                  Daftar Nilai Kuis Evaluasi Siswa
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveView('kuis')}
                  className="text-xs font-semibold text-sky-700 hover:text-sky-900 no-print"
                >
                  + Kerjakan Kuis Baru
                </button>
              </div>

              {quizAttempts.length === 0 ? (
                <div className="p-8 text-center bg-[#F8FAFC] border border-slate-200 rounded-lg text-xs text-slate-500">
                  Belum ada nilai kuis yang tercatat. Silakan buka menu{' '}
                  <strong>Kuis Evaluasi</strong> untuk mengerjakan soal evaluasi.
                </div>
              ) : (
                <div className="overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm tabular-nums">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                        <th className="py-3 px-4 font-semibold">Tanggal</th>
                        <th className="py-3 px-4 font-semibold">Nama Siswa</th>
                        <th className="py-3 px-4 font-semibold">Kelas</th>
                        <th className="py-3 px-4 font-semibold">Jawaban Benar</th>
                        <th className="py-3 px-4 font-semibold">Skor Akhir</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {quizAttempts.map((att) => (
                        <tr key={att.id} className="text-slate-700">
                          <td className="py-3 px-4 text-slate-500">{att.dateStr}</td>
                          <td className="py-3 px-4 font-semibold text-slate-900">
                            {att.studentName}
                          </td>
                          <td className="py-3 px-4">{att.studentClass}</td>
                          <td className="py-3 px-4 font-mono">
                            {att.correctCount} / {att.totalQuestions}
                          </td>
                          <td className="py-3 px-4 font-mono font-bold text-sky-700">
                            {att.score}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* =====================================================================
       * QUIET EDITORIAL FOOTER
       * ===================================================================== */}
      <footer className="bg-white border-t border-slate-200 mt-16 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-slate-800">{TEACHER_INFO.appName}</span>
            <span aria-hidden="true">·</span>
            <span>{TEACHER_INFO.schoolName}</span>
            <span aria-hidden="true">·</span>
            <span>Guru Kelas 6: {TEACHER_INFO.teacherName}</span>
          </div>
          <div>Media Pembelajaran Interaktif Matematika Kelas 6 SD — Bab Rasio</div>
        </div>
      </footer>
    </div>
  );
}
