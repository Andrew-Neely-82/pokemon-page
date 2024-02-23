const Stats = ({ pokemon }) => {
  const upperCase = (obj) => obj.charAt(0).toUpperCase() + obj.slice(1);

  return (
    <div>
      {pokemon.stats.map((stat) => {
        return (
          <>
            <div>{upperCase(stat.stat.name)}</div>
            <span>{stat.base_stat}</span>
          </>
        );
      })}
    </div>
  );
};
export default Stats;
