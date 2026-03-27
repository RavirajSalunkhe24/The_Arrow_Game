export const checkPathClear = (grid, row, col, direction) => {

    const size = grid.length;

    if (direction === "→") {
        for (let c = col + 1; c < size; c++) {
            if (grid[row][c] !== null) return false;
        }
    }

    if (direction === "←") {
        for (let c = col - 1; c >= 0; c--) {
            if (grid[row][c] !== null) return false;
        }
    }

    if (direction === "↑") {
        for (let r = row - 1; r >= 0; r--) {
            if (grid[r][col] !== null) return false;
        }
    }

    if (direction === "↓") {
        for (let r = row + 1; r < size; r++) {
            if (grid[r][col] !== null) return false;
        }
    }

    return true;
};