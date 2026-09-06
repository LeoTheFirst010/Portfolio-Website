// Start in light mode before the page is displayed.
(() => {
    const root = document.documentElement;
    let theme = "light";

    root.dataset.theme = theme;

    document.addEventListener("DOMContentLoaded", () => {
        const toggle = document.querySelector(".theme-toggle");

        function updateTheme() {
            root.dataset.theme = theme;
            if (toggle) {
                toggle.setAttribute("aria-pressed", String(theme === "dark"));
                toggle.textContent = theme === "dark" ? "Dark mode" : "Light Mode";
                toggle.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
            }
        }

        if (toggle) {
            toggle.hidden = false;
            updateTheme();
            toggle.addEventListener("click", () => {
                theme = theme === "dark" ? "light" : "dark";
                updateTheme();
            });
        }

        const copyButton = document.querySelector(".copy-email");
        const emailLink = document.querySelector('a[href^="mailto:"]');
        const status = document.querySelector(".copy-status");

        if (copyButton && emailLink && status) {
            copyButton.hidden = false;
            copyButton.addEventListener("click", async () => {
                const email = emailLink.getAttribute("href").slice(7).split("?")[0];
                copyButton.disabled = true;
                status.textContent = "";

                try {
                    await navigator.clipboard.writeText(email);
                    status.textContent = "Email address copied!";
                } catch {
                    status.textContent = `Couldn't copy automatically. Select and copy: ${email}`;
                } finally {
                    copyButton.disabled = false;
                }
            });
        }
    });
})();
