const Stats = ({ pokemon }) => {
  const upperCase = (obj) => obj.charAt(0).toUpperCase() + obj.slice(1);

  return (
    <section className="stats-section">
      <h3>Stats</h3>
      <div className="stats-wrapper">
        {pokemon.stats.map((stat, key) => {
          return (
            <div className="stats-container" key={key}>
              <h6>{upperCase(stat.stat.name)}</h6>
              <span>{stat.base_stat}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
export default Stats;
