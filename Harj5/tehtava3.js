const fs = require('fs')

fs.readFile('../Data/numbers.txt', (error, data) => {
    if (error) {
        console.error(error);
    } else {
        // Converts data from numerot.txt to string
        const numbers = data.toString();
        
        //console.log(`Numerot: ${numbers}`)
        
        // Separate numbers based on the comma and change them to numbers
        const numbersArray = numbers.split(",").map(Number);
        
        //console.log(numbersArray)

        // use for loop to sum numbers together
        let sum = 0;
        for (const number of numbersArray) {
            sum += number;
        }

        // print the result to the console
        console.log(`Summa on: ${sum}`);
    }
 })

 console.log("Reading file and calculating the sum")