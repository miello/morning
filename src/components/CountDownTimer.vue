<template>
  <p class="timecountdown">{{ hour }}h {{ minute }}m {{ second }}s</p>
</template>

<script>
export default {
  name: 'CountDown',
  data() {
    return {
      hour: 0,
      minute: 0,
      second: 0
    }
  },
  created() {
    const ms = 1000
    const m = 60 * ms
    const h = 60 * m
    const start = new Date().getTime()
    const time = 3 * h
    const u = setInterval(() => {
      const now = new Date().getTime()
      const diff = Math.floor(now - start)
      const remain = time - diff
      this.hour = Math.floor(remain / h)
      this.hour = `0${this.hour}`
      this.minute = Math.floor((remain - this.hour * h) / m)
      if (this.minute < 10) {
        this.minute = `0${this.minute}`
      }
      this.second = Math.floor((remain - this.hour * h - this.minute * m) / ms)
      if (this.second < 10) {
        this.second = `0${this.second}`
      }
      if (remain <= 0) {
        clearInterval(u)
      }
    }, 1000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.timecountdown {
  padding-top: 10px;
  padding-bottom: 10px;
  margin-left: 35%;
  margin-right: 35%;
  text-align: center;
  font-weight: 300;
  font-size: 30px;
  background-color: rgba(255, 255, 255, 0.8);
  margin-top: 0px;
  margin-bottom: 0px;
}
</style>
