/*
 * → Ultimate Heinz Ketchup Empire - Enhanced Effects
 * → Created by MiniMax Agent
 * → Ultra-performance + advanced visual effects
 */

import { elements } from "./elements.js";

// Enhanced performance detection
const reduceMotion = typeof window !== "undefined" && typeof window.matchMedia === "function"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

// Performance-optimized device detection with advanced profiling
let deviceCache = null;
let lastCacheUpdate = 0;
const CACHE_DURATION = 1000; // Update cache every second

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
    
    // Screen density detection
    const pixelRatio = window.devicePixelRatio || 1;
    const pixelCount = width * height * pixelRatio;
    
    // Performance scoring
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
    
    // GPU detection (basic)
    let gpuScore = 0;
    try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (gl) {
            const renderer = gl.getParameter(gl.RENDERER);
            if (renderer.includes('adreno')) gpuScore += 15;
            else if (renderer.includes('mali')) gpuScore += 12;
            else if (renderer.includes('powervr')) gpuScore += 15;
            else if (renderer.includes('apple')) gpuScore += 18;
        }
    } catch (e) {
        // Canvas not available
    }
    performanceScore += gpuScore;
    
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
        performanceProfile: classifyPerformance(performanceScore)
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

// Clear cache on resize
window.addEventListener('resize', () => {
    deviceCache = null;
    lastCacheUpdate = 0;
}, { passive: true });

// Enhanced sound system
export function playSound(name, volume = 1) {
    const sound = elements.audio[name];
    if (!sound) return;
    
    // Apply volume
    sound.volume = Math.max(0, Math.min(1, volume));
    
    try {
        // Reset to beginning for rapid clicking
        sound.currentTime = 0;
        
        // Play with error handling
        const playPromise = sound.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                // Silently handle autoplay restrictions
                console.debug('Audio play failed:', error);
            });
        }
    } catch (error) {
        console.debug('Audio error:', error);
    }
}

