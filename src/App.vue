<template>
  <div id="app" class="bg">
    <ExamField />
  </div>
</template>

<script>
import ExamField from './components/ExamField.vue'

export default {
  name: 'App',
  components: {
    ExamField
  },
  created() {
    window.onbeforeunload = () => {
      return 'คุณต้องการปิดหน้าต่างนี้ ใช่ไหม'
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  position: relative;
  text-align: center;
}

.katex {
  font-size: 1em !important;
}

body,
html {
  height: 100%;
  margin: 0px;
}

.bg {
  position: relative;
}
.bg:after {
  content: '';
  background: url('./assets/bg.jpg') no-repeat center center;
  position: absolute;
  background-position: center;
  background-size: cover;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.95; /* Here is your opacity*/
}

* {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                        supported by Chrome and Opera */
  font-family: 'Sukhumvit Set', 'Prompt', sans-serif;
}
</style>
