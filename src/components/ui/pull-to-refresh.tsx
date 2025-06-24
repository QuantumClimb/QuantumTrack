import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
}

const PullToRefresh: React.FC<PullToRefreshProps> = ({ onRefresh, children }) => {
  const [startY, setStartY] = useState(0);
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const maxPullDistance = 150;

  const handleTouchStart = (e: TouchEvent) => {
    if (window.scrollY === 0) {
      setStartY(e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (startY === 0) return;

    const currentY = e.touches[0].clientY;
    const distance = Math.max(0, currentY - startY);
    
    if (distance > 0) {
      e.preventDefault();
      setPullDistance(Math.min(distance, maxPullDistance));
    }
  };

  const handleTouchEnd = async () => {
    if (pullDistance > 50) {
      setIsRefreshing(true);
      await onRefresh();
      setIsRefreshing(false);
    }
    setPullDistance(0);
    setStartY(0);
  };

  useEffect(() => {
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [pullDistance, startY]);

  const progress = (pullDistance / maxPullDistance) * 100;
  const rotation = progress * 2;

  return (
    <div className="relative">
      <AnimatePresence>
        {pullDistance > 0 && (
          <motion.div
            className="absolute top-0 left-0 right-0 flex items-center justify-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            style={{ height: pullDistance }}
          >
            <div className="flex flex-col items-center">
              <motion.div
                animate={{ rotate: rotation }}
                transition={{ type: 'spring', stiffness: 100 }}
              >
                <RefreshCw className="h-6 w-6 text-blue-500" />
              </motion.div>
              <span className="text-sm text-gray-500 mt-2">
                {progress >= 100 ? 'Release to refresh' : 'Pull down to refresh'}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        style={{ transform: `translateY(${pullDistance}px)` }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default PullToRefresh; 