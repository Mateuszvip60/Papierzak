/*
 * → Developed by: @Mateuszvip60
 * → Mapuje kluczowe elementy DOM gry.
 * → Fixed by MiniMax Agent: DOM elements are now lazy-loaded
 */

// Cache for DOM elements to avoid repeated queries
let elementsCache = null;

/**
 * Get DOM elements - lazy loaded when needed
 * This prevents errors when DOM is not ready during module import
 */
export function getElements() {
    if (!elementsCache) {
        elementsCache = {
            bottle: document.getElementById("bottle"),
            totalDrops: document.getElementById("totalDrops"),
            dropsPerSecond: document.getElementById("dropsPerSecond"),
            totalClicks: document.getElementById("totalClicks"),
            rebirthCount: document.getElementById("rebirthCount"),
            soulPoints: document.getElementById("soulPoints"),
            rebirthButton: document.getElementById("rebirthButton"),
            rebirthText: document.getElementById("rebirthText"),
            rebirthInfo: document.getElementById("rebirthInfo"),
            upgradesContainer: document.getElementById("upgradesContainer"),
            soulUpgradesContainer: document.getElementById("soulUpgradesContainer"),
            achievementsContainer: document.getElementById("achievementsContainer"),
            leaderboardContainer: document.getElementById("leaderboardContainer"),
            leaderboardBody: document.getElementById("leaderboardBody"),
            leaderboardTabs: document.getElementById("leaderboardCategoryTabs"),
            leaderboardStatus: document.getElementById("leaderboardStatus"),
            onlineToggleBtn: document.getElementById("onlineToggleBtn"),
            languageToggle: document.getElementById("languageToggle"),
            achievementPopup: document.getElementById("achievementPopup"),
            achievementTitle: document.getElementById("achievementTitle"),
            achievementDesc: document.getElementById("achievementDesc"),
            loadingScreen: document.getElementById("loadingScreen"),
            regularUpgradesTab: document.getElementById("regularUpgradesTab"),
            soulUpgradesTab: document.getElementById("soulUpgradesTab"),
            achievementsTab: document.getElementById("achievementsTab"),
            upgradesTab: document.getElementById("upgradesTab"),
            leaderboardTab: document.getElementById("leaderboardTab"),
            skinSelector: document.getElementById("skinSelector"),
            playerNameModal: document.getElementById("playerNameModal"),
            initialPlayerNameInput: document.getElementById("initialPlayerNameInput"),
            savePlayerNameBtn: document.getElementById("savePlayerNameBtn"),
            submitScoreBtn: document.getElementById("submitScoreBtn"),
            rebirthModal: document.getElementById("rebirthModal"),
            rebirthModalTitle: document.getElementById("rebirthModalTitle"),
            rebirthModalDesc: document.getElementById("rebirthModalDesc"),
            rebirthBonusInfo: document.getElementById("rebirthBonusInfo"),
            confirmRebirth: document.getElementById("confirmRebirth"),
            cancelRebirth: document.getElementById("cancelRebirth"),
            gameTitle: document.getElementById("gameTitle"),
            dropsLabel: document.getElementById("dropsLabel"),
            dpsLabel: document.getElementById("dpsLabel"),
            clicksLabel: document.getElementById("clicksLabel"),
            rebirthLabel: document.getElementById("rebirthLabel"),
            soulLabel: document.getElementById("soulLabel"),
            upgradesTitle: document.getElementById("upgradesTitle"),
            leaderboardTitle: document.getElementById("leaderboardTitle"),
            rankHeader: document.getElementById("rankHeader"),
            playerHeader: document.getElementById("playerHeader"),
            scoreHeader: document.getElementById("scoreHeader"),
            audio: {
                click: document.getElementById("clickSound"),
                upgrade: document.getElementById("upgradeSound"),
                achievement: document.getElementById("achievementSound"),
                rebirth: document.getElementById("rebirthSound")
            }
        };
    }
    return elementsCache;
}

// Export backward compatibility for existing code
export const elements = {
    get bottle() { return getElements().bottle; },
    get totalDrops() { return getElements().totalDrops; },
    get dropsPerSecond() { return getElements().dropsPerSecond; },
    get totalClicks() { return getElements().totalClicks; },
    get rebirthCount() { return getElements().rebirthCount; },
    get soulPoints() { return getElements().soulPoints; },
    get rebirthButton() { return getElements().rebirthButton; },
    get rebirthText() { return getElements().rebirthText; },
    get rebirthInfo() { return getElements().rebirthInfo; },
    get upgradesContainer() { return getElements().upgradesContainer; },
    get soulUpgradesContainer() { return getElements().soulUpgradesContainer; },
    get achievementsContainer() { return getElements().achievementsContainer; },
    get leaderboardContainer() { return getElements().leaderboardContainer; },
    get leaderboardBody() { return getElements().leaderboardBody; },
    get leaderboardTabs() { return getElements().leaderboardTabs; },
    get leaderboardStatus() { return getElements().leaderboardStatus; },
    get onlineToggleBtn() { return getElements().onlineToggleBtn; },
    get languageToggle() { return getElements().languageToggle; },
    get achievementPopup() { return getElements().achievementPopup; },
    get achievementTitle() { return getElements().achievementTitle; },
    get achievementDesc() { return getElements().achievementDesc; },
    get loadingScreen() { return getElements().loadingScreen; },
    get regularUpgradesTab() { return getElements().regularUpgradesTab; },
    get soulUpgradesTab() { return getElements().soulUpgradesTab; },
    get achievementsTab() { return getElements().achievementsTab; },
    get upgradesTab() { return getElements().upgradesTab; },
    get leaderboardTab() { return getElements().leaderboardTab; },
    get skinSelector() { return getElements().skinSelector; },
    get playerNameModal() { return getElements().playerNameModal; },
    get initialPlayerNameInput() { return getElements().initialPlayerNameInput; },
    get savePlayerNameBtn() { return getElements().savePlayerNameBtn; },
    get submitScoreBtn() { return getElements().submitScoreBtn; },
    get rebirthModal() { return getElements().rebirthModal; },
    get rebirthModalTitle() { return getElements().rebirthModalTitle; },
    get rebirthModalDesc() { return getElements().rebirthModalDesc; },
    get rebirthBonusInfo() { return getElements().rebirthBonusInfo; },
    get confirmRebirth() { return getElements().confirmRebirth; },
    get cancelRebirth() { return getElements().cancelRebirth; },
    get gameTitle() { return getElements().gameTitle; },
    get dropsLabel() { return getElements().dropsLabel; },
    get dpsLabel() { return getElements().dpsLabel; },
    get clicksLabel() { return getElements().clicksLabel; },
    get rebirthLabel() { return getElements().rebirthLabel; },
    get soulLabel() { return getElements().soulLabel; },
    get upgradesTitle() { return getElements().upgradesTitle; },
    get leaderboardTitle() { return getElements().leaderboardTitle; },
    get rankHeader() { return getElements().rankHeader; },
    get playerHeader() { return getElements().playerHeader; },
    get scoreHeader() { return getElements().scoreHeader; },
    get audio() { return getElements().audio; }
};
