'use client';

import React, { useState, useEffect } from 'react';
import { DraggableDialog } from './DraggableDialog';
import { Icon } from '@iconify/react';
import {
  Collapse,
  Select,
  ColorPicker,
  Input,
  Checkbox,
  Button,
  Space,
  Upload,
  message,
  Modal,
  Popconfirm,
} from 'antd';

// 添加坐标轴位置选项常量
const AXIS_POSITIONS = {
  centered: {
    label: '居中',
    value: true,
  },
  corner: {
    label: '左下角',
    value: false,
  },
};

// 在组件顶部添加导入导出功能
const exportSettings = () => {
  const settings = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    settings[key] = localStorage.getItem(key);
  }

  // 创建并下载文件
  const blob = new Blob([JSON.stringify(settings, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `quadrant-settings-${
    new Date().toISOString().split('T')[0]
  }.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const importSettings = async file => {
  try {
    const text = await file.text();
    const settings = JSON.parse(text);

    // 先清空现有数据
    localStorage.clear();

    // 恢复所有设置
    Object.entries(settings).forEach(([key, value]) => {
      if (value) {
        localStorage.setItem(key, value);
      }
    });

    // 刷新页面以应用新设置
    window.location.reload();
  } catch (error) {
    alert('导入失败：' + error.message);
  }
};

const QuadrantSettings = ({ open, onClose, initialSettings, onSave }) => {
  const [settings, setSettings] = useState(initialSettings);

  useEffect(() => {
    if (open) {
      setSettings(initialSettings);
    }
  }, [open, initialSettings]);

  const handleSave = () => {
    onSave(settings);
    onClose();
  };

  return (
    <DraggableDialog title="设置" onClose={onClose}>
      <div className="w-[400px] space-y-6">
        <Collapse
          defaultActiveKey={['1']}
          items={[
            {
              key: '1',
              label: '基础布局设置',
              children: (
                <Space direction="vertical" className="w-full">
                  {/* 象限布局设置 */}
                  <div>
                    <div className="mb-2 text-sm font-medium text-gray-700">
                      坐标轴位置
                    </div>
                    <Select
                      className="w-full"
                      value={
                        settings.isQuadrantCentered ? 'centered' : 'corner'
                      }
                      onChange={value =>
                        setSettings(prev => ({
                          ...prev,
                          isQuadrantCentered: AXIS_POSITIONS[value].value,
                        }))
                      }
                      options={Object.entries(AXIS_POSITIONS).map(
                        ([key, { label }]) => ({
                          value: key,
                          label: label,
                        })
                      )}
                    />
                  </div>

                  {/* 虚线颜色设置 */}
                  <div
                    className={settings.isQuadrantCentered ? 'opacity-50' : ''}
                  >
                    <div className="mb-2 text-sm font-medium text-gray-700">
                      象限分割虚线颜色
                    </div>
                    <ColorPicker
                      disabled={settings.isQuadrantCentered}
                      value={settings.dashedLineColor}
                      onChange={color =>
                        setSettings(prev => ({
                          ...prev,
                          dashedLineColor: color.toHexString(),
                        }))
                      }
                      showText
                    />
                  </div>
                </Space>
              ),
            },
            {
              key: '2',
              label: '坐标轴设置',
              children: (
                <Space direction="vertical" className="w-full">
                  {/* 坐标轴文本设置 */}
                  <div>
                    <div className="mb-2 text-sm font-medium text-gray-700">
                      坐标轴文本
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(settings.axisLabels).map(
                        ([key, value]) => (
                          <div key={key}>
                            <div className="text-xs text-gray-500 mb-1">
                              {key === 'verticalStart'
                                ? '纵轴起点'
                                : key === 'verticalEnd'
                                ? '纵轴终点'
                                : key === 'horizontalStart'
                                ? '横轴起点'
                                : '横轴终点'}
                            </div>
                            <Input
                              value={value}
                              onChange={e =>
                                setSettings(prev => ({
                                  ...prev,
                                  axisLabels: {
                                    ...prev.axisLabels,
                                    [key]: e.target.value,
                                  },
                                }))
                              }
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* 坐标轴颜色设置 */}
                  <div>
                    <div className="mb-2 text-sm font-medium text-gray-700">
                      坐标轴颜色
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(settings.axisColors).map(
                        ([key, value]) => (
                          <div key={key}>
                            <div className="text-xs text-gray-500 mb-1">
                              {key === 'start' ? '起点颜色' : '终点颜色'}
                            </div>
                            <ColorPicker
                              value={value}
                              onChange={color =>
                                setSettings(prev => ({
                                  ...prev,
                                  axisColors: {
                                    ...prev.axisColors,
                                    [key]: color.toHexString(),
                                  },
                                }))
                              }
                              showText
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* 颜色应用到文本设置 */}
                  <Checkbox
                    checked={settings.applyAxisColorToText}
                    onChange={e =>
                      setSettings(prev => ({
                        ...prev,
                        applyAxisColorToText: e.target.checked,
                      }))
                    }
                  >
                    将坐标轴颜色应用到文本
                  </Checkbox>
                </Space>
              ),
            },
            {
              key: '3',
              label: '数据管理',
              children: (
                <Space className="w-full">
                  <Popconfirm
                    title="确认清除数据"
                    description="确定要清除所有数据吗？此操作不可恢复。"
                    onConfirm={() => {
                      localStorage.clear();
                      window.location.reload();
                    }}
                    okText="确定"
                    cancelText="取消"
                  >
                    <Button
                      danger
                      className="flex-1"
                      icon={
                        <Icon
                          icon="solar:trash-bin-trash-linear"
                          className="w-4 h-4"
                        />
                      }
                    >
                      清除数据
                    </Button>
                  </Popconfirm>
                  <Button
                    type="primary"
                    className="flex-1"
                    icon={
                      <Icon icon="solar:upload-linear" className="w-4 h-4" />
                    }
                    onClick={exportSettings}
                  >
                    导出数据
                  </Button>
                  <Upload
                    accept=".json"
                    showUploadList={false}
                    beforeUpload={file => {
                      Modal.confirm({
                        title: '确认导入数据',
                        content: '导入将覆盖现有数据，是否继续？',
                        onOk: () => {
                          importSettings(file);
                        },
                      });
                      return false;
                    }}
                  >
                    <Button
                      type="primary"
                      className="flex-1"
                      icon={
                        <Icon
                          icon="solar:download-linear"
                          className="w-4 h-4"
                        />
                      }
                    >
                      导入数据
                    </Button>
                  </Upload>
                </Space>
              ),
            },
          ]}
        />

        {/* 修改底部布局 */}
        <div className="space-y-4">
          {/* 操作按钮 */}
          <div className="flex justify-end gap-2">
            <Button onClick={onClose}>取消</Button>
            <Button type="primary" onClick={handleSave}>
              确定
            </Button>
          </div>

          {/* 分割线 */}
          <div className="border-t border-gray-100" />

          {/* 底部信息 */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="italic inline-flex items-center gap-1">
              made on earth, with
              <a
                href="https://www.cursor.com"
                target="_blank"
                className="inline-flex items-center gap-[2px] hover:text-gray-800 transition-colors group"
                title="Cursor"
              >
                Cursor
              </a>
              <span className="mx-1">·</span>
              <a
                href="https://github.com/KwokKwok/slide-lab/blob/main/LICENSE"
                target="_blank"
                className="hover:text-gray-800 transition-colors"
              >
                MIT License
              </a>
            </span>
            <a
              href="https://github.com/KwokKwok/slide-lab"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-gray-800 transition-colors"
              title="View source"
            >
              <Icon icon="mdi:github" className="w-5 h-5" />
              <span>View Source</span>
            </a>
          </div>
        </div>
      </div>
    </DraggableDialog>
  );
};

export default QuadrantSettings;
