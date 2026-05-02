import React, { useEffect, useMemo, useRef, useState } from "react";
import { LazyMotion, domAnimation, motion } from "framer-motion";
import sanaLogo from "./assets/sana-logo.png";
import voiceMp3 from "./assets/voice.mp3";
import {
  BookOpen,
  Building2,
  Crown,
  ExternalLink,
  Eye,
  Globe,
  Headphones,
  HeartHandshake,
  Languages,
  Layers3,
  Link2,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Mic2,
  MonitorPlay,
  Pause,
  Play,
  Radio,
  RotateCcw,
  Send,
  ShieldCheck,
  SkipBack,
  SkipForward,
  Sparkles,
  Stars,
  Target,
  Users,
  Volume2,
} from "lucide-react";

const ACCENT = "#D8A73E";
const CTA_DARK = "#020A14";

const PERSIAN_GRADIENT =
  "bg-[linear-gradient(135deg,#020A14_0%,#08203A_24%,#004B5E_48%,#4B1239_74%,#B8791A_100%)]";
const OUTER_GRADIENT = PERSIAN_GRADIENT;
const INNER_GRADIENT = PERSIAN_GRADIENT;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
};

const pulseGlow = {
  opacity: [0.2, 0.45, 0.2],
  scale: [1, 1.03, 1],
  transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
};

const containerClass =
  "relative z-10 mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-10 xl:px-14";
const glass =
  "border border-white/10 bg-white/10 md:backdrop-blur-xl backdrop-blur-sm shadow-[0_8px_22px_rgba(0,0,0,0.14)]";
const softCard = `rounded-[2rem] border border-white/10 ${OUTER_GRADIENT} md:backdrop-blur-xl backdrop-blur-sm shadow-[0_12px_34px_rgba(0,0,0,0.28)]`;
const gradientOuterCard = `rounded-[2rem] border border-white/10 ${OUTER_GRADIENT} md:backdrop-blur-xl backdrop-blur-sm shadow-[0_12px_34px_rgba(0,0,0,0.28)]`;

const navItems = [
  { label: "درباره ما", href: "#about" },
  { label: "ویژگی‌ها", href: "#features" },
  { label: "نمونه کارهای ما", href: "#portfolio" },
  { label: "همکاران", href: "#partners" },
  { label: "تماس با ما", href: "#contact" },
];

const stats = [
  { value: "+100", label: "زبان‌های جهانی هدف" },
  { value: "24/7", label: "دسترسی جهانی پیوسته" },
  { value: "114", label: "سوره‌های کامل" },
  { value: "کیفیت بالا", label: "صوت و ویدئوی باکیفیت" },
];

const heroCards = [
  { value: "114", label: "سوره‌ها" },
  { value: "30", label: "جزءهای قرآن" },
  { value: "پرداخت‌شده", label: "محتوای صوتی و تصویری" },
];

const heroBadges = [
  { icon: Sparkles, title: "نور و زیبایی قرآن" },
  { icon: Globe, title: "پیامی به جهان" },
];

const identityCards = [
  {
    icon: Users,
    title: "ما که هستیم",
    text: "سنا یک ابتکار وقفی است که برای رساندن معانی قرآن کریم به جهان از طریق کانال‌های صوتی و تصویری فعالیت می‌کند؛ کانال‌هایی که تلاوت زیبا را با ترجمه دقیق در هم می‌آمیزند و تجربه‌ای معنوی و کامل ارائه می‌دهند که کلام خدا را در زبان‌های گوناگون جهان به دل‌ها نزدیک‌تر می‌سازد.",
  },
  {
    icon: Eye,
    title: "چشم‌انداز",
    text: "تبدیل شدن به یک پلتفرم جهانی پیشرو در رساندن معانی قرآن کریم به هر انسان، به زبان خودش، با رویکردی نوین که زیبایی، کیفیت و فناوری پیشرفته را با هم پیوند می‌دهد.",
  },
  {
    icon: Target,
    title: "رسالت",
    text: "ارائه محتوای قرآنی ترجمه‌شده به‌صورت صوتی و تصویری، به گونه‌ای که معانی قرآن کریم روشن و در دسترس باشد و در هدایت انسان‌ها و معرفی کلام خدا به جهان، به شیوه‌ای جذاب و اثرگذار نقش‌آفرینی کند.",
  },
];

const features = [
  {
    icon: Languages,
    title: "ترجمه‌های چندزبانه",
    desc: "رساندن معانی قرآن کریم به مردم به زبان خودشان، با بیانی روشن و دقیق که پیام مورد نظر را حفظ می‌کند.",
  },
  {
    icon: Headphones,
    title: "تجربه یکپارچه صوتی و تصویری",
    desc: "کانال‌هایی که تلاوت اثرگذار را با متن ترجمه‌شده در تجربه‌ای آرام و شایسته عظمت قرآن در کنار هم قرار می‌دهند.",
  },
  {
    icon: Globe,
    title: "دسترسی جهانی مداوم",
    desc: "حضوری دیجیتال و ماهواره‌ای که دسترسی را در سراسر قاره‌ها و پلتفرم‌ها به‌صورت شبانه‌روزی فراهم می‌کند.",
  },
  {
    icon: HeartHandshake,
    title: "وقفی برای خدا",
    desc: "یک رسالت جهانی دعوت که هر کس از آن پشتیبانی کند، در آن سهیم شود یا از آن بهره ببرد، در پاداش آن شریک خواهد بود.",
  },
];

const channels = [
  {
    icon: Radio,
    title: "کانال‌های ماهواره‌ای و رادیویی",
    desc: "پخش معانی قرآن کریم از طریق کانال‌های صوتی و تصویری که به زبان خود مردم، به ملت‌های گوناگون می‌رسد.",
  },
  {
    icon: MonitorPlay,
    title: "شبکه‌های اجتماعی و وب‌سایت‌ها",
    desc: "حضوری دیجیتال و پویا که دسترسی و اشتراک‌گذاری محتوای قرآنی را در گستره‌ای وسیع آسان می‌سازد.",
  },
  {
    icon: Layers3,
    title: "اپلیکیشن‌ها و رسانه‌های دیجیتال متنوع",
    desc: "تجربه‌ای مدرن و انعطاف‌پذیر که به کاربران امکان می‌دهد محتوای قرآنی را متناسب با دستگاه‌ها و پلتفرم‌های مختلف دنبال کنند.",
  },
];

