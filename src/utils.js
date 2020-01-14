export const getString = num => {
  if (num < 10) return `00${num}`;
  else if (num < 100) return `0${num}`;
  else return num;
};

export const getNum = string => {
  return Number(string);
};

export const capitalize = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const hectogramsToKilograms = num => {
  return `${(num / 10).toFixed(1)} kg`;
};

export const hectogramsToPounds = num => {
  return `${((num * 2.2) / 10).toFixed(1)} lbs`;
};

export const decimetersToMeters = num => {
  return `${(num / 10).toFixed(1)} m`;
};

export const decimetersToFeetInches = num => {
  const feet = ((num * 3.2808) / 10).toFixed(1);
  const inches = ((feet % 1) * 12).toFixed(1);
  return `${Math.floor(feet)}' ${Math.round(inches)}"`;
};

export const formatStatName = string => {
  switch (string) {
    case "hp":
      return "HP";
    case "attack":
      return "Attack";
    case "defense":
      return "Defense";
    case "special-attack":
      return "SP. Attack";
    case "special-defense":
      return "SP. Defense";
    case "speed":
      return "Speed";
    default:
      return null;
  }
};
