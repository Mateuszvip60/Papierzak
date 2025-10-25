/*
 * → Ultimate Heinz Ketchup Empire - Enhanced Bottle Interaction
 * → Created by MiniMax Agent
 * → Ultra-performance + advanced mobile optimizations
 */

import { elements } from "./elements.js";
import { playSound, spawnParticle, spawnClickEffect, createRippleEffect } from "./effects_enhanced.js";

// Ultra-performance device detection with advanced profiling
let deviceCache = null;
let lastCacheUpdate = 0;
const CACHE_DURATION = 500; // Update cache every 500ms for dynamic profiling

function getDeviceInfo() {
    const now = performance.now();
    
    if (deviceCache && (now - lastCacheUpdate) < CACHE_DURATION) {
        return deviceCache;
    }
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    const ua = navigator.userAgent.toLowerCase();
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Enhanced processor detection
    const isHelio = ua.includes('helio') || ua.includes('mt') || ua.includes('mediatek');
    const isSnapdragon = ua.includes('snapdragon') || ua.includes('qualcomm');
    const isExynos = ua.includes('exynos') || ua.includes('samsung');
    const isKirin = ua.includes('kirin') || ua.includes('huawei');
    const isA系列 = ua.includes('a1') || ua.includes('apple');
    const isIOS = /iPad|iPhone|iPod/.test(ua);
    
    // Screen density and performance factors
    const pixelRatio = window.devicePixelRatio || 1;
    const pixelCount = width * height * pixelRatio;
    
    // Performance scoring for adaptive behavior
    let performanceScore = 0;
    
    // Screen performance factor
    if (pixelCount > 8000000) performanceScore += 15; // 4K displays
    else if (pixelCount > 2000000) performanceScore += 10; // 1080p displays
    else performanceScore += 5;
    
    // Processor detection with scoring
    if (isHelio) performanceScore += 20;
    else if (isSnapdragon) performanceScore += 25;
    else if (isExynos) performanceScore += 22;
    else if (isKirin) performanceScore += 22;
    else if (isA系列) performanceScore += 30;
    
    // iOS optimizations
    if (isIOS) performanceScore += 12;
    
    // Touch optimization
    if (isTouch) performanceScore += 8;
    
    // Memory and battery detection (basic)
    const isLowEndDevice = performanceScore < 45;
    
    deviceCache = {
        width,
        height,
        isMobile: width <= 768,
        isTablet: width > 768 && width <= 1024,
        isDesktop: width > 1024,
        isTouch,
        pixelRatio,
        pixelCount,
        isHelio,
        isSnapdragon,
        isExynos,
        isKirin,
        isA系列,
        isIOS,
        performanceScore,
        performanceProfile: classifyPerformance(performanceScore),
        isLowEndDevice
    };
    
    lastCacheUpdate = now;
    return deviceCache;
}

function classifyPerformance(score) {
    if (score >= 80) return 'Ultra';
    if (score >= 65) return 'High';
    if (score >= 45) return 'Balanced';
    return 'Battery';
}

// Enhanced click timing system for combo detection
class ClickTimingSystem {
    constructor() {
        this.clickHistory = [];
        this.maxHistoryLength = 10;
        this.comboWindow = 1000; // 1 second window for combo
    }
    
    recordClick(time) {
        this.clickHistory.push(time);
        
        // Keep only recent clicks
        while (this.clickHistory.length > this.maxHistoryLength) {
            this.clickHistory.shift();
        }
    }
    
    getClickSpeed() {
        if (this.clickHistory.length < 2) return 1000;
        
        const recent = this.clickHistory.slice(-2);
        return recent[1] - recent[0];
    }
    
    getComboCount() {
        const now = performance.now();
        const recentClicks = this.clickHistory.filter(time => (now - time) <= this.comboWindow);
        return recentClicks.length;
    }
    
    isRapidClicking() {
        return this.getComboCount() >= 5;
    }
}

// Enhanced haptic feedback system
class HapticFeedback {
    constructor() {
        this.enabled = false;
        this.supported = 'vibrate' in navigator;
        
        if (this.supported) {
            this.enabled = true;
        }
    }
    
    light() {
        if (!this.enabled) return;
        try {
            navigator.vibrate(10);
        } catch (e) {
            // Vibrate not supported or permission denied
        }
    }
    
    medium() {
        if (!this.enabled) return;
        try {
            navigator.vibrate(20);
        } catch (e) {
            // Vibrate not supported
        }
    }
    
    heavy() {
        if (!this.enabled) return;
        try {
            navigator.vibrate(30);
        } catch (e) {
            // Vibrate not supported
        }
    }
}

