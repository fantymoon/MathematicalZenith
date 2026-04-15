import type { Chapter } from '../types/chapter';
import { getChapterConfig } from '../types/chapter';
import type { CharacterId, MapNode, MapNodeType } from '../types/game';

// 章节节点名称池 - 每个节点类型有多个备选名称
const chapterNodeNamePools: Record<Chapter, Record<MapNodeType, Array<{ title: string; subtitle: string }>>> = {
  chapter1: {
    battle: [
      { title: '柏拉图学园', subtitle: '在雅典郊外的橄榄树林中，几何学家们争论着理想形式的本质。' },
      { title: '亚历山大图书馆', subtitle: '人类知识的宝库，欧几里得曾在此编纂《几何原本》。' },
      { title: '毕达哥拉斯学派', subtitle: '秘密的数学兄弟会，相信万物皆数。' },
      { title: '雅典广场', subtitle: '苏格拉底曾在此追问什么是正义，什么是真理。' },
      { title: '米利都学院', subtitle: '泰勒斯在此测量金字塔，预言日食，开创理性思维。' },
      { title: '昔兰尼学派', subtitle: '埃拉托色尼在此计算地球周长，误差不到百分之二。' },
    ],
    event: [
      { title: '倍立方问题', subtitle: '德尔斐神谕要求将祭坛体积加倍，尺规作图能否完成？' },
      { title: '化圆为方', subtitle: '用直尺和圆规构造一个与给定圆面积相等的正方形。' },
      { title: '三等分角', subtitle: '任意角的三等分，看似简单却困扰数学家两千年。' },
      { title: '无理数的发现', subtitle: '希帕索斯发现正方形对角线与边长不可公度，引发第一次数学危机。' },
      { title: '芝诺悖论', subtitle: '阿喀琉斯能否追上乌龟？运动是否只是幻觉？' },
      { title: '柏拉图体', subtitle: '五种正多面体，对应宇宙五种元素的神圣几何。' },
    ],
    rest: [
      { title: '阿波罗神庙', subtitle: '德尔斐的神谕：认识你自己。在神圣的几何中寻求启示。' },
      { title: '缪斯神殿', subtitle: '在雅典娜的庇护下，让思维的秩序重新恢复。' },
      { title: '橄榄树林', subtitle: '柏拉图学园的学者们在此散步，讨论理念世界的永恒真理。' },
      { title: '尼罗河畔', subtitle: '泰勒斯在此测量金字塔的影子，发现相似三角形的奥秘。' },
    ],
    shop: [
      { title: '亚历山大港', subtitle: '地中海的知识交汇点，学者从世界各地带来最新的发现。' },
      { title: '毕达哥拉斯集市', subtitle: '学派成员在此交流发现的数论规律，分享几何证明。' },
      { title: '几何工具铺', subtitle: '欧几里得的直尺和圆规，最纯粹的数学工具。' },
    ],
    boss: [
      { title: '梅塔蓬图姆', subtitle: '毕达哥拉斯学派在此崩溃，希帕索斯因发现无理数而被沉入大海。' },
      { title: '不可公度性', subtitle: '有些长度无法用整数比表示，这一发现摧毁了毕达哥拉斯的信仰。' },
    ],
  },
  chapter2: {
    battle: [
      { title: '剑桥三一学院', subtitle: '牛顿的领地，在这里他发现了万有引力和微积分。' },
      { title: '汉诺威宫廷', subtitle: '莱布尼茨的庇护所，他在此发展出优雅的微分符号。' },
      { title: '皇家学会', subtitle: '科学争论的舞台，胡克与牛顿在此激烈交锋。' },
      { title: '莱比锡大学', subtitle: '莱布尼茨的战场，他在这里发表了第一篇微积分论文。' },
      { title: '巴黎科学院', subtitle: '洛必达在此学习微积分，后来以他的名义命名了求极限法则。' },
      { title: '巴塞尔大学', subtitle: '伯努利家族的领地，雅各布和约翰在此争论数学问题。' },
    ],
    event: [
      { title: '优先权之争', subtitle: '牛顿与莱布尼茨，谁才是微积分的真正发明者？' },
      { title: '无穷小悖论', subtitle: '贝克莱主教攻击：无穷小是"已死量的幽灵"。' },
      { title: '流数术的秘密', subtitle: '牛顿隐藏了他的方法二十年，直到哈雷的劝说才发表。' },
      { title: '微分符号之争', subtitle: '牛顿的点记号 vs 莱布尼茨的 dx/dt，后者最终胜出。' },
      { title: '最速降线问题', subtitle: '约翰·伯努利向全欧洲数学家挑战，牛顿匿名解答。' },
      { title: '悬链线之谜', subtitle: '悬挂的链条形成什么曲线？伽利略猜错，莱布尼茨答对。' },
    ],
    rest: [
      { title: '伍尔索普庄园', subtitle: '牛顿的苹果园，瘟疫期间的宁静让他发现了运动的规律。' },
      { title: '下萨克森的花园', subtitle: '莱布尼茨在此思考，单子论和微积分在他脑海中成形。' },
      { title: '剑桥的河边', subtitle: '牛顿在此散步，思考着流动的变化率。' },
      { title: '巴塞尔的莱茵河畔', subtitle: '欧拉在此诞生，他将继承并发展牛顿和莱布尼茨的工作。' },
    ],
    shop: [
      { title: '伦敦咖啡馆', subtitle: '科学家们在此聚会，讨论最新的发现和思想。' },
      { title: '欧洲学术邮路', subtitle: '书信跨越大陆，连接着牛顿、莱布尼茨和伯努利家族。' },
      { title: '数学仪器店', subtitle: '望远镜、显微镜和计算尺，工具推动着科学的进步。' },
    ],
    boss: [
      { title: '极限的深渊', subtitle: '微积分需要严格的基础，ε-δ 语言将填补这一深渊。' },
      { title: '第二次数学危机', subtitle: '无穷小的逻辑基础不牢固，数学家们必须重新审视分析。' },
    ],
  },
  chapter3: {
    battle: [
      { title: '哥尼斯堡大学', subtitle: '康德的故乡，希尔伯特的起点，欧拉的七桥问题诞生于此。' },
      { title: '巴黎高等师范', subtitle: '伽罗瓦的战场，他在入学考试中被拉克鲁瓦和柯西拒绝。' },
      { title: '圣彼得堡科学院', subtitle: '切比雪夫和马尔可夫的领地，俄罗斯数学的摇篮。' },
      { title: '哥廷根大学', subtitle: '数学的麦加，高斯、黎曼、希尔伯特、诺特都曾在此。' },
      { title: '柏林大学', subtitle: '魏尔斯特拉斯和克罗内克争论数学基础的地方。' },
      { title: '剑桥大学', subtitle: '凯利和西尔维斯特在此创立不变量理论。' },
    ],
    event: [
      { title: '第五公设的挑战', subtitle: '平行公设能否证明？罗巴切夫斯基和鲍耶发现非欧几何。' },
      { title: '决斗前夜', subtitle: '伽罗瓦在决斗前夜写下数学遗书，年仅21岁。' },
      { title: '集合论的悖论', subtitle: '罗素发现：所有不包含自身的集合的集合，是否包含自身？' },
      { title: '抽象代数的黎明', subtitle: '诺特将代数从计算中解放，转向结构研究。' },
      { title: '椭圆函数革命', subtitle: '阿贝尔和雅可比挑战椭圆积分，发现双周期性。' },
      { title: '超穷数的发现', subtitle: '康托尔证明有些无穷比另一些无穷更大。' },
    ],
    rest: [
      { title: '哈勒精神病院', subtitle: '康托尔晚年的避难所，他在此继续思考无穷集合。' },
      { title: '挪威的森林', subtitle: '阿贝尔在此静修，证明五次方程无根式解。' },
      { title: '柯尼斯堡的桥', subtitle: '欧拉在此散步，解决七桥问题，创立图论。' },
      { title: '巴黎的拉雪兹神父公墓', subtitle: '伽罗瓦在此长眠，他的理论将在他死后发光。' },
    ],
    shop: [
      { title: '柏林数学沙龙', subtitle: '魏尔斯特拉斯在此讲授分析，严格化微积分。' },
      { title: '法国科学院', subtitle: '学术中心，柯西、泊松、傅里叶在此发表论文。' },
      { title: '数学期刊编辑部', subtitle: '克雷尔期刊发表阿贝尔的工作，拯救了他的遗产。' },
    ],
    boss: [
      { title: '连续统假设', subtitle: '康托尔的未解之谜：是否存在介于可数和不可数之间的无穷？' },
      { title: '第三次数学危机', subtitle: '集合论的悖论动摇数学基础，希尔伯特提出形式化计划。' },
    ],
  },
  chapter4: {
    battle: [
      { title: '维也纳学派', subtitle: '逻辑实证主义的中心，石里克和卡尔纳普在此讨论科学哲学。' },
      { title: '普林斯顿高等研究院', subtitle: '哥德尔的归宿，爱因斯坦的邻居，冯·诺依曼的战场。' },
      { title: '布莱切利园', subtitle: '图灵的战场，他在这里破解恩尼格玛密码机。' },
      { title: '剑桥大学国王学院', subtitle: '图灵的起点，维特根斯坦在此讲授数学哲学。' },
      { title: '麻省理工学院', subtitle: '香农创立信息论，维纳创立控制论。' },
      { title: '洛斯阿拉莫斯实验室', subtitle: '冯·诺依曼参与曼哈顿计划，设计计算机架构。' },
    ],
    event: [
      { title: '不完备定理的证明', subtitle: '哥德尔证明：任何足够强大的形式系统都存在无法证明的真命题。' },
      { title: '停机问题的不可判定', subtitle: '图灵证明：不存在通用算法能判断任意程序是否会停机。' },
      { title: '希尔伯特计划的终结', subtitle: '哥德尔粉碎了希尔伯特的形式化梦想，数学无法被完全公理化。' },
      { title: '自指悖论', subtitle: '这句话是假的。如果它是真的，那它就是假的。' },
      { title: '图灵测试', subtitle: '机器能否思考？图灵提出判断机器智能的标准。' },
      { title: 'λ演算的诞生', subtitle: '丘奇发明λ演算，与图灵机等价，奠定函数式编程基础。' },
    ],
    rest: [
      { title: '普林斯顿的散步道', subtitle: '哥德尔和爱因斯坦每日散步，讨论哲学和物理学。' },
      { title: '剑桥的苹果树', subtitle: '图灵在此思考，计算的本质是什么。' },
      { title: '逻辑花园', subtitle: '维特根斯坦的隐喻：语言是工具，数学是游戏。' },
      { title: '萨尔茨堡的湖畔', subtitle: '哥德尔在此思考连续统假设，最终证明其独立性。' },
    ],
    shop: [
      { title: '早期计算机实验室', subtitle: 'ENIAC和EDVAC的时代，程序存储概念的诞生。' },
      { title: '符号逻辑会议', subtitle: '1935年巴黎，逻辑学家们讨论数学基础的最新进展。' },
      { title: '算法交易所', subtitle: '程序即数据，代码可以操作自身。' },
    ],
    boss: [
      { title: '不完备之门', subtitle: '哥德尔的遗产：真理与可证明性之间的永恒鸿沟。' },
      { title: '可计算性的边界', subtitle: '图灵的极限：有些问题注定无法被算法解决。' },
    ],
  },
};

