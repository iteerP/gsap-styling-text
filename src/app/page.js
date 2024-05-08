'use client'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useEffect, useState, useRef } from 'react'

export default function Home() {
  const [words, setWords] = useState([]);
  const text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";

  function wordToChars(word) {
    const charArray = [];
    const n = word.length;
    for(let i = 0; i < n; ++i)
    {
      charArray.push(word[i]);
    }
    return charArray;
  }

  useEffect(() => {
    const wordArray = text.split(' ');
    const wordsArray = wordArray.map(wordToChars);
    setWords(wordsArray);
  }, []);

  useGSAP(() => {
    console.log("Animating elements:", document.querySelectorAll('.js-animateText'));
    gsap.from('.js-animateText', {
      duration: 0.05,
      stagger: 0.045,
      opacity: 0,
      onStart: () => {
        console.log('iteration');
      }
    });
  }, [words]);

  const playSound = () => {
    const sound = document.getElementById('audio');
    sound.play();
    console.log('clicked');
  }
  
  return (
    <main className="h-[100vh] w-auto bg-white grid place-content-center overflow-hidden">
      <div className='text-black mx-[10vw]'>
        {words.map((word, idx1) => (
          <div className='inline-block' key={idx1}>
            {word.map((char, idx2) => (
              <span className='js-animateText relative inline-block text-7xl' key={idx2}>{char}</span>
            ))}
            <span className='text-7xl'>{'\u00A0'}</span>
          </div>
        ))}

        <button onClick={playSound}>Click me</button>

        <audio id='audio'>
          <source src='https://drive.google.com/file/d/119n8FezrZ_fT6Nr0IlMEXifV3_8pDAj4/view' />
        </audio>
      </div>
    </main>
  );
}