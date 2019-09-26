import React, { useEffect } from 'react';

const Timer = props => {
  const { time, savedTimerCallback, isGameOver } = props;

  useEffect(() => {
    if (!isGameOver) {
      const tick = () => savedTimerCallback.current();

      const id = setInterval(tick, 1000);
      return () => clearInterval(id);
    }
  }, [time, isGameOver])

  return (
    <div>
      Time: {time}
    </div>
  )
}

export default Timer;