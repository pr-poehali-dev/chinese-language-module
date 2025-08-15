import React, { useEffect } from 'react';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
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
  }, []);

  return (
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
  );
};

export default TabNavigation;