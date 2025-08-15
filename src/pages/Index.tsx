import React, { useEffect } from 'react';

const Index = () => {
  useEffect(() => {
    // Tab switching logic
    const tabs = document.querySelectorAll('.tab-btn');
    const tabContent = document.getElementById('tab-content')?.children;

    // Set initial tab to Theory
    tabs.forEach(tab => {
      tab.classList.remove('tab-active');
      tab.classList.add('tab-inactive');
      if ((tab as HTMLElement).dataset.target === 'theory') {
        tab.classList.add('tab-active');
        tab.classList.remove('tab-inactive');
      }
    });
    if (tabContent) {
      for (let content of tabContent) {
        content.classList.add('hidden');
      }
      document.getElementById('theory')?.classList.remove('hidden');
    }

    const tabsContainer = document.getElementById('tabs');
    if (tabsContainer) {
      tabsContainer.addEventListener('click', (e) => {
        const targetButton = (e.target as HTMLElement).closest('.tab-btn') as HTMLElement;
        if (!targetButton) return;

        const targetId = targetButton.dataset.target;

        tabs.forEach(tab => {
          tab.classList.remove('tab-active');
          tab.classList.add('tab-inactive');
        });
        targetButton.classList.add('tab-active');
        targetButton.classList.remove('tab-inactive');

        if (tabContent) {
          for (let content of tabContent) {
            content.classList.add('hidden');
          }
          document.getElementById(targetId!)?.classList.remove('hidden');
        }
      });
    }

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

    // Audio Player Logic with Chrome compatibility
    const audio = document.getElementById('audio-1') as HTMLAudioElement;
    const status = document.getElementById('simple-status');
    const playBtn = document.getElementById('direct-play-btn');
    const pauseBtn = document.getElementById('direct-pause-btn');
    const reloadBtn = document.getElementById('direct-reload-btn');

    // Chrome requires user interaction before audio can play
    let userInteracted = false;
    const enableAudioOnInteraction = () => {
      userInteracted = true;
      console.log('User interaction detected for audio');
    };

    // Enable audio on any user interaction
    document.addEventListener('click', enableAudioOnInteraction, { once: true });
    document.addEventListener('touchstart', enableAudioOnInteraction, { once: true });

    if (playBtn) {
      playBtn.addEventListener('click', function() {
        if (!audio || !status) return;

        // Force user interaction for Chrome
        userInteracted = true;

        status.textContent = 'Попытка воспроизведения...';
        status.style.background = '#d1ecf1';
        status.style.color = '#0c5460';

        // Try to load and play the audio
        audio.load();

        setTimeout(() => {
          audio.play().then(() => {
            status.textContent = '🎵 Воспроизводится';
            status.style.background = '#d4edda';
            status.style.color = '#155724';
          }).catch((error) => {
            status.textContent = '❌ Ошибка: ' + error.message;
            status.style.background = '#f8d7da';
            status.style.color = '#721c24';
            console.error('Ошибка воспроизведения:', error);

            // Additional help for Chrome users
            setTimeout(() => {
              status.textContent = '⚠️ Попробуйте нажать на встроенный плеер выше';
              status.style.background = '#fff3cd';
              status.style.color = '#856404';
            }, 2000);
          });
        }, 500);
      });
    }

    if (pauseBtn) {
      pauseBtn.addEventListener('click', function() {
        if (!audio) return;
        audio.pause();
      });
    }

    if (reloadBtn) {
      reloadBtn.addEventListener('click', function() {
        if (!audio || !status) return;
        status.textContent = '🔄 Перезагрузка...';
        status.style.background = '#d1ecf1';
        status.style.color = '#0c5460';
        audio.load();
        setTimeout(() => {
          status.textContent = '✅ Перезагружено';
        }, 1000);
      });
    }

    if (audio && status) {
      audio.addEventListener('play', () => {
        status.textContent = '🎵 Воспроизводится';
        status.style.background = '#d4edda';
        status.style.color = '#155724';
      });

      audio.addEventListener('pause', () => {
        status.textContent = '⏸️ Пауза';
        status.style.background = '#fff3cd';
        status.style.color = '#856404';
      });

      audio.addEventListener('ended', () => {
        status.textContent = '✅ Воспроизведение завершено';
        status.style.background = '#d4edda';
        status.style.color = '#155724';
      });

      audio.addEventListener('error', (e) => {
        status.textContent = '❌ Ошибка загрузки аудио';
        status.style.background = '#f8d7da';
        status.style.color = '#721c24';
        console.error('Ошибка аудио:', e);
      });

      audio.addEventListener('loadstart', () => {
        status.textContent = '📡 Загрузка...';
        status.style.background = '#d1ecf1';
        status.style.color = '#0c5460';
      });

      audio.addEventListener('canplaythrough', () => {
        status.textContent = '✅ Готов к воспроизведению';
        status.style.background = '#f8f9fa';
        status.style.color = '#666';
      });
    }

    // Quiz Logic
    const quizOptions = document.querySelectorAll('.quiz-option');
    quizOptions.forEach(option => {
      option.addEventListener('click', function() {
        const isCorrect = this.querySelector('input')?.getAttribute('data-correct') === 'true';
        selectAnswer(this as HTMLElement, isCorrect);
      });
    });

    function selectAnswer(labelElement: HTMLElement, isCorrect: boolean) {
      const optionsContainer = labelElement.closest('.quiz-options');
      const options = optionsContainer?.querySelectorAll('.quiz-option');
      options?.forEach(o => o.classList.remove('selected'));
      labelElement.classList.add('selected');

      const feedbackContainer = labelElement.closest('.quiz-container')?.querySelector('.quiz-feedback') as HTMLElement;
      const correctFeedback = feedbackContainer?.querySelector('.correct-feedback') as HTMLElement;
      const incorrectFeedback = feedbackContainer?.querySelector('.incorrect-feedback') as HTMLElement;

      if (feedbackContainer) feedbackContainer.style.display = 'block';
      if (isCorrect) {
        if (correctFeedback) correctFeedback.style.display = 'block';
        if (incorrectFeedback) incorrectFeedback.style.display = 'none';
      } else {
        if (correctFeedback) correctFeedback.style.display = 'none';
        if (incorrectFeedback) incorrectFeedback.style.display = 'block';
      }
    }

    // Progress table logic
    const progressTable = document.getElementById('progress-table');
    if (progressTable) {
      progressTable.addEventListener('click', (e) => {
        if ((e.target as HTMLElement).classList.contains('progress-cell')) {
          const cell = e.target as HTMLElement;
          const value = parseInt(cell.dataset.value!);
          const row = cell.parentElement;
          const cells = row?.querySelectorAll('.progress-cell');

          cells?.forEach(c => {
            c.classList.remove('selected', 'pre-selected');
            const cellValue = parseInt((c as HTMLElement).dataset.value!);
            if (cellValue < value) {
              c.classList.add('pre-selected');
            } else if (cellValue === value) {
              c.classList.add('selected');
            }
          });
        }
      });
    }
  }, []);

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
          <nav className="flex flex-wrap justify-center border-b border-stone-200 mb-8" id="tabs">
            <button data-target="repetition" className="tab-btn text-sm sm:text-base py-4 px-4 sm:px-6 block border-b-2 tab-inactive">
              Повторение
            </button>
            <button data-target="theory" className="tab-btn text-sm sm:text-base py-4 px-4 sm:px-6 block border-b-2 tab-active">
              Теория
            </button>
            <button data-target="practice" className="tab-btn text-sm sm:text-base py-4 px-4 sm:px-6 block border-b-2 tab-inactive">
              Практика
            </button>
            <button data-target="audition" className="tab-btn text-sm sm:text-base py-4 px-4 sm:px-6 block border-b-2 tab-inactive">
              Аудирование
            </button>
            <button data-target="progress" className="tab-btn text-sm sm:text-base py-4 px-4 sm:px-6 block border-b-2 tab-inactive">
              Прогресс
            </button>
          </nav>

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
            
            {/* Theory Section */}
            <section id="theory" className="space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="theory-content">
                  <h2>Урок 1: Интерактивный модуль для системного изучения основ китайского языка</h2>
                  <h4>1-й ШАГ</h4>
                  <hr/>
                  <h3>А. Местоимения в китайском языке</h3>
                  <p><strong>Местоимения не изменяются!</strong></p>
                  <ul>
                    <li>Я = <strong>wǒ</strong> → меня, мне и т.д.</li>
                    <li>Ты = <strong>нъи</strong> → тебя, тебе и т.д.</li>
                    <li>Он / Она / Оно = <strong>тхā</strong> → его / её (Кого?) = <strong>тхā</strong></li>
                  </ul>
                  <div className="note">
                    <p><strong>Примечание:</strong> «тхā» используется для всех: людей, животных и предметов.</p>
                  </div>
                  
                  <h4>Вежливое "Вы":</h4>
                  <ul>
                    <li><strong>нъи</strong> соответствует вежливому «Вы» в русском, но чаще используется как «ты».</li>
                    <li>Отдельное вежливое «Вы» = <strong>нъињ</strong> (используется редко).</li>
                  </ul>
                  <hr/>
                  <h3>Б. Окончание «+мэњ»</h3>
                  <p><strong>Придаёт местоимениям множественность:</strong></p>
                  <ul>
                    <li><strong>wǒ + мэњ</strong> → <strong>wǒмэњ</strong> = мы</li>
                    <li><strong>нъи + мэњ</strong> → <strong>нъи мэњ</strong> = вы</li>
                    <li><strong>тхā + мэњ</strong> → <strong>тхāмэњ</strong> = они</li>
                  </ul>

                  <h4>Разные китайские «мы»:</h4>
                  <ul>
                    <li><strong>wǒмэњ</strong> - мы (не включая собеседников)</li>
                    <li><strong>дзáмэњ</strong> - мы (включая собеседников)</li>
                  </ul>
                  <hr/>
                  <h3>Резюме (Кто? Кого? Кому? Кем?)</h3>
                  <h4>Единственное число:</h4>
                  <ul>
                    <li>Я, меня, мне, мною = <strong>wǒ</strong></li>
                    <li>Ты, тебя, тебе, тобою = <strong>нъи</strong></li>
                    <li>Он, его, ему, им = <strong>тхā</strong></li>
                    <li>Она, её, ей, ею = <strong>тхā</strong></li>
                    <li>Оно, его, ему, им = <strong>тхā</strong></li>
                  </ul>

                  <h4>Множественное число:</h4>
                  <ul>
                    <li>Мы, нас, нам, нами = <strong>wǒмэњ</strong></li>
                    <li>Вы, вас, вам, вами = <strong>нъи мэњ</strong></li>
                    <li>Они, их, им, ими = <strong>тхāмэњ</strong></li>
                    <li>Мы (включая собеседников) = <strong>дзáмэњ</strong></li>
                  </ul>
                  <hr/>
                  <div className="note">
                    <p><strong>ВНИМАНИЕ 1:</strong> Окончание «+мэњ» <strong>не образует множественного числа существительных!</strong></p>
                    <p><strong>ВНИМАНИЕ 2:</strong> «+мэњ» присоединяется <strong>лишь к очень немногим существительным</strong> и используется только при обращении.</p>
                    <p><strong>ВНИМАНИЕ 3:</strong> Не дублируйте множественность! Например, не нужно показывать множественность дважды.</p>
                  </div>
                  <hr/>
                  <h3>Примеры чисел:</h3>
                  <ul>
                    <li>много = <strong>дуō</strong></li>
                    <li>очень много = <strong>хэ њ дуō</strong></li>
                    <li>слишком много = <strong>тхàй дуō</strong></li>
                  </ul>
                  <hr/>
                  <h3>О единственном и множественном числе существительных:</h3>
                  <p>Существительные в китайском языке <strong>не изменяются</strong> по числам.</p>
                  <ul>
                    <li>Пример: <strong>мāо</strong> значит и «кошка» (одна), и «кошки» (много).</li>
                    <li>Сочетание <strong>джəйгǝ мāо</strong> = «эта кошка».</li>
                    <li>Сочетание <strong>джəйсе мāо</strong> = «эти кошки».</li>
                  </ul>
                  <p>Чтобы показать, что «кошка — одна», говорите: «одна кошка» = <strong>«и гə мāо»</strong>.</p>
                  <hr/>
                  <h3>ФАКТ:</h3>
                  <p><strong>Китайские слова никак не изменяются!</strong></p>
                </div>
              </div>
            </section>

            {/* Practice Section */}
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

            {/* Audition Section */}
            <section id="audition" className="hidden space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold mb-6 text-emerald-800">Аудирование</h2>
                <p className="text-stone-600 mb-6">Прослушайте правильное произношение китайских слов и фраз</p>
                
                {/* Упрощенный аудио плеер */}
                <div className="audio-player">
                  <div className="audio-title">🎧 Произношение китайских слов и фраз</div>
                  
                  {/* ОСНОВНОЙ аудио плеер - встроенный браузерный */}
                  <audio id="audio-1" controls preload="metadata" style={{width: '100%', height: '50px', margin: '20px 0', borderRadius: '8px'}}>
                    <source src="audio/chinese_pronunciation.mp3" type="audio/mpeg"/>
                    Ваш браузер не поддерживает аудио элементы.
                  </audio>
                  
                  {/* Альтернативные кнопки управления */}
                  <div style={{textAlign: 'center', margin: '20px 0', display: 'flex', gap: '12px', justifyContent: 'center'}}>
                    <button id="direct-play-btn" style={{background: '#8A9A5B', color: 'white', border: 'none', padding: '14px 28px', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: '600'}}>
                      ▶️ Воспроизвести
                    </button>
                    <button id="direct-pause-btn" style={{background: '#dc3545', color: 'white', border: 'none', padding: '14px 28px', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: '600'}}>
                      ⏸️ Остановить
                    </button>
                    <button id="direct-reload-btn" style={{background: '#6c757d', color: 'white', border: 'none', padding: '14px 28px', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: '600'}}>
                      🔄 Перезагрузить
                    </button>
                  </div>
                  
                  {/* Статус и информация */}
                  <div id="simple-status" style={{textAlign: 'center', color: '#666', background: '#f8f9fa', padding: '12px', borderRadius: '6px', margin: '12px 0', fontWeight: '500'}}>
                    Готов к воспроизведению
                  </div>
                </div>
                
                {/* Instructions */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                  <h4 className="font-semibold text-blue-800 mb-2">Инструкции по аудированию:</h4>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Используйте встроенный аудио плеер (верхний) - он работает надежнее всего</li>
                    <li>• Если встроенный плеер не работает, попробуйте дополнительные кнопки ниже</li>
                    <li>• В Google Chrome: сначала кликните в любом месте страницы, затем нажмите воспроизведение</li>
                    <li>• При проблемах нажмите "Перезагрузить" и попробуйте снова</li>
                    <li>• Проверьте, что звук включен на устройстве</li>
                  </ul>
                </div>
                
                {/* Chrome-specific help */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">Для пользователей Google Chrome:</h4>
                  <p className="text-yellow-700 text-sm">Google Chrome блокирует автозапуск аудио. Если аудио не воспроизводится:</p>
                  <ol className="text-yellow-700 text-sm mt-2 list-decimal list-inside space-y-1">
                    <li>Кликните в любом месте страницы</li>
                    <li>Нажмите кнопку воспроизведения на встроенном плеере</li>
                    <li>Если не помогает, используйте кнопку "Воспроизвести" ниже плеера</li>
                  </ol>
                </div>

                {/* Listening Exercise */}
                <div className="quiz-container">
                  <h3 className="text-xl font-semibold mb-4">Упражнение на аудирование</h3>
                  <p className="mb-4">Прослушайте аудио выше и ответьте на вопросы о том, что вы услышали:</p>
                  <div className="quiz-question">Внимательно прослушайте произношение. Какие китайские звуки и слова вы различаете?</div>
                  <div className="quiz-options">
                    <label className="quiz-option">
                      <input type="radio" name="listening" className="hidden" data-correct="true"/>
                      Слышу четкое произношение китайских слов
                    </label>
                    <label className="quiz-option">
                      <input type="radio" name="listening" className="hidden" data-correct="false"/>
                      Слышу только музыку
                    </label>
                    <label className="quiz-option">
                      <input type="radio" name="listening" className="hidden" data-correct="false"/>
                      Ничего не слышу
                    </label>
                  </div>
                  <div className="quiz-feedback">
                    <div className="correct-feedback" style={{display:'none'}}>Отлично! Теперь вы слышите правильное китайское произношение вместо музыки.</div>
                    <div className="incorrect-feedback" style={{display:'none'}}>Попробуйте перезагрузить страницу или проверить звук на устройстве.</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Progress Section */}
            <section id="progress" className="hidden space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold mb-4 text-emerald-800">Часть 3: Мониторинг прогресса</h2>
                <p className="text-stone-600">Оцените свои знания по каждому навыку, чтобы понять, на что обратить внимание. Кликните на ячейку, чтобы выставить оценку от 1 до 5. Это поможет вам визуализировать свои сильные и слабые стороны.</p>
                <p className="text-xs text-stone-500 mt-2">* 1 - Совсем не уверен; 5 - Полностью освоил.</p>
              </div>
              <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-sm mt-8">
                <table id="progress-table" className="w-full text-sm text-left text-stone-600">
                  <thead className="text-xs text-stone-700 uppercase bg-stone-100">
                    <tr>
                      <th scope="col" className="px-6 py-3">Компетенция / Навык</th>
                      <th scope="col" className="px-2 py-3 text-center">1</th>
                      <th scope="col" className="px-2 py-3 text-center">2</th>
                      <th scope="col" className="px-2 py-3 text-center">3</th>
                      <th scope="col" className="px-2 py-3 text-center">4</th>
                      <th scope="col" className="px-2 py-3 text-center">5</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b"><td colSpan={6} className="px-6 py-2 font-semibold bg-stone-50">Фонетика</td></tr>
                    <tr className="bg-white border-b">
                      <td className="px-6 py-4">Различаю на слух 4 основных тона</td>
                      <td className="progress-cell text-center p-2" data-value="1"></td><td className="progress-cell text-center p-2" data-value="2"></td><td className="progress-cell text-center p-2" data-value="3"></td><td className="progress-cell text-center p-2" data-value="4"></td><td className="progress-cell text-center p-2" data-value="5"></td>
                    </tr>
                    <tr className="bg-white border-b">
                      <td className="px-6 py-4">Применяю правило сандхи ($3+3 \rightarrow 2+3$)</td>
                      <td className="progress-cell text-center p-2" data-value="1"></td><td className="progress-cell text-center p-2" data-value="2"></td><td className="progress-cell text-center p-2" data-value="3"></td><td className="progress-cell text-center p-2" data-value="4"></td><td className="progress-cell text-center p-2" data-value="5"></td>
                    </tr>
                    <tr className="bg-white border-b"><td colSpan={6} className="px-6 py-2 font-semibold bg-stone-50">Лексика и Грамматика</td></tr>
                    <tr className="bg-white border-b">
                      <td className="px-6 py-4">Узнаю и перевожу все 12 слов/фраз</td>
                      <td className="progress-cell text-center p-2" data-value="1"></td><td className="progress-cell text-center p-2" data-value="2"></td><td className="progress-cell text-center p-2" data-value="3"></td><td className="progress-cell text-center p-2" data-value="4"></td><td className="progress-cell text-center p-2" data-value="5"></td>
                    </tr>
                    <tr className="bg-white border-b">
                      <td className="px-6 py-4">Использую вопросительную частицу 吗</td>
                      <td className="progress-cell text-center p-2" data-value="1"></td><td className="progress-cell text-center p-2" data-value="2"></td><td className="progress-cell text-center p-2" data-value="3"></td><td className="progress-cell text-center p-2" data-value="4"></td><td className="progress-cell text-center p-2" data-value="5"></td>
                    </tr>
                    <tr className="bg-white border-b"><td colSpan={6} className="px-6 py-2 font-semibold bg-stone-50">Говорение и Аудирование</td></tr>
                    <tr className="bg-white border-b">
                      <td className="px-6 py-4">Могу вести базовые диалоги из урока</td>
                      <td className="progress-cell text-center p-2" data-value="1"></td><td className="progress-cell text-center p-2" data-value="2"></td><td className="progress-cell text-center p-2" data-value="3"></td><td className="progress-cell text-center p-2" data-value="4"></td><td className="progress-cell text-center p-2" data-value="5"></td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-6 py-4">Понимаю на слух фразы урока</td>
                      <td className="progress-cell text-center p-2" data-value="1"></td><td className="progress-cell text-center p-2" data-value="2"></td><td className="progress-cell text-center p-2" data-value="3"></td><td className="progress-cell text-center p-2" data-value="4"></td><td className="progress-cell text-center p-2" data-value="5"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;