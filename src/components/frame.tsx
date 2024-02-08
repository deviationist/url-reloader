'use client';

import { useEffect, useState } from 'react';

export default function Frame() {
  const [run, setRun] = useState(false);
  const [random, setRandom] = useState(Math.random());
  const waitTime = 1000;
  const url = process.env.FRAME_URL;

  useEffect(() => {
    if (run) {
      reloadFrame();
    }
  }, [run]);
  const reloadFrame = () => {
    setRandom(Math.random());
  };
  const onLoad = () => {
    if (!run) {
      return;
    }
    setTimeout(() => {
      reloadFrame();
    }, waitTime);
  };
  return (
    <div className='w-full'>
      <div className='flex'>
        <a href={url} target='_blank' className='p-4 text-center text-2xl block w-1/2 bg-indigo-400 text-white'>GO</a>
        <button className='p-4 text-center text-2xl block w-1/2 bg-green-400 hover:bg-green-600 text-white' type="button" onClick={() => setRun(!run)}>{ run ? 'Stop' : 'Start' }</button>
      </div>
      <iframe onLoad={onLoad} key={random} src={url} className='h-screen w-screen' />
    </div>
  );
}