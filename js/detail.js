// 详情页逻辑
document.addEventListener('DOMContentLoaded', function() {
    const itemId = CommonUtils.getQueryParam('id');
    const currentUserId = '102401415';  // 当前用户ID

    if (!itemId) {
        CommonUtils.showToast('参数错误');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
        return;
    }

    const item = DataManager.getItemById(itemId);
    
    if (!item) {
        CommonUtils.showToast('未找到该信息');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
        return;
    }

    // 渲染详情内容
    renderDetail(item, currentUserId);

    // 标记为已找到
    document.getElementById('markFoundBtn').addEventListener('click', function() {
        if (confirm('确定要标记为已找到吗？')) {
            DataManager.updateItemStatus(itemId, 'resolved', 'found');
            CommonUtils.showToast('已标记为已找到');
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    });

    // 标记为已归还
    document.getElementById('markReturnedBtn').addEventListener('click', function() {
        if (confirm('确定要标记为已归还吗？')) {
            DataManager.updateItemStatus(itemId, 'resolved', 'returned');
            CommonUtils.showToast('已标记为已归还');
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    });
});

function renderDetail(item, currentUserId) {
    document.getElementById('detailTitle').textContent = item.title;
    
    const typeBadge = document.getElementById('detailType');
    typeBadge.textContent = CommonUtils.getTypeText(item.type);
    typeBadge.className = `item-type ${item.type}`;
    
    const statusBadge = document.getElementById('detailStatus');
    statusBadge.textContent = CommonUtils.getStatusText(item);
    statusBadge.className = `item-status ${item.status === 'resolved' ? 'resolved' : ''}`;

    document.getElementById('detailDescription').textContent = item.description;
    document.getElementById('detailLocation').textContent = item.location;
    document.getElementById('detailTime').textContent = item.time;
    document.getElementById('detailContact').textContent = item.contact;

    // 只有发布者本人且状态为进行中才能修改状态
    const actionButtons = document.getElementById('actionButtons');
    if (item.publisher === currentUserId && item.status === 'active') {
        actionButtons.style.display = 'flex';
        // 根据类型调整按钮文本
        document.getElementById('markFoundBtn').textContent = 
            item.type === 'lost' ? '标记为已找到' : '标记为已归还';
        document.getElementById('markReturnedBtn').style.display = 'none';
    } else {
        actionButtons.style.display = 'none';
    }
}
