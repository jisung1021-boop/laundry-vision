 import React from 'react';
import { Sparkles, Camera, ShieldCheck, Heart, Layers, CheckCircle2, ArrowRight, Smartphone, Cpu, Database } from 'lucide-react';

export default function AboutView({ onStartNow }) {
  return (
    <div className="space-y-12 animate-fadeIn max-w-5xl mx-auto">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-brand-600" />
          <span>ABOUT LAUNDRY VISION</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          소중한 옷을 망치지 않는<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-sky-500">
            가장 스마트한 AI 세탁 가이드
          </span>
        </h2>
        <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          옷 안쪽에 부착된 세탁 라벨은 수많은 기호로 복잡하게 쓰여 있어 지나치기 쉽습니다.<br className="hidden sm:inline" />
          잘못된 세탁 한번으로 아끼는 니트가 줄어들거나 고어텍스 방수 재킷이 망가지는 일을 방지합니다.
        </p>
      </div>

      {/* 3 Core Value Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-soft space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-slate-900 text-lg">최신 Gemini 비전 AI</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Google의 멀티모달 비전 모델을 활용하여 라벨 사진 속 흐릿하거나 기울어진 세탁 기호까지 고정밀도로 식별합니다.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-soft space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-slate-900 text-lg">위험 요인 사전 방지</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            건조기 사용 금지, 표백 금지, 스팀 다림질 불가 등 원단을 영구 손상시킬 수 있는 치명적 주의사항을 최우선으로 경고합니다.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-soft space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Database className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-slate-900 text-lg">안전한 데이터 보관</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            분석한 세탁 기록은 SQLite 데이터베이스에 영구 보관되어 브라우저를 닫거나 새로고침해도 옷장 속 옷들의 관리법을 언제든 조회할 수 있습니다.
          </p>
        </div>
      </div>

      {/* Photography Guide Section */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-soft">
        <div className="max-w-2xl mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold">
            <Camera className="w-3.5 h-3.5" /> 꿀팁 안내
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900">
            인식률 100%를 위한 세탁 라벨 촬영법
          </h3>
          <p className="text-xs text-slate-500">
            더 선명하고 정확한 판독을 위해 아래 3가지 수칙을 지켜 촬영해주세요.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
            <div className="w-8 h-8 rounded-full bg-brand-600 text-white font-bold text-xs flex items-center justify-center">1</div>
            <h4 className="font-bold text-slate-900 text-sm">라벨을 평평하게 펴기</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              접히거나 말려 있는 라벨은 손가락으로 가리지 않게 살짝 펴서 기호가 온전히 보이도록 해주세요.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
            <div className="w-8 h-8 rounded-full bg-brand-600 text-white font-bold text-xs flex items-center justify-center">2</div>
            <h4 className="font-bold text-slate-900 text-sm">밝은 조명 아래서 수평 촬영</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              스마트폰 카메라 그림자가 기호를 가리지 않도록 비스듬하지 않고 정면에서 수평으로 찍어주세요.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
            <div className="w-8 h-8 rounded-full bg-brand-600 text-white font-bold text-xs flex items-center justify-center">3</div>
            <h4 className="font-bold text-slate-900 text-sm">초점을 기호에 맞추기</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              흐릿하게 블러 처리되지 않도록 화면의 세탁 기호 부분을 터치해 선명하게 초점을 잡으세요.
            </p>
          </div>
        </div>
      </div>

      {/* Standards Section */}
      <div className="bg-slate-900 rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl text-center md:text-left">
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded bg-brand-500/20 text-brand-300 border border-brand-500/30">
            OFFICIAL COMPLIANCE
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            공식 표준 규격(KS K 0021 &amp; ISO 3758) 연동
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            국내 유통 의류뿐만 아니라 해외 직구 및 명품 의류의 유럽/미국/일본 국제 규격 기호까지 표준 데이터베이스를 기반으로 정확하게 분석합니다.
          </p>
        </div>

        <button
          onClick={onStartNow}
          className="px-6 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-lg shadow-brand-500/25 active:scale-95 transition-all flex items-center gap-2 shrink-0"
        >
          <span>지금 세탁 라벨 분석하기</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
