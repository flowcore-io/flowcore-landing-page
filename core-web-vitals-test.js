// Core Web Vitals Performance Test Script
// Run this in browser console to measure performance improvements

console.log("🚀 Core Web Vitals Performance Analysis Starting...");

// Performance monitoring setup
const performanceMetrics = {
    startTime: performance.now(),
    lcp: null,
    cls: null,
    fid: null,
    fcp: null,
    ttfb: null,
    imageLoadTimes: [],
    fontLoadTimes: [],
    layoutShifts: []
};

// Monitor Largest Contentful Paint (LCP)
function measureLCP() {
    const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        performanceMetrics.lcp = lastEntry.startTime;
        console.log(`🎯 LCP: ${performanceMetrics.lcp.toFixed(2)}ms`);
    });
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
}

// Monitor Cumulative Layout Shift (CLS)
function measureCLS() {
    let clsValue = 0;
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
                clsValue += entry.value;
                performanceMetrics.layoutShifts.push({
                    value: entry.value,
                    time: entry.startTime
                });
            }
        }
        performanceMetrics.cls = clsValue;
    });
    observer.observe({ entryTypes: ['layout-shift'] });
}

// Monitor First Input Delay (FID)
function measureFID() {
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            performanceMetrics.fid = entry.processingStart - entry.startTime;
            console.log(`⚡ FID: ${performanceMetrics.fid.toFixed(2)}ms`);
        }
    });
    observer.observe({ entryTypes: ['first-input'] });
}

// Monitor First Contentful Paint (FCP)
function measureFCP() {
    const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        performanceMetrics.fcp = entries[entries.length - 1].startTime;
        console.log(`🎨 FCP: ${performanceMetrics.fcp.toFixed(2)}ms`);
    });
    observer.observe({ entryTypes: ['first-contentful-paint'] });
}

// Monitor Time to First Byte (TTFB)
function measureTTFB() {
    const navigationEntry = performance.getEntriesByType('navigation')[0];
    if (navigationEntry) {
        performanceMetrics.ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
        console.log(`🌐 TTFB: ${performanceMetrics.ttfb.toFixed(2)}ms`);
    }
}

// Monitor image loading performance
function measureImageLoading() {
    const images = document.querySelectorAll('img');
    images.forEach((img, index) => {
        const startTime = performance.now();
        img.addEventListener('load', () => {
            const loadTime = performance.now() - startTime;
            performanceMetrics.imageLoadTimes.push({
                src: img.src,
                loadTime: loadTime,
                index: index
            });
        });
    });
}

// Monitor font loading performance
function measureFontLoading() {
    if ('fonts' in document) {
        const fontStartTime = performance.now();
        document.fonts.ready.then(() => {
            const fontLoadTime = performance.now() - fontStartTime;
            performanceMetrics.fontLoadTimes.push(fontLoadTime);
            console.log(`📝 Fonts loaded in: ${fontLoadTime.toFixed(2)}ms`);
        });
    }
}

// Check for Core Web Vitals optimizations
function checkOptimizations() {
    const optimizations = {
        preloadLinks: 0,
        fetchPriorityImages: 0,
        explicitDimensions: 0,
        deferredScripts: 0,
        webpImages: 0
    };

    // Check preload links
    const preloadLinks = document.querySelectorAll('link[rel="preload"]');
    optimizations.preloadLinks = preloadLinks.length;

    // Check fetchpriority images
    const highPriorityImages = document.querySelectorAll('img[fetchpriority="high"]');
    optimizations.fetchPriorityImages = highPriorityImages.length;

    // Check explicit dimensions
    const imagesWithDimensions = document.querySelectorAll('img[width][height]');
    optimizations.explicitDimensions = imagesWithDimensions.length;

    // Check deferred scripts
    const deferredScripts = document.querySelectorAll('script[defer]');
    optimizations.deferredScripts = deferredScripts.length;

    // Check WebP images
    const webpSources = document.querySelectorAll('source[type="image/webp"]');
    optimizations.webpImages = webpSources.length;

    return optimizations;
}

