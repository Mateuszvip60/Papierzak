/*
 * → Ultimate Heinz Ketchup Empire - Enhanced Edition
 * → Created by MiniMax Agent
 * → Ultra-performance optimizations + new features
 */

// Core imports
import { hydrateState, registerClick, spendDrops, unlockSkin, setSkin, beginRebirth, setOnlineFeatures } from "./core/state.js";
import { computeStats, calculateClickPower, buyUpgrade, estimateRebirth, buySoulUpgrade } from "./core/calculations.js";
import { evaluateAchievements } from "./core/achievements.js";
import { createGameLoop } from "./core/gameLoop.js";
import { renderStats } from "./ui/renderStats.js";
import { renderUpgrades } from "./ui/renderUpgrades.js";
import { renderSoulUpgrades } from "./ui/renderSoulUpgrades.js";
import { renderAchievements } from "./ui/renderAchievements.js";
import { renderLeaderboard } from "./ui/renderLeaderboard.js";
import { renderSkins, renderBottle } from "./ui/renderSkins.js";
import { renderRebirth } from "./ui/renderRebirth.js";
import { bindBottle } from "./ui/bottle_enhanced.js";
import { showAchievementPopup, playSound, hideLoadingScreen } from "./ui/effects_enhanced.js";
import { elements } from "./ui/elements.js";
import { showLeaderboard, showUpgrades, showRegularUpgrades, showSoulUpgrades, showAchievements, showStats } from "./ui/tabs.js";
import { openRebirthModal, closeRebirthModal } from "./ui/rebirthModal.js";
import { promptForPlayerName } from "./ui/playerName.js";
import { createI18n, applyTranslationsToDom, applyPlaceholders } from "./services/i18n.js";
import { createLeaderboardManager } from "./services/leaderboard.js";
import { createAutoSaver } from "./services/autoSaver.js";
import { loadGameState, saveGameState } from "./services/storage.js";
import { formatNumber } from "./utils/number.js";
import { skins } from "./data/skins.js";

// Enhanced performance monitoring
class PerformanceMonitor {
    constructor() {
        this.fps = 60;
        this.frameCount = 0;
        this.lastTime = performance.now();
        this.rafId = null;
        this.isEnabled = false;
    }

    start() {
        if (this.isEnabled) return;
        this.isEnabled = true;
        this.updateLoop();
    }

    stop() {
        this.isEnabled = false;
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
            this.rafId = null;
        }
    }

    updateLoop() {
        if (!this.isEnabled) return;

        const now = performance.now();
        const delta = now - this.lastTime;

        this.frameCount++;
        
        if (delta >= 1000) {
            this.fps = Math.round((this.frameCount * 1000) / delta);
            this.frameCount = 0;
            this.lastTime = now;
            
            this.updateDisplay();
        }

        this.rafId = requestAnimationFrame(() => this.updateLoop());
    }

    updateDisplay() {
        const fpsElement = document.getElementById('fpsValue');
        const profileElement = document.getElementById('profileValue');
        
        if (fpsElement) fpsElement.textContent = this.fps;
        if (profileElement) {
            const profile = detectPerformanceProfile();
            if (profileElement) profileElement.textContent = profile;
        }
    }
}

// Advanced device detection with performance profiling
function detectPerformanceProfile() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const ua = navigator.userAgent.toLowerCase();
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Enhanced detection for different processors
    const isHelio = ua.includes('helio') || ua.includes('mt') || ua.includes('mediatek');
    const isSnapdragon = ua.includes('snapdragon') || ua.includes('qualcomm');
    const isExynos = ua.includes('exynos') || ua.includes('samsung');
    const isKirin = ua.includes('kirin') || ua.includes('huawei');
    const isA系列 = ua.includes('a1') || ua.includes('apple');
    const isIOS = /iPad|iPhone|iPod/.test(ua);
    
    // Performance score based on multiple factors
    let score = 0;
    
    // Screen resolution factor
    const pixelCount = width * height;
    if (pixelCount > 2073600) score += 30; // 1080p+
    else if (pixelCount > 921600) score += 20; // 720p+
    else score += 10;
    
    // Processor detection
    if (isHelio) score += 25;
    else if (isSnapdragon) score += 35;
    else if (isExynos) score += 30;
    else if (isKirin) score += 30;
    else if (isA系列) score += 40;
    
    // Touch capability
    if (isTouch) score += 10;
    
    // iOS optimization
    if (isIOS) score += 15;
    
    // GPU detection (basic)
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
        const renderer = gl.getParameter(gl.RENDERER);
        if (renderer.includes('adreno')) score += 20;
        else if (renderer.includes('mali')) score += 15;
        else if (renderer.includes('powervr')) score += 20;
    }
    
    // Classify performance profile
    if (score >= 80) return 'Ultra';
    else if (score >= 60) return 'High';
    else if (score >= 40) return 'Balanced';
    else return 'Battery';
}

