const LAYERS = 8;

export default function ProgressiveBlur() {
  const step = 100 / LAYERS;

  return (
    <div aria-hidden="true" className="header-progressive-blur">
      {Array.from({ length: LAYERS }, (_, index) => {
        const blur = Math.min(0.2 * 1.9 ** index, 12);
        const cover = 100 - index * step;
        const from = Math.max(cover - step * 2, 0);
        const mask = `linear-gradient(to bottom, #000 ${from}%, transparent ${cover}%)`;

        return (
          <div
            key={index}
            className="header-progressive-blur__layer"
            style={{
              backdropFilter: `blur(${blur.toFixed(2)}px)`,
              WebkitBackdropFilter: `blur(${blur.toFixed(2)}px)`,
              maskImage: mask,
              WebkitMaskImage: mask
            }}
          />
        );
      })}
    </div>
  );
}