// Enhanced bottle interaction manager
export function bindBottle({ getClickPower, onClick, formatValue }) {
    console.log('🔧 Enhanced bottle binding initialized...');
    
    // Ensure bottle element exists
    if (!elements.bottle) {
        console.error('❌ Enhanced bottle element not found!');
        return;
    }
    
    console.log('✅ Enhanced bottle element found:', elements.bottle);
    
    const deviceInfo = getDeviceInfo();
    console.log('📱 Enhanced device info:', deviceInfo);
    
    // Initialize systems
    const clickTiming = new ClickTimingSystem();
    const haptics = new HapticFeedback();
    
    // Ultra-optimized click handler for all devices
    function handleClick(event) {
        console.log('🖱️ Enhanced click detected on bottle, power:', getClickPower());
        
        // Prevent default behavior
        event.preventDefault();
        event.stopPropagation();
        
        // Record click timing
        const now = performance.now();
        clickTiming.recordClick(now);
        
        // Get click power
        const power = getClickPower();
        
        // Enhanced visual feedback
        performEnhancedClickFeedback(power);
        
        // Execute click callback
        onClick(power);
        
        // Enhanced sound system
        playEnhancedClickSound(power);
        
        // Enhanced visual effects
        performEnhancedVisualEffects(event, power);
        
        // Haptic feedback for mobile
        performHapticFeedback(power);
    }
    
    // Enhanced click feedback system
    function performEnhancedClickFeedback(power) {
        const clickDuration = deviceInfo.performanceProfile === 'Ultra' ? 60 :
                             deviceInfo.performanceProfile === 'High' ? 80 :
                             deviceInfo.isMobile ? 100 : 150;
        
        // Add clicked class for animation
        elements.bottle.classList.add("clicked");
        
        // Remove class after animation
        setTimeout(() => {
            elements.bottle.classList.remove("clicked");
        }, clickDuration);
    }
    
    // Enhanced sound system
    function playEnhancedClickSound(power) {
        // Calculate volume based on click power
        const baseVolume = Math.min(0.3 + (power / 1000), 0.8);
        
        // Play click sound
        playSound("click", baseVolume);
    }
    
    // Enhanced visual effects
    function performEnhancedVisualEffects(event, power) {
        // Get bottle position for effects
        const rect = elements.bottle.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Enhanced click position detection
        let clickX, clickY;
        
        if (deviceInfo.isTouch) {
            // Touch events
            if (event.touches && event.touches[0]) {
                clickX = event.touches[0].clientX;
                clickY = event.touches[0].clientY;
            } else if (event.changedTouches && event.changedTouches[0]) {
                clickX = event.changedTouches[0].clientX;
                clickY = event.changedTouches[0].clientY;
            } else {
                clickX = centerX;
                clickY = centerY;
            }
        } else {
            // Mouse events
            clickX = event.clientX || centerX;
            clickY = event.clientY || centerY;
        }
        
        // Validate coordinates
        if (!clickX || !clickY || clickX < 0 || clickY < 0) {
            clickX = centerX;
            clickY = centerY;
        }
        
        // Calculate click speed for effects
        const clickSpeed = clickTiming.getClickSpeed();
        const formatted = typeof formatValue === "function" ? formatValue(power) : power;
        
        // Enhanced click effect
        spawnClickEffect(clickX, clickY, formatted, clickSpeed);
        
        // Ripple effect for strong clicks
        if (power > 100) {
            createRippleEffect(clickX, clickY, {
                color: power > 1000 ? 'var(--gold)' : 'var(--light-red)',
                size: Math.min(100 + (power / 10), 200),
                duration: deviceInfo.performanceProfile === 'Ultra' ? 400 : 600
            });
        }
        
        // Particle effects for rapid clicking
        if (clickTiming.isRapidClicking() && deviceInfo.performanceProfile !== 'Battery') {
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    spawnParticle(centerX, centerY);
                }, i * 50);
            }
        }
        
        // Store last click time for speed calculation
        elements.bottle.dataset.lastClickTime = now.toString();
        
        // Bonus effects for very powerful clicks
        performBonusEffects(centerX, centerY, power);
    }
    
    // Bonus effects for special clicks
    function performBonusEffects(x, y, power) {
        const deviceInfo = getDeviceInfo();
        let bonusChance;
        
        if (deviceInfo.performanceProfile === 'Ultra') {
            bonusChance = 0.15; // Higher chance on ultra devices
        } else if (deviceInfo.performanceProfile === 'High') {
            bonusChance = 0.10;
        } else if (deviceInfo.isMobile) {
            bonusChance = 0.05; // Lower chance on mobile for performance
        } else {
            bonusChance = 0.12;
        }
        
        if (Math.random() < bonusChance) {
            const offsetX = (Math.random() - 0.5) * 80;
            const offsetY = (Math.random() - 0.5) * 80;
            
            const bonusDelay = deviceInfo.performanceProfile === 'Ultra' ? 20 : 
                              deviceInfo.performanceProfile === 'High' ? 30 : 50;
            
            setTimeout(() => {
                spawnClickEffect(x + offsetX, y + offsetY, power, 50);
                onClick(power);
            }, bonusDelay);
        }
    }
    
    // Enhanced haptic feedback
    function performHapticFeedback(power) {
        if (!deviceInfo.isTouch) return;
        
        if (power > 1000) {
            haptics.heavy();
        } else if (power > 100) {
            haptics.medium();
        } else {
            haptics.light();
        }
    }
    
    // Event listeners optimized for different devices
    if (deviceInfo.isTouch) {
        // Touch-optimized events for mobile
        elements.bottle.addEventListener("touchend", handleClick, { passive: false });
        
        // Prevent unwanted behaviors on mobile
        elements.bottle.addEventListener("contextmenu", (event) => {
            event.preventDefault();
        });
        
        elements.bottle.addEventListener("dragstart", (event) => {
            event.preventDefault();
        });
        
        // Prevent double-tap zoom and other unwanted behaviors
        elements.bottle.addEventListener("touchstart", (event) => {
            event.preventDefault();
        }, { passive: false });
        
        // Ultra-optimized touch styles
        elements.bottle.style.cssText += `
            -webkit-tap-highlight-color: transparent;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            user-select: none;
            touch-action: manipulation;
            -webkit-touch-scrolling: touch;
        `;
        
    } else {
        // Desktop mouse events
        elements.bottle.addEventListener("click", handleClick);
        
        // Enhanced hover effects for desktop
        elements.bottle.addEventListener("mouseenter", () => {
            if (deviceInfo.performanceProfile !== 'Battery') {
                elements.bottle.style.transform = 'translateY(-4px) scale(1.02) translateZ(0)';
            }
        });
        
        elements.bottle.addEventListener("mouseleave", () => {
            if (deviceInfo.performanceProfile !== 'Battery') {
                elements.bottle.style.transform = 'translateZ(0)';
            }
        });
    }
    
    // Performance optimizations based on device capability
    if (deviceInfo.performanceProfile === 'Ultra') {
        // Enable all optimizations for ultra devices
        elements.bottle.style.transform = 'translateZ(0)';
        elements.bottle.style.willChange = 'transform';
        elements.bottle.style.backfaceVisibility = 'hidden';
        elements.bottle.style.perspective = '1000px';
        
        // Enable additional visual effects
        elements.bottle.style.filter = 'brightness(1) saturate(1.1)';
        
    } else if (deviceInfo.performanceProfile === 'High') {
        // Enable most optimizations for high-end devices
        elements.bottle.style.transform = 'translateZ(0)';
        elements.bottle.style.willChange = 'transform';
        elements.bottle.style.backfaceVisibility = 'hidden';
        
    } else if (deviceInfo.performanceProfile === 'Balanced') {
        // Enable basic optimizations
        elements.bottle.style.transform = 'translateZ(0)';
        
    } else {
        // Battery mode - minimal optimizations
        elements.bottle.style.willChange = 'auto';
        elements.bottle.style.transform = 'none';
    }
    
    // Enhanced accessibility
    elements.bottle.setAttribute('role', 'button');
    elements.bottle.setAttribute('aria-label', 'Butelka ketchup Heinz - kliknij aby produkować krople');
    elements.bottle.setAttribute('tabindex', '0');
    
    // Keyboard support
    elements.bottle.addEventListener('keydown', (event) => {
        if (event.code === 'Space' || event.code === 'Enter') {
            event.preventDefault();
            handleClick({ 
                preventDefault: () => {}, 
                stopPropagation: () => {},
                clientX: rect.left + rect.width / 2,
                clientY: rect.top + rect.height / 2
            });
        }
    });
    
    // Performance monitoring
    if (deviceInfo.performanceProfile === 'Ultra') {
        console.log('🚀 Ultra-performance mode enabled for bottle interactions');
    }
    
    console.log('✅ Enhanced bottle binding completed successfully!');
    console.log('🎮 Performance Profile:', deviceInfo.performanceProfile);
    console.log('📱 Touch Device:', deviceInfo.isTouch);
    console.log('⚡ Haptic Feedback:', haptics.enabled);
}