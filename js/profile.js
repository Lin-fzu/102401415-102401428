// 我的页面逻辑
document.addEventListener('DOMContentLoaded', function() {
    const currentUserId = '102401415';

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

    // 渲染我的发布列表
    function renderMyItems() {
        const myItems = DataManager.getMyItems(currentUserId);
        const container = document.getElementById('myItemList');

        if (myItems.length === 0) {
            container.innerHTML = `
                <div class="empty-state" style="padding: 30px;">
                    <div class="icon">📭</div>
                    <p>你还没有发布任何信息</p>
                </div>
            `;
            return;
        }

        container.innerHTML = myItems.map(item => `
            <div class="my-item" onclick="goToDetail(${item.id})">
                <div class="my-item-thumb">${getItemIcon(item.title)}</div>
                <div class="my-item-content">
                    <div class="my-item-title">${CommonUtils.escapeHtml(item.title)}</div>
                    <div class="my-item-meta">📍 ${CommonUtils.escapeHtml(item.location)} · ${CommonUtils.escapeHtml(item.time)}</div>
                    <span class="my-item-tag ${item.status === 'resolved' ? 'resolved' : 'active'}">
                        ${item.status === 'resolved' ? CommonUtils.getStatusText(item) : '寻找中'}
                    </span>
                </div>
            </div>
        `).join('');
    }

    // 跳转到详情页
    window.goToDetail = function(id) {
        window.location.href = `detail.html?id=${id}`;
    };

    // 跳转到通用列表页
    window.goToList = function(title) {
        window.location.href = `list.html?title=${encodeURIComponent(title)}`;
    };

    // 跳转到搜索页
    window.goToSearch = function() {
        window.location.href = 'index.html';
    };

    // 打开联系方式修改弹窗
    window.openContactModal = function() {
        const modal = document.getElementById('contactModal');
        const currentContact = document.getElementById('currentContact').textContent;
        document.getElementById('contactInput').value = currentContact;
        modal.classList.add('show');
    };

    // 关闭弹窗
    window.closeContactModal = function() {
        document.getElementById('contactModal').classList.remove('show');
    };

    // 保存联系方式
    window.saveContact = function() {
        const newContact = document.getElementById('contactInput').value.trim();
        if (!newContact) {
            CommonUtils.showToast('请输入联系方式');
            return;
        }
        document.getElementById('currentContact').textContent = newContact;
        closeContactModal();
        CommonUtils.showToast('保存成功');
    };

    // 初始渲染
    renderMyItems();
});
