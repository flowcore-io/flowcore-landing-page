// Optimized Performance Monitor - Lightweight version
class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.observers = {};
        this.init();
    }

    init() {
        // Only track essential metrics for better performance
        this.setupWebVitalsObserver();
        this.setupErrorTracking();
    }

    // Core Web Vitals Observer - Essential metrics only
    setupWebVitalsObserver() {
        if ('PerformanceObserver' in window) {
            // LCP Observer - Most important metric
            this.observers.lcp = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                this.metrics.lcp = lastEntry.startTime;
                this.logMetric('LCP', lastEntry.startTime);
            });
            this.observers.lcp.observe({ entryTypes: ['largest-contentful-paint'] });

            // FID Observer - User interaction responsiveness
            this.observers.fid = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    this.metrics.fid = entry.processingStart - entry.startTime;
                    this.logMetric('FID', this.metrics.fid);
                });
            });
            this.observers.fid.observe({ entryTypes: ['first-input'] });

            // CLS Observer - Visual stability
            this.observers.cls = new PerformanceObserver((list) => {
                let clsValue = 0;
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                });
                this.metrics.cls = clsValue;
                this.logMetric('CLS', clsValue);
            });
            this.observers.cls.observe({ entryTypes: ['layout-shift'] });
        }
    }

    // Error tracking - Essential for debugging
    setupErrorTracking() {
        window.addEventListener('error', (e) => {
            console.error('Performance Monitor - Error:', e.error);
            this.metrics.errors = (this.metrics.errors || 0) + 1;
        });

        window.addEventListener('unhandledrejection', (e) => {
            console.error('Performance Monitor - Unhandled Promise Rejection:', e.reason);
            this.metrics.promiseErrors = (this.metrics.promiseErrors || 0) + 1;
        });
    }

    // Simple logging - no external calls for better performance
    logMetric(name, value) {
        console.log(`📊 ${name}: ${value.toFixed(2)}`);
        
        // Store for potential later use
        if (!this.metrics[name]) {
            this.metrics[name] = [];
        }
        this.metrics[name].push(value);
    }

    // Get performance summary
    getSummary() {
        return {
            lcp: this.metrics.lcp,
            fid: this.metrics.fid,
            cls: this.metrics.cls,
            errors: this.metrics.errors || 0,
            promiseErrors: this.metrics.promiseErrors || 0
        };
    }
}

// Initialize performance monitor
const performanceMonitor = new PerformanceMonitor();

// Export for potential external use
window.performanceMonitor = performanceMonitor;





