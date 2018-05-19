const TIMING = 120;
let counter = TIMING;
const SWEARS = [
    'YOU ARE A DISGRACE!',
    'HOLD THAT BALL IN POSITION YOU PIECE OF SHIT!',
    'YOU HAVE THE BRAIN OF A ROCK!',
    'YOU ARE USELESS!',
    'SHOW SOME FUCKING BALLS!',
    'TOO HARD? DO YOU WANT TO CRY?',
];
function swearText() {
    let index = Math.floor(Math.random() * SWEARS.length);
    let swear = document.getElementById('swears');
    swear.style.display = 'block';
    swear.innerHTML = SWEARS[index];
    counter = TIMING;
}