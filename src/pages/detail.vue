<template>
<div v-if="!state.fetching">
  <div class="items-center justify-center flex flex-col">
    <div class="mt-4 text-6xl font-extrabold text-center my-2">
      {{state.detail.name}}
    </div>
    <div class="bg-gray-200 rounded-full my-2 p-4">
      <img :src="state.detail.sprites.front_default" class="w-full"/>
    </div>
    <div>
      <span v-for="(item, i) in state.detail.types" :key="i" class="bg-green-200 py-1 px-2 mx-2 rounded text-sm">{{item.type.name}}</span>
    </div>

    <div class="bg-gray-300 rounded-2xl p-4 mt-8 sm:w-2/3 w-full">
      <div class="grid lg:grid-cols-3 grid-cols-1 gap-2 mb-4 flex justify-between">
        <div class="bg-green-500 px-4  py-1 rounded-xl">
          <span class="text-2xl font-medium">Species : </span>
          <div>
            {{ state.detail.species.name }}
          </div>
        </div>
        <div class="bg-green-500 px-4  py-1 rounded-xl">
          <span class="text-2xl font-medium">Weight : </span>
          <div>
            {{ state.detail.weight }} Kg
          </div>
        </div>
        <div class="bg-green-500 px-4  py-1 rounded-xl">
          <span class="text-2xl font-medium">Height : </span>
          <div>
            {{ state.detail.height }} m
          </div>
        </div>
      </div>

      <div class="mb-4">
        <span class="text-2xl font-medium">Abilities : </span>
        <div>
          <span v-for="(skill, i) in state.detail.abilities" :key="i" class="bg-green-500 py-1 px-2 mx-2 rounded text-sm">{{skill.ability.name}}</span>
        </div>
      </div>

      <div class="mb-4">
        <span class="text-2xl font-medium">Moves : </span>
        <div class="grid lg:grid-cols-7 sm:grid-cols-4 grid-cols-2 gap-2">
          <div v-for="(move, i) in state.detail.moves" :key="i" class="bg-green-500 py-1 px-2 mx-2 rounded text-sm">{{move.move.name}}</div>
        </div>
      </div>
    </div>

  </div>
</div>
</template>

<script>
import { onBeforeMount } from 'vue';
import useFetch from '../services/use-fetch'
import { useRoute } from 'vue-router';

export default {
  setup() {
    const { state, getById } = useFetch()
    const route = useRoute();

  onBeforeMount(() => {
    getById(route.params.name)
  })

    return { state }
  },
}
</script>
