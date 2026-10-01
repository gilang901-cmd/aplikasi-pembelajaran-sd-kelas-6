import React, { useState, useEffect } from 'react';
import { QUIZ_QUESTIONS, TEACHER_INFO, TopicId } from '../data/mathContent';
import {
  CheckCircle2,
  AlertTriangle,
  Award,
  RotateCcw,
  Printer,
  ArrowRight,
  ArrowLeft,
  Clock,
  ClipboardCheck,
} from 'lucide-react';

export interface QuizAttempt {
  id: string;
  studentName: string;
  studentClass: string;
  score: number;
  correctCount: number;
  totalQuestions: number;
  durationSeconds: number;
  dateStr: string;
}

interface QuizSectionProps {
  attempts: QuizAttempt[];
  onSaveAttempt: (attempt: QuizAttempt) => void;
}

export const QuizSection: React.FC<QuizSectionProps> = ({
  attempts,
  onSaveAttempt,
}) => {
  const [stage, setStage] = useState<'intro' | 'active' | 'result'>('intro');
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState('Kelas 6 SDN Karangpete');
  const [nameError, setNameError] = useState(false);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [showUnansweredWarning, setShowUnansweredWarning] = useState(false);

  useEffect(() => {
    if (stage !== 'active') return;
    const timer = window.setInterval(() => {
      setElapsedSeconds((s) => s + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [stage]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
  };

  const handleStartQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = studentName.trim();
    if (!trimmed) {
      setNameError(true);
      return;
    }
    setNameError(false);
    setAnswers({});
    setCurrentIdx(0);
    setElapsedSeconds(0);
    setShowUnansweredWarning(false);
    setStage('active');
  };

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
    setShowUnansweredWarning(false);
  };

  const finalizeQuiz = () => {
    let correct = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (answers[q.id] === q.correctIndex) {
        correct += 1;
      }
    });
    const finalScore = Math.round((correct / QUIZ_QUESTIONS.length) * 100);
    const now = new Date();
    const dateStr = now.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const newAttempt: QuizAttempt = {
      id: `quiz-${Date.now()}`,
      studentName: studentName.trim(),
      studentClass,
      score: finalScore,
      correctCount: correct,
      totalQuestions: QUIZ_QUESTIONS.length,
      durationSeconds: elapsedSeconds,
      dateStr,
    };

    onSaveAttempt(newAttempt);
    setStage('result');
  };

  const handleSubmitClick = () => {
    const answeredCount = Object.keys(answers).length;
    if (answeredCount < QUIZ_QUESTIONS.length && !showUnansweredWarning) {
      setShowUnansweredWarning(true);
      return;
    }
    finalizeQuiz();
  };

  // Calculate score for result stage
  const correctCount = QUIZ_QUESTIONS.reduce(
    (acc, q) => (answers[q.id] === q.correctIndex ? acc + 1 : acc),
    0
  );
  const score = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);

  // Breakdown by topic
  const topicBreakdown: { topicId: TopicId; label: string; correct: number; total: number }[] = [
    { topicId: 'konsep-rasio', label: '01. Konsep Rasio', correct: 0, total: 0 },
    { topicId: 'persamaan-rasio', label: '02. Persamaan Rasio', correct: 0, total: 0 },
    { topicId: 'rasio-satuan', label: '03. Rasio Satuan', correct: 0, total: 0 },
    { topicId: 'penerapan-rasio', label: '04. Penerapan Rasio', correct: 0, total: 0 },
  ];

  QUIZ_QUESTIONS.forEach((q) => {
    const entry = topicBreakdown.find((t) => t.topicId === q.topicId);
    if (entry) {
      entry.total += 1;
      if (answers[q.id] === q.correctIndex) {
        entry.correct += 1;
      }
    }
  });

  if (stage === 'intro') {
    return (
      <div className="space-y-8">
        <div className="border-b border-slate-200 pb-6">
          <div className="text-xs text-slate-500">
            Evaluasi Akhir Bab Rasio · {TEACHER_INFO.schoolName} · Guru: {TEACHER_INFO.teacherName}
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 mt-1">
            Kuis Evaluasi Rasio dengan Skor Otomatis
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Uji pemahamanmu tentang Konsep Rasio, Persamaan Rasio, Rasio Satuan, dan Penerapan
            Rasio melalui 10 soal pilihan ganda. Skor dan pembahasan akan muncul secara otomatis!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Registration Form */}
          <form
            onSubmit={handleStartQuiz}
            className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6"
          >
            <h3 className="text-lg font-semibold text-slate-900">
              Identitas Peserta Didik
            </h3>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="student-name"
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  Nama Lengkap Siswa
                </label>
                <input
                  id="student-name"
                  type="text"
                  placeholder="Contoh: Ahmad Fauzan"
                  value={studentName}
                  onChange={(e) => {
                    setStudentName(e.target.value);
                    if (nameError) setNameError(false);
                  }}
                  className="w-full px-4 py-2.5 text-sm bg-[#F8FAFC] border border-slate-300 rounded-lg focus:outline-none focus:border-sky-600 text-slate-900"
                />
                {nameError && (
                  <p className="text-xs text-red-600 mt-1.5 font-medium">
                    ▲ Mohon tuliskan nama lengkapmu terlebih dahulu sebelum memulai kuis.
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="student-class"
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  Kelas / Kelompok Belajar
                </label>
                <select
                  id="student-class"
                  value={studentClass}
                  onChange={(e) => setStudentClass(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm bg-[#F8FAFC] border border-slate-300 rounded-lg focus:outline-none focus:border-sky-600 text-slate-900"
                >
                  <option value="Kelas 6 SDN Karangpete">Kelas 6 SDN Karangpete</option>
                  <option value="Kelas 6A SDN Karangpete">Kelas 6A SDN Karangpete</option>
                  <option value="Kelas 6B SDN Karangpete">Kelas 6B SDN Karangpete</option>
                  <option value="Belajar Mandiri di Rumah">Belajar Mandiri di Rumah</option>
                </select>
              </div>
            </div>

            <div className="p-4 bg-[#F8FAFC] border border-slate-200 rounded-lg text-xs text-slate-600 space-y-1.5">
              <div className="font-semibold text-slate-800">Ketentuan Kuis Evaluasi:</div>
              <div>1. Terdiri dari 10 soal pilihan ganda (masing-masing bernilai 10 poin).</div>
              <div>2. Kamu bebas berpindah nomor soal sebelum menekan tombol Kumpulkan Kuis.</div>
              <div>
                3. Skor akhir (0–100) dan kartu hasil belajar dari Pak Gilang Syahrir Ramdani
                langsung tampil otomatis.
              </div>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <ClipboardCheck className="w-4 h-4" />
              Mulai Kerjakan Kuis Sekarang
            </button>
          </form>

          {/* Past Attempts History Table */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-900">
                Riwayat Nilai Kuis Tersimpan
              </h3>
              <span className="text-xs text-slate-500 font-mono tabular-nums">
                {attempts.length} percobaan
              </span>
            </div>

            {attempts.length === 0 ? (
              <div className="p-6 text-center bg-[#F8FAFC] border border-slate-200 rounded-lg text-xs text-slate-500 space-y-1">
                <p className="font-medium text-slate-700">Belum ada riwayat nilai kuis</p>
                <p>Isi nama lengkapmu di samping dan mulai kuis pertama!</p>
              </div>
            ) : (
              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-xs tabular-nums">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                      <th className="py-2.5 px-3 font-semibold">Nama Siswa</th>
                      <th className="py-2.5 px-3 font-semibold">Benar</th>
                      <th className="py-2.5 px-3 font-semibold">Skor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {attempts.slice(0, 6).map((att) => (
                      <tr key={att.id} className="text-slate-700">
                        <td className="py-2.5 px-3">
                          <div className="font-medium text-slate-900">{att.studentName}</div>
                          <div className="text-[11px] text-slate-500">{att.dateStr}</div>
                        </td>
                        <td className="py-2.5 px-3 font-mono">
                          {att.correctCount}/{att.totalQuestions}
                        </td>
                        <td className="py-2.5 px-3 font-mono font-semibold text-sky-700">
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
      </div>
    );
  }

  if (stage === 'active') {
    const currentQ = QUIZ_QUESTIONS[currentIdx];
    const answeredCount = Object.keys(answers).length;

    return (
      <div className="space-y-6">
        {/* Quiz Top Status Header */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 sm:px-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
            <span className="font-semibold text-slate-900">{studentName}</span>
            <span aria-hidden="true">·</span>
            <span>{studentClass}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">
              Terjawab: <strong>{answeredCount}</strong> / {QUIZ_QUESTIONS.length}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-700 tabular-nums">
              <Clock className="w-4 h-4 text-sky-700" />
              <span>Waktu: {formatTime(elapsedSeconds)}</span>
            </div>
            <button
              type="button"
              onClick={handleSubmitClick}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              Kumpulkan Kuis
            </button>
          </div>
        </div>

        {/* Unanswered Confirmation Banner */}
        {showUnansweredWarning && (
          <div className="p-4 bg-amber-50 border border-amber-300 rounded-xl flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-amber-900">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              <span>
                ▲ Kamu baru menjawab <strong>{answeredCount}</strong> dari{' '}
                <strong>{QUIZ_QUESTIONS.length}</strong> soal. Yakin ingin mengumpulkan sekarang?
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowUnansweredWarning(false)}
                className="px-3 py-1.5 text-xs font-medium bg-white border border-amber-300 text-amber-900 rounded-lg hover:bg-amber-100 whitespace-nowrap"
              >
                Periksa Kembali
              </button>
              <button
                type="button"
                onClick={finalizeQuiz}
                className="px-3 py-1.5 text-xs font-semibold bg-amber-700 text-white rounded-lg hover:bg-amber-800 whitespace-nowrap"
              >
                Ya, Hitung Skor Sekarang
              </button>
            </div>
          </div>
        )}

        {/* Question Number Selector */}
        <div className="flex flex-wrap items-center gap-2">
          {QUIZ_QUESTIONS.map((q, idx) => {
            const isAns = answers[q.id] !== undefined;
            const isCurr = idx === currentIdx;
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => setCurrentIdx(idx)}
                className={`w-10 h-10 rounded-lg font-mono text-xs font-semibold tabular-nums border transition-colors ${
                  isCurr
                    ? 'bg-slate-900 text-white border-slate-900'
                    : isAns
                    ? 'bg-sky-50 text-sky-900 border-sky-300'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {q.id}
              </button>
            );
          })}
        </div>

        {/* Active Question Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 text-xs text-slate-500 border-b border-slate-100 pb-4">
            <span className="font-mono font-semibold text-slate-900 tabular-nums">
              Pertanyaan #{currentQ.id} dari {QUIZ_QUESTIONS.length}
            </span>
            <span aria-hidden="true">·</span>
            <span>Topik: {currentQ.topicLabel}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">Bobot: 10 Poin</span>
          </div>

          <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
            {currentQ.question}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {currentQ.options.map((opt, optIdx) => {
              const letter = String.fromCharCode(65 + optIdx);
              const selected = answers[currentQ.id] === optIdx;
              return (
                <button
                  key={letter}
                  type="button"
                  onClick={() => handleSelectOption(currentQ.id, optIdx)}
                  className={`p-4 rounded-xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                    selected
                      ? 'bg-sky-50/90 border-sky-600 text-sky-950 font-semibold ring-1 ring-sky-600'
                      : 'bg-white border-slate-200 text-slate-800 hover:border-sky-400 hover:bg-slate-50'
                  }`}
                >
                  <span
                    className={`w-7 h-7 rounded-md font-mono text-xs font-semibold flex items-center justify-center shrink-0 ${
                      selected
                        ? 'bg-sky-700 text-white'
                        : 'bg-slate-100 border border-slate-200 text-slate-700'
                    }`}
                  >
                    {letter}
                  </span>
                  <span className="text-sm sm:text-base">{opt}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-4">
            <button
              type="button"
              disabled={currentIdx === 0}
              onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
              className="px-4 py-2 text-xs font-medium rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1.5 whitespace-nowrap"
            >
              <ArrowLeft className="w-4 h-4" />
              Sebelumnya
            </button>

            {currentIdx < QUIZ_QUESTIONS.length - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentIdx((i) => i + 1)}
                className="px-4 py-2 text-xs font-medium rounded-lg bg-slate-900 text-white hover:bg-slate-800 flex items-center gap-1.5 whitespace-nowrap"
              >
                Selanjutnya
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmitClick}
                className="px-5 py-2.5 text-xs font-semibold rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
              >
                Selesai & Lihat Skor Otomatis
                <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // RESULT STAGE
  const predicateText =
    score >= 85
      ? '● SANGAT BAIK (ISTIMEWA)'
      : score >= 70
      ? '● BAIK (TUNTAS)'
      : '▲ PERLU LATIHAN TAMBAHAN';

  const teacherMessage =
    score >= 85
      ? `Luar biasa, ${studentName}! Kamu telah menguasai materi Konsep Rasio, Persamaan Rasio, Rasio Satuan, dan Penerapan Rasio dengan sangat matang. Pertahankan semangat belajarmu di SDN Karangpete!`
      : score >= 70
      ? `Bagus sekali, ${studentName}! Pemahamanmu tentang Rasio sudah tuntas. Coba pelajari kembali pembahasan pada beberapa nomor yang masih keliru agar nilaimu sempurna 100.`
      : `Tetap semangat, ${studentName}! Jangan berkecil hati. Mari buka kembali bagian Simulasi Interaktif dan baca pembahasan di bawah ini bersama Pak Gilang, lalu coba kuis kembali ya!`;

  return (
    <div className="space-y-8">
      {/* Report Card Container */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="text-xs text-slate-500">
              Kartu Hasil Evaluasi Matematika Kelas 6 · {TEACHER_INFO.schoolName}
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 mt-1">
              Hasil Kuis: {studentName}
            </h2>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 mt-1">
              <span>{studentClass}</span>
              <span aria-hidden="true">·</span>
              <span>Guru Pengampu: {TEACHER_INFO.teacherName}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">
                Durasi: {formatTime(elapsedSeconds)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 no-print">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-4 py-2 text-xs font-medium bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-lg flex items-center gap-1.5 whitespace-nowrap"
            >
              <Printer className="w-4 h-4" />
              Cetak Rapor Kuis
            </button>
            <button
              type="button"
              onClick={() => setStage('intro')}
              className="px-4 py-2 text-xs font-semibold bg-sky-700 text-white hover:bg-sky-800 rounded-lg flex items-center gap-1.5 whitespace-nowrap"
            >
              <RotateCcw className="w-4 h-4" />
              Coba Kuis Lagi
            </button>
          </div>
        </div>

        {/* Score Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 bg-[#F8FAFC] border border-slate-200 rounded-lg">
            <div className="text-xs text-slate-500">Skor Akhir Otomatis</div>
            <div className="text-4xl font-mono font-bold text-sky-700 tabular-nums mt-1">
              {score} <span className="text-base font-normal text-slate-500">/ 100</span>
            </div>
            <div className="text-xs font-mono font-semibold text-slate-700 mt-2">
              {predicateText}
            </div>
          </div>

          <div className="p-5 bg-[#F8FAFC] border border-slate-200 rounded-lg">
            <div className="text-xs text-slate-500">Ketepatan Jawaban</div>
            <div className="text-4xl font-mono font-bold text-emerald-700 tabular-nums mt-1">
              {correctCount}{' '}
              <span className="text-base font-normal text-slate-500">
                / {QUIZ_QUESTIONS.length} Soal
              </span>
            </div>
            <div className="text-xs text-slate-600 mt-2 tabular-nums">
              Benar: {correctCount} soal · Salah/Kosong: {QUIZ_QUESTIONS.length - correctCount}{' '}
              soal
            </div>
          </div>

          <div className="p-5 bg-[#F8FAFC] border border-slate-200 rounded-lg flex flex-col justify-between">
            <div className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-sky-700" />
              <span>Catatan Guru ({TEACHER_INFO.teacherName}):</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mt-2">{teacherMessage}</p>
          </div>
        </div>

        {/* Competency Breakdown Table */}
        <div>
          <h3 className="text-sm font-semibold text-slate-900 mb-3">
            Rincian Penguasaan per Materi Rasio
          </h3>
          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-left border-collapse text-xs sm:text-sm tabular-nums">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                  <th className="py-2.5 px-4 font-semibold">Kompetensi Materi</th>
                  <th className="py-2.5 px-4 font-semibold">Jawaban Benar</th>
                  <th className="py-2.5 px-4 font-semibold">Persentase</th>
                  <th className="py-2.5 px-4 font-semibold">Status Ketuntasan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {topicBreakdown.map((item) => {
                  const pct = Math.round((item.correct / item.total) * 100);
                  return (
                    <tr key={item.topicId} className="text-slate-700">
                      <td className="py-2.5 px-4 font-medium text-slate-900">{item.label}</td>
                      <td className="py-2.5 px-4 font-mono">
                        {item.correct} dari {item.total} soal
                      </td>
                      <td className="py-2.5 px-4 font-mono font-semibold">{pct}%</td>
                      <td className="py-2.5 px-4 font-mono text-xs">
                        {pct >= 70 ? (
                          <span className="text-emerald-700 font-semibold">● TUNTAS</span>
                        ) : (
                          <span className="text-amber-700 font-semibold">▲ PERLU DIULANG</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detailed Answer Review */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">
          Pembahasan Lengkap 10 Soal Kuis Evaluasi
        </h3>
        <div className="space-y-4">
          {QUIZ_QUESTIONS.map((q) => {
            const userAns = answers[q.id];
            const isRight = userAns === q.correctIndex;
            return (
              <div
                key={q.id}
                className="bg-white border border-slate-200 rounded-xl p-5 space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2 text-slate-500">
                    <span className="font-mono font-semibold text-slate-900 tabular-nums">
                      Nomor #{q.id}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{q.topicLabel}</span>
                  </div>
                  <span
                    className={`font-mono font-semibold ${
                      isRight ? 'text-emerald-700' : 'text-red-700'
                    }`}
                  >
                    {isRight ? '● BENAR (+10 Poin)' : '▲ KURANG TEPAT (0 Poin)'}
                  </span>
                </div>

                <p className="text-sm font-medium text-slate-900">{q.question}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-[#F8FAFC] border border-slate-200">
                    <span className="text-slate-500">Jawaban Kamu: </span>
                    <strong className={isRight ? 'text-emerald-700' : 'text-red-700'}>
                      {userAns !== undefined
                        ? `${String.fromCharCode(65 + userAns)}. ${q.options[userAns]}`
                        : 'Tidak dijawab'}
                    </strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-50/50 border border-emerald-200">
                    <span className="text-slate-500">Kunci Jawaban: </span>
                    <strong className="text-emerald-800">
                      {String.fromCharCode(65 + q.correctIndex)}. {q.options[q.correctIndex]}
                    </strong>
                  </div>
                </div>

                <div className="text-xs text-slate-600 bg-[#F8FAFC] p-3 rounded-lg border border-slate-200/80 leading-relaxed">
                  <strong>Pembahasan Pak Gilang:</strong> {q.explanation}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
