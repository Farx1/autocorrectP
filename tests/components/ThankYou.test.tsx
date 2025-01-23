import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThankYou } from "@/components/thank-you";
import { withRouter, mockRouter } from "../utils";
import { confettiMock } from "../setup";

describe("ThankYou", () => {
  beforeEach(() => {
    mockRouter.push.mockClear();
    confettiMock.mockClear();
  });

  it("renders correctly", () => {
    render(withRouter(ThankYou, {}));
    expect(screen.getByText("Merci d'avoir aidé le pingouin qui code !")).toBeInTheDocument();
    expect(screen.getByText("Retourner voir le pingouin")).toBeInTheDocument();
  });

  it("launches confetti on mount", () => {
    render(withRouter(ThankYou, {}));
    expect(confettiMock).toHaveBeenCalledWith({
      particleCount: 50,
      startVelocity: 30,
      spread: 360,
      origin: expect.objectContaining({
        x: expect.any(Number),
        y: expect.any(Number),
      }),
    });
  });

  it("renders hearts with animation", () => {
    render(withRouter(ThankYou, {}));
    const hearts = document.querySelectorAll(".animate-bounce");
    expect(hearts).toHaveLength(3);
  });
}); 