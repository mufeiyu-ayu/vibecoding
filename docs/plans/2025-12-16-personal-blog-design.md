# 个人博客项目设计文档

**创建日期**: 2025-12-16
**项目名称**: vibecoding 个人博客
**设计状态**: 进行中（已完成架构和视觉设计部分）

## 项目概述

基于 Next.js 16 + React 19 + TypeScript 构建的现代化个人博客，支持技术文章、生活记录、作品展示等多种内容类型。采用本地 Markdown/MDX 文件管理内容，通过 Git 版本控制，静态站点生成方式部署。

## 核心需求

- **博客类型**: 综合博客（技术 + 生活 + 作品）
- **内容管理**: 本地 Markdown/MDX 文件
- **互动功能**: 暂不实现，先专注内容展示
- **首页风格**: 极简着陆页 + 内容在独立 /blog 页面
- **视觉风格**: 现代科技感（渐变色、毛玻璃、动画交互）
- **渲染方式**: 纯静态生成（SSG）以获得最佳性能和 SEO

## 技术架构

### 核心技术栈

- **Next.js 16 App Router** - 使用最新的 App Router 和 RSC
- **React 19.2.1** - 最新的 React 版本
- **TypeScript 5** - 类型安全
- **Tailwind CSS v4** - 现代化样式实现
- **Contentlayer 2** - MDX 文件处理，类型安全的内容访问
- **Framer Motion** - 页面过渡和元素动画
- **Shiki** - 代码高亮，支持多种主题

### 项目结构

```
vibecoding/
├── app/
│   ├── page.tsx              # 极简着陆页
│   ├── layout.tsx            # 根布局
│   ├── blog/
│   │   ├── page.tsx          # 博客列表页
│   │   ├── [slug]/page.tsx   # 文章详情页
│   │   └── category/
│   │       └── [name]/page.tsx  # 分类页面
│   ├── about/
│   │   └── page.tsx          # 关于页面
│   └── projects/
│       └── page.tsx          # 作品展示页
├── content/
│   ├── posts/                # 博客文章 MDX 文件
│   │   ├── tech/             # 技术分类
│   │   ├── life/             # 生活分类
│   │   └── work/             # 作品分类
│   └── projects/             # 项目介绍 MDX 文件
├── components/
│   ├── ui/                   # 通用 UI 组件
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── ...
│   ├── blog/                 # 博客相关组件
│   │   ├── PostCard.tsx
│   │   ├── TOC.tsx           # 目录组件
│   │   ├── MDXComponents.tsx # MDX 自定义组件
│   │   └── ...
│   ├── layout/               # 布局组件
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ...
│   └── animations/           # 动画组件
│       ├── PageTransition.tsx
│       ├── FadeIn.tsx
│       └── ...
├── lib/
│   ├── posts.ts             # 文章数据处理
│   └── utils.ts             # 工具函数
├── public/
│   ├── images/              # 静态图片资源
│   └── ...
├── contentlayer.config.ts   # Contentlayer 配置
└── docs/
    └── plans/               # 设计文档目录
```

### 渲染策略

**纯静态生成（SSG）**：
- 构建时生成所有页面的静态 HTML
- 使用 `generateStaticParams` 为所有文章生成路由
- 优点：性能最优、SEO 友好、托管成本低
- 适用场景：内容通过 Git 管理，每次更新都重新部署

## 页面设计

### 1. 首页（着陆页）- `/`

**Hero 区域**：
- 全屏或大幅 Hero Section
- 个人名字/标题，带打字机效果或渐现动画
- 一句简短的个人介绍（如："Full-stack Developer | Open Source Enthusiast"）
- 渐变色背景或动态网格背景效果
- CTA 按钮组：
  - "进入博客" → /blog
  - "查看作品" → /projects
  - "关于我" → /about

**特色内容区**：
- 滚动后展示 3-4 个最新/精选文章卡片
- 卡片带悬停效果（毛玻璃、阴影提升）
- "查看更多文章" 按钮引导到 /blog

**导航栏**：
- 固定顶部，毛玻璃背景（backdrop-blur）
- Logo/名字（左侧）
- 导航链接：Blog / Projects / About（中间/右侧）
- 主题切换按钮（深色/浅色模式）

### 2. 博客列表页 - `/blog`

**顶部区域**：
- 页面标题和简介
- 搜索框（搜索文章标题和内容）
- 分类筛选标签：All / Tech / Life / Work

**文章展示**：
- 响应式网格布局：
  - PC（>1024px）：3 列
  - 平板（768-1024px）：2 列
  - 手机（<768px）：1 列
- 文章卡片内容：
  - 封面图（可选）
  - 标题
  - 摘要（前 150 字）
  - 发布日期
  - 分类标签
  - 阅读时间估算
