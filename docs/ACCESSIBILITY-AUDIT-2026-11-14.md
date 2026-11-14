# Confirmed audit fixes —14November2026

Lighthouse/axe detected label-content-name-mismatch despite a weighted accessibility score of100. The shared language button now begins its accessible name with the visible EN/FR/DE/ES/NL code. Its localized purpose remains. CineRovo's global country/language summary includes its visible selection; Upip plan buttons use their visible text as the accessible name. These changes support speech input and screen readers; they do not alter prices, drafts, design or index controls.

References: WCAG2.2 Understanding2.5.3, https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html; Vercel Web Interface Guidelines. Public/private and analytics-consent gates are unchanged. Tool scores do not measure rankings or certify complete accessibility conformance.

A broader axe-core4.14 check also found the floating contact outside landmarks. It is now inside a named complementary landmark without changing fixed placement. Upip poster buttons derive their name from all visible content. TV Empire’s two theme galleries have distinct landmark names. Manual colour-contrast reviews and other incomplete automated checks remain separate from zero detected violations.
