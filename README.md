# 数学之巅 MathematicalZenith

> **纯人机代码，100%AI添加。**
> 
> **我们拥有最廉价的美术风格和最丰富的BUG体验。**

---

## 游戏简介

数学之巅是一款卡牌肉鸽游戏，但别担心——这里没有真正的数学题，只有披着数学史外衣的**~~烧脑~~弱智战斗**。

玩家将扮演数学家角色，在**四章数学史**中战斗，从古希腊的几何大陆一路烧到20世纪的集合论深渊。

---

## 如何开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

然后打开浏览器访问 `http://localhost:4173`

### 3. 构建生产版本

```bash
npm run build
```

### 4. 预览生产版本

```bash
npm run preview
```

---

## 游戏结构

```
src/
├── screens/        # 8个游戏界面
│   ├── StartScreen.tsx        # 开始界面
│   ├── CharacterSelectScreen.tsx  # 角色选择
│   ├── MapScreen.tsx          # 地图导航
│   ├── BattleScreen.tsx       # 战斗界面
│   ├── EventScreen.tsx        # 随机事件
│   ├── ShopScreen.tsx         # 商店
│   ├── RestScreen.tsx         # 休息站（升级卡牌）
│   └── VictoryScreen.tsx       # 胜利结算
│
├── data/           # 游戏数据定义
│   ├── cards/      # 卡牌数据（按章节分类）
│   ├── characters/ # 角色定义
│   ├── enemies/    # 敌人数据
│   ├── events/     # 随机事件
│   └── relics.ts   # 遗物系统
│
├── components/     # UI组件
│   ├── Battle/      # 战斗相关（手牌、敌人面板、意图图标）
│   ├── Card/        # 卡牌视图
│   ├── Map/         # 地图节点
│   ├── UI/          # 通用UI（遮罩、弹窗、动画特效）
│   └── Animations/  # 动画组件
│
├── systems/         # 游戏逻辑系统
│   ├── turnManager.ts     # 回合管理
│   ├── battleResolver.ts  # 战斗结算
│   └── mapGenerator.ts    # 地图生成
│
├── store/           # Zustand状态管理
│   └── gameStore.ts # 全局游戏状态
│
└── types/           # TypeScript类型定义
```

--- 

## 技术栈

- **React 19** - UI框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **Zustand** - 状态管理
- **Framer Motion** - 动画效果

---

