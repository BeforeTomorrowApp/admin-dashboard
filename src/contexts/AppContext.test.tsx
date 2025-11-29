import { useContext } from "react";
import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import AppContextProvider, { AppContext } from "./AppContext";

// Test component that uses the context
function TestComponent() {
  const { language, addressFormat, updateRegion } = useContext(AppContext);

  return (
    <div>
      <div data-testid="region">{language}</div>
      <div data-testid="format">{addressFormat}</div>
      <button data-testid="en-button" onClick={() => updateRegion("EN")}>
        Change to US
      </button>
      <button data-testid="zh-button" onClick={() => updateRegion("ZH")}>
        Change to US
      </button>
    </div>
  );
}

describe("RegionContext", () => {
  it("provides default CN region", () => {
    render(
      <AppContextProvider>
        <TestComponent />
      </AppContextProvider>
    );
    expect(screen.getByText("ZH")).toBeTruthy();
    expect(screen.getByText("country-first")).toBeTruthy();
  });

  it("updates region when updateRegion is called", async () => {
    render(
      <AppContextProvider>
        <TestComponent />
      </AppContextProvider>
    );
    const changeUSButton = screen.getByTestId("en-button");
    fireEvent.click(changeUSButton);
    expect(screen.getByText("EN")).toBeTruthy();
    expect(screen.getByText("building-first")).toBeTruthy();

    const changeCNButton = screen.getByTestId("zh-button");
    fireEvent.click(changeCNButton);
    expect(screen.getByText("ZH")).toBeTruthy();
    expect(screen.getByText("country-first")).toBeTruthy();
  });
});
