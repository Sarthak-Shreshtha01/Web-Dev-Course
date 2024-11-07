const counter = document.querySelector('#counter');

let increment = () =>{
    let value = parseInt(counter.innerText);
    value = value + 1;
    counter.innerText= value;
}

let decrement = () =>{
    let value = parseInt(counter.innerText);
    value = value - 1;
    counter.innerText= value;
}