function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 从名称池中为每个节点获取一个独特的名称
function getNodeNames(chapterId: Chapter, nodeTypes: MapNodeType[]): Array<{ title: string; subtitle: string }> {
  const pools = chapterNodeNamePools[chapterId];
  const usedIndices: Record<MapNodeType, number[]> = {
    battle: [],
    event: [],
    rest: [],
    shop: [],
    boss: [],
  };

  return nodeTypes.map((type) => {
    const pool = pools[type];
    // 找到未使用的索引
    let availableIndices = pool.map((_, i) => i).filter(i => !usedIndices[type].includes(i));
    
    // 如果所有名称都用过了，重置
    if (availableIndices.length === 0) {
      usedIndices[type] = [];
      availableIndices = pool.map((_, i) => i);
    }

    // 随机选择一个未使用的名称
    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    usedIndices[type].push(randomIndex);

    return pool[randomIndex];
  });
}

export function generateChapterMap(chapterId: Chapter, _characterId: CharacterId): MapNode[] {
  const config = getChapterConfig(chapterId).mapConfig;
  const nodes: MapNodeType[] = [];

  // 1. 放置 Boss（最后一个）
  nodes.push('boss');

  // 2. 放置 Rest 和 Shop
  // 规则：不能太早（前2位），不能连续，Boss前一位不能是 Rest/Shop
  const specialNodes: MapNodeType[] = [];
  for (let i = 0; i < config.restSites; i++) specialNodes.push('rest');
  for (let i = 0; i < config.shops; i++) specialNodes.push('shop');

  // 找到可用的位置（索引2到totalNodes-2，避开Boss前一位）
  const availablePositions: number[] = [];
  for (let i = 2; i < config.totalNodes - 1; i++) {
    availablePositions.push(i);
  }

  // 随机选择位置放置 Rest/Shop，确保不连续
  const shuffledPositions = shuffleArray(availablePositions);
  let lastPlacedPosition = -2;

  for (const nodeType of specialNodes) {
    for (const pos of shuffledPositions) {
      if (Math.abs(pos - lastPlacedPosition) > 1 && !nodes[pos]) {
        nodes[pos] = nodeType;
        lastPlacedPosition = pos;
        break;
      }
    }
  }

  // 3. 放置 Event
  const eventCount = getRandomInt(config.minEvents, config.maxEvents);
  const eventPositions: number[] = [];

  // 找到剩余的空位
  for (let i = 1; i < config.totalNodes - 1; i++) {
    if (!nodes[i]) eventPositions.push(i);
  }

  // 随机选择位置放置 Event，避免连续
  const shuffledEventPositions = shuffleArray(eventPositions);
  let eventsPlaced = 0;
  let lastEventPosition = -2;

  for (const pos of shuffledEventPositions) {
    if (eventsPlaced >= eventCount) break;
    if (Math.abs(pos - lastEventPosition) > 1) {
      nodes[pos] = 'event';
      lastEventPosition = pos;
      eventsPlaced++;
    }
  }

  // 4. 剩余位置填充 Battle
  for (let i = 0; i < config.totalNodes; i++) {
    if (!nodes[i]) {
      nodes[i] = 'battle';
    }
  }

  // 5. 如果配置了第一位固定为 battle
  if (config.firstNodeFixed && config.firstNodeFixed === 'battle') {
    nodes[0] = 'battle';
  }

  // 6. 为每个节点获取独特的名称
  const nodeNames = getNodeNames(chapterId, nodes);

  // 7. 创建 MapNode 数组
  return nodes.map((type, index) => ({
    id: `${type}-${index + 1}`,
    type,
    title: nodeNames[index].title,
    subtitle: nodeNames[index].subtitle,
    completed: false,
  }));
}

// 保留旧函数以兼容现有代码
export function generateChapterOneMap(characterId: CharacterId): MapNode[] {
  return generateChapterMap('chapter1', characterId);
}
