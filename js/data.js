// 数据管理模块 - 使用 LocalStorage 存储数据
const DataManager = {
    STORAGE_KEY: 'lost_found_items',

    // 初始化示例数据
    initSampleData() {
        const existing = this.getAllItems();
        if (existing.length === 0) {
            const sampleData = [
                {
                    id: Date.now() - 3600000 * 2,
                    type: 'lost',
                    title: '蓝色校园卡',
                    description: '在教学楼A区3楼丢失，姓名：林豪，卡号：2024xxxx',
                    location: '教学楼A区3楼',
                    time: '2026-10-01 14:30',
                    contact: 'QQ: 123456789',
                    publisher: '102401415',
                    status: 'active',
                    createdAt: Date.now() - 3600000 * 2
                },
                {
                    id: Date.now() - 3600000 * 5,
                    type: 'found',
                    title: '黑色雨伞',
                    description: '在食堂门口捡到的黑色折叠雨伞，伞柄有小划痕',
                    location: '第二食堂门口',
                    time: '2026-10-01 12:00',
                    contact: '微信: weijian123',
                    publisher: '102401428',
                    status: 'active',
                    createdAt: Date.now() - 3600000 * 5
                },
                {
                    id: Date.now() - 3600000 * 24,
                    type: 'lost',
                    title: '无线耳机',
                    description: '白色AirPods Pro，充电盒有划痕，在图书馆4楼自习室丢失',
                    location: '图书馆4楼自习室',
                    time: '2026-09-30 19:00',
                    contact: '电话: 138xxxx1234',
                    publisher: '102401415',
                    status: 'resolved',
                    resolvedType: 'found',
                    createdAt: Date.now() - 3600000 * 24
                }
            ];
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sampleData));
        }
    },

    // 获取所有物品
    getAllItems() {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    },

    // 根据ID获取物品
    getItemById(id) {
        const items = this.getAllItems();
        return items.find(item => item.id === parseInt(id));
    },

    // 添加新物品
    addItem(item) {
        const items = this.getAllItems();
        item.id = Date.now();
        item.createdAt = Date.now();
        item.status = 'active';
        items.unshift(item);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
        return item;
    },

    // 更新物品状态
    updateItemStatus(id, status, resolvedType = null) {
        const items = this.getAllItems();
        const index = items.findIndex(item => item.id === parseInt(id));
        if (index !== -1) {
            items[index].status = status;
            if (resolvedType) {
                items[index].resolvedType = resolvedType;
            }
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
            return true;
        }
        return false;
    },

    // 搜索和筛选
    searchItems(keyword = '', type = 'all') {
        let items = this.getAllItems();
        
        // 按类型筛选
        if (type !== 'all') {
            items = items.filter(item => item.type === type);
        }
        
        // 按关键词搜索
        if (keyword) {
            const lowerKeyword = keyword.toLowerCase();
            items = items.filter(item => 
                item.title.toLowerCase().includes(lowerKeyword) ||
                item.description.toLowerCase().includes(lowerKeyword)
            );
        }
        
        // 按时间倒序排列
        items.sort((a, b) => b.createdAt - a.createdAt);
        
        return items;
    },

    // 获取当前用户发布的物品
    getMyItems(publisherId) {
        const items = this.getAllItems();
        return items.filter(item => item.publisher === publisherId);
    }
};

// 页面加载时初始化示例数据
DataManager.initSampleData();
