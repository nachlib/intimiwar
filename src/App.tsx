import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';
import { cards, CardData } from './data/cards';

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotate: direction > 0 ? 10 : -10,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotate: direction < 0 ? 10 : -10,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = cards.length - 1;
      if (nextIndex >= cards.length) nextIndex = 0;
      return nextIndex;
    });
  };

  const currentCard = cards[currentIndex];

  const getCategoryColor = (category: CardData['category']) => {
    switch (category) {
      case 'רגש': return 'bg-cyan-400';
      case 'ראש': return 'bg-orange-400';
      case 'פיזיות': return 'bg-rose-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="fixed inset-0 bg-[#fdfcfb] flex flex-col items-center justify-center overflow-hidden font-sans" dir="rtl">
      {/* Background patterns similar to the image */}
      <div className="absolute top-0 left-0 w-full h-24 opacity-20 pointer-events-none overflow-hidden">
        <div className="flex space-x-[-10px] text-red-500">
          {Array.from({ length: 20 }).map((_, i) => (
            <svg key={i} viewBox="0 0 100 100" className="w-12 h-12 fill-current">
              <path d="M50 0 C70 30 90 40 100 100 L0 100 C10 40 30 30 50 0" />
            </svg>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-24 opacity-20 pointer-events-none overflow-hidden rotate-180">
        <div className="flex space-x-[-10px] text-red-500">
          {Array.from({ length: 20 }).map((_, i) => (
            <svg key={i} viewBox="0 0 100 100" className="w-12 h-12 fill-current">
              <path d="M50 0 C70 30 90 40 100 100 L0 100 C10 40 30 30 50 0" />
            </svg>
          ))}
        </div>
      </div>

      <div className="relative w-full max-w-md h-[70vh] flex items-center justify-center px-6">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.3 },
              rotate: { duration: 0.3 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className={`absolute w-full aspect-[3/4] max-w-[320px] ${currentCard.color} rounded-[40px] shadow-2xl border border-black/5 flex flex-col items-center justify-between p-8 cursor-grab active:cursor-grabbing`}
          >
            <div className="w-full flex justify-center">
              <span className={`${getCategoryColor(currentCard.category)} text-white text-xs px-4 py-1 rounded-full font-bold shadow-sm`}>
                {currentCard.category}
              </span>
            </div>

            <div className="flex-1 flex items-center justify-center text-center">
              <h2 className="text-2xl md:text-3xl font-black text-gray-800 leading-tight">
                {currentCard.text}
              </h2>
            </div>

            <div className="w-full flex flex-col items-center space-y-4">
              <div className="flex items-center space-y-[-4px] flex-col">
                <div className="w-12 h-1 bg-red-400 rounded-full opacity-60"></div>
                <div className="w-8 h-1 bg-red-400 rounded-full opacity-40 mt-1"></div>
              </div>
              <span className="text-[10px] text-gray-400 font-medium tracking-wider">@intimacy.co.il</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="mt-12 flex items-center space-x-8 space-x-reverse">
        <button
          onClick={() => paginate(-1)}
          className="p-4 bg-white rounded-full shadow-lg text-gray-600 hover:text-red-500 transition-colors active:scale-90"
        >
          <ChevronRight size={24} />
        </button>
        
        <div className="flex flex-col items-center">
          <span className="text-sm font-bold text-gray-400 mb-1">
            {currentIndex + 1} מתוך {cards.length}
          </span>
          <button
            onClick={() => {
              setDirection(0);
              setCurrentIndex(Math.floor(Math.random() * cards.length));
            }}
            className="flex items-center space-x-2 space-x-reverse text-xs font-bold text-gray-500 hover:text-gray-800 transition-colors"
          >
            <RefreshCw size={14} />
            <span>אקראי</span>
          </button>
        </div>

        <button
          onClick={() => paginate(1)}
          className="p-4 bg-white rounded-full shadow-lg text-gray-600 hover:text-red-500 transition-colors active:scale-90"
        >
          <ChevronLeft size={24} />
        </button>
      </div>

      <div className="mt-8 text-center px-8">
        <p className="text-xs text-gray-400 leading-relaxed">
          החליקו ימינה או שמאלה כדי לעבור בין הקלפים<br/>
          שיח פתוח הוא המפתח לחיבור עמוק
        </p>
      </div>
    </div>
  );
}
