"use client";

export default function AboutSection() {
  return (
    <section className="relative w-full overflow-hidden py-32 md:py-48">
      <div className="max-w-6xl mx-auto px-8 md:px-16">
        {/* Section heading */}
        <div
          data-reveal="fade"
          data-start="top 90%" data-end="top 70%"
          className="flex items-center gap-2 mb-12 md:mb-20"
          style={{ fontFamily: "Six Caps, sans-serif", fontSize: 36, color: "#302c1a" }}
        >
          <span>・</span>
          <span>ABOUT</span>
        </div>

        {/* About text */}
        <div className="max-w-4xl">
          <div
            data-reveal="slide"
            data-start="top 85%" data-end="top 55%"
          >
            <p
              className="text-xl md:text-2xl lg:text-3xl leading-relaxed font-light mb-6"
              style={{ color: "#0d4c82", fontFamily: "Inter, sans-serif" }}
            >
              IN THE SUMMER OF 22, I STARTED PROGRAMMING. IT WAS LATER THAN MOST,
              BUT I THINK I FOUND SOMETHING THAT I WAS PASSIONATE ABOUT. I&apos;VE
              BEEN WRITING CODE EVERY DAY EVER SINCE. MY STRENGTH IS INSATIABLE
              CURIOSITY.
            </p>
          </div>

          <div
            data-reveal="slide"
            data-start="top 80%" data-end="top 50%"
          >
            <p
              className="text-lg md:text-xl leading-relaxed font-light"
              style={{ color: "#0d4c82", fontFamily: "Inter, sans-serif" }}
            >
              THE VISUAL EXPRESSIONS THAT I AM EXPLORING ON A DAILY BASIS ARE
              AVAILABLE ON GITHUB, RANGING FROM CSS ANIMATION TO EXPRESSIONS IN
              FRAMER MOTION. NOT ALL OF MY WORK IS AVAILABLE ON GITHUB, BUT YOU
              CAN FIND LINKS TO IT IN MY PORTFOLIO.
            </p>
          </div>
        </div>

        {/* Bounce line */}
        <div
          data-reveal="line"
          data-start="top 75%" data-end="top 50%"
          className="mt-16 md:mt-24 w-full max-w-3xl"
          style={{ transformOrigin: "left" }}
        >
          <svg viewBox="0 0 1000 160" fill="none">
            <path
              d="M0,80 Q 250 200, 500 80 T 1000,80"
              stroke="#0d4c82"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
