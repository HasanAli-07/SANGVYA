import React, { useState } from 'react';
import { BookOpen, Download, CheckCircle, Play, FileCode, Headphones, Globe, ArrowRight } from 'lucide-react';
import type { LmsLessonModule, ScheduledLanguage } from '../types/lms';

interface MultilingualLmsPlayerProps {
  modules: LmsLessonModule[];
  selectedLanguage: ScheduledLanguage;
  onDownloadModule: (id: string) => void;
}

export const MultilingualLmsPlayer: React.FC<MultilingualLmsPlayerProps> = ({
  modules,
  selectedLanguage,
  onDownloadModule,
}) => {
  const [activeModule, setActiveModule] = useState<LmsLessonModule>(modules[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const localizedTitle = activeModule.translations[selectedLanguage] || activeModule.title;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-900 border border-slate-800 p-5 rounded-2xl gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-indigo-500/20 text-indigo-300 text-xs font-bold px-2.5 py-1 rounded-md border border-indigo-500/30">
              Section 3.1
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Multilingual Course Delivery & SCORM / HTML5 Offline Player
            </h2>
          </div>
          <p className="text-slate-400 text-xs mt-1">
            Delivers interactive SCORM 2004, HTML5 exercise packages, and Opus micro-lectures pre-downloadable over campus Wi-Fi.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-indigo-950/60 border border-indigo-800/60 text-indigo-300 text-xs px-3.5 py-2 rounded-xl font-mono">
          <Globe className="w-4 h-4 text-indigo-400" />
          <span>Bhashini Localized: {selectedLanguage}</span>
        </div>
      </div>

      {/* Main Player Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course Module Selector List */}
        <div className="lg:col-span-1 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <span>Available Instructional Modules</span>
            </h3>
            <span className="text-[11px] text-slate-400 font-mono">Offline Wi-Fi Pre-cache</span>
          </div>

          <div className="space-y-3">
            {modules.map((mod) => {
              const isSelected = activeModule.id === mod.id;
              const titleText = mod.translations[selectedLanguage] || mod.title;

              return (
                <div
                  key={mod.id}
                  onClick={() => setActiveModule(mod)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition space-y-2 ${
                    isSelected
                      ? 'bg-indigo-950/60 border-indigo-500 ring-2 ring-indigo-500/20'
                      : 'bg-slate-850 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="bg-slate-800 text-amber-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-slate-700">
                      {mod.contentType}
                    </span>
                    {mod.isDownloadedOffline ? (
                      <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1">
                        <CheckCircle className="w-3 h-3 text-emerald-400" />
                        <span>Pre-cached ({mod.downloadSizeMB} MB)</span>
                      </span>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDownloadModule(mod.id);
                        }}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-md transition flex items-center space-x-1 shadow-sm"
                      >
                        <Download className="w-3 h-3" />
                        <span>Pre-download ({mod.downloadSizeMB} MB)</span>
                      </button>
                    )}
                  </div>

                  <h4 className="font-bold text-xs text-white leading-snug">{titleText}</h4>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span>{mod.durationMinutes} Mins</span>
                    <span className="font-mono text-indigo-300 text-[10px]">{mod.nosMapping}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive SCORM/HTML5 Player Viewport */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">
                Active Player Rendering Engine
              </span>
              <h3 className="font-bold text-sm text-white">{localizedTitle}</h3>
            </div>

            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold px-3 py-1 rounded-full">
              {activeModule.contentType}
            </span>
          </div>

          {/* Player Display Container */}
          <div className="relative aspect-video bg-slate-950 rounded-xl overflow-hidden border-2 border-slate-800 flex flex-col items-center justify-center p-6 text-center">
            {isPlaying ? (
              <div className="space-y-4 w-full">
                <div className="flex items-center justify-center space-x-3 text-indigo-400">
                  {activeModule.contentType === 'SCORM_2004' && <FileCode className="w-12 h-12 animate-pulse" />}
                  {activeModule.contentType === 'AUDIO_MICRO_LECTURE' && <Headphones className="w-12 h-12 animate-bounce" />}
                  {activeModule.contentType === 'HTML5_INTERACTIVE' && <BookOpen className="w-12 h-12 animate-pulse" />}
                </div>

                <div>
                  <p className="text-sm font-bold text-white leading-snug">{localizedTitle}</p>
                  <p className="text-xs text-emerald-400 font-mono mt-1">
                    Playing Localized Content Stream ({selectedLanguage}) • Low-Bandwidth Opus/WebM
                  </p>
                </div>

                <button
                  onClick={() => setIsPlaying(false)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold px-4 py-2 rounded-lg transition"
                >
                  Pause Playback
                </button>
              </div>
            ) : (
              <div className="space-y-4 max-w-md">
                <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-indigo-600/30 text-white">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white">{localizedTitle}</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Bhashini NMT Translated & Synthesized for {selectedLanguage} learners.
                  </p>
                </div>

                <button
                  onClick={() => setIsPlaying(true)}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition shadow-lg shadow-indigo-600/30 inline-flex items-center space-x-2"
                >
                  <span>Launch SCORM / HTML5 Module</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div className="bg-slate-850 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs text-slate-300">
            <span className="font-semibold">NOS Competency Standard:</span>
            <span className="font-mono text-amber-300 font-bold bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
              {activeModule.nosMapping}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
