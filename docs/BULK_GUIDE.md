# 批量生成 QR 码操作指南

## 📊 功能概述

批量生成功能允许你通过上传 CSV 文件一次性生成多个 QR 码，非常适合需要大量 QR 码的场景。

### 适用场景
- 🏷️ **产品标签** - 为商品批量生成二维码
- 🎫 **活动门票** - 生成入场码或签到码
- 📦 **库存管理** - 为库存物品生成追踪码
- 🌐 **网站导航** - 批量生成网址二维码
- 📱 **应用推广** - 生成应用下载码

### 使用限制
- **免费版**: 单次最多 20 个 QR 码
- **每日限制**: 总计 50 个 QR 码
- **文件格式**: 仅支持 CSV 格式
- **文件大小**: 建议小于 5MB

## 📂 CSV 文件格式

### 基本格式要求
CSV 文件必须包含以下列：

```csv
type,data,label
url,https://example.com,Example Website
text,Hello World,Sample Text
wifi,"{""ssid"":""MyNetwork"",""password"":""pass123""}",WiFi Network
```

### 列字段说明

#### 1. type (必填)
支持的 QR 码类型：

| 类型 | 说明 | 示例 |
|------|------|------|
| `text` | 纯文本 | Hello World |
| `url` | 网址链接 | https://example.com |
| `wifi` | WiFi 配置 | JSON 格式配置 |
| `contact` | 联系人信息 | vCard 格式 |
| `bitcoin` | Bitcoin 支付 | JSON 格式地址 |
| `ethereum` | Ethereum 支付 | JSON 格式地址 |

#### 2. data (必填)
QR 码的实际内容，格式根据类型而定：

**文本类型**:
```csv
text,"产品编号: ABC-123","产品标签"
```

**URL 类型**:
```csv
url,https://company.com/product/123,产品页面
```

**WiFi 类型**:
```csv
wifi,"{""ssid"":""OfficeWiFi"",""password"":""password123"",""security"":""WPA""}",办公室WiFi
```

**联系人类型**:
```csv
contact,"{""name"":""张三"",""phone"":""13800138000"",""email"":""zhang@example.com""}",张三联系卡
```

**Bitcoin 类型**:
```csv
bitcoin,"{""address"":""bc1qxy2k..."",""amount"":0.001,""label"":""支付订单123""}",Bitcoin支付码
```

#### 3. label (可选)
QR 码的标签名称，用于：
- 生成的文件命名
- 管理和识别
- 验证报告中的描述

### 高级配置示例

#### 复杂 WiFi 配置
```csv
type,data,label
wifi,"{""ssid"":""Enterprise-WiFi"",""password"":""complex_pass_123"",""security"":""WPA2"",""hidden"":false}",企业WiFi
```

#### 联系人完整信息
```csv
type,data,label
contact,"{""name"":""李经理"",""phone"":""13912345678"",""email"":""li@company.com"",""organization"":""ABC公司"",""title"":""销售经理""}",李经理名片
```

#### 加密货币支付码
```csv
type,data,label
bitcoin,"{""address"":""bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"",""amount"":0.01,""label"":""订单支付"",""message"":""感谢购买""}",订单123支付码
ethereum,"{""address"":""0x742d35Cc6634C0532925a3b844Bc9e7595f1b794"",""amount"":""0.05"",""chainId"":1}",ETH支付码
```

## 🚀 操作步骤详解

### 1. 准备 CSV 文件

#### 使用 Excel 创建
1. 打开 Microsoft Excel 或 Google Sheets
2. 创建三列：`type`, `data`, `label`
3. 按格式填入数据
4. 另存为 CSV 格式

#### 使用文本编辑器创建
```csv
type,data,label
url,https://company.com,公司官网
text,联系我们：400-123-4567,客服电话
wifi,"{""ssid"":""Guest"",""password"":""welcome123""}",访客WiFi
```

### 2. 上传文件

#### 拖拽上传
1. 进入批量生成页面
2. 将 CSV 文件拖拽到上传区域
3. 等待文件解析完成

#### 点击上传
1. 点击 "Choose File" 按钮
2. 选择准备好的 CSV 文件
3. 确认文件选择

### 3. 配置输出设置

#### 格式选择
```
Format: [PNG ▼]     Size: [400x400 ▼]
```

- **PNG**: 适合打印和一般使用
- **SVG**: 矢量格式，适合网页和缩放

#### 尺寸选择
- **200x200**: 小尺寸，适合手机查看
- **400x400**: 标准尺寸，推荐使用
- **800x800**: 高清尺寸，适合打印

