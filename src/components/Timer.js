import React, { useEffect } from 'react';

const Timer = props => {
  const { time, savedTimerCallback } = props;

  useEffect(() => {
    const tick = () => savedTimerCallback.current();

    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [])

  return (
    <div>
      Time: {time}
    </div>
  )
}

export default Timer;