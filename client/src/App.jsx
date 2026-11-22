import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ImageUploader from './components/ImageUploader';
import AnalysisResult from './components/AnalysisResult';
import CareGuideView from './components/CareGuideView';
import HistoryView from './components/HistoryView';
import AboutView from './components/AboutView';
import ApiKeyModal from './components/ApiKeyModal';

import { 
  fetchApiConfig, 
  fetchSamples, 
  analyzeCareLabel, 
  fetchHistory, 
  saveAnalysisRecord 
} from './utils/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [config, setConfig] = useState(null);
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);
  const [samples, setSamples] = useState([]);
  const [historyCount, setHistoryCount] = useState(0);

  // Analyzer States
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSample, setSelectedSample] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState('');
  const [analysisData, setAnalysisData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const cfg = await fetchApiConfig();
      setConfig(cfg);
    } catch (e) {
      console.warn('API config load error:', e.message);
    }

    try {
      const sampleRes = await fetchSamples();
      setSamples(sampleRes.samples || []);
    } catch (e) {
      console.warn('Samples load error:', e.message);
    }

    try {
      const histRes = await fetchHistory();
      setHistoryCount(histRes.history?.length || 0);
    } catch (e) {
      console.warn('History count load error:', e.message);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Handle user uploaded image
  const handleImageSelected = (file) => {
    setSelectedImage(file);
    setSelectedSample(null);
    setAnalysisData(null);
    setIsSaved(false);
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  // Handle sample label selected
  const handleSampleSelected = (sample) => {
    setSelectedSample(sample);
    setSelectedImage(null);
    setAnalysisData(null);
    setIsSaved(false);
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(sample.image);
  };

  // Clear current image
  const handleClearImage = () => {
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedImage(null);
    setSelectedSample(null);
    setPreviewUrl(null);
    setAnalysisData(null);
    setIsSaved(false);
  };

  // Start analysis
  const handleStartAnalysis = async () => {
    if (!selectedImage && !selectedSample) {
      alert('분석할 세탁 라벨 사진을 먼저 업로드하거나 샘플을 선택해주세요.');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisData(null);
    setIsSaved(false);

    // Multi-step progress simulation for realistic visual feedback
    setAnalysisStep('1. 라벨 이미지 전처리 중...');
    const stepTimer1 = setTimeout(() => {
      setAnalysisStep('2. Gemini 비전 AI 기호 정밀 판독 중...');
    }, 800);
    const stepTimer2 = setTimeout(() => {
      setAnalysisStep('3. 세탁 및 주의 가이드 생성 중...');
    }, 1800);

    try {
      const data = await analyzeCareLabel({
        file: selectedImage,
        sampleId: selectedSample?.id
      });

      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);

      setAnalysisData(data);

      // Trigger celebration confetti on success
      if (data?.result?.isCareLabel !== false) {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
      }

      // Smooth scroll down to results
      setTimeout(() => {
        const resultEl = document.getElementById('analysis-results-section');
        if (resultEl) {
          resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 200);

    } catch (err) {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      alert(`분석 실패: ${err.message || '세탁 라벨을 분석하는 중 오류가 발생했습니다.'}`);
    } finally {
      setIsAnalyzing(false);
      setAnalysisStep('');
    }
  };

  // Save analysis to SQLite database
  const handleSaveToHistory = async () => {
    if (!analysisData || isSaved) return;

    setIsSaving(true);
    try {
      await saveAnalysisRecord({
        image_name: analysisData.imageName || '세탁 라벨',
        image_path: analysisData.imagePath || previewUrl,
        analysis_result: analysisData.result
      });

      setIsSaved(true);
      setHistoryCount(prev => prev + 1);
      showToast('분석 기록이 SQLite 데이터베이스에 안전하게 저장되었습니다!');
    } catch (err) {
      alert(err.message || '기록 저장 중 오류가 발생했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs sm:text-sm font-semibold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-bounce">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        historyCount={historyCount}
        config={config}
        onOpenApiModal={() => setIsApiModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* TAB 1: HOME (Image Upload & Analysis) */}
        {activeTab === 'home' && (
          <div className="space-y-12">
            {/* Hero Title Section */}
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="inline-block px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold tracking-wider border border-brand-200 uppercase">
                AI LAUNDRY CARE LABEL SCANNER
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                세탁 라벨 사진 한 장으로<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-sky-500">
                  완벽한 세탁법을 찾아보세요
                </span>
              </h1>
              <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
                옷에 부착된 세탁 라벨 사진을 업로드하면 Gemini AI가 세탁 기호를 인식하여 물세탁, 건조기 사용 여부, 다림질 온도까지 정확하게 안내합니다.
              </p>
            </div>

            {/* Upload Area */}
            <div className="max-w-3xl mx-auto">
              <ImageUploader
                selectedImage={selectedImage}
                selectedSample={selectedSample}
                previewUrl={previewUrl}
                samples={samples}
                isAnalyzing={isAnalyzing}
                analysisStep={analysisStep}
                onImageSelected={handleImageSelected}
                onSampleSelected={handleSampleSelected}
                onClearImage={handleClearImage}
                onStartAnalysis={handleStartAnalysis}
              />
            </div>

            {/* Analysis Results View */}
            {analysisData && (
              <div id="analysis-results-section" className="pt-6">
                <AnalysisResult
                  analysisData={analysisData}
                  onReset={handleClearImage}
                  onSaveToHistory={handleSaveToHistory}
                  isSaving={isSaving}
                  isSaved={isSaved}
                  onViewGuide={() => setActiveTab('guide')}
                />
              </div>
            )}
          </div>
        )}

        {/* TAB 2: CARE SYMBOLS GUIDE */}
        {activeTab === 'guide' && (
          <CareGuideView />
        )}

        {/* TAB 3: ANALYSIS HISTORY */}
        {activeTab === 'history' && (
          <HistoryView onNavigateToHome={() => setActiveTab('home')} />
        )}

        {/* TAB 4: ABOUT SERVICE */}
        {activeTab === 'about' && (
          <AboutView onStartNow={() => setActiveTab('home')} />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigateTab={(tab) => { setActiveTab(tab); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={isApiModalOpen}
        onClose={() => setIsApiModalOpen(false)}
        config={config}
        onConfigUpdated={loadInitialData}
      />
    </div>
  );
}
