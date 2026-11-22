import React, { useState } from 'react';
import { X, Key, CheckCircle, AlertTriangle, ExternalLink, ShieldCheck } from 'lucide-react';
import { updateApiKey } from '../utils/api';

export default function ApiKeyModal({ isOpen, onClose, config, onConfigUpdated }) {
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!apiKeyInput.trim()) {
      setError('Gemini API 키를 입력해주세요.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const res = await updateApiKey(apiKeyInput.trim());
      setSuccessMsg(res.message);
      setApiKeyInput('');
      if (onConfigUpdated) {
        onConfigUpdated();
      }
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      setError(err.message || 'API 키를 등록하지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-100 text-brand-600 flex items-center justify-center font-bold">
              <Key className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Gemini API 키 설정</h3>
              <p className="text-xs text-slate-500">Google Gemini 비전 AI 실시간 분석 연동</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Current Status Banner */}
          <div className={`p-4 rounded-xl border flex items-start gap-3 ${
            config?.hasGeminiKey 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
              : 'bg-amber-50 border-amber-200 text-amber-900'
          }`}>
            {config?.hasGeminiKey ? (
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            )}
            <div className="text-xs leading-relaxed">
              <p className="font-bold text-sm mb-0.5">
                {config?.hasGeminiKey ? '실시간 Gemini AI 분석 모드 가동 중' : '현재 데모/테스트 모드로 동작 중'}
              </p>
              {config?.hasGeminiKey ? (
                <p>Gemini 비전 AI가 실제 업로드된 세탁 라벨 이미지를 분석하여 기호를 정밀 판독합니다. (마스킹 키: <code className="bg-emerald-100 px-1 py-0.5 rounded font-mono">{config.maskedKey}</code>)</p>
              ) : (
                <p>백엔드 <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">.env</code> 파일에 유효한 Gemini API 키가 없습니다. API 키를 등록하면 실제 Gemini 비전 AI 분석이 즉시 활성화됩니다.</p>
              )}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Google Gemini API Key 입력
              </label>
              <input
                type="password"
                placeholder="AIzaSy..."
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all font-mono"
              />
            </div>

            {error && (
              <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-100">
                {error}
              </p>
            )}

            {successMsg && (
              <p className="text-xs text-emerald-700 bg-emerald-50 p-2.5 rounded-lg border border-emerald-100 flex items-center gap-1.5 font-medium">
                <CheckCircle className="w-4 h-4" /> {successMsg}
              </p>
            )}

            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-brand-600 hover:text-brand-700 font-medium hover:underline"
              >
                Google AI Studio에서 무료 API 키 받기 <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                닫기
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 active:scale-[0.98] rounded-xl shadow-sm transition-all disabled:opacity-50"
              >
                {loading ? '검증 및 등록 중...' : 'API 키 저장 및 활성화'}
              </button>
            </div>
          </form>

          {/* Privacy Note */}
          <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0" />
            <span>API 키는 서버의 보안 환경 변수(.env)로만 관리되며 프론트엔드 코드에 노출되지 않습니다.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
