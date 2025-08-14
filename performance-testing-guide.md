# Core Web Vitals Performance Testing Guide

## Quick Performance Test Instructions

### 1. Open Browser Developer Tools
- Press `F12` or right-click and select "Inspect"
- Go to the **Console** tab

### 2. Run the Performance Test Script
Copy and paste the entire contents of `core-web-vitals-test.js` into the console and press Enter.

### 3. Alternative: Use Browser's Built-in Performance Tools

#### Chrome DevTools Performance Tab:
1. Open DevTools → **Performance** tab
2. Click the **Record** button (circle)
3. Refresh the page
4. Stop recording after page loads
5. Analyze the results:
   - Look for **LCP** (Largest Contentful Paint)
   - Check for **Layout Shifts** (CLS)
   - Monitor **JavaScript execution** (FID)

#### Lighthouse Performance Audit:
1. Open DevTools → **Lighthouse** tab
2. Select **Performance** category
3. Click **Generate report**
4. Review Core Web Vitals scores

### 4. Manual Visual Testing

#### Test Layout Stability (CLS):
1. Open the page in a new incognito window
2. Watch for any content jumping or shifting during load
3. Check if images load with proper dimensions
4. Verify fonts load without causing layout shifts

#### Test Loading Performance (LCP):
1. Open browser DevTools → **Network** tab
2. Refresh the page
3. Look for:
   - Hero images loading quickly
   - Critical CSS loading first
   - Fonts loading efficiently

#### Test Interactivity (FID):
1. Try clicking buttons immediately after page load
2. Test theme toggle responsiveness
3. Check navigation menu interactions
4. Verify smooth scrolling performance

### 5. Expected Results After Optimizations

#### ✅ Good Performance Indicators:
- **LCP**: < 2.5 seconds
- **CLS**: < 0.1
- **FID**: < 100ms
- No visible layout shifts during loading
- Smooth interactions without delays
- Images load with proper dimensions

#### 🔍 What to Look For:
- Preload links in Network tab
- `fetchpriority="high"` on hero images
- Explicit width/height on all images
- Deferred JavaScript loading
- WebP image format usage

### 6. Performance Comparison

#### Before Optimizations:
- Images may cause layout shifts
- Hero images load without priority
- JavaScript may block rendering
- No explicit image dimensions

#### After Optimizations:
- Stable layout during loading
- High-priority hero image loading
- Non-blocking JavaScript execution
- All images have explicit dimensions

### 7. Troubleshooting

#### If LCP is still slow:
- Check if hero images are actually preloaded
- Verify `fetchpriority="high"` is working
- Consider further image compression

#### If CLS is still high:
- Look for images without explicit dimensions
- Check for dynamic content causing shifts
- Verify font loading optimization

#### If FID is still slow:
- Check JavaScript execution in Performance tab
- Look for blocking scripts
- Verify defer attributes are working

### 8. Network Testing

#### Test with Different Network Conditions:
1. DevTools → **Network** tab
2. Set throttling to "Slow 3G"
3. Refresh page and observe loading behavior
4. Test with "Fast 3G" and "4G" for comparison

#### Test with Different Devices:
- Mobile device simulation in DevTools
- Different screen sizes
- Touch interactions for mobile performance

## Quick Commands for Console Testing

```javascript
// Quick LCP check
new PerformanceObserver((list) => {
    const entries = list.getEntries();
    console.log('LCP:', entries[entries.length - 1].startTime + 'ms');
}).observe({ entryTypes: ['largest-contentful-paint'] });

// Quick CLS check
let cls = 0;
new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) cls += entry.value;
    }
    console.log('CLS:', cls);
}).observe({ entryTypes: ['layout-shift'] });

// Check optimizations
console.log('Preload links:', document.querySelectorAll('link[rel="preload"]').length);
console.log('High priority images:', document.querySelectorAll('img[fetchpriority="high"]').length);
console.log('Images with dimensions:', document.querySelectorAll('img[width][height]').length);
console.log('Deferred scripts:', document.querySelectorAll('script[defer]').length);
```

## Success Criteria

✅ **Excellent Performance:**
- LCP < 2.5s
- CLS < 0.1
- FID < 100ms

✅ **Optimizations Working:**
- Preload links present
- High priority images loading
- Explicit image dimensions
- Deferred JavaScript
- WebP images used

✅ **Visual Stability:**
- No layout shifts during loading
- Smooth font loading
- Consistent image sizing
- Responsive interactions

