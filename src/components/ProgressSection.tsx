import React, { useEffect } from 'react';

const ProgressSection: React.FC = () => {
  useEffect(() => {
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
  );
};

export default ProgressSection;