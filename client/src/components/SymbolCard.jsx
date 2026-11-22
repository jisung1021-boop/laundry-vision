import React from 'react';
import { CheckCircle2, AlertTriangle, ShieldCheck, HelpCircle } from 'lucide-react';
import LaundryIcon from './LaundryIcon';

export default function SymbolCard({ symbol, index }) {
  if (!symbol) return null;

  const categoryStyles = {
    wash: {
      badge: 'bg-blue-100 text-blue-800 border-blue-200',
      iconBox: 'bg-blue-50 text-blue-600 border-blue-100',
      accent: 'border-l-blue-500',
      tag: '물세탁'
    },
    bleach: {
      badge: 'bg-purple-100 text-purple-800 border-purple-200',
      iconBox: 'bg-purple-50 text-purple-600 border-purple-100',
      accent: 'border-l-purple-500',
      tag: '표백'
    },
    dry: {
      badge: 'bg-amber-100 text-amber-800 border-amber-200',
      iconBox: 'bg-amber-50 text-amber-600 border-amber-100',
      accent: 'border-l-amber-500',
      tag: '건조'
    },
    iron: {
      badge: 'bg-orange-100 text-orange-800 border-orange-200',
      iconBox: 'bg-orange-50 text-orange-600 border-orange-100',
      accent: 'border-l-orange-500',
      tag: '다림질'
    },
    dryclean: {
      badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      iconBox: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      accent: 'border-l-emerald-500',
      tag: '드라이클리닝'
    }
  };

  const style = categoryStyles[symbol.category] || categoryStyles.wash;

  // Confidence badge mapping
  const confidenceConfig = {
    high: { label: '신뢰도 높음', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    medium: { label: '신뢰도 보통', color: 'bg-sky-50 text-sky-700 border-sky-200' },
    low: { label: '신뢰도 낮음', color: 'bg-amber-50 text-amber-700 border-amber-200' },
    unclear: { label: '인식 불확실', color: 'bg-rose-50 text-rose-700 border-rose-200' }
  };

  const conf = confidenceConfig[symbol.confidence] || confidenceConfig.high;

  return (
    <div className={`bg-white rounded-2xl border border-slate-200/90 border-l-4 ${style.accent} p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between`}>
      <div>
        {/* Top bar: Category + Confidence */}
        <div className="flex items-center justify-between mb-3.5">
          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${style.badge}`}>
            {symbol.categoryName || style.tag}
          </span>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${conf.color} flex items-center gap-1`}>
            {symbol.confidence === 'unclear' ? (
              <HelpCircle className="w-3 h-3" />
            ) : (
              <ShieldCheck className="w-3 h-3" />
            )}
            {conf.label}
          </span>
        </div>

        {/* Symbol Icon & Name Header */}
        <div className="flex items-start gap-3.5 mb-4">
          <div className={`w-14 h-14 rounded-xl border flex items-center justify-center shrink-0 p-1 ${style.iconBox}`}>
            <LaundryIcon code={symbol.iconCode || symbol.symbolName} size={38} className="w-10 h-10" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-slate-900 text-base leading-snug break-keep">
              {symbol.symbolName || '기호'}
            </h4>
            <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
              {symbol.meaning || '해당 세탁 기호에 대한 표준 가이드입니다.'}
            </p>
          </div>
        </div>

        {/* Recommendation Box */}
        {symbol.recommendation && (
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 mb-2.5">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold text-slate-800">권장 세탁법: </span>
                <span className="text-slate-600">{symbol.recommendation}</span>
              </div>
            </div>
          </div>
        )}

        {/* Caution Box */}
        {symbol.caution && (
          <div className="bg-rose-50/70 rounded-xl p-3 border border-rose-100">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold text-rose-900">주의사항: </span>
                <span className="text-rose-700">{symbol.caution}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
