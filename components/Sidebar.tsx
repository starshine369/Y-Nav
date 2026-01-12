import React from 'react';
import { Upload, Settings, CloudCog, GitFork, ChevronLeft, ChevronRight } from 'lucide-react';
import { Category } from '../types';
import Icon from './Icon';

interface SidebarProps {
  sidebarOpen: boolean;
  sidebarWidthClass: string;
  isSidebarCollapsed: boolean;
  navTitleText: string;
  navTitleShort: string;
  selectedCategory: string;
  categories: Category[];
  repoUrl: string;
  onSelectAll: () => void;
  onSelectCategory: (category: Category) => void;
  onToggleCollapsed: () => void;
  onOpenCategoryManager: () => void;
  onOpenImport: () => void;
  onOpenBackup: () => void;
  onOpenSettings: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  sidebarWidthClass,
  isSidebarCollapsed,
  navTitleText,
  navTitleShort,
  selectedCategory,
  categories,
  repoUrl,
  onSelectAll,
  onSelectCategory,
  onToggleCollapsed,
  onOpenCategoryManager,
  onOpenImport,
  onOpenBackup,
  onOpenSettings
}) => {
  return (
    <aside
      className={`
        fixed lg:static inset-y-0 left-0 z-30 ${sidebarWidthClass} transform transition-all duration-300 ease-in-out
        bg-white/80 dark:bg-slate-950/70 border-r border-slate-200/60 dark:border-white/10 backdrop-blur flex flex-col
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}
    >
      <div className={`h-14 flex items-center border-b border-slate-100/80 dark:border-white/10 shrink-0 relative ${isSidebarCollapsed ? 'justify-center px-2' : 'px-4'}`}>
        <div className={`flex items-center ${isSidebarCollapsed ? '' : 'gap-2'}`}>
          {isSidebarCollapsed ? (
            <div className="h-7 w-7 rounded-lg bg-slate-100/70 dark:bg-slate-800/70 border border-slate-200/70 dark:border-white/10 flex items-center justify-center text-xs font-mono text-slate-500 dark:text-slate-300">
              Y
            </div>
          ) : (
            <div className="flex items-center font-mono font-bold text-xl cursor-pointer select-none group px-2" title={navTitleText}>
              <span className="text-blue-500 dark:text-blue-400 mr-2">~/</span>
              <span className="text-slate-700 dark:text-slate-200 tracking-tight">Y-Nav</span>
              <span className="w-2.5 h-5 bg-emerald-500 ml-1 animate-pulse"></span>
            </div>
          )}
        </div>
        <button
          onClick={onToggleCollapsed}
          className="hidden lg:inline-flex absolute right-2 p-1.5 text-slate-400 hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
          title={isSidebarCollapsed ? '展开侧边栏' : '收起侧边栏'}
          aria-label={isSidebarCollapsed ? '展开侧边栏' : '收起侧边栏'}
        >
          {isSidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <div className={`flex-1 overflow-y-auto space-y-1 scrollbar-hide ${isSidebarCollapsed ? 'px-2 py-4' : 'p-4'}`}>
        <button
          onClick={onSelectAll}
          title="置顶网站"
          className={`relative rounded-xl transition-all ${isSidebarCollapsed ? 'w-full flex items-center justify-center px-2 py-3' : 'w-full flex items-center gap-3 px-4 py-3'} ${selectedCategory === 'all'
            ? 'bg-gradient-to-r from-blue-500/20 to-transparent border-l-4 border-blue-500 text-blue-400 font-bold'
            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50/70 dark:hover:bg-white/5'
            }`}
        >
          {!isSidebarCollapsed && selectedCategory === 'all' && (
            <span className="hidden"></span>
          )}
          <div className={`${isSidebarCollapsed ? 'p-2.5 rounded-xl' : 'p-1'} ${selectedCategory === 'all' ? 'text-blue-400' : 'bg-slate-100 dark:bg-slate-800'} flex items-center justify-center`}>
            <Icon name="LayoutGrid" size={18} />
          </div>
          {!isSidebarCollapsed && <span>置顶网站</span>}
        </button>

        <div className={`flex items-center pt-4 pb-2 ${isSidebarCollapsed ? 'justify-center px-2' : 'justify-between px-4'}`}>
          {!isSidebarCollapsed && (
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              分类目录
            </span>
          )}
          <button
            onClick={onOpenCategoryManager}
            className="p-1 text-slate-400 hover:text-accent hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
            title="管理分类"
          >
            <Settings size={14} />
          </button>
        </div>

        {categories.map((cat) => {
          const categoryBaseClasses = isSidebarCollapsed
            ? 'w-full flex items-center justify-center gap-0 px-2.5 py-2.5'
            : 'w-full flex items-center gap-3 px-4 py-2.5';
          const selectedClasses = selectedCategory === cat.id
            ? 'bg-slate-100/60 dark:bg-white/5 text-slate-900 dark:text-slate-100 font-medium'
            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50/70 dark:hover:bg-white/5';
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat)}
              title={isSidebarCollapsed ? cat.name : undefined}
              className={`relative rounded-xl transition-all group ${categoryBaseClasses} ${selectedClasses}`}
            >
              {!isSidebarCollapsed && selectedCategory === cat.id && (
                <span className="absolute left-2 top-1/2 -translate-y-1/2 h-6 w-1 rounded-full bg-accent"></span>
              )}
              <div className={`${isSidebarCollapsed ? 'p-2.5 rounded-xl' : 'p-1.5 rounded-lg'} transition-colors flex items-center justify-center ${selectedCategory === cat.id ? 'bg-accent/15 text-accent' : 'bg-slate-100 dark:bg-slate-800'}`}>
                <Icon name={cat.icon} size={16} />
              </div>
              {!isSidebarCollapsed && (
                <span className="truncate flex-1 text-left">{cat.name}</span>
              )}
            </button>
          );
        })}
      </div>

      {!isSidebarCollapsed && (
        <div className="p-4 border-t border-slate-200/60 dark:border-white/10 bg-white/60 dark:bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={onOpenImport}
              className="p-2 rounded-lg border border-slate-200/70 dark:border-white/10 text-slate-500 hover:text-accent hover:border-accent/60 transition-colors"
              title="导入书签"
            >
              <Upload size={14} />
            </button>
            <button
              onClick={onOpenBackup}
              className="p-2 rounded-lg border border-slate-200/70 dark:border-white/10 text-slate-500 hover:text-accent hover:border-accent/60 transition-colors"
              title="备份与恢复"
            >
              <CloudCog size={14} />
            </button>
            <button
              onClick={onOpenSettings}
              className="p-2 rounded-lg border border-slate-200/70 dark:border-white/10 text-slate-500 hover:text-accent hover:border-accent/60 transition-colors"
              title="AI 设置"
            >
              <Settings size={14} />
            </button>
          </div>


        </div>
      )}
    </aside>
  );
};

export default Sidebar;
