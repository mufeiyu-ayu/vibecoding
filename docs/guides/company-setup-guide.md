# 公司电脑启动指南 - VibeCoding 项目

## 📋 第一次 Clone 项目

### 步骤 1: Clone 仓库
```bash
# 选择一个工作目录
cd ~/Desktop  # 或者你喜欢的其他位置

# Clone 项目
git clone https://github.com/mufeiyu-ayu/vibecoding.git

# 进入项目目录
cd vibecoding
```

### 步骤 2: 查看项目状态
```bash
# 查看当前分支（应该是 master）
git branch

# 查看最新提交
git log --oneline -10

# 确认文件完整
ls -la
```

预期看到：
```
* master
fe35d16 docs: add daily progress report for 2025-12-16
8101b19 feat: create Table of Contents component
d2c8586 feat: add Project document type to Contentlayer
...
```

---

## 🔧 环境配置

### 步骤 3: 安装 Node.js 和 pnpm（如果没有）

#### 检查是否已安装：
```bash
node -v    # 应该 >= 18.x
pnpm -v    # 应该 >= 8.x
```

#### 如果没有安装：

**安装 Node.js:**
```bash
# 使用 nvm（推荐）
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
nvm use 20

# 或者直接下载
# https://nodejs.org/
```

**安装 pnpm:**
```bash
npm install -g pnpm
```

### 步骤 4: 安装项目依赖
```bash
# 在项目根目录执行
pnpm install
```

这会安装所有依赖，大约需要 2-5 分钟。

预期看到：
```
Progress: resolved XX, reused XX, downloaded XX, added XX
Done in XXs
```

---

## 🚀 启动项目

### 步骤 5: 启动开发服务器
```bash
pnpm run dev
```

预期输出：
```
▲ Next.js 15.5.9
- Local:        http://localhost:3000
- Network:      http://192.168.x.x:3000

✓ Ready in 3.2s
```

### 步骤 6: 在浏览器测试
打开浏览器访问：
- http://localhost:3000 - 首页（Floating Cosmos）
- http://localhost:3000/blog - 博客列表
- http://localhost:3000/blog/test-post - 博客详情
- http://localhost:3000/projects - Projects 页面
- http://localhost:3000/about - About 页面

所有页面应该正常显示，无报错。

---

## 📝 查看项目文档

### 关键文档位置：

```bash
# Phase 1 实现计划
cat docs/plans/2025-12-16-phase1-blog-foundation.md

# Phase 2 设计文档
cat docs/plans/2025-12-16-phase2-enhanced-features.md

# Phase 2 实现计划（待继续）
cat docs/plans/2025-12-16-phase2-implementation.md

# 昨日进度报告
cat docs/progress/2025-12-16-daily-report.md
```

### 快速了解当前状态：
```bash
# 查看 Phase 2 实现计划
less docs/plans/2025-12-16-phase2-implementation.md

# 按 'q' 退出查看
```

---

## 🎯 继续 Phase 2 开发

### 方式 1: 使用 Claude Code 继续（推荐）

**步骤：**

1. **打开 Claude Code CLI:**
   ```bash
   # 在项目根目录
   claude
   ```

2. **告诉 Claude:**
   ```
   继续 Phase 2 的开发，从 Task 6 开始
   ```

3. **Claude 会自动：**
   - 读取实现计划
   - 从 Task 6 开始逐个实现
   - 每个任务完成后代码审查
   - 自动提交和测试
   - 直到完成所有 Phase 2 任务

**Phase 2 剩余任务：**
- ✅ Task 1-5 已完成
- ⏳ Task 6: 集成 TOC 到博客详情页
- ⏳ Task 7: 交互式分类筛选
- ⏳ Task 8: 搜索功能（Fuse.js）
- ⏳ Task 9: 项目时间轴组件
- ⏳ Task 10: 完成 Projects 页面
- ⏳ Task 11: 完成 About 页面
- ⏳ Task 12: 最终测试和构建

**预计时间：** 5-6 小时工作量

---

### 方式 2: 手动实现

**步骤：**

1. **创建新分支（可选）:**
   ```bash
   git checkout -b feature/phase2-continue
   ```

2. **打开实现计划:**
   ```bash
   # 使用你喜欢的编辑器
   code docs/plans/2025-12-16-phase2-implementation.md
   # 或
   vim docs/plans/2025-12-16-phase2-implementation.md
   ```

3. **按照 Task 6 的步骤实现:**
   - 参考计划中的详细代码
   - 实现每个步骤
   - 测试验证
   - Git 提交

4. **示例工作流（Task 6）:**
   ```bash
   # 1. 修改文件
   code app/blog/[slug]/BlogPostClient.tsx

   # 2. 测试
   pnpm run dev
   # 在浏览器测试

   # 3. 提交
   git add app/blog/[slug]/BlogPostClient.tsx
   git commit -m "feat: integrate TOC into blog post page"

   # 4. 继续下一个任务
   ```

---

## 🔄 每日工作流程

### 开始工作时：
```bash
# 1. 进入项目目录
cd ~/Desktop/vibecoding  # 或你的实际路径

# 2. 拉取最新代码（如果有团队成员或在多台电脑工作）
git pull origin master

# 3. 检查状态
git status
git log --oneline -5

# 4. 启动开发服务器
pnpm run dev
```

### 开发过程中：
```bash
# 查看哪些文件被修改
git status

# 查看具体修改内容
git diff

# 测试构建
pnpm run build

# 运行测试（如果有）
pnpm test
```

