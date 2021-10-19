// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routes/home";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
