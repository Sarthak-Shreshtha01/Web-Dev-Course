const inputslider = document.querySelector("[data-lengthSlider]");
const lengthdisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password ="";
let passwordLength = 10;
let checkCount = 0;

// set color to grey
setIndicator('#ccc');

// set password length
function handleSlider(){  //Password length ko UI me reflect krwata h
    inputslider.value = passwordLength;
    lengthdisplay.innerText = passwordLength;
    const min = inputslider.min;
    const max = inputslider.max;
    inputslider.style.backgroundSize = ((passwordLength-min)*100/(max-min))+"% 100%"
}
handleSlider(); 

function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`
}

function getRndInteger(min , max){
    return Math.floor(Math.random() * (max-min)) + min;
}

function generateRndNumber(){
    return getRndInteger(0,9);
}

function generateLowercase(){
    return String.fromCharCode(getRndInteger(97,123));
}

function generateUppercase(){
    return String.fromCharCode(getRndInteger(65,91));
}

function generateSymbols(){
    const randno = getRndInteger(0 , symbols.length);
    return symbols.charAt(randno);
}

function calcStrength(){ 
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;

    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numbersCheck.checked) hasNum = true;
    if(symbolsCheck.checked) hasSym = true;

    if(hasLower && hasUpper && (hasSym || hasNum) && password.length>=8){
        setIndicator('#0f0');
    }
    else if((hasLower || hasUpper) && (hasSym || hasNum) && password.length>=8){
        setIndicator('#ff0');
    }
    else{
        setIndicator('#f00');
    }
}

async function copycontent() {
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText= "Copied";
    }
    catch(e){
        copyMsg.innerText="Failed";
    }

    // to make copymsg visible
    copyMsg.classList.add("active");

    setTimeout( ()=>{
        copyMsg.classList.remove("active");
    } ,2000);
}

function handlecheckbox(){
    checkCount =0;
    allCheckBox.forEach((checkbox) => {
        if(checkbox.checked){
            checkCount++;
        }
    });

    // Special Case

    if(passwordLength<checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change' , handlecheckbox);
});

function shufflePassword(array){
    // Fisher Yates Method
    for(let i=array.length-1 ; i>0 ; i--){
        const j = Math.floor(Math.random() * (i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str="";
    array.forEach((el) => (str+=el));
    return str;
}


inputslider.addEventListener('input' , (e)=>{
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click' , ()=>{
    if(passwordDisplay.value){
        copycontent();
    }
})

generateBtn.addEventListener('click' , ()=>{
    // No checkbox is selected
    if(checkCount<=0) return;
    console.log('0');

    if(passwordLength<checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
    console.log('1');
    
    // Finding new password
    // Remove old password
    
    password = "";
    console.log('2');
    
    console.log('2');
    // put the stuff in checkboxes

    // if(uppercaseCheck.checked){
    //     password+=generateUppercase();
    // }
    // if(lowercaseCheck.checked){
    //     password+=generateLowercase();
    // }
    // if(numbersCheck.checked){
    //     password+=generateRndNumber();
    // }
    // if(symbolsCheck.checked){
    //     password+=generateSymbols();
    // }
    
    // We have a better way
    
    let funcarr = [];
    
    if(uppercaseCheck.checked){
        funcarr.push(generateUppercase);
    }
    if(lowercaseCheck.checked){
        funcarr.push(generateLowercase);
    }
    if(numbersCheck.checked){
        funcarr.push(generateRndNumber);
    }
    if(symbolsCheck.checked){
        funcarr.push(generateSymbols);
    }
    console.log('3');

    // Compulsary Addition

    for(let i=0 ; i<funcarr.length ; i++){
        password+=funcarr[i]();
    }
    console.log('4');

    // remaining addition

    for(let i=0 ; i<(passwordLength - funcarr.length) ; i++){
        let randindex = getRndInteger(0,funcarr.length);
        password+=(funcarr[randindex])();
    }
    console.log('5');

    // shuffle the password
    password = shufflePassword(Array.from(password));
    console.log('6');

    // show in UI
    passwordDisplay.value = password;
    console.log(password);
    console.log('7');

    // Calculate Strength
    calcStrength();

})