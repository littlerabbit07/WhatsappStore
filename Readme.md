# WhatsApp E-commerce Order System

A simple, modern e-commerce catalog that allows customers to browse products and send orders directly via WhatsApp.

## Features

- 📱 Mobile-responsive design
- 🛒 Shopping cart functionality
- 📂 Product categories and filtering
- 💬 WhatsApp order integration
- 🎨 Modern glassmorphism UI design
- ⚡ Fast loading and lightweight

## Setup Instructions

1. **Configure WhatsApp Number**
   - Open `config.js`
   - Replace `WHATSAPP_NUMBER` with your WhatsApp Business number
   - Format: Use international format without + (e.g., "1234567890")

2. **Add Your Products**
   - Edit the `products` array in `script.js`
   - Include: id, name, description, price, category, emoji

3. **Customize Store Info**
   - Modify `STORE_CONFIG` in `config.js`
   - Update store name, description, and currency symbol

4. **Deploy**
   - Upload all files to your web hosting service
   - Or deploy to Cloudflare Pages, Netlify, Vercel, etc.

## File Structure

- `index.html` - Main HTML structure
- `style.css` - All styling and animations
- `script.js` - JavaScript functionality
- `config.js` - Configuration settings
- `README.md` - Documentation

## Customization

### Adding Products
```javascript
{
    id: 11,
    name: "Your Product Name",
    description: "Product description here",
    price: 29.99,
    category: "electronics",
    emoji: "📱"
}