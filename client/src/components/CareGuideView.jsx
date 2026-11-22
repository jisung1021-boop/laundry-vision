import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, BookOpen, Filter, CheckCircle2, AlertTriangle, Sparkles, Layers } from 'lucide-react';
import LaundryIcon from './LaundryIcon';
import { fetchCareGuide } from '../utils/api';

export default function CareGuideView() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [symbols, setSymbols] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', label: '전체 보기', color: 'bg-slate-100 text-slate-800' },
    { id: 'wash', label: '물세탁', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { id: 'bleach', label: '표백', color: 'bg-purple-50 text-purple-700 border-purple-200' },
    { id: 'dry', label: '건조', color: 'bg-amber-50 text-amber-700 border-amber-200' },
    { id: 'iron', label: '다림질', color: 'bg-orange-50 text-orange-700 border-orange-200' },
    { id: 'dryclean', label: '드라이클리닝', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  ];

  useEffect(() => {
    loadGuideData();
  }, [selectedCategory, searchQuery]);

  const loadGuideData = async () => {
    setLoading(true);
    try {
      const data = await fetchCareGuide(selectedCategory, searchQuery);
      setSymbols(data.symbols || []);
    } catch (err) {
      console.error('Failed to fetch guide data:', err);
    } finally {
      setLoading(false);
    }
  };

  const categoryAccentColors = {
    wash: 'border-l-blue-500 text-blue-600 bg-blue-50',
    bleach: 'border-l-purple-500 text-purple-600 bg-purple-50',
    dry: 'border-l-amber-500 text-amber-600 bg-amber-50',
    iron: 'border-l-orange-500 text-orange-600 bg-orange-50',
    dryclean: 'border-l-emerald-500 text-emerald-600 bg-emerald-50'
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-brand-600 to-sky-600 rounded-3xl p-6 sm:p-10 text-white shadow-soft">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-bold uppercase tracking-wider text-white">
            <BookOpen className="w-3.5 h-3.5" /> 표준 세탁 기호 백과사전
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            올바른 세탁 기호 가이드 (KS &amp; ISO)
          </h2>
          <p className="text-sm sm:text-base text-brand-100 leading-relaxed">
            국가기술표준원(KS K 0021) 및 국제표준화기구(ISO 3758) 기준의 세탁 기호 5대 카테고리별 의미와 올바른 사용법, 파손 방지 주의사항을 한눈에 찾아보세요.
          </p>
        </div>

        {/* Quick Reading Tip Card */}
        <div className="mt-6 pt-6 border-t border-white/20 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
            <span className="font-extrabold block text-sm mb-0.5">점(·)의 개수</span>
            <span className="text-brand-100">온도 높이를 의미 (● 110℃ / ●● 150℃ / ●●● 200℃)</span>
          </div>
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
            <span className="font-extrabold block text-sm mb-0.5">밑줄(_) 개수</span>
            <span className="text-brand-100">세탁 강도의 약함 표시 (1줄 약하게, 2줄 매우 약하게)</span>
          </div>
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
            <span className="font-extrabold block text-sm mb-0.5">사선(//) 표시</span>
            <span className="text-brand-100">직사광선을 피한 그늘 건조를 의미</span>
          </div>
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
            <span className="font-extrabold block text-sm mb-0.5">X 표시</span>
            <span className="text-brand-100">해당 세탁 및 가공 행위 엄격 금지</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="기호 이름, 온도, 원단, 키워드로 검색 (예: 40도, 손세탁, 표백금지, 건조기, 스팀, 드라이)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Symbols List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-slate-500 font-medium">
            총 <strong className="text-slate-800 font-bold">{symbols.length}개</strong>의 세탁 기호가 등록되어 있습니다.
          </p>
        </div>

        {loading ? (
          <div className="py-20 text-center">
            <div className="w-8 h-8 border-3 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-xs text-slate-500">세탁 기호 가이드 불러오는 중...</p>
          </div>
        ) : symbols.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/90 shadow-sm space-y-3">
            <Filter className="w-10 h-10 text-slate-300 mx-auto" />
            <h4 className="font-bold text-slate-800">검색 결과가 없습니다</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              '{searchQuery}'에 해당하는 세탁 기호를 찾지 못했습니다. 다른 검색어로 다시 시도해보세요.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="mt-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors"
            >
              전체 기호 목록 보기
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {symbols.map((item) => {
              const accent = categoryAccentColors[item.category] || categoryAccentColors.wash;
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    {/* Category & Code */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {item.categoryName}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {item.standard}
                      </span>
                    </div>

                    {/* Icon + Title */}
                    <div className="flex items-start gap-3.5 mb-4">
                      <div className={`w-14 h-14 rounded-xl border flex items-center justify-center shrink-0 p-1 ${accent}`}>
                        <LaundryIcon code={item.code} size={38} className="w-10 h-10" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-900 text-base leading-snug break-keep">
                          {item.name}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                          {item.meaning}
                        </p>
                      </div>
                    </div>

                    {/* How to use (Guide) */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 mb-2.5 space-y-1">
                      <div className="flex items-start gap-1.5 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-slate-800">사용 방법: </span>
                          <span>{item.guide}</span>
                        </div>
                      </div>
                    </div>

                    {/* Cautions */}
                    <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-100 text-xs text-rose-800 space-y-1">
                      <div className="flex items-start gap-1.5 font-medium">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-rose-900">주의사항: </span>
                          <span>{item.cautions}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Keyword Tags */}
                  {item.keywords && (
                    <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap gap-1">
                      {item.keywords.map((kw, idx) => (
                        <span key={idx} className="text-[10px] text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded">
                          #{kw}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
