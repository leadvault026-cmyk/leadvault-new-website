# START HERE — How to Use This Package in Claude Code (VS Code)

## What's in this package

```
leadvault-code-package/
├── START-HERE-UPLOAD-ORDER.md        ← this file (delete after setup)
├── CLAUDE.md                          ← master build instructions (Claude Code reads this automatically)
├── .claude/
│   └── settings.json                  ← pre-approved permissions (stops most yes/no prompts)
├── content/
│   └── leadvault-website-copy-v5.md   ← every word of the website
└── reference/
    └── leadvault-development-handoff-brief.md  ← stack, icons, images, hosting, analytics
```

## Why you won't be asked for decisions

1. **CLAUDE.md** — Claude Code automatically reads this file at the start of every session. It contains every decision already made (stack, colors, pages, forms, what NOT to do) and the explicit instruction: *make reasonable assumptions, record them in ASSUMPTIONS.md, and keep building — do not stop to ask.*
2. **.claude/settings.json** — pre-approves the safe commands the build needs (creating files, npm installs, running the dev server, git commits), so Claude Code won't pause to ask permission for each one. Dangerous commands (force-pushes, deleting everything, downloading from the internet) remain blocked on purpose. If Claude Code still asks about something outside this list once, choose "Yes, and don't ask again for this session."

## Setup — exact order (10 minutes, one time)

**Step 1.** Install prerequisites (if not already installed): Node.js LTS from nodejs.org, VS Code, and Claude Code (in VS Code: Extensions → search "Claude Code" → Install; or terminal: `npm install -g @anthropic-ai/claude-code`).

**Step 2.** Create your project folder, e.g. `Documents/leadvault-website`.

**Step 3.** Copy the contents of this package into that folder **in this order** (order matters only so nothing gets missed — CLAUDE.md and .claude must be at the ROOT of the folder, not inside a subfolder):
1. `CLAUDE.md` → project root
2. `.claude/settings.json` → keep inside the `.claude` folder at project root (note: `.claude` is a hidden folder — enable "show hidden files" if you don't see it)
3. `content/` folder (with the V5 copy inside)
4. `reference/` folder (with the handoff brief inside)
5. Delete this START-HERE file (optional, keeps the project clean)

**Step 4.** Open the folder in VS Code (File → Open Folder), open the terminal (Ctrl+` ), and run:
```
claude
```

**Step 5.** When Claude Code starts, press **Shift+Tab** once until the status line shows **"auto-accept edits"** — this lets it write files without asking you to approve each one.

**Step 6.** Paste this single message and press Enter:

> Read CLAUDE.md and both documents in content/ and reference/, then build the complete website to the definition of done. Do not stop to ask me questions — record any assumptions in ASSUMPTIONS.md.

**Step 7.** Let it run. When it finishes, run `npm run dev`, open the local address it prints (usually http://localhost:4321), and review the site in your browser.

## After the build

1. Review every page. Give Claude Code change requests in plain English ("make the hero headline bigger", "swap the order of services 2 and 3").
2. Read `ASSUMPTIONS.md` — approve or correct anything listed there.
3. Follow `reference/leadvault-development-handoff-brief.md` sections 4–5 for deployment (GitHub → Netlify → leadvaultdata.com) and analytics (GA4, Search Console, Meta Pixel).
4. Drop in your real images, numbers, prices, and contact details per the copy doc's pre-launch checklist — then launch-day checklist section 7 of the handoff brief.

## What NOT to upload to the code project

Keep the strategy documents — the Business Proposal, Social Media Playbook, and Gap Analysis — OUT of this folder. They would only add noise to the build context. They are execution documents for you, not for the website builder.
