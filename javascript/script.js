const randomWords = ["Kelvin", "Joule", "Jungle", "Education", "Bubble", "Maroon", "Happiness", "Love", "Xrays", "Kite", "Mangoe", "Roaring", "Fantasy", "Chemical", "Wonders", "Common", "Very", "HAHAHA", "Catch", "Legend", "Impossible", "Ghaffar", "Casio", "Talent", "Teenager", "Hollow", "Unknown", "Union", "Array", "Programming", "Sufi", "Jatt", "Rupee", "Grass", "Buffalo", "Monkey", "Respect", "Quran", "Zakat", "Wudu", "BlackPepper", "Zero", "Huge", "Kalories", "Milk", "Python", "Jam", "Hammers"];

let allowedWords = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
];

// Random Numbers Function

function randomNumber(min, max) {
  let number = Math.floor(Math.random() * max) + min;
  return number;
}

// Basic Variables Declerations

let permit = confirm("Play with Bot");
let codeWord;
if (permit === true) {
  let randNum = randomNumber(0, randomWords.length - 1);
  codeWord = randomWords[randNum].toString().toUpperCase();
} else {
  codeWord = prompt("Enter a Word: ").toString().toLocaleUpperCase();
}
let codeArr = Array.from(codeWord);

// Checking Input Words

if (permit === false) {
  codeArr.forEach((word) => {
    if (allowedWords.includes(word)) return;
    else
      document.querySelector("#game-line").textContent = "Invalid Entry Found!";
  });
}

let blanks = document.querySelector("#secret-words");
let score = 0;

// Chances Panel

let chances = 10;
let chancePanel = document.querySelector("#chances-panel");
chancePanel.textContent = chances;

// Main Logic

let codeArray = Array.from(codeWord);
let codeLength = codeArray.length;
let dummyVal = "";

for (let i = 1; i <= codeLength; i++) {
  dummyVal += "🍫";
}
blanks.textContent = dummyVal;

let dummyValArr = Array.from(dummyVal);

document.querySelectorAll(".keys").forEach((key) => {
  key.addEventListener("click", (e) => {
    if (codeArray.includes(key.textContent)) {
      key.style.backgroundColor = "green";
      key.style.color = "white";
      for (let i = 0; i < codeArray.length; i++) {
        if (codeArray[i] == key.textContent) {
          dummyValArr[i] = key.textContent;
          blanks.textContent = dummyValArr.join(" ").toString();
          score++;
          if (score === codeLength) {
            setTimeout(() => {
              blanks.textContent = `You Win for "${codeWord}"`;
              blanks.style.color = "green";
              score = 0
            }, 1000);
          }
        }
      }
    } else {
      if (chances > 0 && score !== codeLength) {
        key.style.backgroundColor = "red";
        key.style.color = "yellow";
        console.log("Different");
        chances--;
        chancePanel.textContent = chances;
        if (chances === 3) {
          chancePanel.style.color = "#ffae00";
        } else if (chances === 2) {
          chancePanel.style.color = "purple";
        } else if (chances === 1) {
          chancePanel.style.color = "red";
        }
      }
      if (score !== codeLength && chances === 0) {
        setTimeout(() => {
          if(score !== codeLength && chances === 0){
            document.querySelector('#keyboard').addEventListener('click', (event) =>{
              event.preventDefault()
              event.stopPropagation()
            })
          }
          blanks.textContent = `You Lost for "${codeWord}"`;
          blanks.style.color = "red";
        }, 1000);
      }
    }
  });
});
