import React from 'react';
import { Search, Moon, Sun, Menu, Monitor, Settings, GripVertical, Save, X } from 'lucide-react';
import { ExternalSearchSource, SearchMode } from '../types';

interface MainHeaderProps {
  navTitleText: string;
  siteCardStyle: 'detailed' | 'simple';
  themeMode: 'light' | 'dark' | 'system';
  darkMode: boolean;
  isMobileSearchOpen: boolean;
  searchMode: SearchMode;
  searchQuery: string;
  externalSearchSources: ExternalSearchSource[];
  hoveredSearchSource: ExternalSearchSource | null;
  selectedSearchSource: ExternalSearchSource | null;
  showSearchSourcePopup: boolean;
  canSortPinned: boolean;
  canSortCategory: boolean;
  isSortingPinned: boolean;
  isSortingCategory: boolean;
  onOpenSidebar: () => void;
  onToggleTheme: () => void;
  onViewModeChange: (mode: 'simple' | 'detailed') => void;
  onSearchModeChange: (mode: SearchMode) => void;
  onOpenSearchConfig: () => void;
  onSearchQueryChange: (value: string) => void;
  onExternalSearch: () => void;
  onSearchSourceSelect: (source: ExternalSearchSource) => void;
  onHoverSearchSource: (source: ExternalSearchSource | null) => void;
  onIconHoverChange: (value: boolean) => void;
  onPopupHoverChange: (value: boolean) => void;
  onToggleMobileSearch: () => void;
  onToggleSearchSourcePopup: () => void;
  onStartPinnedSorting: () => void;
  onStartCategorySorting: () => void;
  onSavePinnedSorting: () => void;
  onCancelPinnedSorting: () => void;
  onSaveCategorySorting: () => void;
  onCancelCategorySorting: () => void;
  onAddLink: () => void;
  onOpenSettings: () => void;
}

