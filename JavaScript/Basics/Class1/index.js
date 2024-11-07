console.log('Hello');

let a = 5;
console.log(a);

// const num = 12;
// console.log(num);

a="sarthak";
console.log(a);

let x =1;
let y ='1';
console.log(x===y);;

let age = 15;

let s= (age>=18)?'I can vote' : 'I cannot Vote';
console.log(s);

console.log(false||'sarthak');

let marks = 90;

// if(marks>90){
//     console.log('A');
// }
// else if(marks>80){
//     console.log('B');
// }
// else if(marks>70){
//     console.log('C');
// }
// else if(marks>60){
//     console.log('D');
// }
// else {
//     console.log('E');
// }
let num=3

switch(num){
    case 1: console.log('A');
    break;
    case 2: console.log('B');
    break;
    case 3: console.log('C');
    break;
    case 4: console.log('D');
    break;
    default:
        console.log('E');
}

for(let i=0 ; i<5 ; i=i+1 ){
    console.log("Sarthak" +i);
}

let p=1;
while(p<6){
    console.log(p);
    p++;
}