- 卡片悬停效果：微动画（缩放、发光边框）
- 加载更多：无限滚动或分页

### 3. 文章详情页 - `/blog/[slug]`

**布局**：
- 居中阅读布局，最大宽度 65ch（最佳阅读宽度）
- 左侧：固定目录导航（TOC），高亮当前阅读位置（仅 PC 端显示）
- 主内容区：文章正文

**头部信息**：
- 大标题（h1）
- 发布日期、更新日期（如有）
- 分类标签
- 阅读时间估算
- 封面图（可选，全宽或内嵌）

**正文内容**：
- MDX 渲染，支持自定义组件
- 代码块带语法高亮（Shiki）
- 代码块工具栏：语言标签 + 复制按钮
- 图片优化（Next.js Image 组件）
- 响应式排版

**底部导航**：
- 上一篇/下一篇文章导航
- 分享按钮（Twitter、LinkedIn、复制链接）

**动画**：
- 页面进入/退出的淡入淡出效果
- 目录导航的滑动指示器

### 4. 分类页面 - `/blog/category/[name]`

- 类似博客列表页，但只显示特定分类的文章
- 顶部显示分类名称和描述

### 5. 作品展示页 - `/projects`

- 项目卡片网格布局
- 每个项目包含：项目图片、名称、简介、技术栈、链接
- 点击进入项目详情页（可选）

### 6. 关于页面 - `/about`

- 个人简介
- 技能栈
- 工作经历/教育背景
- 联系方式
- 社交媒体链接

## 视觉设计

### 配色方案（现代科技感 - 明亮版）

