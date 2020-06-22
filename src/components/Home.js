import React from "react"
import { Card, Image, Dropdown } from "semantic-ui-react"
import Sunny from "../assets/sunny.png"
import { useWeather } from "../redux/ducks/weather"

export default (props) => {
  const { states, getCities, cities, getWeather } = useWeather()
  function handleStatesChange(e, { value }) {
    getCities(value)
  }
  function handleCitiesChange(e, { value }) {
    getWeather(value)
  }
  return (
    <div>
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
          key: item.rank,
          text: item.city,
          value: item.city,
        }))}
      />
      <Card.Group>
        <Card>
          <Card.Content>
            <Card.Header style={{ textAlign: "center" }}>Monday</Card.Header>
            <Image src={Sunny} />
          </Card.Content>
          <Card.Content extra>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div>100&#xb0;</div>
              <div>80&#xb0;</div>
            </div>
          </Card.Content>
        </Card>
      </Card.Group>
    </div>
  )
}