const MainHeader: React.FC<MainHeaderProps> = ({
  navTitleText,
  siteCardStyle,
  themeMode,
  darkMode,
  isMobileSearchOpen,
  searchMode,
  searchQuery,
  externalSearchSources,
  hoveredSearchSource,
  selectedSearchSource,
  showSearchSourcePopup,
  canSortPinned,
  canSortCategory,
  isSortingPinned,
  isSortingCategory,
  onOpenSidebar,
  onToggleTheme,
  onViewModeChange,
  onSearchModeChange,
  onOpenSearchConfig,
  onSearchQueryChange,
  onExternalSearch,
  onSearchSourceSelect,
  onHoverSearchSource,
  onIconHoverChange,
  onPopupHoverChange,
  onToggleMobileSearch,
  onToggleSearchSourcePopup,
  onStartPinnedSorting,
  onStartCategorySorting,
  onSavePinnedSorting,
  onCancelPinnedSorting,
  onSaveCategorySorting,
  onCancelCategorySorting,
  onAddLink,
  onOpenSettings
}) => {
  const showSortControls = canSortPinned || canSortCategory || isSortingPinned || isSortingCategory;
  const sortLabel = canSortPinned ? '排序置顶' : '排序分类';

  const searchBar = (
    <div className="relative w-full">
      {searchMode === 'external' && showSearchSourcePopup && (
        <div
          className="absolute left-0 top-full mt-2 w-full bg-white/90 dark:bg-slate-900/80 rounded-xl shadow-lg border border-slate-200/70 dark:border-white/10 p-3 z-50 backdrop-blur"
          onMouseEnter={() => onPopupHoverChange(true)}
          onMouseLeave={() => onPopupHoverChange(false)}
        >
          <div className="grid grid-cols-5 sm:grid-cols-5 gap-2">
            {externalSearchSources
              .filter((source) => source.enabled)
              .map((source, index) => (
                <button
                  key={index}
                  onClick={() => onSearchSourceSelect(source)}
                  onMouseEnter={() => onHoverSearchSource(source)}
                  onMouseLeave={() => onHoverSearchSource(null)}
                  className="px-2 py-2 text-sm rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 flex items-center gap-1 justify-center"
                >
                  <img
                    src={`https://www.faviconextractor.com/favicon/${new URL(source.url).hostname}?larger=true`}
                    alt={source.name}
                    className="w-4 h-4"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXNlYXJjaCI+PHBhdGggZD0ibTIxIDIxLTQuMzQtNC4zNCI+PC9wYXRoPjxjaXJjbGUgY3g9IjExIiBjeT0iMTEiIHI9IjgiPjwvY2lyY2xlPjwvc3ZnPg==';
                    }}
                  />
                  <span className="truncate hidden sm:inline">{source.name}</span>
                </button>
              ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-100/80 dark:bg-slate-700/50 px-2 py-1.5 backdrop-blur">
        <div className="flex items-center gap-3 px-3 border-r border-slate-300 dark:border-white/10 mr-2">
          <button
            onClick={() => onSearchModeChange('internal')}
            className={`text-sm font-bold transition-all pb-0.5 ${searchMode === 'internal'
                ? 'text-slate-900 dark:text-white border-b-2 border-emerald-500'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            title="站内搜索"
          >
            站内
          </button>
          <button
            onClick={() => onSearchModeChange('external')}
            className={`text-sm font-bold transition-all pb-0.5 ${searchMode === 'external'
                ? 'text-slate-900 dark:text-white border-b-2 border-emerald-500'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            title="站外搜索"
          >
            站外
          </button>
        </div>

        <div className="relative flex-1">
          <button
            type="button"
            className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-300"
            onMouseEnter={() => searchMode === 'external' && onIconHoverChange(true)}
            onMouseLeave={() => onIconHoverChange(false)}
            onClick={() => {
              if (searchMode === 'external') {
                onToggleSearchSourcePopup();
              }
            }}
            title={searchMode === 'external' ? '选择搜索源' : '站内搜索'}
          >
            {searchMode === 'internal' ? (
              <Search size={16} />
            ) : (hoveredSearchSource || selectedSearchSource) ? (
              <img
                src={`https://www.faviconextractor.com/favicon/${new URL((hoveredSearchSource || selectedSearchSource).url).hostname}?larger=true`}
                alt={(hoveredSearchSource || selectedSearchSource).name}
                className="w-4 h-4"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXNlYXJjaCI+PHBhdGggZD0ibTIxIDIxLTQuMzQtNC4zNCI+PC9wYXRoPjxjaXJjbGUgY3g9IjExIiBjeT0iMTEiIHI9IjgiPjwvY2lyY2xlPjwvc3ZnPg==';
                }}
              />
            ) : (
              <Search size={16} />
            )}
          </button>

          <input
            type="text"
            placeholder={
              searchMode === 'internal'
                ? '搜索站内内容...'
                : selectedSearchSource
                  ? `在${selectedSearchSource.name}搜索内容`
                  : '搜索站外内容...'
            }
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchMode === 'external') {
                onExternalSearch();
              }
            }}
            className="w-full pl-8 pr-9 py-2 bg-transparent text-sm text-slate-800 dark:text-white placeholder-slate-400 outline-none"
            style={{ fontSize: '16px' }}
            inputMode="search"
            enterKeyHint="search"
          />
        </div>

        {searchMode === 'external' && (
          <button
            onClick={onOpenSearchConfig}
            className="p-2 text-slate-500 hover:text-accent hover:bg-white/70 dark:hover:bg-slate-900/70 rounded-md transition-colors"
            title="管理搜索源"
          >
            <Settings size={14} />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/60 dark:border-white/10 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur">
      <div className="h-14 px-4 lg:px-10 flex items-center gap-3">
        <div className="flex items-center gap-2">
          <button onClick={onOpenSidebar} className="lg:hidden p-2 -ml-2 text-slate-600 dark:text-slate-300">
            <Menu size={20} />
          </button>
        </div>

        <div className="flex-1 hidden md:flex justify-center">
          <div className="w-full max-w-2xl">
            {searchBar}
          </div>
        </div>

        <div className="ml-auto flex items-center gap-4">
          <button
            onClick={onToggleMobileSearch}
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100/70 dark:hover:bg-slate-900/60"
            title="搜索"
          >
            <Search size={18} />
          </button>

          <div className="hidden sm:flex items-center gap-1 bg-slate-100/70 dark:bg-slate-900/60 rounded-lg p-1">
            <button
              onClick={() => onViewModeChange('simple')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${siteCardStyle === 'simple'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              title="简约版视图"
            >
              简约
            </button>
            <button
              onClick={() => onViewModeChange('detailed')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${siteCardStyle === 'detailed'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              title="详情版视图"
            >
              详情
            </button>
          </div>

          {showSortControls && (
            isSortingPinned || isSortingCategory ? (
              <div className="flex items-center gap-1">
                <button
                  onClick={isSortingPinned ? onSavePinnedSorting : onSaveCategorySorting}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md bg-emerald-500/20 text-emerald-200 hover:bg-emerald-500/30"
                  title="保存顺序"
                >
                  <Save size={12} /> 保存
                </button>
                <button
                  onClick={isSortingPinned ? onCancelPinnedSorting : onCancelCategorySorting}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md bg-slate-600/30 text-slate-200 hover:bg-slate-600/50"
                  title="取消排序"
                >
                  <X size={12} /> 取消
                </button>
              </div>
            ) : (
              <button
                onClick={canSortPinned ? onStartPinnedSorting : onStartCategorySorting}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md border border-slate-200/50 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-accent hover:border-accent/60 transition-colors"
                title={sortLabel}
              >
                <GripVertical size={12} /> 排序
              </button>
            )
          )}

          <button
            onClick={onToggleTheme}
            title={themeMode === 'system' ? '主题: 跟随系统' : darkMode ? '主题: 暗色' : '主题: 亮色'}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100/70 dark:hover:bg-slate-900/60"
          >
            {themeMode === 'system' ? <Monitor size={18} /> : darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={onAddLink}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md border border-emerald-400/50 text-emerald-200 hover:bg-emerald-500/20 transition-colors"
            title="添加链接"
          >
            + 添加
          </button>

          <button
            onClick={onOpenSettings}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-accent hover:bg-slate-100/70 dark:hover:bg-slate-900/60"
            title="设置"
          >
            <Settings size={18} />
          </button>
        </div>
      </div>

      {isMobileSearchOpen && (
        <div className="md:hidden px-4 pb-4">
          {searchBar}
        </div>
      )}
    </header>
  );
};

export default MainHeader;
