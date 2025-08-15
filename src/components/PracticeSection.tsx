import React, { useEffect } from 'react';

const PracticeSection: React.FC = () => {
  useEffect(() => {
    // Flashcard logic for Practice tab
    const practiceFlashcards = [
      { front: 'Я', back: '<strong>wǒ</strong><br/>(меня, мне, мною)' },
      { front: 'Ты', back: '<strong>нъи (nǐ)</strong><br/>(тебя, тебе, тобою)' },
      { front: 'Он / Она / Оно', back: '<strong>тхā (tā)</strong><br/>(его, её, ему, ей, им, ею)' },
      { front: 'Вежливое "Вы"', back: '<strong>нъињ (nín)</strong><br/>(ед. число, используется редко)' },
      { front: 'Мы<br/>(не включая вас)', back: '<strong>wǒмэњ (wǒmen)</strong>' },
      { front: 'Мы<br/>(включая вас)', back: '<strong>дзáмэњ (zánmen)</strong>' },
      { front: 'Вы (мн. число)', back: '<strong>нъи мэњ (nǐmen)</strong>' },
      { front: 'Они', back: '<strong>тхāмэњ (tāmen)</strong>' },
      { front: 'Этот, эта, это', back: '<strong>джə йгǝ (zhè ge)</strong><br/>Пример: джə йгǝ мāо (эта кошка)' },
      { front: 'Эти', back: '<strong>джə йсе (zhèxiē)</strong><br/>Пример: джə йсе мāо (эти кошки)' },
      { front: 'Тот, та, то', back: '<strong>нə йгǝ (nà ge)</strong>' },
      { front: 'Те', back: '<strong>нə йсе (nàxiē)</strong>' }
    ];

    let currentCardIndex = 0;
    const flashcardContainer = document.getElementById('practice');
    if (flashcardContainer) {
      const flashcard = flashcardContainer.querySelector('#flashcard');
      const flashcardFront = flashcardContainer.querySelector('#flashcard-front');
      const flashcardBack = flashcardContainer.querySelector('#flashcard-back');
      const cardCounter = flashcardContainer.querySelector('#card-counter');
      const prevBtn = flashcardContainer.querySelector('#prev-card');
      const nextBtn = flashcardContainer.querySelector('#next-card');

      function updateFlashcard() {
        const cardData = practiceFlashcards[currentCardIndex];
        if (flashcardFront) flashcardFront.innerHTML = `<p class="text-4xl font-bold">${cardData.front}</p>`;
        if (flashcardBack) flashcardBack.innerHTML = `<p class="text-3xl">${cardData.back}</p>`;
        if (cardCounter) cardCounter.textContent = `${currentCardIndex + 1} / ${practiceFlashcards.length}`;
        flashcard?.classList.remove('is-flipped');
      }

      if (flashcard) {
        flashcard.addEventListener('click', () => {
          flashcard.classList.toggle('is-flipped');
        });
        nextBtn?.addEventListener('click', () => {
          currentCardIndex = (currentCardIndex + 1) % practiceFlashcards.length;
          updateFlashcard();
        });
        prevBtn?.addEventListener('click', () => {
          currentCardIndex = (currentCardIndex - 1 + practiceFlashcards.length) % practiceFlashcards.length;
          updateFlashcard();
        });
        updateFlashcard();
      }
    }
  }, []);

  return (
    <section id="practice" className="hidden space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-2xl font-bold mb-4 text-emerald-800">Практика: Флеш-карты</h2>
        <p className="text-stone-600">Кликните на карточку, чтобы увидеть перевод и детали. Используйте кнопки для навигации по словарю урока.</p>
      </div>
      <div className="flex flex-col items-center">
        <div className="flashcard-container w-full max-w-md h-64 mb-6">
          <div id="flashcard" className="flashcard w-full h-full relative">
            {/* Front */}
            <div id="flashcard-front" className="flashcard-face absolute w-full h-full bg-white rounded-lg shadow-lg flex items-center justify-center p-4 text-center">
              {/* Content will be injected by JS */}
            </div>
            {/* Back */}
            <div id="flashcard-back" className="flashcard-face flashcard-back absolute w-full h-full bg-emerald-700 text-white rounded-lg shadow-lg flex flex-col items-center justify-center p-6 text-center">
              {/* Content will be injected by JS */}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button id="prev-card" className="px-4 py-2 bg-stone-200 text-stone-700 rounded-lg hover:bg-stone-300 transition-colors">
            Назад
          </button>
          <span id="card-counter" className="text-stone-600 font-medium">1 / 12</span>
          <button id="next-card" className="px-4 py-2 bg-stone-200 text-stone-700 rounded-lg hover:bg-stone-300 transition-colors">
            Вперед
          </button>
        </div>
      </div>
    </section>
  );
};

export default PracticeSection;