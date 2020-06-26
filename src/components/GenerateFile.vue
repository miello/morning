<template>
  <div id="gen">
    <div>
      เวลาที่ใช้ในการสอบ (นาที)
      <input type="number" min="0" v-model="file.time" />
    </div>
    <br />
    <div class="btn">
      Import:
      <input
        type="file"
        ref="myFile"
        v-on:change="HandleImportFile"
        accept="application/json"
      />
      <button v-on:click="HandleExportFile(file)">Export</button>
      <br /><br />
      <button v-on:click="HandleAddSub()">เพิ่มวิชา</button>
      <button v-on:click="HandleAddQuestion(SelectedSub)">เพิ่มข้อ</button>
      <button v-on:click="HandleReset()">Reset</button>
    </div>
    <br /><br />
    <div class="select">
      วิชาที่เลือก:
      <select v-model="SelectedSub">
        <option value="-1" disabled></option>
        <option
          v-for="(val, index) in file.subject"
          :key="index"
          :value="index"
        >
          {{ val.name ? val.name : `วิชาที่ ${index + 1}` }}
        </option>
      </select>
      <div v-if="SelectedSub != -1">
        ข้อที่เลือก:
        <select v-model="SelectedNo">
          <option value="-1" disabled></option>
          <option
            v-for="(val, index) in file.subject[SelectedSub].question"
            :key="index"
            :value="index"
          >
            {{ `ข้อที่ ${index + 1}` }}
          </option>
        </select>
      </div>
    </div>
    <br />
    <div class="btn">
      <button v-on:click="HandleDeleteSub(SelectedSub)">ลบวิชานี้</button>
      <button v-on:click="HandleDeleteQuestion(SelectedSub, SelectedNo)">
        ลบข้อนี้
      </button>
    </div>
    <br />
    <div v-if="SelectedSub != -1">
      ชื่อวิชา:
      <input type="text" v-model="file.subject[SelectedSub].name" />
    </div>
    <br />
    <div v-if="SelectedNo != -1 && SelectedSub != -1" class="fieldedit">
      <form>
        โจทย์
        <br /><br />
        <textarea
          rows="10"
          cols="30"
          v-model="file.subject[SelectedSub].question[SelectedNo].detail"
        ></textarea>
        <br />
        เฉลยช้อยส์
        <input
          type="text"
          v-model="file.subject[SelectedSub].solution[SelectedNo].solnum"
        />
        <br />
        เฉลยละเอียด
        <br />
        <textarea
          rows="1"
          cols="30"
          v-model="file.subject[SelectedSub].solution[SelectedNo].reason"
        />
        <br />
        <div
          class="choice"
          v-for="(val, index) in file.subject[SelectedSub].choice[SelectedNo]
            .choices"
          :key="index"
        >
          <p>ช้อยส์ที่ {{ index + 1 }}</p>
          <textarea
            rows="1"
            cols="30"
            v-model="
              file.subject[SelectedSub].choice[SelectedNo].choices[index]
            "
          ></textarea>
          <br />
          <button
            v-on:click="HandleDeleteChoice(SelectedSub, SelectedNo, index)"
          >
            ลบช้อยส์ที่ {{ index + 1 }}
          </button>
        </div>
        <br />
      </form>
      <button v-on:click="HandleAddChoice(SelectedSub, SelectedNo)">
        เพิ่มช้อยส์
      </button>
      <button v-on:click="HandlePreviewData(SelectedSub, SelectedNo, -1)">
        Preview ข้อมูล
      </button>
    </div>
    <div class="preview">
      <fieldset>
        <p v-html="PreviewData"></p>
        <p v-html="PreviewReason"></p>
        <p v-for="(val, index) in PreviewAnswer" :key="index" v-html="val"></p>
      </fieldset>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { RenderQuestion } from '../utils.js'