// Enhanced particle system
export function spawnParticle(x, y, options = {}) {
    if (reduceMotion) return;
    
    const device = getDeviceInfo();
    
    // Disable particles on low-end devices for performance
    if (device.performanceProfile === 'Battery' || (device.isMobile && device.performanceProfile !== 'Ultra')) {
        return;
    }

    const particle = document.createElement("div");
    particle.className = "particle";
    
    // Enhanced positioning
    particle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        user-select: none;
        z-index: 50;
        border-radius: 50%;
        background: radial-gradient(circle, var(--gold), var(--primary-red));
        box-shadow: 0 0 10px currentColor;
        transform: translate(-50%, -50%);
        will-change: transform, opacity;
        contain: layout style paint;
    `;
    
    // Performance-optimized animation
    const angle = Math.random() * Math.PI * 2;
    const distance = 30 + Math.random() * 70;
    const duration = device.performanceProfile === 'Ultra' ? 600 : 800;
    const size = 4 + Math.random() * 6;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Use transform for better performance
    particle.style.transition = `transform ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity ${duration}ms ease-out`;
    
    // Set final position
    const finalX = Math.cos(angle) * distance;
    const finalY = Math.sin(angle) * distance;
    
    document.body.appendChild(particle);
    
    // Trigger animation
    requestAnimationFrame(() => {
        particle.style.transform = `translate(${finalX}px, ${finalY}px)`;
        particle.style.opacity = '0';
    });
    
    // Cleanup
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
        }
    }, duration + 100);
}

// Ultra-optimized click effect system with enhanced features
export function spawnClickEffect(x, y, value, speed = 500, options = {}) {
    const device = getDeviceInfo();
    
    // Create effect element
    const effect = document.createElement("div");
    effect.className = "click-effect";
    effect.textContent = `+${value}`;
    
    // Ultra-optimized positioning with hardware acceleration
    effect.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        user-select: none;
        z-index: 100;
        font-weight: 700;
        white-space: nowrap;
        font-family: 'Orbitron', 'Poppins', sans-serif;
        text-shadow: 0 0 10px currentColor;
        will-change: transform, opacity;
        backface-visibility: hidden;
        transform: translate3d(-50%, -50%, 0);
        contain: layout style paint;
    `;

    // Performance-optimized responsive sizing
    let fontSize;
    const baseSize = device.performanceProfile === 'Ultra' ? 2.0 :
                     device.performanceProfile === 'High' ? 1.8 :
                     device.isMobile ? 1.4 : 2.0;
    
    // Enhanced color system based on click speed and device
    let color, sizeMultiplier, glowIntensity;
    
    if (speed < 80) {
        color = "#FFD700"; // Gold - Ultra fast
        sizeMultiplier = 1.8;
        glowIntensity = 0.9;
    } else if (speed < 150) {
        color = "#00FF88"; // Green - Very fast
        sizeMultiplier = 1.6;
        glowIntensity = 0.8;
    } else if (speed < 250) {
        color = "#00D4FF"; // Cyan - Fast
        sizeMultiplier = 1.4;
        glowIntensity = 0.7;
    } else if (speed < 400) {
        color = "#FF6B6B"; // Red - Medium
        sizeMultiplier = 1.2;
        glowIntensity = 0.6;
    } else {
        color = "#FFFFFF"; // White - Slow
        sizeMultiplier = 1.0;
        glowIntensity = 0.5;
    }
    
    const finalSize = baseSize * sizeMultiplier;
    
    // Apply optimized styles
    effect.style.color = color;
    effect.style.fontSize = `${finalSize}rem`;
    effect.style.textShadow = `0 0 ${15 * glowIntensity}px ${color}, 0 0 ${30 * glowIntensity}px ${color}`;
    
    document.body.appendChild(effect);

    // Ultra-smooth animation with performance optimization
    requestAnimationFrame(() => {
        const duration = device.performanceProfile === 'Ultra' ? 400 :
                        device.performanceProfile === 'High' ? 500 :
                        device.isMobile ? 600 : 800;
        
        const distance = device.performanceProfile === 'Ultra' ? -60 :
                        device.performanceProfile === 'High' ? -50 :
                        device.isMobile ? -40 : -80;
        
        const scale = device.performanceProfile === 'Ultra' ? 1.5 :
                     device.performanceProfile === 'High' ? 1.4 :
                     device.isMobile ? 1.2 : 1.6;

        // Use transform3d for maximum hardware acceleration
        effect.style.transition = `transform ${duration}ms cubic-bezier(0.23, 1, 0.32, 1), opacity ${duration}ms ease-out`;
        effect.style.transform = `translate3d(-50%, ${distance}px, 0) scale(${scale})`;
        effect.style.opacity = "0";
    });

    // Optimized cleanup
    const lifetime = device.performanceProfile === 'Ultra' ? 450 :
                    device.performanceProfile === 'High' ? 550 :
                    device.isMobile ? 650 : 850;
    
    setTimeout(() => {
        if (effect.parentNode) {
            effect.remove();
        }
    }, lifetime);
}

// Enhanced screen shake with performance optimization
export function shakeScreen(intensity = 1) {
    if (reduceMotion) return;
    
    const device = getDeviceInfo();
    
    // Reduced shake on mobile for better performance
    if (device.performanceProfile === 'Battery' || (device.isMobile && device.performanceProfile === 'Balanced')) {
        return;
    }
    
    const body = document.body;
    const originalTransform = body.style.transform;
    
    // Performance-optimized shake animation
    const shakeIntensity = intensity * (device.performanceProfile === 'Ultra' ? 1 : 0.7);
    
    body.style.transform = 'translateZ(0)';
    body.style.willChange = 'transform';
    
    const keyframes = [
        { transform: 'translateZ(0) translate(0, 0)' },
        { transform: `translateZ(0) translate(${shakeIntensity * -2}px, ${shakeIntensity}px)` },
        { transform: `translateZ(0) translate(${shakeIntensity * 2}px, ${-shakeIntensity}px)` },
        { transform: `translateZ(0) translate(${shakeIntensity * -1}px, ${shakeIntensity * 0.5}px)` },
        { transform: 'translateZ(0) translate(0, 0)' }
    ];
    
    body.animate(keyframes, {
        duration: 400,
        easing: 'ease-in-out'
    }).addEventListener('finish', () => {
        body.style.transform = originalTransform;
        body.style.willChange = 'auto';
    });
}

// Enhanced loading screen management
export function hideLoadingScreen() {
    if (elements.loadingScreen) {
        elements.loadingScreen.classList.add("hidden");
        
        // Remove from DOM after animation
        setTimeout(() => {
            if (elements.loadingScreen && elements.loadingScreen.parentNode) {
                elements.loadingScreen.parentNode.removeChild(elements.loadingScreen);
            }
        }, 600);
    }
}

