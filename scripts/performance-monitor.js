// Flowcore Advanced Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.observers = {};
        this.init();
    }

    init() {
        this.setupWebVitalsObserver();
        this.setupUserInteractionTracking();
        this.setupResourceTiming();
        this.setupErrorTracking();
        this.setupServiceWorkerMonitoring();
    }

    // Core Web Vitals Observer
    setupWebVitalsObserver() {
        if ('PerformanceObserver' in window) {
            // LCP Observer
            this.observers.lcp = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                this.metrics.lcp = lastEntry.startTime;
                this.logMetric('LCP', lastEntry.startTime);
                this.sendMetric('lcp', lastEntry.startTime);
            });
            this.observers.lcp.observe({ entryTypes: ['largest-contentful-paint'] });

            // FID Observer
            this.observers.fid = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    this.metrics.fid = entry.processingStart - entry.startTime;
                    this.logMetric('FID', this.metrics.fid);
                    this.sendMetric('fid', this.metrics.fid);
                });
            });
            this.observers.fid.observe({ entryTypes: ['first-input'] });

            // CLS Observer
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
                this.sendMetric('cls', clsValue);
            });
            this.observers.cls.observe({ entryTypes: ['layout-shift'] });

            // FCP Observer
            this.observers.fcp = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const firstEntry = entries[0];
                this.metrics.fcp = firstEntry.startTime;
                this.logMetric('FCP', firstEntry.startTime);
                this.sendMetric('fcp', firstEntry.startTime);
            });
            this.observers.fcp.observe({ entryTypes: ['first-contentful-paint'] });
        }
    }

    // User Interaction Tracking
    setupUserInteractionTracking() {
        let interactionCount = 0;
        const interactionTypes = ['click', 'scroll', 'keydown', 'touchstart'];

        interactionTypes.forEach(type => {
            document.addEventListener(type, () => {
                interactionCount++;
                this.metrics.userInteractions = interactionCount;
                
                // Track specific interactions
                if (type === 'click') {
                    this.trackClickInteraction();
                } else if (type === 'scroll') {
                    this.trackScrollDepth();
                }
            }, { passive: true });
        });

        // Track time to interactive
        this.trackTimeToInteractive();
    }

    trackClickInteraction() {
        const clickTargets = {
            '.btn': 'button',
            '.nav__link': 'navigation',
            '.use-case-block__icon': 'use_case',
            '.theme-toggle': 'theme_toggle',
            '.contact-card': 'contact',
            '.pricing-card': 'pricing'
        };

        document.addEventListener('click', (e) => {
            for (const [selector, type] of Object.entries(clickTargets)) {
                if (e.target.closest(selector)) {
                    this.sendMetric('interaction', type);
                    break;
                }
            }
        });
    }

    trackScrollDepth() {
        const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        this.metrics.scrollDepth = Math.max(this.metrics.scrollDepth || 0, scrollDepth);
        
        // Send scroll depth at milestones
        const milestones = [25, 50, 75, 100];
        if (milestones.includes(scrollDepth)) {
            this.sendMetric('scroll_depth', scrollDepth);
        }
    }

    trackTimeToInteractive() {
        if (document.readyState === 'complete') {
            const tti = performance.now();
            this.metrics.tti = tti;
            this.logMetric('TTI', tti);
            this.sendMetric('tti', tti);
        } else {
            window.addEventListener('load', () => {
                const tti = performance.now();
                this.metrics.tti = tti;
                this.logMetric('TTI', tti);
                this.sendMetric('tti', tti);
            });
        }
    }

    // Resource Timing
    setupResourceTiming() {
        if ('PerformanceObserver' in window) {
            this.observers.resource = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (entry.initiatorType === 'img' || entry.initiatorType === 'css' || entry.initiatorType === 'script') {
                        this.metrics.resourceTiming = this.metrics.resourceTiming || {};
                        this.metrics.resourceTiming[entry.name] = {
                            duration: entry.duration,
                            size: entry.transferSize,
                            type: entry.initiatorType
                        };
                    }
                });
            });
            this.observers.resource.observe({ entryTypes: ['resource'] });
        }
    }

    // Error Tracking
    setupErrorTracking() {
        window.addEventListener('error', (e) => {
            this.sendMetric('error', {
                message: e.message,
                filename: e.filename,
                lineno: e.lineno,
                colno: e.colno
            });
        });

        window.addEventListener('unhandledrejection', (e) => {
            this.sendMetric('error', {
                type: 'unhandledrejection',
                reason: e.reason
            });
        });
    }

    // Service Worker Monitoring
    setupServiceWorkerMonitoring() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.addEventListener('message', (event) => {
                if (event.data && event.data.type === 'CACHE_UPDATED') {
                    this.sendMetric('sw_cache_updated', event.data);
                }
            });
        }
    }

    // Utility Methods
    logMetric(name, value) {
        const status = this.getMetricStatus(name, value);
        console.log(`📊 ${name}: ${value.toFixed(2)}ms (${status})`);
    }

    getMetricStatus(name, value) {
        const thresholds = {
            lcp: { good: 2500, needsImprovement: 4000 },
            fid: { good: 100, needsImprovement: 300 },
            cls: { good: 0.1, needsImprovement: 0.25 },
            fcp: { good: 1800, needsImprovement: 3000 },
            tti: { good: 3800, needsImprovement: 7300 }
        };

        const threshold = thresholds[name];
        if (!threshold) return 'unknown';

        if (value <= threshold.good) return '✅ Good';
        if (value <= threshold.needsImprovement) return '⚠️ Needs Improvement';
        return '❌ Poor';
    }

    sendMetric(type, value) {
        // In a real implementation, this would send to your analytics service
        // For now, we'll just store it locally
        if (!this.metrics.analytics) {
            this.metrics.analytics = [];
        }
        
        this.metrics.analytics.push({
            type,
            value,
            timestamp: Date.now(),
            url: window.location.href,
            userAgent: navigator.userAgent
        });

        // Keep only last 100 metrics
        if (this.metrics.analytics.length > 100) {
            this.metrics.analytics = this.metrics.analytics.slice(-100);
        }
    }

    // Public API
    getMetrics() {
        return this.metrics;
    }

    getPerformanceReport() {
        const report = {
            timestamp: Date.now(),
            url: window.location.href,
            metrics: this.metrics,
            summary: this.generateSummary()
        };
        
        console.log('📈 Performance Report:', report);
        return report;
    }

    generateSummary() {
        const summary = {};
        
        if (this.metrics.lcp) {
            summary.lcp = {
                value: this.metrics.lcp,
                status: this.getMetricStatus('lcp', this.metrics.lcp)
            };
        }
        
        if (this.metrics.fid) {
            summary.fid = {
                value: this.metrics.fid,
                status: this.getMetricStatus('fid', this.metrics.fid)
            };
        }
        
        if (this.metrics.cls) {
            summary.cls = {
                value: this.metrics.cls,
                status: this.getMetricStatus('cls', this.metrics.cls)
            };
        }
        
        if (this.metrics.fcp) {
            summary.fcp = {
                value: this.metrics.fcp,
                status: this.getMetricStatus('fcp', this.metrics.fcp)
            };
        }
        
        if (this.metrics.tti) {
            summary.tti = {
                value: this.metrics.tti,
                status: this.getMetricStatus('tti', this.metrics.tti)
            };
        }
        
        return summary;
    }
}

// Initialize performance monitor
const performanceMonitor = new PerformanceMonitor();

// Expose to global scope for debugging
window.performanceMonitor = performanceMonitor;

// Auto-generate report after 5 seconds
setTimeout(() => {
    performanceMonitor.getPerformanceReport();
}, 5000);

console.log('🚀 Flowcore Performance Monitor initialized');





