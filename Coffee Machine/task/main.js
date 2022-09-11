// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input')

const coffeeMachine = {
    water: 400,
    milk: 540,
    coffeeBeans: 120,
    disposableCups: 9,
    money: 550
}

const coffeeTypes = {
    espresso: {
        water: 250,
        milk: 0,
        coffeeBeans: 16,
        cost: 4
    },
    latte: {
        water: 350,
        milk: 75,
        coffeeBeans: 20,
        cost: 7
    },
    cappuccino: {
        water: 200,
        milk: 100,
        coffeeBeans: 12,
        cost: 6
    }
};

function printMachineState() {
    console.log();
    console.log("The coffee machine has:");
    console.log(`${coffeeMachine.water} ml of water`);
    console.log(`${coffeeMachine.milk} ml of milk`);
    console.log(`${coffeeMachine.coffeeBeans} g of coffee beans`);
    console.log(`${coffeeMachine.disposableCups} disposable cups`);
    console.log(`${coffeeMachine.money} of money`);
}

function fillMachine() {
    console.log("Write how many ml of water you want to add:");
    coffeeMachine.water += Number(input());
    console.log("Write how many ml of milk you want to add:");
    coffeeMachine.milk += Number(input());
    console.log("Write how many grams of coffee beans you want to add:");
    coffeeMachine.coffeeBeans += Number(input());
    console.log("Write how many disposable coffee cups you want to add:");
    coffeeMachine.disposableCups += Number(input());
}

function takeMoney() {
    console.log(`I gave you $${coffeeMachine.money}`);
    coffeeMachine.money = 0;
}

function buyCoffee() {
    console.log();
    console.log("What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, back - to main menu:");
    let answer = input();

    // Check answer is text or not
    if (typeof answer === "string") {
        if (answer.toLowerCase() === "back") {
            return;
        }
    }

    let coffeeNumber = Number(answer);

    let coffeeType;

    switch (coffeeNumber) {
        case 1:
            coffeeType = "espresso";
            break;
        case 2:
            coffeeType = "latte";
            break;
        case 3:
            coffeeType = "cappuccino";
            break;
    }

    if (coffeeMachine.water < coffeeTypes[coffeeType].water) {
        console.log("Sorry, not enough water!");
        return;
    }

    if (coffeeMachine.milk < coffeeTypes[coffeeType].milk) {
        console.log("Sorry, not enough milk!");
        return;
    }

    if (coffeeMachine.coffeeBeans < coffeeTypes[coffeeType].coffeeBeans) {
        console.log("Sorry, not enough coffee beans!");
        return;
    }

    console.log("I have enough resources, making you a coffee!");

    coffeeMachine.water -= coffeeTypes[coffeeType].water;
    coffeeMachine.milk -= coffeeTypes[coffeeType].milk;
    coffeeMachine.coffeeBeans -= coffeeTypes[coffeeType].coffeeBeans;
    coffeeMachine.disposableCups -= 1;
    coffeeMachine.money += coffeeTypes[coffeeType].cost;
}

function start() {
    let machineWorking = true;

    while(machineWorking) {
        console.log("Write action (buy, fill, take, remaining, exit):");
        let processType = input();

        switch (processType) {
            case "buy":
                buyCoffee();
                break;
            case "fill":
                fillMachine();
                break;
            case "take":
                takeMoney();
                break;
            case "remaining":
                printMachineState();
                break;
            case "exit":
                machineWorking = false;
                break;
            default:
                console.log("Invalid proces type!");
                break;
        }

        console.log();
    }
}

start();
