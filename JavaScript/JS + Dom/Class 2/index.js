
// function print(){
//     console.log("clicked")
// }

// // document.addEventListener('click' , print );
// // document.removeEventListener('click' , print );

// const content = document.querySelector('#wrapper');
// content.addEventListener('click' , function(event){
//     console.log(event);
// });

// let links = document.querySelectorAll('a');
// let thirdlink = links[2];

// thirdlink.addEventListener('click' , function(event){
//     event.preventDefault();
//     console.log("Mazza aaya");
// });

// let mydiv= document.createElement('mydiv');

// function parastatus(event){
//     console.log(event.target.textContent);
// }

// mydiv.addEventListener('click' , parastatus);

// for(let i= 0 ;i<100 ; i++){
//     let mypara = document.createElement('p');
//     mypara.textContent = "This is para "+ i ;
     
//     mydiv.appendChild(mypara);
// }

// document.body.appendChild(mydiv);

let element = document.querySelector('#wrapper');

element.addEventListener('click' , function(event){
    if(event.target.nodeName === 'SPAN'){
        console.log("Span pr click kiya hai" + event.target.textContent);
    }
});