### 结束工作时：
```bash
# 1. 确保所有修改已提交
git status

# 2. 如果有未提交的修改
git add .
git commit -m "feat: describe what you did"

# 3. 推送到 GitHub
git push origin master
# 或如果在 feature 分支
git push origin feature/phase2-continue

# 4. 停止开发服务器
# 按 Ctrl+C
```

---

## 📊 常用命令速查

### Git 命令
```bash
# 查看状态
git status

# 查看提交历史
git log --oneline --graph -10

# 查看分支
git branch -a

# 切换分支
git checkout master
git checkout -b new-branch  # 创建并切换

# 提交代码
git add .
git commit -m "message"
git push origin branch-name

# 拉取最新代码
git pull origin master

# 回退到某个提交
git reset --hard commit-sha
```

### pnpm 命令
```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm run dev

# 生产构建
pnpm run build

# 启动生产服务器
pnpm start

# 运行 lint
pnpm run lint

# 添加新依赖
pnpm add package-name
pnpm add -D package-name  # 开发依赖
```

### 项目命令
```bash
# 清理缓存
rm -rf .next .contentlayer node_modules
pnpm install

# 生成 Contentlayer 类型
pnpm contentlayer build

# 检查 TypeScript 类型
pnpm tsc --noEmit
```

---

## 🐛 常见问题解决

### 问题 1: 端口 3000 被占用
```bash
# 方法 1: 杀死占用端口的进程
lsof -ti:3000 | xargs kill -9

# 方法 2: 使用其他端口
pnpm run dev -- -p 3001
```

### 问题 2: 依赖安装失败
```bash
# 清理并重新安装
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### 问题 3: Git 推送被拒绝
```bash
# 拉取远程最新代码
git pull origin master --rebase

# 解决冲突后
git push origin master
```

### 问题 4: Contentlayer 报错
```bash
# 清理 contentlayer 缓存
rm -rf .contentlayer

# 重新生成
pnpm contentlayer build

# 或者重启开发服务器
pnpm run dev
```

### 问题 5: TypeScript 类型错误
```bash
# 重新生成类型
rm -rf .next
pnpm contentlayer build
pnpm run dev
```

---

## 📱 VS Code 推荐配置

### 推荐扩展：
```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "unifiedjs.vscode-mdx",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

### 工作区设置（.vscode/settings.json）：
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

---

## 🎯 下一步行动清单

### ✅ 第一次启动（公司电脑）
- [ ] Clone 仓库
- [ ] 安装 Node.js 和 pnpm（如果需要）
- [ ] 运行 `pnpm install`
- [ ] 运行 `pnpm run dev`
- [ ] 在浏览器测试所有页面
- [ ] 阅读 `docs/progress/2025-12-16-daily-report.md`
- [ ] 阅读 `docs/plans/2025-12-16-phase2-implementation.md`

### ✅ 继续开发
- [ ] 决定使用 Claude Code 或手动实现
- [ ] 从 Task 6 开始实现 Phase 2
- [ ] 每完成一个任务就 git commit
- [ ] 测试每个功能
- [ ] 定期推送到 GitHub

### ✅ 完成 Phase 2 后
- [ ] 运行最终测试（Task 12）
- [ ] 创建 Phase 2 完成报告
- [ ] 推送所有代码到 GitHub
- [ ] 开始 Phase 3 或部署

---

## 💡 专业建议

### 1. 版本控制习惯
- ✅ 每完成一个小功能就提交
- ✅ 提交信息要清晰（使用 Conventional Commits）
- ✅ 定期推送到 GitHub（至少每天一次）
- ✅ 大功能使用 feature 分支

### 2. 代码质量
- ✅ 每次修改后运行 `pnpm run build` 测试
- ✅ 保持代码风格一致（使用 ESLint + Prettier）
- ✅ 写有意义的变量和函数名
- ✅ 保持组件小而专注

### 3. 时间管理
- ✅ 使用番茄工作法（25分钟专注 + 5分钟休息）
- ✅ 优先完成核心功能
- ✅ 不要过度优化（YAGNI 原则）
- ✅ 每天定一个明确的目标

### 4. 学习建议
- ✅ 遇到问题先查文档
- ✅ 善用 Claude Code 提高效率
- ✅ 记录遇到的问题和解决方案
- ✅ 定期回顾和重构代码

---

## 📞 遇到问题怎么办？

### 优先顺序：

1. **查看项目文档**
   ```bash
   # 查看进度报告
   cat docs/progress/2025-12-16-daily-report.md

   # 查看实现计划
   cat docs/plans/2025-12-16-phase2-implementation.md
   ```

2. **检查 Git 历史**
   ```bash
   # 看看之前是怎么实现的
   git log --all --grep="关键词"
   git show commit-sha
   ```

3. **使用 Claude Code**
   ```bash
   claude
   # 然后描述你的问题
   ```

4. **查看 GitHub Issues**
   - Next.js: https://github.com/vercel/next.js/issues
   - Contentlayer: https://github.com/contentlayerdev/contentlayer/issues

---

## 🎉 准备好了！

现在你已经有了完整的公司电脑启动指南！

### 快速开始三步走：
```bash
# 1. Clone 项目
git clone https://github.com/mufeiyu-ayu/vibecoding.git
cd vibecoding

# 2. 安装依赖
pnpm install

# 3. 启动开发
pnpm run dev
```

**然后告诉 Claude: "继续 Phase 2"**

祝工作顺利！🚀

---

**文档创建时间：** 2025-12-16
**适用版本：** Phase 2 开发阶段
**下次更新：** 遇到新问题时
