# Journal 移动窗口功能实现计划（基于 Virtua 虚拟列表）

## 需求分析

- 使用 `virtua` 虚拟列表显示所有 journal 项目
- 通过点击 journal item 自动滑动到合适位置
- 让被点击的 journal 始终保持在中间位置（位置 4，从 0 开始计算）
- 实现流畅的自动滑动效果，用户无需手动滚动

## 核心概念设计

### 1. 数据结构

```typescript
interface JournalListState {
  allJournals: Journal[]; // 所有 journal 数据
  currentSlug: string; // 当前选中的 journal slug
  visibleRange: { start: number; end: number }; // 当前可见范围
  targetIndex: number; // 目标滚动位置
}
```

### 2. 自动滑动逻辑

```typescript
// 核心算法：点击时自动滚动到合适位置
const handleJournalClick = (clickedJournal: Journal) => {
  const clickedIndex = allJournals.findIndex(
    (j) => j.slug === clickedJournal.slug
  );

  // 计算目标滚动位置，让点击项在中间（位置 4）
  const targetScrollIndex = Math.max(0, clickedIndex - 4);

  // 使用 virtua 的 scrollToIndex 方法自动滚动
  virtualListRef.current?.scrollToIndex(targetScrollIndex);
};
```

## 实现步骤

### 第一步：安装和配置 Virtua

```bash
pnpm add @virtua/react
```

### 第二步：数据获取策略

1. **一次性获取所有数据**：使用 `limit: -1` 获取所有 journal
2. **缓存策略**：使用 TanStack Query 缓存数据
3. **简化逻辑**：无需分页和窗口管理

```typescript
const { data: allJournals, isLoading } = useQuery({
  queryKey: [...queryKeys.journals.all],
  queryFn: () => journalService.getJournals({ limit: -1 }),
});
```

### 第三步：虚拟列表实现

```typescript
import { Virtualizer } from "@virtua/react";

const JournalList = ({ slug, lng }) => {
  const virtualListRef = useRef<VirtualizerHandle>(null);

  return (
    <Virtualizer
      ref={virtualListRef}
      count={allJournals.length}
      itemSize={64} // 每个 journal item 的固定高度
      overscan={5} // 预渲染额外的项目
    >
      {(index) => (
        <JournalItem
          key={allJournals[index].id}
          journal={allJournals[index]}
          isActive={slug === allJournals[index].slug}
          onClick={() => handleJournalClick(allJournals[index])}
        />
      )}
    </Virtualizer>
  );
};
```

### 第四步：点击处理和自动滚动

```typescript
const handleJournalClick = useCallback(
  (clickedJournal: Journal) => {
    const clickedIndex = allJournals.findIndex(
      (j) => j.slug === clickedJournal.slug
    );

    if (clickedIndex === -1) return;

    // 计算目标滚动位置，让点击项在中间（位置 4）
    const targetScrollIndex = Math.max(0, clickedIndex - 4);

    // 平滑滚动到目标位置
    virtualListRef.current?.scrollToIndex(targetScrollIndex, {
      align: "start",
      smooth: true,
    });
  },
  [allJournals]
);
```

### 第五步：初始化定位

```typescript
// 当组件挂载时，自动滚动到当前选中的 journal
useEffect(() => {
  if (allJournals.length > 0 && slug) {
    const currentIndex = allJournals.findIndex((j) => j.slug === slug);
    if (currentIndex !== -1) {
      // 让当前 journal 在中间位置显示
      const targetScrollIndex = Math.max(0, currentIndex - 4);
      virtualListRef.current?.scrollToIndex(targetScrollIndex);
    }
  }
}, [allJournals, slug]);
```

## 技术实现细节

### 1. Virtua 配置

```typescript
const JOURNAL_ITEM_HEIGHT = 64; // 固定高度
const VISIBLE_ITEMS = 10; // 可见项目数
const OVERSCAN = 5; // 预渲染数量

<Virtualizer
  ref={virtualListRef}
  count={allJournals.length}
  itemSize={JOURNAL_ITEM_HEIGHT}
  overscan={OVERSCAN}
  scrollRef={scrollElementRef} // 自定义滚动容器
>
```

### 2. 样式配置

