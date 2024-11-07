
const t1 = performance.now();
for(let i=0 ; i<100 ; i++){
    let myelement = document.createElement('p');
    myelement.textcontent = "This is para" + i;
    
    document.body.appendChild(myelement);
}
const t2 = performance.now();
console.log("Time taken: " + (t2-t1) + " ms")

const t3 = performance.now();
let mydiv = document.createElement('div');

for(let i=0 ; i<100 ; i++){
    let myelement = document.createElement('p');
    myelement.textcontent = "This is para" + i;
    
    mydiv.appendChild(myelement);
}

document.body.appendChild(mydiv);
const t4 = performance.now();
console.log("Time taken: " + (t4-t3) + " ms")


const t5 = performance.now();
let fragment = document.createDocumentFragment();

for(let i=0 ; i<100 ; i++){
    let myelement = document.createElement('p');
    myelement.textcontent = "This is para" + i;
    
    fragment.appendChild(myelement);
}

document.body.appendChild(fragment);
const t6 = performance.now();
console.log("Time taken: " + (t6-t5) + " ms")