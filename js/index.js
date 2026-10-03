// 首页逻辑
document.addEventListener('DOMContentLoaded', function() {
    let currentFilter = 'all';
    let currentKeyword = '';

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
        `).join('');
    }

    // 跳转到详情页
    window.goToDetail = function(id) {
        window.location.href = `detail.html?id=${id}`;
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
