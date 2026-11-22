import React, { useState } from 'react';
import { Sparkles, Shirt, BookOpen, History, Info, Key, Menu, X, CheckCircle, AlertTriangle } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, historyCount = 0, config, onOpenApiModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: '홈', icon: Shirt },
    { id: 'guide', label: '세탁 기호 가이드', icon: BookOpen },
    { id: 'history', label: '분석 기록', icon: History, badge: historyCount },
    { id: 'about', label: '서비스 소개', icon: Info },
  ];

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            onClick={() => handleSelectTab('home')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-sky-400 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 group-hover:text-brand-600 transition-colors">
                  LAUNDRY<span className="text-brand-600"> VISION</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-brand-50 text-brand-600 border border-brand-200/60 uppercase">
                  AI CARE
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block font-medium">스마트 AI 세탁 라벨 기호 판독 솔루션</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-brand-50 text-brand-700 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="ml-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-brand-100 text-brand-700">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: API Status & Settings */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenApiModal}
              title="Gemini API 연동 상태 및 설정"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                config?.hasGeminiKey
                  ? 'bg-emerald-50/80 border-emerald-200 text-emerald-700 hover:bg-emerald-100/80'
                  : 'bg-amber-50/80 border-amber-200 text-amber-800 hover:bg-amber-100/80'
              }`}
            >
              {config?.hasGeminiKey ? (
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
              )}
              <span>{config?.hasGeminiKey ? 'Gemini AI 연동됨' : '테스트 모드'}</span>
              <span className="w-px h-3 bg-slate-300 mx-0.5"></span>
              <Key className="w-3 h-3 text-slate-500" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenApiModal}
              className={`p-2 rounded-xl border text-xs font-semibold ${
                config?.hasGeminiKey
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                  : 'bg-amber-50 border-amber-200 text-amber-700'
              }`}
            >
              <Key className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200/80 bg-white px-4 pt-2 pb-4 space-y-1.5 shadow-lg animate-fadeIn">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-brand-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-brand-100 text-brand-700">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
