/**
 * 年终总结配置文件
 * 在这里修改所有展示的内容
 * 
 * 幻灯片类型说明：
 * - intro: 开场页面，显示年份和团队名称
 * - stat: 统计数据，显示数字和描述
 * - photo: 照片展示，显示图片和说明
 * - text: 纯文字，显示大段文字内容
 * - outro: 结尾页面，显示感谢语
 */

const CONFIG = {
    // 基本信息
    teamName: "XX课题组",
    year: "2025",

    // 加载动画显示时间（毫秒）
    loadingDuration: 1500,

    // 自动播放间隔（毫秒），设为0禁用自动播放
    autoPlayInterval: 0,

    // 幻灯片内容
    slides: [
        // 开场页
        {
            type: "intro",
            title: "年度总结",
            subtitle: "回顾这一年的点点滴滴"
        },

        // 统计数据 - 文献阅读
        {
            type: "stat",
            icon: "📚",
            label: "这一年，我们一共阅读了",
            value: "10,000,000",
            unit: "万词文献",
            comment: "相当于《红楼梦》的100倍！"
        },

        // 统计数据 - 咖啡
        {
            type: "stat",
            icon: "☕",
            label: "为了科研，我们喝掉了",
            value: "2,048",
            unit: "杯咖啡",
            comment: "咖啡因是第一生产力"
        },

        // 统计数据 - 代码
        {
            type: "stat",
            icon: "💻",
            label: "我们敲下了",
            value: "128,512",
            unit: "行代码",
            comment: "每一个bug都是成长的足迹"
        },

        // 统计数据 - 熬夜
        {
            type: "stat",
            icon: "🌙",
            label: "实验室的灯光陪伴了我们",
            value: "365",
            unit: "个夜晚",
            comment: "头发还在，梦想也在"
        },

        // 照片展示1
        {
            type: "photo",
            src: "images/1.jpg",
            caption: "探索科学的海洋，就像水母一样优雅地漂浮"
        },

        // 文字卡片
        {
            type: "text",
            content: "这一年，我们不仅收获了<span class='text-highlight'>知识</span>，更收获了<span class='text-highlight'>友谊</span>"
        },

        // 照片展示2
        {
            type: "photo",
            src: "images/2.jpg",
            caption: "在知识的海洋里畅游"
        },

        // 统计数据 - 论文
        {
            type: "stat",
            icon: "📝",
            label: "我们一起发表了",
            value: "12",
            unit: "篇论文",
            comment: "从投稿到接收，每一篇都是奇迹"
        },

        // 统计数据 - 聚餐
        {
            type: "stat",
            icon: "🍜",
            label: "团建聚餐",
            value: "24",
            unit: "次",
            comment: "科研需要补充能量！"
        },

        // 结尾页
        {
            type: "outro",
            thanks: "感谢每一位的付出",
            message: "2026，我们继续乘风破浪！"
        }
    ]
};

// 导出配置（如果使用模块化）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
