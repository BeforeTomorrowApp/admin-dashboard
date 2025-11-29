import { beforeEach, vi } from "vitest";
export * from "@testing-library/react";

// Mocking local storage implementation
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

window.localStorage = localStorageMock as Storage;
beforeEach(() => {
  localStorage.clear();
  vi.clearAllMocks();
});
