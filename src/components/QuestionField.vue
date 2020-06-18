<template>
  <div id="field">
    <div id="contain-subject">
      <button
        class="btnSelection"
        v-for="(item, index) in title"
        :key="index"
        @click="HandleChangedSub(index)"
      >
        {{ item }}
      </button>
    </div>
    <div id="contain-no">
      <button
        v-for="index in subject[SelectedSub].number"
        :key="index"
        @click="HandleChangedNo(index - 1)"
      >
        {{ index }}
      </button>
    </div>
    <form id="question">
      <p>
        {{ SelectedNo + 1 }}.
        <!-- {{
          subject[SelectedSub].question[SelectedNo].detail

        }} -->
      </p>
      <div v-for="index in 4" :key="index">
        <input
          type="radio"
          name="choice"
          :value="index"
          v-model="SelectedChoice"
        />
        <!-- {{ subject[SelectedSub].choice[SelectedNo][index - 1] }} -->
        <br /><br />
      </div>
    </form>
    <br />
    <div id="container-selection">
      <button class="btnPrev" v-if="SelectedNo != 0" @click="SelectedNo--">
        <!-- eslint-disable-next-line vue/no-parsing-error -->
        < ข้อก่อนหน้า
      </button>
      <button class="btnChecker" @click="HandleChecker">ตรวจคำตอบ</button>
      <button
        class="btnNext"
        v-if="SelectedNo != subject[SelectedSub].number - 1"
        @click="SelectedNo++"
      >
        ข้อถัดไป >
      </button>
    </div>
  </div>
</template>

<script>
import json from '../data/question.json'
import { ExamChecker } from '../checker.js'

export default {
  data() {
    return {
      subject: json.subject,
      answer: null,
      title: null,
      ResultExam: null,
      SelectedSub: 0,
      SelectedNo: 0,
      SelectedChoice: 0,
      CurrentSelect: null
    }
  },
  methods: {
    HandleChecker() {
      const Selected = []
      const len = this.subject.length
      for (let i = 0; i < len; i++) {
        Selected.push(this.subject[i].solution)
      }
      this.ResultExam = ExamChecker(this.CurrentSelect, Selected)
    },
    HandleChangedSub(val) {
      this.SelectedSub = val
      this.SelectedNo = this.CurrentSelect[val]
    },
    HandleChangedNo(val) {
      this.SelectedNo = val
      this.SelectedChoice = this.answer[this.SelectedSub][this.SelectedNo]
      this.CurrentSelect[this.SelectedSub] = this.SelectedNo
    }
  },
  watch: {
    SelectedChoice(newval) {
      this.answer[this.SelectedSub][this.SelectedNo] = newval
    }
  },
  created() {
    const numsub = this.subject.length
    this.answer = new Array(numsub)
    this.title = new Array(numsub)
    this.CurrentSelect = new Array(numsub)
    for (let i = 0; i < numsub; i++) {
      this.CurrentSelect[i] = 0
      this.answer[i] = new Array(this.subject[i].number)
      this.title[i] = this.subject[i].name
    }
  }
}
</script>

<style scoped>
#container-selection {
  display: flex;
  justify-content: space-between;
  margin-left: 10px;
  margin-right: 10px;
}

.btnSelection {
  font-size: 16px;
}
</style>
