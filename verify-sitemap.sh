#!/bin/bash

echo "🔍 验证 privqr.com 站点地图配置"
echo "================================="
echo ""

# 检查站点地图
echo "📄 检查站点地图..."
SITEMAP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://privqr.com/sitemap.xml)
if [ "$SITEMAP_STATUS" == "200" ]; then
    echo "✅ Sitemap: https://privqr.com/sitemap.xml (HTTP $SITEMAP_STATUS)"
    echo "   内容预览:"
    curl -s https://privqr.com/sitemap.xml | head -5 | sed 's/^/   /'
else
    echo "❌ Sitemap 无法访问 (HTTP $SITEMAP_STATUS)"
fi

echo ""

# 检查 robots.txt
echo "🤖 检查 robots.txt..."
ROBOTS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://privqr.com/robots.txt)
if [ "$ROBOTS_STATUS" == "200" ]; then
    echo "✅ Robots.txt: https://privqr.com/robots.txt (HTTP $ROBOTS_STATUS)"
    echo "   Sitemap 引用:"
    curl -s https://privqr.com/robots.txt | grep -i sitemap | sed 's/^/   /'
else
    echo "❌ Robots.txt 无法访问 (HTTP $ROBOTS_STATUS)"
fi

echo ""
echo "📊 验证完成！"
echo ""
echo "下一步："
echo "1. 访问 https://search.google.com/search-console"
echo "2. 添加属性: https://privqr.com"
echo "3. 提交站点地图: sitemap.xml"
echo ""