// Enhanced game state with new features
class EnhancedGameState {
    constructor() {
        this.autoClickEnabled = false;
        this.boostEnabled = false;
        this.multiplyClicksEnabled = false;
        this.comboMultiplier = 1;
        this.comboTime = 0;
        this.lastComboTime = 0;
        this.performanceProfile = 'auto';
        this.settings = {
            soundEnabled: true,
            autoSaveInterval: 5000,
            performanceMode: 'auto',
            showFPS: false
        };
    }
}

// Enhanced combo system
class ComboSystem {
    constructor() {
        this.comboCount = 0;
        this.lastClickTime = 0;
        this.comboWindow = 1000; // 1 second window
        this.maxCombo = 50;
        this.comboMultiplier = 1;
    }

    onClick() {
        const now = performance.now();
        
        if (now - this.lastClickTime <= this.comboWindow) {
            this.comboCount++;
            this.lastClickTime = now;
        } else {
            this.comboCount = 1;
            this.lastClickTime = now;
        }
        
        // Calculate combo multiplier
        this.comboMultiplier = Math.min(1 + (this.comboCount * 0.1), 5);
        
        // Show combo display if significant
        if (this.comboCount >= 5) {
            this.showComboDisplay();
        }
    }

    showComboDisplay() {
        const comboDisplay = document.getElementById('comboDisplay');
        if (comboDisplay) {
            comboDisplay.textContent = `Combo x${this.comboCount.toFixed(0)}`;
            comboDisplay.style.display = 'block';
            
            setTimeout(() => {
                comboDisplay.style.display = 'none';
            }, 1000);
        }
    }

    reset() {
        this.comboCount = 0;
        this.comboMultiplier = 1;
    }
}

// Performance optimization manager
class PerformanceManager {
    constructor() {
        this.profile = 'auto';
        this.fps = 60;
        this.frameCount = 0;
        this.lastTime = performance.now();
        this.isLowPerformance = false;
    }

    updateProfile() {
        this.profile = detectPerformanceProfile();
        
        // Apply performance optimizations
        this.applyOptimizations();
        
        // Update document class for CSS optimizations
        document.body.className = `performance-${this.profile.toLowerCase()}`;
    }

    applyOptimizations() {
        const body = document.body;
        
        switch (this.profile) {
            case 'Ultra':
                // Enable all optimizations
                body.style.setProperty('--transition-speed', '0.1s');
                body.style.setProperty('--animation-duration', '0.5s');
                break;
            case 'High':
                body.style.setProperty('--transition-speed', '0.2s');
                body.style.setProperty('--animation-duration', '0.7s');
                break;
            case 'Balanced':
                body.style.setProperty('--transition-speed', '0.3s');
                body.style.setProperty('--animation-duration', '1s');
                break;
            case 'Battery':
                body.style.setProperty('--transition-speed', '0.5s');
                body.style.setProperty('--animation-duration', '1.5s');
                break;
        }
    }
}

// Auto-click system
class AutoClickSystem {
    constructor() {
        this.enabled = false;
        this.interval = null;
        this.clickPower = 1;
        this.clickRate = 10; // clicks per second
    }

    start(gameState, getClickPower) {
        if (this.enabled) return;
        
        this.enabled = true;
        this.clickPower = getClickPower();
        
        this.interval = setInterval(() => {
            if (!this.enabled) return;
            
            // Register auto click
            registerClick(gameState, this.clickPower);
            
            // Update click power periodically
            this.clickPower = getClickPower();
        }, 1000 / this.clickRate);
    }

