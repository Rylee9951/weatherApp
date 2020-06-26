import React from "react"
import { Card, Image, Dropdown } from "semantic-ui-react"

import "../styles/home.css"
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
    getToday,
    today,
  } = useWeather()

  function handleStatesChange(e, { value }) {
    getCities(value)
  }
  function handleCitiesChange(e, { value }) {
    get5DayWeather(value)
    getToday(value)
  }
  return (
    <div>
      <h3 style={{ textAlign: "center" }}>GetWeather Now</h3>
      <div style={{ marginBottom: "20px" }}>
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
          style={{ float: "right" }}
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
      </div>
      {Object.keys(today).length === 0 ? (
        ""
      ) : (
        <Card id="todaysWeather">
          <Card.Content>
            <Card.Header style={{ textAlign: "center", marginBottom: "5px" }}>
              Today
            </Card.Header>
            <Card.Header style={{ textAlign: "center", fontSize: "25px" }}>
              {today.tempF}&#xb0;
            </Card.Header>
            {today.weather === "Rain" ? (
              <Image src={Rainy} />
            ) : today.weather === "Clouds" ? (
              <Image src={Cloudy} />
            ) : today.weather === "Snow" ? (
              <Image src={Snow} />
            ) : today.weather === "ThunderStorm" ? (
              <Image src={ThunderStorm} />
            ) : (
              <Image src={Sunny} />
            )}
          </Card.Content>
          <Card.Content extra>
            <div className="todaysInfo">
              <div className="info">
                <div className="infoTop">
                  <strong>Low</strong>
                </div>
                <div className="infoBottom">{today.minTempF}&#xb0;</div>
              </div>
              <div className="info">
                <div className="infoTop">
                  <strong>High</strong>
                </div>
                <div className="infoBottom">{today.maxTempF}&#xb0;</div>
              </div>
              <div className="info">
                <div className="infoTop">
                  <strong>Humidity</strong>
                </div>
                <div className="infoBottom">{today.humidity}%</div>
              </div>
              <div className="info">
                <div className="infoTop">
                  <strong>Wind</strong>
                </div>
                <div className="infoBottom">{today.windSpeedMH} mph</div>
              </div>
              <div className="info">
                <div className="infoTop">
                  <strong>Feels Like</strong>
                </div>
                <div className="infoBottom"> {today.feelsLikeF}&#xb0;</div>
              </div>
            </div>
          </Card.Content>
        </Card>
      )}
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
