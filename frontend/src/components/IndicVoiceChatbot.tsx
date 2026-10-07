import React, { useState } from 'react';
import { Bot, User, Mic, Send, Sparkles, Globe } from 'lucide-react';
import type { ChatMessage } from '../types/chatbot';
import type { ScheduledLanguage } from '../types/lms';

interface IndicVoiceChatbotProps {
  messages: ChatMessage[];
  selectedLanguage: ScheduledLanguage;
  onSendMessage: (msg: ChatMessage) => void;
}

export const IndicVoiceChatbot: React.FC<IndicVoiceChatbotProps> = ({
  messages,
  selectedLanguage,
  onSendMessage,
}) => {
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    // 1. Add User Message
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'USER',
      text,
      language: selectedLanguage,
      timestamp: new Date().toISOString(),
    };
    onSendMessage(userMsg);
    setInputText('');

    // 2. Simulate AI RAG Response Generation
    setTimeout(() => {
      const aiReply: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ASSISTANT_AI',
        text: `According to the official PACS HR Policy Framework and NCCT Course Catalogue:\n\n1. **Requirement**: Completion of 'PACS Computerization & Common Accounting System (CAS)' course.\n2. **Min Attendance**: 80% with minimum 75% exam score.\n3. **Preference**: Verified DigiLocker credential holders are prioritized for society secretary posts.\n\n*Disclaimer: NCCT AI counseling provides official guidance and does not guarantee direct employment.*`,
        language: selectedLanguage,
        retrievedContext: [
          {
            chunkId: 'chunk-pacs-sec-01',
            sourceDocument: 'PACS HR Policy Framework',
            contentSnippet: 'Candidate must possess a Diploma in Cooperative Management or completed NCCT PACS Computerization course.',
            cosineSimilarity: 0.942,
          }
        ],
        disclaimerAppended: true,
        timestamp: new Date().toISOString(),
      };
      onSendMessage(aiReply);
    }, 900);
  };

  const handleSimulateVoiceInput = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      const spokenQuery = 'पैक्स सचिव पद के लिए न्यूनतम योग्यता क्या है? (What is the qualification for PACS Secretary?)';
      handleSend(spokenQuery);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-900 border border-slate-800 p-5 rounded-2xl gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-indigo-500/20 text-indigo-300 text-xs font-bold px-2.5 py-1 rounded-md border border-indigo-500/30">
              Section 5.1 & 5.3
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Indic AI Conversational Career & Scheme Counseling Agent
            </h2>
          </div>
          <p className="text-slate-400 text-xs mt-1">
            Accepts Indic voice/text queries in 22 Scheduled Languages, returning grounded career guidance from official PACS Model Bye-Laws.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-indigo-950/60 border border-indigo-800/60 text-indigo-300 text-xs px-3.5 py-2 rounded-xl">
          <Globe className="w-4 h-4 text-indigo-400" />
          <span>Indic Voice Bhashini Active</span>
        </div>
      </div>

      {/* Main Chat Interface Grid */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col h-[550px]">
        {/* Chat Header */}
        <div className="bg-slate-850 p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-tr from-indigo-600 to-indigo-400 p-2 rounded-xl shadow-lg shadow-indigo-600/30 text-white">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">NCCT Indic Career Assistant</h3>
              <p className="text-[11px] text-emerald-400 font-mono">Grounded RAG Engine Active • Zero Hallucination Mode</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-300 font-semibold">{selectedLanguage} Model</span>
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950/50">
          {messages.map((msg) => {
            const isUser = msg.sender === 'USER';
            return (
              <div
                key={msg.id}
                className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
              >
                <div
                  className={`p-2 rounded-xl text-white flex-shrink-0 ${
                    isUser ? 'bg-indigo-600' : 'bg-slate-800 border border-slate-700'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-indigo-400" />}
                </div>

                <div
                  className={`max-w-xl p-4 rounded-2xl text-xs space-y-2 leading-relaxed ${
                    isUser
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-900 border border-slate-800 text-slate-200'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.text}</div>

                  {msg.retrievedContext && msg.retrievedContext.length > 0 && (
                    <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-1 text-[11px] font-mono text-indigo-300">
                      <span className="text-[10px] font-bold text-amber-400 block">
                        Retrieved pgvector Document Context:
                      </span>
                      {msg.retrievedContext.map((c) => (
                        <div key={c.chunkId} className="truncate">
                          • {c.sourceDocument} (Cosine Similarity: {c.cosineSimilarity})
                        </div>
                      ))}
                    </div>
                  )}

                  {msg.disclaimerAppended && !isUser && (
                    <span className="text-[10px] text-slate-400 block pt-1 border-t border-slate-800/60 italic">
                      Statutory Disclaimer: Recommendations do not guarantee employment placement.
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Controls */}
        <div className="p-4 bg-slate-850 border-t border-slate-800 flex items-center space-x-3">
          <button
            onClick={handleSimulateVoiceInput}
            disabled={isListening}
            className={`p-3 rounded-xl transition ${
              isListening
                ? 'bg-rose-600 text-white animate-bounce ring-2 ring-rose-500'
                : 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold'
            }`}
            title="Spoken Indic Voice Input (Bhashini ASR)"
          >
            <Mic className="w-4 h-4 fill-current" />
          </button>

          <input
            type="text"
            placeholder={`Ask in ${selectedLanguage} (e.g. How to become a PACS Secretary?)...`}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-slate-900 border border-slate-700 text-white text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500"
          />

          <button
            onClick={() => handleSend()}
            disabled={!inputText.trim()}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold p-3 rounded-xl transition shadow-lg shadow-indigo-600/30"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
