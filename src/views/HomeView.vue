<template>
      
    <div class="main-menu"> 
      
      <!--<i class="fa fa-trash" @click="clearData"></i>-->
      <h2 class="score-title"><i class="fa fa-book" @click="toggleResultList" v-if="isSmallScreen"></i>
        <b> Placar: {{ playerData.correctGuesses.length }} / {{ boardData.totalWords }}</b> <i>(+{{ playerData.correctBonusGuesses.length }})</i></h2>
      <h3 class="result" id="result"><b> {{ result }}</b></h3>
    </div>
    
    <div class="grade">
      <div v-show="showResultList" class="result-list">
        <p class="word-list-header">Ajuda:</p> 
          <div class="hint-container">
            <span class="checkbox-title"><input class="checkbox" type="checkbox" v-model="showHints" :checked="showHints"> 
              Revelar algumas letras</span>
            <span class="checkbox-title"><input class="checkbox" type="checkbox" v-model="showTilesStarting" :checked="showTilesStarting">
              Revelar letras iniciais</span>
            <span class="checkbox-title"><input class="checkbox" type="checkbox" v-model="showTilesUsed" :checked="showTilesUsed">
              Revelar letras usadas</span>
            <span class="checkbox-title"><i class="fa fa-gift" @click="getDica"></i> 
              Revelar uma palavra aleatória</span>     
          </div>
        <p class="word-list-header">Palavras Encontradas:</p>
        <div class="word-list"> 
          <div v-for="(count, index) in boardData.wordCount" :key="index">
            <div v-if="boardData.wordCount[index] > 0">
              <p class="words-header">{{ index }} letras <i> (restam {{ playerData.wordsLeft[index] }}) </i></p>
              <ul :class='"word-list-by-length length-" + index'>
                <div v-for="word in orderedGuesses[index]" :key="word.index">
                  <li @click="openDictLink(word)" class="words" >{{ word }}</li>  
                </div>
              </ul>
            </div>
          </div>
          <br>
          <p class="word-list-header">Palavras Bônus ({{ playerData.correctBonusGuesses.length }} / {{ bonusGuessesLength }})</p>
          <div class="bonus-container">
            <div v-for="bonusWord in orderedBonusGuesses" :key="bonusWord">
              <li @click="openDictLink(bonusWord)" @touchend="openDictLink(bonusWord)" class="words" >{{ bonusWord }}</li>
            </div>
        </div>
        </div>
      </div>
      <div v-show="showBoard" class="game">
        <Board :rows='boardData.rows' :columns='boardData.columns' :tiles="boardData.tiles" 
        :tilesStarting="playerData.tilesStarting" :tilesUsed="playerData.tilesUsed" :dica="dica" 
        :showTilesStarting="showTilesStarting" :showTilesUsed="showTilesUsed" 
        @cleanDica="cleanDica" @findResult="getResult"/>
      </div>
    </div>
    <Modal v-show="showAlert" :alert="alert" :totalNormalWords="playerData.correctGuesses.length" 
    :totalBonusWords="playerData.correctBonusGuesses.length"  :totalGameTime="totalGameTime" @close="toggleAlert"></Modal>
</template>

<script>
import Board from '../components/Board.vue'
import Modal from '../components/Modal.vue'
import api from '../services/api';

