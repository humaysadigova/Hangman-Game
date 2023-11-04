const chosenCountryName = document.querySelector('#countryName');
const wrongLetters = document.querySelector('#wrongLetters');
const chance = document.querySelector('#chance');
const wins = document.querySelector('#wins');
const loses = document.querySelector('#loses');
const flagImg = document.querySelector('#flagImg');

let hangmanGame = {
    countryArr: [
        {
            country: 'albania',
            flag: './assets/images/tn_al-flag.gif'

        },
        {
            country: 'azerbaijan',
            flag: './assets/images/tn_aj-flag.gif'
        },
        {
            country: 'brazil',
            flag: './assets/images/tn_br-flag.gif'
        },
        {
            country: 'canada',
            flag: './assets/images/tn_ca-flag.gif'
        },
        {
            country: 'chile',
            flag: './assets/images/tn_ci-flag.gif'
        },
        {
            country: 'china',
            flag: './assets/images/tn_ch-flag.gif'
        },
        {
            country: 'france',
            flag: './assets/images/tn_fr-flag.gif'
        },
        {
            country: 'georgia',
            flag: './assets/images/tn_gg-flag.gif'
        },
        {
            country: 'italy',
            flag: './assets/images/it-flag.gif'
        },
        {
            country: 'turkey',
            flag: './assets/images/tn_tu-flag.gif'
        }
    ],

    chosenWord: '',
    randomCountry: '',
    numGuesses: null,
    numBlanks: 0,
    winCounter: 0,
    loseCounter: 0,
    wrongGuesses: [],
    lettersOfTheWord: [],
    blanksAndSuccesses: [],

    startGame: function(){
        this.blanksAndSuccesses = [];
        this.wrongGuesses = [];
        this.randomCountry = '';


        let chosenObj = hangmanGame.countryArr[Math.floor(Math.random() * hangmanGame.countryArr.length)];
        this.randomCountry = chosenObj.flag;
        this.chosenWord = chosenObj.country;
        this.lettersOfTheWord = this.chosenWord.split('');
        this.numBlanks = this.lettersOfTheWord.length;
        this.numGuesses = this.numBlanks + 4;
        this.blanksAndSuccesses = this.lettersOfTheWord.map(() => '_');

        this.showGame();
    },

    showGame: function(){
        flagImg.src = this.randomCountry;
        chance.innerHTML = this.numGuesses;
        chosenCountryName.innerHTML = this.blanksAndSuccesses.join(' ');
        wins.innerHTML = this.winCounter;
        loses.innerHTML = this.loseCounter;
        wrongLetters.innerHTML = this.wrongGuesses;

    },

    checkLetters: function(letter){
        let letterInWord = false;

        for (let i=0; i<this.numBlanks; i++){
            if (this.chosenWord[i] === letter){
                letterInWord = true;
            }
        };

        if(letterInWord) {
            for (let j=0; j < this.numBlanks; j++) {
                if (this.chosenWord[j] === letter) {
                    this.blanksAndSuccesses[j] = letter;
                }
            }
        } else {
            this.wrongGuesses.push(letter);
            this.numGuesses--;
        }

        chosenCountryName.innerHTML = this.blanksAndSuccesses.join(' ');
        wrongLetters.innerHTML = this.wrongGuesses;
        chance.innerHTML = this.numGuesses
    },

    roundComplete: function(){
        if(this.lettersOfTheWord.toString() === this.blanksAndSuccesses.toString()) {
            this.winCounter++;
            alert(`You win! This flag belongs to ${this.chosenWord.toUpperCase()}`);
            wins.innerHTML = this.winCounter;

            this.startGame();

        } else if(this.numGuesses === 0) {
            this.loseCounter++;
            alert(`You lose! This flag belongs to ${this.chosenWord.toUpperCase()}`);
            loses.innerHTML = this.loseCounter;

            this.startGame();

        }
    },
   
}

hangmanGame.startGame();



window.addEventListener("keydown", (e) => {
    let letterGuessed = e.key.toLowerCase();

    hangmanGame.checkLetters(letterGuessed);
    hangmanGame.roundComplete();


})
