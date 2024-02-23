const Moves = ({ pokemon }) => {
  return (
    <section className="moves-section">
      <h4>Moves: </h4>
      <div className="move-wrapper">
        {pokemon.moves.map((moves, key) => {
          return (
            <span key={key}>
              #{key + 1} {moves.move.name}
            </span>
          );
        })}
      </div>
    </section>
  );
};

export default Moves;
