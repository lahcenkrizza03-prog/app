# upip-tv.com — SEO, AEO and implementation review

Reviewed 10 November 2026. This replaces earlier operational assumptions where they conflict. Source branch: main; static publishing branch: porkbun. The normal Vinext/Workers build remains supported by the source; the verified publishing target in this pass is the Porkbun static export.

## Decisions and changes

Germany remains the primary market. The website is German, the approved offers are in EUR, and the German search sample provides relevant demand. Neither Semrush nor Similarweb establishes a different leading audience for this new domain. Do not infer demand from a country name or duplicate these pages into additional country sites.

The owner reconfirmed all four one-device plans: 1 month €12, 3 months €29, 6 months €45, 12 months €59, including VAT. Preserve Anna Müller, the existing approved Berlin address/email, PayPal/bank-transfer options and the existing refund terms as owner-supplied details. These confirmations do not independently verify establishment, catalog rights or the complete legal framework.

Updated the international WhatsApp contact everywhere through the central configuration: **+1 (231) 335-4123 / 12313354123**. It is not presented as a German local number. Plan selection prepares a draft; the visitor sends it in WhatsApp. It is not an online payment or successful order.

The homepage now explains subscriptions, player versus service, devices and provider checks, with contextual links to the relevant guides. Search-specific headings replace vague headings on the device, channel-list, FAQ, contact and guide-index pages. The homepage heading includes the brand. Titles/descriptions remain unique and describe visible content.

Internal links now use the static profile's directory URLs, including query strings and anchors. A shared route helper also preserves the Worker profile. Mobile navigation supports Escape with focus return, outside clicks and closing when switching to desktop. Pricing cards retain their logical reading order and use larger, stacked mobile content. Query-driven category/genre filters now synchronize with URL state; resetting a filter clears its URL parameter. Consent initialization reads the browser store without synchronous setState effects and remains fail-closed when storage is unavailable.

## Measured keyword sample

Semrush, Germany database, Desktop, report 10 November 2026. Monthly volumes are estimates, not Upip traffic or current Upip positions. Difficulty is a vendor estimate, not a guarantee.

| Keyword | Monthly volume | KD | Primary destination |
| --- | ---: | ---: | --- |
| iptv abo | 590 | 20 | Homepage |
| iptv kaufen | 8,100 | 52 | Prices, as supporting wording for an enquiry |
| iptv deutschland | 1,900 | 48 | Homepage |
| iptv kosten | 210 | 14 | Cost and duration guide |
| iptv 1 monat | 20 | Unknown | Prices; retain approved one-month plan |
| iptv smart tv | 210 | 28 | Smart TV checklist |
| iptv einrichten | 90 | 21 | Device preparation page |
| iptv legal | 1,000 | 30 | Provider-evidence checklist, without asserting Upip's rights |

See [the page map](research/keyword-page-map.csv), [61 related terms](research/related-keywords.csv) and [five SERP page comparisons](research/competitor-page-gap.csv). Related terms need editorial/service-fit review; English/app-specific variations are not automatically targets. Avoid one near-identical page per phrase. This is a scoped sample, not every relevant keyword or a historical trend analysis.

## Search and authority baseline

Google URL Inspection freshly confirmed **all 14 public canonical Upip pages indexed** on 10 November. No individual repeat indexing requests were needed. Five legal drafts remain intentionally noindex and excluded from the sitemap. Private builds also remain noindex. An indexed page is not necessarily ranking prominently.

Search Console's available Upip data covers 7–8 November: 1 click, 3 impressions, overall average position 35.3. Two impressions came from Germany with zero clicks; the country report showed average position 49.5. The sample is too small for a reliable ranking or market conclusion. The 28-day report was also checked; the new domain has only these available days. Query/page/country tables must be read separately; hidden or stale UI tables are not extra observations.

Semrush domain overviews for Germany, Austria and Switzerland (report 9 November) return Authority Score and organic traffic/keywords **n/a**, with 0 observed referring domains and backlinks. Its backlink overview returns no matching results. Missing estimates are not proof of zero real traffic or no links. Irrelevant demo topic suggestions in the interface were excluded.

Similarweb, worldwide/all traffic, August–October 2026, returns insufficient data and N/A monthly visits. Its US country-rank label is not evidence that the US is Upip's main market. It cannot qualify a country-organic traffic target.

## Backlinks and evidence

Reviewed German SERP pages for subscription, purchase, costs, devices, installation and legality queries. Streamisly and IPTV Sehen are commercial references; IPTV-Anbieter.info is a publisher and Telekom is an operator/technical reference. Their own catalog, review and performance claims were not imported. IPTV Sehen's sampled ranking URL redirects to a different live path; the two URLs remain distinguished in the data.

