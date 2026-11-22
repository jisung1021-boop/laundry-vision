import React from 'react';
import { Sparkles, Shield, Heart, FileText, CheckCircle2 } from 'lucide-react';

export default function Footer({ onNavigateTab }) {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-100">
          {/* Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-sky-400 flex items-center justify-center text-white shadow-sm">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-extrabold text-lg text-slate-900 tracking-tight">
                LAUNDRY<span className="text-brand-600"> VISION</span>
              </span>
            </div>
            <p className="text-sm text-slate-500 max-w-md leading-relaxed">
              옷에 부착된 세탁 라벨 사진을 업로드하면 최첨단 Google Gemini 비전 AI가 세탁 기호를 자동 인식하고, 올바른 세탁 및 건조, 다림질 방법을 정확하게 안내하는 전문 세탁 케어 플랫폼입니다.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-600" /> 한국산업표준(KS K 0021) 준수
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-600" /> 국제표준(ISO 3758) 연동
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">빠른 메뉴</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <button onClick={() => onNavigateTab('home')} className="hover:text-brand-600 transition-colors">
                  세탁 라벨 분석하기
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('guide')} className="hover:text-brand-600 transition-colors">
                  세탁 기호 백과사전
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('history')} className="hover:text-brand-600 transition-colors">
                  내 분석 기록 보기
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('about')} className="hover:text-brand-600 transition-colors">
                  서비스 소개 &amp; 팁
                </button>
              </li>
            </ul>
          </div>

          {/* Care Categories */}
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">분석 5대 영역</h4>
            <ul className="space-y-1.5 text-xs text-slate-500">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span> 물세탁 (Washing)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span> 표백 (Bleaching)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span> 건조 (Drying)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span> 다림질 (Ironing)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> 드라이클리닝 (Dry Cleaning)
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© {new Date().getFullYear()} LAUNDRY VISION. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for your precious clothes
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
