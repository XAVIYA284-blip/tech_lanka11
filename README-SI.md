# TechLanka Hub — setup guide (සිංහල)

## මේ folder එකේ තියෙන්නේ
- `index.html` — responsive dark gaming-style website + animated loading screen
- `app.js` — tutorial cards, shop directory, YouTube channel card, save/login logic
- `config.js` — public Supabase settings සහ YouTube URL
- `supabase-schema.sql` — saved tutorials table සහ Row Level Security policies

## 1) GitHub Pages publish කරන්න
1. GitHub එකේ අලුත් repository එකක් හදන්න, උදා: `techlanka-hub`.
2. මේ files හතරම repository root එකට upload කරන්න (`index.html` root එකේ තිබිය යුතුයි).
3. Repository → **Settings → Pages** යන්න.
4. **Deploy from a branch** තෝරන්න; branch `main`, folder `/ (root)` තෝරා Save කරන්න.
5. GitHub Pages URL එක publish වුණාම copy කරගන්න. සාමාන්‍යයෙන් `https://YOUR-USERNAME.github.io/techlanka-hub/` වගේ වේ.

## 2) Supabase project එක
1. https://supabase.com/ හි project එකක් සාදන්න.
2. Project Settings / API (හෝ Connect) තුළ Project URL සහ publishable/anon browser key එක ගන්න.
3. `config.js` තුළ `supabaseUrl` සහ `supabaseAnonKey` values වෙනස් කරන්න.
4. Supabase Dashboard → **SQL Editor** → New query → `supabase-schema.sql` content paste කර Run කරන්න.
5. **Authentication → URL Configuration** තුළ Site URL ලෙස GitHub Pages URL එක දාන්න.
6. Redirect URLs / Additional Redirect URLs තුළ GitHub Pages URL එක සහ local test URL `http://localhost:8000` අවශ්‍ය නම් එකතු කරන්න.

## 3) Discord OAuth
1. https://discord.com/developers/applications වෙත ගොස් New Application හදන්න.
2. Supabase Dashboard → **Authentication → Providers / Sign In → Discord** වෙත යන්න.
3. Supabase පෙන්වන callback URL එක copy කරන්න. සාමාන්‍ය ආකෘතිය: `https://YOUR-PROJECT-REF.supabase.co/auth/v1/callback`.
4. Discord Developer Portal → OAuth2 → Redirects තුළ ඒ callback URL එක paste කර Save කරන්න.
5. Discord app එකේ Client ID සහ Client Secret Supabase Discord provider settings තුළ පමණක් දාන්න; Enable කර Save කරන්න.
6. Discord Client Secret එක `config.js`, GitHub repository, HTML/JS, හෝ public messages වලට කිසිවිටෙක දාන්න එපා.
7. Supabase Auth URL Configuration එකේ Site URL සහ Redirect URLs නිවැරදිද බලන්න. GitHub Pages URL එක අවසානයේ slash තිබීම/නොතිබීම හේතුවෙන් redirect mismatch එකක් එන්න පුළුවන්; exact URL එක allow list එකට එක් කරන්න.

Official guide: https://supabase.com/docs/guides/auth/social-login/auth-discord

## 4) Channel URL එක දාන්න
`config.js` තුළ:
`youtubeChannelUrl: "https://www.youtube.com/@YOUR_CHANNEL"`
ඔයාගේ සැබෑ channel URL එකෙන් replace කරන්න. දැනට channel URL එක ලබාදී නැති නිසා placeholder එකක් පෙන්වයි.

## 5) Shops list එක
`app.js` හි `shops` array එකේ demo/search cards තියෙනවා. Publish කිරීමට පෙර තහවුරු කළ shop name, area, official website, phone/contact link සහ warranty information වලින් ඒවා replace කරන්න. මිල සහ stock live ලෙස ලබාගන්න නම් shop APIs හෝ වෙනම data source එකක් අවශ්‍යයි.

## 6) Local test
Computer එකේ Python තිබේ නම් folder එකේ terminal එකක් open කර:
`python -m http.server 8000`
ඉන්පසු browser එකෙන් `http://localhost:8000` open කරන්න. `file://` ලෙස open කරනවාට වඩා local server එක භාවිතා කරන්න.

## Security notes
- `config.js` තුළ Supabase project URL + publishable/anon key පමණක් තබන්න. Browser එකේ පෙනෙන key එකක් නිසා table එකේ RLS policies අනිවාර්යයි.
- `service_role` හෝ `secret` key එක කිසිවිටෙක frontend එකට දාන්න එපා.
- Discord login සහ cloud saved tutorials වැඩ කරන්න Supabase + Discord provider setup අවසන් විය යුතුයි.
- මේ starter එකේ tutorial links search pages වෙත යන අතර shop cards placeholders වේ. Publish කිරීමට පෙර තමන්ගේ content සහ verified shop links එක් කරන්න.
- YouTube video embeds/latest videos auto-load නොවේ; channel URL එක open කරන card එකක් පමණයි. Auto video feed එකක් සඳහා YouTube Data API/backend setup தேவைப்படலாம்.
