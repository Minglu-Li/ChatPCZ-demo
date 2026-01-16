/**
 * 春节主题特效 - 雪花飘落 + 节日元素
 */

(function () {
    'use strict';

    // 配置
    const config = {
        snowflakeCount: 50,        // 雪花数量（稍微密集一点）
        festiveElementInterval: 4000, // 节日元素出现间隔(毫秒)
        festiveElements: ['🏮', '🧨', '🎊', '🧧', '✨', '🎆'],  // 灯笼、鞭炮、彩带、红包、星星、烟花
        snowflakeEmojis: ['❄', '❄️', '❅', '❆', '✻']  // 不同的雪花符号
    };

    // 创建特效容器
    function createEffectsContainer() {
        const container = document.createElement('div');
        container.id = 'effects-container';
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            overflow: hidden;
        `;
        document.body.appendChild(container);
        return container;
    }

    // 创建雪花
    function createSnowflake(container) {
        const snowflake = document.createElement('div');
        const emoji = config.snowflakeEmojis[Math.floor(Math.random() * config.snowflakeEmojis.length)];
        const size = Math.random() * 10 + 10; // 10-20px
        const startX = Math.random() * 100;
        const duration = Math.random() * 12 + 10; // 10-22秒
        const delay = Math.random() * 8;
        const drift = Math.random() * 50 - 25; // -25 到 25 的水平漂移
        const opacity = 0.4 + Math.random() * 0.4; // 0.4-0.8 透明度

        snowflake.className = 'snowflake';
        snowflake.textContent = emoji;
        snowflake.style.cssText = `
            position: absolute;
            top: -30px;
            left: ${startX}%;
            font-size: ${size}px;
            opacity: ${opacity};
            animation: snowfall ${duration}s linear ${delay}s infinite;
            --drift: ${drift}px;
            filter: drop-shadow(0 0 2px rgba(255,255,255,0.3));
        `;

        container.appendChild(snowflake);
    }

    // 创建节日元素
    function createFestiveElement(container) {
        const element = document.createElement('div');
        const emoji = config.festiveElements[Math.floor(Math.random() * config.festiveElements.length)];
        const startX = Math.random() * 90 + 5; // 5-95%
        const size = Math.random() * 16 + 20; // 20-36px
        const duration = Math.random() * 8 + 8; // 8-16秒
        const rotation = Math.random() * 360;
        const rotateDirection = Math.random() > 0.5 ? 1 : -1;

        element.className = 'festive-element';
        element.textContent = emoji;
        element.style.cssText = `
            position: absolute;
            top: -50px;
            left: ${startX}%;
            font-size: ${size}px;
            animation: festivefall ${duration}s ease-in-out forwards;
            --rotation: ${rotation}deg;
            --rotate-dir: ${rotateDirection};
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
        `;

        container.appendChild(element);

        // 动画结束后移除元素
        setTimeout(() => {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        }, duration * 1000);
    }

    // 添加CSS动画
    function addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes snowfall {
                0% {
                    transform: translateY(0) translateX(0) rotate(0deg);
                    opacity: 0.7;
                }
                25% {
                    transform: translateY(25vh) translateX(var(--drift)) rotate(90deg);
                }
                50% {
                    transform: translateY(50vh) translateX(calc(var(--drift) * -0.5)) rotate(180deg);
                }
                75% {
                    transform: translateY(75vh) translateX(var(--drift)) rotate(270deg);
                }
                100% {
                    transform: translateY(100vh) translateX(0) rotate(360deg);
                    opacity: 0.3;
                }
            }
            
            @keyframes festivefall {
                0% {
                    transform: translateY(0) rotate(var(--rotation)) scale(0.5);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                    transform: translateY(10vh) rotate(calc(var(--rotation) + 20deg * var(--rotate-dir))) scale(1);
                }
                30% {
                    transform: translateY(30vh) translateX(20px) rotate(calc(var(--rotation) + 60deg * var(--rotate-dir)));
                }
                50% {
                    transform: translateY(50vh) translateX(-15px) rotate(calc(var(--rotation) + 100deg * var(--rotate-dir)));
                }
                70% {
                    transform: translateY(70vh) translateX(10px) rotate(calc(var(--rotation) + 140deg * var(--rotate-dir)));
                }
                90% {
                    opacity: 0.8;
                }
                100% {
                    transform: translateY(105vh) translateX(0) rotate(calc(var(--rotation) + 180deg * var(--rotate-dir)));
                    opacity: 0;
                }
            }
            
            .snowflake {
                will-change: transform;
            }
            
            .festive-element {
                will-change: transform, opacity;
            }
        `;
        document.head.appendChild(style);
    }

    // 初始化
    function init() {
        addStyles();
        const container = createEffectsContainer();

        // 创建雪花
        for (let i = 0; i < config.snowflakeCount; i++) {
            setTimeout(() => {
                createSnowflake(container);
            }, i * 150); // 错开创建时间
        }

        // 定期创建节日元素
        setInterval(() => {
            // 只在主界面显示时创建
            const mainInterface = document.getElementById('main-interface');
            if (mainInterface && mainInterface.style.display !== 'none') {
                createFestiveElement(container);
            }
        }, config.festiveElementInterval);

        // 初始创建几个节日元素
        setTimeout(() => createFestiveElement(container), 1000);
        setTimeout(() => createFestiveElement(container), 2500);
    }

    // 页面加载后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
