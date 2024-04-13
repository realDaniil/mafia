<template>
  <div :class="cardClasses" @click="handleClick" ref="cardRef">
    <div class="front">
      <div class="front__text-holder">
        <p class="short-text">{{ name || "Имя игрока" }}</p>
        <p>Нажмите, чтобы увидеть свою роль</p>
      </div>
    </div>
    <div
      class="back"
      :style="{
        backgroundImage: `url(${require('@/assets/' + cardImage + '.png')})`,
      }"
    >
      <div class="back__text-holder">
        <p class="short-text" :class="textClasses">{{ role || "Роль" }}</p>
      </div>
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
        cardClasses.value.push("open");
        cards.forEach((card) => (card.style.pointerEvents = "none"));
        setTimeout(() => {
          cards.forEach((card) => (card.style.pointerEvents = "auto"));
        }, 500);
      } else {
        if (props.isLoop) {
          cardClasses.value = cardClasses.value.filter(
            (item) => item !== "open"
          );
        } else if (!cardClasses.value.includes("delete")) {
          cardClasses.value.push("delete");
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

    const roleToClassMap = {
      "Мирный житель": "civilian",
      Комиссар: "sheriff",
      Доктор: "doctor",
      Мафия: "mafia",
      Дон: "don",
      Путана: "whore",
      Маньяк: "maniac",
    };

    const cardImage = roleToClassMap[props.role] ?? "other";

    return {
      cardClasses,
      handleClick,
      cardRef,
      textClasses,
      cardImage,
    };
  },
};
</script>

<style scoped>
.card {
  width: 340px;
  height: 480px;
  position: absolute;
  left: calc(50% - 170px);
  transition: 0.8s;
  user-select: none;
  perspective: 1000px;
  font-family: 'Times New Roman', Times, serif;
  font-size: 1.2rem;
}
@media (max-width: 360px) {
  .card {
    width: 272px;
    height: 384px;
    left: calc(50% - 136px);
  }
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
  background-size: cover;
  background-repeat: no-repeat;
}
.front {
  border: solid 4px #353535;
  color: #ffffff;
  background-image: url("@/assets/card.png");
}
.front__text-holder {
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #353535c8;
  text-align: center;
}
.back {
  color: white;
  border: solid 4px white;
  transform: rotateY(180deg);
}
.back__text-holder {
  position: absolute;
  bottom: 30px;
}
.card.disabled {
  filter: brightness(70%);
}
.card.open .front {
  transform: rotateY(-180deg);
}
.card.open .back {
  transform: rotateY(0);
}
</style>
