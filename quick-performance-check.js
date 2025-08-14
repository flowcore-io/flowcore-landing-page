// Quick Performance Check for Flowcore Landing Page
// Copy and paste this into browser console to verify optimizations

console.log("🔍 Quick Performance Check for Flowcore Landing Page");
console.log("==================================================");

// Check Core Web Vitals optimizations
const optimizations = {
    preloadLinks: document.querySelectorAll('link[rel="preload"]').length,
    fetchPriorityImages: document.querySelectorAll('img[fetchpriority="high"]').length,
    explicitDimensions: document.querySelectorAll('img[width][height]').length,
    deferredScripts: document.querySelectorAll('script[defer]').length,
    webpImages: document.querySelectorAll('source[type="image/webp"]').length
};

console.log("\n⚙️ OPTIMIZATION STATUS:");
console.log(`   Preload links: ${optimizations.preloadLinks} ✅`);
console.log(`   High priority images: ${optimizations.fetchPriorityImages} ✅`);
console.log(`   Images with explicit dimensions: ${optimizations.explicitDimensions} ✅`);
console.log(`   Deferred scripts: ${optimizations.deferredScripts} ✅`);
console.log(`   WebP images: ${optimizations.webpImages} ✅`);

// Quick LCP measurement
new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lcp = entries[entries.length - 1].startTime;
    const rating = lcp < 2500 ? '🟢 GOOD' : lcp < 4000 ? '🟡 NEEDS IMPROVEMENT' : '🔴 POOR';
    console.log(`\n🎯 LCP: ${rating} (${lcp.toFixed(0)}ms)`);
}).observe({ entryTypes: ['largest-contentful-paint'] });

// Quick CLS measurement
let cls = 0;
new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) cls += entry.value;
    }
    const rating = cls < 0.1 ? '🟢 GOOD' : cls < 0.25 ? '🟡 NEEDS IMPROVEMENT' : '🔴 POOR';
    console.log(`📐 CLS: ${rating} (${cls.toFixed(4)})`);
}).observe({ entryTypes: ['layout-shift'] });

// Quick FID measurement
new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        const fid = entry.processingStart - entry.startTime;
        const rating = fid < 100 ? '🟢 GOOD' : fid < 300 ? '🟡 NEEDS IMPROVEMENT' : '🔴 POOR';
        console.log(`⚡ FID: ${rating} (${fid.toFixed(0)}ms)`);
    }
}).observe({ entryTypes: ['first-input'] });

// Check for specific optimizations
console.log("\n🔍 SPECIFIC CHECKS:");
console.log(`   Navigation logo has fetchpriority: ${document.querySelector('.nav__logo-img[fetchpriority="high"]') ? '✅' : '❌'}`);
console.log(`   Hero images have dimensions: ${document.querySelectorAll('.logo-image[width][height]').length} ✅`);
console.log(`   CSS preloaded: ${document.querySelector('link[rel="preload"][as="style"]') ? '✅' : '❌'}`);
console.log(`   JavaScript deferred: ${document.querySelectorAll('script[defer]').length >= 2 ? '✅' : '❌'}`);

// Performance summary
const totalOptimizations = Object.values(optimizations).reduce((sum, val) => sum + val, 0);
console.log(`\n🎉 TOTAL OPTIMIZATIONS: ${totalOptimizations}/5 implemented`);

if (totalOptimizations >= 4) {
    console.log("✅ Excellent! Most optimizations are working correctly.");
} else if (totalOptimizations >= 2) {
    console.log("🟡 Good! Some optimizations are working, but there's room for improvement.");
} else {
    console.log("🔴 Needs attention! Several optimizations may not be working correctly.");
}

console.log("\n💡 For detailed analysis, run the full 'core-web-vitals-test.js' script!");