// Display comprehensive results
function displayResults() {
    const optimizations = checkOptimizations();
    
    console.log("\n📊 CORE WEB VITALS PERFORMANCE RESULTS");
    console.log("==========================================");
    
    // Core Web Vitals Scores
    console.log("\n🎯 CORE WEB VITALS METRICS:");
    console.log(`   LCP: ${performanceMetrics.lcp ? performanceMetrics.lcp.toFixed(2) + 'ms' : 'Not measured'}`);
    console.log(`   CLS: ${performanceMetrics.cls ? performanceMetrics.cls.toFixed(4) : 'Not measured'}`);
    console.log(`   FID: ${performanceMetrics.fid ? performanceMetrics.fid.toFixed(2) + 'ms' : 'Not measured'}`);
    console.log(`   FCP: ${performanceMetrics.fcp ? performanceMetrics.fcp.toFixed(2) + 'ms' : 'Not measured'}`);
    console.log(`   TTFB: ${performanceMetrics.ttfb ? performanceMetrics.ttfb.toFixed(2) + 'ms' : 'Not measured'}`);
    
    // Performance Ratings
    console.log("\n🏆 PERFORMANCE RATINGS:");
    if (performanceMetrics.lcp) {
        const lcpRating = performanceMetrics.lcp < 2500 ? '🟢 GOOD' : performanceMetrics.lcp < 4000 ? '🟡 NEEDS IMPROVEMENT' : '🔴 POOR';
        console.log(`   LCP: ${lcpRating} (${performanceMetrics.lcp.toFixed(0)}ms)`);
    }
    
    if (performanceMetrics.cls) {
        const clsRating = performanceMetrics.cls < 0.1 ? '🟢 GOOD' : performanceMetrics.cls < 0.25 ? '🟡 NEEDS IMPROVEMENT' : '🔴 POOR';
        console.log(`   CLS: ${clsRating} (${performanceMetrics.cls.toFixed(4)})`);
    }
    
    if (performanceMetrics.fid) {
        const fidRating = performanceMetrics.fid < 100 ? '🟢 GOOD' : performanceMetrics.fid < 300 ? '🟡 NEEDS IMPROVEMENT' : '🔴 POOR';
        console.log(`   FID: ${fidRating} (${performanceMetrics.fid.toFixed(0)}ms)`);
    }
    
    // Optimization Status
    console.log("\n⚙️ OPTIMIZATION STATUS:");
    console.log(`   Preload links: ${optimizations.preloadLinks} ✅`);
    console.log(`   High priority images: ${optimizations.fetchPriorityImages} ✅`);
    console.log(`   Images with explicit dimensions: ${optimizations.explicitDimensions} ✅`);
    console.log(`   Deferred scripts: ${optimizations.deferredScripts} ✅`);
    console.log(`   WebP images: ${optimizations.webpImages} ✅`);
    
    // Image loading performance
    if (performanceMetrics.imageLoadTimes.length > 0) {
        const avgImageLoadTime = performanceMetrics.imageLoadTimes.reduce((sum, img) => sum + img.loadTime, 0) / performanceMetrics.imageLoadTimes.length;
        console.log(`\n🖼️ IMAGE LOADING PERFORMANCE:`);
        console.log(`   Average image load time: ${avgImageLoadTime.toFixed(2)}ms`);
        console.log(`   Total images loaded: ${performanceMetrics.imageLoadTimes.length}`);
    }
    
    // Font loading performance
    if (performanceMetrics.fontLoadTimes.length > 0) {
        console.log(`\n📝 FONT LOADING PERFORMANCE:`);
        console.log(`   Font load time: ${performanceMetrics.fontLoadTimes[0].toFixed(2)}ms`);
    }
    
    // Layout shift details
    if (performanceMetrics.layoutShifts.length > 0) {
        console.log(`\n📐 LAYOUT SHIFTS DETECTED:`);
        console.log(`   Total layout shifts: ${performanceMetrics.layoutShifts.length}`);
        performanceMetrics.layoutShifts.forEach((shift, index) => {
            console.log(`   Shift ${index + 1}: ${shift.value.toFixed(4)} at ${shift.time.toFixed(2)}ms`);
        });
    }
    
    // Overall performance summary
    console.log("\n🎉 OVERALL PERFORMANCE SUMMARY:");
    const totalTime = performance.now() - performanceMetrics.startTime;
    console.log(`   Total analysis time: ${totalTime.toFixed(2)}ms`);
    console.log(`   Optimizations implemented: ${Object.values(optimizations).reduce((sum, val) => sum + val, 0)}`);
    
    // Recommendations
    console.log("\n💡 RECOMMENDATIONS:");
    if (performanceMetrics.lcp && performanceMetrics.lcp > 2500) {
        console.log("   • Consider further image optimization for LCP");
    }
    if (performanceMetrics.cls && performanceMetrics.cls > 0.1) {
        console.log("   • Review layout shifts and add more explicit dimensions");
    }
    if (performanceMetrics.fid && performanceMetrics.fid > 100) {
        console.log("   • Consider code splitting for better FID");
    }
    
    console.log("\n✅ Core Web Vitals analysis complete!");
}

// Initialize all measurements
function initPerformanceMonitoring() {
    console.log("🔍 Initializing performance monitoring...");
    
    // Start all measurements
    measureLCP();
    measureCLS();
    measureFID();
    measureFCP();
    measureTTFB();
    measureImageLoading();
    measureFontLoading();
    
    // Display results after page load
    window.addEventListener('load', () => {
        setTimeout(displayResults, 1000); // Wait 1 second for final measurements
    });
    
    // Also display results after 5 seconds for ongoing monitoring
    setTimeout(displayResults, 5000);
}

// Start the performance analysis
initPerformanceMonitoring();

