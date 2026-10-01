import React, { useState } from 'react';
import { TopicId } from '../data/mathContent';
import {
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Sliders,
  ArrowRight,
  Scale,
  ShoppingBag,
  Map,
  Layers,
} from 'lucide-react';

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

interface SimulationProps {
  topicId: TopicId;
}

export const InteractiveSimulation: React.FC<SimulationProps> = ({ topicId }) => {
  switch (topicId) {
    case 'konsep-rasio':
      return <KonsepRasioSandbox />;
    case 'persamaan-rasio':
      return <PersamaanRasioSandbox />;
    case 'rasio-satuan':
      return <RasioSatuanSandbox />;
    case 'penerapan-rasio':
      return <PenerapanRasioSandbox />;
  }
};

/* ============================================================================
 * 01. SIMULASI KONSEP RASIO (TWO-ZONE SANDBOX)
 * ============================================================================ */
const KONSEP_PRESETS = [
  {
    id: 'buah',
    label: 'Buah di Meja Kelas',
    itemA: 'Apel Merah',
    itemB: 'Jeruk Manis',
    unit: 'buah',
    colorA: '#0284C7',
    colorB: '#D97706',
    defaultA: 6,
    defaultB: 9,
  },
  {
    id: 'alat-tulis',
    label: 'Alat Tulis Koperasi',
    itemA: 'Buku Tulis',
    itemB: 'Pensil Kayu',
    unit: 'buah',
    colorA: '#059669',
    colorB: '#0284C7',
    defaultA: 4,
    defaultB: 8,
  },
  {
    id: 'siswa',
    label: 'Kelompok Belajar 6A',
    itemA: 'Siswa Laki-laki',
    itemB: 'Siswa Perempuan',
    unit: 'anak',
    colorA: '#0284C7',
    colorB: '#059669',
    defaultA: 6,
    defaultB: 8,
  },
];

