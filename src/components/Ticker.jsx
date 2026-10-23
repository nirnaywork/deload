// Ticker repeats a short phrase so CSS can scroll a seamless, decorative text strip.
function Ticker() {
  const phrase = 'WEBSITES  •  REELS  •  CANVA  •  TRENDS  •  GROWTH  •  ';
  return (
    <div aria-label="Websites, reels, Canva, trends, growth" className="ticker" role="img">
      <div aria-hidden="true" className="ticker__track">
        <span>{phrase}</span><span>{phrase}</span>
      </div>
    </div>
  );
}

export default Ticker;
