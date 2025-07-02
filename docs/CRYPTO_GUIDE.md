# 加密货币 QR 码生成指南

## 📊 功能概述

加密货币 QR 码生成器支持三种主要的数字货币格式，帮助你创建标准的支付二维码。

### 支持的货币类型
- **Bitcoin** - 基于 BIP-21 标准
- **Ethereum** - 基于 EIP-681 标准  
- **Lightning Network** - 基于 BOLT-11 标准

## 🪙 Bitcoin QR 码生成

### 操作步骤

1. **访问 Crypto 页面**
   - 点击首页的 "Crypto" 卡片
   - 或通过导航栏进入

2. **选择 Bitcoin 标签**
   - 页面顶部点击 "Bitcoin" 标签

3. **填写支付信息**
   ```
   Bitcoin Address *     | bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
   Amount (BTC)         | 0.001 (可选)
   Label               | Payment for services (可选)
   Message             | Optional message (可选)
   ```

4. **生成 QR 码**
   - 点击 "Generate QR Code" 按钮
   - QR 码会立即在预览区显示

5. **下载和使用**
   - **Download PNG** - 下载 PNG 格式图片
   - **SVG** - 下载矢量格式  
   - **Copy** - 复制到剪贴板

### 地址格式支持
✅ **Legacy (P2PKH)**: 以 `1` 开头  
✅ **Script (P2SH)**: 以 `3` 开头  
✅ **Native SegWit**: 以 `bc1` 开头  
✅ **Testnet**: 以 `tb1` 或 `[mn2]` 开头

### 示例
```
生成的 QR 码内容:
bitcoin:bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh?amount=0.001&label=Payment%20for%20services
```

## ⚡ Ethereum QR 码生成

### 操作步骤

1. **选择 Ethereum 标签**

2. **填写支付信息**
   ```
   Ethereum Address *   | 0x742d35Cc6634C0532925a3b844Bc9e7595f1b794
   Amount (ETH)        | 0.01 (可选)
   Chain ID           | 1 (Mainnet) / 137 (Polygon) / 10 (Optimism) / 42161 (Arbitrum)
   Gas Limit          | 21000 (可选)
   ```

3. **网络选择**
   - **Mainnet (1)** - 以太坊主网
   - **Polygon (137)** - Polygon 网络
   - **Optimism (10)** - Optimism Layer 2
   - **Arbitrum (42161)** - Arbitrum Layer 2

### 地址验证
- 必须是 40 位十六进制字符
- 可以包含或不包含 `0x` 前缀
- 支持 EIP-55 校验和格式

### 示例
```
生成的 QR 码内容:
ethereum:0x742d35Cc6634C0532925a3b844Bc9e7595f1b794?value=10000000000000000&chainId=1
```

## ⚡ Lightning Network QR 码生成

### 操作步骤

1. **选择 Lightning 标签**

2. **输入 Lightning Invoice**
   ```
   Lightning Invoice *  | lnbc100n1p3xyztest...
   ```
   - 粘贴完整的 Lightning 发票字符串
   - 系统会自动验证格式

3. **发票格式要求**
   - 必须以 `lnbc`、`lntb`、`lntbs` 或 `lnbcrt` 开头
   - 包含有效的 bech32 编码
   - 支持 mainnet 和 testnet

### 注意事项
⚠️ **时效性** - Lightning 发票通常有时间限制（默认1小时）  
⚠️ **一次性** - 大多数发票只能使用一次  
⚠️ **金额固定** - 发票中的金额无法修改

### 示例
```
生成的 QR 码内容:
LNBC100N1P3XYZTEST...
```

## 💡 使用技巧

### 1. 地址验证
- 系统会自动验证地址格式
- 无效地址会显示错误提示
- 建议从官方钱包复制地址

### 2. 金额设置
- Bitcoin: 支持 8 位小数精度
- Ethereum: 支持 18 位小数精度（Wei）
- Lightning: 金额已在发票中固定

### 3. 标签和备注
- 标签会出现在钱包的交易记录中
- 有助于区分不同的支付用途
- 避免使用特殊字符

### 4. 二维码质量
- 推荐使用 400x400 以上尺寸
- PNG 格式适合打印
- SVG 格式适合网页显示

## ❌ 常见错误

### 地址格式错误
```
❌ 错误: bc1xyz...  (地址不完整)
✅ 正确: bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
```

### 金额格式错误
```
❌ 错误: 0,001  (使用逗号)
✅ 正确: 0.001  (使用小数点)
```

### Lightning 发票错误
```
❌ 错误: lightning:lnbc...  (包含前缀)
✅ 正确: lnbc100n1p3...    (纯发票字符串)
```

## 🔧 兼容性说明

### 钱包兼容性
- **Bitcoin**: 兼容所有支持 BIP-21 的钱包
- **Ethereum**: 兼容 MetaMask、Trust Wallet 等
- **Lightning**: 兼容 Phoenix、Blue Wallet、Zap 等

### 扫码设备
- 📱 手机钱包应用
- 💻 桌面钱包软件
- 🏪 商户 POS 系统
- 🎯 硬件钱包（部分支持）