SERP page link metrics are vendor estimates. Exact-URL backlink overview screens also include widgets explicitly scoped to the root domain; those widgets are not treated as page-level evidence. Streamisly's root-domain network is labeled “Suspicious” by Semrush and contains low-score/link-selling-anchor signals. This is a reason for manual review, not proof of misconduct or a reason to copy its links. No disavow action was taken.

The immediate editorial asset is the price/term comparison with reproducible calculations and the device checklist. Prospective coverage must earn an independent editor's interest. No outreach, backlink placement, link purchase, review creation or GSC-account connection to Semrush occurred. A complete referring-domain export and historical backlink audit remain outside the captured evidence.

## Current Google guidance

Checked the official [helpful-content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), [AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) and [spam policies](https://developers.google.com/search/docs/essentials/spam-policies). Useful crawlable answers, accurate entities, sources and ordinary technical SEO support both search and AI discovery. There is no Google-preferred word count, special required AI schema or guaranteed citation method. Optional llms.txt is not a Google ranking shortcut. FAQ rich results have been retired; useful visible FAQs remain. No fake Review, AggregateRating, checkout Offer or FAQ rich-result markup was added.

The current ranking history lists a November 2026 core update dated 10 November. Its full incident timeline was inaccessible in the source check, so no completion, effect on Upip or IPTV-specific boost is asserted. See [official ranking history](https://status.search.google.com/products/rGHU1u87FJnkP6W2GwMi/history).

## Remaining business work

Complete the applicable contract/withdrawal wording, hosting/privacy records, confirmed catalog and distribution rights for Germany, and actual device/app support before enabling online transactions or stronger service claims. The existing owner-confirmed refund policy remains separate from statutory withdrawal information. publicLaunchReady remains false. No payment credentials or processor integration were added.

Track country/query/page impressions, clicks, qualified enquiry conversions and successful crawl/indexing over comparable periods. A high tool score, sitemap submission or keyword insertion does not establish a ranking gain. Most of the eleven other new portfolio properties still report “Processing data”; no ranking improvement is claimed for them.

## Verification

- npm ci completed from the lockfile on Node 22.13.1.
- TypeScript check passed; all 9 business-rule tests passed, including query/hash-preserving static routes and four approved plan values.
- ESLint passed with no errors. Four native-image advisory warnings remain: these assets use the existing pre-optimized static/picture delivery rather than a runtime Next image optimizer.
- Static build passed: 19 content pages, 14 indexable / 5 legal drafts, plus the explicit 404 document. ZIP excludes source, server code, maps and Git metadata.
- All 19 browser checks passed. Coverage includes all page metadata/JSON-LD/indexing policies, navigation, exact plan enquiry destinations, consent, device/contact forms, genre/category links and reset state, 404 and internal links. Zero axe violations in the sampled WCAG A/AA desktop/tablet/mobile and key inner-page checks; automated checks do not establish complete accessibility compliance.
- Checked 320/390/820/1440px layouts; no horizontal page overflow or broken images. Desktop and mobile screenshots were visually inspected. The initial outside-click test targeted a heading underneath the open menu; it was corrected to click an actually exposed area, and the complete suite passed.
- Final local Lighthouse 13 lab run, headless installed Chrome, static uncompressed localhost preview: desktop 98 performance, 100 accessibility/best practices/SEO; mobile 79 performance, 100 accessibility/best practices/SEO. Desktop LCP 1.2s, CLS 0, TBT 20ms; mobile simulated throttling LCP 5.4s, CLS 0, TBT 90ms. These are synthetic measurements, not field Core Web Vitals or a Google ranking score. The framework's uncompressed client JavaScript remains the main performance opportunity; the current asset pipeline already supplies local fonts and responsive AVIF images. Production delivery/compression may differ.

The eleven existing portfolio homepages also returned HTTPS 200, unique single-H1 page metadata, expected self-canonicals and no public noindex in the scoped HTTP check. Their earlier complete 201-page technical/indexing audit remains a separate dated record. No broad source or deployment changes to those eleven sites were necessary based on this pass.

Fresh TVEmpire.net Search Console 28-day report (12 October–8 November) shows 1 click, 30 impressions, average position 41.3 overall; United States 8 impressions, zero clicks, position 27.8. The purchase page has two impressions at position 13.5. These very small samples are monitoring candidates, not proof of stable page-one/page-two visibility, and do not justify stuffing competitor names or obsolete years seen in queries into the copy. All ten newer portfolio reports still show processing data/no usable performance baseline. The correct TVEmpire.net property is the HTTPS URL-prefix property in the secondary authorized account, not an inaccessible domain property.
