<template>
  <div class="board-container" @mouseup="stopGuess" @touchend="stopGuess" @touchmove.prevent="handleTouchMove($event)">
    
    <div id="board" class="board">
      <div v-for="(tile, index) in tiles" :key="index" @mousedown="startGuess(index)" @touchstart.passive="startGuess(index)" >
        <div :id="'tile' + index" class="tile">
          <div class="tile-letter" >{{ tile }} </div>
          <div class="hitbox" :id="'hitbox'+index" @mouseover="chooseTile(index)"></div>
          <div v-show="showTilesStarting" class="tiles-starting"> {{ tilesStarting[index] }}</div>
          <div v-show="showTilesUsed" class="tiles-used"> {{ tilesUsed[index] }}</div>
          <div :id="'tts' + index" class="trace south"></div>
          <div :id="'ttn' + index" class="trace north"></div>
          <div :id="'ttw' + index" class="trace west"></div>
          <div :id="'tte' + index" class="trace east"></div>
          <div :id="'ttsw' + index" class="trace southwest"></div>
          <div :id="'ttnw' + index" class="trace northwest"></div>
          <div :id="'ttse' + index" class="trace southeast"></div>
          <div :id="'ttne' + index" class="trace northeast"></div>
        </div> 
      </div>
    </div>
    <i class="fa fa-refresh" @click="spinBoard"></i>
  </div>
  <h1> {{ getGuess }}</h1>

</template>

<script>
import { useIntervalFn } from '@vueuse/core'

export default {
  props: ['rows', 'columns', 'tiles', 'tilesStarting', 'tilesUsed', 'dica', 'showTilesStarting', 'showTilesUsed'],
  emits: ['findResult', 'cleanDica'],

  data() {
    return {
      chosenTiles: [],
      allMoves: [-5,-4,-3,-1,1,3,4,5],
      traceLeaving: ['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se'],
      traceArriving: ['se', 's', 'sw', 'e', 'w', 'ne', 'n', 'nw'],
      spinDict: {'s':'w', 'w':'n', 'n':'e', 'e':'s', 'sw':'nw', 'nw':'ne', 'ne':'se', 'se':'sw'},
      isClicked: false,
      isGuessing: false,
      tempDica: "",
      boardSpin: 0
    }
  },
  watch: {
    dica() {
      this.tempDica = this.dica
      const { pause, resume, isActive } = useIntervalFn(() => {
        if (this.tempDica.length === 0) {
          pause()
          this.stopGuess()
          this.$emit('cleanDica') 
        } else {
          const tileId = parseInt(this.tempDica.substring(0, 2))
          if (this.tempDica.length === this.dica.length) {
            this.startGuess(tileId)
          } else {
            this.chooseTile(tileId)
          }
        }
        this.tempDica = this.tempDica.substring(2,this.tempDica.length)
      }, 500)
    }
  },
  computed: {
    getGuess() {
      let guess = ''
      for (let i = 0; i < this.chosenTiles.length; i++) {
        guess += this.tiles[this.chosenTiles[i]]
      }
      return guess
    } 
  },
  
  methods: {
    chooseTile(tileId) {
      if (this.isGuessing) {
        if (!this.chosenTiles.includes(tileId)) {
          if (this.isMoveLegal(tileId)) {
            this.chosenTiles.push(tileId)
            this.updateTileClasses()
          }
        } else {
          const tempIndex = this.chosenTiles.indexOf(tileId)
          this.chosenTiles = this.chosenTiles.slice(0,tempIndex+1)
          this.updateTileClasses()
        }
      }
    },
    handleTouchMove(event) {
      event.preventDefault()
      const touch = event.touches[0]
      const element = document.elementFromPoint(touch.clientX, touch.clientY)
      
      if (element && element.classList.contains('hitbox')) {
        const tileId = element.parentElement.id
        const index = parseInt(tileId.replace('tile', ''))
        this.chooseTile(index)
      }
    },
    updateTileClasses() {
      this.clearTileClasses()
      document.getElementById('tile' + this.chosenTiles[0]).classList.add('clicked')
      document.getElementById('tile' + this.chosenTiles[0]).classList.add('chosen')
      let tileLeaving, tileArriving, dirLeaving, dirArriving, move
      for (let i = 1; i < this.chosenTiles.length; i++) {
        document.getElementById('tile' + this.chosenTiles[i]).classList.add('chosen')
        tileLeaving = this.chosenTiles[i-1]
        tileArriving = this.chosenTiles[i]
        move = tileArriving - tileLeaving
        dirLeaving = this.traceLeaving[this.allMoves.indexOf(move)]
        dirArriving = this.traceArriving[this.allMoves.indexOf(move)]
        document.getElementById('tt' + dirLeaving + tileLeaving).classList.add('visible')
        document.getElementById('tt' + dirArriving + tileArriving).classList.add('visible')
      }
    },
    clearTileClasses() {
      for(let i = 0; i < this.tiles.length; i++) {
          document.getElementById('tile' + i).classList.remove('chosen')
          document.getElementById('tile' + i).classList.remove('clicked')
          document.getElementById('tts' + i).classList.remove('visible')
          document.getElementById('ttse' + i).classList.remove('visible')
          document.getElementById('ttsw' + i).classList.remove('visible')
          document.getElementById('ttn' + i).classList.remove('visible')
          document.getElementById('ttnw' + i).classList.remove('visible')
          document.getElementById('ttne' + i).classList.remove('visible')
          document.getElementById('tte' + i).classList.remove('visible')
          document.getElementById('ttw' + i).classList.remove('visible')
        }
    },
    isMoveLegal(index) {
      if (this.chosenTiles.length == 0) {
        return true
      }
      const tempId = this.chosenTiles[this.chosenTiles.length-1]
      const tempMove = index - tempId
      if (!this.allMoves.includes(tempMove)) {
        return false
      }
      if (tempId % 4 == 0 && (tempMove === -5 || tempMove === -1 || tempMove === 3 )) {
        return false
      }
      if (tempId % 4 == 3 && (tempMove === 5 || tempMove === 1 || tempMove === -3 )) {
        return false
      }
      return true     
    },
    startGuess(tileId) {
      this.isGuessing = true
      document.getElementById('tile' + tileId).classList.add('clicked')
      this.chooseTile(tileId)
    },
    stopGuess() {
      this.isGuessing = false
      
      if (this.chosenTiles.length > 1) { 
        this.$emit('findResult', this.getGuess) 
        this.isTileOutOfGame()
      }
      this.clearTileClasses()
      this.chosenTiles = []
      
    },
    isTileOutOfGame() {
      for (let i = 0; i < this.tilesUsed.length; i ++) {
        if (this.tilesUsed[i] == 0) {
          document.getElementById('tile' + i).classList.add('out-of-game')
        }
      }
    },
    spinBoard() {
      const board = document.getElementById('board')
      const children = document.getElementById('board').children
      this.boardSpin += 90
      board.style.transition = '0.7s ease-in-out'
      board.style.transform = 'rotate(' + this.boardSpin + 'deg)'
      
      for (let i = 0; i < children.length; i++) {
          children[i].style.transition = '0.7s ease-in-out'
          children[i].style.transform = 'rotate(' + (-this.boardSpin) + 'deg)'
      }
      this.traceArriving = this.spinTrace90(this.traceArriving)
      this.traceLeaving = this.spinTrace90(this.traceLeaving)
    },
    spinTrace90(arr) {
      let temp = []
      for (let i = 0; i < arr.length; i++) {
        const dir = arr[i]
        const newDir = this.spinDict[dir]
        temp.push(newDir)
      }
      return temp 
    }
  }
}
</script>

