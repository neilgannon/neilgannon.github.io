// Small progressive enhancements. The page still works if this file fails to load.

(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // --- Videos: play only while on screen, with a pause button on each --------------
    // Keeps bandwidth and CPU down, and gives visitors a way to stop moving content.
    const videos = document.querySelectorAll(".media video");

    videos.forEach((video) => {
        const toggle = document.createElement("button");
        toggle.type = "button";
        toggle.className = "media__toggle";
        video.after(toggle);

        const sync = () => {
            const playing = !video.paused;
            toggle.textContent = playing ? "❚❚" : "▶";
            toggle.setAttribute("aria-label", playing ? "Pause video" : "Play video");
        };
        video.addEventListener("play", sync);
        video.addEventListener("pause", sync);
        sync();

        toggle.addEventListener("click", () => {
            video.dataset.userPaused = video.paused ? "" : "true";
            if (video.paused) video.play().catch(() => {});
            else video.pause();
        });
    });

    if (!reduceMotion && "IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            for (const { target, isIntersecting } of entries) {
                if (isIntersecting && target.dataset.userPaused !== "true") {
                    target.play().catch(() => {});
                } else if (!isIntersecting) {
                    target.pause();
                }
            }
        }, { threshold: 0.5 });
        videos.forEach((video) => observer.observe(video));
    }

    // --- Syntax highlighting for <code data-lang="cpp|csharp"> -----------------------
    const KEYWORDS = new Set((
        "alignas auto bool break case catch char class const constexpr continue default delete do " +
        "double else enum explicit extern false float for friend if inline int int8 int16 int32 int64 " +
        "uint8 uint16 uint32 uint64 long mutable namespace new noexcept nullptr operator override " +
        "private protected public return short signed sizeof static struct switch template this " +
        "throw true try typedef typename union unsigned using virtual void volatile while " +
        "abstract as base foreach get in interface internal is null object out params readonly ref " +
        "sealed set string var async await"
    ).split(" "));

    const TOKEN = new RegExp([
        /(\/\/.*|\/\*[\s\S]*?\*\/)/,          // 1 comment
        /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/, // 2 string
        /(^[ \t]*#\s*\w+)/,                   // 3 preprocessor
        /(\b\d+(?:\.\d+)?f?\b)/,               // 4 number
        /\b([A-Za-z_]\w*)\b(?=\s*\()/,         // 5 function call / definition
        /\b([A-Za-z_]\w*)\b/,                  // 6 identifier
    ].map((r) => r.source).join("|"), "gm");

    const escape = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    // Wrap each line separately so multi-line comments don't break the per-line spans below.
    const wrap = (cls, s) => s.split("\n").map((part) => `<span class="tok-${cls}">${escape(part)}</span>`).join("\n");

    const classify = (word, isCall) => {
        if (KEYWORDS.has(word)) return "keyword";
        if (/^[A-Z][A-Z0-9_]{2,}$/.test(word)) return "macro";            // UCLASS, GENERATED_BODY
        if (isCall) return "fn";
        if (/^[UAFTEIS][A-Z][a-z]\w*$/.test(word)) return "type";         // Unreal prefixes: FVector, UObject...
        if (/^(TArray|TMap|TSet|FMath|FString|FName)$/.test(word)) return "type";
        return null;
    };

    const highlight = (source) => {
        let out = "";
        let last = 0;
        source.replace(TOKEN, (match, comment, string, pre, number, call, ident, offset) => {
            out += escape(source.slice(last, offset));
            last = offset + match.length;
            if (comment) out += wrap("comment", match);
            else if (string) out += wrap("string", match);
            else if (pre) out += wrap("keyword", match);
            else if (number) out += wrap("number", match);
            else {
                const cls = classify(call || ident, Boolean(call));
                out += cls ? wrap(cls, match) : escape(match);
            }
            return match;
        });
        out += escape(source.slice(last));
        // one span per line so CSS can draw line numbers
        return out.split("\n").map((line) => `<span class="line">${line || " "}</span>`).join("");
    };

    document.querySelectorAll("code[data-lang]").forEach((block) => {
        block.innerHTML = highlight(block.textContent);
    });

    // --- Footer year -----------------------------------------------------------------
    document.querySelectorAll("[data-year]").forEach((el) => {
        el.textContent = new Date().getFullYear();
    });
})();
