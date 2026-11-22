import React, { useState, useEffect } from 'react';
import { History, Trash2, Calendar, Eye, Sparkles, AlertTriangle, ArrowRight, X, ExternalLink, CheckCircle } from 'lucide-react';
import { fetchHistory, deleteHistoryRecord, clearAllHistoryRecords } from '../utils/api';
import SymbolCard from './SymbolCard';

export default function HistoryView({ onNavigateToHome }) {
  const [historyList, setHistoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setLoading(true);
    try {
      const data = await fetchHistory();
      setHistoryList(data.history || []);
    } catch (err) {
      console.error('Failed to load history:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('이 분석 기록을 영구히 삭제하시겠습니까?')) {
      return;
    }

    setDeletingId(id);
    try {
      await deleteHistoryRecord(id);
      setHistoryList(prev => prev.filter(item => item.id !== id));
      if (selectedRecord && selectedRecord.id === id) {
        setSelectedRecord(null);
      }
    } catch (err) {
      alert(err.message || '삭제 중 오류가 발생했습니다.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleClearAll = async () => {
    if (historyList.length === 0) return;
    if (!window.confirm('모든 분석 기록을 초기화하시겠습니까? 삭제된 기록은 복구할 수 없습니다.')) {
      return;
    }

    try {
      await clearAllHistoryRecords();
      setHistoryList([]);
      setSelectedRecord(null);
    } catch (err) {
      alert(err.message || '초기화 중 오류가 발생했습니다.');
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return '';
    try {
      const d = new Date(isoString);
      return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    } catch {
      return isoString;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold mb-2">
            <History className="w-3.5 h-3.5" /> SQLite 데이터베이스 보관함
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            내 세탁 라벨 분석 기록
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            분석했던 모든 의류 케어 라벨의 기호와 세탁 가이드가 브라우저를 새로고침해도 영구 보관됩니다.
          </p>
        </div>

        {historyList.length > 0 && (
          <button
            onClick={handleClearAll}
            className="px-4 py-2 rounded-xl border border-slate-200 text-slate-500 hover:text-rose-600 hover:bg-rose-50 text-xs font-semibold flex items-center gap-1.5 transition-colors self-end sm:self-center"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>모든 기록 비우기</span>
          </button>
        )}
      </div>

      {/* Content */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="w-8 h-8 border-3 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-xs text-slate-500">저장된 기록을 불러오는 중...</p>
        </div>
      ) : historyList.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-3xl p-12 sm:p-16 text-center border border-slate-200/90 shadow-card space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 border border-brand-100 flex items-center justify-center mx-auto">
            <History className="w-8 h-8" />
          </div>
          <div className="space-y-1.5 max-w-sm mx-auto">
            <h3 className="font-extrabold text-slate-900 text-lg">아직 저장된 분석 기록이 없습니다</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              옷의 세탁 라벨을 사진으로 찍어 분석한 후, '결과 저장' 버튼을 누르면 여기에 언제든지 다시 꺼내볼 수 있도록 저장됩니다.
            </p>
          </div>
          <div className="pt-2">
            <button
              onClick={onNavigateToHome}
              className="px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-500/20 active:scale-[0.98] transition-all inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>첫 번째 세탁 라벨 분석하기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* History Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {historyList.map((item) => {
            const result = item.analysis_result || {};
            const symbols = result.symbols || [];

            return (
              <div
                key={item.id}
                onClick={() => setSelectedRecord(item)}
                className="group bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-card hover:border-brand-300 transition-all duration-200 overflow-hidden cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar */}
                  <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{formatDate(item.created_at)}</span>
                    </div>

                    <button
                      onClick={(e) => handleDelete(item.id, e)}
                      disabled={deletingId === item.id}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="기록 삭제"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Body with Thumbnail & Summary */}
                  <div className="p-5 space-y-3.5">
                    <div className="flex items-start gap-3.5">
                      {/* Image Thumbnail */}
                      <div className="w-16 h-20 bg-slate-100 rounded-xl border border-slate-200/80 overflow-hidden shrink-0 flex items-center justify-center p-1 group-hover:scale-105 transition-transform">
                        {item.image_path ? (
                          <img
                            src={item.image_path}
                            alt={item.image_name}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <History className="w-6 h-6 text-slate-400" />
                        )}
                      </div>

                      {/* Title & Fabric */}
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200/80">
                          {result.fabricInfo || '원단 미표시'}
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm truncate mt-1 group-hover:text-brand-600 transition-colors">
                          {item.image_name}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                          {result.overallSummary || '세탁 가이드'}
                        </p>
                      </div>
                    </div>

                    {/* Detected Symbols Badges */}
                    {symbols.length > 0 && (
                      <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
                        {symbols.slice(0, 4).map((sym, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600"
                          >
                            {sym.categoryName}: {sym.symbolName.split('(')[0]}
                          </span>
                        ))}
                        {symbols.length > 4 && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-brand-50 text-brand-600">
                            +{symbols.length - 4}개 더
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer Button */}
                <div className="px-5 py-3 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-brand-600 group-hover:text-brand-700">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" /> 상세 분석 보기
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detail Record Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-100 text-brand-600 flex items-center justify-center font-bold">
                  <History className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    {selectedRecord.image_name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    분석 일시: {formatDate(selectedRecord.created_at)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => handleDelete(selectedRecord.id, e)}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                  title="기록 삭제"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Image & Summary */}
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                {selectedRecord.image_path && (
                  <div className="w-full sm:w-56 h-60 bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center p-2 shadow-inner">
                    <img
                      src={selectedRecord.image_path}
                      alt={selectedRecord.image_name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}

                <div className="flex-1 space-y-4">
                  <div className="p-4 rounded-2xl bg-brand-50/70 border border-brand-100">
                    <h5 className="text-xs font-bold text-brand-900 uppercase tracking-wider mb-1.5">
                      전체 세탁 방법 종합 요약
                    </h5>
                    <p className="text-sm font-medium text-slate-800 leading-relaxed">
                      {selectedRecord.analysis_result?.overallSummary}
                    </p>
                  </div>

                  {selectedRecord.analysis_result?.keyCautions && (
                    <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
                      <h5 className="text-xs font-bold text-rose-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-rose-600" /> 주의해야 할 세탁 방법
                      </h5>
                      <ul className="space-y-1 text-xs text-rose-800 font-medium">
                        {selectedRecord.analysis_result.keyCautions.map((c, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"></span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Symbols Grid */}
              <div>
                <h4 className="font-extrabold text-slate-900 text-base mb-3">
                  인식된 세탁 기호 상세 정보
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(selectedRecord.analysis_result?.symbols || []).map((sym, idx) => (
                    <SymbolCard key={idx} symbol={sym} index={idx} />
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end">
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
