import "@testing-library/jest-dom/vitest";
import { expect, afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import React from "react";

// Étendre les matchers de expect
expect.extend(matchers);

// Nettoyer après chaque test
afterEach(() => {
    cleanup();
});

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: "div",
    h1: "h1",
    p: "p",
    button: "button",
    span: "span",
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock next/image
vi.mock("next/image", () => ({
  default: function Image({ src = "", alt = "", ...props }: any) {
    return React.createElement("img", { src, alt, ...props });
  },
}));

// Mock next/navigation
export const mockRouter = {
    push: vi.fn(),
};

vi.mock("next/navigation", () => ({
    useRouter: () => mockRouter,
}));

// Mock canvas-confetti
export const confettiMock = vi.fn();

vi.mock("canvas-confetti", () => ({
  default: confettiMock,
}));

// Mock useEvolvingComponent
vi.mock("@/hooks/useEvolvingComponent", () => ({
    useEvolvingComponent: ({ initialContent }: any) => ({
        component: {
            id: "test-id",
            type: "test-type",
            version: 1,
            content: initialContent,
            performance: {
                clicks: 0,
                viewTime: 0,
                conversions: 0,
                score: 0,
            },
            metadata: {},
        },
        ref: React.createRef(),
    }),
}));

// Mock BaseComponent
vi.mock("@/components/evolving/base-component", () => ({
  BaseComponent: ({ children, initialContent, ...props }: any) => {
    return React.createElement(
      "div",
      props,
      typeof children === "function" ? children(initialContent) : children
    );
  },
})); 