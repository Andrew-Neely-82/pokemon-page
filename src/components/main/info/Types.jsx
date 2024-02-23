const Types = ({ pokemon }) => {
  const upperCase = (obj) => obj.charAt(0).toUpperCase() + obj.slice(1);

  return (
    <div>
      {pokemon.types.map((types, key) => {
        return (
          <>
            <div key={key}>{upperCase(types.type.name)}</div>
          </>
        );
      })}
    </div>
  );
};
export default Types;
