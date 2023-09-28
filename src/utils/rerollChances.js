//these are the reroll chances where the key is the level and the value is an array with the percentage chance you can hit a unit at the tier(index + 1)
const chances = {
  1: [1, 0, 0, 0, 0],
  2: [1, 0, 0, 0, 0],
  3: [0.75, 0.25, 0, 0, 0],
  4: [0.55, 0.3, 0.15, 0, 0],
  5: [0.45, 0.33, 0.2, 0.2, 0],
  6: [0.25, 0.4, 0.3, 0.5, 0],
  7: [0.19, 0.3, 0.35, 0.15, 0.01],
  8: [0.16, 0.2, 0.35, 0.25, 0.04],
  9: [0.09, 0.15, 0.3, 0.3, 0.16],
  10: [0.05, 0.1, 0.2, 0.4, 0.25],
};

//hardcoding for now based on this set but will make an option to change the amount of units per tier
//key represents tier and value is an object with the amount of unique units in this tier and the amount of units total for each.
const units = {
  1: { unique: 13, total: 29 },
  2: { unique: 13, total: 22 },
  3: { unique: 13, total: 18 },
  4: { unique: 12, total: 12 },
  5: { unique: 8, total: 10 },
};

export async function chance(formData) {
  let matrix = makeTransitionMatrix(formData);
  let final = power(matrix, (5 * Math.floor(formData.goldToRoll)) / 2);
  /* we round down gold/2 incase we have odd number of gold since each roll cost 2 gold 
  and we multiply by 5 because each refresh shows 5 possible shops(unit) to purchase.
  this will give us a final matrix of the probability of hitting 1-9 of desired units after rolling x amount of gold */
  const chanceToHit = final[0]; // this array will be the values in the markov chain that represents the chance we will stay in the current state after a roll

  let actualProb = []; //this arr will contain the actual probabilities of hitting 1-9 units where we get the value by taking the cumulative and subtracting
  for (let i = 1; i < 10; i++) {
    let cProb = 1;
    for (let j = 0; j < i; j++) {
      cProb -= chanceToHit[j];
    }
    actualProb.push(cProb);
  }
  return [chanceToHit, actualProb];
}

function makeTransitionMatrix(formData) {
  const { level, cost, alreadyOut, sameCostOut } = formData;
  const matrix = [];
  for (let i = 0; i < 10; i++) {
    const row = [];
    for (let j = 0; j < 10; j++) {
      if (i === 9 && j === 9) {
        row.push(1); //at the edge of matrix for the markov chain everything needs to add to 1 for the probability because if we already hit 9 of a unit the probaility to be at 9 in the chain is 100% which is 1.
        continue; // continues on to finish rest of matrix even after hitting one edge of matrix
      }
      const prob = transitionMatrixProb(
        level,
        cost,
        alreadyOut + i,
        sameCostOut + i
      ); //gets the probability for 0-9 of the desired unit with each time we hit a unit it affects the pool by i amount of units hit.
      if (j === i) {
        row.push(1 - prob); // 1- prob because prob is calculating the probability to hit the next unit so this 1 - prob will be the probaility to stay in this state of the markov chain
      } else if (j === i + 1) {
        row.push(prob); // the prob to move onto the next state in this chain
      } else {
        row.push(0); // push 0 because in our chain we cant skip units, we must go from 1 unit to 2 units to 3 units.
      }
    }
    matrix.push(row);
  }
  return matrix;
}

function transitionMatrixProb(level, cost, alreadyOut, sameCostOut) {
  let remainingInPool = Math.max(0, units[cost]["total"] - alreadyOut);
  let currPoolSize = units[cost]["total"] * units[cost]["unique"] - sameCostOut;
  let odds = chances[level][cost - 1];
  return odds * (remainingInPool / currPoolSize);
}

function multiplyMatrices(a, b) {
  let aRows = a.length;
  let aCols = a[0].length;
  let bCols = b[0].length;
  let result = new Array(aRows);
  for (let r = 0; r < aRows; ++r) {
    const row = new Array(bCols);
    result[r] = row;
    const ar = a[r];
    for (let c = 0; c < bCols; ++c) {
      let sum = 0;
      for (let i = 0; i < aCols; ++i) {
        sum += ar[i] * b[i][c];
      }
      row[c] = sum;
    }
  }
  return result;
}

function power(a, n) {
  let resultMat = a;
  for (let i = 1; i < n; i++) {
    resultMat = multiplyMatrices(resultMat, a);
  }
  return resultMat;
}
