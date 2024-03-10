import { useRef } from "react";

const Audio = ({ pokemon }) => {
  const soundRef = useRef(null);

  const playSound = (sound) => {
    if (soundRef.current) {
      soundRef.current.src = sound;
      soundRef.current.play();
    } else {
      return;
    }
  };

  return (
    <section className="audio-section">
      <audio ref={soundRef}>
        {pokemon.cries.latest && <source src={pokemon.cries.latest} type="audio/mpeg" />}
        {pokemon.cries.legacy && <source src={pokemon.cries.legacy} type="audio/mpeg" />}
        Your browser does not support the audio element.
      </audio>
      {pokemon.cries.legacy && <button onClick={() => playSound(pokemon.cries.legacy)}>Play legacy cry</button>}
      {pokemon.cries.latest && <button onClick={() => playSound(pokemon.cries.latest)}>Play latest cry</button>}
    </section>
  );
};

export default Audio;