<style>

.game {
  min-width: 300px;
  min-height: 300px;
}
.board-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  touch-action: none;
}

.board {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-content: space-evenly;
  max-width: 300px;
  max-height: 300px;
  min-width:300px;
  min-height: 300px;
  grid-gap: 5px;
  padding: 10px;
}
.tile {
  background-color: crimson;
  color:white;
  border-radius: 15%;
  border: solid crimson;
  height: 92%;
  width: 92%;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  position: relative;
  rotate: 0deg;
  transition: background-color 0.3s;
}
.tile-letter {
  font-size: 40px;
  font-family:Verdana, Geneva, Tahoma, sans-serif;
  font-weight: bold;
  user-select: none;
  vertical-align: middle;
  justify-content: center;
  align-content: center;
  text-align: center;
  line-height: 65.55%;
}
.hitbox {
  background: rgba(255, 255, 255, 0);
  position: absolute;
  height: 80%;
  width: 80%;
  top: 10%;
  left: 10%;
  border-radius: 50%;
  user-select: none;
}
.tiles-starting {
  position: absolute;
  font-size: .7em;
  top: 80%;
  left: 3%;
  width: 100%;
  user-select: none;
  text-align: left;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.tiles-used {
  position: absolute;
  font-size: .7em;
  top: 80%;
  left: 2%;
  width: 95%;
  user-select: none;
  text-align: right;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  color: #222;
}
.out-of-game {
  background: #333;
  border-color: #111;
}
.chosen {
  background-color: rgb(122, 12, 34); 
}
.clicked {
  border: solid white;
}

.guess {
  font-family: Arial, Helvetica, sans-serif;
}

.trace {
  background: rgba(255, 255, 255, 0.294);
  position: absolute;
  border-radius: 20%;
  user-select: none;
}
.south {
  top: 60%;
  left: 40%;
  height: 40%;
  width: 20%;
  visibility: hidden;
}
.east {
  top: 40%;
  left: 60%;
  height: 20%;
  width: 40%;
  visibility: hidden;
}
.west {
  top: 40%;
  left: 00%;
  height: 20%;
  width: 40%;
  visibility: hidden;
}
.north {
  top: 0%;
  left: 40%;
  height: 40%;
  width: 20%;
  visibility: hidden;
}
.southwest {
  top: 70%;
  left: 00%;
  height: 20%;
  width: 40%;
  transform: rotate(315deg);
  visibility: hidden;
}
.northwest {
  top: 10%;
  left: 00%;
  height: 20%;
  width: 40%;
  transform: rotate(45deg);
  visibility: hidden;
}
.southeast {
  top: 70%;
  left: 60%;
  height: 20%;
  width: 40%;
  transform: rotate(45deg);
  visibility: hidden;
}
.northeast {
  top: 10%;
  left: 60%;
  height: 20%;
  width: 40%;
  transform: rotate(315deg);
  visibility: hidden;
}
.visible {
  visibility: visible;
}
.fa.fa-refresh {
    font-size: 28px;
}

</style>