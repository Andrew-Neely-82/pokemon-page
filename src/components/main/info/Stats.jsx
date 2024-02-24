import HP from "../../../images/health-normal.svg";
import Attack from "../../../images/attack.svg";
import Defense from "../../../images/checked-shield.svg";
import SpecialAttack from "../../../images/punch-blast.svg";
import SpecialDefense from "../../../images/armor-upgrade.svg";
import Speed from "../../../images/speedometer.svg";

const Stats = ({ pokemon }) => {
  //
  const getIcon = (type) => {
    switch (type) {
      case "hp":
        return <img className="icon hp" src={HP} alt="hp icon" />;
      case "attack":
        return <img className="icon attack" src={Attack} alt="attack icon" />;
      case "defense":
        return <img className="icon defense" src={Defense} alt="defense icon" />;
      case "special-attack":
        return <img className="icon special-attack" src={SpecialAttack} alt="special attack icon" />;
      case "special-defense":
        return <img className="icon special-defense" src={SpecialDefense} alt="special defense icon" />;
      case "speed":
        return <img className="icon speed" src={Speed} alt="speed icon" />;
      default:
        return null;
    }
  };

  const getTitle = (type) => {
    switch (type) {
      case "hp":
        return "HP";
      case "attack":
        return "Attack";
      case "defense":
        return "Defense";
      case "special-attack":
        return "SP-Attack";
      case "special-defense":
        return "SP-Defense";
      case "speed":
        return "Speed";
      default:
        return null;
    }
  };

  return (
    <section className="stats-section">
      <h3>Stats</h3>
      <div className="stats-wrapper">
        {pokemon.stats.map((stat, key) => {
          return (
            <div className="stats-container" key={key}>
              {getIcon(stat.stat.name)}
              <div className="stats-text-container">
                <h6>{getTitle(stat.stat.name)}</h6>
                <span>{stat.base_stat}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
export default Stats;
