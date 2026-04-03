# Storefront & POS Integration Guide

This project is now configured for **real-time synchronization** with your Allwin Traders POS web app. Any changes made in the POS (price, name, description, image) will reflect instantly on the storefront.

## 1. Get your Owner UID
To sync data, the storefront needs to know which "Store Owner" it belongs to.
1. Log in to your **POS Web App** (e.g., http://localhost:3000).
2. Go to **Settings** (⚙️).
3. Under the **Account** section, look for the **UID**.
4. Copy the full UID (e.g., `vSgQ0uA7Y4f8X9z2A1B3C4D5E6F7`).

## 2. Configure Storefront
1. Open the **Storefront project** folder.
2. Open the `.env` file.
3. Add or update the following line:
   ```env
   VITE_STOREFRONT_OWNER_UID=your_copied_uid_here
   ```
4. Restart the storefront development server.

## 3. Manage Products in POS
In the POS app, go to **Items**:
- **Display in Storefront**: Toggle this ON to show an item online.
- **Storefront Details**: Fill in the Category, Description, and Image URL for a premium look.
- **Min Qty / Step**: Control how customers can add items to their cart (e.g., for oils, you might set 1 Ltr as min).

## 4. Troubleshooting
- **No products showing?** Ensure at least one item in the POS has "Display in Storefront" enabled and you've set the correct `VITE_STOREFRONT_OWNER_UID`.
- **Images not loading?** Ensure you provide a direct image URL (https://...) in the POS item's Image URL field.

---
*Built for Allwin Traders with ❤️*
