import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Music2, ExternalLink } from 'lucide-react'
import { LotusCoverCanvas, LOTUS_VIDEO } from './components/LotusCoverCanvas'
import { StarfieldCanvas } from './components/StarfieldCanvas'

type Screen = 'cover' | 'consent' | 'journey'

const consentItems = [
  ['匿名', '我们不会收集你的姓名、联系方式等能认出你是谁的信息。'],
  ['自愿', '参不参加完全由你决定。'],
  ['随时退出', '中途不想填了，随时关掉页面离开就行。'],
  ['数据用途', '你的回答只用于这个课堂研究，不会作别的用途。'],
]

function Cover({ onEnter }: { onEnter: () => void }) {
  const [titleVisible, setTitleVisible] = useState(false)
  const [ready, setReady] = useState(false)

  return (
    <main className="relative flex min-h-[115vh] w-full flex-col items-center overflow-x-hidden font-serif-en selection:bg-white/20 selection:text-white">
      <StarfieldCanvas />
      <LotusCoverCanvas
        onTitleReveal={() => setTitleVisible(true)}
        onSequenceComplete={() => setReady(true)}
      />

      <div className="pointer-events-none relative z-10 flex w-full max-w-7xl flex-1 flex-col items-center px-6 pt-[22vh] pb-8 text-center">
        <AnimatePresence>
          {titleVisible && (
            <motion.div
              className="pointer-events-none flex flex-col items-center"
              initial={{ opacity: 0, filter: 'blur(14px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="font-serif-en text-[clamp(2rem,6.5vw,4.5rem)] font-light tracking-[0.22em] text-[#f5e6c8] drop-shadow-[0_0_40px_rgba(216,180,106,0.35)]">
                REFRAME DESTINY
              </h1>
              <p className="mt-4 font-serif-cn text-[clamp(1rem,2.8vw,1.6rem)] font-light tracking-[0.38em] text-[#e8e4d8]/92">
                重塑命运
              </p>
              <p className="mt-3 font-serif-en text-[clamp(0.85rem,1.8vw,1.15rem)] italic tracking-[0.12em] text-[#d8b46a]/88">
                Question the Story. Not Yourself.
              </p>
              <p className="mt-1.5 font-serif-cn text-sm tracking-[0.2em] text-[#e8e4d8]/62">
                质疑叙事，而非质疑自己。
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {ready && (
            <motion.div
              className="pointer-events-auto mt-12 flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.button
                type="button"
                onClick={onEnter}
                className="liquid-glass group min-w-56 px-8 py-4 font-serif-cn text-sm tracking-[0.22em] text-[#eef3f0]/88 transition duration-700 hover:-translate-y-0.5 hover:text-white"
                whileTap={{ scale: 0.985 }}
              >
                Enter / 进入旅程
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {ready && (
            <motion.footer
              className="liquid-glass liquid-glass-card noise-overlay relative z-10 mt-32 w-full rounded-3xl p-6 text-[#e8e4d8]/70 md:mt-48 md:p-10"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
            >
              <div className="mb-10 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
                <div>
                  <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-[#eef3f0]">
                    Explore
                  </h3>
                  <ul className="space-y-2 text-xs text-[#e8e4d8]/55">
                    <li>八字 / 星盘旅程</li>
                    <li>偏见扫描器</li>
                    <li>命运法庭</li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-[#eef3f0]">
                    Research
                  </h3>
                  <ul className="space-y-2 text-xs text-[#e8e4d8]/55">
                    <li>前测 / 后测</li>
                    <li>匿名数据收集</li>
                    <li>课堂研究 2026</li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-[#eef3f0]">
                    Ethics
                  </h3>
                  <ul className="space-y-2 text-xs text-[#e8e4d8]/55">
                    <li>自愿参与</li>
                    <li>非临床</li>
                    <li>随时退出</li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-6 md:flex-row md:gap-4">
                <p className="text-[10px] uppercase tracking-widest opacity-50">
                  Reframe Destiny · Generation AI 2026
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] uppercase tracking-widest opacity-50">Follow:</span>
                  <a href="https://github.com/zxyztw5111/reframedestiny" className="opacity-70 transition hover:text-white hover:opacity-100" aria-label="GitHub">
                    <ExternalLink size={16} strokeWidth={1.5} />
                  </a>
                  <Music2 size={16} className="opacity-50" strokeWidth={1.5} />
                </div>
              </div>
            </motion.footer>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}

function ConsentGate({ onAgree }: { onAgree: () => void }) {
  return (
    <section className="relative grid min-h-screen place-items-center overflow-hidden px-5 py-16">
      <StarfieldCanvas />
      <video
        className="pointer-events-none fixed inset-0 z-0 h-full w-full scale-[1.15] object-cover brightness-[0.92] saturate-[1.45] contrast-[1.12]"
        src={LOTUS_VIDEO}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden
      />
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(ellipse_75%_60%_at_50%_42%,transparent_0%,rgba(2,4,12,0.28)_55%,rgba(1,2,8,0.62)_100%)]" />
      <motion.div
        className="liquid-glass liquid-glass-card noise-overlay relative z-10 w-full max-w-3xl px-6 py-8 text-left sm:px-10 sm:py-10"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="mb-3 font-serif-en text-xs uppercase tracking-[0.35em] text-[#d8b46a]/72">
          Informed Consent
        </p>
        <h2 className="font-serif-cn text-3xl font-light tracking-[0.16em] text-[#eef3f0] sm:text-4xl">
          参与前请先确认
        </h2>
        <p className="mt-5 font-serif-cn text-base leading-8 text-[#e8e4d8]/72">
          这是一个关于命理叙事如何影响自我理解的课堂研究。星空是他人写下的命运地图，莲花是你自己；每识别一片偏见，便在你专属的莲瓣上点亮一颗星。
        </p>
        <div className="mt-7 grid gap-4">
          {consentItems.map(([title, body]) => (
            <div key={title} className="rounded-2xl border border-white/8 bg-white/[0.035] p-4">
              <h3 className="font-serif-cn text-lg tracking-[0.18em] text-[#eef3f0]/92">{title}</h3>
              <p className="mt-2 font-serif-cn text-sm leading-7 text-[#e8e4d8]/68">{body}</p>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={onAgree}
          className="liquid-glass mt-8 w-full px-7 py-4 font-serif-cn text-sm tracking-[0.18em] text-[#eef3f0]/90 transition hover:text-white sm:w-auto"
        >
          我理解并同意进入
        </button>
      </motion.div>
    </section>
  )
}

function JourneyGame() {
  return (
    <iframe
      title="Reframe Destiny Journey"
      src="/game/?embedded=1"
      className="fixed inset-0 z-10 h-full w-full border-0 bg-[#05060a]"
    />
  )
}

function App() {
  const [screen, setScreen] = useState<Screen>('cover')

  function handleEnterFromCover() {
    setScreen('consent')
  }

  function handleAgree() {
    window.localStorage.setItem('rd-consent-v1', 'yes')
    setScreen('journey')
  }

  return (
    <AnimatePresence mode="wait">
      {screen === 'cover' && (
        <motion.div key="cover" exit={{ opacity: 0 }} transition={{ duration: 1.1 }}>
          <Cover onEnter={handleEnterFromCover} />
        </motion.div>
      )}
      {screen === 'consent' && (
        <motion.div key="consent" exit={{ opacity: 0 }} transition={{ duration: 1.1 }}>
          <ConsentGate onAgree={handleAgree} />
        </motion.div>
      )}
      {screen === 'journey' && (
        <motion.div key="journey" exit={{ opacity: 0 }} transition={{ duration: 1.1 }}>
          <JourneyGame />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default App
