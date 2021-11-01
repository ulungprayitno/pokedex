import {reactive} from 'vue';
import api from '../utils/api'

export default function() {
  const state = reactive({
    response: [],
    detail: '',
    next: null,
    error: null,
    fetching: false
  });

  const fetchData = async (url) => {
    let uri = url  ? url : '/pokemon'
    state.fetching = true;

    try {
      const res = await api.get(uri);
      const response = await Promise.all(
        res.data.results.map(async item => {
          const p = await api.get(`/pokemon/${item.name}`)
          const pokemon = p.data
          if(pokemon){
            return {
              id: pokemon.id,
              name: pokemon.name,
              types: pokemon.types,
              sprites: pokemon.sprites
            }            
          }
        })
      )

      state.response = [...state.response, ...response]
      state.next = res.data.next
    } catch (errors) {
      state.error = errors;
    } finally {
      state.fetching = false;
    }
  };

  const fetchMore = () => {
    if (state.next === null) return
    fetchData(state.next)
  };

  const getById = async (name) => {
    state.fetching = true;
    try {
      const res = await api.get(`/pokemon/${name}`)
      state.detail = res.data 
    } catch (errors) {
      state.error = errors;
    } finally {
      state.fetching = false;
    }
  }

  return {state, fetchData, fetchMore, getById};
}