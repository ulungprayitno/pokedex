<template>
  <div class="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-6 mt-8">
      <div class="bg-gray-300 rounded-2xl" v-for="x in props.data" :key="x">
        <router-link :to="'/pokemon/' + x.name">
          <div class="mx-4 mt-2 text-4xl font-medium cursor-pointer">
          {{x.name}}
          </div>
        </router-link>

          <div>
            <span v-for="(item, i) in x.types" :key="i" class="ml-4 bg-gray-600 py-1 px-2 rounded text-xs text-white">{{item.type.name}}</span>
          </div>

          <div class="flex items-end justify-between h-24">
            <div class="mx-4 my-2">
              <div v-if="props.isFavorite">
                <button type="button" class="bg-red-600 rounded-lg text-xs px-2 py-1 text-white" @click="removeFavorite(x.id)">Remove from Favourite</button>
              </div>
              <div v-else>
                <button v-if="props.favorites === undefined || !props.favorites.find(fav => fav.id === x.id)" type="button" class="bg-green-600 rounded-lg text-xs px-2 py-1 text-white" @click="addFavorite(x)">Add to Favourite</button>
                <button v-else type="button" class="bg-red-600 rounded-lg text-xs px-2 py-1 text-white" @click="removeFavorite(x.id)">Remove from Favourite</button>
              </div>
            </div>
            <div class="bg-gray-200 rounded-full my-1 p-2 lg:w-auto w-24 cursor-pointer">
              <router-link :to="'/pokemon/' + x.name">
                <img :src="x.sprites.front_default"/>
              </router-link>
              </div>
          </div>
      </div>
    </div>
</template>

<script>

export default{
  props: ['data', 'favorites', 'isFavorite'],
  setup(props, {emit}) {
    const addFavorite = ((data) => emit('add:fav', data))
    const removeFavorite = ((data) => emit('remove:fav', data))
    return {props, addFavorite, removeFavorite}
  }
}
</script>
