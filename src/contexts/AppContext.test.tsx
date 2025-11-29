import { useContext } from "react";
import { describe, vi, it, expect, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import AppContextProvider, { AppContext } from "./AppContext";
import { LOCALSTORAGE_KEY } from "@/consts/app-config";

// Test component that uses the context
function TestComponent() {
  const { language, addressFormat, updateLanguage } = useContext(AppContext);

  return (
    <div>
      <div data-testid="region">{language}</div>
      <div data-testid="format">{addressFormat}</div>
      <button data-testid="en-button" onClick={() => updateLanguage("EN")}>
        Change to US
      </button>
      <button data-testid="zh-button" onClick={() => updateLanguage("ZH")}>
        Change to US
      </button>
    </div>
  );
}

describe("RegionContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("provides default CN region", () => {
    render(
      <AppContextProvider>
        <TestComponent />
      </AppContextProvider>
    );
    expect(screen.getByText("ZH")).toBeTruthy();
    expect(screen.getByText("country-first")).toBeTruthy();
  });

  it("updates region when updateLanguage is called", async () => {
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

  it("persists language to localStorage", () => {
    render(
      <AppContextProvider>
        <TestComponent />
      </AppContextProvider>
    );

    const changeENButton = screen.getByTestId("en-button");
    fireEvent.click(changeENButton);
    let storedData = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY) || "{}");
    expect(storedData.language).toEqual("EN");
    expect(screen.getByText("EN")).toBeTruthy();

    const changeZHButton = screen.getByTestId("zh-button");
    fireEvent.click(changeZHButton);
    storedData = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY) || "{}");
    expect(storedData.language).toEqual("ZH");
    expect(screen.getByText("ZH")).toBeTruthy();
  });

  it("loads language from localStorage on mount", async () => {
    vi.resetModules(); // clear modules to allow modules been loaded after local storage setup
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify({ language: "EN" }));
    // Dynamically import the module AFTER setting localStorage
    const { default: AppContextProvider, AppContext } = await import("./AppContext");
    function LocalTestComponent() {
      const { language, addressFormat } = useContext(AppContext);
      return (
        <div>
          <div data-testid="region">{language}</div>
          <div data-testid="format">{addressFormat}</div>
        </div>
      );
    }
    render(
      <AppContextProvider>
        <LocalTestComponent />
      </AppContextProvider>
    );
    expect(screen.getByText("EN")).toBeTruthy();
    expect(screen.getByText("building-first")).toBeTruthy();
  });
});
