const levels = ["B2.1", "B2.2", "C1", "C2"];
const colors = [
    {color: "#e84e1b", bg: "#912500"},
    {color: "#e4332a", bg: "#940700"},
    {color: "#931b80", bg: "#59004b"},
    {color: "#662382", bg: "#36034c"},
];


const root = document.querySelector(":root");
const level = document.querySelector(".level-text");
const randomizeWordsButton = document.querySelector(".words-randomize");
const clearUsedCardsButton = document.querySelector(".clear");
const wordsListItems = document.querySelectorAll("li");


randomizeWordsButton.addEventListener("click", SetRandomCards);
level.addEventListener("click", SetNextLevel);
clearUsedCardsButton.addEventListener("click", () => {
        ClearLocalStorageValue(level.innerText);
        SetZeroCards();
    }
);


function SetRandomCards() {
    const key = level.innerText;
    const used = GetFromLocalStorage(key, {});
    
    if (Object.keys(used).length >= 500) {
        return;
    }

    for (let i = 0; i < wordsListItems.length; i++) {
        const newCard = GetRandomCard(used);
        
        wordsListItems[i].innerText = newCard;
    }

    WriteToLocalStorage(key, used);

}

function SetZeroCards() {
    for (let i = 0; i < wordsListItems.length; i++) {
        wordsListItems[i].innerText = 0;
    }
}

function GetRandomCard(used) {
    let newCard = Randomize(500);

    while(used[newCard = Randomize(500)]) {}
    
    used[newCard] = true;

    return newCard;
}

function SetNextLevel() {
    const curLevelIndex = GetFromLocalStorage("level", 3);
    const newLevelIndex = (curLevelIndex + 1 >= levels.length) ? 0 : (curLevelIndex + 1);

    level.innerText = levels[newLevelIndex];
    SetCSSVariable("--bg", colors[newLevelIndex].bg);
    SetCSSVariable("--color", colors[newLevelIndex].color);
    WriteToLocalStorage("level", newLevelIndex);
}

function SetCSSVariable(key, value) {
    root.style.setProperty(key, value);
}

function GetFromLocalStorage(key, base) {
    const localStorageValue = JSON.parse(localStorage.getItem(key));
    return (localStorageValue || localStorageValue === 0) ? localStorageValue : base; 
}

function WriteToLocalStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
}

function ClearLocalStorageValue(value) {
    localStorage.setItem(value, null);
}

function Randomize(to) {
    return Math.floor(Math.random() * to) + 1;
}
