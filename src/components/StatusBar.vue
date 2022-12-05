<template>
  <div class="status-bar">
    <div class="left-side">
      <div class="blood-wrapper">
        <span :style="{ width: hp + '%' }"></span>
      </div>
    </div>
    <div class="right-side">
      <span>SCORE:<span class="num">{{score}}</span></span>
    </div>
  </div>
  </template>
  
  <script>
  export default  {
    props: {
      score: Number,
      hp: Number
    }
  }


  </script>
  
<style scoped>
.status-bar {
  display: flex;
  justify-content: space-between;
}
.left-side ,.right-side {
  width: 50%;
  height: 100%;
  padding: 0 1vw;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
.blood-wrapper {
  height: 6vh;
  border-radius: 3vh;
  background-color: #ccc;
  width: 100%;
  display: flex;
  padding: 0 2%;
  box-sizing: border-box;
  align-items: center;
}
.blood-wrapper span {
  width: 100%;
  height: 80%;
  background-color: tomato;
  border-radius: 3vh;
}
.num {
  margin-left: 20px;
  font-size: 4vw;
  color: tomato;
}
</style>
  