export default {
  name: 'HomeView',
  components: { Board , Modal },
  
  data() {
    return {
      
      wordMinLength: 4,
      wordMaxLength: 16,

      //this is a temporary solution to choose a board for the game
      //TODO - make a daily selector
      //boardId: "daily20240519",

      //this stores the immutable information from DB
      boardData: {
        language: "",
        rows: 0,
        columns: 0,
        totalWords: 0,
        tiles: [],
        wordCount: [],
        normalGuesses: {},
        tilesStarting: [],
        tilesUsed: [],
        bonusGuesses: {}
      },
      playerData: {
        startTime: 0,
        endTime: 0,
        correctGuesses: [],
        correctBonusGuesses: [],
        wordsLeft: [],
        tilesStarting: [],
        tilesUsed: [],
      },
    
      
      timeOut: null,
      showAlert: false,
      showBoard: true,
      showResultList: true,
      isSmallScreen: false,
      showHints: false,
      showTilesStarting: false,
      showTilesUsed: false,

      result: "Boa Sorte!",
      alert: "Parabéns!!! Você conseguiu!",
      dica: ""
    }
  },
  computed: {
    boardId() {
      const prefix = "daily"
      const date = new Date()
      return prefix + date.getFullYear() + this.addPadding(date.getMonth()+1) + this.addPadding(date.getDate())
    },
    totalGameTime() {
      if (this.playerData.startTime === 0 && this.playerData.endTime === 0) {
        return 0
      }
      else if (this.playerData.endTime === 0) {
        this.playerData.endTime = this.getCurrentTime()
      }
      return Math.round((this.playerData.endTime - this.playerData.startTime) / 60000)
    },  
    orderedGuesses() {
      const grupo = []
      Object.keys(this.boardData.normalGuesses).forEach((word) => {
        if (this.showHints || this.playerData.correctGuesses.includes(word)) {
          const length = word.length
          if (!grupo[length]) {
            grupo[length] = []
          }
          if (this.playerData.correctGuesses.includes(word)) {
            grupo[length].push(word)
          } else {
            if (this.showHints) {
              grupo[length].push(this.getHintMask(word))
            } 
          }
        }
      })  
      return grupo
    },
    orderedBonusGuesses() {
      return this.playerData.correctBonusGuesses.sort()
    },
    remainingGuesses() {
      let guesses = []
      for (let i = 0; i < Object.keys(this.boardData.normalGuesses).length; i++) {
        const word = Object.keys(this.boardData.normalGuesses)[i]
        if (!this.playerData.correctGuesses.includes(word)) { 
          guesses.push(word)
        }   
      }
      return guesses
    },
    bonusGuessesLength() {
      return Object.keys(this.boardData.bonusGuesses).length
    }
  },
  mounted() {
    
    this.checkScreenSize()
    window.addEventListener('resize', this.checkScreenSize);
    this.getData(this.boardId)
    
  },
  unmounted() {
    clearInterval(this.timeOut)
    window.removeEventListener('resize', this.checkScreenSize);
  },
  methods: { 
    clearData() {
      localStorage.clear()
      location.reload()
    },
    checkScreenSize() {
      if (window.innerWidth <= 600 && this.isSmallScreen == false) {
        this.isSmallScreen = true
        this.showResultList = false
        this.showBoard = true
      } else if (window.innerWidth > 600 && this.isSmallScreen == true) {
        this.isSmallScreen = false
        this.showResultList = true
        this.showBoard = true
      }
    },

    getData(boardId) {
      if (localStorage.getItem(boardId) != null) {
        const totalDailyData = JSON.parse(localStorage.getItem(boardId))
        this.boardData = totalDailyData.boardData
        this.playerData = totalDailyData.playerData
        console.log("got data from localStorage")
      } else {
        this.fetchBoard(boardId)
      }
    },
    async fetchBoard(boardId) {
      try {
        const response = await api.getBoard(boardId);
        const boardJson = response.data;
        this.boardData = JSON.parse(boardJson.Data)
        this.playerData.tilesStarting = this.boardData.tilesStarting.slice()
        this.playerData.tilesUsed = this.boardData.tilesUsed.slice()
        this.playerData.wordsLeft = this.boardData.wordCount.slice()
        console.log("got data from API")
        this.saveToLocalStorage() 
      } catch (err) {
        console.error(err);
      }
      return
    },
    saveToLocalStorage() {
      const dailyData = { "boardData" : this.boardData, "playerData" : this.playerData}
      localStorage.setItem( this.boardId, JSON.stringify(dailyData))
    },
    toggleAlert() {
      this.showAlert = !this.showAlert
    },
    toggleResultList() {
      this.showResultList = !this.showResultList
      this.showBoard = !this.showBoard
      if (this.showResultList) {
        this.result = 'Palavras encontradas até o momento'
      } else {
        this.result = ''
      }
    },
    cleanDica() {
      this.dica = ""
    },
    openDictLink(word) {
      if (word.indexOf('*') == -1) {
        window.open('https://pt.wiktionary.org/wiki/' + word.toLowerCase())
      }
    },
    getDica() {
      let guesses = this.remainingGuesses
      if (this.dica === "" && guesses.length > 0) {
        if (!this.showBoard) {
          this.toggleResultList()
        }
        const num = Math.floor(Math.random() * guesses.length)
        const word = guesses[num]
        this.dica = this.boardData.normalGuesses[word]
      }
    },
    getHintMask(word) {
      let maskedWord = ''
      for (let i = 0; i < word.length; i++) {
        if (i == 0 || 
          (i == 1 && word.length > 6) || 
          (i == word.length - 1 && word.length > 5) ||
          (i == word.length - 2 && word.length > 7)) {
          maskedWord += word[i]
        } else {
          maskedWord += '*'
        }
      }
      return maskedWord
    },
    getCurrentTime() {
      const date = new Date()
      return date.getTime()
    },

    fixResultDisplay() {
      if (this.timeOut) {
        clearTimeout(this.timeOut)
      }
      if (document.getElementById("result").style) {
        document.getElementById("result").style.opacity = '1'
      }
    },
    getResult (guess) {
      this.fixResultDisplay()
      if (guess.length < this.wordMinLength) {
          this.result = 'A palavra tem que ter ao menos ' + this.wordMinLength + ' letras'
        } else {
          if (this.playerData.correctGuesses.includes(guess) || this.playerData.correctBonusGuesses.includes(guess)) {
            this.result = 'A palavra ' + guess + ' já foi encontrada'
          } else if (this.remainingGuesses.includes(guess)) {
            
            this.result = guess + '!'
            this.updateData(guess, true)
            this.checkEndGame()
          } else if (Object.keys(this.boardData.bonusGuesses).includes(guess)) {
            this.result = guess + ' é uma palavra bônus!'
            this.updateData(guess, false)
          } else {
            this.result = guess + ' não é uma palavra válida'
          }
        }
      this.timeOut = setInterval(() => document.getElementById("result").style.opacity = '0', 3000)

    },
    addPadding(value) {
      if (value < 10) return '0' + value
      return '' + value
    },
    updateData(guess, isNormalGuess) {
      //remove the guess from the possible list and add to the correct list
      if (isNormalGuess) {
        //this.remainingGuesses.splice(this.remainingGuesses.indexOf(guess), 1)
        this.playerData.correctGuesses.push(guess)
        if (this.playerData.correctGuesses.length === 1) {
          this.playerData.startTime = this.getCurrentTime()
        } else {
          this.playerData.endTime = this.getCurrentTime()
        }
        this.playerData.wordsLeft[guess.length] -= 1
        //update the tile counts
        const combo = this.boardData.normalGuesses[guess]      
        this.playerData.tilesStarting[parseInt(combo.substring(0,2))] -= 1
        for (let i = 0; i < combo.length; i += 2) {
          this.playerData.tilesUsed[parseInt(combo.substring(i, i+2))] -= 1
        }
      } else {
        this.playerData.correctBonusGuesses.push(guess)
      }
      this.saveToLocalStorage()
    },
    checkEndGame() {
      if(this.playerData.correctGuesses.length == this.boardData.totalWords) {
        this.playerData.endTime = this.getCurrentTime()
        this.showAlert = true
      }
    }
  }
}
</script>