const partners = [
  {
    icon: ShieldCheck,
    title: "مراجع شرعی و مؤسسات اسلامی",
    desc: "مراکزی که ترجمه‌های معتبر معانی قرآن را ارائه کرده‌اند و دقت و پشتوانه علمی صحیح را تضمین می‌کنند.",
  },
  {
    icon: Mic2,
    title: "قاریان اثرگذار با صداهای زیبا",
    desc: "کسانی که با تلاوت‌های خاشعانه و اثرگذار خود پروژه را غنی کرده‌اند؛ تلاوت‌هایی که به شیوه‌ای دلنشین و جذاب به دل‌ها می‌رسد.",
  },
  {
    icon: Headphones,
    title: "شرکت‌های تولید صوت و خدمات فنی",
    desc: "مجموعه‌هایی که ضبط‌های باکیفیت و پردازش حرفه‌ای صوتی و تصویری را فراهم کرده‌اند.",
  },
  {
    icon: Users,
    title: "تهیه‌کنندگان و داوطلبان",
    desc: "افرادی که در توسعه و انتشار محتوا مشارکت کرده‌اند تا این پیام به گسترده‌ترین مخاطبان ممکن در سراسر جهان برسد.",
  },
];

const impactCards = [
  {
    icon: Globe,
    title: "گستره جهانی",
    desc: "پیام قرآن کریم از طریق زبان‌های متعدد که با مردم به زبان مادری‌شان سخن می‌گوید، به خانه‌هایی در کشورهای مختلف جهان رسیده است.",
  },
  {
    icon: Languages,
    title: "ترجمه‌های معتبر",
    desc: "ترجمه‌های دقیق معانی قرآن تحت نظارت مؤسسات علمی معتبر ارائه شده است تا صحت و اطمینان آن تضمین شود.",
  },
  {
    icon: Headphones,
    title: "تجربه یکپارچه",
    desc: "محتوایی که تلاوت خاشعانه را با ترجمه تصویری ترکیب می‌کند تا تجربه‌ای معنوی، اثرگذار و آسان‌فهم ایجاد شود.",
  },
  {
    icon: Send,
    title: "پیامی ماندگار",
    desc: "این پروژه با سبکی نوین که به مخاطبان گوناگون می‌رسد، در گسترش هدایت و معرفی کلام خدا به جهان نقش دارد.",
  },
];

const portfolioVideos = [
  `${import.meta.env.BASE_URL}videos/v1.mp4`,
  `${import.meta.env.BASE_URL}videos/v2.mp4`,
  `${import.meta.env.BASE_URL}videos/v3.mp4`,
];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}

function sectionBadge(icon, text, textColor = "text-white") {
  const Icon = icon;
  return (
    <div
      className={`inline-flex max-w-full items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2.5 text-xs font-semibold ${textColor} backdrop-blur-md shadow-[0_6px_18px_rgba(0,0,0,0.14)] sm:px-5 sm:py-3 sm:text-sm`}
    >
      <Icon className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: ACCENT }} />
      <span className="truncate">{text}</span>
    </div>
  );
}

function LargeSectionBadge({ icon: Icon, text }) {
  return (
    <div
      className="inline-flex max-w-full items-center gap-3 rounded-full border border-white/10 bg-white/10 px-5 py-3 text-base font-bold backdrop-blur-md shadow-[0_6px_18px_rgba(0,0,0,0.14)] sm:px-8 sm:py-4 sm:text-xl lg:text-2xl"
      style={{ color: ACCENT }}
    >
      <Icon
        className="h-5 w-5 shrink-0 sm:h-7 sm:w-7"
        style={{ color: ACCENT }}
      />
      <span className="truncate">{text}</span>
    </div>
  );
}

function AppStoreIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <path d="M9 15.5 14.5 8" />
      <path d="M11 8h4" />
      <path d="M9.5 15.5H15" />
      <path d="M10.5 12h5" />
    </svg>
  );
}

function GooglePlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 4.5v15l8.8-7.5L5 4.5Z" />
      <path d="m13.8 12 3.6-3 1.6 1.1c1.2.8 1.2 2.1 0 2.9L17.4 14l-3.6-2Z" />
      <path d="m17.4 9-8.2-3.6" />
      <path d="m17.4 15-8.2 3.6" />
    </svg>
  );
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function HeroAudioPlayer({ isMobile }) {
  const audioRef = useRef(null);
  const blobUrlRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationFrameRef = useRef(null);
  const previousBarsRef = useRef([]);

  const BARS_COUNT = isMobile ? 24 : 48;
  const HALF_BARS = BARS_COUNT / 2;
  const MIN_BAR_HEIGHT = isMobile ? 8 : 10;
  const MAX_BAR_HEIGHT = isMobile ? 22 : 34;

  const idleBars = useMemo(() => {
    const half = Array.from({ length: HALF_BARS }, (_, i) => {
      const t = i / Math.max(1, HALF_BARS - 1);
      return Math.round((isMobile ? 9 : 12) + t * 3);
    });
    return [...half.slice().reverse(), ...half];
  }, [HALF_BARS, isMobile]);

  const [bars, setBars] = useState(idleBars);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    previousBarsRef.current = idleBars;
    setBars(idleBars);
  }, [idleBars]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let cancelled = false;

    const loadAudioAsBlob = async () => {
      try {
        const response = await fetch(voiceMp3, { cache: "force-cache" });
        const blob = await response.blob();
        if (cancelled) return;

        const objectUrl = URL.createObjectURL(blob);
        blobUrlRef.current = objectUrl;
        audio.src = objectUrl;
        audio.load();
      } catch {
        if (!cancelled) {
          audio.src = voiceMp3;
          audio.load();
        }
      }
    };

    loadAudioAsBlob();

    return () => {
      cancelled = true;
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => setDuration(audio.duration || 0);
    const onTime = () => setCurrentTime(audio.currentTime || 0);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      previousBarsRef.current = idleBars;
      setBars(idleBars);
    };

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("durationchange", onLoaded);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("durationchange", onLoaded);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, [idleBars]);

  useEffect(() => {
    if (isMobile && !isPlaying) {
      previousBarsRef.current = idleBars;
      setBars(idleBars);
      return;
    }

    if (!isPlaying) {
      previousBarsRef.current = idleBars;
      setBars(idleBars);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    const analyser = analyserRef.current;
    if (!analyser) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

    const animateBars = () => {
      analyser.getByteFrequencyData(dataArray);

      let total = 0;
      for (let i = 0; i < bufferLength; i += 1) total += dataArray[i];
      const globalEnergy = total / bufferLength / 255;

      const halfBars = Array.from({ length: HALF_BARS }, (_, index) => {
        const start = Math.floor((index / HALF_BARS) * bufferLength);
        const end = Math.floor(((index + 1) / HALF_BARS) * bufferLength);

        let localSum = 0;
        let count = 0;

        for (let i = start; i < end; i += 1) {
          localSum += dataArray[i];
          count += 1;
        }

        const localEnergy = count ? localSum / count / 255 : 0;
        const mixedEnergy = localEnergy * 0.68 + globalEnergy * 0.32;
        const height =
          MIN_BAR_HEIGHT + mixedEnergy * (MAX_BAR_HEIGHT - MIN_BAR_HEIGHT);

        return clamp(height, MIN_BAR_HEIGHT, MAX_BAR_HEIGHT);
      });

      const mirroredBars = [...halfBars.slice().reverse(), ...halfBars];

      const animatedBars = mirroredBars.map((value, index) => {
        const previous = previousBarsRef.current[index] ?? idleBars[index];
        return Math.round(previous * 0.55 + value * 0.45);
      });

      previousBarsRef.current = animatedBars;
      setBars(animatedBars);
      animationFrameRef.current = requestAnimationFrame(animateBars);
    };

    animationFrameRef.current = requestAnimationFrame(animateBars);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [
    HALF_BARS,
    MAX_BAR_HEIGHT,
    MIN_BAR_HEIGHT,
    idleBars,
    isPlaying,
    isMobile,
  ]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (
        audioContextRef.current &&
        audioContextRef.current.state !== "closed"
      ) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  const setupAnalyser = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioContextRef.current) {
      const context = new AudioContextClass();
      const analyser = context.createAnalyser();
      analyser.fftSize = 128;
      analyser.smoothingTimeConstant = 0.92;

      const source = context.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(context.destination);

      audioContextRef.current = context;
      analyserRef.current = analyser;
    }

    if (audioContextRef.current?.state === "suspended") {
      await audioContextRef.current.resume().catch(() => {});
    }
  };

  const progress = useMemo(
    () => (duration ? (currentTime / duration) * 100 : 0),
    [currentTime, duration]
  );

  const togglePlay = async () => {
    const el = audioRef.current;
    if (!el) return;

    await setupAnalyser();

    if (el.paused) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  };

  const seekBy = (delta) => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = Math.max(
      0,
      Math.min(el.duration || 0, (el.currentTime || 0) + delta)
    );
  };

  const replay = async () => {
    const el = audioRef.current;
    if (!el) return;
    await setupAnalyser();
    el.currentTime = 0;
    el.play().catch(() => {});
  };

  const toggleMute = () => {
    const el = audioRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  };

  const handleSeek = (event) => {
    const el = audioRef.current;
    if (!el) return;
    const next = Number(event.target.value);
    el.currentTime = next;
    setCurrentTime(next);
  };

  return (
    <div className="mt-5 rounded-[1.35rem] border border-white/10 bg-[rgba(17,24,39,0.55)] p-3 sm:p-4">
      <audio
        ref={audioRef}
        preload="metadata"
        onContextMenu={(e) => e.preventDefault()}
      />

      <div className="mb-4 flex h-14 items-end gap-[2px] overflow-hidden rounded-2xl border border-white/10 bg-black/10 px-2 py-3 sm:h-18">
        {bars.map((height, index) => (
          <motion.div
            key={index}
            animate={{ height }}
            transition={{ duration: isMobile ? 0.2 : 0.14, ease: "easeOut" }}
            className={`flex-1 self-end rounded-full ${OUTER_GRADIENT} opacity-95`}
            style={{ maxHeight: `${MAX_BAR_HEIGHT}px` }}
          />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={togglePlay}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
          aria-label={isPlaying ? "توقف" : "پخش"}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" style={{ color: ACCENT }} />
          ) : (
            <Play className="h-4 w-4" style={{ color: ACCENT }} />
          )}
        </button>

        <button
          type="button"
          onClick={() => seekBy(-10)}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
          aria-label="بازگشت"
        >
          <SkipBack className="h-4 w-4" style={{ color: ACCENT }} />
        </button>

        <button
          type="button"
          onClick={replay}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
          aria-label="پخش دوباره"
        >
          <RotateCcw className="h-4 w-4" style={{ color: ACCENT }} />
        </button>

        <button
          type="button"
          onClick={() => seekBy(10)}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
          aria-label="جلو رفتن"
        >
          <SkipForward className="h-4 w-4" style={{ color: ACCENT }} />
        </button>

        <button
          type="button"
          onClick={toggleMute}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
          aria-label="صدا"
        >
          <Volume2
            className={`h-4 w-4 ${muted ? "opacity-50" : ""}`}
            style={{ color: ACCENT }}
          />
        </button>

        <div className="min-w-[52px] text-xs text-white/75">
          {formatTime(currentTime)}
        </div>

        <div className="relative h-2 w-full flex-1 overflow-visible rounded-full bg-white/10">
          <div
            className={`absolute inset-y-0 right-0 rounded-full ${OUTER_GRADIENT}`}
            style={{ width: `${progress}%` }}
          />
          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={currentTime}
            onChange={handleSeek}
            className="audio-range absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none bg-transparent [direction:rtl]"
            style={{ WebkitAppearance: "none" }}
          />
        </div>
      </div>

      <style>{`
        .audio-range::-webkit-slider-runnable-track { height: 8px; background: transparent; }
        .audio-range::-moz-range-track { height: 8px; background: transparent; }
        .audio-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          margin-top: -3px;
          border-radius: 999px;
          border: 2px solid rgba(255,255,255,0.9);
          background: ${ACCENT};
          box-shadow: 0 0 0 3px rgba(255,255,255,0.08);
        }
        .audio-range::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255,255,255,0.9);
          border-radius: 999px;
          background: ${ACCENT};
          box-shadow: 0 0 0 3px rgba(255,255,255,0.08);
        }
      `}</style>
    </div>
  );
}

