
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const positionRef = useRef({ x: 0, y: 0 });

  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;

    if (!cursor) return;

    const isDesktop = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );

    if (!isDesktop.matches) return;

    document.documentElement.classList.add("has-custom-cursor");

    const moveCursor = (event) => {
      positionRef.current = {
        x: event.clientX,
        y: event.clientY,
      };

      cursor.style.transform = `translate3d(
        ${event.clientX}px,
        ${event.clientY}px,
        0
      )`;

      setVisible(true);
    };

    const handlePointerOver = (event) => {
  const target = event.target.closest("[data-cursor-label]");

  if (target) {
    setLabel(target.dataset.cursorLabel || "");
  } else {
    setLabel("");
  }
};

    const handlePointerDown = () => {
      cursor.classList.add("cursor-pressed");
    };

    const handlePointerUp = () => {
      cursor.classList.remove("cursor-pressed");
    };

    const handlePointerLeave = () => {
      setVisible(false);
      setLabel("");
    };

    const handlePointerEnter = () => {
      setVisible(true);
    };

    document.addEventListener("pointermove", moveCursor);
    document.addEventListener("pointerover", handlePointerOver);
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("pointerup", handlePointerUp);

    document.addEventListener("pointerleave", handlePointerLeave);
    document.addEventListener("pointerenter", handlePointerEnter);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");

      document.removeEventListener("pointermove", moveCursor);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("pointerup", handlePointerUp);

      document.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("pointerenter", handlePointerEnter);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`custom-pen-cursor ${visible ? "cursor-visible" : ""} ${
        label ? "cursor-enlarge-mode" : ""
      }`}
      aria-hidden="true"
    >
      
<svg
  className="pen-cursor-icon"
  viewBox="0 0 32 32"
  fill="none"
>
  {/* Minimal pen tool cursor */}
  <path
    d="M3 3L9 25L14 17L22 14L3 3Z"
    fill="#D6F36A"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinejoin="round"
  />

  {/* Pen nib detail */}
  <path
    d="M3 3L14 17"
    stroke="currentColor"
    strokeWidth="1.2"
  />

  {/* Small anchor point */}
  <circle
    cx="14"
    cy="17"
    r="1.3"
    fill="currentColor"
  />
</svg>


      {label && (
        <span className="cursor-context-label">
          {label}
          <span className="cursor-label-arrow">↗</span>
        </span>
      )}
    </div>
  );
}
