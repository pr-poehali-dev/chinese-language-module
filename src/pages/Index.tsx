import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface FlashCard {
  id: number;
  chinese: string;
  pinyin: string;
  russian: string;
  category: string;
}

interface Quiz {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const Index = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(3);

  const flashCards: FlashCard[] = [
    { id: 1, chinese: '你好', pinyin: 'nǐ hǎo', russian: 'привет', category: 'Приветствие' },
    { id: 2, chinese: '谢谢', pinyin: 'xiè xie', russian: 'спасибо', category: 'Вежливость' },
    { id: 3, chinese: '再见', pinyin: 'zài jiàn', russian: 'до свидания', category: 'Прощание' },
    { id: 4, chinese: '对不起', pinyin: 'duì bu qǐ', russian: 'извините', category: 'Вежливость' },
    { id: 5, chinese: '我', pinyin: 'wǒ', russian: 'я', category: 'Местоимения' }
  ];

  const quizzes: Quiz[] = [
    {
      id: 1,
      question: 'Как переводится 你好?',
      options: ['до свидания', 'привет', 'спасибо', 'извините'],
      correctAnswer: 1,
      explanation: '你好 (nǐ hǎo) - это стандартное приветствие в китайском языке'
    },
    {
      id: 2,
      question: 'Выберите правильный пиньинь для 谢谢',
      options: ['xiè xie', 'nǐ hǎo', 'zài jiàn', 'wǒ ài'],
      correctAnswer: 0,
      explanation: '谢谢 произносится как "xiè xie" с падающим тоном'
    }
  ];

  const nextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % flashCards.length);
    setIsFlipped(false);
  };

  const prevCard = () => {
    setCurrentCardIndex((prev) => (prev - 1 + flashCards.length) % flashCards.length);
    setIsFlipped(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    if (answerIndex === quizzes[currentQuiz].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuiz = () => {
    if (currentQuiz < quizzes.length - 1) {
      setCurrentQuiz(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const progressData = [
    { skill: 'Произношение', progress: 75, icon: 'Volume2' },
    { skill: 'Иероглифы', progress: 60, icon: 'Languages' },
    { skill: 'Грамматика', progress: 40, icon: 'BookOpen' },
    { skill: 'Аудирование', progress: 55, icon: 'Headphones' },
    { skill: 'Говорение', progress: 30, icon: 'Mic' }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">中</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">ChineseLearn</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                <Icon name="Trophy" size={14} className="mr-1" />
                Уровень 1
              </Badge>
              <div className="flex items-center space-x-2">
                <Icon name="Flame" size={20} className="text-orange-500" />
                <span className="font-semibold text-gray-700">7 дней</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Progress Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="TrendingUp" size={24} className="text-blue-600" />
                  Ваш прогресс
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {progressData.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon name={item.icon} size={18} className="text-gray-600" />
                        <span className="font-medium text-gray-700">{item.skill}</span>
                      </div>
                      <span className="text-sm text-gray-500">{item.progress}%</span>
                    </div>
                    <Progress value={item.progress} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quiz Section */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Brain" size={24} className="text-purple-600" />
                  Интерактивный тест
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Вопрос {currentQuiz + 1} из {quizzes.length}
                    </span>
                    <Badge variant="outline">Очки: {score}</Badge>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900">
                    {quizzes[currentQuiz].question}
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {quizzes[currentQuiz].options.map((option, index) => (
                      <Button
                        key={index}
                        variant={
                          showResult && index === quizzes[currentQuiz].correctAnswer
                            ? "default"
                            : showResult && index === selectedAnswer && index !== quizzes[currentQuiz].correctAnswer
                            ? "destructive"
                            : selectedAnswer === index
                            ? "secondary"
                            : "outline"
                        }
                        className="h-auto p-4 text-left justify-start"
                        onClick={() => !showResult && handleAnswerSelect(index)}
                        disabled={showResult}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                  
                  {showResult && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <Icon name="Info" size={16} className="inline mr-1" />
                        {quizzes[currentQuiz].explanation}
                      </p>
                      {currentQuiz < quizzes.length - 1 && (
                        <Button onClick={nextQuiz} className="mt-3" size="sm">
                          Следующий вопрос
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Flashcards Section */}
          <div className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="RotateCcw" size={24} className="text-green-600" />
                  Карточки для изучения
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div 
                    className="relative h-48 cursor-pointer perspective-1000"
                    onClick={() => setIsFlipped(!isFlipped)}
                  >
                    <div className={`absolute inset-0 w-full h-full transition-transform duration-500 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                      {/* Front */}
                      <div className="absolute inset-0 w-full h-full backface-hidden">
                        <div className="h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex flex-col items-center justify-center text-white p-6">
                          <div className="text-4xl font-bold mb-2">
                            {flashCards[currentCardIndex].chinese}
                          </div>
                          <div className="text-lg opacity-90">
                            {flashCards[currentCardIndex].pinyin}
                          </div>
                          <Badge variant="secondary" className="mt-4 bg-white/20 text-white">
                            {flashCards[currentCardIndex].category}
                          </Badge>
                        </div>
                      </div>
                      
                      {/* Back */}
                      <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
                        <div className="h-full bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center text-white p-6">
                          <div className="text-2xl font-semibold text-center">
                            {flashCards[currentCardIndex].russian}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Button variant="outline" size="sm" onClick={prevCard}>
                      <Icon name="ChevronLeft" size={16} />
                    </Button>
                    <span className="text-sm text-gray-500">
                      {currentCardIndex + 1} / {flashCards.length}
                    </span>
                    <Button variant="outline" size="sm" onClick={nextCard}>
                      <Icon name="ChevronRight" size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{completedLessons}</div>
                    <div className="text-xs text-gray-500">Уроков пройдено</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{flashCards.length}</div>
                    <div className="text-xs text-gray-500">Слов изучено</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Learning Goals */}
        <div className="mt-8">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Target" size={24} className="text-red-600" />
                Цели обучения
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { goal: "Выучить 100 слов", current: 45, total: 100, icon: "Book" },
                  { goal: "Пройти 10 уроков", current: 3, total: 10, icon: "GraduationCap" },
                  { goal: "7 дней подряд", current: 7, total: 7, icon: "Calendar" }
                ].map((item, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name={item.icon} size={18} className="text-blue-600" />
                      <span className="font-medium text-sm">{item.goal}</span>
                    </div>
                    <Progress value={(item.current / item.total) * 100} className="h-2" />
                    <div className="text-xs text-gray-500 mt-1">
                      {item.current} / {item.total}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default Index;