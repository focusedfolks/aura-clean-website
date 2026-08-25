import { useEffect, useState } from "react";

const DISMISS_KEY = "aura-install-dismissed-at";
const DISMISS_DAYS = 7;

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function wasDismissedRecently() {
  try {
    const raw = localStorage.getItem(DISMISS_KEY);
    if (!raw) return false;
    const at = Number(raw);
    if (!Number.isFinite(at)) return false;
    return Date.now() - at < DISMISS_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    // iOS Safari
    ("standalone" in navigator && Boolean((navigator as Navigator & { standalone?: boolean }).standalone))
  );
}

function isIos() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

export function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [open, setOpen] = useState(false);
  const [iosHint, setIosHint] = useState(false);

  useEffect(() => {
    if (isStandalone() || wasDismissedRecently()) return;

    let opened = false;
    const show = () => {
      if (opened) return;
      opened = true;
      setOpen(true);
    };

    const onBeforeInstall = (event: Event) => {
      event.preventDefault();
      setDeferred(event as BeforeInstallPromptEvent);
      window.setTimeout(show, 1600);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstall);

    const startAfterOffer = () => {
      if (isIos()) {
        window.setTimeout(() => {
          setIosHint(true);
          show();
        }, 1400);
      } else {
        window.setTimeout(() => {
          if (!opened) show();
        }, 2800);
      }
    };

    window.addEventListener("aura-offer-popup-ready", startAfterOffer, { once: true });
    const fallback = window.setTimeout(startAfterOffer, 14000);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("aura-offer-popup-ready", startAfterOffer);
      window.clearTimeout(fallback);
    };
  }, []);

  const dismiss = () => {
    setOpen(false);
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {
      /* ignore */
    }
  };

  const install = async () => {
    if (!deferred) return;
    await deferred.prompt();
    const choice = await deferred.userChoice;
    setDeferred(null);
    setOpen(false);
    if (choice.outcome === "dismissed") {
      try {
        localStorage.setItem(DISMISS_KEY, String(Date.now()));
      } catch {
        /* ignore */
      }
    }
  };

  if (!open) return null;

  return (
    <div className="install-prompt" role="dialog" aria-modal="true" aria-labelledby="install-title">
      <div className="install-prompt-backdrop" onClick={dismiss} aria-hidden="true" />
      <div className="install-prompt-card">
        <button type="button" className="install-prompt-close" onClick={dismiss} aria-label="Close">
          ×
        </button>
        <div className="install-prompt-brand">
          <img src="/pwa-192.png" alt="" width={56} height={56} />
          <div>
            <p className="install-prompt-kicker">Aura Clean app</p>
            <h2 id="install-title">Install for faster shopping</h2>
          </div>
        </div>
        <p className="install-prompt-copy">
          {iosHint
            ? "Add Aura Clean to your Home Screen for a full-screen app experience, quick access, and offline browsing."
            : deferred
              ? "Install the Aura Clean app on your phone for one-tap access, a home-screen icon, and a smoother mobile shop."
              : "Install Aura Clean like an app: open your browser menu and tap Install app or Add to Home screen."}
        </p>
        {iosHint ? (
          <ol className="install-prompt-steps">
            <li>Tap the Share button in Safari</li>
            <li>Choose Add to Home Screen</li>
            <li>Tap Add</li>
          </ol>
        ) : null}
        <div className="install-prompt-actions">
          {!iosHint && deferred ? (
            <button type="button" className="install-prompt-cta" onClick={() => void install()}>
              Install app
            </button>
          ) : null}
          <button type="button" className="install-prompt-later" onClick={dismiss}>
            {iosHint || !deferred ? "Got it" : "Not now"}
          </button>
        </div>
      </div>
    </div>
  );
}
