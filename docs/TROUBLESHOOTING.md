# QR Toolkit 故障排除指南

## 🚨 常见问题 FAQ

### 1. 访问和加载问题

#### Q: 页面无法加载或显示空白
```
可能原因:
- 浏览器版本过旧
- JavaScript 被禁用
- 网络连接问题

解决方案:
✅ 使用 Chrome 90+、Firefox 88+、Safari 14+ 或 Edge 90+
✅ 启用 JavaScript
✅ 清除浏览器缓存和 Cookie
✅ 尝试无痕模式
```

#### Q: 首次访问速度很慢
```
原因: 应用需要下载 Web Workers 和依赖文件

解决方案:
✅ 耐心等待初始加载完成
✅ 后续访问会更快（已缓存）
✅ 可离线使用
```

### 2. QR 码生成问题

#### Q: 生成的 QR 码无法扫描
```
常见原因:
❌ QR 码尺寸太小
❌ 图片质量不清晰
❌ 容错级别设置过低

解决方案:
✅ 使用至少 400x400 像素尺寸
✅ 选择高容错级别 (High)
✅ 确保打印清晰度至少 300 DPI
✅ 避免过度压缩图片
```

#### Q: QR 码内容过长导致生成失败
```
限制说明:
- 文本类型: 最多 2953 字符
- URL 类型: 最多 2083 字符
- 复杂格式: 可能更少

解决方案:
✅ 精简内容，去除不必要字符
✅ 使用短链接服务
✅ 分拆为多个 QR 码
```

## 💰 加密货币功能故障排除

### Bitcoin 相关问题

#### Q: Bitcoin 地址验证失败
```
错误信息: "Invalid Bitcoin address format"

检查清单:
✅ 地址格式正确 (1xxx、3xxx、bc1xxx)
✅ 地址长度符合要求 (26-62 字符)
✅ 没有额外的空格或特殊字符
✅ 区分主网和测试网地址

示例:
❌ 错误: bc1qxy2k... (地址不完整)
✅ 正确: bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
```

#### Q: 金额格式错误
```
错误信息: "Invalid amount format"

要求:
✅ 使用小数点，不用逗号 (0.001 ✓, 0,001 ✗)
✅ 最多 8 位小数精度
✅ 大于 0 且小于 21,000,000 BTC
✅ 不使用科学计数法

示例:
❌ 错误: 1e-5, 0,001, 21000000.1
✅ 正确: 0.00001, 0.001, 1.5
```

### Ethereum 相关问题

#### Q: Ethereum 地址无效
```
错误信息: "Invalid Ethereum address"

检查清单:
✅ 地址为 40 位十六进制字符
✅ 可以包含或不包含 0x 前缀
✅ 支持 EIP-55 校验和格式
✅ 避免混淆字符 (O, 0, I, l)

示例:
❌ 错误: 742d35Cc6634C0532925a3b844Bc9e75 (少4位)
✅ 正确: 0x742d35Cc6634C0532925a3b844Bc9e7595f1b794
```

#### Q: Chain ID 设置错误
```
常用 Chain ID:
- 1: Ethereum 主网
- 137: Polygon 
- 10: Optimism
- 42161: Arbitrum
- 5: Goerli 测试网

确保 Chain ID 与目标网络匹配
```

### Lightning Network 相关问题

#### Q: Lightning 发票格式错误
```
错误信息: "Invalid Lightning invoice"

要求:
✅ 以 lnbc、lntb、lntbs 或 lnbcrt 开头
✅ 包含有效的 bech32 编码
✅ 不包含 lightning: 前缀
✅ 发票未过期

示例:
❌ 错误: lightning:lnbc100n1p3...
✅ 正确: lnbc100n1p3xyztest...
```

## 📡 Matter/IoT 功能故障排除

### 设备信息验证问题

#### Q: Vendor ID 格式错误
```
错误信息: "Invalid VID format"

要求:
✅ 使用十六进制格式，包含 0x 前缀
✅ 范围: 0x0000 - 0xFFFF
✅ 测试用途推荐: 0xFFF1-0xFFF4

示例:
❌ 错误: FFF1, fff1, 0XFFF1
✅ 正确: 0xFFF1, 0x1234
```

#### Q: Setup PIN 验证失败
```
错误信息: "Invalid or weak Setup PIN"

要求:
✅ 恰好 8 位数字
✅ 不能全为相同数字 (11111111 ✗)
✅ 不能为连续数字 (12345678 ✗)
✅ 不能为 00000000 或 99999999

推荐 PIN:
✅ 20202021, 12345679, 87654321
```

#### Q: QR 码生成但无法配对
```
可能原因:
- 设备固件不支持 Matter
- PIN 已被其他设备使用
- 网络环境问题

解决方案:
✅ 确认设备支持 Matter 1.0+
✅ 重新生成唯一的 Setup PIN
✅ 检查设备和手机在同一网络
✅ 更新智能家居 App 版本
```

## 📊 批量生成故障排除

### CSV 文件问题

