import { useContext } from "react";
import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import RegionProvider, { RegionContext } from "./RegionContext";

// Test component that uses the context
function TestComponent() {
  const { region, addressFormat, updateRegion } = useContext(RegionContext);

  return (
    <div>
      <div data-testid="region">{region}</div>
      <div data-testid="format">{addressFormat}</div>
      <button data-testid="us-button" onClick={() => updateRegion("US")}>
        Change to US
      </button>
      <button data-testid="cn-button" onClick={() => updateRegion("CN")}>
        Change to US
      </button>
    </div>
  );
}

describe("RegionContext", () => {
  it("provides default CN region", () => {
    render(
      <RegionProvider>
        <TestComponent />
      </RegionProvider>
    );
    expect(screen.getByText("CN")).toBeTruthy();
    expect(screen.getByText("country-first")).toBeTruthy();
  });

  it("updates region when updateRegion is called", async () => {
    render(
      <RegionProvider>
        <TestComponent />
      </RegionProvider>
    );
    const changeUSButton = screen.getByTestId("us-button");
    fireEvent.click(changeUSButton);
    expect(screen.getByText("US")).toBeTruthy();
    expect(screen.getByText("building-first")).toBeTruthy();

    const changeCNButton = screen.getByTestId("cn-button");
    fireEvent.click(changeCNButton);
    expect(screen.getByText("CN")).toBeTruthy();
    expect(screen.getByText("country-first")).toBeTruthy();
  });
});
