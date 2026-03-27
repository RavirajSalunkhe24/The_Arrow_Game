const arrows = ["↑", "↓", "←", "→"];

export const generateGrid = (size) => {

    const grid = Array(size)
        .fill(null)
        .map(() => Array(size).fill(null));

    const isPathClear = (r, c, arrow) => {

        if (arrow === "→") {
            for (let i = c + 1; i < size; i++) {
                if (grid[r][i] !== null) return false;
            }
        }

        if (arrow === "←") {
            for (let i = c - 1; i >= 0; i--) {
                if (grid[r][i] !== null) return false;
            }
        }

        if (arrow === "↑") {
            for (let i = r - 1; i >= 0; i--) {
                if (grid[i][c] !== null) return false;
            }
        }

        if (arrow === "↓") {
            for (let i = r + 1; i < size; i++) {
                if (grid[i][c] !== null) return false;
            }
        }

        return true;
    };

    const arrowCount = Math.floor(size * size * 0.6);

    let placed = 0;

    while (placed < arrowCount) {

        const r = Math.floor(Math.random() * size);
        const c = Math.floor(Math.random() * size);

        if (grid[r][c] !== null) continue;

        const arrow = arrows[Math.floor(Math.random() * arrows.length)];

        if (isPathClear(r, c, arrow)) {

            grid[r][c] = arrow;

            placed++;
        }

    }

    return grid;
};