#### Q: CSV 文件上传失败
```
错误信息: "Failed to parse CSV file"

检查清单:
✅ 文件格式为 .csv (不是 .xlsx 或 .xls)
✅ 使用 UTF-8 编码保存
✅ 包含必需的列: type, data, label
✅ 文件大小小于 5MB

转换方法:
Excel → 另存为 → CSV UTF-8 (逗号分隔)
```

#### Q: JSON 格式错误
```
错误信息: "Invalid JSON in data field"

常见错误:
❌ 使用单引号: {'ssid':'WiFi'}
✅ 使用双引号: {"ssid":"WiFi"}

❌ 未转义引号: {"name":"Zhang"s Phone"}
✅ 正确转义: {"name":"Zhang\"s Phone"}

CSV 中的正确格式:
wifi,"{""ssid"":""MyNetwork"",""password"":""pass123""}",WiFi码
```

#### Q: 配额超限
```
错误信息: "Batch size exceeds limit" 或 "Daily limit reached"

解决方案:
✅ 将大文件分割为多个小文件 (≤20 行)
✅ 等待次日配额重置
✅ 优化数据，移除不必要的行
✅ 考虑升级账户 (如有付费版本)
```

### 批量处理错误

#### Q: 部分 QR 码生成失败
```
处理方式:
✅ 系统会自动跳过无效行
✅ 成功的项目仍会下载
✅ 查看 validation_report.csv 了解详情
✅ 修复错误后重新处理失败项目
```

#### Q: 下载的 ZIP 文件无法打开
```
可能原因:
- 浏览器下载被中断
- 文件大小为 0 字节
- 压缩过程出错

解决方案:
✅ 重新生成并下载
✅ 尝试不同浏览器
✅ 检查磁盘空间是否充足
✅ 临时关闭杀毒软件
```

## 🖥️ 技术环境问题

### 浏览器兼容性

#### Q: 功能在某些浏览器中不工作
```
最低版本要求:
- Chrome 90+ ✅
- Firefox 88+ ✅  
- Safari 14+ ✅
- Edge 90+ ✅

不支持:
- Internet Explorer (任何版本) ❌
- Chrome < 90 ❌
- 一些旧版移动浏览器 ❌
```

#### Q: 移动设备使用问题
```
常见问题:
- 屏幕太小，操作困难
- 键盘遮挡输入框
- 文件上传功能受限

解决方案:
✅ 横屏使用获得更好体验
✅ 使用原生文件应用选择 CSV
✅ 考虑在桌面端进行批量操作
```

### 性能问题

#### Q: 批量生成速度很慢
```
影响因素:
- 设备 CPU 性能
- 批量数量
- QR 码复杂度

优化建议:
✅ 减少单次处理数量 (≤10 项)
✅ 关闭其他占用资源的标签页
✅ 简化 QR 码内容
✅ 使用较小的输出尺寸
```

#### Q: 内存不足或页面崩溃
```
错误信息: "Page unresponsive" 或浏览器崩溃

解决方案:
✅ 重启浏览器
✅ 减少批量处理数量
✅ 清理浏览器缓存
✅ 增加设备虚拟内存
✅ 尝试使用无痕模式
```

## 🔧 高级故障排除

### 开发者工具诊断

#### 检查控制台错误
```bash
# 打开浏览器开发者工具
Chrome/Edge: F12 或 Ctrl+Shift+I
Firefox: F12 或 Ctrl+Shift+K
Safari: Option+Cmd+I

# 查看 Console 标签页中的错误信息
# 红色文字表示错误，需要关注
```

#### 网络请求问题
```
检查 Network 标签页:
✅ 确认所有资源正常加载 (200 状态)
✅ 查看是否有失败的请求 (红色)
✅ 检查 Web Worker 文件是否加载
```

### 本地开发问题

#### Q: 本地开发环境启动失败
```bash
# 检查 Node.js 版本
node --version  # 需要 18.0+ 

# 重新安装依赖
rm -rf node_modules package-lock.json
npm install

# 清理缓存
npm run clean  # 如果有此命令
```

#### Q: 构建错误
```bash
# 检查 TypeScript 错误
npm run type-check

# 检查 ESLint 错误  
npm run lint

# 清理构建缓存
rm -rf .next
npm run build
```

## 📞 获取帮助

### 自助资源
1. **用户指南** - [USER_GUIDE.md](./USER_GUIDE.md)
2. **功能文档** - 查看各功能的详细说明
3. **示例模板** - 下载 CSV 示例文件

### 技术支持
- **GitHub Issues**: [提交问题](https://github.com/xuhaoying/privqr.com/issues)
- **功能请求**: 通过 GitHub Issues 提交
- **安全问题**: 请发送邮件而非公开提交

### 提交问题时请包含
1. **错误描述** - 详细说明发生了什么
2. **复现步骤** - 如何触发这个问题
3. **浏览器信息** - 浏览器类型和版本
4. **屏幕截图** - 如果有界面问题
5. **控制台日志** - 开发者工具中的错误信息

---

**记住**: QR Toolkit 重视你的隐私，所有处理都在本地进行。如果问题仍然存在，请不要犹豫寻求帮助！