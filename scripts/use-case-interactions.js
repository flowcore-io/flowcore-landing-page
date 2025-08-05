// Use Case Visual Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive elements
    initializeInteractiveElements();
    
    // Initialize use case icon click animations
    initializeUseCaseIcons();
    
    // Start continuous animations
    startContinuousAnimations();
});

function initializeInteractiveElements() {
    // Get all interactive elements
    const interactiveElements = document.querySelectorAll('.interactive-element');
    
    interactiveElements.forEach(element => {
        // Add click event listener
        element.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add clicked class for visual feedback
            this.classList.add('clicked');
            
            // Remove clicked class after animation
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
            
            // Trigger specific interactions based on element type
            triggerSpecificInteraction(this);
        });
        
        // Hover effects removed as requested
    });
}

// Use Case Icon Click Animations
function initializeUseCaseIcons() {
    const useCaseIcons = document.querySelectorAll('.use-case-icon i');
    
    useCaseIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add clicked class for smooth animation
            this.classList.add('clicked');
            
            // Remove clicked class after animation completes
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 800);
        });
    });
}

function triggerSpecificInteraction(element) {
    // AI Training Visual Interactions
    if (element.classList.contains('data-box')) {
        animateDataFlow();
    }
    
    if (element.classList.contains('model-training')) {
        animateModelTraining();
    }
    
    if (element.classList.contains('replay-feature')) {
        animateReplay();
    }
    
    // Real-time Analytics Interactions
    if (element.classList.contains('metrics-count')) {
        animateMetricsCounter();
    }
    
    if (element.classList.contains('flow-stage')) {
        animateProcessingStage(element);
    }
    
    if (element.classList.contains('real-time-indicator')) {
        animateRealTimeIndicator();
    }
    
    // Microservices Interactions
    if (element.classList.contains('service-node')) {
        animateServiceCommunication(element);
    }
    
    if (element.classList.contains('event-bus')) {
        animateEventBus();
    }
    
    // Data Synchronization Interactions
    if (element.classList.contains('sync-node')) {
        animateSyncNode(element);
    }
    
    if (element.classList.contains('sync-hub')) {
        animateSyncHub();
    }
    
    if (element.classList.contains('sync-status')) {
        animateSyncStatus();
    }
}

// AI Training Visual Animations
function animateDataFlow() {
    const arrows = document.querySelectorAll('.data-arrow');
    arrows.forEach(arrow => {
        arrow.style.animation = 'arrowPulse 0.5s ease-in-out';
        setTimeout(() => {
            arrow.style.animation = '';
        }, 500);
    });
}

function animateModelTraining() {
    const progressBar = document.querySelector('.progress-bar');
    const modelIcon = document.querySelector('.model-icon');
    
    if (progressBar && modelIcon) {
        // Animate progress bar
        progressBar.style.animation = 'progressFill 2s ease-in-out';
        
        // Animate model icon
        modelIcon.style.animation = 'spin 1s linear';
        
        setTimeout(() => {
            progressBar.style.animation = '';
            modelIcon.style.animation = '';
        }, 2000);
    }
}

function animateReplay() {
    const replayIcon = document.querySelector('.replay-icon');
    if (replayIcon) {
        replayIcon.style.animation = 'spin 1s linear';
        setTimeout(() => {
            replayIcon.style.animation = '';
        }, 1000);
    }
}

// Real-time Analytics Animations
function animateMetricsCounter() {
    const counter = document.querySelector('.metrics-count');
    if (counter) {
        counter.style.animation = 'counterTick 1s ease-in-out';
        setTimeout(() => {
            counter.style.animation = '';
        }, 1000);
    }
}

function animateProcessingStage(element) {
    element.style.animation = 'stageProcess 1s ease-in-out';
    setTimeout(() => {
        element.style.animation = '';
    }, 1000);
}

function animateRealTimeIndicator() {
    const pulseDot = document.querySelector('.pulse-dot');
    if (pulseDot) {
        pulseDot.style.animation = 'pulse 2s ease-in-out';
        setTimeout(() => {
            pulseDot.style.animation = '';
        }, 2000);
    }
}

// Microservices Animations
function animateServiceCommunication(serviceNode) {
    // Animate the clicked service node
    serviceNode.style.animation = 'serviceHighlight 1s ease-in-out';
    
    // Create connection lines to other services
    const allServices = document.querySelectorAll('.service-node');
    allServices.forEach(service => {
        if (service !== serviceNode) {
            service.style.animation = 'serviceConnect 1s ease-in-out';
        }
    });
    
    setTimeout(() => {
        allServices.forEach(service => {
            service.style.animation = '';
        });
    }, 1000);
}

