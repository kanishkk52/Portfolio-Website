
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import "../styles/creative-terminal.css";

const welcomeMessage = [
  {
    type: "system",
    text: "Welcome to the KK® Creative Terminal.",
  },
  {
    type: "system",
    text: 'Type "help" to explore available commands.',
  },
];

const commands = {
  help: {
    type: "response",
    lines: [
      "AVAILABLE COMMANDS",
      "",
      "about       — Who's behind the pixels?",
      "work        — Explore selected projects.",
      "contact     — Let's make something happen.",
      "coffee      — Essential creative fuel.",
      "secret      — Something unexpected.",
      "whoami      — Discover who's behind the pixels.",
      "theme       — Switch between light and dark mode.",
      "theme light — Activate light mode.",
      "theme dark  — Activate dark mode.",
      "clear       — Clear the terminal.",
      "exit        — Close the terminal.",
    ],
  },

  about: {
    type: "navigate",
    path: "/about",
    message: "Taking you behind the pixels...",
  },

  work: {
    type: "navigate",
    path: "/work",
    message: "Opening the creative archive...",
  },

  contact: {
    type: "navigate",
    path: "/contact",
    message: "Let's make something happen.",
  },

  coffee: {
    type: "response",
    lines: [
      "BREWING CREATIVITY...",
      "",
      "████████████████ 100%",
      "",
      "Fuel acquired.",
      "Ideas loading. Deadlines approaching.",
      "Everything is perfectly under control. Probably.",
    ],
  },

  secret: {
    type: "response",
    lines: [
      "YOU FOUND SOMETHING.",
      "",
      "Behind every pixel is a person.",
      "Behind every design is a hundred tiny decisions.",
      "",
      "Thanks for exploring KK's Canvas.",
      "You're officially one of the curious ones.",
      "",
      "— Kanishk Kukreja ®",
    ],
  },
  
  whoami: {
    type: "response",
    lines: [
      "IDENTITY FOUND.",
      "",
      "NAME       : KANISHK KUKREJA",
      "ROLE       : GRAPHIC DESIGNER",
      "LOCATION   : INDIA",
      "",
      "SPECIAL ABILITIES",
      "- Turning ideas into identities.",
      "- Obsessing over typography.",
      "- Moving elements 2px to the left.",
      '- Saying "one last revision."',
      "",
      "STATUS: STILL CREATING.",
    ],
  },

};

