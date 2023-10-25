// 1. We need the user to deposit some money, which they are going to bet on!
// 2. Get the number of lines they want to bet on.
// 3. How much do they want to bet?
// 4. Spin the machine
// 5. If they win, let em know they won
// 6. Give'em the money they won
// 7. Play again?
// 8. What if they lose?
const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;
//how many times these symbols can appear
const SYMBOLS_COUNT = {
    A: 9,
    B: 1,
    C: 1,
    D: 1
};
//how much value they possess
const SYMBOLS_VALUES = {
    A: 5,
    B: 6,
    C: 2,
    D: 1
};

// Get the deposit from the user
const getdeposit = () => {
    while (true) {
        const depositamount = prompt("Please enter the amount that you wish to deposit: ");
        //convert the amount which is string to a number by using parseFloat
        const depositamountnumber = parseFloat(depositamount);
        //check for invalid deposit the user enters and print message for invalid entries.
        if (isNaN(depositamountnumber) || depositamountnumber <= 0) {
            console.log("Invalid entry! Try again.")
        } else {
            return depositamountnumber;
        }
    }

};
//find the number of lines that user wishes to bet on
const getnumberofline = () => {
    while (true) {
        const lines = prompt("Please enter the number of lines that you wish to bet on[1-3]: ");
        //convert the lines which is string to a number by using parseFloat
        const nooflines = parseFloat(lines);
        //check for invalid number of lines that the user enters and print message for invalid entries.
        if (isNaN(nooflines) || nooflines > 3 || nooflines <= 0) {
            console.log("Invalid entry! Try again.");
        } else {
            return nooflines;
        }
    }
};
//collet a bet amount from the user
const getbetamount = (balance, linesnum) => {
    while (true) {
        const bet = prompt("Please enter the amount you want to bet per line: ");
        //convert the lines which is string to a number by using parseFloat
        const betnum = parseFloat(bet);
        //check for invalid number of lines that the user enters and print message for invalid entries.
        if (isNaN(betnum) || betnum > balance / linesnum || betnum <= 0) {
            console.log("Invalid entry! Try again.");
        } else {
            return betnum;
        }
    }
};

//spinning the machine
const spinmachine = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }
    const slotreels = []; //this represents the column of the slot machine.
    for (let i = 0; i < COLS; i++) {
        //for the number of columns that are available push a [] into the slotreels that we had already defined.
        slotreels.push([]);
        const symbolreels = [...symbols]; //copies the symbols
        for (let j = 0; j < ROWS; j++) {
            //randomly select an array from symbolreels - choose a random index
            const randindex = Math.floor(Math.random() * symbolreels.length);
            const selectreel = symbolreels[randindex];
            slotreels[i].push(selectreel); //push this to the reels
            symbolreels.splice(randindex, 1); //remove that from the array 

        }
    }
    console.log(slotreels);
    return slotreels;
};

const transpose = (reels) => {

    const rows = [];
    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i]);
        }
    }
    console.log(rows);
    return rows;
};
const printdeposit = (deposit) => {
    console.log("Congrats!, you have deposited ", deposit, " rupees.")
};
const printnooflines = (linesnum) => {
    console.log("You have decided to bet on ", linesnum, " lines!")
};
const printslot = (rows) => {
    for (const row of rows) {
        // let rowstring = "A | B | C"
        let rowstring = ""
        for (const [i, symbol] of row.entries()) {
            rowstring += symbol
            if (i != row.length - 1) {
                rowstring += " | "
            }
        }
        console.log(rowstring)
    }
};

const win = (rows, linesnum, betamount) => {

    let wins = 0; //calculate the winnings 
    for (let row = 0; row < linesnum; row++) {
        const symbols = rows[row];
        let allsame = true; // boolean value to check whether all the values are true
        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allsame = false;
                break; //break the code here if they are not same
            }
        }
        if (allsame) {
            console.log("Yayy, You Won!");

            wins += betamount * SYMBOLS_VALUES[symbols[0]];
        }

    }

    return wins;

};
const printwonamt = (wins) => {
    console.log("You have won, Rs.", wins)
}

const game= () => {

    let balance = getdeposit();
    while (true) {
        console.log("You have a balance of " + balance);
        const linesnum = getnumberofline();
        const betamount = getbetamount(balance, linesnum);
        balance -= betamount * linesnum;
        printdeposit(balance);

        const reels = spinmachine();
        const rows = transpose(reels);
        //printslot(rows);
        const checkwin = win(rows, linesnum, betamount);
        printwonamt(checkwin);
        if (balance <= 0) {
            console.log("You ran out off money :-( !");
            break;
        }
        const playagain = prompt("do u wanna play again?huh?(y/n)");
        if (playagain != 'y'){
        break;
            }
        }
}
game();