import React from 'react';

const TheorySection: React.FC = () => {
  return (
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
  );
};

export default TheorySection;