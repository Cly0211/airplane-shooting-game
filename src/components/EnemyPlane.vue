<template>
  <Enemy ref="el" class="plane">
    <div ref="container" class="bullet-wrapper">
      <span>
        <i
          class="bullet"
          :ref="bulletDom"
          @animationend="(e) => end(l, e)"
          :id="l.id"
          :key="l.id"
          v-for="l in bullet"
        ></i>
      </span>
    </div>
  </Enemy>
</template>

<script>
import Enemy from "./Enemy.vue";
import {
  onMounted,
  ref,
  onBeforeMount,
  onBeforeUnmount,
} from "vue";
export default {
  components: {
    Enemy
  },
  setup(props, { emit }) {
    const container = ref(null);
    const bullet = ref([]);

    const el = ref(null);

    const timer = ref(0);
    const testTimer = ref(0);
    const list = ref({});
    const plane = ref(null);

    const bulletDom = (ref) => {
      if (ref) {
        list.value[ref.id] = ref;
      }
    };
    let _id = 0;

    onMounted(() => {
      let observer = null;

      function callback([{ isVisible }]) {
        if (!isVisible) {
          observer.disconnect();
          emit("die");
        }
      }

      observer = new window.IntersectionObserver(callback, {
        threshold: [0],
        delay: 100,
        trackVisibility: true,
      });
      observer.observe(el.value.$el);
    });

    const bulletPush = () => {
      timer.value = setInterval(() => {
        if (container.value) {
          const { x, y } = container.value.getBoundingClientRect();
          const id = _id++;
          bullet.value.unshift({
            id: id + "",
            x: x + window.innerWidth * 0.01,
            y,
          });
        } else {
          clearInterval(timer.value);
        }
      }, 1000);
    };

    const testCrush = () => {
      testTimer.value = setTimeout(() => {
        // console.log(list.value.length)
        for (let i in list.value) {
          const k = list.value[i];
          let resultPosition = k.getBoundingClientRect();
          let planePosition = plane.value.getBoundingClientRect();
          const flag = elementsOverlap(planePosition, resultPosition);
          if (flag) {
            const index = bullet.value.findIndex((j) => j.id === k.id);
            bullet.value.splice(index, 1);
            delete list.value[i];
            emit("crush");
            break;
          }
        }

        testCrush();
      }, 50);
    };

    onMounted(() => {
      plane.value = document.body.querySelector("#ppl");
      testCrush();
    });

    onBeforeUnmount(() => {
      clearTimeout(testTimer.value);
    });

    const elementsOverlap = (domRect1, domRect2) => {
      return !(
        domRect1.top > domRect2.bottom ||
        domRect1.right < domRect2.left ||
        domRect1.bottom < domRect2.top ||
        domRect1.left > domRect2.right
      );
    };

    const end = (l, e) => {
      e.stopPropagation();
      const index = bullet.value.findIndex((i) => i.id === l.id);
      bullet.value.splice(index, 1);
    };

    onMounted(() => {
      bulletPush();
    });

    onBeforeMount(() => {
      clearInterval(timer.value);
      bullet.value = [];
    });

    return {
      bulletDom,
      end,
      bullet,
      el,
      container
    }
  },
};
</script>

<style scoped>
.plane {
  position: absolute;
  margin: auto;
  width: 4vw;
  height: 4vw;
  cursor: pointer;
  margin: 0 auto;
}

.plane /deep/ svg {
  width: 4vw;
  height: 4vw;
}
.bullet-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 100%;
}
@keyframes flush {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100vh);
  }
}
.bullet {
  display: block;
  width: 1vw;
  height: 1vw;
  border-radius: 50%;
  background-color: red;
  margin-top: 1vw;
  position: fixed;
  animation: flush linear 7s;
}
</style>
