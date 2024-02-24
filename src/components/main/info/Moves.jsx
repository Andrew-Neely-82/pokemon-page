const Moves = ({ pokemon }) => {
  return (
    <section className="moves-section">
      <h4>Moves: </h4>
      <div className="move-wrapper">
        {pokemon.moves.map((moves, key) => {
          return (
            <span key={key}>
              #{key + 1} {moves.move.name.charAt(0).toUpperCase() + moves.move.name.slice(1).replace("-", " ")}
            </span>
          );
        })}
      </div>
    </section>
  );
};

export default Moves;
