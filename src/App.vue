<template>
  <div id="app" class="bg">
    <CountDown />
    <QuestionField />
  </div>
</template>

<script>
import CountDown from './components/CountDownTimer.vue'
import QuestionField from './components/QuestionField.vue'

export default {
  name: 'App',
  components: {
    CountDown,
    QuestionField
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
