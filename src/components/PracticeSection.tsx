import React, { useState } from 'react';
import { PRACTICE_QUESTIONS, TopicId } from '../data/mathContent';
import {
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  BookOpen,
} from 'lucide-react';

interface PracticeSectionProps {
  solvedIds: string[];
  onMarkSolved: (questionId: string) => void;
  onResetPractice: () => void;
  initialTopicFilter?: TopicId | 'all';
}

export const PracticeSection: React.FC<PracticeSectionProps> = ({
  solvedIds,
  onMarkSolved,
  onResetPractice,
  initialTopicFilter = 'all',
}) => {
  const [topicFilter, setTopicFilter] = useState<TopicId | 'all'>(initialTopicFilter);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>({});

  const filteredQuestions =
    topicFilter === 'all'
      ? PRACTICE_QUESTIONS
      : PRACTICE_QUESTIONS.filter((q) => q.topicId === topicFilter);

  const safeIndex = Math.min(currentIndex, Math.max(0, filteredQuestions.length - 1));
  const currentQuestion = filteredQuestions[safeIndex];

  const handleFilterChange = (newFilter: TopicId | 'all') => {
    setTopicFilter(newFilter);
    setCurrentIndex(0);
  };

  const handleSelectOption = (qId: string, optIdx: number, correctIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIdx }));
    if (optIdx === correctIdx) {
      onMarkSolved(qId);
    }
  };

  const toggleHint = (qId: string) => {
    setRevealedHints((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const selectedOpt = currentQuestion ? selectedAnswers[currentQuestion.id] : undefined;
  const isAnswered = selectedOpt !== undefined;
  const isCorrect = isAnswered && selectedOpt === currentQuestion.correctIndex;

  return (
    <div className="space-y-8">
      {/* Header & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="text-xs text-slate-500">
            Latihan Mandiri Terbimbing · SDN Karangpete · Kelas 6 SD
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 mt-1">
            Latihan Soal Pilihan Ganda & Pembahasan
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Pilih jawaban yang menurutmu paling tepat. Setiap soal dilengkapi petunjuk dan
            langkah penyelesaian dari Pak Gilang Syahrir Ramdani agar kamu langsung paham.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-600 shrink-0">
          <span className="font-mono tabular-nums">
            Terselesaikan: <strong>{solvedIds.length}</strong> / {PRACTICE_QUESTIONS.length} soal
          </span>
          {solvedIds.length > 0 && (
            <button
              type="button"
              onClick={() => {
                setSelectedAnswers({});
                setRevealedHints({});
                onResetPractice();
              }}
              className="text-slate-600 hover:text-slate-900 font-medium flex items-center gap-1 whitespace-nowrap"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Ulangi Latihan
            </button>
          )}
        </div>
      </div>

      {/* Topic Filter Segmented Control */}
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-200/70 rounded-xl w-fit">
        {[
          { id: 'all', label: 'Semua Topik (12)' },
          { id: 'konsep-rasio', label: '01. Konsep Rasio' },
          { id: 'persamaan-rasio', label: '02. Persamaan Rasio' },
          { id: 'rasio-satuan', label: '03. Rasio Satuan' },
          { id: 'penerapan-rasio', label: '04. Penerapan Rasio' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleFilterChange(tab.id as TopicId | 'all')}
            className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              topicFilter === tab.id
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Question Number Strip */}
      <div className="flex flex-wrap items-center gap-2">
        {filteredQuestions.map((q, idx) => {
          const ans = selectedAnswers[q.id];
          const solved = solvedIds.includes(q.id);
          const wrong = ans !== undefined && ans !== q.correctIndex;
          const active = idx === safeIndex;

          return (
            <button
              key={q.id}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`w-10 h-10 rounded-lg font-mono text-xs font-semibold transition-colors tabular-nums flex items-center justify-center border ${
                active
                  ? 'bg-slate-900 text-white border-slate-900'
                  : solved
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : wrong
                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {/* Main Question Card */}
      {currentQuestion && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
          {/* Unboxed Metadata Row */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 border-b border-slate-100 pb-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono font-semibold text-slate-800 tabular-nums">
                Soal {safeIndex + 1} dari {filteredQuestions.length}
              </span>
              <span aria-hidden="true">·</span>
              <span>Materi: {currentQuestion.topicLabel}</span>
              <span aria-hidden="true">·</span>
              <span>Tingkat: {currentQuestion.difficulty}</span>
            </div>

            <button
              type="button"
              onClick={() => toggleHint(currentQuestion.id)}
              className="text-sky-700 hover:text-sky-900 font-medium flex items-center gap-1.5 whitespace-nowrap"
            >
              <HelpCircle className="w-4 h-4" />
              {revealedHints[currentQuestion.id] ? 'Sembunyikan Petunjuk' : 'Bantuan Petunjuk'}
            </button>
          </div>

          {/* Question Text */}
          <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
            {currentQuestion.question}
          </p>

          {/* Optional Hint Box */}
          {revealedHints[currentQuestion.id] && (
            <div className="p-4 bg-sky-50/70 border border-sky-200 rounded-lg text-xs sm:text-sm text-sky-900 leading-relaxed">
              <strong>Petunjuk Pak Gilang:</strong> {currentQuestion.hint}
            </div>
          )}

          {/* Multiple Choice Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {currentQuestion.options.map((optionText, optIdx) => {
              const letter = String.fromCharCode(65 + optIdx);
              const isSelected = selectedOpt === optIdx;
              const isOptionCorrect = optIdx === currentQuestion.correctIndex;

              let btnStyle =
                'bg-white border-slate-200 text-slate-800 hover:border-sky-400 hover:bg-sky-50/30';
              let statusLabel = null;

              if (isAnswered) {
                if (isOptionCorrect) {
                  btnStyle = 'bg-emerald-50/80 border-emerald-400 text-emerald-950 font-semibold';
                  statusLabel = (
                    <span className="text-xs font-mono text-emerald-700 shrink-0">
                      ● KUNCI BENAR
                    </span>
                  );
                } else if (isSelected && !isOptionCorrect) {
                  btnStyle = 'bg-red-50/80 border-red-300 text-red-950';
                  statusLabel = (
                    <span className="text-xs font-mono text-red-700 shrink-0">
                      ▲ KURANG TEPAT
                    </span>
                  );
                }
              }

              return (
                <button
                  key={letter}
                  type="button"
                  onClick={() =>
                    handleSelectOption(
                      currentQuestion.id,
                      optIdx,
                      currentQuestion.correctIndex
                    )
                  }
                  className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-md bg-slate-100 border border-slate-200 font-mono text-xs font-semibold flex items-center justify-center shrink-0 text-slate-800">
                      {letter}
                    </span>
                    <span className="text-sm sm:text-base">{optionText}</span>
                  </div>
                  {statusLabel}
                </button>
              );
            })}
          </div>

          {/* Immediate Feedback & Step-by-Step Walkthrough */}
          {isAnswered && (
            <div
              className={`p-5 rounded-xl border space-y-3 ${
                isCorrect
                  ? 'bg-emerald-50/50 border-emerald-200'
                  : 'bg-amber-50/50 border-amber-200'
              }`}
            >
              <div className="flex items-center gap-2 text-sm font-semibold">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span className="text-emerald-900">
                      ● JAWABAN TEPAT! Hebat sekali, kamu berhasil menjawab dengan benar.
                    </span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                    <span className="text-amber-900">
                      ▲ BELUM TEPAT. Jangan menyerah! Mari kita pelajari langkah penyelesaiannya:
                    </span>
                  </>
                )}
              </div>

              <div className="pt-2 border-t border-slate-200/80 space-y-1.5">
                <div className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-sky-700" />
                  <span>Langkah Penyelesaian Lengkap:</span>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-xs sm:text-sm text-slate-700">
                  {currentQuestion.solutionSteps.map((step, sIdx) => (
                    <li key={sIdx} className="leading-relaxed">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}

          {/* Prev / Next Navigation Footer */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-4">
            <button
              type="button"
              disabled={safeIndex === 0}
              onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
              className="px-4 py-2 text-xs font-medium rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1.5 whitespace-nowrap"
            >
              <ArrowLeft className="w-4 h-4" />
              Soal Sebelumnya
            </button>

            <button
              type="button"
              disabled={safeIndex === filteredQuestions.length - 1}
              onClick={() =>
                setCurrentIndex((i) => Math.min(filteredQuestions.length - 1, i + 1))
              }
              className="px-4 py-2 text-xs font-medium rounded-lg bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1.5 whitespace-nowrap"
            >
              Soal Berikutnya
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
