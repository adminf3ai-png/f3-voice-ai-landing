export function VoiceWave({ className = "" }: { className?: string }) {
  const bars = [12, 28, 18, 40, 24, 52, 30, 44, 20, 36, 14, 48, 22, 38, 16, 30, 24, 18, 32, 14];
  return (
    <div className={`flex items-center justify-center gap-1.5 ${className}`}>
      {bars.map((h, i) => (
        <span
          key={i}
          className="w-1.5 rounded-full"
          style={{
            height: `${h}px`,
            background:
              i % 3 === 0
                ? "var(--brand-orange)"
                : i % 3 === 1
                ? "white"
                : "var(--brand-purple)",
            animation: `wave 1.4s ease-in-out ${i * 0.07}s infinite`,
          }}
        />
      ))}
      <style>{`@keyframes wave { 0%,100%{transform:scaleY(0.6)} 50%{transform:scaleY(1.4)} }`}</style>
    </div>
  );
}