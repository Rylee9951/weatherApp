import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import "semantic-ui-css/semantic.min.css"
import store from "../redux/store"
import { Provider } from "react-redux"

import Home from "./Home"

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Route exact path="/" component={Home} />
        </div>
      </Router>
    </Provider>
  )
}

export default App
