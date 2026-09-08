# Treutis

A real Next.js storefront: live product database (Firebase), an admin
panel to manage products, a working cart, and checkout that sends the
order straight to WhatsApp. No server to maintain — everything below
can be done from your phone's browser, no laptop or terminal needed.

## 1. Create a free Firebase project (5 min)

1. Go to console.firebase.google.com, sign in, tap **Add project**.
2. Name it `treutis` (or anything), skip Google Analytics if asked.
3. Once created, tap the **</> (Web)** icon to register a web app.
   Name it `treutis-web`. You do NOT need Firebase Hosting.
4. Firebase shows you a `firebaseConfig` object — copy the values
   (apiKey, authDomain, projectId, etc). You'll paste these into
   Vercel in step 3.
5. In the left sidebar, go to **Build > Firestore Database > Create
   database**. Choose **Start in test mode** for now (you can lock
   it down later), pick a region close to the UAE (e.g.
   `europe-west` or `asia-south1`), and create it.

## 2. Push this code to GitHub (from your phone)

1. Go to github.com, create a free account if you don't have one.
2. Tap **+ > New repository**, name it `treutis`, keep it private if
   you like, create it.
3. On the new repo page, use **Add file > Upload files** and upload
   every file/folder from this project (keep the folder structure —
   GitHub's uploader supports dragging a whole folder on desktop; on
   mobile browser, upload file-by-file or use the GitHub mobile app
   which supports uploading a zip's extracted contents). Commit.

## 3. Deploy on Vercel (free, builds automatically)

1. Go to vercel.com, sign up using your GitHub account.
2. Tap **Add New > Project**, select your `treutis` repo, import it.
3. Before deploying, open **Environment Variables** and add these
   (already filled in for you below — just copy each one in):

   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD0akwzIX26-8OekH4pl19I8WGgryElLVc
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=treutis.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=treutis
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=treutis.firebasestorage.app
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=250759535336
   NEXT_PUBLIC_FIREBASE_APP_ID=1:250759535336:web:26632ff8c7fcbedc81c75d
   NEXT_PUBLIC_WHATSAPP_NUMBER=971559401133
   NEXT_PUBLIC_ADMIN_PASSWORD=(pick your own admin password)
   ```

4. Tap **Deploy**. Vercel installs everything and builds it in the
   cloud — you don't run anything locally. You'll get a live URL
   like `treutis.vercel.app` in about a minute.
5. Later: add a custom domain (e.g. treutis.com) under Project
   Settings > Domains, from the same dashboard.

## 4. Add your products

Visit `your-site-url.vercel.app/admin`, log in with the admin
password you set, and add products — name, category, fabric, fit,
price, sizes, description, and an image URL (upload product photos
anywhere that gives you a direct image link — e.g. imgur, or
Firebase Storage). They appear live on the site immediately.

## 5. How checkout works

There's no payment gateway yet — "Checkout on WhatsApp" builds a
message with the cart contents and total, and opens WhatsApp to your
business number (set via `NEXT_PUBLIC_WHATSAPP_NUMBER`). You confirm
and take payment manually, same as your friend's Pawn Store site.
When you're ready for real card payments, this is the piece to
upgrade — Stripe is the natural next step and slots into the
existing cart data.

## Local development (optional, if you ever get a laptop)

```
npm install
cp .env.local.example .env.local   # fill in your values
npm run dev
```
