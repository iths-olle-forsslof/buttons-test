class RandomLetters {
    constructor() {
        this.currentString = 0
        this.currentLength = 0
        this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        this.symbols = '@!#$%&?½§£'
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
            randomString += this.symbols.charAt(Math.floor(Math.random() * this.symbols.length))
        }
        return randomString
    }

    //
    initAnimation() {
        if (this.currentLength < this.strings[this.currentString].length) {
            this.currentLength = this.strings[this.currentString].length
         
            let newString = this.generateRandomString(this.currentLength);
            
            this.place.innerHTML = newString;

            setTimeout(()=>{
                this.animateNewWord()
            }, 50)
        }
    }

    // saves each letter in the next string together with a counter value. 
    // Depending on the counter val. that's how many random letters are shown
    // before the right letter appear.
    animateNewWord() {
        if(this.fadeBuffer == false) {
            this.fadeBuffer = []
            for (let i = 0; i < this.strings[this.currentString].length; i++) {
                this.fadeBuffer.push({count: /*Math.floor(Math.random()*10)+1*/ i, letter: this.strings[this.currentString].charAt(i)})
            }
        }
        
        let cycles = false;
        let newString = '';

        for (let i = 0; i < this.fadeBuffer.length; i++) {
            let fader = this.fadeBuffer[i]
            if (fader.count > 0) {
                cycles = true
                fader.count--
                newString += this.symbols.charAt(Math.floor(Math.random()*this.symbols.length))
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

    checkCurrentString(typeOfEvent) {
        
        if (typeOfEvent == 'mouseout') {
            if (this.currentString == this.strings.length - 1) {
                this.currentString = 0 
            } else {
                this.currentString = 0
            }
        } 
        if (typeOfEvent == 'mouseup') {
            if (this.currentString == 1) {
                this.currentString++
            }
            console.log('curr string: ', this.currentString);
        }

        if (typeOfEvent == 'mouseover') {
            if (this.currentString == 0) {
                this.currentString++ 
            } else {
                this.currentString = 0
            }
        }


        this.currentLength = 0
        this.fadeBuffer = false
        this.showWord(this.strings[this.currentString])
    }

    init(event) {
        setTimeout(()=>{
            this.checkCurrentString(event)
            this.initAnimation()
        },50)
        
    }
}

let randomText = document.querySelector('.random-text')
let test = new RandomLetters()
test.showWord()

test.place.addEventListener('mouseover', (event) => {
    console.log(event.type);
    test.init(event.type)
})
test.place.addEventListener('mouseup', (event) => {
    console.log(event.type);
    test.init(event.type)
})
test.place.addEventListener('mouseout', (event) => {
    console.log(event.type);
    test.init(event.type)
})
// randomText.addEventListener('mousemove', (event) => {
//     console.log(event);
    
//     if (test.strings[test.currentString] == 0) {
//         test.place.addEventListener('mouseover', test.init())
//     } else if (test.strings[test.currentString] == 1) {
//         test.place.addEventListener('click', test.init())
//     }
// })