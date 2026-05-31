type Props = {
  children: React.ReactNode;
  className?: string;
  variant?: 'light' | 'dark';
};

export default function Eyebrow({ children, className = '', variant = 'light' }: Props) {
  const tone =
    variant === 'light'
      ? 'bg-neutral-100 text-neutral-700 ring-1 ring-inset ring-neutral-900/10'
      : 'bg-white/[0.06] text-white/80 ring-1 ring-inset ring-white/10';

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10.5px] uppercase tracking-[0.28em] ${tone} ${className}`}
    >
      <span className="relative inline-flex h-1.5 w-1.5">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#7C8A3F]/60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#7C8A3F]" />
      </span>
      <span className="font-medium">{children}</span>
    </div>
  );
}
