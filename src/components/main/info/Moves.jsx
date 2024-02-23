const Moves = ({ pokemon }) => {
  return (
    <div style={{ margin: "1rem" }}>
      <h4>Moves: </h4>
      {pokemon.moves.map((moves, key) => {
        return (
          <div key={key}>
            #{key + 1} {moves.move.name}
          </div>
        );
      })}
    </div>
  );
};

export default Moves;
