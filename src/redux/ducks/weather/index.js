import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import Usa from "../../../components/cities.json"

//action names
const GET_WEATHER = "weather/GET_WEATHER"
const GET_STATES = "weather/GET_STATES"
const GET_CITIES = "weather/GET_CITIES"
//reducer
const initialState = {
  states: [],
  cities: [],
  weather: [],
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_STATES:
      return { ...state, states: action.payload }
    case GET_CITIES:
      return { ...state, cities: action.payload }
    case GET_WEATHER:
      return { ...state, weather: action.payload }
    default:
      return state
  }
}
//actions
function getStates() {
  return (dispatch) => {
    let states1 = Usa.map((item) => item.state)
    let states = new Set(states1)
    let finalStates = [...states].sort()

    dispatch({
      type: GET_STATES,
      payload: finalStates,
    })
  }
}
function getTheCities(state) {
  return (dispatch) => {
    let cities = Usa.filter((item) => item.state === state)
    dispatch({
      type: GET_CITIES,
      payload: cities,
    })
  }
}
const apiKey = "17206ea6a26761548da827869b4b3237"
function getWeatherNow(city) {
  let newCity = city.toLowerCase()
  return (dispatch) => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/forecast?q=${newCity}&appid=${apiKey}`
      )
      .then((resp) => {
        console.log(resp)
        dispatch({
          type: GET_WEATHER,
          payload: resp.data.list,
        })
      })
  }
}

//custom hooks
export function useWeather() {
  const dispatch = useDispatch()
  const states = useSelector(({ weatherReducer }) => weatherReducer.states)
  const cities = useSelector(({ weatherReducer }) => weatherReducer.cities)
  const weather = useSelector(({ weatherReducer }) => weatherReducer.weather)
  const getCities = (state) => dispatch(getTheCities(state))
  const getWeather = (city) => dispatch(getWeatherNow(city))
  useEffect(() => {
    dispatch(getStates())
  }, [dispatch])
  return { states, getCities, cities, getWeather, weather }
}
