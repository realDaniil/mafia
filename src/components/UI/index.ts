import Loader from "@/components/UI/Loader.vue";
import BottomNavBar from "@/components/UI/BottomNavBar.vue";
import Button from "@/components/UI/Button.vue";
import Button1 from "@/components/UI/Button1.vue";
import AppearElement from "@/components/UI/AppearElement.vue";
import Mafia from "@/components/icons/Mafia.vue";
import ThreeMafias from "@/components/icons/ThreeMafias.vue";

export default [
  { name: "MyLoader", component: Loader },
  { name: "BottomNavBar", component: BottomNavBar },
  { name: "MyButton", component: Button },
  { name: "MyButton1", component: Button1 },
  { name: "AppearElement", component: AppearElement },
  { name: "MafiaIcon", component: Mafia },
  { name: "ThreeMafiasIcon", component: ThreeMafias },
];
