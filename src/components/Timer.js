import React, { useEffect } from 'react';

const Timer = (props) => {
  const {
    time, isFirstClick, savedTimerCallback, isGameOver,
  } = props;

  useEffect(() => {
    if (!isGameOver && !isFirstClick) {
      const tick = () => savedTimerCallback.current();

      const id = setInterval(tick, 1000);
      return () => clearInterval(id);
    }
  }, [time, isGameOver, isFirstClick, savedTimerCallback]);

  return (
    <div>
      Time:
      {' '}
      {time}
    </div>
  );
};

export default Timer;
