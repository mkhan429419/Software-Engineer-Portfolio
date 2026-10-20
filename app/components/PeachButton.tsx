import Link from "next/link";

type Props = {
  href?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  external?: boolean;
};

export default function PeachButton({
  href,
  children,
  onClick,
  type = "button",
  disabled,
  className = "",
  external,
}: Props) {
  const cls = `peach-btn ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${cls} disabled:opacity-50 disabled:cursor-not-allowed`}>
      {children}
    </button>
  );
}
