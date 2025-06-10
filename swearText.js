const TIMING = 120;
let counter = TIMING;
const SWEARS = [
    'YOU ARE A DISGRACE!',
    'HOLD THAT BALL IN POSITION YOU PIECE OF SHIT!',
    'YOU HAVE THE BRAIN OF A ROCK!',
    'YOU ARE USELESS!',
    'TOO HARD? DO YOU WANT TO CRY?',
];
const ENCOURAGEMENTS = [
    "Mistakes mean you're learning: you're doing great!",   
    "You’re not failing, you’re discovering what doesn’t work!",  
    "Persistence",
    "If this were easy, it wouldn’t be this rewarding!", 
    "You’re one step closer to mastering this.",  
    "Plot twist: Mistakes are just part of your journey.",  
];
function swearText() {
    let index = Math.floor(Math.random() * ENCOURAGEMENTS.length);
    let swear = document.getElementById('swears');
    swear.style.display = 'block';
    swear.innerHTML = ENCOURAGEMENTS[index];
    counter = TIMING;
}