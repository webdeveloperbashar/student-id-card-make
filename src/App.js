import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Students from "./page/Students";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" component={Students} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
