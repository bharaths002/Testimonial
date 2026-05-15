/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote, BookOpen, Star, Feather } from 'lucide-react';

// --- Types ---

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
  rating: number;
}

// --- Data ---

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Eleanor Vance',
    role: 'Editor-in-Chief',
    company: 'The Atlantic Review',
    content: "Ink & Insight has transformed how we discover new voices. Their platform isn't just a tool; it's a sanctuary for the written word in a digital desert.",
    image: 'https://picsum.photos/seed/eleanor/400/600',
    rating: 5,
  },
  {
    id: '2',
    name: 'Julian Thorne',
    role: 'Novelist',
    company: 'Independent Archive',
    content: "The depth of analysis provided by their AI is astonishing. It feels as though a seasoned literary critic is reading over your shoulder, offering profound wisdom.",
    image: 'https://picsum.photos/seed/julian/400/600',
    rating: 5,
  },
  {
    id: '3',
    name: 'Sarah Drasner',
    role: 'Creative Director',
    company: 'Lumina Publishing',
    content: "Rarely do you find a startup that understands the soul of literature while mastering the precision of technology. They are the bridge between the past and the future.",
    image: 'https://picsum.photos/seed/sarah/400/600',
    rating: 4,
  },
  {
    id: '4',
    name: 'Marcus Gray',
    role: 'Literary Agent',
    company: 'Gray & Sons',
    content: "We've found our most promising debut authors through this ecosystem. It's an indispensable filter for quality in an era of quantity.",
    image: 'https://picsum.photos/seed/marcus/400/600',
    rating: 5,
  },
];

// --- Components ---

const PageCover = ({ title, subtitle }: { title: string; subtitle: string }) => {
  return (
    <div className="page page-cover bg-editorial-paper shadow-inner flex flex-col items-center justify-between py-20 px-12 border-r border-black/10">
      <div className="text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.5 }}
           className="w-16 h-[1px] bg-editorial-text/20 mx-auto mb-8"
        />
        <h2 className="text-6xl font-serif font-medium tracking-tighter text-editorial-text mb-4 italic">
          {title}
        </h2>
        <p className="text-[10px] font-sans uppercase tracking-[0.4em] text-editorial-accent font-bold">
          {subtitle}
        </p>
      </div>
      
      <div className="relative w-full aspect-[3/4] overflow-hidden rounded-sm shadow-2xl border border-gray-200">
        <img 
          src="https://picsum.photos/seed/literature/800/1200?grayscale" 
          alt="Cover Art" 
          className="w-full h-full object-cover opacity-80"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#fdfaf6]/80 to-transparent" />
        <div className="absolute bottom-8 left-8 right-8">
           <div className="flex items-center gap-2 mb-2">
             <Feather size={16} className="text-gray-900" />
             <span className="text-xs font-sans font-semibold uppercase tracking-widest text-gray-900">Issue No. 01</span>
           </div>
           <p className="text-xl font-serif text-gray-900 italic">Conversations on the Future of Storytelling</p>
        </div>
      </div>

      <div className="text-center font-serif text-gray-400 italic">
        Established 2024
      </div>
    </div>
  );
};

const PageContent = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="page bg-editorial-paper flex flex-col justify-between p-16 h-full shadow-inner border-l border-black/10 overflow-hidden relative">
      {/* Spine Shadow */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/5 to-transparent pointer-events-none" />
      
      <div>
        <div className="flex justify-between items-start mb-12">
          <span className="text-6xl font-serif text-[#d4d1cc] leading-none">
            {testimonial.id.padStart(2, '0')}
          </span>
          <div className="flex gap-1 text-editorial-gold">
             {[...Array(5)].map((_, i) => (
               <Star key={i} size={10} fill={i < testimonial.rating ? "currentColor" : "none"} className={i < testimonial.rating ? "text-editorial-gold" : "text-gray-200"} />
             ))}
          </div>
        </div>

        <blockquote className="relative">
          <h1 className="text-3xl font-serif leading-tight text-editorial-text italic font-medium mb-8">
            "{testimonial.content}"
          </h1>
        </blockquote>
      </div>

      <div className="flex items-center gap-6 border-t border-black/5 pt-8">
        <div className="w-12 h-12 overflow-hidden rounded-full border border-black/5 bg-[#e8e4db] grayscale hover:grayscale-0 transition-all duration-700">
          <img 
            src={testimonial.image} 
            alt={testimonial.name} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-editorial-text">{testimonial.name}</h4>
          <p className="text-[10px] font-sans uppercase tracking-widest text-editorial-accent font-bold">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
};

