/* eslint-disable @next/next/no-img-element */

// Same laptop chrome as the hero/tech laptops, with a still picture on its screen.
const SCREEN = { left: 17.2, top: 4.9, width: 66.2, height: 59.6 };

export default function AchievementLaptop({
  src,
  highlight = false,
  className = "",
}: {
  src: string;
  highlight?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`group/laptop relative w-full rounded-2xl p-[6%] pb-[3%] md:rounded-3xl ${
        highlight ? "bg-peach/45" : "bg-ink/[0.045]"
      } ${className}`}
    >
      <div className="relative aspect-[1200/928] w-full select-none">
        <img
          src="/chrome/laptop.png"
          alt=""
          draggable={false}
          className="absolute inset-0 z-0 h-full w-full pointer-events-none"
        />
        <div
          className="absolute z-10 overflow-hidden bg-[#0b0f14]"
          style={{
            left: `${SCREEN.left}%`,
            top: `${SCREEN.top}%`,
            width: `${SCREEN.width}%`,
            height: `${SCREEN.height}%`,
          }}
        >
          <img
            src={src}
            alt=""
            draggable={false}
            loading="lazy"
            decoding="async"
            className="block h-full w-full object-cover transition-transform duration-700 ease-out group-hover/laptop:scale-105"
          />
        </div>
      </div>
    </div>
  );
}
