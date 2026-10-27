# Launch checklist — hamelphoto.com

## Before cutover

- [x] Photos in `src/assets/photos/` + `src/data/images.json` (61 photos; placeholders removed). Lighthouse mobile: 100/100/100/100 on every page, LCP 1.5–1.8 s.
- [ ] Fill `location` in `src/data/images.json` for each photo (city where it was shot; left empty for now, so no location is published).
- [ ] Fill `src/data/site.ts`: Instagram / LinkedIn URLs, Google Business Profile URL, `[GA4_ID]`, `[ADS_ID]`, `[ADS_LABEL_PHONE]`, `[ADS_LABEL_EMAIL]`, `[META_PIXEL_ID]` (or leave the pixel in brackets to keep it off).
- [ ] In GA4, set data retention to 14 months (the privacy page says so).
- [ ] GitHub → repo Settings → Pages → Source: **GitHub Actions**.
- [ ] GitHub → repo Settings → Pages → Custom domain: `hamelphoto.com` (with an Actions deploy, the `CNAME` file is not enough — the setting is what counts).
- [ ] Recommended: GitHub → your profile Settings → Pages → Add a verified domain `hamelphoto.com`. It gives you a TXT record to add (below).
- [ ] Merge `redesign` into `master` and push. The workflow builds and deploys.

## DNS at WHC

**Email first.** As of 2026-10-27 the MX record is `0 hamelphoto.com.` and `mail` is a CNAME to `hamelphoto.com`: mail is delivered to whatever the apex `A` record points at (WHC's server, 173.209.33.163). Moving the apex to GitHub without the two changes below stops incoming email.

Step A — keep mail on WHC (do this first, then wait one TTL and send yourself a test email):

| Change | Type | Name | Value |
|---|---|---|---|
| Replace the `mail` CNAME with | A | mail | 173.209.33.163 |
| Edit the MX record to | MX | @ | `mail.hamelphoto.com.` (priority 0) |

Leave SPF (TXT `v=spf1…`), DKIM (`default._domainkey`) and DMARC as they are: SPF's `+mx` still covers 173.209.33.163 through `mail`. Optional tidy-up later: drop `+a` from SPF, since after the switch it would point at GitHub's servers. If unsure, ask WHC support to confirm the MX target before changing it.

Step B — move the website. Delete any existing `A`/`AAAA` record on `@` and any existing `A`/`AAAA`/`CNAME` on `www`, then add:

| Type | Name | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| AAAA | @ | 2606:50c0:8000::153 |
| AAAA | @ | 2606:50c0:8001::153 |
| AAAA | @ | 2606:50c0:8002::153 |
| AAAA | @ | 2606:50c0:8003::153 |
| CNAME | www | mrgorsky.github.io. |
| TXT | _github-pages-challenge-MrGorsky | *(value GitHub shows when you add the verified domain)* |

TTL: 3600 is fine (lower it to 300 a day before if you want a faster switch).

After DNS resolves (minutes to a few hours): Settings → Pages → tick **Enforce HTTPS** once the certificate is issued. `www.hamelphoto.com` then redirects to `https://hamelphoto.com/` automatically.

Check with:

```bash
nslookup hamelphoto.com
nslookup -type=CNAME www.hamelphoto.com
nslookup -type=MX hamelphoto.com
```

The MX answer must be `mail.hamelphoto.com`, and `mail.hamelphoto.com` must still resolve to 173.209.33.163. Send and receive a test email after each step. Mail apps that connect to `mail.hamelphoto.com` keep working; any set up with `hamelphoto.com` as the server need to switch to `mail.hamelphoto.com`.

## Old site

The old site was a single page at `/` (all navigation was `#anchors`). `/` stays `/`, so no redirect pages are needed. Delete the old files from the WHC hosting only after the new site is live.

## After launch

- [ ] Google Search Console: add the **Domain** property `hamelphoto.com` (DNS TXT verification), submit `https://hamelphoto.com/sitemap-index.xml`, request indexing of `/` and the three service pages (FR and EN).
- [ ] Bing Webmaster Tools: import from Search Console, submit the same sitemap. ChatGPT search uses Bing's index.
- [ ] IndexNow: in Bing Webmaster Tools → IndexNow, generate a key; add the key file to `public/` (`public/<key>.txt` containing the key), deploy, then ping on each content change.
- [ ] Google Business Profile: website = `https://hamelphoto.com/`, phone `+1 (514) 802-6778`, service area = Montréal, Laval, Longueuil, Rive-Sud, Rive-Nord, no address shown. Then add the profile URL to `googleBusinessProfile` in `src/data/site.ts`.
- [ ] Rich Results Test (search.google.com/test/rich-results) on `/` and one service page; Schema Markup Validator (validator.schema.org) on the same.
- [ ] Ads conversions: in GA4 mark `phone_click_*` and `email_click_*` as key events; in Google Ads create two conversion actions (phone click, email click) and put their labels in `site.ts`. Test with Tag Assistant: accept cookies, click the phone and email links on each service page, confirm the events arrive. Reject cookies in a fresh window and confirm nothing loads.
- [ ] Meta Events Manager (if the pixel is used): confirm `PageView` and `Contact` after accepting cookies.
- [ ] Keep the name, phone and email identical, character for character, on the site, Google Business Profile, Instagram, LinkedIn and any directory listings.
