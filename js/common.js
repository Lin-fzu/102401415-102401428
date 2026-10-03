// 公共工具函数
const CommonUtils = {
    // 显示提示消息
    showToast(message, duration = 2000) {
        let toast = document.querySelector('.toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, duration);
    },

    // 获取URL参数
    getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    },

    // 格式化时间
    formatTime(timestamp) {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    },

    // 生成物品类型显示文本
    getTypeText(type) {
        return type === 'lost' ? '寻物' : '招领';
    },

    // 生成状态显示文本
    getStatusText(item) {
        if (item.status === 'resolved') {
            return item.resolvedType === 'found' ? '已找到' : '已归还';
        }
        return '进行中';
    },

    // 转义HTML防止XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
};
