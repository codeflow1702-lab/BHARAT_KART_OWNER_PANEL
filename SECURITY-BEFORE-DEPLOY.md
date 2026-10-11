# Mandatory security work before production deployment

This first build is deliberately separate from the current staff repository. It adds an owner login check in the browser, but that is **not a substitute for Firestore Security Rules**. An authenticated user can call Firestore APIs without using the page UI, so the database must reject unauthorized writes itself.

Before treating the owner panel as production-ready:

1. Export/copy the current Firestore Rules as a rollback backup.
2. Review the existing Rules in Firebase Console. Preserve all current rules needed by customer profiles, products, coupons, orders, wishlists, and checkout.
3. Decide the final role model explicitly (recommended: `owner` for the one owner account and `staff` for staff accounts). Confirm the current owner's UID before changing any role.
4. Adjust the Rules so only the owner can create/update/delete product documents and coupon documents. Staff should not gain these permissions just because they are signed in. Public/customer reads should remain only as required by the current customer app.
5. Ensure users cannot grant themselves `owner` or `staff` roles by editing their own `users/{uid}` document.
6. Test with separate test accounts: owner can manage products/coupons; staff cannot; customer can still browse products, use valid coupons, and place/view their permitted orders.
7. Only after these tests pass, remove product/coupon navigation and controls from the staff panel. Keep the old commit/backups until verification is complete.

Do not deploy a guessed full Rules replacement. The existing Rules text is required to produce a safe, minimal patch.
