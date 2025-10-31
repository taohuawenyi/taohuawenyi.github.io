// main.js (作为 ES Module 使用)

// 邮箱地址显示
function initEmailTooltip(selector = '.email-link') {
    const emailLinks = document.querySelectorAll(selector);
    if (!emailLinks || emailLinks.length === 0) return;

    emailLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();

            if (window.innerWidth < 768) { // 手机端行为
                const isShown = link.classList.toggle('show-tooltip');

                if (isShown) {
                    // 点击其他地方关闭悬浮框
                    const handleClickOutside = evt => {
                        if (!link.contains(evt.target)) {
                            link.classList.remove('show-tooltip');
                            document.removeEventListener('click', handleClickOutside);
                        }
                    };
                    document.addEventListener('click', handleClickOutside);
                }
            }
        });
    });
}

// 页面加载后初始化
document.addEventListener('DOMContentLoaded', () => {
    initEmailTooltip();
});



// 动态加载「今日诗词」SDK
function loadJinrishici() {
    const el = document.getElementById('jinrishici-sentence');
    if (!el) return;

    const script = document.createElement('script');
    script.src = 'https://sdk.jinrishici.com/v2/browser/jinrishici.js';
    script.charset = 'utf-8';
    script.onload = () => {
        console.log('今日诗词 SDK 已加载');
    };
    script.onerror = () => {
        console.error('今日诗词 SDK 加载失败');
        el.textContent = '加载失败，请稍后再试。';
    };

    document.head.appendChild(script);
}

// 更新日期
function updateYear() {
    const el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
}

function init() {
    initEmailTooltip();
    loadJinrishici();
    updateYear();
}

// ES Module 默认延迟执行，DOM 已就绪
init();
