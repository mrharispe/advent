const fs = require('fs');

const foodByElf = fs.readFileSync(`${__dirname}/day1.txt`, 'utf8').split('\n\n');

const getCaloriesForElf = (food) => {
    let caloriesCarried = 0;
    food.split('\n').forEach(foodCalories => {
        caloriesCarried += parseInt(foodCalories);
    });

    return caloriesCarried;
}

const part1 = () => {    
    let mostCalories = 0;

    foodByElf.forEach(elf => {
        const caloriesCarried = getCaloriesForElf(elf);
        
        if (caloriesCarried > mostCalories) {
            mostCalories = caloriesCarried;
        }
    });

    return mostCalories;
}

const part2 = () => {
    const caloriesByElf = foodByElf.map(elf => getCaloriesForElf(elf));
    const sortedCaloriesByElf = caloriesByElf.sort((a, b) => b - a);
    return sortedCaloriesByElf[0] + sortedCaloriesByElf[1] + sortedCaloriesByElf[2];
}

console.log(part1());
console.log(part2());