<style>

  .result {
    height: 20px;
    transition: 1s;
  }
  .grade {
    display: flex;
    height: 100%;
    width: 100;
    flex-direction: row;
    justify-content: center;
    gap: 5px;
  }
  .game {
    height: 100%;
  } 
  .result-list {
    display: flex;
    max-height: 100%;
    justify-content: left;
    flex-direction: column;
    flex-flow: center;
  }
  .word-list {
    overflow-y: auto;
    max-height: 100%;
    scrollbar-color: #222 #444;
    width: 300px;
    padding: 0px;
    display: flex;
    justify-content: left;
    flex-direction: column;
    flex-flow: center;
    margin-bottom: 20px;
  }
  .bonus-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: left;
  }
  .hint-container {
    text-align: left;
    display: flex;
    flex-flow: column;
  }
  .checkbox-title {
    font-size: 0.9em;
  }
  input[type='checkbox'] {
    accent-color:rgb(237, 32, 73);
  }
  .score-title {
    padding: 0px;
    margin-top: 20px;
    font-size: 1.8em;
  }
  .score-title i{
    font-size: 0.9em;
  }
  .words-header {
    text-align: left;
    height: fit-content;
    padding: 0px;
    margin: 5px 0px 5px 0px;
    font-size: 1.15em;
    color: rgb(237, 32, 73);
  }
  .words-header i{
    font-size: 0.7em;
  }
  .word-list-header {
    color: white;
    padding: 0px;
    margin: 5px;    
    margin-left: 0px;
    text-align: left;
    font-size: 1.1em;
    font-weight: bold;    
  }
  .word-list-by-length {
    padding: 0;
    margin: 0px;
    line-height: 15px;
    font-size: 1.1em;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: left;
    text-align: left;
  }
  .words {
    list-style-type: none;
    font-size: .8em ;
    cursor: pointer;
  }
  
  .fa.fa-book {
    font-size: 26px;
  }
  .fa.fa-gift {
    font-size: 20px;
  }
</style>