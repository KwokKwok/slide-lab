'use client'
// 默认的标签数据 - 确保所有标签默认都是显示状态
const defaultLabels = [
  {
    name: '功能研发',
    category: 'first',
    type: 'label',
    active: true
  },
  {
    name: '左键点我',
    category: 'second',
    type: 'label',
    active: true
  },
  {
    name: '右键点我',
    category: 'third',
    type: 'label',
    active: true
  }
];

// localStorage key
const STORAGE_KEY = 'ppt_priority_projects';

// 默认的类别颜色
const defaultCategoryColors = {
  first: '#2d3efa',
  second: '#58849c',
  third: '#16af7f',
};

// 添加新的存储键
const QUADRANTS_KEY = 'ppt_quadrants';

// 默认象限配置
const defaultQuadrants = {
  topLeft: {
    name: '优化需求',
    titleColor: 'rgba(94, 234, 212, 0.4)', // text-teal-300
    backgroundColor: 'rgba(204, 251, 241, 0.4)', // bg-teal-100/40
  },
  topRight: {
    name: '核心功能',
    titleColor: 'rgba(147, 197, 253, 0.4)', // text-blue-500/40
    backgroundColor: 'rgba(191, 219, 254, 0.2)', // bg-blue-300/20
  },
  bottomLeft: {
    name: '鼠标悬浮',
    titleColor: 'rgba(103, 232, 249, 0.4)', // text-cyan-300
    backgroundColor: 'rgba(207, 250, 254, 0.4)', // bg-cyan-100/40
  },
  bottomRight: {
    name: '可以调整',
    titleColor: 'rgba(230, 230, 250, 0.8)', // text-lavender-200/80
    backgroundColor: 'rgba(230, 230, 250, 0.4)', // bg-lavender-100/40
  },
};

// 添加默认的文字颜色配置
const defaultCategoryTextColors = {
  first: '#ffffff',
  second: '#ffffff',
  third: '#ffffff',
};

// 保存项目到localStorage
export const saveProjects = (projects) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
};

// 从localStorage加载项目
export const loadProjects = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [
    { id: 1, name: '拖动移位', category: 'first', x: '30%', y: '45%', phase: { text: 'Q1' } },
    { id: 2, name: '双击编辑', category: 'second', x: '70%', y: '55%', phase: { text: 'Q1' } },
    { id: 3, name: '右键删除', category: 'third', x: '50%', y: '65%' },
  ];
};

// 生成新项目
export const createProject = (name, category) => ({
  id: Date.now(),
  name,
  category,
  x: '50%',
  y: '50%',
  phase: null,
});

// 获取默认标签
export const getDefaultLabels = () => defaultLabels;

// 更新标签
export const updateLabel = (index, newLabel) => {
  defaultLabels[index] = { ...defaultLabels[index], ...newLabel };
  // 可以选择是否要持久化标签的更改
  localStorage.setItem('ppt_priority_labels', JSON.stringify(defaultLabels));
};

// 随机生成一个颜色
const getRandomColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

// 添加新标签
export const addLabel = (label) => {
  // 随机生成一个颜色
  updateCategoryColor(label.category, getRandomColor());
  defaultLabels.push({ ...label, active: true });
  localStorage.setItem('ppt_priority_labels', JSON.stringify(defaultLabels));
};

// 删除标签
export const deleteLabel = (index) => {
  defaultLabels.splice(index, 1);
  localStorage.setItem('ppt_priority_labels', JSON.stringify(defaultLabels));
};

// 初始化时加载保存的标签
export const initLabels = () => {
  const savedLabels = localStorage.getItem('ppt_priority_labels');
  if (savedLabels) {
    const labels = JSON.parse(savedLabels);
    defaultLabels.splice(0, defaultLabels.length, ...labels);
  }
};

// 获取类别颜色
export const getCategoryColors = () => {
  const saved = localStorage.getItem('ppt_priority_colors');
  return saved ? JSON.parse(saved) : defaultCategoryColors;
};

// 更新类别颜色
export const updateCategoryColor = (category, color) => {
  const colors = getCategoryColors();
  colors[category] = color;
  localStorage.setItem('ppt_priority_colors', JSON.stringify(colors));
};

// 更新标签激活状态
export const updateLabelActive = (index, active) => {
  defaultLabels[index] = { ...defaultLabels[index], active };
  localStorage.setItem('ppt_priority_labels', JSON.stringify(defaultLabels));
};

// 获取象限配置
export const getQuadrants = () => {
  const stored = localStorage.getItem(QUADRANTS_KEY);
  return stored ? JSON.parse(stored) : defaultQuadrants;
};

// 更新象限配置
export const updateQuadrant = (position, updates) => {
  const quadrants = getQuadrants();
  quadrants[position] = { ...quadrants[position], ...updates };
  localStorage.setItem(QUADRANTS_KEY, JSON.stringify(quadrants));
  return quadrants;
};

// 获取类别文字颜色
export const getCategoryTextColors = () => {
  const saved = localStorage.getItem('ppt_priority_text_colors');
  return saved ? JSON.parse(saved) : defaultCategoryTextColors;
};

// 更新类别文字颜色
export const updateCategoryTextColor = (category, color) => {
  const colors = getCategoryTextColors();
  colors[category] = color;
  localStorage.setItem('ppt_priority_text_colors', JSON.stringify(colors));
};