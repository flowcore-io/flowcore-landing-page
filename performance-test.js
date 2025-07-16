// Performance Test Script for CSS Wave Animation
// Run this in browser console to measure performance impact

console.log("🚀 Starting Performance Analysis...");

// Performance monitoring setup
const performanceData = {
    startTime: performance.now(),
    frameCount: 0,
    totalFrameTime: 0,
    animations: []
};

// Monitor frame rate
function measureFrameRate() {
    const frameStart = performance.now();
    
    performanceData.frameCount++;
    
    requestAnimationFrame(() => {
        const frameEnd = performance.now();
        const frameTime = frameEnd - frameStart;
        performanceData.totalFrameTime += frameTime;
        
        if (performanceData.frameCount < 60) {
            measureFrameRate();
        } else {
            displayResults();
        }
    });
}

// Memory usage monitoring
function getMemoryInfo() {
    if (performance.memory) {
        return {
            used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
            total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024),
            limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024)
        };
    }
    return null;
}

// Count active animations
function countAnimations() {
    const waveElements = document.querySelectorAll('.wave-layer');
    const logoElements = document.querySelectorAll('.logo-container');
    
    return {
        waveAnimations: waveElements.length,
        logoAnimations: logoElements.length,
        total: waveElements.length + logoElements.length
    };
}

// Display results
function displayResults() {
    const endTime = performance.now();
    const totalTime = endTime - performanceData.startTime;
    const avgFrameTime = performanceData.totalFrameTime / performanceData.frameCount;
    const estimatedFPS = 1000 / avgFrameTime;
    
    const memory = getMemoryInfo();
    const animations = countAnimations();
    
    console.log("\n📊 PERFORMANCE ANALYSIS RESULTS");
    console.log("=====================================");
    console.log(`⏱️  Total test time: ${totalTime.toFixed(2)}ms`);
    console.log(`🎬 Average frame time: ${avgFrameTime.toFixed(2)}ms`);
    console.log(`📈 Estimated FPS: ${estimatedFPS.toFixed(1)} fps`);
    console.log(`🎭 Active animations: ${animations.total}`);
    console.log(`   - Wave animations: ${animations.waveAnimations}`);
    console.log(`   - Logo animations: ${animations.logoAnimations}`);
    
    if (memory) {
        console.log(`💾 Memory usage: ${memory.used}MB / ${memory.total}MB`);
    }
    
    // Performance rating
    let rating = "EXCELLENT";
    let color = "🟢";
    
    if (estimatedFPS < 30) {
        rating = "POOR";
        color = "🔴";
    } else if (estimatedFPS < 45) {
        rating = "FAIR";
        color = "🟡";
    } else if (estimatedFPS < 55) {
        rating = "GOOD";
        color = "🟡";
    }
    
    console.log(`${color} Performance Rating: ${rating}`);
    
    // Additional performance metrics
    const paintMetrics = performance.getEntriesByType('paint');
    if (paintMetrics.length > 0) {
        console.log("\n🎨 Paint Performance:");
        paintMetrics.forEach(metric => {
            console.log(`   ${metric.name}: ${metric.startTime.toFixed(2)}ms`);
        });
    }
    
    // Network performance
    const navigationEntry = performance.getEntriesByType('navigation')[0];
    if (navigationEntry) {
        console.log("\n🌐 Load Performance:");
        console.log(`   DOM Content Loaded: ${navigationEntry.domContentLoadedEventEnd.toFixed(2)}ms`);
        console.log(`   Page Load Complete: ${navigationEntry.loadEventEnd.toFixed(2)}ms`);
    }
}

// Start the test
console.log("🔍 Analyzing CSS Wave Animation Performance...");
measureFrameRate();
