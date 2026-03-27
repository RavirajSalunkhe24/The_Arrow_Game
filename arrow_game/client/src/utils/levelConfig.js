export const getGridSize = (level) => {

    if (level === 1) return 3;

    if (level >= 2 && level <= 5) return 4;

    if (level >= 6 && level <= 10) return 5;

    if (level >= 11 && level <= 15) return 6;

    if (level >= 16 && level <= 20) return 7;

    return 8;

};