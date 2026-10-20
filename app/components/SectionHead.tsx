import type { ReactNode } from "react";

export default function SectionHead({
  title,
  aside,
  asideClassName = "",
  className = "",
}: {
  title: string;
  aside?: ReactNode;
  asideClassName?: string;
  className?: string;
}) {
  return (
    <div className={`relative flex flex-col gap-y-2 lg:flex-row lg:items-baseline lg:gap-x-6 mb-10 md:mb-14 ${className}`}>
      <h2 className="text-[21px] sm:text-[23px] md:text-[30px] text-ink font-normal tracking-tight flex items-baseline gap-3 lg:basis-[max(calc(23.3%-1.5rem),16.5rem)] lg:shrink-0 lg:min-w-max">
        <span className="text-[16px] sm:text-[18px] md:text-[22px] leading-none">+</span>
        {title}
      </h2>
      {aside && (
        <p className={`font-mono font-normal text-[19px] sm:text-[21px] md:text-[26px] text-ink ${asideClassName}`}>{aside}</p>
      )}
    </div>
  );
}