export default function CreativeTerminal({
  theme = "light",
  onToggleTheme,
}) {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [output, setOutput] = useState(welcomeMessage);

  const inputRef = useRef(null);
  const outputRef = useRef(null);

  // Close terminal
  const closeTerminal = useCallback(() => {
    setIsOpen(false);
    setInput("");
    setHistoryIndex(-1);
  }, []);

  // Global keyboard shortcut
  useEffect(() => {
    const handleGlobalKeyDown = (event) => {
      const target = event.target;

      const isTyping =
        target instanceof HTMLElement &&
        (
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable
        );

      if (event.key === "Escape" && isOpen) {
        closeTerminal();
        return;
      }

      if (
        event.key.toLowerCase() === "k" &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey &&
        !isTyping
      ) {
        event.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);

    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [isOpen, closeTerminal]);

  // Focus input when terminal opens
  useEffect(() => {
    if (isOpen) {
      const frame = requestAnimationFrame(() => {
        inputRef.current?.focus();
      });

      return () => cancelAnimationFrame(frame);
    }
  }, [isOpen]);

  // Keep latest terminal output visible
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop =
        outputRef.current.scrollHeight;
    }
  }, [output]);

  // Execute terminal commands
  const executeCommand = (event) => {
    event.preventDefault();

    const commandText = input.trim().toLowerCase();

    if (!commandText) return;

    setHistory((previous) => [...previous, commandText]);
    setHistoryIndex(-1);

    setOutput((previous) => [
      ...previous,
      {
        type: "command",
        text: `visitor@kk-canvas:~$ ${commandText}`,
      },
    ]);

    setInput("");

    // THEME COMMAND
    if (
      commandText === "theme" ||
      commandText === "theme light" ||
      commandText === "theme dark"
    ) {
      const requestedTheme = commandText.split(" ")[1];

      const nextTheme =
        requestedTheme ||
        (theme === "light" ? "dark" : "light");

      if (nextTheme === theme) {
        setOutput((previous) => [
          ...previous,
          {
            type: "response",
            text: `You're already in ${theme} mode.`,
          },
        ]);
        return;
      }

      if (!onToggleTheme) {
        setOutput((previous) => [
          ...previous,
          {
            type: "error",
            text: "Theme control is not connected.",
          },
        ]);
        return;
      }

      onToggleTheme();

      setOutput((previous) => [
        ...previous,
        {
          type: "system",
          text: `Switching to ${nextTheme.toUpperCase()} MODE...`,
        },
        {
          type: "response",
          text:
            nextTheme === "dark"
              ? "Lights out. Welcome to the dark side."
              : "Back to the bright side. Looking good.",
        },
      ]);

      return;
    }

    // CLEAR COMMAND
    if (commandText === "clear") {
      setOutput([]);
      return;
    }

    // EXIT COMMAND
    if (commandText === "exit") {
      closeTerminal();
      return;
    }

    // FIND COMMAND
    const command = commands[commandText];

    if (!command) {
      setOutput((previous) => [
        ...previous,
        {
          type: "error",
          text: `Command not found: ${commandText}`,
        },
        {
          type: "system",
          text: 'Try "help" to see what you can do.',
        },
      ]);
      return;
    }

    // NAVIGATION COMMANDS
    if (command.type === "navigate") {
      setOutput((previous) => [
        ...previous,
        {
          type: "system",
          text: command.message,
        },
      ]);

      setTimeout(() => {
        closeTerminal();
        navigate(command.path);
      }, 450);

      return;
    }

    // NORMAL RESPONSE COMMANDS
    setOutput((previous) => [
      ...previous,
      ...command.lines.map((line) => ({
        type: "response",
        text: line || "\u00A0",
      })),
    ]);
  };

  // Command history navigation
  const handleInputKeyDown = (event) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();

      if (history.length === 0) return;

      const nextIndex =
        historyIndex === -1
          ? history.length - 1
          : Math.max(0, historyIndex - 1);

      setHistoryIndex(nextIndex);
      setInput(history[nextIndex]);
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();

      if (historyIndex === -1) return;

      const nextIndex = historyIndex + 1;

      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className={`creative-terminal-overlay terminal-${theme}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          closeTerminal();
        }
      }}
    >
      <section
        className="creative-terminal"
        role="dialog"
        aria-modal="true"
        aria-label="KK Creative Terminal"
      >
        {/* TERMINAL HEADER */}
        <div className="terminal-header">
          <div className="terminal-brand">
            <span className="terminal-brand-mark">KK®</span>
            <span>CREATIVE TERMINAL</span>
          </div>

          <div className="terminal-header-right">
            <span className="terminal-status">
              <span className="terminal-status-dot" />
              ONLINE
            </span>

            <button
              type="button"
              className="terminal-close"
              onClick={closeTerminal}
              aria-label="Close terminal"
            >
              ×
            </button>
          </div>
        </div>

        {/* TERMINAL CONTENT */}
        <div
          className="terminal-output"
          ref={outputRef}
          onClick={() => inputRef.current?.focus()}
        >
          <div className="terminal-welcome">
            <pre>
{` _  __ _  __
| |/ /| |/ /
| ' / | ' /
| . \\ | . \\
|_|\\_\\|_|\\_\\`}
            </pre>

            <div>
              <span className="terminal-accent">
                KK® CREATIVE STUDIO
              </span>
              <span>VERSION 1.0.26</span>
            </div>
          </div>

          <div className="terminal-divider" />

          {output.map((item, index) => (
            <div
              key={`${index}-${item.text}`}
              className={`terminal-line terminal-line-${item.type}`}
            >
              {item.text}
            </div>
          ))}

          {/* INPUT */}
          <form
            className="terminal-input-row"
            onSubmit={executeCommand}
          >
            <label htmlFor="terminal-command">
              visitor@kk-canvas:~$
            </label>

            <input
              ref={inputRef}
              id="terminal-command"
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleInputKeyDown}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck="false"
              aria-label="Enter a terminal command"
              placeholder="type a command..."
            />

            <span className="terminal-input-cursor" />
          </form>
        </div>

        {/* TERMINAL FOOTER */}
        <div className="terminal-footer">
          <span>BUILT WITH CURIOSITY.</span>
          <span>PRESS ESC TO EXIT</span>
        </div>
      </section>
    </div>,
    document.body
  );
}
