import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PenguinHero } from "@/components/evolving/penguin-hero";
import { withRouter, mockRouter } from "../utils";

// Mock BaseComponent
vi.mock("@/components/evolving/base-component", () => ({
  BaseComponent: ({ children, initialContent, ...props }: any) => {
    return (
      <div {...props}>
        {typeof children === "function" ? children(initialContent) : children}
      </div>
    );
  },
}));

const defaultProps = {
  id: "test-hero",
  className: "test-class",
  initialContent: {
    title: "Le Pingouin qui Code",
    subtitle: "Aidez notre ami pingouin à devenir un meilleur développeur !",
    cta: {
      text: "Aider le pingouin",
      action: "/thank-you",
    },
    helpCount: 42,
    image: {
      src: "/penguin-coding.png",
      alt: "Pingouin qui code",
    },
  },
};

describe("PenguinHero", () => {
  beforeEach(() => {
    mockRouter.push.mockClear();
  });

  it("renders correctly", () => {
    render(withRouter(PenguinHero, defaultProps));
    expect(screen.getByText("Le Pingouin qui Code")).toBeInTheDocument();
    expect(screen.getByText(/Aidez notre ami pingouin/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Aider le pingouin" })).toBeInTheDocument();
    expect(screen.getByText(/42 personnes ont déjà aidé/)).toBeInTheDocument();
  });

  it("handles click on CTA button", async () => {
    render(withRouter(PenguinHero, defaultProps));
    const button = screen.getByRole("button", { name: "Aider le pingouin" });
    await fireEvent.click(button);
    expect(mockRouter.push).toHaveBeenCalledWith("/thank-you");
  });

  it("renders snow particles", () => {
    render(withRouter(PenguinHero, defaultProps));
    const snowParticles = document.querySelectorAll(".snow-particle");
    expect(snowParticles).toHaveLength(20);
  });
}); 