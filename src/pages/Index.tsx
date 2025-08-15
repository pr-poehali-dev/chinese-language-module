import React from 'react';
import TabNavigation from '@/components/TabNavigation';
import TheorySection from '@/components/TheorySection';
import PracticeSection from '@/components/PracticeSection';
import AuditionSection from '@/components/AuditionSection';
import ProgressSection from '@/components/ProgressSection';

const Index = () => {
  return (
    <div className="bg-stone-50 text-stone-800" style={{ fontFamily: 'Inter, sans-serif', minHeight: '100vh' }}>
      <style jsx>{`
        .tab-active {
          border-color: #8A9A5B;
          color: #8A9A5B;
          font-weight: 600;
        }
        .tab-inactive {
          border-color: transparent;
          color: #6B7280;
        }
        .progress-cell {
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .progress-cell.selected, .progress-cell.pre-selected {
          background-color: #A7C957;
          color: white;
        }
        .theory-content {
          font-family: 'Inter', sans-serif;
          line-height: 1.7;
          color: #374151;
        }
        .theory-content h2 {
          font-size: 1.875rem;
          font-weight: bold;
          margin-bottom: 1rem;
          color: #111827;
        }
        .theory-content h3 {
          font-size: 1.5rem;
          font-weight: bold;
          margin-top: 2rem;
          margin-bottom: 1rem;
          border-bottom: 2px solid #f3f4f6;
          padding-bottom: 0.5rem;
          color: #1f2937;
        }
        .theory-content h4 {
          font-size: 1.25rem;
          font-weight: bold;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          color: #1f2937;
        }
        .theory-content hr {
          margin-top: 2rem;
          margin-bottom: 2rem;
          border-color: #d1d5db;
        }
        .theory-content ul {
          list-style-type: disc;
          list-style-position: inside;
          padding-left: 1rem;
          margin-top: 0.5rem;
        }
        .theory-content li {
          margin-bottom: 0.5rem;
        }
        .theory-content .note {
          background-color: #fefce8;
          border-left: 4px solid #facc15;
          padding: 1rem;
          margin-top: 1rem;
          border-radius: 0.25rem;
        }
        .flashcard-container {
          perspective: 1000px;
        }
        .flashcard {
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }
        .flashcard.is-flipped {
          transform: rotateY(180deg);
        }
        .flashcard-face {
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
        .flashcard-back {
          transform: rotateY(180deg);
        }
        .quiz-container {
          margin-top: 2rem;
          background-color: #f9fafb;
          padding: 1.5rem;
          border-radius: 8px;
        }
        .quiz-option {
          display: block;
          padding: 0.75rem;
          margin-bottom: 0.5rem;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .quiz-option.selected {
          background-color: #dbeafe;
          border-color: #93c5fd;
        }
        .quiz-feedback { 
          display: none; 
          margin-top: 1rem; 
          padding: 0.75rem; 
          border-radius: 6px; 
        }
        .correct-feedback { 
          display: none; 
          background-color: #d1fae5; 
          color: #065f46; 
        }
        .incorrect-feedback { 
          display: none; 
          background-color: #fee2e2; 
          color: #991b1b; 
        }
        .hidden {
          display: none;
        }
      `}</style>

      <div className="container mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-stone-900" style={{fontFamily: 'Noto Sans SC, sans-serif'}}>
            Урок 1: 你好
          </h1>
          <p className="text-stone-600 mt-2">Интерактивный модуль для системного изучения основ китайского языка</p>
        </header>

        <div className="w-full">
          <TabNavigation activeTab="theory" onTabChange={() => {}} />

          <main id="tab-content">
            {/* Repetition Section */}
            <section id="repetition" className="hidden space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <h2 className="text-2xl font-bold mb-4 text-emerald-800">Повторение</h2>
                <p className="text-stone-600">
                  Эта вкладка предназначена для повторения материала предыдущего урока. <br/>
                  Так как это первый урок, здесь пока пусто.
                </p>
              </div>
            </section>
            
            <TheorySection />
            <PracticeSection />
            <AuditionSection />
            <ProgressSection />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;