import React, { useEffect } from 'react';

const AuditionSection: React.FC = () => {
  useEffect(() => {
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
  }, []);

  return (
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
  );
};

export default AuditionSection;