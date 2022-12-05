<template>
  <div class="wrapper">
    <Plane class="plane">
      <div ref="container" class="bullet-wrapper">
        <span>
          <i
            class="my-bullet"
            @animationend="endLeft(l)"
            :style="{ left: l.x + 'px', top: l.y + 'px' }"
            :key="l.id"
            v-for="l in leftBullet"
          ></i>
        </span>
        <span>
          <i
            class="my-bullet"
            @animationend="endRight(r)"
            :style="{ left: r.x + 'px', top: r.y + 'px' }"
            :key="r.id"
            v-for="r in rightBullet"
          ></i>
        </span>
      </div>
    </Plane>
  </div>
</template>

<script>
import Plane from "./Plane.vue";
import { onMounted, ref, onBeforeMount } from "vue";

export default {
  components: {
    Plane
  },
  setup() {
    const container = ref(null);
    const leftBullet = ref([]);
    const rightBullet = ref([]);

    const timer = ref(0);

    const bulletPush = () => {
      timer.value = setInterval(() => {
        const { x, y, width } = container.value.getBoundingClientRect();
        leftBullet.value.unshift({
          id: Date.now(),
          x,
          y,
        });
        rightBullet.value.unshift({
          id: Date.now(),
          x: x + width - window.innerWidth * 0.01,
          y,
        });
      }, 1000);
    };

    const endLeft = (l) => {
      const index = leftBullet.value.findIndex((i) => i.id === l.id);
      leftBullet.value.splice(index, 1);
    };

    const endRight = (l) => {
      const index = rightBullet.value.findIndex((i) => i.id === l.id);
      rightBullet.value.splice(index, 1);
    };

    onMounted(() => {
      bulletPush();
    });

    onBeforeMount(() => {
      clearInterval(timer.value);
      leftBullet.value = [];
      rightBullet.value = [];
    });

    return {
      endLeft,
      endRight,
      leftBullet,
      rightBullet,
      container
    }
  },
};

// import { ref } from "vue";
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  position: relative;
  top: -4vw;
}
.plane {
  position: absolute;
  margin: auto;
  width: 4vw;
  height: 4vw;
  cursor: pointer;
  margin: 0 auto;
  z-index: 1000000;
  /* transform: translateX(calc(50vw - 50%)) translateY(-100%); */
}

.plane /deep/ svg {
  width: 4vw;
  height: 4vw;
}
.bullet-wrapper {
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 100%;
}
@keyframes flush-my {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100vh);
  }
}
.my-bullet {
  display: block;
  width: 1vw;
  height: 1vw;
  border-radius: 50%;
  background-color: red;
  margin-top: 1vw;
  position: fixed;
  animation: flush-my linear 3s;
}
</style>
