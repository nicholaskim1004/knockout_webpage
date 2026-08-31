function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function generateFractions(difficulty) {
    let numerator1;
    let denominator1;
    let numerator2;
    let denominator2;

    if (difficulty === 'easy') {
        numerator1 = randomInt(1, 10);
        denominator1 = randomInt(1, 10);

        numerator2 = randomInt(1, 10);

        // Ensure same denominator for easy difficulty
        denominator2 = denominator1;
    }

    else if (difficulty === 'medium') {
        numerator1 = randomInt(-40, 40);
        denominator1 = randomInt(1, 10);

        numerator2 = randomInt(-40, 40);

        // Ensure denominators are factors of each other
        denominator2 = denominator1 * randomInt(1, 3);
    }

    else {
        numerator1 = randomInt(-40, 40);
        denominator1 = randomInt(1, 30);

        numerator2 = randomInt(-40, 40);
        denominator2 = randomInt(1, 35);
    }

    return [
        { numerator: numerator1, denominator: denominator1 },
        { numerator: numerator2, denominator: denominator2 }
    ];
}


function calculateSolution(fractions, operation) {
    const [fraction1, fraction2] = fractions;

    if (operation === 'add') {
        const commonDenominator =
            fraction1.denominator * fraction2.denominator;

        const newNumerator =
            (fraction1.numerator * fraction2.denominator) +
            (fraction2.numerator * fraction1.denominator);

        return {
            numerator: newNumerator,
            denominator: commonDenominator
        };
    }

    else if (operation === 'subtract') {
        const commonDenominator =
            fraction1.denominator * fraction2.denominator;

        const newNumerator =
            (fraction1.numerator * fraction2.denominator) -
            (fraction2.numerator * fraction1.denominator);

        return {
            numerator: newNumerator,
            denominator: commonDenominator
        };
    }

    else if (operation === 'multiply') {
        const newNumerator =
            fraction1.numerator * fraction2.numerator;

        const newDenominator =
            fraction1.denominator * fraction2.denominator;

        return {
            numerator: newNumerator,
            denominator: newDenominator
        };
    }

    else if (operation === 'divide') {
        const newNumerator =
            fraction1.numerator * fraction2.denominator;

        const newDenominator =
            fraction1.denominator * fraction2.numerator;

        return {
            numerator: newNumerator,
            denominator: newDenominator
        };
    }
}


function generateFractionProblem(difficulty) {
    const fractions = generateFractions(difficulty);

    // Randomly select an operation
    // 1 = add, 2 = subtract, 3 = multiply, 4 = divide
    const operation = randomInt(1, 4);

    if (operation === 1) {
        const solution = calculateSolution(fractions, 'add');

        return {
            problem: `${fractions[0].numerator}/${fractions[0].denominator} + ${fractions[1].numerator}/${fractions[1].denominator}`,
            solution: `${solution.numerator}/${solution.denominator}`,
            difficulty: difficulty
        };
    }

    else if (operation === 2) {
        const solution = calculateSolution(fractions, 'subtract');

        return {
            problem: `${fractions[0].numerator}/${fractions[0].denominator} - ${fractions[1].numerator}/${fractions[1].denominator}`,
            solution: `${solution.numerator}/${solution.denominator}`,
            difficulty: difficulty
        };
    }

    else if (operation === 3) {
        const solution = calculateSolution(fractions, 'multiply');

        return {
            problem: `${fractions[0].numerator}/${fractions[0].denominator} * ${fractions[1].numerator}/${fractions[1].denominator}`,
            solution: `${solution.numerator}/${solution.denominator}`,
            difficulty: difficulty
        };
    }

    else if (operation === 4) {
        const solution = calculateSolution(fractions, 'divide');

        return {
            problem: `${fractions[0].numerator}/${fractions[0].denominator} / ${fractions[1].numerator}/${fractions[1].denominator}`,
            solution: `${solution.numerator}/${solution.denominator}`,
            difficulty: difficulty
        };
    }
}