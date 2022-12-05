<template>
  <div class="container">
    <Playground @damage="damage" @score="scoreUp" class="top-info" />
    <StatusBar class="bottom-info" :hp="hp" :score="score" />
  </div>
</template>

<script>
import Playground from "./Playground.vue";
import StatusBar from "./StatusBar";
import { ref } from "vue";
export default {
  components : {
    Playground,
    StatusBar
  },
  setup() {
    const score = ref(0);
    const hp = ref(100);
    const scoreUp = () => {
      score.value += 100;
    };
    const damage = () => {
      hp.value -= 10;
      if(hp.value === 0) {
        alert('game over')
        location.reload()
      }
    };
    return {
      score,
      hp,
      scoreUp,
      damage
    }
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.top-info {
  flex: 1;
}
.bottom-info {
  height: 10vh;
}
</style>
