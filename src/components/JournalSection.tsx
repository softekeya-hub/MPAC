import React, { useState } from 'react';
import { JOURNAL_ARTICLES } from '../data/safariData';
import { JournalArticle } from '../types/safari';
import { BookOpen, Clock, User, ArrowRight, X } from 'lucide-react';

export const JournalSection: React.FC = () => {
  const [activeArticle, setActiveArticle] = useState<JournalArticle | null>(null);

  return (
    <section id="journal-section" className="py-20 bg-[#16110C] text-[#EFE7DA] border-b border-[#35281C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#D4AF37]">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Field Notes & Expedition Guides</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white text-balance">
            Tales from the Savanna & Coast
          </h2>
          <p className="text-sm sm:text-base text-[#B8AA96]">
            Essential briefings written by our licensed head naturalists, conservation veterinarians, and coastal cultural historians.
          </p>
        </div>

        {/* 4 Editorial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {JOURNAL_ARTICLES.map((article) => (
            <article
              key={article.id}
              className="bg-[#1D1711] border border-[#3A2C1E] rounded-3xl overflow-hidden flex flex-col justify-between group hover:border-[#D4AF37]/50 transition-all duration-300 shadow-xl"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden bg-[#261D14] relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#14100B]/85 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-semibold text-[#D4AF37]">
                    {article.category}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-[#9B8A74]">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{article.readTime}</span>
                    <span>·</span>
                    <span>{article.date}</span>
                  </div>

                  <h3 className="font-editorial text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-xs text-[#B8AA96] line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-[#33271B] mt-4 flex items-center justify-between">
                <span className="text-[11px] text-[#9B8A74]">By {article.author.name}</span>
                <button
                  onClick={() => setActiveArticle(article)}
                  className="text-xs font-semibold text-[#D4AF37] hover:text-[#E5C158] flex items-center gap-1 transition-colors"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex justify-center p-4 lg:p-8 animate-in fade-in">
          <div className="bg-[#18130E] border border-[#3E2F21] w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[90vh]">
            <div className="sticky top-0 z-20 bg-[#211A13]/95 backdrop-blur-md px-6 py-4 border-b border-[#382B1E] flex items-center justify-between">
              <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                {activeArticle.category} · Field Guide
              </span>
              <button
                onClick={() => setActiveArticle(null)}
                className="p-1.5 rounded-full text-[#B8AA96] hover:text-white hover:bg-[#31251A]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-[#9B8A74]">
                  <span>{activeArticle.date}</span>
                  <span>·</span>
                  <span>{activeArticle.readTime}</span>
                </div>
                <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {activeArticle.title}
                </h1>
                <div className="flex items-center gap-3 pt-2 text-xs text-[#D4AF37]">
                  <User className="w-4 h-4" />
                  <div>
                    <span className="font-bold text-white block">{activeArticle.author.name}</span>
                    <span className="text-[#9B8A74] text-[11px]">{activeArticle.author.role}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden aspect-[16/9] border border-[#3E2F21]">
                <img
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4 text-sm sm:text-base text-[#EFE7DA] leading-relaxed">
                {activeArticle.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-[#382B1E] bg-[#211A13] text-right">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-5 py-2 rounded-xl bg-[#D4AF37] text-[#14100B] text-xs font-bold uppercase tracking-wider hover:bg-[#E5C158]"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
