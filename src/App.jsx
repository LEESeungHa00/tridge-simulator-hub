import React, { useState, useEffect, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import {
  Calculator, DollarSign, CheckCircle, Briefcase,
  Activity, ArrowRight, Settings, BarChart2,
  Sparkles, MessageSquare, FileText, Loader2, FileSpreadsheet,
  TrendingDown, AlertCircle, Send,
  TrendingUp, Calendar, Anchor, Zap, ChevronDown, ChevronUp,
  Plane, Building2, ShieldCheck, Globe, Users, Settings2,
  AlertTriangle, Scale, UserCog, Landmark, Printer, RefreshCcw,
  CheckCircle2, Copy, Download, ArrowLeft, Lock
} from 'lucide-react';

// ============================================================
// PASSWORD GATE
// ============================================================
const CORRECT_PASSWORD = 'tptridge@20260318';

const PasswordGate = ({ onSuccess }) => {
  const [input, setInput] = useState('');
  const [shake, setShake] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (input === CORRECT_PASSWORD) {
      sessionStorage.setItem('calc_auth', 'true');
      onSuccess();
    } else {
      setShake(true);
      setError(true);
      setInput('');
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f172a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '"DM Sans", "Pretendard", sans-serif',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes shake {
          0%,100%{transform:translateX(0)}
          20%{transform:translateX(-8px)}
          40%{transform:translateX(8px)}
          60%{transform:translateX(-6px)}
          80%{transform:translateX(6px)}
        }
        @keyframes fadeIn {
          from{opacity:0;transform:translateY(16px)}
          to{opacity:1;transform:translateY(0)}
        }
        .pw-card { animation: fadeIn 0.4s ease; }
        .pw-shake { animation: shake 0.45s ease; }
        .pw-input:focus { outline: none; border-color: #6366f1 !important; box-shadow: 0 0 0 3px rgba(99,102,241,0.2); }
        .pw-btn:hover { background: #4f46e5 !important; }
        .pw-btn:active { transform: scale(0.98); }
      `}</style>
      <div className={`pw-card ${shake ? 'pw-shake' : ''}`} style={{
        background: '#1e293b',
        border: '1px solid #334155',
        borderRadius: 20,
        padding: '48px 40px',
        width: '100%',
        maxWidth: 380,
        boxSizing: 'border-box',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 56, height: 56,
            background: 'rgba(99,102,241,0.15)',
            border: '1px solid rgba(99,102,241,0.3)',
            borderRadius: 16,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
          }}>
            <Lock size={24} color="#818cf8" />
          </div>
          <h1 style={{ color: '#f1f5f9', fontSize: 20, fontWeight: 700, margin: '0 0 6px' }}>
            Tridge Simulator Hub
          </h1>
          <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>
            담당자 전용 — 비밀번호를 입력해주세요
          </p>
        </div>

        <div style={{ marginBottom: 12 }}>
          <input
            type="password"
            className="pw-input"
            value={input}
            onChange={e => { setInput(e.target.value); setError(false); }}
            onKeyDown={handleKey}
            placeholder="비밀번호"
            autoFocus
            style={{
              width: '100%',
              padding: '12px 14px',
              background: '#0f172a',
              border: `1px solid ${error ? '#ef4444' : '#334155'}`,
              borderRadius: 10,
              color: '#f1f5f9',
              fontSize: 14,
              boxSizing: 'border-box',
              transition: 'border-color 0.2s',
            }}
          />
          {error && (
            <p style={{ color: '#f87171', fontSize: 12, marginTop: 6 }}>
              비밀번호가 올바르지 않습니다.
            </p>
          )}
        </div>

        <button
          className="pw-btn"
          onClick={handleSubmit}
          style={{
            width: '100%',
            padding: '12px',
            background: '#6366f1',
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background 0.2s, transform 0.1s',
          }}
        >
          입장하기
        </button>
      </div>
    </div>
  );
};

// ============================================================
// HOME SCREEN
// ============================================================
const HomeScreen = ({ onSelect }) => {
  const cards = [
    {
      id: 'vbm',
      emoji: '💼',
      title: 'VBM 과금 계산기',
      subtitle: 'Track A/B 선택 → 착수비·성과보수 페이백 시뮬레이션',
      tags: ['Track A/B', '성과 페이백', 'KRW'],
      accent: '#10b981',
      bg: 'rgba(16,185,129,0.08)',
      border: 'rgba(16,185,129,0.25)',
    },
    {
      id: 'vsm',
      emoji: '✈️',
      title: 'VSM 출장비 분석기',
      subtitle: '직접 출장(DIY) vs VSM 위탁 — 리스크 비용까지 포함한 실질 비교',
      tags: ['DIY vs VSM', '리스크 비용', 'KRW+USD'],
      accent: '#f59e0b',
      bg: 'rgba(245,158,11,0.08)',
      border: 'rgba(245,158,11,0.25)',
    },
    {
      id: 'fee',
      emoji: '📊',
      title: '성공보수 분석기',
      subtitle: 'A~E 모델 비교 · Z-Score 이격률 분석 · AI 제안서 자동 생성',
      tags: ['A~E 모델', 'Z-Score', 'AI 제안서'],
      accent: '#8b5cf6',
      bg: 'rgba(139,92,246,0.08)',
      border: 'rgba(139,92,246,0.25)',
    },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f172a',
      fontFamily: '"DM Sans", "Pretendard", sans-serif',
      padding: '40px 16px',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes fadeUp {
          from{opacity:0;transform:translateY(20px)}
          to{opacity:1;transform:translateY(0)}
        }
        .home-card {
          animation: fadeUp 0.4s ease both;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .home-card:hover { transform: translateY(-4px); }
        .home-card:active { transform: scale(0.98); }
        .tag-pill {
          display: inline-block;
          padding: 3px 10px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 600;
          background: rgba(255,255,255,0.07);
          color: #94a3b8;
          border: 1px solid rgba(255,255,255,0.08);
        }
      `}</style>

      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40, animation: 'fadeUp 0.35s ease' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(99,102,241,0.12)',
            border: '1px solid rgba(99,102,241,0.2)',
            borderRadius: 100, padding: '6px 14px',
            fontSize: 12, fontWeight: 600, color: '#818cf8',
            marginBottom: 16,
          }}>
            <Sparkles size={13} /> Tridge Internal Tools
          </div>
          <h1 style={{ color: '#f1f5f9', fontSize: 28, fontWeight: 700, margin: '0 0 8px', letterSpacing: '-0.5px' }}>
            Simulator Hub
          </h1>
          <p style={{ color: '#64748b', fontSize: 14, margin: 0 }}>
            사용할 계산기를 선택하세요
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {cards.map((c, i) => (
            <div
              key={c.id}
              className="home-card"
              style={{
                animationDelay: `${i * 0.07}s`,
                background: '#1e293b',
                border: `1px solid ${c.border}`,
                borderRadius: 16,
                padding: '22px 24px',
              }}
              onClick={() => onSelect(c.id)}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <span style={{ fontSize: 22 }}>{c.emoji}</span>
                    <span style={{ color: '#f1f5f9', fontSize: 16, fontWeight: 700 }}>{c.title}</span>
                  </div>
                  <p style={{ color: '#64748b', fontSize: 13, margin: '0 0 12px', lineHeight: 1.5 }}>
                    {c.subtitle}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {c.tags.map(t => (
                      <span key={t} className="tag-pill">{t}</span>
                    ))}
                  </div>
                </div>
                <div style={{
                  width: 32, height: 32, borderRadius: 10, flexShrink: 0,
                  background: c.bg,
                  border: `1px solid ${c.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <ArrowRight size={15} color={c.accent} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', color: '#1e293b', fontSize: 12, marginTop: 32 }}>
          Internal Use Only · Tridge © 2026
        </p>
      </div>
    </div>
  );
};

// ============================================================
// BACK BUTTON (shared)
// ============================================================
const BackButton = ({ onBack, label = '계산기 목록으로' }) => (
  <button
    onClick={onBack}
    style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      background: 'transparent',
      border: '1px solid #334155',
      color: '#94a3b8',
      borderRadius: 8, padding: '6px 14px',
      fontSize: 13, fontWeight: 500, cursor: 'pointer',
      transition: 'color 0.15s, border-color 0.15s',
      marginBottom: 16,
    }}
    onMouseEnter={e => { e.currentTarget.style.color = '#f1f5f9'; e.currentTarget.style.borderColor = '#64748b'; }}
    onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = '#334155'; }}
  >
    <ArrowLeft size={14} /> {label}
  </button>
);

// ============================================================
// CALCULATOR 1: VBM 과금 계산기
// ============================================================
const CONFIG = {
  vat: {
    rate: 0.10,
    apply_to: { data_fee: true, onboarding_fee: true, meeting_fee: true, success_fee: true }
  },
  tracks: {
    A: {
      name: "Track A: 기본 보장형 (트릿지 추천)",
      desc: "초기 비용을 정가로 내는 대신, 파격적인 성공 보수 할인과 350만 원 상당의 데이터 플랜이 무상 제공됩니다.",
      badge: "Best Value"
    },
    B: {
      name: "Track B: 성과 공유형",
      desc: "초기 비용 부담을 1/3로 확 낮춥니다. 대신 딜 성사 시 성공 보수가 높게 책정되며 무료 혜택은 없습니다.",
      badge: "Low Risk"
    }
  },
  tiers: {
    T1: {
      name: "Tier 1 (중견/대기업 VBM)",
      fees: {
        A: { onboarding_krw: 1500000, meeting_krw: 2500000, fixed_success_krw: 8000000 },
        B: { onboarding_krw: 500000, meeting_krw: 1000000, fixed_success_krw: 18000000 }
      }
    },
    T2: {
      name: "Tier 2 (일반 VBM)",
      fees: {
        A: { onboarding_krw: 1000000, meeting_krw: 1500000, fixed_success_krw: 5000000 },
        B: { onboarding_krw: 300000, meeting_krw: 500000, fixed_success_krw: 10000000 }
      }
    }
  },
  data_plans: {
    NONE: {
      name: "플랜 없음",
      annual_fee_krw: 0,
      benefits: { waive_onboarding: false, service_credit_krw: 0, service_credit_pct_of_data_fee: 0.0, deposit_credit_krw: 0 }
    },
    MATCH_ACCESS: {
      name: "MATCH_ACCESS (150만)",
      annual_fee_krw: 1500000,
      benefits: { waive_onboarding: false, service_credit_krw: 0, service_credit_pct_of_data_fee: 0.0, deposit_credit_krw: 1500000, deposit_credit_requires_eligibility: true }
    },
    DATA_STARTER: {
      name: "DATA_STARTER (350만)",
      annual_fee_krw: 3500000,
      benefits: { waive_onboarding: true, service_credit_krw: 500000, service_credit_pct_of_data_fee: 0.0, deposit_credit_krw: 0 }
    },
    FULL_DATA: {
      name: "FULL_DATA (600만)",
      annual_fee_krw: 6000000,
      benefits: { waive_onboarding: true, service_credit_krw: 0, service_credit_pct_of_data_fee: 0.10, deposit_credit_krw: 0 }
    }
  },
  addOns: {
    csv_download_1000_krw: 1740000,
    extra_account_krw: 1450000
  }
};

const formatKRW = (num) => new Intl.NumberFormat('ko-KR').format(num) + '원';

const VBMCalculator = ({ onBack }) => {
  const [selectedTrack, setSelectedTrack] = useState('A');
  const [buyerTier, setBuyerTier] = useState('T1');
  const [numMeetings, setNumMeetings] = useState(1);
  const [dealWon, setDealWon] = useState(true);
  const [dataPlan, setDataPlan] = useState('NONE');
  const [isExistingDataCustomer, setIsExistingDataCustomer] = useState(false);
  const [creditEligible, setCreditEligible] = useState(true);
  const [csvUnits, setCsvUnits] = useState(0);
  const [extraAccounts, setExtraAccounts] = useState(0);
  const [invoiceVat, setInvoiceVat] = useState(true);

  const results = useMemo(() => {
    const tier = CONFIG.tiers[buyerTier];
    const trackFees = tier.fees[selectedTrack];
    const plan = CONFIG.data_plans[dataPlan];

    const baseOnboarding = trackFees.onboarding_krw;
    const baseMeeting = trackFees.meeting_krw * numMeetings;
    const onboardingAfterWaive = (plan.benefits.waive_onboarding && selectedTrack === 'A') ? 0 : baseOnboarding;

    let depositCredit = plan.benefits.deposit_credit_krw || 0;
    if (plan.benefits.deposit_credit_requires_eligibility && !creditEligible) depositCredit = 0;

    const pctCredit = (plan.benefits.service_credit_pct_of_data_fee || 0) * (plan.annual_fee_krw || 0);
    const fixedCredit = plan.benefits.service_credit_krw || 0;

    let totalCredit = depositCredit + pctCredit + fixedCredit;
    if (selectedTrack === 'B') totalCredit = 0;

    const serviceNet = onboardingAfterWaive + baseMeeting;
    const creditApplied = Math.min(totalCredit, serviceNet);
    const servicePayable = serviceNet - creditApplied;
    const creditRemaining = totalCredit - creditApplied;

    let baseDataFee = isExistingDataCustomer ? 0 : (plan.annual_fee_krw || 0);
    let trackADataDiscount = 0;

    if (selectedTrack === 'A' && !isExistingDataCustomer && dataPlan !== 'NONE') {
      trackADataDiscount = Math.min(baseDataFee, 3500000);
      baseDataFee -= trackADataDiscount;
    }

    let addonFeeCsv = 0;
    let addonFeeAccount = 0;
    if (dataPlan !== 'NONE') {
      addonFeeCsv = csvUnits * CONFIG.addOns.csv_download_1000_krw;
      addonFeeAccount = extraAccounts * CONFIG.addOns.extra_account_krw;
    }
    const dataFeePayable = baseDataFee + addonFeeCsv + addonFeeAccount;

    let successFee = 0;
    let rawSuccessFee = 0;
    let retainerRebate = 0;

    if (dealWon) {
      rawSuccessFee = trackFees.fixed_success_krw;
      retainerRebate = Math.min(servicePayable, rawSuccessFee);
      successFee = rawSuccessFee - retainerRebate;
    }

    let initialVatBase = 0;
    let successVatBase = 0;

    if (CONFIG.vat.apply_to.data_fee) initialVatBase += dataFeePayable;
    if (CONFIG.vat.apply_to.onboarding_fee || CONFIG.vat.apply_to.meeting_fee) initialVatBase += servicePayable;
    if (CONFIG.vat.apply_to.success_fee) successVatBase += successFee;

    const initialVatAmount = invoiceVat ? initialVatBase * CONFIG.vat.rate : 0;
    const successVatAmount = invoiceVat ? successVatBase * CONFIG.vat.rate : 0;

    const totalInitialPayable = dataFeePayable + servicePayable + initialVatAmount;
    const totalSuccessPayable = successFee + successVatAmount;

    return {
      baseOnboarding, baseMeeting,
      onboardingWaivedAmount: baseOnboarding - onboardingAfterWaive,
      totalCredit, creditApplied, creditRemaining, trackADataDiscount,
      servicePayable, rawSuccessFee, retainerRebate, successFee,
      dataFeePayable, baseDataFee, addonFeeCsv, addonFeeAccount,
      initialVatAmount, successVatAmount, totalInitialPayable, totalSuccessPayable,
      tier, trackFees, plan
    };
  }, [selectedTrack, buyerTier, numMeetings, dealWon, dataPlan, isExistingDataCustomer, creditEligible, csvUnits, extraAccounts, invoiceVat]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <BackButton onBack={onBack} />

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white">
            <h1 className="text-xl font-bold flex items-center gap-2">
              <Briefcase size={22} /> VBM 과금 계산기
            </h1>
            <p className="text-emerald-100 text-sm mt-1">Track A/B 선택 → 착수비·성과보수 페이백 시뮬레이션</p>
          </div>

          <div className="p-6 space-y-6">
            {/* Track Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['A', 'B'].map(track => (
                <button
                  key={track}
                  onClick={() => setSelectedTrack(track)}
                  className={`p-4 rounded-xl text-left border-2 transition-all ${selectedTrack === track ? (track === 'A' ? 'border-blue-500 bg-blue-50' : 'border-indigo-500 bg-indigo-50') : 'border-gray-200 bg-white hover:bg-gray-50'}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className={`font-bold text-sm ${selectedTrack === track ? (track === 'A' ? 'text-blue-800' : 'text-indigo-800') : 'text-gray-700'}`}>
                      {CONFIG.tracks[track].name}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${track === 'A' ? 'bg-blue-100 text-blue-700' : 'bg-indigo-100 text-indigo-700'}`}>
                      {CONFIG.tracks[track].badge}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 leading-snug">{CONFIG.tracks[track].desc}</p>
                </button>
              ))}
            </div>

            {/* Settings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">바이어 티어</label>
                  <select className="w-full p-2.5 border rounded-lg text-sm bg-white" value={buyerTier} onChange={e => setBuyerTier(e.target.value)}>
                    {Object.entries(CONFIG.tiers).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">미팅 횟수</label>
                  <input type="number" min={1} value={numMeetings} onChange={e => setNumMeetings(Number(e.target.value))} className="w-full p-2.5 border rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">데이터 플랜</label>
                  <select className="w-full p-2.5 border rounded-lg text-sm bg-white" value={dataPlan} onChange={e => setDataPlan(e.target.value)}>
                    {Object.entries(CONFIG.data_plans).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-3">
                  {[
                    { label: '성공 시뮬레이션 (딜 체결)', val: dealWon, set: setDealWon },
                    { label: '기존 데이터 고객', val: isExistingDataCustomer, set: setIsExistingDataCustomer },
                    { label: '크레딧 사용 자격', val: creditEligible, set: setCreditEligible },
                    { label: 'VAT 포함 (10%)', val: invoiceVat, set: setInvoiceVat },
                  ].map(item => (
                    <label key={item.label} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                      <span className="text-sm font-medium text-gray-700">{item.label}</span>
                      <input type="checkbox" checked={item.val} onChange={e => item.set(e.target.checked)} className="w-4 h-4 accent-blue-600" />
                    </label>
                  ))}
                </div>
                {dataPlan !== 'NONE' && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">CSV 추가 단위</label>
                      <input type="number" min={0} value={csvUnits} onChange={e => setCsvUnits(Number(e.target.value))} className="w-full p-2.5 border rounded-lg text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">추가 계정</label>
                      <input type="number" min={0} value={extraAccounts} onChange={e => setExtraAccounts(Number(e.target.value))} className="w-full p-2.5 border rounded-lg text-sm" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-6 rounded-xl text-white ${selectedTrack === 'A' ? 'bg-blue-600' : 'bg-indigo-700'}`}>
                <h2 className="text-sm font-medium text-blue-100 mb-1">① 착수 시점 결제액 (Today)</h2>
                <div className="text-3xl font-bold tracking-tight">{formatKRW(results.totalInitialPayable)}</div>
                <div className="mt-3 text-xs text-blue-50 opacity-90 border-t border-blue-400 pt-2">
                  초기비용은 딜 성공 시 성과보수에서 전액 차감(환급)되어 사실상 예치금으로 작용합니다.
                </div>
              </div>
              <div className={`p-6 rounded-xl border-2 ${dealWon ? 'bg-green-50 border-green-500' : 'bg-gray-50 border-gray-200 text-gray-400'}`}>
                <div className="flex justify-between items-center mb-1">
                  <h2 className={`text-sm font-medium ${dealWon ? 'text-green-800' : 'text-gray-500'}`}>② 딜 성사 시 결제액 (Later)</h2>
                  {dealWon && results.retainerRebate > 0 && (
                    <span className="bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">페이백 적용됨</span>
                  )}
                </div>
                <div className={`text-3xl font-bold tracking-tight ${dealWon ? 'text-green-700' : 'text-gray-400'}`}>
                  {dealWon ? formatKRW(results.totalSuccessPayable) : '₩0원'}
                </div>
                <div className={`mt-3 text-xs border-t pt-2 ${dealWon ? 'text-green-600 border-green-200' : 'border-gray-200'}`}>
                  {dealWon ? '※ 초기 납부한 서비스 비용이 이미 차감(할인)된 최종 금액입니다.' : '딜 실패 시 추가 비용은 일절 발생하지 않습니다.'}
                </div>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 border-b pb-2">상세 내역 분해</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">1. 초기 착수 및 미팅비</h3>
                  <div className="flex justify-between text-sm py-1"><span className="text-gray-600">착수비 (온보딩)</span><span className="font-medium">{formatKRW(results.baseOnboarding)}</span></div>
                  <div className="flex justify-between text-sm py-1"><span className="text-gray-600">확정 미팅비 ({numMeetings}회)</span><span className="font-medium">{formatKRW(results.baseMeeting)}</span></div>
                  <div className="flex justify-between text-sm py-2 mt-1 border-t border-gray-100 font-semibold text-gray-800">
                    <span>초기비용 소계</span>
                    <span>{formatKRW(results.servicePayable + results.creditApplied + results.onboardingWaivedAmount)}</span>
                  </div>
                </div>

                {(results.onboardingWaivedAmount > 0 || results.totalCredit > 0 || results.trackADataDiscount > 0) && (
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h3 className="text-sm font-bold text-blue-800 uppercase tracking-wide mb-3">2. 초기 결제 혜택 ({selectedTrack === 'A' ? 'Track A 전용' : '데이터플랜 혜택'})</h3>
                    {results.trackADataDiscount > 0 && (
                      <div className="flex justify-between text-sm py-1 text-blue-700 font-bold"><span>데이터 요금 무상 지원 (Track A)</span><span>-{formatKRW(results.trackADataDiscount)}</span></div>
                    )}
                    {results.onboardingWaivedAmount > 0 && (
                      <div className="flex justify-between text-sm py-1 text-blue-700"><span>착수비 면제 혜택</span><span>-{formatKRW(results.onboardingWaivedAmount)}</span></div>
                    )}
                    {results.totalCredit > 0 && (
                      <>
                        <div className="flex justify-between text-sm py-1 text-blue-700"><span>보유 크레딧 총액</span><span>{formatKRW(results.totalCredit)}</span></div>
                        <div className="flex justify-between text-sm py-2 mt-1 border-t border-blue-200 font-medium text-blue-900"><span>서비스비 차감 적용 (크레딧 사용)</span><span>-{formatKRW(results.creditApplied)}</span></div>
                      </>
                    )}
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">3. 성과 보수 (최초 거래 성사 시)</h3>
                  {!dealWon ? (
                    <p className="text-sm text-gray-500 italic bg-gray-50 p-3 rounded">미체결 상태</p>
                  ) : (
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <div className="flex justify-between text-sm py-1"><span className="text-green-800">고정 성공 보수 ({selectedTrack}트랙 기준)</span><span className="font-bold text-green-900">{formatKRW(results.rawSuccessFee)}</span></div>
                      <div className="flex justify-between text-sm py-2 mt-2 bg-yellow-100 px-2 rounded font-bold text-yellow-800 border border-yellow-300">
                        <span>🎉 초기 지불비용 100% 페이백 (선수금 차감)</span>
                        <span>-{formatKRW(results.retainerRebate)}</span>
                      </div>
                      <div className="flex justify-between text-sm py-2 mt-2 border-t border-green-300 font-bold text-green-900 text-base"><span>실제 지불할 최종 성공 수수료</span><span>{formatKRW(results.successFee)}</span></div>
                    </div>
                  )}
                </div>

                {(results.dataFeePayable > 0 || results.trackADataDiscount > 0) && (
                  <div>
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">4. 데이터/부가서비스 구매</h3>
                    {results.plan.annual_fee_krw > 0 && !isExistingDataCustomer && (
                      <div className="flex justify-between text-sm py-1"><span className="text-gray-600">요금제 비용 ({CONFIG.data_plans[dataPlan].name})</span><span className="font-medium">{formatKRW(results.plan.annual_fee_krw)}</span></div>
                    )}
                    {results.addonFeeCsv > 0 && <div className="flex justify-between text-sm py-1"><span className="text-gray-600">CSV 추가 ({csvUnits}단위)</span><span className="font-medium">{formatKRW(results.addonFeeCsv)}</span></div>}
                    {results.addonFeeAccount > 0 && <div className="flex justify-between text-sm py-1"><span className="text-gray-600">추가 계정 ({extraAccounts}개)</span><span className="font-medium">{formatKRW(results.addonFeeAccount)}</span></div>}
                    <div className="flex justify-between text-sm py-2 mt-1 border-t border-gray-100 font-semibold text-gray-800"><span>결제할 부가 비용 소계</span><span>{formatKRW(results.dataFeePayable)}</span></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// CALCULATOR 2: VSM 출장비 분석기
// ============================================================
const DEFAULT_FX = 1450;
const VSM_TEXT = {
  KR: {
    title: "VSM 가치/비용 시뮬레이터",
    subtitle: "직접 수행(DIY) 시 발생하는 실제 비용 및 리스크 분석",
    tripConfig: "출장 및 미팅 설정",
    mode: { buyer: "구매자 해외 출장 (Outbound)", supplier: "공급사 방한 출장 (Inbound)", virtual: "비대면 화상 미팅 (Virtual)" },
    labels: {
      travelMode: "출장 형태", distance: "거리/지역 등급", travelers: "출장 인원", rank: "출장자 평균 직급",
      days: "출장 기간(일)", prepDays: "준비/팔로업 투입(일)", meetings: "예상 미팅 수",
      airfare: "항공료 (1인)", hotel: "숙박비 (1박)", labor: "일일 기회비용 (직급 기반)", subsidy: "지원금/보조금 (수동)",
      netCost: "단순 출장 비용 (Visible)", effectiveCost: "실질 성공 비용 (Risk-Adj)",
      totalDiy: "직접 수행(DIY) 예상 비용", diyCost: "직접 출장 시 비용/건", effPremium: "프리미엄 (VSM/DIY)",
      copy: "제안서 복사", copied: "복사 완료!", package: "VSM 도입 제안가", bundle: "3회 번들 패키지",
      retainer: "연간 리테이너", blended: "평균 단가", perMtg: "미팅 당", narrative: "고객사 제언",
      hiddenCost: "실패 기회비용", basicCost: "내부 인건비", visibleCost: "단순 출장 경비",
      print: "PDF 출력", smartPrice: "스마트 프라이싱 적용됨", smartReason: "DIY 실질 비용 대비 10% 자동 할인",
      vsmPriceLabel: "VSM 1회 미팅 단가", compareDiy: "vs. DIY 직접 수행 시"
    },
    presets: { sea: "동남아 단기 출장", japan: "일본 1박 2일", eu: "유럽 전략 소싱", us: "미국 시장 확장" },
    narrative: {
      base: "귀사에서 직접 수행 시, 성공률 {rate}% 가정 하에 건당 약 {total}의 실질 비용이 발생합니다. VSM은 검증된 매칭을 통해 이 불확실한 비용을 확정된 투자로 전환해 드립니다.",
      ceilingWarning: "높은 기회비용 감지: 현재 직접 수행 비용이 매우 높게 산출됩니다."
    },
    roiSection: "성공 확률 및 리스크 분석",
    diySection: "경비 상세 설정"
  }
};

const VSM_TIERS = {
  T1: { id: 'T1', name: 'Tier 1 (≥₩1T Revenue)', takeRate: 1.0, premiumPct: 0.25, fixedPremium: 6500000, floor: 20000000, ceiling: 40000000, discount: 0.15, retainerPremium: 0.25, retainerQuota: 10 },
  T2: { id: 'T2', name: 'Tier 2 (₩100B-₩1T)', takeRate: 0.8, premiumPct: 0.15, fixedPremium: 2500000, floor: 10000000, ceiling: 25000000, discount: 0.12, retainerPremium: 0.20, retainerQuota: 6 },
  T3: { id: 'T3', name: 'Tier 3 (₩10B-₩100B)', takeRate: 0.7, premiumPct: 0.10, fixedPremium: 1500000, floor: 6000000, ceiling: 15000000, discount: 0.10, retainerPremium: 0.15, retainerQuota: 5 },
};

const VSM_RANKS = {
  ASSOCIATE: { id: 'Associate', labelKR: '사원/대리급', cost: 350000 },
  MANAGER: { id: 'Manager', labelKR: '과장/팀장급', cost: 600000 },
  DIRECTOR: { id: 'Director', labelKR: '부장/임원급', cost: 1200000 },
  EXECUTIVE: { id: 'Executive', labelKR: 'C-Level/대표', cost: 2500000 },
};

const DISTANCE_FACTORS = [
  { label: '0-4h (Short)', factor: 1.0, air: 500000, hotel: 200000, days: 3 },
  { label: '4-8h (Mid)', factor: 1.2, air: 1200000, hotel: 250000, days: 5 },
  { label: '8-13h (Long)', factor: 1.4, air: 2200000, hotel: 300000, days: 6 },
  { label: '13h+ (Ultra)', factor: 1.6, air: 3500000, hotel: 350000, days: 7 },
];

const COST_LEVELS = [
  { label: 'Low', factor: 1.0 },
  { label: 'Mid', factor: 1.15 },
  { label: 'High', factor: 1.3 },
];

const PRESETS = [
  { id: 'sea', key: 'sea', distanceIdx: 1, costIdx: 0, travelers: 2, meetings: 2 },
  { id: 'japan', key: 'japan', distanceIdx: 0, costIdx: 1, travelers: 2, meetings: 2 },
  { id: 'eu', key: 'eu', distanceIdx: 2, costIdx: 2, travelers: 1, meetings: 1 },
  { id: 'us', key: 'us', distanceIdx: 3, costIdx: 2, travelers: 1, meetings: 1 },
];

const fmtKRW = (v) => new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW', maximumFractionDigits: 0 }).format(v);
const fmtUSDvsm = (v) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v);

const handleNumberChange = (e, setter) => {
  const rawValue = e.target.value.replace(/,/g, '');
  if (rawValue === '') { setter(0); return; }
  const numValue = Number(rawValue);
  if (!isNaN(numValue)) setter(numValue);
};

const VSMCalculator = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('quick');
  const [tier, setTier] = useState(VSM_TIERS.T2);
  const [fx, setFx] = useState(DEFAULT_FX);
  const [mode, setMode] = useState('BuyerTravel');
  const [premiumMode] = useState('Hybrid');
  const lang = 'KR';
  const t = VSM_TEXT[lang];

  const [travelers, setTravelers] = useState(2);
  const [rank, setRank] = useState(VSM_RANKS.MANAGER);
  const [days, setDays] = useState(3);
  const [prepDays, setPrepDays] = useState(2);
  const [expectedMeetings, setExpectedMeetings] = useState(1);
  const [distanceFactor, setDistanceFactor] = useState(DISTANCE_FACTORS[1]);
  const [costLevel] = useState(COST_LEVELS[1]);
  const [complexity] = useState(1.0);
  const [diySuccessProb, setDiySuccessProb] = useState(0.5);

  const [manualAir, setManualAir] = useState(0);
  const [manualHotel, setManualHotel] = useState(0);
  const [manualMeals, setManualMeals] = useState(0);
  const [manualLabor, setManualLabor] = useState(0);
  const [subsidyManual, setSubsidyManual] = useState(0);

  useEffect(() => { setManualLabor(rank.cost); }, [rank]);

  const results = useMemo(() => {
    const isVirtual = mode === 'Virtual';
    const dist = distanceFactor;
    const cl = costLevel.factor;

    const estAir = isVirtual ? 0 : (manualAir || dist.air);
    const estHotel = isVirtual ? 0 : (manualHotel || (dist.hotel * cl));
    const estMeals = isVirtual ? 0 : (manualMeals || (100000 * cl));

    const dailyLaborCost = manualLabor || 500000;
    const totalDaysInvolved = days + prepDays;
    const laborCost = dailyLaborCost * travelers * totalDaysInvolved;
    const nights = Math.max(0, days - 1);

    const rawTripCost = (
      estAir * (mode === 'BuyerTravel' ? travelers : 1) +
      (estHotel * travelers * nights) +
      (estMeals * travelers * days)
    );

    const totalSpentPerAttempt = rawTripCost + laborCost;
    const attemptsNeeded = 1 / Math.max(0.1, diySuccessProb);
    const riskOpptyCost = totalSpentPerAttempt * (attemptsNeeded - 1);
    const totalTrueCost = totalSpentPerAttempt + riskOpptyCost;

    const baseTake = (rawTripCost + laborCost) * tier.takeRate;
    const premiumPercent = baseTake * tier.premiumPct * complexity;
    const premiumFixed = tier.fixedPremium * complexity;
    const premium = Math.max(premiumPercent, premiumFixed);
    let computedPrice = baseTake + premium;
    if (computedPrice < tier.floor) computedPrice = tier.floor;

    let isSmartPricing = false;
    if (computedPrice > totalTrueCost) { computedPrice = totalTrueCost * 0.9; isSmartPricing = true; }

    let ceilingExceeded = false;
    if (computedPrice > tier.ceiling) ceilingExceeded = true;

    const bundlePrice = 3 * computedPrice * (1 - tier.discount);
    const retainerVal = tier.retainerQuota * computedPrice * (1 + tier.retainerPremium);

    return {
      diy: { cash: rawTripCost, labor: laborCost, riskOppty: riskOpptyCost, totalTrue: totalTrueCost, totalDays: totalDaysInvolved },
      vsm: { price: computedPrice, isSmartPricing, ceilingExceeded, bundle: bundlePrice, retainer: retainerVal }
    };
  }, [mode, travelers, days, prepDays, expectedMeetings, distanceFactor, costLevel, complexity, manualAir, manualHotel, manualMeals, manualLabor, subsidyManual, tier, premiumMode, fx, diySuccessProb]);

  const applyPreset = (p) => {
    setDistanceFactor(DISTANCE_FACTORS[p.distanceIdx]);
    setTravelers(p.travelers);
    setExpectedMeetings(p.meetings);
    setDays(DISTANCE_FACTORS[p.distanceIdx].days);
  };

  const copyProposal = () => {
    const text = `[고객사 제언 - VSM 도입 제안서]\n대상 지역: ${distanceFactor.label}\n\n[VSM 제안가]\n1회 미팅 단가: ${fmtKRW(results.vsm.price)}\n(직접 수행 대비 ${Math.round((1 - results.vsm.price / results.diy.totalTrue) * 100)}% 절감)\n\n3회 번들 패키지: ${fmtKRW(results.vsm.bundle)}\n\n[비교: 직접 수행(DIY) 시]\n총 예상 비용: ${fmtKRW(results.diy.totalTrue)}\n- 단순 출장비: ${fmtKRW(results.diy.cash)}\n- 기회비용/리스크: ${fmtKRW(results.diy.labor + results.diy.riskOppty)}`;
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      const alertBox = document.createElement('div');
      alertBox.style.cssText = "position:fixed;top:20px;right:20px;background:#1e293b;color:white;padding:12px 24px;border-radius:8px;z-index:9999;font-weight:bold;";
      alertBox.innerText = "복사되었습니다!";
      document.body.appendChild(alertBox);
      setTimeout(() => alertBox.remove(), 2500);
    } catch (e) { console.error("Copy failed", e); }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <style>{`@media print{.no-print{display:none!important}body{background:white!important}}`}</style>
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <BackButton onBack={onBack} />

        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-300 mb-6">
          <div>
            <h1 className="text-2xl font-extrabold flex items-center gap-2 text-slate-900">
              <Plane className="text-amber-600" /> {t.title}
            </h1>
            <p className="text-slate-600 text-sm mt-1 font-medium">{t.subtitle}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 no-print">
            <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
              {Object.values(VSM_TIERS).map(tierObj => (
                <button key={tierObj.id} onClick={() => setTier(tierObj)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${tier.id === tierObj.id ? 'bg-white shadow-sm text-blue-700' : 'text-slate-600'}`}>
                  {tierObj.id}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg border border-slate-200">
              <span className="text-xs font-bold text-slate-600">FX</span>
              <input type="text" value={fx.toLocaleString()} onChange={(e) => handleNumberChange(e, setFx)}
                className="w-20 bg-transparent text-xs font-extrabold focus:outline-none text-right text-slate-800" />
            </div>
            <button onClick={() => window.print()} className="px-4 py-1.5 bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center gap-1">
              <Printer size={14} /> {t.labels.print}
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-6">
            {/* Trip Config */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-300">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-extrabold flex items-center gap-2 text-slate-900"><Briefcase size={20} className="text-blue-600" /> {t.tripConfig}</h2>
                <div className="flex gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
                  {['quick', 'advanced'].map(tabKey => (
                    <button key={tabKey} onClick={() => setActiveTab(tabKey)}
                      className={`px-3 py-1 rounded-md text-xs font-bold capitalize transition-all ${activeTab === tabKey ? 'bg-white text-blue-700 shadow-sm border border-slate-200' : 'text-slate-500'}`}>
                      {tabKey === 'quick' ? '간편설정' : '상세설정'}
                    </button>
                  ))}
                </div>
              </div>
              {activeTab === 'quick' ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {PRESETS.map(p => (
                    <button key={p.id} onClick={() => applyPreset(p)}
                      className="p-3 text-left border border-slate-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all bg-slate-50">
                      <div className="text-xs font-extrabold text-slate-800">{t.presets[p.key]}</div>
                      <div className="text-[10px] text-slate-600 mt-1 font-medium">{DISTANCE_FACTORS[p.distanceIdx].label}</div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">{t.labels.travelMode}</label>
                      <select className="w-full p-2.5 border border-slate-300 rounded-lg text-sm bg-white" value={mode} onChange={e => setMode(e.target.value)}>
                        <option value="BuyerTravel">{t.mode.buyer}</option>
                        <option value="SupplierVisit">{t.mode.supplier}</option>
                        <option value="Virtual">{t.mode.virtual}</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">{t.labels.distance}</label>
                      <select className="w-full p-2.5 border border-slate-300 rounded-lg text-sm bg-white"
                        value={DISTANCE_FACTORS.indexOf(distanceFactor)} onChange={e => setDistanceFactor(DISTANCE_FACTORS[e.target.value])}>
                        {DISTANCE_FACTORS.map((d, i) => <option key={i} value={i}>{d.label}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">{t.labels.rank}</label>
                      <select className="w-full p-2.5 border border-slate-300 rounded-lg text-sm bg-white"
                        value={rank.id} onChange={e => setRank(Object.values(VSM_RANKS).find(r => r.id === e.target.value))}>
                        {Object.values(VSM_RANKS).map(r => <option key={r.id} value={r.id}>{r.labelKR}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">{t.labels.travelers}</label>
                      <input type="number" value={travelers} onChange={e => setTravelers(Number(e.target.value))} className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">{t.labels.days}</label>
                      <input type="number" value={days} onChange={e => setDays(Number(e.target.value))} className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-indigo-700">{t.labels.prepDays}</label>
                      <input type="number" value={prepDays} onChange={e => setPrepDays(Number(e.target.value))} className="w-full p-2.5 border border-indigo-300 bg-indigo-50 rounded-lg text-sm font-bold text-indigo-900" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">{t.labels.meetings}</label>
                      <input type="number" value={expectedMeetings} onChange={e => setExpectedMeetings(Number(e.target.value))} className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" />
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Risk Analysis */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-300">
              <h2 className="font-extrabold flex items-center gap-2 mb-4 text-slate-900"><Scale size={20} className="text-indigo-600" /> {t.roiSection}</h2>
              <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-200 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle size={18} className="text-indigo-700" />
                    <label className="text-sm font-bold text-slate-800">{t.labels.diySuccessProb}</label>
                  </div>
                  <span className="text-sm font-mono bg-white border border-indigo-300 px-3 py-1 rounded text-indigo-800 font-extrabold">{Math.round(diySuccessProb * 100)}%</span>
                </div>
                <input type="range" min="0.1" max="1" step="0.1" value={diySuccessProb} onChange={e => setDiySuccessProb(Number(e.target.value))} className="w-full h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-indigo-700" />
                <p className="text-xs text-slate-600 mt-2 leading-relaxed font-medium">직접 출장 갔을 때, 원하는 퀄리티의 공급사를 계약까지 성사시킬 확률입니다.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-300">
                  <div className="text-xs font-bold text-slate-600 mb-1">{t.labels.netCost}</div>
                  <div className="text-xl font-extrabold text-slate-800">{fmtKRW(results.diy.cash)}</div>
                </div>
                <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-indigo-200 text-indigo-900 text-[10px] px-2 py-0.5 rounded-bl-lg font-extrabold border-l border-b border-indigo-300">TRUE COST</div>
                  <div className="text-xs font-bold text-indigo-800 mb-1">{t.labels.effectiveCost}</div>
                  <div className="text-xl font-black text-indigo-900">{fmtKRW(results.diy.totalTrue)}</div>
                  <div className="text-[10px] text-indigo-700 mt-1 font-bold">Cash + Labor + Risk</div>
                </div>
              </div>
            </section>

            {/* Manual Expense Override */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-300">
              <h2 className="font-extrabold flex items-center gap-2 mb-4 text-slate-900"><Settings2 size={20} className="text-slate-500" /> {t.diySection}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {[
                  { label: t.labels.airfare, val: manualAir || distanceFactor.air, set: setManualAir },
                  { label: t.labels.hotel, val: manualHotel || (distanceFactor.hotel * costLevel.factor), set: setManualHotel },
                  { label: t.labels.labor, val: manualLabor, set: setManualLabor, hint: `총 ${results.diy.totalDays}d` },
                  { label: t.labels.subsidy, val: subsidyManual, set: setSubsidyManual },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between group">
                    <div>
                      <span className="text-sm text-slate-700 font-bold">{item.label}</span>
                      {item.hint && <span className="ml-2 text-[10px] bg-indigo-100 text-indigo-700 border border-indigo-200 px-1.5 py-0.5 rounded font-extrabold">{item.hint}</span>}
                    </div>
                    <div className="flex items-center border-b border-slate-300 focus-within:border-blue-500 transition-colors">
                      <span className="text-xs text-slate-500 mr-2">₩</span>
                      <input type="text" value={item.val.toLocaleString()} onChange={e => handleNumberChange(e, item.set)}
                        className="w-24 text-right py-1.5 text-sm font-bold text-slate-900 focus:outline-none bg-transparent" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Output */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl shadow-xl space-y-6 relative overflow-hidden ring-1 bg-gradient-to-br from-blue-900 to-slate-900 text-white ring-slate-800">
              <div className="absolute top-[-20px] right-[-20px] w-40 h-40 bg-blue-500/20 rounded-full blur-3xl no-print"></div>
              <div className="relative">
                <div className="text-xs font-extrabold uppercase tracking-wider mb-2 flex items-center gap-1 text-blue-100">
                  <ShieldCheck size={16} className="text-blue-300" /> {t.labels.package}
                </div>
                <div className="mt-4">
                  <div className="text-sm text-blue-200 mb-1 font-semibold">{t.labels.vsmPriceLabel}</div>
                  <div className="text-5xl font-black tracking-tight text-white">{fmtKRW(results.vsm.price)}</div>
                  <div className="text-sm opacity-80 mt-1 font-semibold text-blue-100">≈ {fmtUSDvsm(results.vsm.price / fx)}</div>
                </div>
                {results.vsm.isSmartPricing && (
                  <div className="mt-3 flex items-center gap-2 text-xs font-bold text-amber-200 bg-amber-900/50 p-2 rounded-lg border border-amber-500/30">
                    <Zap size={14} className="fill-amber-400 text-amber-400" />
                    <span>{t.labels.smartPrice}: {t.labels.smartReason}</span>
                  </div>
                )}
              </div>
              <div className="space-y-3 relative border-t border-slate-600/50 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-200">{t.labels.bundle}</span>
                  <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-extrabold">-{Math.round(tier.discount * 100)}%</span>
                </div>
                <div className="text-2xl font-extrabold text-white">{fmtKRW(results.vsm.bundle)}</div>
                <div className="text-xs text-slate-300 font-medium">{fmtKRW(results.vsm.bundle / 3)} {t.labels.perMtg}</div>
              </div>
              <div className="relative pt-2 no-print">
                <button onClick={copyProposal} className="w-full font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg bg-blue-600 text-white hover:bg-blue-500 border border-blue-500">
                  <Copy size={18} /> {t.labels.copy}
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-300 space-y-4">
              <h3 className="text-sm font-extrabold flex items-center gap-2 border-b border-slate-200 pb-3 text-slate-600">
                <TrendingUp size={18} className="text-slate-500" /> {t.labels.compareDiy}
              </h3>
              <div className="flex flex-col space-y-1">
                <div className="text-xs text-slate-500 font-bold">{t.labels.totalDiy}</div>
                <div className="text-3xl font-extrabold text-slate-800 tracking-tight">{fmtKRW(results.diy.totalTrue)}</div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs font-black text-green-800 bg-green-100 px-2.5 py-1 rounded-md border border-green-200">
                    {t.labels.effPremium}: {Math.round((1 - (results.vsm.price / results.diy.totalTrue)) * 100)}% SAVE
                  </span>
                </div>
              </div>
              <div className="pt-2">
                <div className="flex justify-between text-[10px] text-slate-500 font-bold mb-1"><span>Cash</span><span>Labor</span><span>Risk Cost</span></div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex border border-slate-200">
                  <div style={{ width: `${(results.diy.cash / results.diy.totalTrue) * 100}%` }} className="h-full bg-slate-400"></div>
                  <div style={{ width: `${(results.diy.labor / results.diy.totalTrue) * 100}%` }} className="h-full bg-slate-500"></div>
                  <div style={{ width: `${(results.diy.riskOppty / results.diy.totalTrue) * 100}%` }} className="h-full bg-red-500"></div>
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-2xl space-y-4 shadow-sm border ${results.vsm.ceilingExceeded ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-300'}`}>
              <div className="text-xs font-extrabold uppercase tracking-widest flex items-center gap-2 text-slate-600">
                <FileText size={16} /> {t.labels.narrative}
              </div>
              <p className="text-sm leading-relaxed italic text-slate-800 font-medium">
                "{t.narrative.base.replace('{rate}', Math.round(diySuccessProb * 100)).replace('{total}', fmtKRW(results.diy.totalTrue))}"
              </p>
            </div>
          </div>
        </div>

        <footer className="pt-8 pb-12 text-center border-t border-slate-300 mt-6">
          <p className="text-xs font-bold text-slate-700">본 시뮬레이터는 법제처 공무원 여비 규정, aT 수출종합지원시스템, KOTRA 해외전시회 규정을 준수하여 산출되었습니다.</p>
          <p className="text-xs text-slate-400 mt-2">Internal Use Only · Copyright © 2026 Tridge. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
};

// ============================================================
// CALCULATOR 3: 성공보수 분석기 (원본 App.js)
// ============================================================
const SuccessFeeCalculator = ({ onBack }) => {
  const [mainTab, setMainTab] = useState('setup');
  const [isStrategyExpanded, setIsStrategyExpanded] = useState(true);
  const [isAiStrategyOpen, setIsAiStrategyOpen] = useState(true);
  const [isAiProposalOpen, setIsAiProposalOpen] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiStrategyResponse, setAiStrategyResponse] = useState('');
  const [aiProposalResponse, setAiProposalResponse] = useState('');
  const [clientContext, setClientContext] = useState('');

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {};
  }, []);

  const callGeminiAPI = async (prompt) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) return "API 키가 설정되지 않았습니다. 환경변수를 확인하세요.";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    try {
      setAiLoading(true);
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      if (!response.ok) throw new Error(`API Error: ${response.status}`);
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "AI 응답을 불러올 수 없습니다.";
    } catch (error) {
      return "죄송합니다. AI 서비스 연결에 실패했습니다.";
    } finally {
      setAiLoading(false);
    }
  };

  const handleAskAIStrategy = async () => {
    if (!clientContext.trim()) { alert("고객 상황을 입력해주세요."); return; }
    setIsAiStrategyOpen(true);
    const prompt = `당신은 B2B 파트너십 전문가입니다. 고객은 수출입 데이터 솔루션 구매 여부를 결정하기 위해 현재 시뮬레이터로 조건을 확인 중입니다. 고객 상황: "${clientContext}" 모델 옵션: A. 안정 추구형 (Base 80%, Success 10%) B. 균형 제안형 (Base 60%, Success 20%) C. 성과 집중형 (Base 30%, Success 40%) D. 성과 극대화형 (Base 10%, Success 50%) E. 선지급 확정형 (Base 100%, Success 0%) 가장 적합한 모델 1가지를 추천하고, 설득 논리를 한국어로 5문장 내외로 간결하고 구조적으로 작성해주세요.`;
    const result = await callGeminiAPI(prompt);
    setAiStrategyResponse(result);
  };

  const handleGenerateProposal = async (finalStats) => {
    setIsAiProposalOpen(true);
    const prompt = `세일즈 컨설턴트로서 아래 데이터로 제안서 요약(Executive Summary)을 작성하세요. 모델: ${finalStats.modelName}, 고정비: ${finalStats.baseFee}, 절감액: ${finalStats.savings}, 성과보수: ${finalStats.successFee}, 총비용: ${finalStats.totalCost}. 요청: 경제적 이점 강조, 수치 인용, 정중한 해요체, 3~4문장 요약.`;
    const result = await callGeminiAPI(prompt);
    setAiProposalResponse(result);
  };

  const [standardPrice, setStandardPrice] = useState(100000);
  const [estimatedSavings, setEstimatedSavings] = useState(200000);
  const [itemType, setItemType] = useState('type_a');
  const [selectedModelId, setSelectedModelId] = useState('C');

  const MODELS = {
    OLD: { id: 'OLD', name: '기존 모델', baseRate: 1.0, successRate: 0.0, desc: '100% 고정비', color: '#9CA3AF' },
    A: { id: 'A', name: 'A. 안정 추구형', baseRate: 0.8, successRate: 0.10, desc: 'Low Risk', color: '#34D399' },
    B: { id: 'B', name: 'B. 균형 제안형', baseRate: 0.6, successRate: 0.20, desc: 'Balanced', color: '#3B82F6' },
    C: { id: 'C', name: 'C. 성과 집중형', baseRate: 0.3, successRate: 0.40, desc: 'High Reward', color: '#8B5CF6' },
    D: { id: 'D', name: 'D. 성과 극대화형', baseRate: 0.1, successRate: 0.50, desc: 'Min Base / Max Reward', color: '#F43F5E' },
    E: { id: 'E', name: 'E. 선지급 확정형', baseRate: 1.0, successRate: 0.0, desc: '100% Base / No Success Fee', color: '#64748B' },
  };

  const ITEM_STRATEGIES = {
    type_a: { label: 'Type A. 시세 연동형', icon: <TrendingUp size={20} className="text-red-500 flex-shrink-0" />, rec: ['C', 'D'], desc: '국제 시세(CBOT 등)와 밀접하게 연동되며 변동성이 매우 큼 (밀, 옥수수, 커피 등).', reason: '변동성이 크므로 성과급 비중을 높여 Risk/Reward를 공유하는 모델(C, D)이 유리합니다.' },
    type_b: { label: 'Type B. 계절성형', icon: <Calendar size={20} className="text-orange-500 flex-shrink-0" />, rec: ['B', 'C'], desc: '수확 시기에 따라 공급량이 요동치며 정현파 패턴을 보임 (과일 농축액, 유제품 등).', reason: '주기적인 변동이 있으므로 균형 잡힌 모델(B)이나 성과 집중형(C)으로 기회를 포착하세요.' },
    type_c: { label: 'Type C. 계단식 변동형', icon: <Anchor size={20} className="text-blue-500 flex-shrink-0" />, rec: ['A', 'E'], desc: '연간 계약 등으로 가격이 장기간 고정되다가 갱신 시점에 점프함 (가공식품, 소스류).', reason: '가격이 안정적이므로 고정비 비중이 높은 안정형(A)이나 확정형(E)이 적합합니다.' },
    type_d: { label: 'Type D. 이벤트 반응형', icon: <Zap size={20} className="text-purple-500 flex-shrink-0" />, rec: ['D'], desc: '평소엔 안정적이나 질병, 전쟁 등 이슈 발생 시 폭등함 (돈육, 계란, 식용유).', reason: '예측 불가능한 리스크가 크므로, 평소 비용을 최소화하는 성과 극대화형(D)을 제안하세요.' },
  };

  const currentModel = MODELS[selectedModelId];
  const [activeTab, setActiveTab] = useState('standard');
  const [unit, setUnit] = useState('KG');
  const [excelData, setExcelData] = useState([]);
  const [importers, setImporters] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedImporter, setSelectedImporter] = useState('');
  const [baseYear, setBaseYear] = useState('');
  const [evalYear, setEvalYear] = useState('');
  const [stdInputs, setStdInputs] = useState({ myPrice: 4.20, mktPrice: 4.50, volume: 50000, baseMyPrice: 5.00, baseMktPrice: 4.90 });
  const [advInputs, setAdvInputs] = useState({ baseMean: 5.00, baseStd: 0.40, baseMyPrice: 5.00, evalMean: 4.50, evalStd: 0.40, evalMyPrice: 4.20, volume: 50000 });

  const fmtUSD = (num) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);

  const setupSimResult = useMemo(() => {
    const baseFee = standardPrice * currentModel.baseRate;
    const discountAmount = standardPrice - baseFee;
    const rawSuccessFee = estimatedSavings * currentModel.successRate;
    const capAmount = standardPrice * 3;
    let actualSuccessFee = rawSuccessFee;
    let isCapped = false;
    if (rawSuccessFee > capAmount) { actualSuccessFee = capAmount; isCapped = true; }
    const totalCost = baseFee + actualSuccessFee;
    const netBenefit = estimatedSavings - actualSuccessFee;
    const roi = totalCost > 0 ? ((estimatedSavings - totalCost) / totalCost) * 100 : 0;
    const chartData = [{ name: '비용 구조', 'Base': baseFee, 'Success': actualSuccessFee, 'Benefit': netBenefit > 0 ? netBenefit : 0 }];
    const comparisonData = Object.keys(MODELS).map(k => {
      const m = MODELS[k];
      const b = standardPrice * m.baseRate;
      const s = estimatedSavings * m.successRate;
      const compCap = standardPrice * 3;
      const finalS = (s > compCap) ? compCap : s;
      return { name: k === 'OLD' ? '기존' : k, Base: b, Success: finalS, Total: b + finalS, isCurrent: k === selectedModelId };
    });
    return { baseFee, discountAmount, actualSuccessFee, isCapped, netBenefit, roi, chartData, comparisonData, capAmount };
  }, [standardPrice, estimatedSavings, currentModel, selectedModelId]);

  const effectiveBaseFee = setupSimResult.baseFee;
  const effectiveSuccessRate = currentModel.successRate;

  const stdResult = useMemo(() => {
    const spread = Math.max(0, stdInputs.mktPrice - stdInputs.myPrice);
    const totalSaving = spread * stdInputs.volume;
    const rawFee = totalSaving * effectiveSuccessRate;
    const capAmount = standardPrice * 3;
    let actualFee = rawFee; let isCapped = false;
    if (rawFee > capAmount) { actualFee = capAmount; isCapped = true; }
    return { spread, totalSaving, successFee: actualFee, uncappedFee: rawFee, totalRevenue: effectiveBaseFee + actualFee, isCapped };
  }, [stdInputs, effectiveBaseFee, effectiveSuccessRate, standardPrice]);

  const advResult = useMemo(() => {
    const zBase = advInputs.baseStd ? (advInputs.baseMyPrice - advInputs.baseMean) / advInputs.baseStd : 0;
    const zEval = advInputs.evalStd ? (advInputs.evalMyPrice - advInputs.evalMean) / advInputs.evalStd : 0;
    const deltaZ = zBase - zEval;
    const unitSaving = deltaZ * advInputs.evalStd;
    const totalSaving = unitSaving * advInputs.volume;
    const rawFee = Math.max(0, totalSaving * effectiveSuccessRate);
    const capAmount = standardPrice * 3;
    let actualFee = rawFee; let isCapped = false;
    if (rawFee > capAmount) { actualFee = capAmount; isCapped = true; }
    return { zBase, zEval, deltaZ, unitSaving, totalSaving, successFee: actualFee, uncappedFee: rawFee, totalRevenue: effectiveBaseFee + actualFee, isCapped };
  }, [advInputs, effectiveBaseFee, effectiveSuccessRate, standardPrice]);

  const handleUnitChange = (newUnit) => {
    if (newUnit === unit) return;
    setUnit(newUnit);
    const factor = newUnit === 'MT' ? 1000 : 0.001;
    const volFactor = newUnit === 'MT' ? 0.001 : 1000;
    setStdInputs(prev => ({ ...prev, myPrice: parseFloat((prev.myPrice * factor).toFixed(2)), mktPrice: parseFloat((prev.mktPrice * factor).toFixed(2)), volume: prev.volume * volFactor }));
    setAdvInputs(prev => ({ ...prev, myPrice: parseFloat((prev.myPrice * factor).toFixed(2)), mktPrice: parseFloat((prev.mktPrice * factor).toFixed(2)), volume: prev.volume * volFactor }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!window.XLSX) { alert("엑셀 라이브러리 로드 중..."); return; }
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = evt.target.result;
        const workbook = window.XLSX.read(data, { type: 'array' });
        const jsonData = window.XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { defval: "" });
        setExcelData(jsonData);
        const impSet = new Set(); const yearSet = new Set();
        const keys = Object.keys(jsonData[0]);
        const impKey = keys.find(k => /importer|buyer|company|기업/i.test(k)) || keys[0];
        const yearKey = keys.find(k => /year|date|연도/i.test(k)) || 'Year';
        jsonData.forEach(row => {
          if (row[impKey]) impSet.add(String(row[impKey]).trim());
          const m = String(row[yearKey]).match(/20\d{2}/);
          if (m) yearSet.add(m[0]);
        });
        setImporters([...impSet].sort());
        const sortedYears = [...yearSet].sort();
        setYears(sortedYears);
        if (sortedYears.length >= 2) { setBaseYear(sortedYears[sortedYears.length - 2]); setEvalYear(sortedYears[sortedYears.length - 1]); }
        alert(`로드 완료! ${jsonData.length}행`);
      } catch (err) { alert("파일 처리 오류: " + err.message); }
    };
    reader.readAsArrayBuffer(file);
  };

  useEffect(() => {
    if (!selectedImporter || !baseYear || !evalYear || excelData.length === 0) return;
    const keys = Object.keys(excelData[0]);
    const impKey = keys.find(k => /importer|buyer|company|기업/i.test(k));
    const yearKey = keys.find(k => /year|date|연도/i.test(k));
    const valKey = keys.find(k => /value|amount|usd|price|금액/i.test(k));
    const volKey = keys.find(k => /volume|quantity|qty|kg|물량/i.test(k));
    let baseStats = { val: 0, vol: 0, prices: [] }; let evalStats = { val: 0, vol: 0, prices: [] };
    let targetBase = { val: 0, vol: 0 }; let targetEval = { val: 0, vol: 0 };
    excelData.forEach(row => {
      const y = String(row[yearKey] || ""); const imp = String(row[impKey] || "").trim();
      const v = parseFloat(String(row[valKey] || '0').replace(/[$,]/g, ''));
      const q = parseFloat(String(row[volKey] || '0').replace(/[,kgKG]/g, ''));
      const p = q > 0 ? v / q : 0;
      if (q === 0) return;
      if (y.includes(baseYear)) { baseStats.val += v; baseStats.vol += q; baseStats.prices.push(p); if (imp === selectedImporter) { targetBase.val += v; targetBase.vol += q; } }
      else if (y.includes(evalYear)) { evalStats.val += v; evalStats.vol += q; evalStats.prices.push(p); if (imp === selectedImporter) { targetEval.val += v; targetEval.vol += q; } }
    });
    const calcMean = (s) => s.vol ? s.val / s.vol : 0;
    const calcStd = (prices, mean) => { if (!prices.length) return 1; const v = prices.reduce((a, p) => a + Math.pow(p - mean, 2), 0) / prices.length; return Math.sqrt(v) || 0.1; };
    const mBase = calcMean(baseStats); const mEval = calcMean(evalStats);
    const tBase = calcMean(targetBase); const tEval = calcMean(targetEval);
    const sBase = calcStd(baseStats.prices, mBase); const sEval = calcStd(evalStats.prices, mEval);
    const factor = unit === 'MT' ? 1000 : 1; const volFactor = unit === 'MT' ? 0.001 : 1;
    const common = { volume: Math.round(targetEval.vol * volFactor) };
    setStdInputs({ myPrice: parseFloat((tEval * factor).toFixed(2)), mktPrice: parseFloat((mEval * factor).toFixed(2)), baseMyPrice: parseFloat((tBase * factor).toFixed(2)), baseMktPrice: parseFloat((mBase * factor).toFixed(2)), ...common });
    setAdvInputs({ baseMean: parseFloat((mBase * factor).toFixed(2)), baseStd: parseFloat(sBase.toFixed(4)), baseMyPrice: parseFloat((tBase * factor).toFixed(2)), evalMean: parseFloat((mEval * factor).toFixed(2)), evalStd: parseFloat(sEval.toFixed(4)), evalMyPrice: parseFloat((tEval * factor).toFixed(2)), ...common });
  }, [selectedImporter, baseYear, evalYear, excelData, unit]);

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      <style>{`.animate-fade-in{animation:fadeIn .3s ease}@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <BackButton onBack={onBack} />

        {/* Header */}
        <div className="bg-gradient-to-r from-violet-700 to-purple-700 rounded-2xl p-6 text-white mb-6 shadow-xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2"><BarChart2 size={24} /> 성공보수 분석기</h1>
              <p className="text-purple-200 text-sm mt-1">파트너십 모델 비교 · Z-Score 이격률 분석 · AI 제안서 생성</p>
            </div>
            <div className="flex gap-2 bg-white/10 p-1 rounded-xl">
              {['setup', 'analysis'].map(tab => (
                <button key={tab} onClick={() => setMainTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${mainTab === tab ? 'bg-white text-purple-700 shadow' : 'text-white/70 hover:text-white'}`}>
                  {tab === 'setup' ? '① 모델 설정' : '② 검증 분석'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* TAB 1: SETUP */}
        {mainTab === 'setup' && (
          <div className="animate-fade-in space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5 space-y-6">
                {/* Price Config */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
                  <h3 className="font-bold text-lg text-slate-700 flex items-center gap-2"><Settings size={18} className="text-blue-500" /> 기본 조건 설정</h3>
                  <div>
                    <div className="flex justify-between items-end mb-1">
                      <label className="block text-sm font-bold text-slate-500">표준 가격 (Standard Price)</label>
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">{fmtUSD(standardPrice)}</span>
                    </div>
                    <input type="range" min={0} max={500000} step={5000} value={standardPrice} onChange={e => setStandardPrice(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                  </div>
                  <div>
                    <div className="flex justify-between items-end mb-1">
                      <label className="block text-sm font-bold text-slate-500">예상 절감액 (Target Savings)</label>
                      <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">{fmtUSD(estimatedSavings)}</span>
                    </div>
                    <input type="range" min={0} max={1000000} step={10000} value={estimatedSavings} onChange={e => setEstimatedSavings(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-600" />
                  </div>
                </div>

                {/* Strategy */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <h3 className="font-bold text-lg text-slate-700 mb-4 flex items-center gap-2"><Briefcase className="text-purple-500" /> 품목군 전략 선택</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.keys(ITEM_STRATEGIES).map(k => (
                      <button key={k} onClick={() => setItemType(k)}
                        className={`p-4 rounded-xl text-left transition-all flex flex-col gap-2 h-auto min-h-[100px] shadow-sm hover:shadow-md w-full ${itemType === k ? 'bg-gradient-to-br from-purple-50 to-white border-2 border-purple-500' : 'bg-white border border-slate-200 hover:bg-slate-50 text-slate-600'}`}>
                        <div className="flex items-center gap-2 mb-1 w-full min-w-0">
                          <div className={`p-1.5 rounded-full shrink-0 ${itemType === k ? 'bg-purple-100' : 'bg-slate-100'}`}>{ITEM_STRATEGIES[k].icon}</div>
                          <span className={`font-bold text-sm break-words whitespace-normal min-w-0 flex-1 ${itemType === k ? 'text-purple-800' : 'text-slate-700'}`}>{ITEM_STRATEGIES[k].label.split('.')[1].trim()}</span>
                        </div>
                        <div className={`text-xs leading-snug ${itemType === k ? 'text-purple-600' : 'text-slate-400'}`}>{ITEM_STRATEGIES[k].label.split('.')[0]}</div>
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 bg-gradient-to-r from-purple-50 to-slate-50 p-5 rounded-xl border border-purple-100">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsStrategyExpanded(!isStrategyExpanded)}>
                      <div className="flex items-center gap-3"><div className="text-purple-600 bg-purple-100 p-1.5 rounded-full"><Activity size={16} /></div><div className="text-xs font-extrabold text-purple-800 uppercase tracking-wide">STRATEGY GUIDE</div></div>
                      <div className="text-purple-400">{isStrategyExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</div>
                    </div>
                    {isStrategyExpanded && (
                      <div className="mt-3 pl-10 animate-fade-in">
                        <div className="text-sm text-slate-700 font-medium leading-relaxed mb-2">{ITEM_STRATEGIES[itemType].desc}</div>
                        <div className="text-sm text-purple-700 font-medium leading-relaxed bg-white/60 p-2 rounded-lg border border-purple-100/50">💡 {ITEM_STRATEGIES[itemType].reason}</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Model Selection */}
                <div className="space-y-2">
                  {Object.keys(MODELS).filter(k => k !== 'OLD').map(key => {
                    const m = MODELS[key]; const isSel = selectedModelId === key; const isRec = ITEM_STRATEGIES[itemType].rec.includes(key);
                    return (
                      <button key={key} onClick={() => setSelectedModelId(key)} className={`w-full relative p-3 rounded-xl border-2 text-left transition-all ${isSel ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-white'}`}>
                        {isRec && <span className="absolute top-3 right-3 bg-green-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold flex items-center gap-1"><CheckCircle size={10} /> 추천</span>}
                        <div className={`font-bold ${isSel ? 'text-blue-800' : 'text-slate-700'} pr-16`}>{m.name}</div>
                        <div className="text-xs text-slate-400 mt-1">Base {Math.round(m.baseRate * 100)}% + Success {Math.round(m.successRate * 100)}%</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Panel */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100 relative overflow-hidden flex-1 flex flex-col">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                  <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">시뮬레이션 결과</h2>
                      <p className="text-sm text-slate-500">선택 모델: <span className="font-bold text-blue-600">{currentModel.name}</span></p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-400">고객 ROI</div>
                      <div className="text-2xl font-bold text-green-600">{setupSimResult.roi > 0 ? `+${setupSimResult.roi.toFixed(0)}%` : '-'}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 min-w-0">
                      <div className="text-xs text-slate-500 mb-1">고정비 (Base)</div>
                      <div className="text-lg font-bold text-slate-800 truncate">{fmtUSD(setupSimResult.baseFee)}</div>
                      {setupSimResult.discountAmount > 0 && <div className="text-[10px] text-green-600 flex items-center gap-1"><TrendingDown size={10} className="shrink-0" /> {fmtUSD(setupSimResult.discountAmount)} 절감</div>}
                    </div>
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 relative min-w-0">
                      <div className="text-xs text-blue-600 mb-1 flex justify-between items-center"><span>성과급 (Success)</span>{setupSimResult.isCapped && <span className="text-orange-600 bg-orange-100 px-1.5 py-0.5 rounded text-[10px] font-bold">CAP</span>}</div>
                      <div className="text-lg font-bold text-blue-700 truncate">{fmtUSD(setupSimResult.actualSuccessFee)}</div>
                      <div className="text-[10px] text-slate-400 mt-1">Max Cap: {fmtUSD(setupSimResult.capAmount)}</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-xl border border-green-200 min-w-0">
                      <div className="text-xs text-green-700 mb-1">순이익 (Benefit)</div>
                      <div className="text-lg font-bold text-green-700 truncate">{fmtUSD(setupSimResult.netBenefit)}</div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-6 flex-1 min-h-[400px]">
                    <div className="bg-white p-4 border rounded-xl flex-1 min-h-[300px] flex flex-col">
                      <h4 className="text-sm font-bold text-center mb-4 text-slate-600">비용 대비 효과 분석</h4>
                      <div className="flex-1 w-full min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={setupSimResult.chartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                            <XAxis type="number" hide />
                            <YAxis type="category" dataKey="name" hide />
                            <RechartsTooltip formatter={(val) => fmtUSD(val)} cursor={{ fill: 'transparent' }} />
                            <Legend />
                            <Bar dataKey="Base" stackId="a" fill="#9CA3AF" radius={[4, 0, 0, 4]} name="고정비" />
                            <Bar dataKey="Success" stackId="a" fill="#3B82F6" name="성과급" />
                            <Bar dataKey="Benefit" stackId="a" fill="#34D399" radius={[0, 4, 4, 0]} name="고객이득" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <div className="bg-white p-4 border rounded-xl flex-1 min-h-[300px] flex flex-col">
                      <h4 className="text-sm font-bold text-center mb-4 text-slate-600">모델별 총 비용 비교</h4>
                      <div className="flex-1 w-full min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={setupSimResult.comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} />
                            <RechartsTooltip formatter={(val) => fmtUSD(val)} cursor={{ fill: 'transparent' }} />
                            <Legend />
                            <Bar dataKey="Base" stackId="a" fill="#D1D5DB" name="고정비" />
                            <Bar dataKey="Success" stackId="a" fill="#60A5FA" name="성과급">
                              {setupSimResult.comparisonData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.isCurrent ? '#2563EB' : '#93C5FD'} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <button onClick={() => setMainTab('analysis')} className="w-full sm:w-auto bg-slate-900 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 ml-auto hover:bg-slate-800 transition-colors">
                    최종 파트너십 검증 단계로 이동 <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ANALYSIS */}
        {mainTab === 'analysis' && (
          <div className="animate-fade-in space-y-6">
            <div className="bg-white border border-slate-200 rounded-lg p-3 mb-4 flex flex-wrap justify-between items-center shadow-sm gap-2">
              <div className="flex items-center gap-3 text-sm flex-wrap">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-bold shrink-0">SETUP INFO</span>
                <span className="whitespace-nowrap">모델: <strong>{currentModel.name}</strong></span>
                <span className="text-slate-300 hidden sm:inline">|</span>
                <span className="whitespace-nowrap">확정 Base: <strong>{fmtUSD(effectiveBaseFee)}</strong></span>
              </div>
              <button onClick={() => setMainTab('setup')} className="text-xs text-blue-600 font-bold hover:underline whitespace-nowrap">설정 변경하기</button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 space-y-6 min-w-0">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b pb-4 gap-4">
                    <h2 className="font-bold text-slate-700 flex items-center gap-2"><Activity size={20} /> 최종 파트너십 검증</h2>
                    <div className="flex bg-slate-100 p-1 rounded-lg shrink-0">
                      <button onClick={() => handleUnitChange('KG')} className={`px-3 py-1 text-xs font-bold rounded ${unit === 'KG' ? 'bg-white shadow text-blue-600' : 'text-slate-500'}`}>KG</button>
                      <button onClick={() => handleUnitChange('MT')} className={`px-3 py-1 text-xs font-bold rounded ${unit === 'MT' ? 'bg-white shadow text-blue-600' : 'text-slate-500'}`}>MT</button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50 relative">
                      <input type="file" accept=".xlsx, .xls, .csv" onChange={handleFileUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                      <FileSpreadsheet className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <p className="text-xs font-bold text-slate-600">엑셀/CSV 데이터 업로드</p>
                    </div>
                    <div className="space-y-3">
                      <select className="w-full p-2 border rounded text-sm bg-white" value={selectedImporter} onChange={e => setSelectedImporter(e.target.value)}>
                        <option value="">기업 선택 ({importers.length})</option>
                        {importers.map(i => <option key={i} value={i}>{i}</option>)}
                      </select>
                      <div className="grid grid-cols-2 gap-2">
                        <select className="p-2 border rounded text-sm bg-white" value={baseYear} onChange={e => setBaseYear(e.target.value)}>
                          {years.map(y => <option key={y} value={y}>{y}년 (기준)</option>)}
                        </select>
                        <select className="p-2 border rounded text-sm font-bold text-blue-600 bg-white" value={evalYear} onChange={e => setEvalYear(e.target.value)}>
                          {years.map(y => <option key={y} value={y}>{y}년 (평가)</option>)}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4 flex border-b border-slate-200">
                    <button onClick={() => setActiveTab('standard')} className={`pb-3 px-4 font-bold text-sm border-b-2 whitespace-nowrap ${activeTab === 'standard' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-400'}`}>🅰️ 표준 가격 비교</button>
                    <button onClick={() => setActiveTab('advanced')} className={`pb-3 px-4 font-bold text-sm border-b-2 whitespace-nowrap ${activeTab === 'advanced' ? 'border-purple-500 text-purple-600' : 'border-transparent text-slate-400'}`}>🅱️ 심화 이격률 분석</button>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    {activeTab === 'standard' ? (
                      <div className="space-y-4">
                        <div className="flex justify-between text-xs text-slate-400 px-1"><span>내 가격 (My VWAP)</span><span>시장 가격 (Market VWAP)</span></div>
                        <div className="flex items-center gap-4">
                          <input type="number" value={stdInputs.myPrice} onChange={e => setStdInputs({ ...stdInputs, myPrice: Number(e.target.value) })} className="flex-1 p-3 border border-blue-300 rounded-lg font-bold text-right text-blue-700 bg-white min-w-0" />
                          <span className="text-slate-400">vs</span>
                          <input type="number" value={stdInputs.mktPrice} onChange={e => setStdInputs({ ...stdInputs, mktPrice: Number(e.target.value) })} className="flex-1 p-3 border border-slate-300 rounded-lg text-right bg-white min-w-0" />
                        </div>
                        <div><label className="text-xs font-bold text-slate-500">물량 ({unit})</label><input type="number" value={stdInputs.volume} onChange={e => setStdInputs({ ...stdInputs, volume: Number(e.target.value) })} className="w-full p-2 mt-1 border rounded-lg bg-white" /></div>
                      </div>
                    ) : (
                      <div className="space-y-6 animate-fade-in">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="bg-white p-3 rounded border border-slate-200">
                            <div className="text-xs font-bold text-slate-400 mb-2">기준 연도</div>
                            <div className="flex justify-between text-xs"><span>Mean</span><span>{advInputs.baseMean}</span></div>
                            <div className="flex justify-between text-xs"><span>Std</span><span>{advInputs.baseStd}</span></div>
                            <div className="flex justify-between text-xs font-bold border-t pt-1 mt-1"><span>My</span><span>{advInputs.baseMyPrice}</span></div>
                            <div className="mt-2 text-center">
                              <span className="bg-slate-100 text-slate-600 text-[10px] px-2 py-1 rounded font-bold">Z: {advResult.zBase > 0 ? '+' : ''}{advResult.zBase.toFixed(2)}σ</span>
                            </div>
                          </div>
                          <div className="bg-purple-50 p-3 rounded border border-purple-200">
                            <div className="text-xs font-bold text-purple-500 mb-2">평가 연도</div>
                            <div className="flex justify-between text-xs"><span>Mean</span><input className="w-16 text-right bg-transparent border-b border-purple-300" value={advInputs.evalMean} onChange={e => setAdvInputs({ ...advInputs, evalMean: Number(e.target.value) })} /></div>
                            <div className="flex justify-between text-xs"><span>Std</span><input className="w-16 text-right bg-transparent border-b border-purple-300" value={advInputs.evalStd} onChange={e => setAdvInputs({ ...advInputs, evalStd: Number(e.target.value) })} /></div>
                            <div className="flex justify-between text-xs font-bold border-t border-purple-200 pt-1 mt-1"><span>My</span><input className="w-16 text-right bg-transparent font-bold" value={advInputs.evalMyPrice} onChange={e => setAdvInputs({ ...advInputs, evalMyPrice: Number(e.target.value) })} /></div>
                            <div className="mt-2 text-center">
                              <span className="bg-white border border-purple-200 text-purple-600 text-[10px] px-2 py-1 rounded font-bold shadow-sm">Z: {advResult.zEval > 0 ? '+' : ''}{advResult.zEval.toFixed(2)}σ</span>
                            </div>
                          </div>
                        </div>
                        <div><label className="text-xs font-bold text-slate-500">물량 ({unit})</label><input type="number" value={advInputs.volume} onChange={e => setAdvInputs({ ...advInputs, volume: Number(e.target.value) })} className="w-full p-2 mt-1 border rounded-lg bg-white" /></div>
                        <div className="bg-slate-900 text-white p-4 rounded-lg text-center flex flex-wrap justify-center items-center gap-3 text-sm">
                          <div className="min-w-0"><div className="text-slate-400 text-[10px] mb-1">개선폭(ΔZ)</div><div className="font-bold text-yellow-400 text-lg">{advResult.deltaZ > 0 ? '+' : ''}{advResult.deltaZ.toFixed(2)}σ</div></div>
                          <div className="text-slate-500">×</div>
                          <div className="min-w-0"><div className="text-slate-400 text-[10px] mb-1">가치(σ_eval)</div><div className="font-bold text-slate-200 text-lg">${advInputs.evalStd}</div></div>
                          <div className="text-slate-500">=</div>
                          <div className="min-w-0"><div className="text-slate-400 text-[10px] mb-1">단위인정액</div><div className="font-bold text-green-400 text-lg">${advResult.unitSaving.toFixed(2)}</div></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* AI Strategy Advisor */}
                  <div className="mt-6 border-t pt-6">
                    <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2"><Sparkles size={18} className="text-indigo-500" /> AI 전략 어드바이저</h3>
                    <div className="flex gap-3 mb-3">
                      <input type="text" value={clientContext} onChange={e => setClientContext(e.target.value)} placeholder="고객 상황을 입력하세요 (예: 스타트업, 비용 민감, 첫 거래)" className="flex-1 p-3 border rounded-lg text-sm bg-white" />
                      <button onClick={handleAskAIStrategy} disabled={aiLoading} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 disabled:opacity-50 hover:bg-indigo-700">
                        {aiLoading ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />} 분석
                      </button>
                    </div>
                    {aiStrategyResponse && (
                      <div className="border border-indigo-200 rounded-lg bg-indigo-50 overflow-hidden">
                        <div className="flex justify-between items-center p-2 px-3 bg-indigo-100 cursor-pointer" onClick={() => setIsAiStrategyOpen(!isAiStrategyOpen)}>
                          <span className="text-xs font-bold text-indigo-700">AI 전략 추천 결과</span>
                          {isAiStrategyOpen ? <ChevronUp size={14} className="text-indigo-500" /> : <ChevronDown size={14} className="text-indigo-500" />}
                        </div>
                        {isAiStrategyOpen && <div className="p-3 text-xs text-indigo-900 leading-relaxed whitespace-pre-line">{aiStrategyResponse}</div>}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Result Dashboard */}
              <div className="lg:col-span-4 min-w-0">
                <div className="bg-slate-900 text-white rounded-2xl shadow-xl p-6 h-full flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
                  <div>
                    <div className="flex items-center gap-2 mb-6"><Activity size={20} className="text-green-400" /><h3 className="font-bold text-lg">최종 수익성 분석</h3></div>
                    <div className="space-y-6">
                      <div className="flex justify-between items-end border-b border-slate-700 pb-3 gap-2">
                        <div className="min-w-0"><div className="text-xs text-slate-400 mb-1">확정 고정비</div><div className="text-xl font-bold truncate">{fmtUSD(effectiveBaseFee)}</div></div>
                        <div className="text-xs bg-slate-800 px-2 py-1 rounded whitespace-nowrap">{currentModel.name}</div>
                      </div>
                      <div className="flex justify-between items-end border-b border-slate-700 pb-3 gap-2">
                        <div className="min-w-0"><div className="text-xs text-slate-400 mb-1">총 절감 인정액</div><div className="text-xl font-bold text-green-400 truncate">{fmtUSD(activeTab === 'standard' ? stdResult.totalSaving : advResult.totalSaving)}</div></div>
                        <div className="text-right shrink-0"><div className="text-[10px] text-slate-500">Logic</div><div className="text-xs font-bold text-green-600">{activeTab === 'standard' ? 'Standard' : 'Z-Score'}</div></div>
                      </div>
                      <div className="flex justify-between items-end border-b border-slate-700 pb-3 gap-2">
                        <div className="min-w-0">
                          <div className="text-xs text-slate-400 mb-1 flex items-center gap-1">성과급 {(activeTab === 'standard' ? stdResult.isCapped : advResult.isCapped) && <span className="text-[10px] text-orange-400 bg-orange-900/50 px-1 rounded shrink-0">CAP</span>}</div>
                          <div className="text-2xl font-bold text-blue-400 truncate">{fmtUSD(activeTab === 'standard' ? stdResult.successFee : advResult.successFee)}</div>
                          {(activeTab === 'standard' ? stdResult.isCapped : advResult.isCapped) && <div className="text-[10px] text-slate-500 mt-1">Max: {fmtUSD(standardPrice * 3)}</div>}
                        </div>
                        <div className="text-right shrink-0"><div className="text-[10px] text-slate-500">요율</div><div className="text-xs font-bold text-blue-500">{Math.round(effectiveSuccessRate * 100)}%</div></div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button onClick={() => handleGenerateProposal({
                      modelName: currentModel.name, baseFee: fmtUSD(effectiveBaseFee),
                      savings: fmtUSD(activeTab === 'standard' ? stdResult.totalSaving : advResult.totalSaving),
                      successFee: fmtUSD(activeTab === 'standard' ? stdResult.successFee : advResult.successFee),
                      totalCost: fmtUSD(activeTab === 'standard' ? stdResult.totalRevenue : advResult.totalRevenue)
                    })} disabled={aiLoading} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 mb-3 shadow-lg disabled:opacity-50">
                      {aiLoading ? <Loader2 className="animate-spin" size={16} /> : <FileText size={16} />} AI 제안서 생성
                    </button>
                    {aiProposalResponse && (
                      <div className="border border-slate-700 rounded-lg bg-slate-800/50 overflow-hidden">
                        <div className="flex justify-between items-center p-2 px-3 bg-slate-800 cursor-pointer" onClick={() => setIsAiProposalOpen(!isAiProposalOpen)}>
                          <span className="text-xs font-bold text-slate-300">제안서 요약 내용</span>
                          {isAiProposalOpen ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
                        </div>
                        {isAiProposalOpen && <div className="p-3 text-xs text-slate-300 leading-relaxed whitespace-pre-line break-words">{aiProposalResponse}</div>}
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-700 flex justify-between items-center gap-2">
                    <span className="text-sm font-bold text-slate-300 uppercase shrink-0">Total Cost</span>
                    <span className="text-3xl font-extrabold text-white truncate">{fmtUSD(activeTab === 'standard' ? stdResult.totalRevenue : advResult.totalRevenue)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================
// ROOT APP
// ============================================================
const App = () => {
  const [auth, setAuth] = useState(
    () => sessionStorage.getItem('calc_auth') === 'true'
  );
  const [view, setView] = useState('home');

  if (!auth) {
    return <PasswordGate onSuccess={() => setAuth(true)} />;
  }

  if (view === 'vbm') return <VBMCalculator onBack={() => setView('home')} />;
  if (view === 'vsm') return <VSMCalculator onBack={() => setView('home')} />;
  if (view === 'fee') return <SuccessFeeCalculator onBack={() => setView('home')} />;

  return <HomeScreen onSelect={setView} />;
};

export default App;
