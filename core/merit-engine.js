/**
 * CTO Super Archy A - Merit Algorithm
 * Score = (Consistency + Complexity + Velocity)
 */
function calculateMerit(consistency, complexity, velocity) {
    const score = consistency + complexity + velocity;
    console.log(`[MERIT LOG] Current Agent Merit Score: ${score}`);
    return score;
}

module.exports = { calculateMerit };