function StructuredCard({ icon: Icon, title, desc, isMobile }) {
  return (
    <motion.div
      whileHover={isMobile ? {} : { y: -6, scale: 1.01 }}
      className={`${gradientOuterCard} h-full p-4 sm:p-5`}
    >
      <div className="h-full rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md px-4 py-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#D8A73E]/10">
            <Icon className="h-5 w-5" style={{ color: ACCENT }} />
          </div>
          <h3 className="text-base font-bold leading-7 text-white sm:text-lg lg:text-xl">
            {title}
          </h3>
        </div>
        <div className="mt-4 rounded-2xl border border-white/10 bg-[rgba(17,24,39,0.55)] px-4 py-4 text-sm leading-7 text-white/78 sm:text-base sm:leading-8">
          {desc}
        </div>
      </div>
    </motion.div>
  );
}

function IdentityCard({ icon: Icon, title, text, large = false, isMobile }) {
  return (
    <motion.div
      whileHover={isMobile ? {} : { y: -6, scale: 1.01 }}
      className={`${softCard} h-full p-4 sm:p-5`}
    >
      <div className="h-full rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md px-4 py-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#D8A73E]/10">
            <Icon className="h-5 w-5" style={{ color: ACCENT }} />
          </div>
          <div
            className={`rounded-2xl border border-white/10 bg-white/5 px-4 py-2 font-bold text-white ${
              large ? "text-lg sm:text-xl" : "text-base sm:text-lg"
            }`}
          >
            {title}
          </div>
        </div>
        <div
          className={`mt-4 rounded-2xl border border-white/10 bg-[rgba(17,24,39,0.55)] px-4 py-4 text-white/80 ${
            large
              ? "text-base leading-8 sm:text-lg sm:leading-9 lg:text-xl lg:leading-10"
              : "text-base leading-8 sm:text-lg"
          }`}
        >
          {text}
        </div>
      </div>
    </motion.div>
  );
}

function ImpactCard({ icon: Icon, title, desc, isMobile }) {
  return (
    <motion.div
      whileHover={isMobile ? {} : { y: -6, scale: 1.01 }}
      className={`${softCard} h-full p-4 sm:p-5`}
    >
      <div className="h-full rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md px-4 py-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#D8A73E]/10">
            <Icon className="h-5 w-5" style={{ color: ACCENT }} />
          </div>
          <h3 className="text-base font-bold text-white sm:text-lg lg:text-xl">
            {title}
          </h3>
        </div>
        <div className="mt-4 rounded-2xl border border-white/10 bg-[rgba(17,24,39,0.55)] px-4 py-4 text-sm leading-7 text-white/78 sm:text-base sm:leading-8">
          {desc}
        </div>
      </div>
    </motion.div>
  );
}

function ProtectedHlsVideoCard({ video, index, isMobile }) {
  const videoRef = useRef(null);
  const videoIdRef = useRef(`portfolio-video-${index}`);

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;

    const onLoaded = () => {
      setDuration(element.duration || 0);
      setIsReady(true);
    };

    const onTimeUpdate = () => setCurrentTime(element.currentTime || 0);

    const onPlay = () => {
      setIsPlaying(true);
      window.dispatchEvent(
        new CustomEvent("sana-video-play", {
          detail: { id: videoIdRef.current },
        })
      );
    };

    const onPause = () => setIsPlaying(false);

    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const onOtherVideoPlay = (event) => {
      if (event.detail?.id !== videoIdRef.current && !element.paused) {
        element.pause();
      }
    };

    element.addEventListener("loadedmetadata", onLoaded);
    element.addEventListener("loadeddata", onLoaded);
    element.addEventListener("durationchange", onLoaded);
    element.addEventListener("timeupdate", onTimeUpdate);
    element.addEventListener("play", onPlay);
    element.addEventListener("pause", onPause);
    element.addEventListener("ended", onEnded);
    window.addEventListener("sana-video-play", onOtherVideoPlay);

    return () => {
      element.removeEventListener("loadedmetadata", onLoaded);
      element.removeEventListener("loadeddata", onLoaded);
      element.removeEventListener("durationchange", onLoaded);
      element.removeEventListener("timeupdate", onTimeUpdate);
      element.removeEventListener("play", onPlay);
      element.removeEventListener("pause", onPause);
      element.removeEventListener("ended", onEnded);
      window.removeEventListener("sana-video-play", onOtherVideoPlay);
    };
  }, []);

  const progress = useMemo(
    () => (duration ? (currentTime / duration) * 100 : 0),
    [currentTime, duration]
  );

  const playVideo = () => {
    const el = videoRef.current;
    if (!el) return;
    el.play().catch(() => {});
  };

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;

    if (el.paused) {
      playVideo();
    } else {
      el.pause();
    }
  };

  const replayVideo = () => {
    const el = videoRef.current;
    if (!el) return;
    el.currentTime = 0;
    playVideo();
  };

  const handleSeek = (e) => {
    const el = videoRef.current;
    if (!el) return;
    const next = Number(e.target.value);
    el.currentTime = next;
    setCurrentTime(next);
  };

  const toggleMute = () => {
    const el = videoRef.current;
    if (!el) return;
    const next = !el.muted;
    el.muted = next;
    setMuted(next);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: isMobile ? 12 : 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.5, delay: isMobile ? 0 : index * 0.08 }}
      whileHover={isMobile ? {} : { y: -6, scale: 1.01 }}
      className={`${softCard} p-3 sm:p-4`}
    >
      <div className="relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-black/30">
        <video
          ref={videoRef}
          src={video}
          className="aspect-video w-full object-cover"
          playsInline
          preload="metadata"
          controls={false}
          muted={muted}
          onContextMenu={(e) => e.preventDefault()}
        />

        {!isPlaying && (
          <button
            type="button"
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/15 transition hover:bg-black/10"
            aria-label="پخش ویدئو"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md shadow-[0_0_28px_rgba(216,167,62,0.14)] sm:h-18 sm:w-18">
              <Play className="ml-1 h-7 w-7 text-white" />
            </span>
          </button>
        )}

        <div className="pointer-events-none absolute left-3 top-3 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[11px] text-white/80 backdrop-blur-md">
          {isReady ? "پیش‌نمایش آماده است" : "در حال بارگذاری پیش‌نمایش"}
        </div>
      </div>

      <div className="mt-4 rounded-[1.3rem] border border-white/10 bg-[rgba(17,24,39,0.55)] p-3 sm:p-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={toggleMute}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
            aria-label="قطع یا وصل صدا"
          >
            <Volume2
              className={`h-4 w-4 ${muted ? "opacity-50" : ""}`}
              style={{ color: ACCENT }}
            />
          </button>

          <button
            type="button"
            onClick={replayVideo}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
            aria-label="پخش دوباره"
          >
            <RotateCcw className="h-4 w-4" style={{ color: ACCENT }} />
          </button>

          <button
            type="button"
            onClick={togglePlay}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
            aria-label={isPlaying ? "توقف" : "پخش"}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" style={{ color: ACCENT }} />
            ) : (
              <Play className="h-4 w-4" style={{ color: ACCENT }} />
            )}
          </button>

          <div className="min-w-[52px] text-xs text-white/75">
            {formatTime(currentTime)}
          </div>

          <div className="relative h-2 w-full flex-1 overflow-visible rounded-full bg-white/10">
            <div
              className={`absolute inset-y-0 right-0 rounded-full ${OUTER_GRADIENT}`}
              style={{ width: `${progress}%` }}
            />
            <input
              type="range"
              min="0"
              max={duration || 0}
              step="0.1"
              value={currentTime}
              onChange={handleSeek}
              className="video-range absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none bg-transparent [direction:rtl]"
            />
          </div>
        </div>
      </div>

      <style>{`
        .video-range::-webkit-slider-runnable-track { height: 8px; background: transparent; }
        .video-range::-moz-range-track { height: 8px; background: transparent; }
        .video-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          margin-top: -3px;
          border-radius: 999px;
          border: 2px solid rgba(255,255,255,0.9);
          background: ${ACCENT};
          box-shadow: 0 0 0 3px rgba(255,255,255,0.08);
        }
        .video-range::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255,255,255,0.9);
          border-radius: 999px;
          background: ${ACCENT};
          box-shadow: 0 0 0 3px rgba(255,255,255,0.08);
        }
      `}</style>
    </motion.div>
  );
}

