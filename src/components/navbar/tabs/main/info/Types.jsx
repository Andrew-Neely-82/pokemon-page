import { getTypeIcon } from "../../index";

const Types = ({ pokemon }) => {
  const upperCase = (obj) => obj.charAt(0).toUpperCase() + obj.slice(1);

  return (
    <section className="types-section">
      <h4>Types</h4>
      <div className="types-wrapper">
        {pokemon.types.map((types, key) => {
          return (
            <div className="types-container" key={key}>
              {getTypeIcon(types.type.name)}
              <span>{upperCase(types.type.name)}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Types;
