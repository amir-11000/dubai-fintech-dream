export const BillyMark = ({ size = 36, pulse = false }: { size?: number; pulse?: boolean }) => (
  <div className="relative" style={{ width: size, height: size }}>
    {pulse && (
      <span className="absolute inset-0 -z-10 animate-ping rounded-xl bg-gold/50" />
    )}
    <div
      className="relative grid place-items-center rounded-xl bg-gold-grad text-ink shadow-[0_8px_28px_-8px_rgba(214,181,106,0.65)]"
      style={{ width: size, height: size }}
    >
      <span className="font-display font-bold" style={{ fontSize: size * 0.5, lineHeight: 1 }}>B</span>
    </div>
  </div>
);