export default function QuranTranslationLandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <LazyMotion features={domAnimation}>
      <div
        dir="rtl"
        className="relative min-h-screen overflow-hidden bg-transparent text-white"
      >
        <div className={`absolute inset-0 ${OUTER_GRADIENT}`} />

        {!isMobile && (
          <>
            <motion.div
              className="absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#D8A73E]/12 blur-3xl"
              animate={pulseGlow}
            />
            <div className="absolute inset-0 opacity-[0.06]">
              <div className="h-full w-full bg-white/[0.02]" />
            </div>
          </>
        )}

        <div className={containerClass}>
          <header className="pt-4 sm:pt-6">
            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className={`mx-auto flex items-center justify-between gap-3 rounded-[1.5rem] px-3 py-3 sm:rounded-[2rem] sm:px-4 ${glass}`}
            >
              <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#D8A73E]/20 bg-white/10 shadow-[0_0_16px_rgba(216,167,62,0.10)] sm:h-16 sm:w-16">
                  <img
                    src={sanaLogo}
                    alt="نشان کانال‌های قرآنی سنا"
                    className="h-full w-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                </div>
                <div className="truncate text-sm font-bold tracking-wide sm:text-xl">
                  کانال‌های قرآنی سنا
                </div>
              </div>

              <nav className="hidden items-center gap-3 md:flex">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/85 transition hover:border-[#D8A73E]/30 hover:bg-white/10 hover:text-[#F6E7C1]"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 md:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </motion.div>

            {menuOpen && (
              <div
                className={`mt-3 rounded-[1.4rem] p-3 md:hidden sm:rounded-[1.6rem] sm:p-4 ${glass}`}
              >
                <div className="grid gap-2">
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 sm:text-base"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </header>

          <section className="relative grid min-h-[auto] items-center gap-10 py-10 sm:gap-12 sm:py-14 lg:min-h-[84vh] lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
            <div className="order-1 lg:order-1">
              <motion.div
                custom={0}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D8A73E]/20 bg-white/10 px-4 py-2 text-xs backdrop-blur-md sm:text-sm"
                style={{ color: ACCENT }}
              >
                <Stars className="h-4 w-4" style={{ color: ACCENT }} />
                <span>سنا... پیامی برای همه جهانیان</span>
              </motion.div>

              <motion.h1
                custom={1}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="text-3xl font-black leading-[1.25] sm:text-5xl lg:text-7xl"
              >
                <span className="block text-[#D8A73E]">
                  کانال‌های قرآنی سنا
                </span>
              </motion.h1>

              <motion.p
                custom={2}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8 lg:text-xl"
              >
                کانال‌های صوتی و تصویری برای ترجمه معانی قرآن به همه زبان‌های جهانی — وقفی برای خدا.
              </motion.p>

              <motion.div
                custom={3}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4"
              >
                <a
                  href="#features"
                  className="group inline-flex items-center justify-center gap-3 rounded-2xl border px-6 py-3.5 text-sm font-bold shadow-[0_8px_20px_rgba(8,8,32,0.24)] transition hover:scale-[1.02] sm:px-7 sm:py-4 sm:text-base"
                  style={{
                    backgroundColor: CTA_DARK,
                    borderColor: "rgba(216,167,62,0.24)",
                    color: ACCENT,
                  }}
                >
                  <Sparkles
                    className="h-5 w-5 transition group-hover:rotate-12"
                    style={{ color: ACCENT }}
                  />
                  کاوش در پلتفرم
                </a>

                <a
                  href="https://www.youtube.com/channel/UCfvwjkpgbGlpfxb4ZsGgAog"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:border-[#D8A73E]/20 hover:bg-white/15 sm:px-7 sm:py-4 sm:text-base"
                >
                  <Play className="h-5 w-5" />
                  بازدید از کانال ما
                </a>
              </motion.div>

              <motion.div
                custom={4}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-4"
              >
                {stats.map((item, i) => (
                  <motion.div
                    key={item.label}
                    animate={isMobile ? {} : { y: [0, -4, 0] }}
                    transition={
                      isMobile
                        ? {}
                        : {
                            duration: 4 + i,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }
                    }
                    className="rounded-3xl border border-white/10 bg-white/10 p-3 text-center backdrop-blur-md shadow-[0_6px_16px_rgba(0,0,0,0.12)] sm:p-4"
                  >
                    <div
                      className="text-xl font-black sm:text-2xl"
                      style={{ color: ACCENT }}
                    >
                      {item.value}
                    </div>
                    <div className="mt-2 text-xs text-white/70 sm:text-sm">
                      {item.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96, rotate: isMobile ? 0 : -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="order-2 relative lg:order-2"
            >
              <motion.div
                animate={isMobile ? {} : { y: [0, -10, 0] }}
                transition={
                  isMobile
                    ? {}
                    : { duration: 7, repeat: Infinity, ease: "easeInOut" }
                }
                className={`relative mx-auto max-w-2xl p-3 sm:p-4 ${softCard}`}
              >
                <div className="rounded-[1.6rem] border border-white/10 bg-white/5 backdrop-blur-md p-4 sm:p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs text-white/60 sm:text-sm">
                        زبان فعلی
                      </p>
                      <h3 className="mt-1 text-xl font-bold sm:text-2xl">
                        قرآن به زبان فارسی
                      </h3>
                    </div>
                    <div className="w-fit rounded-2xl border border-[#D8A73E]/25 bg-[#D8A73E]/12 px-4 py-2 text-xs text-[#F6E7C1] sm:text-sm">
                      پخش زنده
                    </div>
                  </div>

                  <div className="mt-6 rounded-[1.4rem] border border-white/10 bg-[rgba(15,23,42,0.70)] p-4 sm:mt-8 sm:p-6">
                    <div className="mb-4 flex items-start gap-3 text-sm text-white/80 sm:items-center sm:text-base">
                      <Headphones className="mt-0.5 h-5 w-5 shrink-0 text-[#D8A73E] sm:mt-0" />
                      <span>
                        به تلاوت گوش دهید همراه با نمایش تصویری معانی قرآن
                      </span>
                    </div>

                    {!isMobile && (
                      <div className="space-y-3">
                        {[65, 88, 42].map((w, idx) => (
                          <motion.div
                            key={idx}
                            animate={{
                              width: [`${w - 14}%`, `${w}%`, `${w - 8}%`],
                            }}
                            transition={{
                              duration: 3 + idx,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            className={`h-3 rounded-full ${OUTER_GRADIENT}`}
                          />
                        ))}
                      </div>
                    )}

                    <div className="mt-6 grid grid-cols-3 gap-2 text-center sm:mt-8 sm:gap-3">
                      {heroCards.map((item) => (
                        <div
                          key={item.label}
                          className="flex min-h-[108px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-2 py-3 sm:min-h-[120px] sm:p-4"
                        >
                          <div
                            className="text-[13px] font-bold leading-tight sm:text-lg"
                            style={{ color: ACCENT }}
                          >
                            {item.value}
                          </div>
                          <div className="mt-2 text-[10px] leading-4 text-white/65 sm:text-xs sm:leading-5">
                            {item.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <HeroAudioPlayer isMobile={isMobile} />
                  </div>
                </div>
              </motion.div>

              <div className="mx-auto mt-5 grid max-w-2xl gap-3 sm:mt-6 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
                {heroBadges.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="w-full rounded-[1.4rem] border border-white/10 bg-white/10 px-5 py-4 text-center backdrop-blur-md shadow-[0_6px_16px_rgba(0,0,0,0.12)] sm:min-w-[220px] sm:w-auto sm:rounded-[1.6rem]"
                    >
                      <div className="flex items-center justify-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 sm:h-11 sm:w-11">
                          <Icon className="h-5 w-5" style={{ color: ACCENT }} />
                        </div>
                        <div className="text-sm font-bold text-white sm:text-base">
                          {item.title}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </section>

          <section id="about" className="py-4 lg:py-8">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-8 text-center"
            >
              <LargeSectionBadge
                icon={BookOpen}
                text="هویتی جهانی برای قرآن"
              />
            </motion.div>

            <div className="space-y-6">
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.16 }}
                custom={0}
                variants={fadeUp}
              >
                <IdentityCard {...identityCards[0]} large isMobile={isMobile} />
              </motion.div>

              <div className="grid gap-6 lg:grid-cols-2">
                {identityCards.slice(1).map((card, i) => (
                  <motion.div
                    key={card.title}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.16 }}
                    custom={i + 1}
                    variants={fadeUp}
                  >
                    <IdentityCard {...card} isMobile={isMobile} />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-8 lg:py-12">
            <div className="mb-6 text-center">
              <LargeSectionBadge
                icon={Building2}
                text="اجرا و نظارت"
              />
            </div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              className={`relative overflow-hidden p-5 sm:p-6 md:p-10 ${gradientOuterCard}`}
            >
              {!isMobile && (
                <div className="absolute inset-0 bg-black/10" />
              )}

              <div className="relative z-10">
                <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch lg:gap-8">
                  <div className="rounded-[1.8rem] border border-white/10 bg-[rgba(17,24,39,0.45)] p-4 sm:p-6">
                    <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
                      <h2 className="text-2xl font-black sm:text-3xl lg:text-4xl">
                        همکاری اجرایی مورد اعتماد
                      </h2>
                      <p className="mt-5 text-base leading-8 text-white/75 sm:text-lg">
                        پروژه{" "}
                        <span className="font-bold text-white">
                          کانال‌های قرآنی سنا
                        </span>{" "}
                        توسط{" "}
                        <span
                          className="font-bold"
                          style={{ color: ACCENT }}
                        >
                          شرکت پخش ماهواره‌ای سعودی اردنی (JASCO)
                        </span>{" "}
                        در امان، اردن اجرا می‌شود؛ با برخورداری از تجربه‌ای پیشرو در تولید رسانه‌ای و پخش ماهواره‌ای.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-[1.8rem] border border-white/10 bg-[rgba(17,24,39,0.70)] p-4 sm:p-6">
                    <div className="flex h-full flex-col justify-center rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
                      <div className="text-sm text-white/60">
                        وب‌سایت رسمی
                      </div>
                      <div className="mt-2 text-xl font-bold sm:text-2xl">
                        شهر رسانه‌ای جاسکو
                      </div>
                      <a
                        href="https://jascomediacity.net/"
                        target="_blank"
                        rel="noreferrer"
                        className={`mt-5 inline-flex w-fit items-center gap-2 rounded-2xl border border-white/10 ${OUTER_GRADIENT} px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_22px_rgba(0,0,0,0.22)] transition hover:scale-[1.01] hover:border-white/20 sm:text-base`}
                      >
                        بازدید از وب‌سایت جاسکو
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <section id="features" className="py-12 lg:py-20">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Sparkles, "ویژگی‌های پلتفرم")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">
                سنا... پیامی برای همه جهانیان
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
                پلتفرمی قرآنی که از جدیدترین روش‌ها برای رساندن معانی قرآن کریم به جهان بهره می‌برد؛ با رویکردی که دانش معتبر دینی را با فناوری نوین ترکیب می‌کند.
              </p>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {features.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  variants={fadeUp}
                  className="h-full"
                >
                  <StructuredCard {...item} isMobile={isMobile} />
                </motion.div>
              ))}
            </div>
          </section>

          <section className="py-10 lg:py-14">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Send, "کانال‌های انتشار و دسترسی")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">
                کانال‌های حضور متنوع
              </h2>
            </motion.div>

            <div className="grid gap-5 lg:grid-cols-3">
              {channels.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  variants={fadeUp}
                  className="h-full"
                >
                  <StructuredCard {...item} isMobile={isMobile} />
                </motion.div>
              ))}
            </div>
          </section>

          <section id="portfolio" className="py-12 lg:py-20">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Crown, "نمونه کارهای ما")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">
                نمونه‌هایی از کارهای ما
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
                تلاوت‌های زیبای قرآن و ترجمه معانی قرآن به زبان‌های مختلف جهان — سنا... پیامی برای همه جهانیان.
              </p>
            </motion.div>

            <div className="grid gap-5 lg:grid-cols-3">
              {portfolioVideos.map((video, i) => (
                <ProtectedHlsVideoCard
                  key={video}
                  video={video}
                  index={i}
                  isMobile={isMobile}
                />
              ))}
            </div>
          </section>

          <section className="py-12 lg:py-16">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Globe, "اثر پروژه")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">
                اثر و گستره پروژه در سراسر جهان
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
                پیامی جهانی از قرآن که ترجمه‌های معتبر ارائه می‌دهد، تجربه‌ای اثرگذار می‌آفریند و به رساندن معانی قرآن کریم به خانه‌های سراسر جهان کمک می‌کند.
              </p>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {impactCards.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  variants={fadeUp}
                  className="h-full"
                >
                  <ImpactCard {...item} isMobile={isMobile} />
                </motion.div>
              ))}
            </div>
          </section>

          <section id="partners" className="py-12 lg:py-20">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Users, "همکاران موفقیت")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">
                موفقیتی ساخته‌شده با همکاری
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
                این پروژه به لطف همکاری مؤسسات برجسته و مشارکت‌کنندگان علمی، رسانه‌ای، تولیدی و داوطلب به موفقیت رسیده است.
              </p>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-2">
              {partners.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  variants={fadeUp}
                  className="h-full"
                >
                  <StructuredCard {...item} isMobile={isMobile} />
                </motion.div>
              ))}
            </div>
          </section>

          <section id="contact" className="py-8 lg:py-12">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
            >
              <div className="text-center">
                <div
                  className="inline-flex max-w-full items-center gap-3 rounded-full border border-white/10 bg-white/10 px-5 py-3 text-base font-semibold backdrop-blur-md shadow-[0_6px_16px_rgba(0,0,0,0.12)] sm:px-7 sm:py-4 sm:text-lg"
                  style={{ color: ACCENT }}
                >
                  <Sparkles
                    className="h-5 w-5 shrink-0"
                    style={{ color: ACCENT }}
                  />
                  <span>تماس با ما</span>
                </div>

                <p className="mx-auto mt-5 max-w-4xl text-base leading-8 text-white/75 sm:text-lg">
                  سنا یک پیام جهانی دعوت است و ما همیشه از دریافت پرسش‌ها، پیشنهادها و فرصت‌های همکاری شما به‌صورت روشن و مستقیم خرسند می‌شویم.
                </p>
              </div>

              <div
                className={`mt-8 rounded-[2rem] p-4 sm:p-6 md:p-8 ${gradientOuterCard}`}
              >
                <div className="rounded-[2rem] border border-white/10 bg-[rgba(17,24,39,0.70)] p-4 sm:p-6">
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 sm:p-5">
                    <div className="mb-4 text-xl font-bold sm:text-2xl">
                      با ما در ارتباط باشید
                    </div>
                    <div className="space-y-3 text-white/75">
                      <div className="rounded-2xl bg-white/5 px-4 py-3 text-sm sm:text-base">
                        تیم ما با خوشحالی شما را راهنمایی می‌کند و در سریع‌ترین زمان ممکن پاسخ می‌دهد.
                      </div>
                      <a
                        href="mailto:snachannel159@gmail.com"
                        className="flex items-center justify-center gap-3 rounded-2xl border border-[#D8A73E]/25 bg-[#D8A73E]/10 px-4 py-3 text-center text-sm font-semibold text-[#F6E7C1] transition hover:bg-[#D8A73E]/18 sm:text-base"
                      >
                        <Mail className="h-4 w-4" style={{ color: ACCENT }} />
                        ارسال ایمیل
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <footer className="pb-8 pt-4 sm:pb-10">
            <div
              className={`rounded-[2rem] border border-white/10 px-4 py-6 sm:px-6 sm:py-8 lg:px-10 ${OUTER_GRADIENT} shadow-[0_12px_34px_rgba(0,0,0,0.28)]`}
            >
              <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr_1fr]">
                <div
                  className={`rounded-[1.8rem] border border-white/10 p-4 text-center sm:p-6 ${INNER_GRADIENT}`}
                >
                  <div className="flex h-full min-h-[420px] flex-col items-center justify-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/15 bg-white/10 shadow-[0_0_18px_rgba(255,255,255,0.06)] backdrop-blur-md sm:h-24 sm:w-24">
                      <img
                        src={sanaLogo}
                        alt="نشان سنا"
                        className="h-14 w-14 object-contain sm:h-16 sm:w-16"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    <div className="mt-4">
                      <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs text-white/90 sm:px-5 sm:text-sm">
                        کانال‌های قرآنی سنا
                      </span>
                    </div>

                    <div
                      className="mt-4 text-2xl font-black sm:text-3xl"
                      style={{ color: ACCENT }}
                    >
                      سنا... پیامی برای همه جهانیان
                    </div>

                    <p className="mx-auto mt-4 max-w-xl rounded-[1.4rem] border border-[#D8A73E]/20 bg-white/5 backdrop-blur-md px-4 py-4 text-sm leading-7 text-white/90 sm:px-5 sm:text-base sm:leading-8">
                      کانال‌های صوتی و تصویری برای ترجمه معانی قرآن به همه زبان‌های جهانی؛ پروژه‌ای وقفی که زیبایی ارائه، دقت معنا و اخلاص پیام را در کنار هم جمع می‌کند.
                    </p>
                  </div>
                </div>

                <div className={`rounded-[1.8rem] border border-white/10 ${OUTER_GRADIENT} p-4 sm:p-5 text-center flex h-full flex-col items-center justify-center shadow-[0_12px_34px_rgba(0,0,0,0.24)]`}>
                  <div className="mb-5 flex flex-col items-center justify-center gap-3 text-white">
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-[1.35rem] border border-[#D8A73E]/20 bg-white/5 backdrop-blur-md shadow-[0_0_24px_rgba(216,167,62,0.12)] backdrop-blur-md">
                      <MessageCircle
                        className="relative z-10 h-7 w-7 sm:h-8 sm:w-8"
                        style={{ color: ACCENT }}
                      />
                    </div>
                    <div className="text-lg font-bold sm:text-xl">
                      اطلاعات ما
                    </div>
                  </div>

                  <div className="w-full space-y-4 text-white/72 flex flex-col items-center">
                    <a
                      href="mailto:snachannel159@gmail.com"
                      className="flex w-full items-center justify-center gap-3 break-all rounded-2xl border border-white/10 bg-[rgba(2,10,20,0.58)] px-4 py-3 text-sm text-center transition hover:bg-white/10 sm:text-base"
                    >
                      <Mail
                        className="h-5 w-5 shrink-0"
                        style={{ color: ACCENT }}
                      />
                      <span className="text-center">snachannel159@gmail.com</span>
                    </a>

                    <div className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-[rgba(2,10,20,0.58)] px-4 py-3 text-sm text-center sm:text-base">
                      <MapPin
                        className="h-5 w-5 shrink-0"
                        style={{ color: ACCENT }}
                      />
                      <span>امان - اردن</span>
                    </div>
                  </div>

                  <div className="mt-5 w-full rounded-[1.4rem] border border-white/10 bg-[rgba(2,10,20,0.55)] p-4 text-center">
                    <a
                      href="https://www.facebook.com/share/1HYdgEgEfg/"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-semibold text-white transition hover:scale-[1.01] hover:bg-white/10"
                    >
                      <Globe className="h-5 w-5" style={{ color: ACCENT }} />
                      ما را در فیسبوک دنبال کنید
                    </a>

                    <p className="mt-4 text-center text-sm leading-6 text-white/70">
                      سفر قرآنی خود را همین حالا آغاز کنید
                    </p>
                  </div>
                </div>

                <div className={`rounded-[1.8rem] border border-white/10 ${OUTER_GRADIENT} p-4 backdrop-blur-md sm:p-5 text-center flex h-full flex-col items-center justify-center`}>
                  <div className="mb-5 flex flex-col items-center justify-center gap-3 text-white">
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-[1.35rem] border border-[#D8A73E]/20 bg-white/5 backdrop-blur-md shadow-[0_0_24px_rgba(216,167,62,0.12)] backdrop-blur-md">
                      <Link2
                        className="relative z-10 h-7 w-7 sm:h-8 sm:w-8"
                        style={{ color: ACCENT }}
                      />
                    </div>
                    <div className="text-lg font-bold sm:text-xl">
                      لینک‌های اپلیکیشن
                    </div>
                  </div>

                  <div className="w-full rounded-[1.4rem] border border-white/10 bg-[rgba(17,24,39,0.45)] p-4 text-center">
                    <p className="mb-4 text-sm leading-7 text-white/65">
                      اپلیکیشن را دانلود کنید و محتوای قرآنی را به‌سادگی از طریق پلتفرم‌های رسمی دنبال نمایید.
                    </p>

                    <div className="grid gap-3 md:grid-cols-2">
                      <a
                        href="https://play.google.com/store/apps/details?id=com.sana_all&pcampaignid=web_share"
                        target="_blank"
                        rel="noreferrer"
                        className="group rounded-[1.3rem] border border-white/10 bg-white/5 p-4 transition hover:-translate-y-0.5 hover:bg-white/10"
                      >
                        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-center">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#D8A73E]/10 text-white">
                            <GooglePlayIcon />
                          </div>
                          <span className="whitespace-nowrap text-sm font-bold text-white sm:text-base">
                            گوگل پلی
                          </span>
                        </div>
                      </a>

                      <a
                        href="https://apps.apple.com/us/app/sana-tv-%D8%B3%D9%86%D8%A7/id6742054715"
                        target="_blank"
                        rel="noreferrer"
                        className="group rounded-[1.3rem] border border-white/10 bg-white/5 p-4 transition hover:-translate-y-0.5 hover:bg-white/10"
                      >
                        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-center">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#D8A73E]/10 text-white">
                            <AppStoreIcon />
                          </div>
                          <span className="text-sm font-bold text-white sm:text-base">
                            اپ استور
                          </span>
                        </div>
                      </a>
                    </div>

                    <div className="mt-5 rounded-[1.4rem] border border-white/10 bg-[rgba(15,23,42,0.60)] p-4 text-center">
                      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/65">
                        <span className="flex items-center gap-1.5">
                          <span style={{ color: ACCENT }}>★</span> امتیاز ۴.۹
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span style={{ color: ACCENT }}>🌍</span> 100+
                          کشور
                        </span>
                      </div>

                      <a
                        href="https://www.youtube.com/channel/UCfvwjkpgbGlpfxb4ZsGgAog"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-[#D8A73E]/25 bg-[#D8A73E]/10 py-3 text-sm font-bold text-[#F6E7C1] transition hover:scale-[1.01] hover:bg-[#D8A73E]/18"
                      >
                        <Sparkles className="h-4 w-4" />
                        همین حالا شروع کنید
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-white/10 pt-5 text-center text-xs text-white/55 sm:text-sm">
                تمام حقوق محفوظ است © کانال‌های قرآنی سنا.
              </div>
            </div>
          </footer>
        </div>
      </div>
    </LazyMotion>
  );
}