const KonsepRasioSandbox: React.FC = () => {
  const [presetIdx, setPresetIdx] = useState(0);
  const preset = KONSEP_PRESETS[presetIdx];

  const [countA, setCountA] = useState(preset.defaultA);
  const [countB, setCountB] = useState(preset.defaultB);
  const [comparisonMode, setComparisonMode] = useState<'ab' | 'ba' | 'atotal' | 'btotal'>('ab');

  const handlePresetChange = (idx: number) => {
    setPresetIdx(idx);
    setCountA(KONSEP_PRESETS[idx].defaultA);
    setCountB(KONSEP_PRESETS[idx].defaultB);
  };

  const total = countA + countB;
  const fpbAB = gcd(countA, countB);

  let leftVal = countA;
  let rightVal = countB;
  let leftLabel = preset.itemA;
  let rightLabel = preset.itemB;

  if (comparisonMode === 'ba') {
    leftVal = countB;
    rightVal = countA;
    leftLabel = preset.itemB;
    rightLabel = preset.itemA;
  } else if (comparisonMode === 'atotal') {
    leftVal = countA;
    rightVal = total;
    leftLabel = preset.itemA;
    rightLabel = 'Seluruhnya (Total)';
  } else if (comparisonMode === 'btotal') {
    leftVal = countB;
    rightVal = total;
    leftLabel = preset.itemB;
    rightLabel = 'Seluruhnya (Total)';
  }

  const currentFpb = gcd(leftVal, rightVal);
  const simpLeft = leftVal / currentFpb;
  const simpRight = rightVal / currentFpb;

  // Groups for visual FPB demonstration (when comparing A and B)
  const groupCount = fpbAB;
  const perGroupA = countA / groupCount;
  const perGroupB = countB / groupCount;

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4 bg-slate-50/60">
        <div>
          <div className="text-xs text-slate-500">
            Laboratorium Virtual · Bab 01 · Konsep Rasio
          </div>
          <h3 className="text-lg font-semibold text-slate-900">
            Simulasi Perbandingan & Penyederhanaan Rasio (FPB)
          </h3>
        </div>
        <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg">
          {KONSEP_PRESETS.map((p, idx) => (
            <button
              key={p.id}
              type="button"
              onClick={() => handlePresetChange(idx)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                presetIdx === idx
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Two-Zone Sandbox Layout: 60% Left Stage / 40% Right Control Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* LEFT / TOP ZONE: Interactive Visual Stage (7 cols) */}
        <div className="lg:col-span-7 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col justify-between gap-6">
          {/* Top Live Ratio Readout Bar */}
          <div className="p-4 bg-[#F8FAFC] border border-slate-200 rounded-lg">
            <div className="text-xs text-slate-500 mb-2">
              Perbandingan Aktif: <strong className="text-slate-800">{leftLabel}</strong> terhadap{' '}
              <strong className="text-slate-800">{rightLabel}</strong>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-2 border-t border-slate-200/80">
              <div>
                <div className="text-xs text-slate-500">Rasio Awal</div>
                <div className="text-2xl font-mono font-semibold text-slate-900 tabular-nums mt-0.5">
                  {leftVal} : {rightVal}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Bentuk Sederhana</div>
                <div className="text-2xl font-mono font-semibold text-sky-700 tabular-nums mt-0.5">
                  {simpLeft} : {simpRight}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Bentuk Pecahan</div>
                <div className="text-2xl font-mono font-semibold text-emerald-700 tabular-nums mt-0.5">
                  {simpLeft}/{simpRight}
                </div>
              </div>
            </div>
          </div>

          {/* Visual Item Canvas Grouped by FPB */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-slate-800">
                Visualisasi Pengelompokan Benda (FPB = {fpbAB})
              </span>
              <span className="text-xs text-slate-500 tabular-nums">
                Total: {total} {preset.unit}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Array.from({ length: groupCount }).map((_, gIdx) => (
                <div
                  key={gIdx}
                  className="p-3 rounded-lg bg-[#F8FAFC] border border-slate-200"
                >
                  <div className="text-xs text-slate-500 mb-2 flex items-center justify-between">
                    <span>Kelompok #{gIdx + 1}</span>
                    <span className="font-mono text-slate-700 tabular-nums">
                      {perGroupA} : {perGroupB}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 items-center">
                    {Array.from({ length: perGroupA }).map((__, aIdx) => (
                      <div
                        key={`a-${aIdx}`}
                        title={preset.itemA}
                        className="w-8 h-8 rounded-md bg-sky-600 text-white flex items-center justify-center text-xs font-mono font-semibold shadow-2xs"
                      >
                        A
                      </div>
                    ))}
                    <span className="text-slate-300 font-mono px-0.5">:</span>
                    {Array.from({ length: perGroupB }).map((__, bIdx) => (
                      <div
                        key={`b-${bIdx}`}
                        title={preset.itemB}
                        className="w-8 h-8 rounded-md bg-amber-600 text-white flex items-center justify-center text-xs font-mono font-semibold shadow-2xs"
                      >
                        B
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-4 flex flex-wrap items-center gap-6 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-xs bg-sky-600 inline-block" />
                <span>
                  <strong>A</strong> = {preset.itemA} ({countA} {preset.unit})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-xs bg-amber-600 inline-block" />
                <span>
                  <strong>B</strong> = {preset.itemB} ({countB} {preset.unit})
                </span>
              </div>
            </div>
          </div>

          {/* Comparative Bar Meter */}
          <div className="pt-4 border-t border-slate-200">
            <div className="text-xs text-slate-500 mb-2">
              Proporsi Bagian terhadap Keseluruhan ({total} {preset.unit})
            </div>
            <div className="h-7 w-full rounded-lg overflow-hidden flex border border-slate-200">
              <div
                style={{ width: `${(countA / total) * 100}%` }}
                className="bg-sky-600 text-white text-xs font-mono font-semibold flex items-center justify-center transition-all duration-150 tabular-nums"
              >
                {countA} ({Math.round((countA / total) * 100)}%)
              </div>
              <div
                style={{ width: `${(countB / total) * 100}%` }}
                className="bg-amber-600 text-white text-xs font-mono font-semibold flex items-center justify-center transition-all duration-150 tabular-nums"
              >
                {countB} ({Math.round((countB / total) * 100)}%)
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT / BOTTOM ZONE: Control & Concept Deck (5 cols) */}
        <div className="lg:col-span-5 p-6 bg-slate-50/40 flex flex-col justify-between gap-6">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-sky-700" />
                Panel Kendali Besaran
              </h4>
              <button
                type="button"
                onClick={() => {
                  setCountA(preset.defaultA);
                  setCountB(preset.defaultB);
                  setComparisonMode('ab');
                }}
                className="text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1 whitespace-nowrap"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Atur Ulang
              </button>
            </div>

            {/* Slider 1: Besaran A */}
            <div>
              <div className="flex items-center justify-between text-sm mb-1.5">
                <label htmlFor="slider-konsep-a" className="font-medium text-slate-700">
                  Banyak {preset.itemA} (A)
                </label>
                <span className="font-mono font-semibold text-sky-700 tabular-nums">
                  {countA} {preset.unit}
                </span>
              </div>
              <input
                id="slider-konsep-a"
                type="range"
                min={1}
                max={12}
                value={countA}
                onChange={(e) => setCountA(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono tabular-nums mt-1">
                <span>1 {preset.unit}</span>
                <span>6 {preset.unit}</span>
                <span>12 {preset.unit}</span>
              </div>
            </div>

            {/* Slider 2: Besaran B */}
            <div>
              <div className="flex items-center justify-between text-sm mb-1.5">
                <label htmlFor="slider-konsep-b" className="font-medium text-slate-700">
                  Banyak {preset.itemB} (B)
                </label>
                <span className="font-mono font-semibold text-amber-700 tabular-nums">
                  {countB} {preset.unit}
                </span>
              </div>
              <input
                id="slider-konsep-b"
                type="range"
                min={1}
                max={12}
                value={countB}
                onChange={(e) => setCountB(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono tabular-nums mt-1">
                <span>1 {preset.unit}</span>
                <span>6 {preset.unit}</span>
                <span>12 {preset.unit}</span>
              </div>
            </div>

            {/* Comparison Direction Selector */}
            <div className="pt-3 border-t border-slate-200">
              <div className="text-xs font-medium text-slate-700 mb-2">
                Pilih Jenis Perbandingan yang Diamati:
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setComparisonMode('ab')}
                  className={`px-3 py-2 text-xs font-medium rounded-lg border text-left transition-colors whitespace-nowrap truncate ${
                    comparisonMode === 'ab'
                      ? 'bg-sky-700 text-white border-sky-700'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  A terhadap B ({countA} : {countB})
                </button>
                <button
                  type="button"
                  onClick={() => setComparisonMode('ba')}
                  className={`px-3 py-2 text-xs font-medium rounded-lg border text-left transition-colors whitespace-nowrap truncate ${
                    comparisonMode === 'ba'
                      ? 'bg-sky-700 text-white border-sky-700'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  B terhadap A ({countB} : {countA})
                </button>
                <button
                  type="button"
                  onClick={() => setComparisonMode('atotal')}
                  className={`px-3 py-2 text-xs font-medium rounded-lg border text-left transition-colors whitespace-nowrap truncate ${
                    comparisonMode === 'atotal'
                      ? 'bg-sky-700 text-white border-sky-700'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  A terhadap Total ({countA} : {total})
                </button>
                <button
                  type="button"
                  onClick={() => setComparisonMode('btotal')}
                  className={`px-3 py-2 text-xs font-medium rounded-lg border text-left transition-colors whitespace-nowrap truncate ${
                    comparisonMode === 'btotal'
                      ? 'bg-sky-700 text-white border-sky-700'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  B terhadap Total ({countB} : {total})
                </button>
              </div>
            </div>
          </div>

          {/* Live Step-by-Step Explanation Note */}
          <div className="p-4 bg-white border border-slate-200 rounded-lg space-y-2">
            <div className="text-xs font-semibold text-sky-800 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Penjelasan Otomatis Pak Gilang:</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Rasio <strong>{leftLabel}</strong> terhadap <strong>{rightLabel}</strong> adalah{' '}
              <span className="font-mono font-semibold text-slate-900">
                {leftVal} : {rightVal}
              </span>
              .{' '}
              {currentFpb > 1 ? (
                <>
                  Karena kedua bilangan habis dibagi <strong>FPB = {currentFpb}</strong>, kita
                  sederhanakan menjadi{' '}
                  <span className="font-mono font-semibold text-sky-700">
                    ({leftVal} ÷ {currentFpb}) : ({rightVal} ÷ {currentFpb}) = {simpLeft} :{' '}
                    {simpRight}
                  </span>
                  .
                </>
              ) : (
                <>
                  Kedua bilangan memiliki <strong>FPB = 1</strong>, sehingga{' '}
                  <span className="font-mono font-semibold text-sky-700">
                    {leftVal} : {rightVal}
                  </span>{' '}
                  sudah merupakan bentuk rasio paling sederhana!
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * 02. SIMULASI PERSAMAAN RASIO (TWO-ZONE SANDBOX)
 * ============================================================================ */
const PersamaanRasioSandbox: React.FC = () => {
  const [mode, setMode] = useState<'resep' | 'uji'>('resep');

  // Mode 1: Skala Resep Es Buah
  const [baseSirup, setBaseSirup] = useState(2);
  const [baseAir, setBaseAir] = useState(5);
  const [multiplier, setMultiplier] = useState(3);

  // Mode 2: Penguji Dua Rasio Ekuivalen
  const [r1A, setR1A] = useState(4);
  const [r1B, setR1B] = useState(6);
  const [r2A, setR2A] = useState(6);
  const [r2B, setR2B] = useState(9);

  const scaledSirup = baseSirup * multiplier;
  const scaledAir = baseAir * multiplier;
  const totalTakaran = scaledSirup + scaledAir;

  const isEquivalent = r1A * r2B === r1B * r2A;
  const g1 = gcd(r1A, r1B);
  const g2 = gcd(r2A, r2B);

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4 bg-slate-50/60">
        <div>
          <div className="text-xs text-slate-500">
            Laboratorium Virtual · Bab 02 · Persamaan Rasio
          </div>
          <h3 className="text-lg font-semibold text-slate-900">
            Simulasi Tabel Rasio Senilai & Penguji Kesetaraan Rasio
          </h3>
        </div>
        <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg">
          <button
            type="button"
            onClick={() => setMode('resep')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              mode === 'resep'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Takaran Resep & Tabel Rasio
          </button>
          <button
            type="button"
            onClick={() => setMode('uji')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              mode === 'uji'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Uji Kesetaraan 2 Rasio
          </button>
        </div>
      </div>

      {mode === 'resep' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* LEFT STAGE */}
          <div className="lg:col-span-7 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 space-y-6">
            <div className="p-4 bg-[#F8FAFC] border border-slate-200 rounded-lg flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs text-slate-500">Persamaan Rasio Takaran Minuman</div>
                <div className="text-xl font-mono font-semibold text-slate-900 tabular-nums mt-0.5">
                  {baseSirup} : {baseAir} &nbsp;=&nbsp;{' '}
                  <span className="text-sky-700">
                    {scaledSirup} : {scaledAir}
                  </span>
                </div>
              </div>
              <div className="text-xs font-mono text-emerald-700 font-semibold tabular-nums">
                ● FAKTOR PENGALI: ×{multiplier}
              </div>
            </div>

            {/* Tabel Rasio Interaktif */}
            <div>
              <div className="text-sm font-semibold text-slate-800 mb-2">
                Tabel Persamaan Rasio (Klik baris atau geser slider untuk memilih kelipatan)
              </div>
              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-sm tabular-nums">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-xs text-slate-600">
                      <th className="py-2.5 px-3 font-semibold">Kelipatan Porsi</th>
                      <th className="py-2.5 px-3 font-semibold">Sirup Melon (sendok)</th>
                      <th className="py-2.5 px-3 font-semibold">Air Kelapa (sendok)</th>
                      <th className="py-2.5 px-3 font-semibold">Total Campuran</th>
                      <th className="py-2.5 px-3 font-semibold">Rasio Senilai</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-mono text-xs">
                    {[1, 2, 3, 4, 5, 6].map((k) => {
                      const isCurrent = k === multiplier;
                      return (
                        <tr
                          key={k}
                          onClick={() => setMultiplier(k)}
                          className={`cursor-pointer transition-colors ${
                            isCurrent
                              ? 'bg-sky-50/90 text-sky-900 font-semibold'
                              : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <td className="py-2.5 px-3">×{k} porsi</td>
                          <td className="py-2.5 px-3">{baseSirup * k} sendok</td>
                          <td className="py-2.5 px-3">{baseAir * k} sendok</td>
                          <td className="py-2.5 px-3">{(baseSirup + baseAir) * k} sendok</td>
                          <td className="py-2.5 px-3">
                            {baseSirup * k} : {baseAir * k}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Visual Pitcher / Gelas Takar */}
            <div className="pt-2">
              <div className="text-xs text-slate-500 mb-2">
                Visualisasi Komposisi Campuran ({scaledSirup} sendok Sirup + {scaledAir} sendok Air
                = {totalTakaran} sendok)
              </div>
              <div className="h-8 w-full rounded-lg overflow-hidden flex border border-slate-200">
                <div
                  style={{ width: `${(scaledSirup / totalTakaran) * 100}%` }}
                  className="bg-emerald-600 text-white text-xs font-mono font-semibold flex items-center justify-center tabular-nums"
                >
                  Sirup: {scaledSirup}
                </div>
                <div
                  style={{ width: `${(scaledAir / totalTakaran) * 100}%` }}
                  className="bg-sky-600 text-white text-xs font-mono font-semibold flex items-center justify-center tabular-nums"
                >
                  Air: {scaledAir}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT CONTROL DECK */}
          <div className="lg:col-span-5 p-6 bg-slate-50/40 flex flex-col justify-between gap-6">
            <div className="space-y-5">
              <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-sky-700" />
                Pengaturan Resep Dasar & Porsi
              </h4>

              <div>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <label htmlFor="sirup-base" className="font-medium text-slate-700">
                    Takaran Dasar Sirup (1 Porsi)
                  </label>
                  <span className="font-mono font-semibold text-emerald-700 tabular-nums">
                    {baseSirup} sendok
                  </span>
                </div>
                <input
                  id="sirup-base"
                  type="range"
                  min={1}
                  max={5}
                  value={baseSirup}
                  onChange={(e) => setBaseSirup(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <label htmlFor="air-base" className="font-medium text-slate-700">
                    Takaran Dasar Air Kelapa (1 Porsi)
                  </label>
                  <span className="font-mono font-semibold text-sky-700 tabular-nums">
                    {baseAir} sendok
                  </span>
                </div>
                <input
                  id="air-base"
                  type="range"
                  min={2}
                  max={8}
                  value={baseAir}
                  onChange={(e) => setBaseAir(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>

              <div className="pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <label htmlFor="porsi-mult" className="font-medium text-slate-700">
                    Lipat Gandakan Porsi (Faktor Pengali k)
                  </label>
                  <span className="font-mono font-semibold text-slate-900 tabular-nums">
                    {multiplier}× Porsi
                  </span>
                </div>
                <input
                  id="porsi-mult"
                  type="range"
                  min={1}
                  max={6}
                  value={multiplier}
                  onChange={(e) => setMultiplier(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-lg space-y-2">
              <div className="text-xs font-semibold text-sky-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Mengapa Rasanya Tetap Sama Manisnya?</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Meskipun jumlah minuman bertambah menjadi <strong>{multiplier}× lipat</strong>,
                perbandingan Sirup dan Air adalah{' '}
                <span className="font-mono font-semibold text-slate-900">
                  ({baseSirup} × {multiplier}) : ({baseAir} × {multiplier}) = {scaledSirup} :{' '}
                  {scaledAir}
                </span>
                . Proporsi sirup tetap{' '}
                <strong>{Math.round((baseSirup / (baseSirup + baseAir)) * 100)}%</strong> dari total
                minuman!
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* MODE 2: PENGUJI KESETARAAN 2 RASIO */
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-7 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 space-y-6">
            <div
              className={`p-4 rounded-lg border flex flex-wrap items-center justify-between gap-4 ${
                isEquivalent
                  ? 'bg-emerald-50/70 border-emerald-200'
                  : 'bg-amber-50/70 border-amber-200'
              }`}
            >
              <div>
                <div className="text-xs text-slate-600">Hasil Uji Persamaan Rasio</div>
                <div className="text-2xl font-mono font-semibold text-slate-900 tabular-nums mt-0.5">
                  {r1A} : {r1B} &nbsp;{isEquivalent ? '=' : '≠'}&nbsp; {r2A} : {r2B}
                </div>
              </div>
              <div
                className={`text-xs font-mono font-semibold flex items-center gap-1.5 ${
                  isEquivalent ? 'text-emerald-800' : 'text-amber-800'
                }`}
              >
                {isEquivalent ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>● EKUIVALEN (SENILAI)</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>▲ TIDAK SENILAI</span>
                  </>
                )}
              </div>
            </div>

            {/* Visual Bar Comparison */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-1 font-mono tabular-nums">
                  <span>
                    Rasio Pertama ({r1A} : {r1B}) → Bentuk sederhana: {r1A / g1} : {r1B / g1}
                  </span>
                  <span>Proporsi A: {Math.round((r1A / (r1A + r1B)) * 100)}%</span>
                </div>
                <div className="h-7 w-full rounded-lg overflow-hidden flex border border-slate-200">
                  <div
                    style={{ width: `${(r1A / (r1A + r1B)) * 100}%` }}
                    className="bg-sky-600 text-white text-xs font-mono flex items-center justify-center tabular-nums"
                  >
                    {r1A}
                  </div>
                  <div
                    style={{ width: `${(r1B / (r1A + r1B)) * 100}%` }}
                    className="bg-slate-300 text-slate-800 text-xs font-mono flex items-center justify-center tabular-nums"
                  >
                    {r1B}
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-1 font-mono tabular-nums">
                  <span>
                    Rasio Kedua ({r2A} : {r2B}) → Bentuk sederhana: {r2A / g2} : {r2B / g2}
                  </span>
                  <span>Proporsi C: {Math.round((r2A / (r2A + r2B)) * 100)}%</span>
                </div>
                <div className="h-7 w-full rounded-lg overflow-hidden flex border border-slate-200">
                  <div
                    style={{ width: `${(r2A / (r2A + r2B)) * 100}%` }}
                    className="bg-emerald-600 text-white text-xs font-mono flex items-center justify-center tabular-nums"
                  >
                    {r2A}
                  </div>
                  <div
                    style={{ width: `${(r2B / (r2A + r2B)) * 100}%` }}
                    className="bg-slate-300 text-slate-800 text-xs font-mono flex items-center justify-center tabular-nums"
                  >
                    {r2B}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#F8FAFC] border border-slate-200 rounded-lg text-xs text-slate-700 space-y-1.5">
              <div className="font-semibold text-slate-900">
                Bukti Perkalian Silang & Penyederhanaan:
              </div>
              <div className="font-mono tabular-nums">
                • Rasio 1 disederhanakan: {r1A} : {r1B} = {r1A / g1} : {r1B / g1}
              </div>
              <div className="font-mono tabular-nums">
                • Rasio 2 disederhanakan: {r2A} : {r2B} = {r2A / g2} : {r2B / g2}
              </div>
              <div className="font-mono tabular-nums">
                • Uji kali silang: ({r1A} × {r2B} = {r1A * r2B}) dibanding ({r1B} × {r2A} ={' '}
                {r1B * r2A})
              </div>
            </div>
          </div>

          {/* RIGHT DECK */}
          <div className="lg:col-span-5 p-6 bg-slate-50/40 space-y-4">
            <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <Scale className="w-4 h-4 text-sky-700" />
              Atur Nilai Kedua Rasio
            </h4>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <span>Suku Pertama Rasio 1 (A)</span>
                <span className="font-mono font-semibold tabular-nums">{r1A}</span>
              </div>
              <input
                type="range"
                min={1}
                max={16}
                value={r1A}
                onChange={(e) => setR1A(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <span>Suku Kedua Rasio 1 (B)</span>
                <span className="font-mono font-semibold tabular-nums">{r1B}</span>
              </div>
              <input
                type="range"
                min={1}
                max={16}
                value={r1B}
                onChange={(e) => setR1B(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>

            <div className="pt-2 border-t border-slate-200">
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <span>Suku Pertama Rasio 2 (C)</span>
                <span className="font-mono font-semibold tabular-nums">{r2A}</span>
              </div>
              <input
                type="range"
                min={1}
                max={16}
                value={r2A}
                onChange={(e) => setR2A(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <span>Suku Kedua Rasio 2 (D)</span>
                <span className="font-mono font-semibold tabular-nums">{r2B}</span>
              </div>
              <input
                type="range"
                min={1}
                max={16}
                value={r2B}
                onChange={(e) => setR2B(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setR2A((r1A / g1) * 2);
                  setR2B((r1B / g1) * 2);
                }}
                className="w-full py-2 px-4 text-xs font-semibold text-sky-800 bg-sky-100/80 hover:bg-sky-200/70 rounded-lg transition-colors whitespace-nowrap"
              >
                Buat Rasio Kedua Menjadi Senilai Otomatis
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ============================================================================
 * 03. SIMULASI RASIO SATUAN (TWO-ZONE SANDBOX)
 * ============================================================================ */
const RasioSatuanSandbox: React.FC = () => {
  const [qtyA, setQtyA] = useState(4);
  const [priceA, setPriceA] = useState(18000);
  const [qtyB, setQtyB] = useState(6);
  const [priceB, setPriceB] = useState(24000);

  const unitPriceA = Math.round(priceA / qtyA);
  const unitPriceB = Math.round(priceB / qtyB);
  const maxUnitPrice = Math.max(unitPriceA, unitPriceB, 1);

  const cheaper =
    unitPriceA < unitPriceB ? 'A' : unitPriceB < unitPriceA ? 'B' : 'SAMA';
  const diffPerUnit = Math.abs(unitPriceA - unitPriceB);

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4 bg-slate-50/60">
        <div>
          <div className="text-xs text-slate-500">
            Laboratorium Virtual · Bab 03 · Rasio Satuan
          </div>
          <h3 className="text-lg font-semibold text-slate-900">
            Simulasi Belanja Cerdas Koperasi SDN Karangpete (Harga per 1 Satuan)
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setQtyA(4);
              setPriceA(18000);
              setQtyB(6);
              setPriceB(24000);
            }}
            className="px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 rounded-md hover:bg-slate-100 whitespace-nowrap"
          >
            Contoh Buku Tulis
          </button>
          <button
            type="button"
            onClick={() => {
              setQtyA(3);
              setPriceA(15000);
              setQtyB(5);
              setPriceB(22500);
            }}
            className="px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 rounded-md hover:bg-slate-100 whitespace-nowrap"
          >
            Contoh Susu Kotak
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* LEFT STAGE */}
        <div className="lg:col-span-7 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 space-y-6">
          {/* Two Package Cards Comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Paket A */}
            <div
              className={`p-4 rounded-lg border ${
                cheaper === 'A'
                  ? 'bg-emerald-50/60 border-emerald-300'
                  : 'bg-[#F8FAFC] border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span className="font-semibold text-slate-800">PAKET A</span>
                {cheaper === 'A' && (
                  <span className="font-mono font-semibold text-emerald-700">
                    ● LEBIH HEMAT
                  </span>
                )}
              </div>
              <div className="text-sm text-slate-700 tabular-nums">
                {qtyA} buku = <strong>Rp{priceA.toLocaleString('id-ID')}</strong>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-200/80">
                <div className="text-xs text-slate-500">Rasio Satuan (Harga 1 Buku):</div>
                <div className="text-2xl font-mono font-semibold text-sky-800 tabular-nums mt-0.5">
                  Rp{unitPriceA.toLocaleString('id-ID')}
                  <span className="text-xs font-normal text-slate-500"> / buku</span>
                </div>
              </div>
            </div>

            {/* Paket B */}
            <div
              className={`p-4 rounded-lg border ${
                cheaper === 'B'
                  ? 'bg-emerald-50/60 border-emerald-300'
                  : 'bg-[#F8FAFC] border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span className="font-semibold text-slate-800">PAKET B</span>
                {cheaper === 'B' && (
                  <span className="font-mono font-semibold text-emerald-700">
                    ● LEBIH HEMAT
                  </span>
                )}
              </div>
              <div className="text-sm text-slate-700 tabular-nums">
                {qtyB} buku = <strong>Rp{priceB.toLocaleString('id-ID')}</strong>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-200/80">
                <div className="text-xs text-slate-500">Rasio Satuan (Harga 1 Buku):</div>
                <div className="text-2xl font-mono font-semibold text-amber-800 tabular-nums mt-0.5">
                  Rp{unitPriceB.toLocaleString('id-ID')}
                  <span className="text-xs font-normal text-slate-500"> / buku</span>
                </div>
              </div>
            </div>
          </div>

          {/* Horizontal Bar Chart of Unit Rate */}
          <div className="space-y-3 pt-2">
            <div className="text-xs font-semibold text-slate-700">
              Grafik Perbandingan Harga per 1 Buku (Semakin pendek batang = semakin murah)
            </div>
            <div>
              <div className="flex justify-between text-xs text-slate-600 mb-1 tabular-nums">
                <span>Paket A (Rp{priceA.toLocaleString('id-ID')} ÷ {qtyA})</span>
                <span className="font-mono font-semibold">
                  Rp{unitPriceA.toLocaleString('id-ID')}/buku
                </span>
              </div>
              <div className="w-full bg-slate-100 h-6 rounded-md overflow-hidden border border-slate-200">
                <div
                  style={{ width: `${Math.max(15, (unitPriceA / maxUnitPrice) * 100)}%` }}
                  className="bg-sky-600 h-full transition-all duration-150"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-600 mb-1 tabular-nums">
                <span>Paket B (Rp{priceB.toLocaleString('id-ID')} ÷ {qtyB})</span>
                <span className="font-mono font-semibold">
                  Rp{unitPriceB.toLocaleString('id-ID')}/buku
                </span>
              </div>
              <div className="w-full bg-slate-100 h-6 rounded-md overflow-hidden border border-slate-200">
                <div
                  style={{ width: `${Math.max(15, (unitPriceB / maxUnitPrice) * 100)}%` }}
                  className="bg-amber-600 h-full transition-all duration-150"
                />
              </div>
            </div>
          </div>

          {/* Decision Callout */}
          <div className="p-4 bg-[#F8FAFC] border border-slate-200 rounded-lg flex items-start gap-3">
            <ShoppingBag className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-700 leading-relaxed">
              {cheaper === 'SAMA' ? (
                <span>
                  <strong>Kesimpulan Rasio Satuan:</strong> Kedua paket memiliki harga satuan yang{' '}
                  <strong>SAMA PERSIS</strong> yaitu{' '}
                  <span className="font-mono font-semibold">
                    Rp{unitPriceA.toLocaleString('id-ID')}
                  </span>{' '}
                  per 1 buku.
                </span>
              ) : (
                <span>
                  <strong>Kesimpulan Rasio Satuan:</strong> Memilih{' '}
                  <strong>Paket {cheaper}</strong> lebih hemat{' '}
                  <span className="font-mono font-semibold text-emerald-700">
                    Rp{diffPerUnit.toLocaleString('id-ID')}
                  </span>{' '}
                  untuk setiap 1 buku yang dibeli!
                </span>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT CONTROL DECK */}
        <div className="lg:col-span-5 p-6 bg-slate-50/40 space-y-5">
          <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-sky-700" />
            Atur Jumlah & Harga Paket
          </h4>

          {/* Paket A Controls */}
          <div className="space-y-3 pb-4 border-b border-slate-200">
            <div className="text-xs font-semibold text-sky-800">Pengaturan Paket A</div>
            <div>
              <div className="flex justify-between text-xs text-slate-700 mb-1">
                <label htmlFor="qty-a">Jumlah Buku Paket A</label>
                <span className="font-mono font-semibold tabular-nums">{qtyA} buku</span>
              </div>
              <input
                id="qty-a"
                type="range"
                min={1}
                max={10}
                value={qtyA}
                onChange={(e) => setQtyA(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs text-slate-700 mb-1">
                <label htmlFor="price-a">Total Harga Paket A</label>
                <span className="font-mono font-semibold tabular-nums">
                  Rp{priceA.toLocaleString('id-ID')}
                </span>
              </div>
              <input
                id="price-a"
                type="range"
                min={5000}
                max={50000}
                step={500}
                value={priceA}
                onChange={(e) => setPriceA(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Paket B Controls */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-amber-800">Pengaturan Paket B</div>
            <div>
              <div className="flex justify-between text-xs text-slate-700 mb-1">
                <label htmlFor="qty-b">Jumlah Buku Paket B</label>
                <span className="font-mono font-semibold tabular-nums">{qtyB} buku</span>
              </div>
              <input
                id="qty-b"
                type="range"
                min={1}
                max={10}
                value={qtyB}
                onChange={(e) => setQtyB(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs text-slate-700 mb-1">
                <label htmlFor="price-b">Total Harga Paket B</label>
                <span className="font-mono font-semibold tabular-nums">
                  Rp{priceB.toLocaleString('id-ID')}
                </span>
              </div>
              <input
                id="price-b"
                type="range"
                min={5000}
                max={50000}
                step={500}
                value={priceB}
                onChange={(e) => setPriceB(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * 04. SIMULASI PENERAPAN RASIO — MODEL BATANG & SKALA (TWO-ZONE SANDBOX)
 * ============================================================================ */
const PenerapanRasioSandbox: React.FC = () => {
  const [scenario, setScenario] = useState<'jumlah' | 'selisih' | 'skala'>('jumlah');

  // State for Bar Model (Jumlah / Selisih)
  const [unitsA, setUnitsA] = useState(3);
  const [unitsB, setUnitsB] = useState(5);
  const [valuePerUnit, setValuePerUnit] = useState(6);

  // State for Skala Denah SDN Karangpete
  const [mapCm, setMapCm] = useState(8);
  const [scaleDenominator, setScaleDenominator] = useState(200);

  const totalUnits = unitsA + unitsB;
  const diffUnits = Math.abs(unitsA - unitsB) || 1;
  const actualA = unitsA * valuePerUnit;
  const actualB = unitsB * valuePerUnit;
  const totalValue = totalUnits * valuePerUnit;
  const diffValue = Math.abs(actualA - actualB);

  const realCm = mapCm * scaleDenominator;
  const realMeters = realCm / 100;

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4 bg-slate-50/60">
        <div>
          <div className="text-xs text-slate-500">
            Laboratorium Virtual · Bab 04 · Penerapan Rasio
          </div>
          <h3 className="text-lg font-semibold text-slate-900">
            Simulasi Model Batang (Kotak Unit) & Skala Denah Sekolah
          </h3>
        </div>
        <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg">
          <button
            type="button"
            onClick={() => setScenario('jumlah')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              scenario === 'jumlah'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Diketahui Jumlah
          </button>
          <button
            type="button"
            onClick={() => {
              setScenario('selisih');
              if (unitsA === unitsB) setUnitsB(unitsA + 2);
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              scenario === 'selisih'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Diketahui Selisih
          </button>
          <button
            type="button"
            onClick={() => setScenario('skala')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              scenario === 'skala'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Skala Denah Sekolah
          </button>
        </div>
      </div>

      {scenario !== 'skala' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* LEFT STAGE: Dynamic Bar Model (Kotak Unit) */}
          <div className="lg:col-span-7 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 space-y-6">
            {/* Word Problem Box */}
            <div className="p-4 bg-[#F8FAFC] border border-slate-200 rounded-lg">
              <div className="text-xs font-semibold text-sky-800 mb-1">
                Soal Cerita Kontekstual Kelas 6 SDN Karangpete:
              </div>
              {scenario === 'jumlah' ? (
                <p className="text-sm text-slate-800 leading-relaxed">
                  Rasio banyak kelereng <strong>Budi</strong> dan <strong>Andi</strong> adalah{' '}
                  <span className="font-mono font-semibold text-sky-700">
                    {unitsA} : {unitsB}
                  </span>
                  . Jika <strong>JUMLAH</strong> kelereng mereka berdua adalah{' '}
                  <span className="font-mono font-semibold text-emerald-700">
                    {totalValue} butir
                  </span>
                  , berapakah banyak kelereng masing-masing?
                </p>
              ) : (
                <p className="text-sm text-slate-800 leading-relaxed">
                  Rasio banyak buku cerita <strong>Budi</strong> dan <strong>Andi</strong> adalah{' '}
                  <span className="font-mono font-semibold text-sky-700">
                    {unitsA} : {unitsB}
                  </span>
                  . Jika <strong>SELISIH</strong> buku cerita mereka adalah{' '}
                  <span className="font-mono font-semibold text-amber-700">
                    {diffValue} buku
                  </span>
                  , berapakah banyak buku cerita masing-masing?
                </p>
              )}
            </div>

            {/* Visual Unit Boxes (Model Batang) */}
            <div className="space-y-4">
              <div className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-sky-700" />
                <span>Diagram Model Batang (1 Kotak Unit bernilai {valuePerUnit}):</span>
              </div>

              {/* Row Budi (A) */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-700 font-medium tabular-nums">
                  <span>Budi ({unitsA} kotak unit)</span>
                  <span className="font-mono font-semibold text-sky-700">
                    {unitsA} × {valuePerUnit} = {actualA}
                  </span>
                </div>
                <div className="flex gap-1.5">
                  {Array.from({ length: unitsA }).map((_, idx) => (
                    <div
                      key={idx}
                      className="h-10 flex-1 max-w-[64px] rounded-md bg-sky-600 text-white font-mono text-xs font-semibold flex items-center justify-center shadow-2xs tabular-nums"
                    >
                      {valuePerUnit}
                    </div>
                  ))}
                </div>
              </div>

              {/* Row Andi (B) */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-700 font-medium tabular-nums">
                  <span>Andi ({unitsB} kotak unit)</span>
                  <span className="font-mono font-semibold text-amber-700">
                    {unitsB} × {valuePerUnit} = {actualB}
                  </span>
                </div>
                <div className="flex gap-1.5">
                  {Array.from({ length: unitsB }).map((_, idx) => {
                    const isDiffBox =
                      scenario === 'selisih' && idx >= Math.min(unitsA, unitsB);
                    return (
                      <div
                        key={idx}
                        className={`h-10 flex-1 max-w-[64px] rounded-md text-white font-mono text-xs font-semibold flex items-center justify-center shadow-2xs tabular-nums ${
                          isDiffBox
                            ? 'bg-emerald-600 ring-2 ring-emerald-300'
                            : 'bg-amber-600'
                        }`}
                      >
                        {valuePerUnit}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 3-Step Textbook Solution */}
            <div className="p-4 bg-[#F8FAFC] border border-slate-200 rounded-lg space-y-2 text-xs">
              <div className="font-semibold text-slate-900">
                Langkah Penyelesaian Metode Kotak Unit:
              </div>
              {scenario === 'jumlah' ? (
                <ol className="list-decimal list-inside space-y-1 text-slate-700 font-mono tabular-nums">
                  <li>
                    Jumlah kotak unit = {unitsA} + {unitsB} = <strong>{totalUnits} kotak</strong>
                  </li>
                  <li>
                    Nilai 1 kotak unit = {totalValue} ÷ {totalUnits} ={' '}
                    <strong className="text-emerald-700">{valuePerUnit}</strong>
                  </li>
                  <li>
                    Milik Budi = {unitsA} × {valuePerUnit} = <strong>{actualA}</strong> &nbsp;|&nbsp;
                    Milik Andi = {unitsB} × {valuePerUnit} = <strong>{actualB}</strong>
                  </li>
                </ol>
              ) : (
                <ol className="list-decimal list-inside space-y-1 text-slate-700 font-mono tabular-nums">
                  <li>
                    Selisih kotak unit = |{unitsA} − {unitsB}| ={' '}
                    <strong>{diffUnits} kotak</strong>
                  </li>
                  <li>
                    Nilai 1 kotak unit = {diffValue} ÷ {diffUnits} ={' '}
                    <strong className="text-emerald-700">{valuePerUnit}</strong>
                  </li>
                  <li>
                    Milik Budi = {unitsA} × {valuePerUnit} = <strong>{actualA}</strong> &nbsp;|&nbsp;
                    Milik Andi = {unitsB} × {valuePerUnit} = <strong>{actualB}</strong>
                  </li>
                </ol>
              )}
            </div>
          </div>

          {/* RIGHT CONTROL DECK */}
          <div className="lg:col-span-5 p-6 bg-slate-50/40 space-y-5">
            <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-sky-700" />
              Atur Kotak Unit & Nilai Satuan
            </h4>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <label htmlFor="units-a">Banyak Kotak Rasio Budi (A)</label>
                <span className="font-mono font-semibold text-sky-700 tabular-nums">
                  {unitsA} kotak
                </span>
              </div>
              <input
                id="units-a"
                type="range"
                min={1}
                max={8}
                value={unitsA}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setUnitsA(val);
                  if (scenario === 'selisih' && val === unitsB) {
                    setUnitsB(val < 8 ? val + 1 : val - 1);
                  }
                }}
                className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <label htmlFor="units-b">Banyak Kotak Rasio Andi (B)</label>
                <span className="font-mono font-semibold text-amber-700 tabular-nums">
                  {unitsB} kotak
                </span>
              </div>
              <input
                id="units-b"
                type="range"
                min={1}
                max={8}
                value={unitsB}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (scenario === 'selisih' && val === unitsA) return;
                  setUnitsB(val);
                }}
                className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>

            <div className="pt-2 border-t border-slate-200">
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <label htmlFor="val-per-unit">Isi / Nilai per 1 Kotak Unit</label>
                <span className="font-mono font-semibold text-emerald-700 tabular-nums">
                  {valuePerUnit} per kotak
                </span>
              </div>
              <input
                id="val-per-unit"
                type="range"
                min={2}
                max={20}
                value={valuePerUnit}
                onChange={(e) => setValuePerUnit(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>
      ) : (
        /* SKALA DENAH SDN KARANGPETE */
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-7 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 space-y-6">
            <div className="p-4 bg-[#F8FAFC] border border-slate-200 rounded-lg flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs text-slate-500">Skala Denah Lapangan SDN Karangpete</div>
                <div className="text-2xl font-mono font-semibold text-slate-900 tabular-nums mt-0.5">
                  1 : {scaleDenominator}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-500">Ukuran Sebenarnya di Lapangan</div>
                <div className="text-2xl font-mono font-semibold text-emerald-700 tabular-nums mt-0.5">
                  {realMeters} meter
                </div>
              </div>
            </div>

            {/* Interactive Blueprint Canvas */}
            <div className="p-6 bg-slate-900 text-white rounded-lg relative overflow-hidden">
              <div className="flex items-center justify-between text-xs text-sky-300 font-mono mb-4">
                <span>DENAH LAPANGAN UPACARA SDN KARANGPETE</span>
                <span>SKALA 1 : {scaleDenominator}</span>
              </div>

              <div className="my-4 flex flex-col items-center justify-center">
                <div
                  style={{ width: `${Math.min(100, Math.max(30, mapCm * 6.5))}%` }}
                  className="h-24 border-2 border-sky-400 bg-sky-950/80 rounded-md flex flex-col items-center justify-center transition-all duration-150 px-3"
                >
                  <span className="text-xs font-mono text-sky-200 tabular-nums">
                    Ukuran Gambar Denah: {mapCm} cm
                  </span>
                  <span className="text-sm font-mono font-semibold text-white tabular-nums mt-1">
                    Sebenarnya: {realCm.toLocaleString('id-ID')} cm = {realMeters} m
                  </span>
                </div>
              </div>

              <div className="text-[11px] font-mono text-slate-300 flex justify-between pt-2 border-t border-slate-800">
                <span>1 cm pada denah = {scaleDenominator} cm sebenarnya</span>
                <span>1 meter = 100 cm</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 bg-slate-50/40 space-y-5">
            <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <Map className="w-4 h-4 text-sky-700" />
              Pengaturan Ukuran Denah & Skala
            </h4>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <label htmlFor="map-cm">Panjang pada Denah Gambar</label>
                <span className="font-mono font-semibold text-sky-700 tabular-nums">
                  {mapCm} cm
                </span>
              </div>
              <input
                id="map-cm"
                type="range"
                min={2}
                max={15}
                value={mapCm}
                onChange={(e) => setMapCm(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <label htmlFor="scale-denom">Angka Skala Denah (1 : n)</label>
                <span className="font-mono font-semibold text-emerald-700 tabular-nums">
                  1 : {scaleDenominator}
                </span>
              </div>
              <input
                id="scale-denom"
                type="range"
                min={100}
                max={500}
                step={50}
                value={scaleDenominator}
                onChange={(e) => setScaleDenominator(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 space-y-1.5">
              <div className="font-semibold text-slate-900">Cara Menghitung Ukuran Sebenarnya:</div>
              <div className="font-mono tabular-nums">
                1. Panjang sebenarnya = {mapCm} cm × {scaleDenominator} ={' '}
                <strong>{realCm.toLocaleString('id-ID')} cm</strong>
              </div>
              <div className="font-mono tabular-nums">
                2. Ubah ke meter (÷ 100) = {realCm.toLocaleString('id-ID')} ÷ 100 ={' '}
                <strong className="text-emerald-700">{realMeters} meter</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