function animateEventBus() {
    const eventBus = document.querySelector('.event-bus');
    const services = document.querySelectorAll('.service-node');
    
    if (eventBus) {
        eventBus.style.animation = 'eventBusActive 1.5s ease-in-out';
        
        // Animate all services to show communication
        services.forEach((service, index) => {
            setTimeout(() => {
                service.style.animation = 'serviceConnect 0.5s ease-in-out';
            }, index * 100);
        });
        
        setTimeout(() => {
            eventBus.style.animation = '';
            services.forEach(service => {
                service.style.animation = '';
            });
        }, 1500);
    }
}

// Data Synchronization Animations
function animateSyncNode(node) {
    node.style.animation = 'syncNodeActive 1s ease-in-out';
    
    // Trigger sync hub animation
    const syncHub = document.querySelector('.sync-hub');
    if (syncHub) {
        syncHub.style.animation = 'syncHubPulse 1s ease-in-out';
    }
    
    setTimeout(() => {
        node.style.animation = '';
        if (syncHub) {
            syncHub.style.animation = '';
        }
    }, 1000);
}

function animateSyncHub() {
    const syncWaves = document.querySelectorAll('.sync-wave');
    const syncNodes = document.querySelectorAll('.sync-node');
    
    // Animate sync waves
    syncWaves.forEach((wave, index) => {
        setTimeout(() => {
            wave.style.animation = 'syncWave 1s ease-out';
        }, index * 200);
    });
    
    // Animate all sync nodes
    syncNodes.forEach((node, index) => {
        setTimeout(() => {
            node.style.animation = 'syncNodeActive 0.5s ease-in-out';
        }, index * 100);
    });
    
    setTimeout(() => {
        syncWaves.forEach(wave => {
            wave.style.animation = '';
        });
        syncNodes.forEach(node => {
            node.style.animation = '';
        });
    }, 2000);
}

function animateSyncStatus() {
    const status = document.querySelector('.sync-status');
    if (status) {
        status.style.animation = 'statusUpdate 1s ease-in-out';
        setTimeout(() => {
            status.style.animation = '';
        }, 1000);
    }
}

// Continuous Animations
function startContinuousAnimations() {
    // AI Training continuous animations
    startProgressAnimation();
    startArrowAnimation();
    
    // Real-time Analytics continuous animations
    startMetricsAnimation();
    startPulseAnimation();
    
    // Microservices continuous animations
    startServiceAnimation();
    
    // Data Synchronization continuous animations
    startSyncAnimation();
}

function startProgressAnimation() {
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        setInterval(() => {
            progressBar.style.animation = 'progressFill 3s infinite ease-in-out';
        }, 3000);
    }
}

function startArrowAnimation() {
    const arrows = document.querySelectorAll('.data-arrow, .flow-arrow');
    arrows.forEach(arrow => {
        arrow.style.animation = 'arrowPulse 2s infinite ease-in-out';
    });
}

function startMetricsAnimation() {
    const metricsCount = document.querySelector('.metrics-count');
    if (metricsCount) {
        setInterval(() => {
            metricsCount.style.animation = 'counterTick 2s infinite ease-in-out';
        }, 2000);
    }
}

function startPulseAnimation() {
    const pulseDot = document.querySelector('.pulse-dot');
    if (pulseDot) {
        pulseDot.style.animation = 'pulse 1.5s infinite ease-in-out';
    }
}

function startServiceAnimation() {
    const flowStages = document.querySelectorAll('.flow-stage');
    flowStages.forEach((stage, index) => {
        stage.style.animation = `stageProcess 3s infinite ease-in-out ${index * 0.5}s`;
    });
}

function startSyncAnimation() {
    const syncWaves = document.querySelectorAll('.sync-wave');
    syncWaves.forEach((wave, index) => {
        wave.style.animation = `syncWave 3s infinite ease-out ${index * 0.75}s`;
    });
}

// Additional animation keyframes (these would be added to CSS)
const additionalAnimations = `
@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

@keyframes serviceHighlight {
    0%, 100% { transform: scale(1); border-color: var(--color-accent); }
    50% { transform: scale(1.1); border-color: var(--color-primary); }
}

@keyframes serviceConnect {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.05); opacity: 0.8; }
}

@keyframes eventBusActive {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
}

@keyframes syncNodeActive {
    0%, 100% { transform: scale(1); box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2); }
    50% { transform: scale(1.1); box-shadow: 0 4px 16px rgba(255, 68, 170, 0.3); }
}

@keyframes syncHubPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

@keyframes statusUpdate {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); background: linear-gradient(135deg, var(--color-secondary) 0%, var(--color-primary) 100%); }
}
`;

// Add additional CSS animations to the page
const style = document.createElement('style');
style.textContent = additionalAnimations;
document.head.appendChild(style);
