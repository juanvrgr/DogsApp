import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Card from "./components/Card.jsx";

test("Render breed name", () => {
  const array = ["Name"];
  const component = render(<Card name={array} />);
  expect(component.container).toHaveTextContent("Name");
});
test("Render temperament", () => {
  const array = ["Temperament"];
  const component = render(<Card arrayTemp={array} />);
  expect(component.container).toHaveTextContent("Temperament");
});