#### 高级选项
```
☑ Include labels in filenames    - 文件名包含标签
☑ High error correction         - 高容错级别
☐ Logo embedding               - Logo 嵌入 (Pro功能)
```

### 4. 预览和验证

#### 数据预览
系统会显示前3个项目的预览：
```
Preview (3 of 18 items)
┌─────────┬─────────┬─────────┐
│[QR预览] │[QR预览] │[QR预览] │
│ 项目A   │ 项目B   │ 项目C   │
└─────────┴─────────┴─────────┘
```

#### 进度跟踪
```
Generating... 60% complete
■■■■■■░░░░ 12/20 items processed
```

### 5. 下载结果

#### ZIP 文件内容
```
qr_batch_[timestamp].zip
├── 公司官网.png
├── 客服电话.png  
├── 访客WiFi.png
├── validation_report.csv
└── README.txt
```

#### 验证报告
```csv
ID,Label,Status,Size (bytes),Type
item-0,公司官网,Success,2048,url
item-1,客服电话,Success,1856,text  
item-2,访客WiFi,Success,2234,wifi
```

## 📋 示例模板下载

### 点击 "Download Sample CSV"
系统提供标准模板包含：
- 各种类型的示例
- 正确的格式演示
- 注释说明

### 基础模板
```csv
type,data,label
url,https://example.com,示例网站
text,Hello World,示例文本
wifi,"{""ssid"":""MyNetwork"",""password"":""pass123""}",示例WiFi
contact,"{""name"":""张三"",""phone"":""13800138000""}",示例联系人
bitcoin,"{""address"":""bc1qxy2k..."",""amount"":0.001}",示例支付码
```

### 商业模板
```csv
type,data,label
url,https://shop.company.com/product/001,产品001详情页
url,https://shop.company.com/product/002,产品002详情页
text,产品编号：PRD-001 批次：20241201,产品001标签
text,产品编号：PRD-002 批次：20241201,产品002标签
wifi,"{""ssid"":""ShopWiFi"",""password"":""shop2024""}",店铺WiFi
```

## ⚠️ 常见错误和解决方案

### 1. 文件格式错误
```
❌ 错误: "Excel 文件 (.xlsx)"
✅ 解决: 另存为 CSV 格式

❌ 错误: "编码格式不对，出现乱码"  
✅ 解决: 使用 UTF-8 编码保存
```

### 2. 数据格式错误
```
❌ 错误: wifi,ssid:MyNetwork password:123
✅ 正确: wifi,"{""ssid"":""MyNetwork"",""password"":""123""}"

❌ 错误: bitcoin,bc1qxy2k...
✅ 正确: bitcoin,"{""address"":""bc1qxy2k...""}"
```

### 3. 配额限制错误
```
❌ 错误: "Batch size exceeds limit of 20 items"
✅ 解决: 将 CSV 分割为多个文件，每个不超过20行

❌ 错误: "Daily limit reached"
✅ 解决: 等待次日配额重置或升级账户
```

### 4. JSON 格式错误
```
❌ 错误: wifi,{'ssid':'MyNet'}     (单引号)
✅ 正确: wifi,"{""ssid"":""MyNet""}"  (双引号转义)

❌ 错误: contact,{name:张三}        (缺少引号)
✅ 正确: contact,"{""name"":""张三""}"  (正确格式)
```

## 🚀 性能优化建议

### 文件大小优化
- **控制行数**: 单文件不超过 20 行
- **精简数据**: 移除不必要的字段
- **压缩内容**: 简化长URL和文本

### 处理速度优化
- **分批处理**: 大量数据分多次处理
- **避免复杂格式**: 简化 WiFi 和联系人数据
- **清理缓存**: 处理前清除浏览器缓存

### 质量保证
- **验证数据**: 处理前检查数据格式
- **测试小批**: 先用 2-3 条数据测试
- **备份文件**: 保留原始 CSV 文件

## 🔧 高级功能

### 错误处理
- **自动跳过**: 无效行自动跳过
- **错误报告**: 详细的错误日志
- **部分成功**: 处理成功的项目仍会下载

### 批量配置
- **统一设置**: 所有 QR 码使用相同配置
- **质量一致**: 确保输出格式统一
- **批量命名**: 自动生成有意义的文件名

### 集成工作流
1. **数据准备** → Excel/数据库导出
2. **格式转换** → 转为标准 CSV
3. **批量生成** → 上传并处理  
4. **质量检查** → 验证输出结果
5. **部署使用** → 打印或分发