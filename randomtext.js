class RandomLetters {
    constructor() {
        this.currentString = 0
        this.currentLength = 0
        this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        // this.alphabet = '½!"#¤#&/()=?'
        this.fadeBuffer = false
        this.strings = ['HOVER ME', 'CLICK ME', 'THANK YOU!']
        this.place = document.querySelector('.test')
    }

    showWord(word = this.strings[this.currentString]) {
        this.place.innerHTML = word
    }

    //makes a random string same length as currentString
    generateRandomString(length) {
        let randomString = ''
        while (randomString.length < length) {
            randomString += this.alphabet.charAt(Math.floor(Math.random() * this.alphabet.length))
        }
        return randomString
    }

    animateRandomWord() {
        if (this.currentLength < this.strings[this.currentString].length) {
            this.currentLength = this.strings[this.currentString].length
         
            let newString = this.generateRandomString(this.currentLength);
            
            this.place.innerHTML = newString;

            setTimeout(()=>{
                this.animateNewWord()
            }, 50)
        }
    }

    animateNewWord() {
        if(this.fadeBuffer == false) {
            this.fadeBuffer = []
            for (let i = 0; i < this.strings[this.currentString].length; i++) {
                this.fadeBuffer.push({count: Math.floor(Math.random()*10)+1, letter: this.strings[this.currentString].charAt(i)})
            }
        }
        console.log(this.fadeBuffer);
        
        let cycles = false;
        let newString = '';

        for (let i = 0; i < this.fadeBuffer.length; i++) {
            let fader = this.fadeBuffer[i]
            if (fader.count > 0) {
                cycles = true
                fader.count--
                newString += this.alphabet.charAt(Math.floor(Math.random()*this.alphabet.length))
            } else {
                newString += fader.letter
            }
        }

        this.place.innerHTML = newString

        if (cycles == true) {
            setTimeout(() => {
                this.animateNewWord()
            }, 50)
        }
    }

    checkCurrentString() {
        if (this.currentString = this.strings.length) {
            this.currentString = 0 
        } else {
            this.currentString++
        }
        this.currentLength = 0
        this.fadeBuffer = false
        // this.place.innerHTML = ''
        this.showWord(this.strings[this.currentString])
    }

    init() {
        setTimeout(()=>{
            this.checkCurrentString()
            this.animateRandomWord()
        },50)
        
    }
}

let test = new RandomLetters()
test.showWord()

test.place.addEventListener('mouseover', () => {
    test.init();
})