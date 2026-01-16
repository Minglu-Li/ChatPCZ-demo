/**
 * 年终总结主逻辑 - Gemini风格
 */

(function () {
    'use strict';

    // DOM元素
    const elements = {
        mainInterface: document.getElementById('main-interface'),
        summaryPlayer: document.getElementById('summary-player'),
        promptInput: document.getElementById('prompt-input'),
        submitBtn: document.getElementById('submit-btn'),
        closeBtn: document.getElementById('close-btn'),
        slidesContainer: document.getElementById('slides-container'),
        progressFill: document.getElementById('progress-fill'),
        loadingOverlay: document.getElementById('loading-overlay'),
        suggestionCards: document.querySelectorAll('.suggestion-card')
    };

    // 状态
    let currentSlideIndex = 0;
    let totalSlides = 0;
    let slides = [];

    /**
     * 初始化应用
     */
    function init() {
        bindEvents();
        generateSlides();
    }

    /**
     * 绑定事件
     */
    function bindEvents() {
        // 输入框回车提交
        if (elements.promptInput) {
            elements.promptInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    startSummary();
                }
            });
        }

        // 提交按钮点击
        if (elements.submitBtn) {
            elements.submitBtn.addEventListener('click', () => {
                startSummary();
            });
        }

        // 快捷卡片点击
        elements.suggestionCards.forEach(card => {
            card.addEventListener('click', () => {
                const prompt = card.getAttribute('data-prompt');
                if (elements.promptInput) {
                    elements.promptInput.value = prompt;
                }
                startSummary();
            });
        });

        // 关闭按钮
        if (elements.closeBtn) {
            elements.closeBtn.addEventListener('click', closeSummary);
        }

        // 键盘导航
        document.addEventListener('keydown', handleKeyboard);

        // 点击导航
        if (elements.summaryPlayer) {
            elements.summaryPlayer.addEventListener('click', (e) => {
                if (e.target === elements.summaryPlayer ||
                    e.target.closest('.slides-container')) {
                    const rect = elements.summaryPlayer.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    if (x > rect.width / 2) {
                        nextSlide();
                    } else {
                        prevSlide();
                    }
                }
            });
        }
    }

    /**
     * 生成幻灯片
     */
    function generateSlides() {
        slides = CONFIG.slides;
        totalSlides = slides.length;
    }

    /**
     * 开始年终总结
     */
    function startSummary() {
        // 显示加载动画
        elements.loadingOverlay.classList.remove('hidden');

        setTimeout(() => {
            // 隐藏加载动画
            elements.loadingOverlay.classList.add('hidden');

            // 渲染幻灯片
            renderSlides();

            // 显示播放器
            elements.mainInterface.style.display = 'none';
            elements.summaryPlayer.classList.remove('hidden');

            // 重置到第一张
            currentSlideIndex = 0;
            showSlide(0);
        }, CONFIG.loadingDuration);
    }

    /**
     * 渲染所有幻灯片
     */
    function renderSlides() {
        elements.slidesContainer.innerHTML = slides.map((slide, index) => {
            return createSlideHTML(slide, index);
        }).join('');
    }

    /**
     * 创建单个幻灯片HTML
     */
    function createSlideHTML(slide, index) {
        const classList = ['slide', `slide-${slide.type}`];
        if (index === 0) classList.push('active');

        let content = '';

        switch (slide.type) {
            case 'intro':
                content = `
                    <div class="year">${CONFIG.year}</div>
                    <div class="team-name">${CONFIG.teamName}</div>
                    <div class="subtitle">${slide.subtitle || slide.title}</div>
                `;
                break;

            case 'stat':
                content = `
                    <div class="stat-icon">${slide.icon}</div>
                    <div class="stat-label">${slide.label}</div>
                    <div class="stat-value" data-value="${slide.value}">${slide.value}</div>
                    <div class="stat-unit">${slide.unit}</div>
                    ${slide.comment ? `<div class="stat-comment">${slide.comment}</div>` : ''}
                `;
                break;

            case 'photo':
                content = `
                    <div class="photo-container">
                        <img src="${slide.src}" alt="${slide.caption}" loading="lazy">
                    </div>
                    <div class="photo-caption">${slide.caption}</div>
                `;
                break;

            case 'text':
                content = `
                    <div class="text-content">${slide.content}</div>
                `;
                break;

            case 'outro':
                content = `
                    <div class="thanks-text">${slide.thanks}</div>
                    <div class="outro-message">${slide.message}</div>
                    <button class="replay-btn" onclick="window.replaySummary()">再看一遍</button>
                `;
                break;
        }

        return `<div class="${classList.join(' ')}" data-index="${index}">${content}</div>`;
    }

    /**
     * 显示指定幻灯片
     */
    function showSlide(index) {
        if (index < 0 || index >= totalSlides) return;

        const allSlides = elements.slidesContainer.querySelectorAll('.slide');

        allSlides.forEach((slide, i) => {
            slide.classList.remove('active', 'prev', 'next');
            if (i === index) {
                slide.classList.add('active');
                animateNumbers(slide);
            } else if (i < index) {
                slide.classList.add('prev');
            } else {
                slide.classList.add('next');
            }
        });

        currentSlideIndex = index;
        updateProgress();
    }

    /**
     * 数字滚动动画
     */
    function animateNumbers(slide) {
        const statValue = slide.querySelector('.stat-value');
        if (!statValue) return;

        const targetValue = statValue.getAttribute('data-value');
        const cleanValue = targetValue.replace(/,/g, '');
        const numValue = parseInt(cleanValue, 10);

        if (isNaN(numValue)) {
            statValue.textContent = targetValue;
            return;
        }

        const duration = 1500;
        const startTime = performance.now();

        function updateNumber(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(numValue * easeOut);

            statValue.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                statValue.textContent = targetValue;
            }
        }

        requestAnimationFrame(updateNumber);
    }

    /**
     * 更新进度条
     */
    function updateProgress() {
        const progress = ((currentSlideIndex + 1) / totalSlides) * 100;
        elements.progressFill.style.width = `${progress}%`;
    }

    /**
     * 下一张幻灯片
     */
    function nextSlide() {
        if (currentSlideIndex < totalSlides - 1) {
            showSlide(currentSlideIndex + 1);
        }
    }

    /**
     * 上一张幻灯片
     */
    function prevSlide() {
        if (currentSlideIndex > 0) {
            showSlide(currentSlideIndex - 1);
        }
    }

    /**
     * 键盘处理
     */
    function handleKeyboard(e) {
        if (elements.summaryPlayer.classList.contains('hidden')) return;

        switch (e.key) {
            case 'ArrowRight':
            case ' ':
                e.preventDefault();
                nextSlide();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                prevSlide();
                break;
            case 'Escape':
                closeSummary();
                break;
        }
    }

    /**
     * 关闭年终总结
     */
    function closeSummary() {
        elements.summaryPlayer.classList.add('hidden');
        elements.mainInterface.style.display = 'flex';
        if (elements.promptInput) {
            elements.promptInput.value = '';
        }
    }

    /**
     * 重新播放
     */
    window.replaySummary = function () {
        currentSlideIndex = 0;
        showSlide(0);
    };

    // 启动应用
    document.addEventListener('DOMContentLoaded', init);
})();
