import Navigation from "./components/Navigation";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import routes from "./routes";

const App = () => {
  return (
    <div>
      <Navigation />
      <Container>
        <Routes>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                element={route.element}
                exact
              />
            );
          })}
        </Routes>
      </Container>
    </div>
  );
};

export default App;
