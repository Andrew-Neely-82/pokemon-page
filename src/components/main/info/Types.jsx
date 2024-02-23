const Types = ({ pokemon }) => {
  const upperCase = (obj) => obj.charAt(0).toUpperCase() + obj.slice(1);

  return (
    <section className="types-section">
      <h4>Types</h4>
      <div className="types-wrapper">
        {pokemon.types.map((types, key) => {
          return (
            <>
              <span key={key}>{upperCase(types.type.name)}</span>
            </>
          );
        })}
      </div>
    </section>
  );
};
export default Types;
