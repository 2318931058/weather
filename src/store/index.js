import { defineStore } from "pinia"
export const useCityStore = defineStore("city", {
  state: () => {
    return {
      defaultCity: "",
      chosenCity: "",
      defaultCityWeather:'',
      chosenCityWeather:''
    }
  },
  actions: {
    setDefaultCity(city) {
      this.defaultCity = city
    },
    setChosenCity(city) {
      this.chosenCity = city
    },
    setDefaultCityWeather(weather){
      this.defaultCityWeather = weather
    },
    setChosenCityWeather(weather){
      this.chosenCityWeather = weather
    }
  },
})
