import type { PowerId, PowerState } from '../../types/game';

interface PowerDisplayProps {
  powers: PowerState[];
}

const powerNameMap: Record<PowerId, string> = {
  'triangle-stability': '三角形稳定性',
  'heptadecagon': '正十七边形',
  'fifth-postulate': '第五公设',
  'irrational-guard': '无理数直觉',
  'bell-curve': '正态分布',
  'overall-planning': '统筹法',
  'derivative': '导数运算',
  'aleph-null': '阿列夫零',
  'incompleteness': '不完备定理',
  'harmony-of-spheres': '天体和谐',
  'infinite-series': '无穷级数',
  'lagrange-point': '拉格朗日点',
  'stored-program': '存储程序',
  'abstract-algebra': '抽象代数',
  'lever-charge': '杠杆蓄力',
  'line-axiom-draw': '线段公理抽牌',
  'leibniz-zero-cost': '莱布尼茨零费',
  'calculus-variations-active': '变分法激活',
  'no-skill-this-turn': '本回合无技能',
};

const powerDescriptionMap: Record<PowerId, string> = {
  'triangle-stability': '回合开始时，若手牌数为3的倍数，获得6点逻辑防御',
  'heptadecagon': '每保留1点能量，下回合获得2点力量',
  'fifth-postulate': '回合结束时保留逻辑防御',
  'irrational-guard': '可抵御无理数风暴',
  'bell-curve': '随机伤害取最大值',
  'overall-planning': '每保留1点能量，下回合获得2点防御',
  'derivative': '根据上回合使用牌数获得力量',
  'aleph-null': '可数无穷的力量',
  'incompleteness': '系统不完备但为真',
  'harmony-of-spheres': '天体运行的和谐',
  'infinite-series': '无穷级数的收敛',
  'lagrange-point': '引力平衡点',
  'stored-program': '程序存储概念',
  'abstract-algebra': '代数结构的抽象',
  'lever-charge': '杠杆蓄力中',
  'line-axiom-draw': '使用线段公理后抽牌',
  'leibniz-zero-cost': '下一张牌零费',
  'calculus-variations-active': '变分法效果激活',
  'no-skill-this-turn': '本回合不能使用技能',
};

export function PowerDisplay({ powers }: PowerDisplayProps) {
  if (powers.length === 0) return null;

  return (
    <div className="power-display">
      <h4 className="power-title">能力状态</h4>
      <div className="power-list">
        {powers.map((power) => (
          <div key={power.id} className="power-item" title={powerDescriptionMap[power.id]}>
            <span className="power-name">{powerNameMap[power.id] || power.id}</span>
            {power.stacks > 1 && <span className="power-stacks">×{power.stacks}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
