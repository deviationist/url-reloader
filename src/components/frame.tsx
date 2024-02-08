'use client';

import { useEffect, useRef, useState, ReactEventHandler } from 'react';

import Spinner from './spinner';

export default function Frame() {
  const [run, setRun] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [random, setRandom] = useState(Math.random());
  const [countDown, setCountDown] = useState(0);
  
  const waitTime = process.env.NEXT_PUBLIC_FRAME_RELOAD_WAITTIME_MS;
  const url = process.env.NEXT_PUBLIC_FRAME_URL;
  const interval = useRef<NodeJS.Timeout|null>();

  useEffect(() => {
    if (run) {
      startCountDown();
    } else {
      stopCountDown();
    }
  }, [run]);

  const startCountDown = () => {
    if (interval.current) {
      return;
    }
    let countDown = waitTime / 1000;
    setCountDown(countDown);
    setIsCountingDown(true);
    interval.current = setInterval(() => {
      countDown--;
      setCountDown(countDown);
      if (countDown === 0) {
        setIsCountingDown(false);
        stopCountDown();
        reloadFrame();
      }
    }, 1000);
  };

  const stopCountDown = () => {
    if (interval.current) {
      clearInterval(interval.current);
      interval.current = null;
    }
    setIsCountingDown(false);
  };

  const reloadFrame = () => {
    setIsLoading(true);
    setRandom(Math.random());
  };

  const frameLoaded: ReactEventHandler<HTMLIFrameElement> = (event) => {
    setIsLoading(false);
    if (run) {
      startCountDown();
    }
  };

  return (
    <div className='w-full'>
      <div className='flex'>
        <a href={url} target='_blank' className='p-4 text-center text-2xl block w-1/2 bg-indigo-400 text-white'>GO</a>
        <button className='p-4 text-center text-2xl block w-1/2 bg-green-400 hover:bg-green-600 text-white flex justify-center gap-x-2' type="button" onClick={() => setRun(!run)}>
          { run ? 'Stop' : 'Start' }
          <div className='w-12 flex items-center'>
            { isLoading ? <Spinner fill='green-600' /> : (
              isCountingDown && countDown > 0 && '(' + countDown + ')'
            )}
          </div>
        </button>
      </div>
      <iframe onLoad={frameLoaded} key={random} src={url} className='h-screen w-screen' />
    </div>
  );
}