    stop() {
        if (!this.enabled) return;
        
        this.enabled = false;
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    setClickRate(rate) {
        this.clickRate = rate;
        if (this.enabled) {
            this.stop();
            this.start(); // Restart with new rate
        }
    }
}

// Boost system
class BoostSystem {
    constructor() {
        this.enabled = false;
        this.multiplier = 2;
        this.duration = 30000; // 30 seconds
        this.timer = null;
        this.endTime = 0;
    }

    activate() {
        if (this.enabled) return false;
        
        this.enabled = true;
        this.endTime = Date.now() + this.duration;
        
        this.timer = setInterval(() => {
            if (Date.now() >= this.endTime) {
                this.deactivate();
            }
        }, 1000);
        
        return true;
    }

    deactivate() {
        if (!this.enabled) return;
        
        this.enabled = false;
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    getMultiplier() {
        return this.enabled ? this.multiplier : 1;
    }

    getRemainingTime() {
        return this.enabled ? Math.ceil((this.endTime - Date.now()) / 1000) : 0;
    }
}

// Enhanced click power calculation
function calculateEnhancedClickPower(basePower, comboMultiplier, boostMultiplier, multiplyEnabled) {
    let power = basePower;
    
    // Apply combo multiplier
    power *= comboMultiplier;
    
    // Apply boost multiplier
    power *= boostMultiplier;
    
    // Apply click multiplication
    if (multiplyEnabled) {
        power *= 3;
    }
    
    return Math.floor(power);
}

// Game initialization
const saved = loadGameState();
const state = hydrateState(saved);
const i18n = createI18n(state);
let stats = computeStats(state);

// Enhanced game components
const performanceMonitor = new PerformanceMonitor();
const performanceManager = new PerformanceManager();
const comboSystem = new ComboSystem();
const autoClickSystem = new AutoClickSystem();
const boostSystem = new BoostSystem();
const enhancedState = new EnhancedGameState();

// Update performance profile
performanceManager.updateProfile();

const leaderboardManager = createLeaderboardManager(state);
const autoSaver = createAutoSaver(state, saveGameState, 5000);

// Enhanced translation function
function translate(key) {
    return i18n.t(key);
}

// Update language toggle with enhanced UI
function updateLanguageToggle() {
    if (elements.languageToggle) {
        elements.languageToggle.textContent = `🌍 ${i18n.getLanguage().toUpperCase()}`;
    }
}

// Enhanced stats refresh with new features
function refreshStats() {
    renderStats(state, stats);
    
    // Update enhanced stats
    const clickPowerElement = document.getElementById('clickPower');
    if (clickPowerElement) {
        const enhancedPower = calculateEnhancedClickPower(
            calculateClickPower(state),
            comboSystem.comboMultiplier,
            boostSystem.getMultiplier(),
            enhancedState.multiplyClicksEnabled
        );
        clickPowerElement.textContent = formatNumber(enhancedPower);
    }
    
    // Update prestige level (placeholder for now)
    const prestigeElement = document.getElementById('prestigeLevel');
    if (prestigeElement) {
        prestigeElement.textContent = Math.floor(state.rebirthCount / 10);
    }
    
    // Update rebirth info with enhanced preview
    renderRebirth(state, translate, estimateRebirth(state));
}

// Enhanced translations refresh
function refreshTranslations() {
    applyTranslationsToDom(translate);
    applyPlaceholders(translate);
    updateLanguageToggle();
    refreshUpgrades();
    refreshLeaderboard();
    refreshStats();
}

// Enhanced upgrades refresh with filters
function refreshUpgrades() {
    renderUpgrades(state, translate, { onBuy: handleUpgradeClick });
    
    // Update tab counts
    updateTabCounts();
}

function refreshSoulUpgrades() {
    renderSoulUpgrades(state, translate, { onBuy: handleSoulUpgradeClick });
    updateTabCounts();
}

function refreshAchievements() {
    renderAchievements(state, translate);
    updateTabCounts();
}

function refreshSkins() {
    renderSkins(state, { onSelect: handleSkinSelect });
    renderBottle(state);
}

function refreshLeaderboard() {
    if (!elements.leaderboardContainer) {
        return;
    }
    renderLeaderboard({
        state,
        data: leaderboardManager.getData(),
        category: leaderboardManager.getCategory(),
        translate,
        syncEnabled: leaderboardManager.getSyncStatus(),
        onlineEnabled: state.onlineFeaturesEnabled
    });
}

// Update tab counts for better UX
function updateTabCounts() {
    const regularCount = document.getElementById('regularCount');
    const soulCount = document.getElementById('soulCount');
    const achievementCount = document.getElementById('achievementCount');
    
    if (regularCount) {
        // Count available upgrades
        const availableUpgrades = state.upgrades ? Object.values(state.upgrades).filter(u => u.level < u.maxLevel).length : 0;
        regularCount.textContent = availableUpgrades;
    }
    
    if (soulCount) {
        // Count available soul upgrades
        const availableSoulUpgrades = state.soulUpgrades ? Object.values(state.soulUpgrades).filter(u => u.level < u.maxLevel).length : 0;
        soulCount.textContent = availableSoulUpgrades;
    }
    
    if (achievementCount) {
        // Count locked achievements
        const totalAchievements = 50; // Placeholder
        const unlockedAchievements = state.achievements ? Object.values(state.achievements).filter(a => a.unlocked).length : 0;
        achievementCount.textContent = `${unlockedAchievements}/${totalAchievements}`;
    }
}

// Enhanced upgrade click handler
function handleUpgradeClick(id) {
    if (!buyUpgrade(state, id)) return;
    
    stats = computeStats(state);
    playSound("upgrade");
    refreshStats();
    refreshUpgrades();
    evaluateAchievements(state, onAchievementUnlock);
}

function handleSoulUpgradeClick(id) {
    if (!buySoulUpgrade(state, id)) return;
    
    stats = computeStats(state);
    playSound("upgrade");
    refreshStats();
    refreshSoulUpgrades();
    evaluateAchievements(state, onAchievementUnlock);
}

// Enhanced skin selection
function handleSkinSelect(id) {
    if (state.currentSkin === id) return;
    
    const skin = skins.find(item => item.id === id);
    if (!skin) return;

    const unlocked = Boolean(state.skinUnlocks[id]);
    if (!unlocked && state.drops < skin.cost) return;

    if (!unlocked && skin.cost > 0) {
        spendDrops(state, skin.cost);
        unlockSkin(state, id);
    }

    setSkin(state, id);
    stats = computeStats(state);
    refreshStats();
    refreshSkins();
    evaluateAchievements(state, onAchievementUnlock);
}

// Language toggle with enhanced animation
function handleLanguageToggle() {
    const next = i18n.getLanguage() === "pl" ? "en" : "pl";
    i18n.setLanguage(next);
    
    // Add smooth transition effect
    document.body.style.opacity = '0.8';
    setTimeout(() => {
        refreshTranslations();
        document.body.style.opacity = '1';
    }, 150);
}

// Enhanced performance toggle
function handlePerformanceToggle() {
    const profiles = ['auto', 'ultra', 'balanced', 'battery'];
    const currentIndex = profiles.indexOf(enhancedState.settings.performanceMode);
    const nextIndex = (currentIndex + 1) % profiles.length;
    
    enhancedState.settings.performanceMode = profiles[nextIndex];
    performanceManager.profile = profiles[nextIndex];
    performanceManager.applyOptimizations();
    
    // Update button text
    const button = document.getElementById('performanceToggle');
    if (button) {
        const icons = { auto: '⚡', ultra: '🚀', balanced: '⚖️', battery: '🔋' };
        button.textContent = icons[profiles[nextIndex]];
    }
}

// Settings modal management
function openSettingsModal() {
    const modal = document.getElementById('settingsModal');
    if (modal) {
        modal.classList.add('show');
        
        // Populate settings
        const soundToggle = document.getElementById('soundToggle');
        const performanceMode = document.getElementById('performanceMode');
        const fpsToggle = document.getElementById('fpsToggle');
        const autoSaveInterval = document.getElementById('autoSaveInterval');
        
        if (soundToggle) {
            soundToggle.textContent = enhancedState.settings.soundEnabled ? 'Włączone' : 'Wyłączone';
        }
        if (performanceMode) {
            performanceMode.value = enhancedState.settings.performanceMode;
        }
        if (fpsToggle) {
            fpsToggle.textContent = enhancedState.settings.showFPS ? 'Włączone' : 'Wyłączone';
        }
        if (autoSaveInterval) {
            autoSaveInterval.value = enhancedState.settings.autoSaveInterval;
        }
    }
}

function closeSettingsModal() {
    const modal = document.getElementById('settingsModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

// Enhanced achievement unlock
function onAchievementUnlock(id) {
    playSound("victory");
    
    // Enhanced achievement popup
    const achievement = {
        id: id,
        title: translate(`${id}Title`),
        description: translate(`${id}Desc`),
        icon: getAchievementIcon(id),
        reward: getAchievementReward(id)
    };
    
    showAchievementPopup(achievement.title, achievement.description, {
        icon: achievement.icon,
        reward: achievement.reward,
        playAudio: true
    });
    
    refreshAchievements();
}

// Get achievement icon based on type
function getAchievementIcon(id) {
    if (id.includes('click')) return '👆';
    if (id.includes('drops')) return '🍅';
    if (id.includes('rebirth')) return '✨';
    if (id.includes('upgrade')) return '🚀';
    return '🏆';
}

// Get achievement reward text
function getAchievementReward(id) {
    if (id.includes('first')) return '+10% Bonus do kliknięć';
    if (id.includes('hundred')) return '+25% Bonus do DPS';
    if (id.includes('thousand')) return '+50% Bonus do kliknięć';
    return 'Specjalny bonus!';
}

// Enhanced bottle click handler with combo system
function handleBottleClick(value) {
    // Update combo system
    comboSystem.onClick();
    
    // Calculate enhanced click power
    const enhancedPower = calculateEnhancedClickPower(
        value,
        comboSystem.comboMultiplier,
        boostSystem.getMultiplier(),
        enhancedState.multiplyClicksEnabled
    );
    
    // Register the enhanced click
    registerClick(state, enhancedPower);
    stats = computeStats(state);
    refreshStats();
    evaluateAchievements(state, onAchievementUnlock);
    
    // Show click indicator
    showClickIndicator();
}

// Show click ripple effect
function showClickIndicator() {
    const indicator = document.getElementById('clickIndicator');
    if (indicator) {
        indicator.classList.remove('animate');
        // Force reflow
        indicator.offsetWidth;
        indicator.classList.add('animate');
    }
}

// Quick action handlers
function handleAutoClickToggle() {
    const button = document.getElementById('autoClickToggle');
    
    if (enhancedState.autoClickEnabled) {
        autoClickSystem.stop();
        enhancedState.autoClickEnabled = false;
        if (button) button.textContent = '🤖 Auto Klik: OFF';
    } else {
        autoClickSystem.start(state, () => calculateClickPower(state));
        enhancedState.autoClickEnabled = true;
        if (button) button.textContent = '🤖 Auto Klik: ON';
    }
}

function handleBoostToggle() {
    const button = document.getElementById('boostToggle');
    
    if (boostSystem.enabled) {
        boostSystem.deactivate();
        if (button) {
            button.textContent = '🚀 Boost: OFF';
            button.classList.remove('active');
        }
    } else {
        if (boostSystem.activate()) {
            if (button) {
                button.textContent = '🚀 Boost: ON';
                button.classList.add('active');
            }
            
            // Update button text every second
            const updateBoostDisplay = () => {
                if (!boostSystem.enabled) return;
                
                const remaining = boostSystem.getRemainingTime();
                if (button && remaining > 0) {
                    button.textContent = `🚀 Boost: ${remaining}s`;
                } else if (button) {
                    button.textContent = '🚀 Boost: OFF';
                    button.classList.remove('active');
                }
            };
            
            const interval = setInterval(updateBoostDisplay, 1000);
            
            // Stop updating when boost ends
            setTimeout(() => {
                clearInterval(interval);
                if (button && !boostSystem.enabled) {
                    button.textContent = '🚀 Boost: OFF';
                    button.classList.remove('active');
                }
            }, boostSystem.duration);
        }
    }
}

function handleMultiplyClickToggle() {
    const button = document.getElementById('multiplyClickToggle');
    
    if (enhancedState.multiplyClicksEnabled) {
        enhancedState.multiplyClicksEnabled = false;
        if (button) {
            button.textContent = '✨ x3 Klik: OFF';
            button.classList.remove('active');
        }
    } else {
        enhancedState.multiplyClicksEnabled = true;
        if (button) {
            button.textContent = '✨ x3 Klik: ON';
            button.classList.add('active');
        }
    }
}

// Enhanced UI initialization
function initUI() {
    refreshTranslations();
    refreshStats();
    refreshUpgrades();
    refreshSoulUpgrades();
    refreshAchievements();
    refreshSkins();
    refreshLeaderboard();
    
    // Setup enhanced tabs
    if (elements.regularUpgradesTab) {
        elements.regularUpgradesTab.addEventListener("click", () => {
            showRegularUpgrades();
            refreshUpgrades();
        });
    }
    
    if (elements.soulUpgradesTab) {
        elements.soulUpgradesTab.addEventListener("click", () => {
            showSoulUpgrades();
            refreshSoulUpgrades();
        });
    }
    
    if (elements.achievementsTab) {
        elements.achievementsTab.addEventListener("click", () => {
            showAchievements();
            refreshAchievements();
        });
    }
    
    // Setup new stats tab
    const statsTab = document.getElementById('statsTab');
    if (statsTab) {
        statsTab.addEventListener("click", () => {
            showStats();
            refreshStats();
        });
    }
    
    // Enhanced bottle binding
    bindBottle({
        getClickPower: () => calculateClickPower(state),
        onClick: handleBottleClick,
        formatValue: formatNumber
    });
    
    // Header controls
    if (elements.languageToggle) {
        elements.languageToggle.addEventListener("click", handleLanguageToggle);
    }
    
    const performanceToggle = document.getElementById('performanceToggle');
    if (performanceToggle) {
        performanceToggle.addEventListener("click", handlePerformanceToggle);
    }
    
    const settingsToggle = document.getElementById('settingsToggle');
    if (settingsToggle) {
        settingsToggle.addEventListener("click", openSettingsModal);
    }
    
    // Quick actions
    const autoClickToggle = document.getElementById('autoClickToggle');
    if (autoClickToggle) {
        autoClickToggle.addEventListener("click", handleAutoClickToggle);
    }
    
    const boostToggle = document.getElementById('boostToggle');
    if (boostToggle) {
        boostToggle.addEventListener("click", handleBoostToggle);
    }
    
    const multiplyClickToggle = document.getElementById('multiplyClickToggle');
    if (multiplyClickToggle) {
        multiplyClickToggle.addEventListener("click", handleMultiplyClickToggle);
    }
    
    // Modal controls
    const closeSettingsModalBtn = document.getElementById('closeSettingsModal');
    if (closeSettingsModalBtn) {
        closeSettingsModalBtn.addEventListener("click", closeSettingsModal);
    }
    
    // Settings change handlers
    const soundToggle = document.getElementById('soundToggle');
    if (soundToggle) {
        soundToggle.addEventListener("click", () => {
            enhancedState.settings.soundEnabled = !enhancedState.settings.soundEnabled;
            soundToggle.textContent = enhancedState.settings.soundEnabled ? 'Włączone' : 'Wyłączone';
        });
    }
    
    const performanceModeSelect = document.getElementById('performanceMode');
    if (performanceModeSelect) {
        performanceModeSelect.addEventListener("change", (e) => {
            enhancedState.settings.performanceMode = e.target.value;
            performanceManager.profile = e.target.value;
            performanceManager.applyOptimizations();
        });
    }
    
    const fpsToggle = document.getElementById('fpsToggle');
    if (fpsToggle) {
        fpsToggle.addEventListener("click", () => {
            enhancedState.settings.showFPS = !enhancedState.settings.showFPS;
            fpsToggle.textContent = enhancedState.settings.showFPS ? 'Włączone' : 'Wyłączone';
            
            const monitor = document.getElementById('performanceMonitor');
            if (monitor) {
                monitor.style.display = enhancedState.settings.showFPS ? 'block' : 'none';
            }
            
            if (enhancedState.settings.showFPS) {
                performanceMonitor.start();
            } else {
                performanceMonitor.stop();
            }
        });
    }
    
    // Auto-save interval setting
    const autoSaveIntervalSelect = document.getElementById('autoSaveInterval');
    if (autoSaveIntervalSelect) {
        autoSaveIntervalSelect.addEventListener("change", (e) => {
            enhancedState.settings.autoSaveInterval = parseInt(e.target.value);
            autoSaver.stop();
            autoSaver.start();
        });
    }
    
    // Other existing event listeners...
    elements.rebirthButton?.addEventListener("click", openRebirth);
    elements.confirmRebirth?.addEventListener("click", confirmRebirth);
    elements.cancelRebirth?.addEventListener("click", closeRebirthModal);
    
    // Close modals on background click
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains('enhanced-modal')) {
            e.target.classList.remove('show');
        }
    });
    
