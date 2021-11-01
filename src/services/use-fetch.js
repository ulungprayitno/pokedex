import {reactive} from 'vue';
import api from '../utils/api'

export default function() {
  const state = reactive({
    response: [],
    detail: '',
    types: [],
    next: null,
    error: null,
    fetching: false,
    fetchingFilter: false,
    filter: false
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

      state.response = state.filter ? response : [...state.response, ...response]
      state.next = res.data.next
      state.filter = false
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
  };

  const getTypes = async () => {
    state.fetching = true;
    try {
      const res = await api.get(`/type`)
      state.types = res.data.results
    } catch (errors) {
      state.error = errors;
    } finally {
      state.fetching = false;
    }
  }

  const fetchDataFilter = async (name) => {
    state.fetching = true;
    state.fetchingFilter = true
    try {
      const res = await api.get(`/type/${name}`)
      if(res){
        let response = await Promise.all(
          res.data.pokemon.map(async item => {
            const p = await api.get(`/pokemon/${item.pokemon.name}`)
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
        state.response = response
        state.filter = true
      }
    } catch (errors) {
      state.error = errors;
    } finally {
      state.fetching = false;
      state.fetchingFilter = false
    }
  }

  return {state, fetchData, fetchMore, getById, getTypes, fetchDataFilter};
}