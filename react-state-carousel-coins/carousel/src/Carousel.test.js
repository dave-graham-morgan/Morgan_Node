import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";
import App from "./App";

it("renders without crashing", () => {
  render(<App />);
})

it("matches Snapshot", ()=>{
  const {asFragment} = render(<App />);
  expect(asFragment()).toMatchSnapshot();
})

it("works when you click on the left arrow", ()=>{
  const {container} = render(
      <Carousel
        photos={TEST_IMAGES}
        title="images for testing"
        />
  );
  expect(
      container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
      container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();
  expect(
      container.querySelector('img[alt="testing image 3"]')
  ).not.toBeInTheDocument();

  //move the carosel back
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);

  //check the right images are showing
  expect(
      container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
      container.querySelector('img[alt="testing image 3"]')
  ).toBeInTheDocument();
  expect(
      container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();
})


it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});