    // Window events
    window.addEventListener("beforeunload", () => saveGameState(state));
    window.addEventListener("resize", () => {
        // Update performance profile on resize
        performanceManager.updateProfile();
    }, { passive: true });
}

// Enhanced game loops
function startLoops() {
    const loop = createGameLoop(state, {
        onTick: ({ stats: loopStats }) => {
            stats = loopStats;
            refreshStats();
        },
        onSecond: () => {
            evaluateAchievements(state, onAchievementUnlock);
            refreshUpgrades();
            refreshSkins();
        }
    });
    loop.start();
    
    // Auto-save with enhanced interval
    autoSaver.stop();
    autoSaver.interval = enhancedState.settings.autoSaveInterval;
    autoSaver.start();
    
    // Combo reset timer
    setInterval(() => {
        if (performance.now() - comboSystem.lastClickTime > comboSystem.comboWindow) {
            comboSystem.reset();
        }
    }, 100);
}

// Enhanced rebirth confirmation
function confirmRebirth() {
    const soulGain = estimateRebirth(state);
    if (soulGain <= 0) return;
    
    beginRebirth(state, soulGain);
    stats = computeStats(state);
    closeRebirthModal();
    playSound("rebirth");
    
    // Reset enhanced features
    comboSystem.reset();
    autoClickSystem.stop();
    boostSystem.deactivate();
    enhancedState.autoClickEnabled = false;
    enhancedState.boostEnabled = false;
    enhancedState.multiplyClicksEnabled = false;
    
    refreshStats();
    refreshUpgrades();
    refreshSkins();
    leaderboardManager.submit().then(refreshLeaderboard);
    evaluateAchievements(state, onAchievementUnlock);
    
    // Update quick action buttons
    const autoClickToggle = document.getElementById('autoClickToggle');
    if (autoClickToggle) autoClickToggle.textContent = '🤖 Auto Klik: OFF';
    
    const boostToggle = document.getElementById('boostToggle');
    if (boostToggle) {
        boostToggle.textContent = '🚀 Boost: OFF';
        boostToggle.classList.remove('active');
    }
    
    const multiplyClickToggle = document.getElementById('multiplyClickToggle');
    if (multiplyClickToggle) {
        multiplyClickToggle.textContent = '✨ x3 Klik: OFF';
        multiplyClickToggle.classList.remove('active');
    }
}

// Enhanced bootstrap function
function bootstrap() {
    console.log('🚀 Starting Ultimate Heinz Ketchup Empire...');
    
    // Hide loading screen
    hideLoadingScreen();
    
    // Apply performance optimizations
    performanceManager.updateProfile();
    
    // Initialize enhanced UI
    initUI();
    
    // Start game loops
    startLoops();
    
    // Show performance monitor if enabled
    if (enhancedState.settings.showFPS) {
        performanceMonitor.start();
        const monitor = document.getElementById('performanceMonitor');
        if (monitor) monitor.style.display = 'block';
    }
    
    console.log('✅ Ultimate Heinz Ketchup Empire initialized successfully!');
    console.log('🎮 Performance Profile:', performanceManager.profile);
    console.log('⚡ FPS Target:', performanceManager.profile === 'Ultra' ? '120' : '60');
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootstrap);
} else {
    bootstrap();
}