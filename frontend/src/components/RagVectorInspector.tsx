import React from 'react';
import { Database, Search, FileText, CheckCircle2 } from 'lucide-react';
import type { VectorContextChunk } from '../types/chatbot';

interface RagVectorInspectorProps {
  knowledgeBase: VectorContextChunk[];
}

export const RagVectorInspector: React.FC<RagVectorInspectorProps> = ({ knowledgeBase }) => {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-900 border border-slate-800 p-5 rounded-2xl gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-indigo-500/20 text-indigo-300 text-xs font-bold px-2.5 py-1 rounded-md border border-indigo-500/30">
              Section 5.2
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              pgvector Grounded RAG Knowledge Base Retrieval Pipeline
            </h2>
          </div>
          <p className="text-slate-400 text-xs mt-1">
            Indexes NCCT curriculum catalogs, PACS HR policy frameworks, and Model Bye-Laws into pgvector embeddings for zero-hallucination career guidance.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-xs px-3.5 py-2 rounded-xl font-mono">
          <Database className="w-4 h-4 text-emerald-400" />
          <span>pgvector Cosine Index Active</span>
        </div>
      </div>

      {/* Vector Index Table */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-white flex items-center space-x-2">
            <Search className="w-4 h-4 text-amber-400" />
            <span>Indexed Document Chunks & Vector Cosine Metrics ({knowledgeBase.length})</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">Top-k Context Retriever</span>
        </div>

        <div className="space-y-4">
          {knowledgeBase.map((chunk) => (
            <div
              key={chunk.chunkId}
              className="bg-slate-850 p-4 rounded-xl border border-slate-800 space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-indigo-400" />
                  <span>{chunk.sourceDocument}</span>
                  <span className="text-[10px] font-mono text-slate-500">[{chunk.chunkId}]</span>
                </span>

                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>Cosine Sim: {chunk.cosineSimilarity}</span>
                </span>
              </div>

              <p className="text-slate-300 leading-relaxed font-sans text-[11px]">
                "{chunk.contentSnippet}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
