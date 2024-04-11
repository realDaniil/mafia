<template>
  <div :class="cardClasses" @click="handleClick" ref="cardRef">
    <div class="front">
      <p class="short-text">{{ name || "Имя игрока" }}</p>
      <p>Нажмите, чтобы увидеть свою роль</p>
    </div>
    <div class="back">
      <p class="short-text" :class="textClasses">{{ role || "Роль" }}</p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    name: String,
    role: String,
    isLoop: Boolean,
  },
  setup(props, { emit }) {
    const cardClasses = ref(["card"]);
    const cardRef = ref();
    const textClasses = ref(["text"]);
    const handleClick = () => {
      if (!cardClasses.value.includes("open")) {
        const cards = document.querySelectorAll(".card");
        cardClasses.value = ["card", "open"];
        cards.forEach((card) => (card.style.pointerEvents = "none"));
        setTimeout(() => {
          cards.forEach((card) => (card.style.pointerEvents = "auto"));
        }, 500);
      } else {
        if (props.isLoop) {
          cardClasses.value = ["card"]
        } else if (!cardClasses.value.includes("delete")) {
          cardClasses.value = ["card", "open", "delete"];
          const randomDirection = Math.random() < 0.5 ? -1 : 1;
          const randomRotation = Math.floor(Math.random() * 360);
          cardRef.value.style.left = `${randomDirection * 200}%`;
          cardRef.value.style.rotate = `${randomRotation}deg`;
          emit("cardRemoved");
          setTimeout(() => {
            if (cardRef.value) {
              cardRef.value.remove();
            }
          }, 500);
        }
      }
    };

    if (props.role === "Мафия" || props.role === "Дон") {
      textClasses.value.push("red");
    } else if (props.role === "Маньяк") {
      textClasses.value.push("violet");
    } else if (
      !["Мирный житель", "Комиссар", "Доктор", "Путана"].includes(props.role)
    ) {
      textClasses.value.push("yellow");
    }
    return {
      cardClasses,
      handleClick,
      cardRef,
      textClasses,
    };
  },
};
</script>

<style scoped>
.card {
  width: 300px;
  height: 300px;
  position: absolute;
  left: calc(50% - 150px);
  transition: 0.8s;
  user-select: none;
  perspective: 1000px;
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
  border: solid 4px #403f44;
  color: #403f44;
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
.text.red {
  color: red;
}
.text.violet {
  color: blueviolet;
}
.text.yellow {
  color: yellow;
}
</style>
