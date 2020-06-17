<template>
  <div id="field">
    <div id="contain-subject"></div>
    <div id="contain-no">
      <!-- <button></button> -->
    </div>
    <form id="question"></form>
    <div id="container-selection">
      <!-- eslint-disable-next-line vue/no-parsing-error -->
      <button class="btnSelection">< ข้อก่อนหน้า</button>
      <button class="btnSelection">ตรวจคำตอบ</button>
      <button class="btnSelection">ข้อถัดไป ></button>
    </div>
  </div>
</template>

<script>
export default {}
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