export default {
  name: 'gen',
  data() {
    return {
      file: {
        time: 180,
        subject: []
      },
      SelectedSub: -1,
      SelectedNo: -1,
      PreviewData: '',
      PreviewReason: '',
      PreviewAnswer: []
    }
  },
  methods: {
    HandleAddSub() {
      const now = window.prompt(`ต้องการเพิ่มกี่วิชา`, '0')
      for (let i = 0; i < now; i++) {
        this.file.subject.push({
          name: ``,
          number: 0,
          question: [],
          choice: [],
          solution: []
        })
      }
    },
    HandleAddQuestion(SelectedSub) {
      if (SelectedSub == -1) {
        return
      }
      const now = window.prompt(
        `ต้องการเพิ่มคำถามวิชาที่ ${SelectedSub + 1} กี่ข้อ`,
        '0'
      )
      for (let i = 0; i < now; i++) {
        this.file.subject[SelectedSub].question.push({
          detail: ''
        })
        this.file.subject[SelectedSub].choice.push({
          choices: []
        })
        this.file.subject[SelectedSub].solution.push({
          solnum: null,
          reason: ''
        })
        this.file.subject[SelectedSub].number++
      }
    },
    HandleDeleteSub(SelectedSub) {
      const len = this.file.subject.length
      if (len == 0) {
        return
      }
      this.file.subject.splice(SelectedSub, 1)
      if (len - 1 == 0) {
        this.SelectedSub = -1
      } else {
        this.SelectedSub -= 1
      }
    },
    HandleDeleteQuestion(SelectedSub, SelectedNo) {
      if (SelectedSub == -1) {
        return
      }
      const len = this.file.subject[SelectedSub].question.length
      if (len == 0) {
        return
      }
      this.file.subject[SelectedSub].question.splice(SelectedNo, 1)
      this.file.subject[SelectedSub].choice.splice(SelectedNo, 1)
      this.file.subject[SelectedSub].solution.splice(SelectedNo, 1)
      if (len - 1 == 0) {
        this.SelectedNo = -1
      } else {
        this.SelectedNo -= 1
      }
      this.file.subject[SelectedSub].number -= 1
    },
    HandleAddChoice(SelectedSub, SelectedNo) {
      const now = window.prompt('ต้องการเพิ่มกี่ช้อยส์ ?', '0')
      for (let i = 0; i < now; i++) {
        this.file.subject[SelectedSub].choice[SelectedNo].choices.push('')
      }
    },
    HandleDeleteChoice(SelectedSub, SelectedNo, index) {
      this.file.subject[SelectedSub].choice[SelectedNo].choices.splice(index, 1)
    },
    HandleImportFile() {
      const file = this.$refs.myFile.files[0]
      const reader = new FileReader()
      reader.readAsText(file, 'UTF-8')
      reader.onload = evt => {
        this.file = JSON.parse(evt.target.result)
      }
    },
    HandleExportFile(data) {
      const json = JSON.stringify(data)
      const element = document.createElement('a')
      element.setAttribute(
        'href',
        'data:application/json;charset=utf-8,' + encodeURIComponent(json)
      )
      element.setAttribute('download', 'data.json')

      element.style.display = 'none'
      document.body.appendChild(element)

      element.click()

      document.body.removeChild(element)
    },
    HandlePreviewData(SelectedSub, SelectedNo) {
      this.PreviewReason = this.file.subject[SelectedSub].solution[
        SelectedNo
      ].reason
      this.PreviewData = RenderQuestion(
        `${SelectedNo + 1}\\. ${
          this.file.subject[SelectedSub].question[SelectedNo].detail
        }`
      )
      this.PreviewAnswer = this.file.subject[SelectedSub].choice[
        SelectedNo
      ].choices.map((val, index) => {
        return RenderQuestion(`${index + 1}\\) ${val}`)
      })
    },
    HandleReset() {
      this.file = {
        time: 180,
        subject: []
      }
      this.SelectedSub = -1
      this.SelectedNo = -1
      this.PreviewData = ''
      this.PreviewReason = ''
      this.PreviewAnswer = []
    }
  }
}
</script>

<style scoped></style>
