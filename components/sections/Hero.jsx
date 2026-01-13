"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

function useTypewriter(text, speed = 30) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let i = 0;

    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text[i]);
      i++;

      if (i >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return displayed;
}

const HERO_VARIANTS = {
  "/hero-main.png": {
    label: "Join Our Community",
    href: "/join",
    tag: "Community",
    text: "A flexible, next-gen tech community built for learning, building, and scaling. From workshops to hackathons, we help you turn skills into momentum.",
  },
  "/ilya-pavlov-OqtafYT5kTw-unsplash.jpg": {
    label: "Explore Hackathons",
    href: "/hackathons",
    tag: "Events",
    text: "Compete, collaborate, and create at high-impact hackathons designed to push your technical limits and real-world problem-solving skills.",
  },
  "/memento-media-2pPw5Glro5I-unsplash.jpg": {
    label: "Meet the Team",
    href: "/team",
    tag: "Team",
    text: "A passionate team of builders, mentors, and innovators working together to shape the next generation of tech leaders.",
  },
};

const IMAGES = Object.keys(HERO_VARIANTS);

export default function HeroSection() {
  const [background, setBackground] = useState(IMAGES[0]);

  const thumbnails = IMAGES.filter((img) => img !== background);
  const { label, href, text } = HERO_VARIANTS[background];
  const typedText = useTypewriter(text, 12);
  return (
    <section className="w-full">
      <div
        className="
          relative overflow-hidden rounded-4xl bg-black text-white
          min-h-150
          grid grid-cols-1 md:grid-cols-2
          px-3 md:px-16
        "
      >
        {/* Background image */}
        <div
          className="absolute inset-0 transition-all duration-500 pointer-events-none"
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />

        {/* LEFT CONTENT */}
        <div className="relative z-10 flex flex-col justify-center gap-y-6 py-10">
          <h1 className="text-4xl md:text-5xl font-extrabold font-merriweather leading-tight">
            Ignite. Execute. Dominate.
          </h1>

          <p className="max-w-lg text-slate-100 font-semibold">{typedText}</p>

          <Link
            href={href}
            className={buttonVariants({
              variant: "outline",
              className: cn(
                "group self-start border-2 border-black bg-white text-black",
                "transition-transform duration-300 ease-out hover:scale-105",
                "px-4 py-2"
              ),
            })}
          >
            <span className="flex items-center gap-x-3">
              <span>{label}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 translate-x-1 transition-transform duration-300 group-hover:translate-x-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                />
              </svg>
            </span>
          </Link>
        </div>

        {/* RIGHT SIDE (LOGO + THUMBNAILS) */}
        <div className="relative z-10 hidden md:grid grid-cols-[2fr_1.5fr] gap-x-6 items-stretch py-12">
          {/* LOGO */}
          <div className="flex items-center justify-center h-full">
            <img
              src="/logo/uic.webp"
              alt="UIC Logo"
              className="max-h-full max-w-full object-contain"
            />
          </div>

          {/* THUMBNAILS */}
          <div className="flex flex-col gap-y-6 justify-center">
            {thumbnails.map((img) => (
              <button
                key={img}
                onClick={() => setBackground(img)}
                className="relative rounded-xl transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={img}
                  alt=""
                  className="w-72 object-cover rounded-xl"
                />

                <span className="absolute bottom-3 left-3 text-sm font-semibold tracking-wide text-white">
                  {HERO_VARIANTS[img].tag}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
