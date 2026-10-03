// 首页逻辑
document.addEventListener('DOMContentLoaded', function() {
    let currentFilter = 'all';
    let currentKeyword = '';

    // 物品图标映射
    const itemIcons = {
        '校园卡': '💳',
        '雨伞': '☂️',
        '耳机': '🎧',
        '钥匙': '🔑',
        '手机': '📱',
        '钱包': '👛',
        '书': '📚',
        '水杯': '🥤'
    };

    // 获取物品图标
    function getItemIcon(title) {
        for (let key in itemIcons) {
            if (title.includes(key)) {
                return itemIcons[key];
            }
        }
        return '📦';
    }

    // 渲染物品列表
    function renderItemList() {
        const items = DataManager.searchItems(currentKeyword, currentFilter);
        const container = document.getElementById('itemList');
        
        if (items.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="icon">📭</div>
                    <p>暂无相关信息</p>
                </div>
            `;
            return;
        }

        container.innerHTML = items.map(item => `
            <div class="item-card" onclick="goToDetail(${item.id})">
                <div class="item-thumb">${getItemIcon(item.title)}</div>
                <div class="item-content">
                    <div class="item-card-header">
                        <span class="item-type ${item.type}">${CommonUtils.getTypeText(item.type)}</span>
                        <span class="item-status ${item.status === 'resolved' ? 'resolved' : ''}">
                            ${CommonUtils.getStatusText(item)}
                        </span>
                    </div>
                    <div class="item-title">${CommonUtils.escapeHtml(item.title)}</div>
                    <div class="item-meta">
                        <span>📍 ${CommonUtils.escapeHtml(item.location)}</span>
                        <span>🕐 ${CommonUtils.escapeHtml(item.time)}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // 跳转到详情页
    window.goToDetail = function(id) {
        window.location.href = `detail.html?id=${id}`;
    };

    // 跳转到发布页
    window.goToPublish = function(type) {
        window.location.href = `publish.html?type=${type}`;
    };

    // 搜索功能
    document.getElementById('searchBtn').addEventListener('click', function() {
        currentKeyword = document.getElementById('searchInput').value.trim();
        renderItemList();
    });

    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            currentKeyword = this.value.trim();
            renderItemList();
        }
    });

    // 分类筛选
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.type;
            renderItemList();
        });
    });

    // 初始渲染
    renderItemList();
});
