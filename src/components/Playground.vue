<template>
  <div ref="wrapper" class="play-wrapper">
    <div class="sky">
      <EnemyPlane
        class="enemy"
        @crush="crush"
        @die="enemyDie(e)"
        v-for="e in enemies"
        @animationend="end(e)"
        :style="{ left: e.x + 'px' }"
        :key="e.id"
      />
    </div>
    <div>
      <MyPlane ref="plane"> </MyPlane>
    </div>
  </div>
</template>

<script>
import MyPlane from "./MyPlane.vue";
import EnemyPlane from "./EnemyPlane.vue";
import drag from "../../move";
import { onMounted, ref } from "vue";
export default {
  components: {
    MyPlane,
    EnemyPlane
  },
  setup(props, { emit}) {

    const enemies = ref([]);
    const plane = ref(null);
    const wrapper = ref(null);

    const crush = () => {
      emit("damage");
    };

    onMounted(() => {
      drag(plane.value.$el.firstChild, { bounding: wrapper.value });
      pushEnemy();
    });

    const pushEnemy = () => {
      setInterval(() => {
        enemies.value.push({
          id: Date.now(),
          x: window.innerWidth * Math.random(),
        });
      }, 2000);
    };

    const end = (l) => {
      const index = enemies.value.findIndex((i) => i.id === l.id);
      enemies.value.splice(index, 1);
    };

    const enemyDie = (l) => {
      end(l);
      emit("score");
    };

    return {
      crush,
      enemyDie,
      end,
      enemies,
      plane
    }
  },
};
</script>

<style scoped>
.play-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
}
.sky {
  flex: 1;
}
@keyframes flush {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100vh);
  }
}
.enemy {
  /* position: relative; */
  animation: flush linear 8s;
  /* transform: rotate(180deg) */
}
.plane /deep/ svg {
  width: 100%;
  height: 100%;
}
</style>
