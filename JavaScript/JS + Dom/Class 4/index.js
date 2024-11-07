
// setTimeout(function(){
//     console.log("Third");
// } , 3000);

// function sync(){
//     console.log("first");
// };

// sync();

// console.log("Second");


// let merapromise = new Promise(function(resolve , reject){
//     setTimeout(function(){
//         console.log("hello");
//     } , 5000);
//     // resolve(2233);
//     reject(new Error("error aa gya"));
// });

// merapromise.then((value) => {console.log(value)});
// merapromise.catch((value) => {console.log("Error aaya")});

// let waada1 = new Promise(function(resolve , reject){
//     setTimeout(() => {
//         console.log("setTimeout 1");
//     }, 2000);
//     resolve(true);
// })

// let output = waada1.then(()=>{
//     let waada2 = new Promise(function(resolve , reject){
//         setTimeout(()=>{
//             console.log("Set timeout 2");
//         } , 3000);
//         resolve("waada 2");
//     })
//     return waada2;
// })

// output.then((value) => console.log(value)); 

// async function utility() {
    
//     let delhimausam = new Promise(function(resolve , reject) {
//         setTimeout(() => {
//             resolve("Delhi me garmi");
//         }, 3000);
//     })

//     let hydmausam = new Promise(function(resolve , reject) {
//         setTimeout(() => {
//             resolve("Hyderabad is cool");
//         }, 6000);
//     })

//     let DM =  delhimausam;
//     let HM =  hydmausam;

//     return [DM , HM];
// }

// async function utility() {
//     let content = await fetch('https://jsonplaceholder.typicode.com/posts/1');
//     let output = await content.json();
//     console.log(content);
// }

// utility();

async function helper() {

    let options = {
        method: 'POST',
        body: JSON.stringify({
            title: 'sarthak',
            body: 'mst',
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }

    let content = await fetch('https://jsonplaceholder.typicode.com/posts' , options);
    let output =  content.json();
    return output;
}

async function utility() {
    let ans = await helper();
    console.log(ans);
}

utility();
