import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { Button } from "@/components/Button";
import { type ButtonProps } from "@/components/Button";

const feature = loadFeature("./src/__tests__/features/button.feature");

defineFeature(feature, (test) => {
  let handleClick: jest.Mock;

  test("Button renders with correct text", ({ given, then }) => {
    given(/^I have a "(.*)" button with text "(.*)"$/, (variant, text) => {
      render(<Button variant={variant}>{text}</Button>);
    });

    then(/^it should display the text "(.*)"$/, (text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  test("Button calls the onClick handler", ({ given, when, then }) => {
    given(/^I have a "(.*)" button$/, (variant) => {
      handleClick = jest.fn();
      render(
        <Button variant={variant} onClick={handleClick}>
          Click
        </Button>
      );
    });

    when("I click the button", () => {
      fireEvent.click(screen.getByRole("button"));
    });

    then("the click handler should be called", () => {
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  test("Button shows loading spinner when pending", ({ given, then }) => {
    given(/^I have a "(.*)" button that is pending$/, (variant) => {
      render(
        <Button variant={variant} isPending>
          Click
        </Button>
      );
    });

    then("I should see a loading spinner", () => {
      expect(screen.getByRole("status")).toBeInTheDocument();
    });
  });
});
