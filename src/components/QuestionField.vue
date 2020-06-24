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
    <div class="question">
      <form>
        <p
          v-html="
            HandleRender(
              `${SelectedNo + 1}\\. ${
                subject[SelectedSub].question[SelectedNo].detail
              }`
            )
          "
        ></p>
        <div
          v-for="(val, index) in subject[SelectedSub].choice[SelectedNo]
            .choices"
          :key="index"
        >
          <input
            v-if="!isDone.isDone"
            type="radio"
            name="choice"
            :value="index"
            @click="HandleChangedAnswer(index)"
            v-model="SelectedChoice"
          />
          <div
            class="textinput"
            v-html="
              HandleRender(
                `${index + 1}\\) ${
                  subject[SelectedSub].choice[SelectedNo].choices[index]
                }`
              )
            "
          ></div>
        </div>
        <div v-if="isDone.isDone" id="solution">
          <p id="ans">
            {{
              answer[SelectedSub][SelectedNo]
                ? `คำตอบที่คุณเลือกคือ ข้อ ${answer[SelectedSub][SelectedNo]}`
                : 'คุณไม่ได้ตอบคำถามข้อนี้'
            }}
            <br />
            <br />
            คำตอบที่ถูกต้องคือ ข้อ
            {{ subject[SelectedSub].solution[SelectedNo].solnum }}
          </p>
          <p
            v-html="
              HandleRender(
                `เฉลยละเอียด: ${subject[SelectedSub].solution[SelectedNo].reason}`
              )
            "
          ></p>
        </div>
      </form>
    </div>
    <br />
    <div id="container-selection">
      <button class="btnPrev" :disabled="SelectedNo == 0" @click="SelectedNo--">
        <!-- eslint-disable-next-line vue/no-parsing-error -->
        < ข้อก่อนหน้า
      </button>
      <button v-if="!isDone.isDone" class="btnChecker" @click="HandleChecker()">
        ตรวจคำตอบ
      </button>
      <button
        class="btnNext"
        :disabled="SelectedNo == subject[SelectedSub].number - 1"
        @click="SelectedNo++"
      >
        ข้อถัดไป >
      </button>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { ExamChecker, RenderQuestion } from '../utils.js'

export default {
  props: {
    isDone: Object,
    json: Object
  },
  data() {
    return {
      subject: this.json.subject,
      answer: null,
      title: null,
      SelectedSub: 0,
      SelectedNo: 0,
      SelectedChoice: undefined,
      CurrentSelect: null
    }
  },
  methods: {
    HandleRender(text) {
      return RenderQuestion(text)
    },
    HandleChecker() {
      const pass = window.confirm('ต้องการส่งคำตอบหรือไม่ ?')
      if (!pass) {
        return
      }
      // const ResultExam = ExamChecker(this.answer, this.subject)
      // window.alert(ResultExam)
      this.isDone.isDone = true
    },
    HandleChangedSub(val) {
      this.SelectedSub = val
      this.SelectedNo = this.CurrentSelect[val]
    },
    HandleChangedNo(val) {
      this.SelectedNo = val
      this.SelectedChoice = this.answer[this.SelectedSub][this.SelectedNo]
      this.CurrentSelect[this.SelectedSub] = this.SelectedNo
    },
    HandleChangedAnswer(newval) {
      if (this.answer[this.SelectedSub][this.SelectedNo] == newval) {
        this.answer[this.SelectedSub][this.SelectedNo] = undefined
        this.SelectedChoice = undefined
        return
      }
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

div.question {
  background: rgba(209, 209, 209, 0.849);
  padding-top: 5px;
  padding-bottom: 5px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  font-size: 18px;
}

.textinput {
  font-size: 16px;
}

.btnSelection {
  font-size: 16px;
}

.katex {
  font-size: 1em !important;
}
</style>
