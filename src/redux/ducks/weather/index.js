import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import Usa from "../../../components/cities.json"
import shortid from "shortid"

//action names
const GET_WEATHER = "weather/GET_WEATHER"
const GET_STATES = "weather/GET_STATES"
const GET_CITIES = "weather/GET_CITIES"
const GET_TODAYS_WEATHER = "weather/GET_TODAYS_WEATHER"
//reducer
const initialState = {
  states: [],
  cities: [],
  weather: [],
  today: {},
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_STATES:
      return { ...state, states: action.payload }
    case GET_CITIES:
      return { ...state, cities: action.payload }
    case GET_WEATHER:
      return { ...state, weather: action.payload }
    case GET_TODAYS_WEATHER:
      return { ...state, today: action.payload }
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
    let finalCities = cities.map((item) => item.city).sort()

    dispatch({
      type: GET_CITIES,
      payload: finalCities,
    })
  }
}
const apiKey = "17206ea6a26761548da827869b4b3237"

function getTodaysWeather(city) {
  let newCity = city.toLowerCase()
  return (dispatch) => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=${apiKey}`
      )
      .then((resp) => {
        const data = resp.data
        //grabbing the data I want
        let minTemp = data.main.temp_min
        let maxTemp = data.main.temp_max
        let weather = data.main.main
        let temp = data.main.temp
        let feelsLike = data.main.feels_like
        let humidity = data.main.humidity
        let windSpeed = data.wind.speed
        //converting from Kelvin to  Fahrenheit and wind speed from meter/sec to mile/hour
        let minTempF = Math.round(((minTemp - 273.15) * 9) / 5 + 32)
        let maxTempF = Math.round(((maxTemp - 273.15) * 9) / 5 + 32)
        let tempF = Math.round(((temp - 273.15) * 9) / 5 + 32)
        let feelsLikeF = Math.round(((feelsLike - 273.15) * 9) / 5 + 32)

        let windSpeedMH = Math.round(windSpeed * 2.237)

        const today = {
          minTempF,
          maxTempF,
          tempF,
          feelsLikeF,
          weather,
          humidity,
          windSpeedMH,
        }
        dispatch({
          type: GET_TODAYS_WEATHER,
          payload: today,
        })
      })
  }
}

function get5DayWeatherNow(city) {
  let newCity = city.toLowerCase()
  return (dispatch) => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/forecast?q=${newCity}&appid=${apiKey}`
      )
      .then((resp) => {
        const data = resp.data.list

        let weather5day = data.filter((item) =>
          item.dt_txt.includes("12:00:00")
        )
        let day1 = []
        let day2 = []
        let day3 = []
        let day4 = []
        let day5 = []
        //looping thru to build day arrays
        for (let i = 0; i < data.length; i++) {
          if (i <= 7) {
            day1.push(data[i])
          } else if (i >= 8 && i <= 15) {
            day2.push(data[i])
          } else if (i >= 16 && i <= 23) {
            day3.push(data[i])
          } else if (i >= 24 && i <= 31) {
            day4.push(data[i])
          } else {
            day5.push(data[i])
          }
        }
        //getting just the temps
        let day1Avg = day1.map((item) => item.main.temp)
        let day2Avg = day2.map((item) => item.main.temp)
        let day3Avg = day3.map((item) => item.main.temp)
        let day4Avg = day4.map((item) => item.main.temp)
        let day5Avg = day5.map((item) => item.main.temp)
        //finding the max and min of temps
        let day1maxAvgTotal = Math.max(...day1Avg)
        let day1minAvgTotal = Math.min(...day1Avg)
        let day2maxAvgTotal = Math.max(...day2Avg)
        let day2minAvgTotal = Math.min(...day2Avg)
        let day3maxAvgTotal = Math.max(...day3Avg)
        let day3minAvgTotal = Math.min(...day3Avg)
        let day4maxAvgTotal = Math.max(...day4Avg)
        let day4minAvgTotal = Math.min(...day4Avg)
        let day5maxAvgTotal = Math.max(...day5Avg)
        let day5minAvgTotal = Math.min(...day5Avg)
        //converting from Kelvin to  Fahrenheit
        let day1maxAvgF = Math.round(((day1maxAvgTotal - 273.15) * 9) / 5 + 32)
        let day1minAvgF = Math.round(((day1minAvgTotal - 273.15) * 9) / 5 + 32)
        let day2maxAvgF = Math.round(((day2maxAvgTotal - 273.15) * 9) / 5 + 32)
        let day2minAvgF = Math.round(((day2minAvgTotal - 273.15) * 9) / 5 + 32)
        let day3maxAvgF = Math.round(((day3maxAvgTotal - 273.15) * 9) / 5 + 32)
        let day3minAvgF = Math.round(((day3minAvgTotal - 273.15) * 9) / 5 + 32)
        let day4maxAvgF = Math.round(((day4maxAvgTotal - 273.15) * 9) / 5 + 32)
        let day4minAvgF = Math.round(((day4minAvgTotal - 273.15) * 9) / 5 + 32)
        let day5maxAvgF = Math.round(((day5maxAvgTotal - 273.15) * 9) / 5 + 32)
        let day5minAvgF = Math.round(((day5minAvgTotal - 273.15) * 9) / 5 + 32)
        //Creating the day names from the date object
        let days = weather5day.map((item, i) => {
          const date = new Date(item.dt_txt)
          let dayNumber = date.getDay()
          let day = ""
          dayNumber === 0
            ? (day = "Sunday")
            : dayNumber === 1
            ? (day = "Monday")
            : dayNumber === 2
            ? (day = "Tuesday")
            : dayNumber === 3
            ? (day = "Wednesday")
            : dayNumber === 4
            ? (day = "Thursday")
            : dayNumber === 5
            ? (day = "Friday")
            : (day = "Saturday")

          return {
            day,
            weather: item.weather[0].main,
            minTemp:
              i === 0
                ? day1minAvgF
                : i === 1
                ? day2minAvgF
                : i === 2
                ? day3minAvgF
                : i === 3
                ? day4minAvgF
                : day5minAvgF,
            maxTemp:
              i === 0
                ? day1maxAvgF
                : i === 1
                ? day2maxAvgF
                : i === 2
                ? day3maxAvgF
                : i === 3
                ? day4maxAvgF
                : day5maxAvgF,
          }
        })
        console.log(days)
        dispatch({
          type: GET_WEATHER,
          payload: days,
        })
      })
  }
}

//custom hooks
export function useWeather() {
  const dispatch = useDispatch()
  const states = useSelector(({ weatherReducer }) => weatherReducer.states)
  const cities = useSelector(({ weatherReducer }) => weatherReducer.cities)
  const today = useSelector(({ weatherReducer }) => weatherReducer.today)
  const weather5days = useSelector(
    ({ weatherReducer }) => weatherReducer.weather
  )
  const getCities = (state) => dispatch(getTheCities(state))
  const getToday = (city) => dispatch(getTodaysWeather(city))
  const get5DayWeather = (city) => dispatch(get5DayWeatherNow(city))
  useEffect(() => {
    dispatch(getStates())
  }, [dispatch])
  return {
    states,
    getCities,
    cities,
    get5DayWeather,
    weather5days,
    today,
    getToday,
  }
}
