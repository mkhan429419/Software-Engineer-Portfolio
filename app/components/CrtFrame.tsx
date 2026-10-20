"use client";

export default function CrtFrame({
  children,
  className = "",
  scale = 1,
}: {
  children: React.ReactNode;
  className?: string;
  scale?: number;
}) {
  return (
    <div
      className={`relative w-full ${className}`}
      style={scale === 1 ? undefined : { transform: `scale(${scale})`, transformOrigin: "49.11% 44.52%" }}
    >
      <img
        src="/chrome/crt-frame.png?v=3"
        alt=""
        className="relative z-0 w-full h-auto pointer-events-none select-none"
      />
      <div
        className="absolute z-10 overflow-hidden bg-[#111] [scrollbar-width:none] [-ms-overflow-style:none]"
        style={{
          top: "17.1%",
          left: "22.6%",
          width: "55.0%",
          height: "56.6%",
          borderRadius: "2% / 2.6%",
        }}
      >
        {children}
      </div>
    </div>
  );
}
