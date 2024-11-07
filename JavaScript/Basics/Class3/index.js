// console.log("Hello");

// let firstname = 'Sarthak';

// let Lastname = new String('Shreshtha');

// let message = `Hello ${firstname}
// kaise ho
//  saare`;

// console.log(message);

// let words = message.split(' ');
// console.log(words);

// let date = new Date();
// console.log(date);

// let date2 = new Date('August 27 2004 7:15');
// console.log(date2);

// let date3 = new Date(2004 , 7 , 27 , 7);
// console.log(date3);

// // Bahuut acha acha function h

// let abc = date3.getDate();
// console.log(abc);

let numbers =  [1,2,5,7];
console.log(numbers);

numbers.push(9);
console.log(numbers);
numbers.unshift(0);

console.log(numbers);

numbers.splice(2 , 0 , 'a','b' , 'c');

console.log(numbers);

console.log(numbers.indexOf(9));

console.log(numbers.includes(7));

let courses = [
    {no:1 , naam:'sarthak'},
    {no:2 , kaam: 'kuch nhi'}
]

console.log(courses.includes({no:1 , naam:'sarthak'} ));  //Yeh show krega false

let course = courses.find(function(course){
    return course.naam === 'sarthak';
});
console.log(course);

numbers.pop();
console.log(numbers);

// numbers.length() = 0;
// Array 0 ho jaaye ga

let second = [1,2,3] ;

let combine = numbers.concat(second);
let combine2 = [...numbers ,'a' ,  ...second , 'b'] 
console.log(combine);
console.log(combine2);

let arr = [10,20,60,80,50];

// 3 ways to print array

for(let value of arr){
    console.log(value);
}

arr.forEach(function(num){
    console.log(num);
} );

arr.forEach(num => console.log(num));

let joined = arr.join(',');
console.log(joined);

arr.sort();
console.log(arr);