const TableOfContents = () => {
  return (
    <div className="page bg-editorial-paper flex flex-col p-16 h-full shadow-inner border-r border-black/10 relative">
      {/* Spine Shadow */}
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/5 to-transparent pointer-events-none" />
      
      <h3 className="text-[10px] font-sans uppercase tracking-[0.4em] text-editorial-accent mb-12 font-bold">Issue 01 / Table of Readers</h3>
      <div className="space-y-8 flex-1">
        {testimonials.map((t, i) => (
          <div key={t.id} className="group cursor-pointer">
            <div className="flex items-end justify-between mb-2">
              <span className="text-[10px] font-sans text-editorial-accent font-bold">0{i + 1}</span>
              <div className="flex-1 border-b border-black/5 mx-4 border-dotted" />
              <span className="text-[10px] font-sans uppercase tracking-widest text-editorial-accent">Pg {i + 3}</span>
            </div>
            <h4 className="text-lg font-serif text-editorial-text italic group-hover:pl-2 transition-all duration-300">
              {t.name}
            </h4>
          </div>
        ))}
      </div>
      <div className="mt-auto pt-12 text-[10px] font-sans uppercase tracking-widest text-editorial-accent font-bold">
        Lumina Literature Collective © 2024
      </div>
    </div>
  );
};

const BackCover = () => {
  return (
    <div className="page bg-[#1a1a1a] flex flex-col items-center justify-center p-16 h-full shadow-2xl border-l border-black text-white text-center">
      <div className="w-12 h-12 mb-8 flex items-center justify-center border border-white/20 rounded-full">
        <BookOpen size={20} className="text-white" />
      </div>
      <h3 className="text-3xl font-serif italic mb-4">Ink & Insight</h3>
      <p className="max-w-xs text-sm font-sans text-white/50 leading-relaxed mb-12 uppercase tracking-tighter">
        Empowering the next generation of narrative explorers through technology and tradition.
      </p>
      <div className="w-24 h-[1px] bg-white/20 mb-12" />
      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-sans uppercase tracking-[0.5em] text-white/30">Connect</span>
        <span className="text-xs font-sans hover:text-white/80 cursor-pointer">inkandinsight.com</span>
      </div>
    </div>
  );
};

// --- Main FlipBook App ---

