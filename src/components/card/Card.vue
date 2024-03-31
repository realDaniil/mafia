<template>
  <div :class="cardClasses" @click="handleClick" ref="cardRef">
    <div class="front">
      <p>{{ name || 'Имя' }}</p>
      <p>Нажмите, чтобы увидеть свою роль</p>
    </div>
    <div class="back">{{ role || 'Роль' }}</div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    name: String,
    role: String,
  },
  setup() {
    const cardClasses = ref(["card"]);
    const cardRef = ref();

    const handleClick = () => {
      if (!cardClasses.value.includes("open")) {
        cardClasses.value = ["card", "open"];
      } else {
        cardClasses.value = ["card", "delete"];
        setTimeout(() => {
          cardRef.value.remove();
        }, 500);
      }
    };

    return {
      cardClasses,
      handleClick,
      cardRef,
    };
  },
};
</script>

<style scoped>
.card {
  width: 300px;
  height: 300px;
  position: absolute;
  perspective: 1000px;
  transition: 0.8s;
  left: 0;
  user-select: none;
}

.front,
.back {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: 0.5s;
  backface-visibility: hidden;
  border-radius: 10px;
  background: rgb(22, 22, 22);
}

.front {
  border: solid 4px rgb(80, 80, 80);
  color: rgb(80, 80, 80);
}

.back {
  color: white;
  border: solid 4px white;
  transform: rotateY(180deg);
}

.card.open .front {
  transform: rotateY(-180deg);
}

.card.open .back {
  transform: rotateY(0);
}

.card.delete {
  rotate: -90deg;
  left: -2000px;
}
</style>