```typescript
const containerStyle = {
  height: `${JOURNAL_ITEM_HEIGHT * VISIBLE_ITEMS}px`, // 固定容器高度
  width: "100%",
  overflowY: "auto" as const,
};
```

### 3. 性能优化

```typescript
// 使用 React.memo 优化 journal item 渲染
const JournalItem = React.memo(({ journal, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "h-16 px-4 py-2 cursor-pointer transition-colors duration-200",
        isActive && "bg-accent"
      )}
    >
      <h3 className="text-sm leading-relaxed truncate">{journal.title}</h3>
    </div>
  );
});
```

### 4. 边界条件处理

```typescript
const calculateTargetIndex = (clickedIndex: number, totalCount: number) => {
  // 确保目标位置不超出边界
  const targetIndex = Math.max(0, clickedIndex - 4);
  const maxStartIndex = Math.max(0, totalCount - VISIBLE_ITEMS);

  return Math.min(targetIndex, maxStartIndex);
};
```

## 完整组件结构

```typescript
interface JournalListProps {
  lng: string;
  slug: string;
  className?: string;
}

const JournalList: React.FC<JournalListProps> = ({ lng, slug, className }) => {
  const virtualListRef = useRef<VirtualizerHandle>(null);

  // 获取所有 journal 数据
  const { data: allJournals = [], isLoading } = useQuery({
    queryKey: [...queryKeys.journals.all],
    queryFn: () => journalService.getJournals({ limit: -1 }),
  });

  // 点击处理
  const handleJournalClick = useCallback(
    (clickedJournal: Journal) => {
      const clickedIndex = allJournals.findIndex(
        (j) => j.slug === clickedJournal.slug
      );
      if (clickedIndex === -1) return;

      const targetScrollIndex = calculateTargetIndex(
        clickedIndex,
        allJournals.length
      );
      virtualListRef.current?.scrollToIndex(targetScrollIndex, {
        align: "start",
        smooth: true,
      });
    },
    [allJournals]
  );

  // 初始化定位
  useEffect(() => {
    if (allJournals.length > 0 && slug) {
      const currentIndex = allJournals.findIndex((j) => j.slug === slug);
      if (currentIndex !== -1) {
        const targetScrollIndex = calculateTargetIndex(
          currentIndex,
          allJournals.length
        );
        virtualListRef.current?.scrollToIndex(targetScrollIndex);
      }
    }
  }, [allJournals, slug]);

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <div className={cn("w-full", className)} style={containerStyle}>
      <Virtualizer
        ref={virtualListRef}
        count={allJournals.length}
        itemSize={JOURNAL_ITEM_HEIGHT}
        overscan={OVERSCAN}
      >
        {(index) => (
          <JournalItem
            key={allJournals[index].id}
            journal={allJournals[index]}
            isActive={slug === allJournals[index].slug}
            onClick={() => handleJournalClick(allJournals[index])}
            lng={lng}
          />
        )}
      </Virtualizer>
    </div>
  );
};
```

## 测试用例

### 1. 基本功能测试

- [ ] 初始加载显示所有 journal 数据
- [ ] 点击任意 journal 自动滚动到合适位置
- [ ] 当前选中的 journal 高亮显示
- [ ] 初始化时自动定位到当前 journal

### 2. 滚动测试

- [ ] 点击靠前的 journal 正确滚动
- [ ] 点击靠后的 journal 正确滚动
- [ ] 边界条件下的滚动行为正确

### 3. 性能测试

- [ ] 大量 journal 时的渲染性能
- [ ] 滚动流畅度
- [ ] 内存使用情况

## 实现优先级

1. **P0**: 基本虚拟列表实现和数据获取
2. **P1**: 点击滚动功能和初始化定位
3. **P2**: 样式优化和用户体验
4. **P3**: 性能优化和边界处理

## 优势

- **简化架构**：无需复杂的窗口管理逻辑
- **更好的性能**：virtua 提供高性能的虚拟滚动
- **流畅体验**：自动滚动比手动滚动更直观
- **易于维护**：代码结构清晰，逻辑简单

## 依赖

- `@virtua/react`: 虚拟滚动组件
- `@tanstack/react-query`: 数据获取和缓存
- `react`: 基础 React hooks
