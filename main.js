const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(array) {
        this._array = array;
    }
    print() {
        let stringArray = this._array.map(x => x.join(''));
        stringArray.forEach(x => console.log(x));
    }
    static generateField(height, width, percentage = 0.1) {
        while (height < 4) {
            height += 1;
        };
        while (width < 4) {
            width += 1
        };
        const field = new Array(height).fill(0).map(el => new Array(width));
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const prob = Math.random();
            field[y][x] = prob > percentage ? fieldCharacter : hole;
          }
        }
        
        const hatLocation = {
          x: Math.floor(Math.random() * width),
          y: Math.floor(Math.random() * height)
        };
        
        while (hatLocation.x === 0 && hatLocation.y === 0) {
          hatLocation.x = Math.floor(Math.random() * width);
          hatLocation.y = Math.floor(Math.random() * height);
        }
        field[hatLocation.y][hatLocation.x] = hat;
        field[0][0] = pathCharacter;
        return field;
      }
    }

/* silly idea I had for constructing Field() argument
let pffhhffhff = [pathCharacter, fieldCharacter, fieldCharacter, hole, hole, fieldCharacter, fieldCharacter, hole, fieldCharacter, fieldCharacter];
let fffhhffhff = [fieldCharacter, fieldCharacter, fieldCharacter, hole, hole, fieldCharacter, fieldCharacter, hole, fieldCharacter, fieldCharacter];
let hfffhfhfhh = [hole, fieldCharacter, fieldCharacter, fieldCharacter, hole, fieldCharacter, hole, fieldCharacter, hole, hole];
let ffffffffff1 = [fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter];
let hhffffffff = [hole, hole, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter];
let Hhffffffff = [hat, hole, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter];
let fhffffffff1 = [fieldCharacter, hole, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter];
let fhffffffff2 = [fieldCharacter, hole, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter];
let fhffffffff3 = [fieldCharacter, hole, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter];
let ffffffffff2 = [fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter];
*/
const myField = new Field(Field.generateField(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.random() * (0.5)));


myField.print();
//prompt('Choose a direction to find your hat. l, r, u, d.....')
//take user input here
// 'l' will copy 'pathCharacter' one index to the left (copy over whatever character is there)
// 'r' will copy pathChar one index to the right
// 'u' one character up
// 'd' one character down
// index being moved to is less than zero or more than 9, player is out of bounds
// if element to be replaced is a hole, player falls in hole and loses
// if element to be replaced is the hat, player wins game

let foundHat = false;
let outbounds = false;
let inHole = false;
let vert = 0;
let hor = 0;


while (!foundHat && !outbounds && !inHole) {  
    let direction = prompt('pick a direction l, r, u, d : ');
    if (direction === 'l') {
        if (hor === 0) {
            console.log('you went out of bounds, dummy!');
            outbounds = true;
        } else { hor -= 1};
        if (myField._array[vert][hor] === hole) {
            console.log('You fell in a hole! Better luck next time.');
            inHole = true;
        } else if (myField._array[vert][hor] === hat) {
            console.log('You found your hat! You win!');
            foundHat = true;
        } else {
            myField._array[vert][hor] = pathCharacter;
        }
        myField.print();
    }
    if (direction === 'r') {
        if (hor === 9) {
            console.log('you went out of bounds, dummy!');
            outbounds = true;
            process.exit();
        } else { hor += 1};
        if (myField._array[vert][hor] === hole) {
            console.log('You fell in a hole! Better luck next time.');
            inHole = true;
            process.exit();
        } else if (myField._array[vert][hor] === hat) {
            console.log('You found your hat! You win!');
            foundHat = true;
            process.exit();
        } else {
            myField._array[vert][hor] = pathCharacter;
        }
        myField.print();
    }
    if (direction === 'u') {
        if (vert === 0) {
            console.log('you went out of bounds, dummy!');
            outbounds = true;
            process.exit();
        } else { vert -= 1};
        if (myField._array[vert][hor] === hole) {
            console.log('You fell in a hole! Better luck next time.');
            inHole = true;
            process.exit();
        } else if (myField._array[vert][hor] === hat) {
            console.log('You found your hat! You win!');
            foundHat = true;
            process.exit();
        } else {
            myField._array[vert][hor] = pathCharacter;
        }
        myField.print();
    }
    if (direction === 'd') {
        if (vert === 9) {
            console.log('you went out of bounds, dummy!');
            outbounds = true;
            process.exit();
        } else { vert += 1};
        if (myField._array[vert][hor] === hole) {
            console.log('You fell in a hole! Better luck next time.');
            inHole = true;
            process.exit();
        } else if (myField._array[vert][hor] === hat) {
            console.log('You found your hat! You win!');
            foundHat = true;
            process.exit();
        } else {
            myField._array[vert][hor] = pathCharacter;
        }
        myField.print();
    }
    }