**浅色模式（主要模式）**：
- 背景色：白色 (#ffffff)、浅灰 (#fafafa, #f5f5f5)
- 文字色：深灰 (#1f2937)、中灰 (#6b7280)
- 强调色：渐变色系
  - 主渐变：青色到紫色 (#06b6d4 → #a855f7)
  - 或：蓝色到粉色 (#3b82f6 → #ec4899)
- 卡片背景：白色 + 轻微阴影
- 毛玻璃效果：白色半透明 + backdrop-blur

**深色模式（可选）**：
- 背景色：深蓝 (#0f172a)、深紫 (#1e1b4b) - **避免纯黑色**
- 文字色：浅灰 (#e5e7eb)、中灰 (#9ca3af)
- 强调色：相同的渐变色，但更鲜艳
- 卡片背景：深色半透明 + 毛玻璃效果

**设计元素**：
- 毛玻璃效果：卡片、导航栏使用 `backdrop-blur-xl` + 半透明背景
- 发光效果：按钮和卡片悬停时显示渐变色边框发光
- 圆角：现代化圆角设计（border-radius: 12-24px）
- 阴影：分层阴影，营造深度感

### 核心动画效果（Framer Motion）

1. **页面过渡**
   - 路由切换时：淡入淡出 + 轻微向上位移
   - 持续时间：300-400ms
   - 缓动函数：ease-in-out

2. **Hero 区域动画**
   - 标题：逐字渐现效果（typewriter 或 stagger）
   - 背景：动态网格或粒子效果缓慢移动
   - CTA 按钮：从下方淡入

3. **卡片进入动画**
   - 滚动触发（Intersection Observer）
   - 依次从下方淡入上升（stagger 效果，间隔 50-100ms）
   - 初始状态：透明度 0，Y 轴偏移 20px
   - 最终状态：透明度 1，Y 轴归位

4. **悬停交互**
   - 卡片：轻微上浮（-4px）+ 阴影加深 + 边框发光
   - 按钮：背景渐变位移 + 轻微缩放（1.02）
   - 链接：下划线从左到右展开

5. **目录导航（TOC）**
   - 滑动指示器跟随当前阅读位置
   - 平滑过渡动画

6. **代码块**
   - 复制按钮悬停效果
   - 复制成功后的反馈动画（对勾图标 + "Copied!" 提示）

### 响应式设计

**断点设计**：
- 手机：< 768px
- 平板：768px - 1024px
- PC：> 1024px

**移动端优先**：
- 所有样式先为移动端设计
- 使用 Tailwind 的响应式前缀（md:, lg:）逐步增强

**具体适配**：
- **导航栏**：移动端使用汉堡菜单
- **文章列表**：PC 3列 → 平板 2列 → 手机 1列
- **文章详情**：PC 显示侧边目录 → 移动端隐藏或顶部折叠
- **字体大小**：移动端略小，PC 端舒适阅读

## 内容管理

### MDX 文件格式

**Front Matter（元数据）**：
```yaml
---
title: "文章标题"
description: "文章摘要"
date: "2025-12-16"
updated: "2025-12-16"  # 可选
category: "tech"  # tech | life | work
tags: ["react", "nextjs", "typescript"]
cover: "/images/cover.jpg"  # 可选
featured: true  # 可选，是否精选
draft: false  # 是否为草稿
---
```

**目录结构**：
```
content/posts/
├── tech/
│   ├── nextjs-blog-setup.mdx
│   └── react-best-practices.mdx
├── life/
│   └── 2024-year-review.mdx
└── work/
    └── portfolio-redesign.mdx
```

### Contentlayer 配置

定义内容 schema，包括：
- Post 类型：定义文章的所有字段
- 自动计算字段：阅读时间、slug、目录（TOC）
- 验证规则：必填字段、日期格式等

## 技术实现要点

### 1. Contentlayer 集成

- 安装 contentlayer 和 next-contentlayer
- 配置 `contentlayer.config.ts` 定义内容模型
- 在 `next.config.ts` 中集成 contentlayer
- 自动生成类型和内容 API

### 2. MDX 自定义组件

创建自定义 MDX 组件映射：
- 标题（h1-h6）：添加锚点链接
- 代码块：集成 Shiki 语法高亮 + 复制按钮
- 图片：使用 Next.js Image 组件优化
- 链接：外链添加图标和 `target="_blank"`
- 引用块、表格等：自定义样式

### 3. 目录（TOC）生成

- 解析 MDX 内容，提取 h2-h3 标题
- 生成层级目录结构
- 使用 Intersection Observer 追踪当前阅读位置
- 平滑滚动到对应章节

### 4. 搜索功能

初期实现：
- 客户端搜索（Fuse.js）
- 搜索范围：标题、描述、标签

未来扩展：
- Algolia 或其他搜索服务

### 5. 主题切换

- 使用 `next-themes` 管理主题
- 支持系统主题检测
- 保存用户偏好到 localStorage
- Tailwind 的 `dark:` 前缀实现深色模式样式

### 6. 性能优化

- 图片优化：使用 Next.js Image 组件
- 字体优化：next/font 自动优化 Google Fonts
- 代码分割：动态导入大型组件（如 Framer Motion）
- 预加载：关键页面预加载
- 缓存策略：静态资源长期缓存

### 7. SEO 优化

- 每个页面生成完整的 metadata
- Open Graph 标签（社交媒体分享）
- JSON-LD 结构化数据（文章、面包屑）
- sitemap.xml 和 robots.txt 自动生成
- RSS feed（可选）

## 后续功能扩展（预留）

以下功能暂不实现，但架构上预留扩展空间：

1. **评论系统**：Giscus（基于 GitHub Discussions）
2. **浏览统计**：Google Analytics 或自建
3. **点赞/收藏**：需要后端支持或第三方服务
4. **文章系列**：将相关文章组织成系列
5. **国际化（i18n）**：支持多语言
6. **全文搜索**：Algolia 或 Elasticsearch
7. **订阅功能**：RSS + Email Newsletter

## 开发计划

### 第一阶段：基础框架（核心功能）
1. 设置 Contentlayer 和 MDX 支持
2. 实现基础路由和页面结构
3. 创建核心 UI 组件（Button, Card, Header, Footer）
4. 实现着陆页和博客列表页
5. 实现文章详情页（无动画）

### 第二阶段：内容增强
1. 集成 Shiki 代码高亮
2. 实现 MDX 自定义组件
3. 目录（TOC）生成和导航
4. 搜索功能
5. 分类和标签页面

### 第三阶段：视觉和动画
1. 实现完整的配色方案和主题切换
2. 集成 Framer Motion
3. 实现页面过渡动画
4. 卡片和元素的进入/悬停动画
5. 细节打磨和响应式优化

### 第四阶段：SEO 和部署
1. SEO 优化（metadata, Open Graph, JSON-LD）
2. 性能优化
3. 部署到 Vercel 或其他平台
4. 配置自定义域名

## 待讨论/决策事项

- [ ] 具体的渐变色方案（青紫渐变 vs 蓝粉渐变）
- [ ] Hero 区域的背景效果（网格 vs 粒子 vs 其他）
- [ ] 是否需要文章阅读进度条
- [ ] 作品展示页的具体设计
- [ ] 关于页面的内容结构
- [ ] 动画的具体参数和时长

## 参考资源

- [Contentlayer 文档](https://contentlayer.dev/)
- [Framer Motion 文档](https://www.framer.com/motion/)
- [Shiki 文档](https://shiki.matsu.io/)
- [Tailwind CSS v4 文档](https://tailwindcss.com/)

---

**文档版本**: v0.1
**最后更新**: 2025-12-16
**状态**: 设计阶段 - 待完成最终细节确认
