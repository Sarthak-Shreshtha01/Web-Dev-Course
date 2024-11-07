console.log("hello");

let rectangle={
    length:1,
    breadth:2,

    draw: function(){
        console.log('draw');
    }
};

// factory function ->camelNotation --> helloWorld

function createRectangle(length , breadth){
    return rectangle={
        
    
        draw: function(){
            console.log( length+breadth );
        }
    };
    
}

let rectangle1 = createRectangle(2,3);
let rectangle2 = createRectangle(3,4);
let rectangle3 = createRectangle(4,5);

// Constructor function -> PascalNotation -->HelloWorld

function RectangleConstructor(len , bre){
    this.length =len;
    this.breadth =bre;
    this.draw = function(){
        console.log(this.length*this.breadth);
    };
}

// Object creation

let rect1 = new RectangleConstructor(2,3);

// Dynammic nature of object

rect1.colour = 'yellow';
console.log(rect1);
delete rect1.colour;
console.log(rect1);

let a={value: 2};

function inc(a) {
    a.value++;
}

inc(a);

console.log(a.value);

let nayarect = {
    length : 2,
    breadth :3
};

// for-in loop
for(let key in nayarect){
    console.log(key , nayarect[key]);
}

// for of loop

for(let key of Object.entries(nayarect)){
    console.log(key);
}

if('length' in nayarect){
    console.log('true');
}
else{
    console.log('false');
}


// object cloning
// Important

let src = {
    a:12,
    b:22,
    c:33
}

let dest = {};

// using Iteration
for(let key in src){
    dest[key]= src[key];
}

console.log(dest);

src.a++;
console.log(dest);

// using assign

let src2 = {value: 3}

dest = Object.assign({} , src , src2);
console.log(dest);

// using spread

dest = {... src };
console.log(dest);