export default function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const flipBookRef = useRef<any>(null);

  const onPage = useCallback((e: any) => {
    setCurrentPage(e.data);
  }, []);

  const next = () => {
    flipBookRef.current.pageFlip().flipNext();
  };

  const prev = () => {
    flipBookRef.current.pageFlip().flipPrev();
  };

  return (
    <div className="min-h-screen bg-editorial-bg flex flex-col select-none overflow-hidden font-serif selection:bg-editorial-gold selection:text-white">
      {/* Background Shadow for Depth behind the book */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[80%] bg-black/40 blur-3xl rounded-full pointer-events-none" />

      <header className="w-full h-16 flex items-center justify-between px-12 border-b border-white/5 bg-editorial-bg z-20">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white flex items-center justify-center font-bold text-black italic text-xl">L</div>
          <span className="text-white tracking-[0.2em] text-xs font-sans uppercase">Lumina Literature</span>
        </div>
        <nav className="flex space-x-8 text-[10px] text-white/40 uppercase tracking-[0.3em] font-sans items-baseline">
          <span className="hover:text-white cursor-pointer transition-colors">Archive</span>
          <span className="text-white border-b border-white/40 pb-1">Testimonials</span>
          <span className="hover:text-white cursor-pointer transition-colors">Submissions</span>
          <span className="hover:text-white cursor-pointer underline decoration-white/20 underline-offset-4 transition-colors">Contact</span>
        </nav>
      </header>

      <main className="flex-1 flex items-center justify-center p-12 relative overflow-hidden lg:overflow-visible">
        {/* FlipBook Container */}
        <div className="relative group">
          <AnimatePresence mode="wait">
             <motion.div
               key="flipbook"
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
               className="shadow-[0_50px_100px_rgba(0,0,0,0.5)] rounded-sm overflow-hidden"
             >
                {/* @ts-ignore */}
                <HTMLFlipBook
                  width={550}
                  height={733}
                  size="stretch"
                  minWidth={315}
                  maxWidth={1000}
                  minHeight={420}
                  maxHeight={1400}
                  maxShadowOpacity={0.5}
                  showCover={true}
                  mobileScrollSupport={true}
                  onFlip={onPage}
                  className="testimonial-flipbook"
                  ref={flipBookRef}
                  style={{}}
                  startPage={0}
                  drawShadow={true}
                  flippingTime={1000}
                  usePortrait={false}
                  startZIndex={0}
                  autoSize={true}
                  clickEventForward={true}
                  useMouseEvents={true}
                  swipeDistance={30}
                  showPageCorners={false}
                  disableFlipByClick={false}
                >
                  <div className="p-0 m-0 w-full h-full"><PageCover title="Testimonials" subtitle="The Literature Collective" /></div>
                  <div className="p-0 m-0 w-full h-full"><TableOfContents /></div>
                  
                  {testimonials.map((t) => (
                    <div key={t.id} className="p-0 m-0 w-full h-full">
                      <PageContent testimonial={t} />
                    </div>
                  ))}
                  
                  {/* Empty page if odd number of content pages to fix back cover alignment */}
                  <div className="p-0 m-0 w-full h-full bg-[#fdfaf6] border-l border-gray-200 shadow-inner" />
                  
                  <div className="p-0 m-0 w-full h-full"><BackCover /></div>
                </HTMLFlipBook>
             </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="hidden lg:block">
            <button 
              onClick={prev}
              className="absolute -left-24 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/5 cursor-pointer text-white/40 transition-all hover:text-white hover:border-white/40"
              disabled={currentPage === 0}
            >
              <ChevronLeft size={24} strokeWidth={1.5} />
            </button>
            <button 
              onClick={next}
              className="absolute -right-24 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/5 cursor-pointer text-white/40 transition-all hover:text-white hover:border-white/40"
              disabled={currentPage === (testimonials.length + 3)}
            >
              <ChevronRight size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </main>

      <footer className="h-20 w-full flex items-center justify-center px-12 bg-editorial-bg text-white/30 space-x-12 z-20 border-t border-white/5">
        <div className="flex space-x-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div 
              key={i} 
              className={`w-1 h-1 rounded-full transition-colors ${Math.floor(currentPage/2) === i ? 'bg-white' : 'bg-white/20'}`} 
            />
          ))}
        </div>
        <div className="hidden md:flex items-center space-x-4 border-l border-white/10 pl-12 font-sans">
          <span className="text-[9px] tracking-[0.3em] uppercase">Click corners or use arrows to flip</span>
          <div className="flex items-center space-x-2">
             <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[8px] uppercase tracking-tighter">ESC</kbd>
             <span className="text-[8px] uppercase tracking-widest">Exit Reader</span>
          </div>
        </div>
      </footer>
      
      <style>{`
        .testimonial-flipbook {
           background: transparent;
           perspective: 3000px;
        }
        .page {
          background-image: url('https://www.transparenttextures.com/patterns/natural-paper.png');
          background-size: 400px;
          background-repeat: repeat;
          box-sizing: border-box;
          box-shadow: inset 0 0 100px rgba(0,0,0,0.02);
        }
        /* Realistic Page Stacking Effect */
        .page-cover, .back-cover {
           box-shadow: 0 0 20px rgba(0,0,0,0.2);
        }
        /* Page edge depth shadows */
        .page::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          box-shadow: inset -1px 0 2px rgba(0,0,0,0.05);
        }
        /* Shadow for the side of the book block when open */
        .testimonial-flipbook .stf__block {
           box-shadow: 0 40px 80px -20px rgba(0,0,0,0.4);
        }
        /* Spine Gutter Shadow for spreads */
        .page-content-left {
          box-shadow: inset -30px 0 30px -20px rgba(0,0,0,0.1) !important;
        }
        .page-content-right {
          box-shadow: inset 30px 0 30px -20px rgba(0,0,0,0.1) !important;
        }
      `}</style>
    </div>
  );
}
