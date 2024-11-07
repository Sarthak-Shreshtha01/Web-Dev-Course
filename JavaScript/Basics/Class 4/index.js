

// yeh run krega
run();

// Hoisting - Process of moving the function to the top by JS
function run(){
    console.log("Hello");
}

// Function assignment
// Named Function Assignment
let stand = function walk(){
    console.log("walking");
    }
    
// Anonymous Function Assignment
let stand2 = function(){
    console.log("walking");
}

stand();
// Stand ko upar llikhenge toh nhi chalega kyuki Yeh Function Assignment hai

function sum(a,b){
    let total = 0;
    for(let value of arguments){
        total = total + value;
    }
    // console.log(arguments);
    return total;
}

console.log(sum(1,2));
console.log(sum(1));
console.log(sum());
console.log(sum(1,2,3,4,5));

function sum2(x , y, ...args){
    console.log(args);
}

sum2(1,2,3,4,5,6);

function interest(p , r=5 , t=10){
    return p*r*t/100;
}

console.log(interest(1000 , undefined , 7));

let person = {
    fName: 'Sarthak',
    lName: 'Shreshtha',

    get fullname(){
        return `${person.fName} ${person.lName}`;
    },

    set fullname(value){
        if(typeof(value) !== String){
            throw new Error("Enter a String");
        }

        let parts = value.split(' ');
        this.fName = parts[0];
        this.lName = parts[1];
    }
};

// try{
//     person.fullname = "Sarthak shrestha";
// }

// catch(e){
//     alert(e);
// }

let arr = [1,23,4,5]
let totalsum = arr.reduce((accumulator , currentvalue) => accumulator+currentvalue ,0);

console.log(totalsum);
