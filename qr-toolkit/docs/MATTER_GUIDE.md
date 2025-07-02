# Matter/IoT 设备配对码生成指南

## 📡 功能概述

Matter QR 码生成器帮助你为智能家居设备创建标准的配对二维码，符合 CSA（Connectivity Standards Alliance）Matter 1.x 规范。

### 什么是 Matter?
Matter 是智能家居设备的统一连接标准，让不同品牌的设备能够互相通信。

## 🔧 设备信息配置

### 必填参数

#### 1. Vendor ID (VID)
- **格式**: 十六进制 (如: 0xFFF1)
- **范围**: 0x0000 - 0xFFFF
- **说明**: 设备制造商的唯一标识符

```
示例:
0xFFF1  - 测试厂商 1
0xFFF2  - 测试厂商 2
0x1234  - 自定义厂商 ID
```

#### 2. Product ID (PID)  
- **格式**: 十六进制 (如: 0x8001)
- **范围**: 0x0000 - 0xFFFF
- **说明**: 特定产品的标识符

```
示例:
0x8001  - 智能开关
0x8002  - 智能灯泡
0x8003  - 温度传感器
```

#### 3. Setup PIN
- **格式**: 8位数字
- **范围**: 00000001 - 99999998
- **限制**: 不能全为相同数字或连续数字

```
✅ 有效 PIN:
20202021  - 推荐格式
12345679  - 可用
87654321  - 可用

❌ 无效 PIN:
11111111  - 全为相同数字
12345678  - 连续数字
00000000  - 保留值
```

#### 4. Discriminator
- **格式**: 十进制数字
- **范围**: 0 - 4095 (12位)
- **说明**: 设备在本地网络中的区分符

```
示例:
3840  - 推荐值
1024  - 常用值
2048  - 可选值
```

## 🛠️ 操作步骤详解

### 1. 访问 Matter 页面
- 点击首页 "Matter/IoT" 卡片
- 或通过导航栏选择 "Matter"

### 2. 填写设备信息
```
Device Information:
┌─────────────────────────────────────┐
│ VID: [0xFFF1    ] PID: [0x8001    ] │
│ Setup PIN: [20202021              ] │
│ Discriminator: [3840              ] │
└─────────────────────────────────────┘
```

### 3. 配置生成选项

#### TLV Generation Options
```
☑ Include Version Info           - 包含版本信息
☑ Validate VID/PID Against CSA   - CSA数据库验证
☐ Generate NFC NDEF Payload      - 生成NFC载荷
```

- **Version Info**: 增加兼容性信息
- **CSA Validation**: 验证厂商ID的有效性
- **NFC Payload**: 为支持NFC的设备生成额外数据

### 4. 验证和生成

#### 验证结果示例
```
✅ Validation Result: PASSED
   ✓ Vendor ID: 0xFFF1 (valid format)
   ✓ Product ID: 0x8001 (valid format)  
   ✓ Setup PIN: 20202021 (valid format)
   ✓ Discriminator: 3840 (within range)
```

```
⚠️ Validation Result: WARNINGS
   ✓ All required fields valid
   ⚠ Vendor ID not in known vendor list
   ⚠ Setup PIN should not be easily guessable
```

### 5. 下载和导出

#### 可用选项
- **Generate & Download** - 生成并下载PNG格式
- **PDF Label Template** - 生成可打印的标签模板
- **Validation Report** - 下载验证报告文档

## 📋 验证报告详解

### 报告内容
验证报告包含以下信息：
```
Matter Device Validation Report
================================

Vendor ID: 0xFFF1
Product ID: 0x8001
Setup PIN: 20202021
Discriminator: 3840

Validation Result: ✅ PASSED

TLV Fields:
- Tag 0: Setup PIN (20202021)
- Tag 1: Discriminator (3840)  
- Tag 2: Vendor ID (65521)
- Tag 3: Product ID (32769)
```

### 错误类型
| 错误类型 | 说明 | 解决方案 |
|----------|------|----------|
| Invalid VID | 厂商ID格式错误 | 使用0x前缀的十六进制 |
| Invalid PID | 产品ID格式错误 | 检查十六进制格式 |
| Weak PIN | PIN码强度不够 | 避免连续或重复数字 |
| Range Error | 数值超出范围 | 检查取值范围 |

## 🏷️ 实际应用场景

### 1. 设备制造商
```
使用场景: 为量产设备生成配对码
操作流程:
1. 获取CSA分配的VID
2. 为每个产品型号分配PID
3. 为每台设备生成唯一PIN和Discriminator
4. 批量生成配对码并打印到产品标签
```

### 2. 开发者测试
```
使用场景: 开发阶段的设备测试
推荐配置:
- VID: 0xFFF1 (测试厂商)
- PID: 0x8001 (测试产品)
- PIN: 20202021 (测试PIN)
- Discriminator: 3840 (测试值)
```

### 3. DIY 智能设备
```
使用场景: 个人制作的智能设备
注意事项:
- 使用测试范围的VID (0xFFF1-0xFFF4)
- 确保PIN的唯一性
- 记录每个设备的参数以便管理
```

## 🔍 QR码内容解析

### 标准格式
Matter QR码内容格式：
```
MT:[Base38编码的TLV数据]

示例:
MT:Y.K42L00KA0648G00
```

### TLV (Type-Length-Value) 结构
```
字段布局:
Bit 0-2:   Version (3 bits)
Bit 3-18:  Vendor ID (16 bits)  
Bit 19-34: Product ID (16 bits)
Bit 35-36: Commissioning Flow (2 bits)
Bit 37-44: Discovery Capabilities (8 bits)
Bit 45-56: Discriminator (12 bits)
Bit 57-83: Setup PIN (27 bits)
```

## 📱 设备配对流程

### 用户使用步骤
1. **生成QR码** - 使用本工具生成配对码
2. **打印/显示** - 将QR码贴在设备上或显示在屏幕
3. **扫描配对** - 用户用智能家居App扫描
4. **自动配置** - 设备自动连接到家庭网络

### 支持的App
- **Google Home** - Android/iOS
- **Apple HomeKit** - iOS/macOS  
- **Amazon Alexa** - Android/iOS
- **Samsung SmartThings** - Android/iOS
- **其他Matter兼容应用**

## ⚡ 性能建议

### QR码尺寸
- **最小尺寸**: 30mm × 30mm
- **推荐尺寸**: 40mm × 40mm 以上
- **打印质量**: 300 DPI 或更高

### 扫描环境
- **光照充足**: 避免阴影和反光
- **距离适中**: 5-15cm 的扫描距离
- **角度垂直**: 避免倾斜扫描

## 🛠️ 故障排除

### 常见问题

#### 1. QR码无法扫描
```
可能原因:
- QR码尺寸太小
- 打印质量不佳
- 扫描环境光线不足

解决方案:
- 使用更大的QR码尺寸
- 提高打印分辨率
- 改善扫描环境光线
```

#### 2. 设备配对失败
```
可能原因:
- VID/PID组合无效
- Setup PIN已被使用
- 设备不支持Matter协议

解决方案:
- 验证设备参数
- 生成新的Setup PIN
- 确认设备Matter兼容性
```

#### 3. 验证报告错误
```
常见错误及解决:
- "Invalid hex format" → 检查0x前缀
- "PIN too weak" → 使用更复杂的PIN
- "VID not found" → 关闭CSA验证或使用有效VID
```