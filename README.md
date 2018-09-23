<h2 align="center">Usage</h2>

### `Configuration`

**`postcss.config.js`**
```js
module.exports = {
  plugins: {
    'postcss-assets-packages': {
        packages: {
            'static': 'https://example.static.com',
            'website': 'https://example.website.com'
        }
    }
  }
}
```

### `Example`

```postcss
body {
  background: asset('image.png', static);
  background: asset('image.png', website);
}
```

PostCSS Assets will change urls:

```css
body {
  background: url("https://example.static.com/image.png");
  background: url("https://example.website.com/image.png");
}
```