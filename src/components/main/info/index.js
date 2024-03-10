import Bug from "../../../images/bug.svg";
import Dark from "../../../images/dark.svg";
import Dragon from "../../../images/dragon.svg";
import Electric from "../../../images/electric.svg";
import Fairy from "../../../images/fairy.svg";
import Fighting from "../../../images/fighting.svg";
import Fire from "../../../images/fire.svg";
import Flying from "../../../images/flying.svg";
import Ghost from "../../../images/ghost.svg";
import Grass from "../../../images/grass.svg";
import Ground from "../../../images/ground.svg";
import Ice from "../../../images/ice.svg";
import Normal from "../../../images/normal.svg";
import Poison from "../../../images/poison.svg";
import Psychic from "../../../images/psychic.svg";
import Rock from "../../../images/rock.svg";
import Steel from "../../../images/steel.svg";
import Water from "../../../images/water.svg";

export const BugIcon = Bug;
export const DarkIcon = Dark;
export const DragonIcon = Dragon;
export const ElectricIcon = Electric;
export const FairyIcon = Fairy;
export const FightingIcon = Fighting;
export const FireIcon = Fire;
export const FlyingIcon = Flying;
export const GhostIcon = Ghost;
export const GrassIcon = Grass;
export const GroundIcon = Ground;
export const IceIcon = Ice;
export const NormalIcon = Normal;
export const PoisonIcon = Poison;
export const PsychicIcon = Psychic;
export const RockIcon = Rock;
export const SteelIcon = Steel;
export const WaterIcon = Water;

export const getTypeIcon = (type) => {
  switch (type) {
    case "bug":
      return <img className="icon bug" src={BugIcon} alt="Bug Icon" loading="lazy"/>;
    case "dark":
      return <img className="icon dark" src={DarkIcon} alt="Dark Icon" loading="lazy"/>;
    case "dragon":
      return <img className="icon dragon" src={DragonIcon} alt="Dragon Icon" loading="lazy"/>;
    case "electric":
      return <img className="icon electric" src={ElectricIcon} alt="Electric Icon" loading="lazy"/>;
    case "fairy":
      return <img className="icon fairy" src={FairyIcon} alt="Fairy Icon" loading="lazy"/>;
    case "fighting":
      return <img className="icon fighting" src={FightingIcon} alt="Fighting Icon" loading="lazy"/>;
    case "fire":
      return <img className="icon fire" src={FireIcon} alt="Fire Icon" loading="lazy"/>;
    case "flying":
      return <img className="icon flying" src={FlyingIcon} alt="Flying Icon" loading="lazy"/>;
    case "ghost":
      return <img className="icon ghost" src={GhostIcon} alt="Ghost Icon" loading="lazy"/>;
    case "grass":
      return <img className="icon grass" src={GrassIcon} alt="Grass Icon" loading="lazy"/>;
    case "ground":
      return <img className="icon ground" src={GroundIcon} alt="Ground Icon" loading="lazy"/>;
    case "ice":
      return <img className="icon ice" src={IceIcon} alt="Ice Icon" loading="lazy"/>;
    case "normal":
      return <img className="icon normal" src={NormalIcon} alt="Normal Icon" loading="lazy"/>;
    case "poison":
      return <img className="icon poison" src={PoisonIcon} alt="Poison Icon" loading="lazy"/>;
    case "psychic":
      return <img className="icon psychic" src={PsychicIcon} alt="Psychic Icon" loading="lazy"/>;
    case "rock":
      return <img className="icon rock" src={RockIcon} alt="Rock Icon" loading="lazy"/>;
    case "steel":
      return <img className="icon steel" src={SteelIcon} alt="Steel Icon" loading="lazy"/>;
    case "water":
      return <img className="icon water" src={WaterIcon} alt="Water Icon" loading="lazy"/>;
    default:
      return null;
  }
};