import React from "react"
import { Card, Image, Dropdown } from "semantic-ui-react"
import Sunny from "../assets/sunny.png"
import ThunderStorm from "../assets/thunderstorm.png"
import Cloudy from "../assets/cloudy.png"
import Rainy from "../assets/rain.png"
import Snow from "../assets/snow.png"

import { useWeather } from "../redux/ducks/weather"

export default (props) => {
  const {
    states,
    getCities,
    cities,
    get5DayWeather,
    weather5days,
  } = useWeather()
  function handleStatesChange(e, { value }) {
    getCities(value)
  }
  function handleCitiesChange(e, { value }) {
    get5DayWeather(value)
  }
  return (
    <div>
      <h3>Choose your State then City</h3>
      <Dropdown
        onChange={handleStatesChange}
        placeholder="Choose a State"
        search
        selection
        options={states.map((item) => ({
          key: item,
          text: item,
          value: item,
        }))}
      />
      <Dropdown
        onChange={handleCitiesChange}
        placeholder="Choose a City"
        search
        selection
        options={cities.map((item) => ({
          key: item,
          text: item,
          value: item,
        }))}
      />
      <Card.Group>
        {weather5days.map((day) => (
          <Card key={`dayOfWeek-${day.day}`}>
            <Card.Content>
              <Card.Header style={{ textAlign: "center" }}>
                {day.day}
              </Card.Header>
              {day.weather === "Rain" ? (
                <Image src={Rainy} />
              ) : day.weather === "Clouds" ? (
                <Image src={Cloudy} />
              ) : day.weather === "Snow" ? (
                <Image src={Snow} />
              ) : day.weather === "ThunderStorm" ? (
                <Image src={ThunderStorm} />
              ) : (
                <Image src={Sunny} />
              )}
            </Card.Content>
            <Card.Content extra>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div>{day.minTemp}&#xb0;</div>
                <div>{day.maxTemp}&#xb0;</div>
              </div>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </div>
  )
}
