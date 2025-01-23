import React from "react";
import { vi } from "vitest";

export const mockRouter = {
  push: vi.fn(),
};

vi.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
}));

export function withRouter<P extends object>(Component: React.ComponentType<P>, props: P) {
  return React.createElement(Component, props);
} 