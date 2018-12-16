<template>
  <div id="grid">
    <table class="game-table">
      <tr>
        <td :class="cellClass(0, 0)" @click="onClickCell(0, 0)"></td>
        <td :class="cellClass(0, 1)" @click="onClickCell(0, 1)"></td>
        <td :class="cellClass(0, 2)" @click="onClickCell(0, 2)"></td>
      </tr>
      <tr>
        <td :class="cellClass(1, 0)" @click="onClickCell(1, 0)"></td>
        <td :class="cellClass(1, 1)" @click="onClickCell(1, 1)"></td>
        <td :class="cellClass(1, 2)" @click="onClickCell(1, 2)"></td>
      </tr>
      <tr>
        <td :class="cellClass(2, 0)" @click="onClickCell(2, 0)"></td>
        <td :class="cellClass(2, 1)" @click="onClickCell(2, 1)"></td>
        <td :class="cellClass(2, 2)" @click="onClickCell(2, 2)"></td>
      </tr>
    </table>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {EventBus} from '../types/EventBus'

  export default {
    name: "grid",
    data() {
      return {
        grid: [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0]
        ],
        interval: null,
        players: {
          human: {
            name: 'Human'
          },
          ai: {
            name: 'Artificial intelligence'
          }
        },
        turn: 'human'
      }
    },
    computed: {},
    methods: {
      cellClass(i, j) {
        return this.grid[i][j] === 0 ? '' : (this.grid[i][j] === 1 ? 'x-fill' : 'o-fill')
      },
      onClickCell(i, j) {
        if (this.turn !== 'human') return null;
        this.makeMove(i, j)
      },
      makeMove(i, j) {
        if (this.grid[i][j] !== 0) return
        Vue.set(this.grid[i], j, 1)
        if (this.allFilled()) {
          this.$router.push({path: 'draw'})
        }
        this.turn = 'ai'
        this.aiMove()
      },
      allFilled() {
        return [].concat(...this.grid).every(cell => cell !== 0)
      },
      startGame() {
        this.grid = [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0]
        ]
      },
      aiMove() {
        let estimation = this.estimate()
        this.grid[estimation.i][estimation.j] = 2
        setTimeout(() => this.estimate(), 500)
        this.turn = 'human'
      },
      estimate() {
        let scores = [
          // rows (up-to-down)
          this.estimateLine(
            [{i: 0, j: 0}, {i: 0, j: 1}, {i: 0, j: 2}]
          ),
          this.estimateLine(
            [{i: 1, j: 0}, {i: 1, j: 1}, {i: 1, j: 2}]
          ),
          this.estimateLine(
            [{i: 2, j: 0}, {i: 2, j: 1}, {i: 2, j: 2}]
          ),
          // column (left-to-right)
          this.estimateLine(
            [{i: 0, j: 0}, {i: 1, j: 0}, {i: 2, j: 0}]
          ),
          this.estimateLine(
            [{i: 0, j: 1}, {i: 1, j: 1}, {i: 2, j: 1}]
          ),
          this.estimateLine(
            [{i: 0, j: 2}, {i: 1, j: 2}, {i: 2, j: 2}]
          ),
          // diagonals
          this.estimateLine(
            [{i: 0, j: 0}, {i: 1, j: 1}, {i: 2, j: 2}]
          ),
          this.estimateLine(
            [{i: 0, j: 2}, {i: 1, j: 1}, {i: 2, j: 0}]
          ),
        ]

        console.log('scores: ', scores)

        let sortedScores = scores.sort((a, b) => {
          if (a.score > b.score) {
            return 1;
          }
          if (a.score < b.score) {
            return -1;
          }
          return 0;
        })

        return sortedScores[sortedScores.length - 1]
      },
      // [
      // { i: 0, j: 0, value: 2 }
      // { i: 0, j: 1, value: 0 }
      // { i: 0, j: 2, value: 2 }
      // ]
      estimateLine(lineArray) {
        let score = null
        let values = lineArray.map(cell => this.grid[cell.i][cell.j])
        console.log('values', values)
        let count0 = values.filter(value => value === 0).length
        let count1 = values.filter(value => value === 1).length
        let count2 = values.filter(value => value === 2).length

        if (count1 === 3) {
          console.log('go away')
          this.$router.push({path: 'human-win'})
          return
        }

        if (count2 === 3) {
          console.log('go away')
          this.$router.push({path: 'ai-win'})
          return
        }

        let target = lineArray.find(cell => this.grid[cell.i][cell.j] === 0)

        if (!target) {
          return {i: null, j: null, score: 0}
        }

        if (count1 === 1 && count2 === 1) {
          score = 0
        }

        if (count0 === 3) {
          score = 20
        }

        if (count0 === 2) {
          score = 40
        }

        if (count1 === 2) {
          score = 80
        }

        if (count2 === 2 && count0 === 1) {
          score = 100
        }

        const result = {i: target.i, j: target.j, score: score}

        return result
      }
    },
    mounted() {
      EventBus.$on('restart-game', () => {
        this.startGame()
      })

      this.startGame()
      // this.interval = setInterval(() => {
      //   console.log('---grid start---')
      //   console.log(this.grid[0])
      //   console.log(this.grid[1])
      //   console.log(this.grid[2])
      //   console.log('---grid end---')
      // }, 4000)
    },
    beforeDestroy() {
      if (this.interval) {
        clearInterval(this.interval)
      }
    }
  }
</script>

<style lang="scss" scoped>

  $borderStyle: 1px solid #42b983;

  #grid {
    flex: 1;
    box-sizing: border-box;
    padding: 16px;

    .game-table {
      width: 100%;
      height: 100%;
      border-collapse: collapse;
    }
  }

  .game-table tr td {
    cursor: pointer;
    width: 33%;
  }

  .x-fill {
    background: #afa;
  }

  .o-fill {
    background: #faa;
  }

  .game-table tr:first-child {
    border-bottom: $borderStyle;
  }

  .game-table tr:last-child {
    border-top: $borderStyle;
  }

  .game-table tr td:first-child {
    border-right: $borderStyle;
  }

  .game-table tr td:last-child {
    border-left: $borderStyle;
  }
</style>