// Enhanced achievement popup with advanced features
export function showAchievementPopup(title, description, options = {}) {
    const { 
        playAudio = true, 
        icon = '🏆', 
        reward = '',
        duration = 4000 
    } = options;
    
    const popup = elements.achievementPopup;
    if (!popup) return;
    
    // Update content
    const titleElement = document.getElementById('achievementTitle');
    const descElement = document.getElementById('achievementDesc');
    const iconElement = document.getElementById('achievementIcon');
    const rewardElement = document.getElementById('achievementReward');
    
    if (titleElement) titleElement.textContent = title;
    if (descElement) descElement.textContent = description;
    if (iconElement) iconElement.textContent = icon;
    if (rewardElement) {
        rewardElement.textContent = reward;
        rewardElement.style.display = reward ? 'block' : 'none';
    }
    
    // Show popup
    popup.classList.add("show");
    
    // Play sound
    if (playAudio) {
        playSound("achievement", 0.8);
    }
    
    // Add special effects for significant achievements
    if (title.toLowerCase().includes('pierwsze') || title.toLowerCase().includes('first')) {
        shakeScreen(0.5);
    }
    
    // Auto-hide with enhanced animation
    setTimeout(() => {
        popup.classList.remove("show");
    }, duration);
}

// Enhanced visual feedback system
export function createRippleEffect(x, y, options = {}) {
    const { 
        color = 'var(--gold)', 
        size = 60, 
        duration = 600 
    } = options;
    
    const device = getDeviceInfo();
    
    // Disable on low-performance devices
    if (device.performanceProfile === 'Battery') {
        return;
    }
    
    const ripple = document.createElement("div");
    ripple.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        border: 2px solid ${color};
        border-radius: 50%;
        pointer-events: none;
        user-select: none;
        z-index: 90;
        opacity: 0.8;
        transform: translate(-50%, -50%) scale(0);
        will-change: transform, opacity;
        contain: layout style paint;
    `;
    
    document.body.appendChild(ripple);
    
    // Animate ripple
    requestAnimationFrame(() => {
        ripple.style.transition = `transform ${duration}ms ease-out, opacity ${duration}ms ease-out`;
        ripple.style.transform = `translate(-50%, -50%) scale(2.5)`;
        ripple.style.opacity = '0';
    });
    
    // Cleanup
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.remove();
        }
    }, duration + 100);
}

// Enhanced ambient effects
export function createAmbientEffect(element, type = 'glow') {
    if (reduceMotion) return;
    
    const device = getDeviceInfo();
    
    // Disable ambient effects on low-performance devices
    if (device.performanceProfile === 'Battery') {
        return;
    }
    
    if (type === 'glow') {
        element.style.animation = `ambientGlow ${device.performanceProfile === 'Ultra' ? 3 : 4}s ease-in-out infinite`;
    } else if (type === 'pulse') {
        element.style.animation = `ambientPulse ${device.performanceProfile === 'Ultra' ? 2 : 3}s ease-in-out infinite`;
    }
}

// Performance monitoring utilities
export function measurePerformance(name, fn) {
    if (getDeviceInfo().performanceProfile === 'Battery') {
        return fn(); // Skip measurement on low-performance devices
    }
    
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    
    console.debug(`Performance [${name}]: ${(end - start).toFixed(2)}ms`);
    return result;
}

// Enhanced effects manager
export class EffectsManager {
    constructor() {
        this.maxEffects = 10; // Limit effects for performance
        this.activeEffects = new Set();
    }
    
    spawnClickEffect(x, y, value, speed, options) {
        // Clean up old effects if too many
        if (this.activeEffects.size >= this.maxEffects) {
            const firstEffect = this.activeEffects.values().next().value;
            if (firstEffect && firstEffect.parentNode) {
                firstEffect.remove();
                this.activeEffects.delete(firstEffect);
            }
        }
        
        // Create and track new effect
        spawnClickEffect(x, y, value, speed, options);
        
        // Note: We can't track the created effect directly due to async creation
        // This is a simplified version for performance
    }
    
    clearAllEffects() {
        const effects = document.querySelectorAll('.click-effect, .particle');
        effects.forEach(effect => {
            if (effect.parentNode) {
                effect.remove();
            }
        });
        this.activeEffects.clear();
    }
}

// Create global effects manager instance
export const effectsManager = new EffectsManager();