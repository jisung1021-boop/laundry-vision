import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, X, RefreshCw, Sparkles, ArrowRight, Check, AlertCircle, FileText } from 'lucide-react';

export default function ImageUploader({
  selectedImage,
  previewUrl,
  selectedSample,
  samples = [],
  isAnalyzing,
  analysisStep,
  onImageSelected,
  onSampleSelected,
  onClearImage,
  onStartAnalysis
}) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFileChange(file);
    }
  };

  const handleFileChange = (file) => {
    if (!file) return;

    // Check if image
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일(JPG, PNG, WEBP 등)만 업로드할 수 있습니다.');
      return;
    }

    // Check size (< 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('이미지 용량이 너무 큽니다. 10MB 이하의 이미지를 업로드해주세요.');
      return;
    }

    onImageSelected(file);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const hasImage = Boolean(selectedImage || selectedSample || previewUrl);

  return (
    <div className="w-full space-y-6">
      {/* Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative overflow-hidden rounded-3xl border-2 border-dashed transition-all duration-200 ${
          isDragOver
            ? 'border-brand-500 bg-brand-50/70 scale-[1.01]'
            : hasImage
            ? 'border-brand-200 bg-white shadow-soft'
            : 'border-slate-300 bg-white hover:border-brand-400 hover:bg-slate-50/50 shadow-soft'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFileChange(e.target.files[0]);
            }
          }}
        />

        {hasImage ? (
          /* Preview Mode */
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Image Preview Box */}
              <div className="relative group w-full sm:w-60 h-64 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200/80 shadow-inner flex items-center justify-center shrink-0">
                <img
                  src={previewUrl}
                  alt="업로드된 세탁 라벨"
                  className="w-full h-full object-contain p-2"
                />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={triggerFileInput}
                    className="p-2.5 bg-white text-slate-800 rounded-xl hover:bg-slate-100 shadow font-semibold text-xs flex items-center gap-1.5 transition-transform active:scale-95"
                    title="다른 사진으로 변경"
                  >
                    <RefreshCw className="w-4 h-4 text-brand-600" />
                    <span>재선택</span>
                  </button>
                  <button
                    onClick={onClearImage}
                    className="p-2.5 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 shadow font-semibold text-xs flex items-center gap-1.5 transition-transform active:scale-95"
                    title="이미지 삭제"
                  >
                    <X className="w-4 h-4" />
                    <span>삭제</span>
                  </button>
                </div>
              </div>

              {/* Image Info & Action */}
              <div className="flex-1 w-full space-y-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold mb-2">
                    <Check className="w-3.5 h-3.5" /> 이미지 준비 완료
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">
                    {selectedSample ? selectedSample.title : selectedImage?.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {selectedSample 
                      ? selectedSample.material 
                      : `${((selectedImage?.size || 0) / 1024).toFixed(1)} KB · ${(selectedImage?.type || 'image').toUpperCase()}`
                    }
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-1">
                  <p className="font-semibold text-slate-800">💡 팁:</p>
                  <p>세탁 라벨의 5대 기호(물세탁, 표백, 건조, 다림질, 드라이클리닝)가 선명할수록 정확한 판독이 가능합니다.</p>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={onStartAnalysis}
                    disabled={isAnalyzing}
                    className="flex-1 min-w-[200px] py-3.5 px-6 rounded-2xl bg-gradient-to-r from-brand-600 to-sky-500 hover:from-brand-700 hover:to-sky-600 text-white font-bold text-sm sm:text-base shadow-lg shadow-brand-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isAnalyzing ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        <span>{analysisStep || 'Gemini AI 정밀 분석 중...'}</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        <span>세탁 기호 분석 시작</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </button>

                  <button
                    onClick={triggerFileInput}
                    disabled={isAnalyzing}
                    className="px-4 py-3.5 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-colors"
                  >
                    다른 사진 선택
                  </button>

                  <button
                    onClick={onClearImage}
                    disabled={isAnalyzing}
                    className="p-3.5 rounded-2xl border border-slate-200 hover:bg-rose-50 hover:text-rose-600 text-slate-400 transition-colors"
                    title="이미지 비우기"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Empty / Drop Zone */
          <div className="p-8 sm:p-14 text-center">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-brand-50 text-brand-600 border border-brand-100 flex items-center justify-center shadow-sm mb-5 group-hover:scale-105 transition-transform">
              <Upload className="w-10 h-10 text-brand-600" />
            </div>

            <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl mb-2">
              세탁 라벨 사진을 이곳에 끌어다 놓으세요
            </h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto mb-6 leading-relaxed">
              스마트폰 카메라로 옷 안쪽의 세탁 취급 라벨을 촬영하여 업로드하면 AI가 기호를 분석해 드립니다.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={triggerFileInput}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <ImageIcon className="w-4 h-4" />
                <span>내 PC / 폰에서 사진 선택</span>
              </button>
            </div>

            <p className="text-xs text-slate-400 mt-4">
              지원 형식: JPG, PNG, WEBP, GIF (최대 10MB)
            </p>
          </div>
        )}
      </div>

      {/* Quick Sample Selector */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-600" />
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              촬영한 사진이 없으신가요? 표준 샘플 라벨로 바로 체험해보세요
            </h4>
          </div>
          <span className="text-[11px] text-slate-400 hidden sm:inline">클릭 시 자동 선택</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {samples.map((sample) => {
            const isSelected = selectedSample?.id === sample.id;
            return (
              <button
                key={sample.id}
                onClick={() => onSampleSelected(sample)}
                disabled={isAnalyzing}
                className={`p-3.5 rounded-2xl border text-left transition-all duration-200 group flex items-start gap-3 ${
                  isSelected
                    ? 'border-brand-500 bg-brand-50/60 ring-2 ring-brand-500/20 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-brand-300 hover:bg-slate-50/60 shadow-sm'
                }`}
              >
                <div className="w-12 h-14 rounded-xl bg-slate-100 border border-slate-200/60 shrink-0 overflow-hidden flex items-center justify-center p-1 group-hover:scale-105 transition-transform">
                  <img src={sample.image} alt={sample.title} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                    {sample.material.split('(')[0]}
                  </span>
                  <h5 className="font-bold text-xs text-slate-800 truncate mt-1 group-hover:text-brand-600 transition-colors">
                    {sample.title}
                  </h5>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">
                    {sample.summary}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
