// 发布页逻辑
document.addEventListener('DOMContentLoaded', function() {
    let selectedType = 'lost';

    // 从URL获取类型参数
    const urlType = CommonUtils.getQueryParam('type');
    if (urlType === 'lost' || urlType === 'found') {
        selectedType = urlType;
        // 自动选中对应的类型
        document.querySelectorAll('.type-option').forEach(o => {
            o.classList.remove('active');
            if (o.dataset.type === urlType) {
                o.classList.add('active');
            }
        });
    }

    // 类型选择
    document.querySelectorAll('.type-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.type-option').forEach(o => o.classList.remove('active'));
            this.classList.add('active');
            selectedType = this.dataset.type;
        });
    });

    // 表单提交
    document.getElementById('publishForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('title').value.trim();
        const description = document.getElementById('description').value.trim();
        const location = document.getElementById('location').value.trim();
        const time = document.getElementById('time').value.trim();
        const contact = document.getElementById('contact').value.trim();

        // 简单验证
        if (!title || !description || !location || !time || !contact) {
            CommonUtils.showToast('请填写完整信息');
            return;
        }

        // 创建新物品
        const newItem = {
            type: selectedType,
            title: title,
            description: description,
            location: location,
            time: time,
            contact: contact,
            publisher: '102401415'  // 当前用户ID
        };

        DataManager.addItem(newItem);
        CommonUtils.showToast('发布成功！');
        
        // 跳转到首页
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    });

    // 设置默认时间为当前时间
    const now = new Date();
    const localTime = now.toISOString().slice(0, 16);
    document.getElementById('time').value = localTime.replace('T', ' ');
});
