# BharatKart Admin Panel (Owner) — Starter

This is a separate starter project for the **main owner panel**. It does not replace or edit the existing `BHARAT_KART_ADMIN` repository.

## File structure

```text
BHARAT_KART_OWNER_PANEL/
├── index.html                 # Owner login
├── dashboard.html             # Owner overview
├── products.html              # Add/edit/delete shared products
├── coupons.html               # Create/edit/enable/disable/delete coupons
├── css/
│   └── owner.css              # Shared responsive styling
├── js/
│   ├── firebase.js            # Existing BharatKart Firebase project setup
│   └── owner-auth.js          # Owner UI access check and logout
├── README.md
└── SECURITY-BEFORE-DEPLOY.md  # Required security work before production
```

## Data compatibility

- Products are read/written in the existing `products` collection with fields `name`, `price`, and `image`.
- Coupons are read/written in the existing `coupons` collection with fields `code`, `type`, `value`, `minOrder`, `expiryDate`, `active`, and `createdAt` for new coupons.
- This project does not use Firebase Storage or create a second Firebase project.
- Do not delete old staff-panel files. No existing repository files are included as replacements.

## Important transitional behavior

`js/owner-auth.js` allows only the known current owner UID (`tg5wZ1uUKINBtqVJhTdqROUXaNv1`) and checks its Firestore user document role is `admin` (existing role) or `owner` (future role). Update the UID constant if the intended owner Firebase account is different.

**The browser-side check is not sufficient security by itself.** Before publishing this to a live production URL, update and test the existing Firestore Security Rules so product and coupon create/update/delete operations require the owner account/role and cannot be performed by staff. Do not replace the entire current Rules document with a guessed template; preserve all existing customer, order, wishlist, and profile permissions. See `SECURITY-BEFORE-DEPLOY.md`.

## GitHub Pages

Create a new public repository for the owner panel, upload all files preserving this folder structure, then enable GitHub Pages from the `main` branch / root. Test with the owner account only after the Firestore Rules are safely updated. Do not paste secret keys or service-account files into the repository.
