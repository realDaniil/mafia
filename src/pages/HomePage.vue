<template>
  <AppearElement>
    <div class="holder">
      <h1 class="text-3xl font-bold mb-4">Мафия ведущий</h1>
      <MyButton @click="$router.push('/on-one-device')">Играть на одном устройстве</MyButton>
      <MyButton style="background: #636363;" @click="$router.push('/online')"> Играть онлайн </MyButton>
    </div>
  </AppearElement>
</template>