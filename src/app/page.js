'use client';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useEffect, useState, useRef } from 'react';

export default function Home() {
  const [words, setWords] = useState([]);
  const text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.";

  let animation;
  const playAnim = () => {
    animation.play();
  }
  
  const dialoguePlaying = new Audio('/beep.mp3');
  const dialogueComplete = new Audio('/dialoguecomplete.mp3');

  useEffect(() => {
    const wordArray = text.split(' ');
    const wordsArray = wordArray.map(wordToChars);
    setWords(wordsArray);
  }, []);

  function wordToChars(word) {
    const charArray = [];
    const n = word.length;
    for (let i = 0; i < n; ++i) {
      charArray.push(word[i]);
    }
    return charArray;
  }

  useGSAP(() => {
    const animatedElements = gsap.utils.toArray('.js-animateText');
    animation = gsap.from(animatedElements, {
      duration: 0.05,
      opacity: 0,
      stagger: {
        each: 0.045,
        onStart: () => {
          dialoguePlaying.currentTime = 0;
          dialoguePlaying.play();
        },
      },
      onComplete: () => {
        dialogueComplete.play();
      },
    });
    animation.pause();
  }, [words]);

  

  return (
    <main className="h-screen w-full bg-white flex flex-col justify-center items-center overflow-hidden">
      <div className='text-black mx-[10vw] w-[80vw] h-[30vh] text-center overflow-y-scroll scroll-smooth no-scrollbar'>
        {words.map((word, idx1) => (
          <div className='inline-block' key={idx1}>
            {word.map((char, idx2) => (
              <span className='js-animateText relative inline-block text-7xl' key={idx2}>{char}</span>
            ))}
            <span className='text-7xl'>{'\u00A0'}</span>
          </div>
        ))}
      </div>

      <button onClick={() => {playAnim(); console.log('button clicked')}}>Click to Play</button>
    </main>
  );
}