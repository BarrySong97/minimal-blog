# 多语言使用指南 (i18n Guide)

本项目使用 i18next 和 react-i18next 实现多语言支持，支持中英日韩四种语言。

## 项目架构概览

### 支持的语言
- **English (en)** - 英语
- **中文 (zh)** - 中文简体
- **日本語 (ja)** - 日语
- **한국어 (ko)** - 韩语

### 技术栈
- **i18next** - 核心国际化框架
- **react-i18next** - React 集成
- **i18next-resources-to-backend** - 动态资源加载
- **i18next-browser-languagedetector** - 浏览器语言检测
- **accept-language** - 服务端语言检测

### 目录结构
```
app/(app)/i18n/
├── locales/           # 翻译文件
│   ├── en/
│   │   └── common.json
│   ├── zh/
│   │   └── common.json
│   ├── ja/
│   │   └── common.json
│   └── ko/
│       └── common.json
├── settings.ts        # 基础配置
├── index.ts          # 服务端 i18n 实例
└── client.ts         # 客户端 i18n 实例
```

## 配置文件说明

### 1. 基础设置 (`settings.ts`)
```typescript
export const fallbackLng = "en";
export const languages = [fallbackLng, "zh", "ja", "ko"];
export const defaultNS = "common";
export const cookieName = "i18next";
```

### 2. 中间件配置 (`middleware.ts`)
- 自动语言检测和重定向
- 路由级别的语言切换
- Cookie 语言偏好记录
- 特定路径的语言排除

### 3. 路由结构
```
/en/blogs/slug     # 英语博客
/zh/blogs/slug     # 中文博客
/ja/blogs/slug     # 日语博客
/ko/blogs/slug     # 韩语博客
```

## 翻译文件结构

### 翻译文件示例 (`locales/en/common.json`)
```json
{
  "title": "My Blog",
  "nav": {
    "home": "Home",
    "about": "About",
    "blog": "Blog",
    "journal": "Journal",
    "photos": "Photos",
    "projects": "Projects"
  },
  "common": {
    "readMore": "Read More",
    "loading": "Loading...",
    "error": "An error occurred"
  },
  "blog": {
    "readingTime": "min read",
    "count": "posts"
  }
}
```

### 命名约定
- 使用嵌套对象组织翻译键
- 按功能模块分组 (nav, common, blog, etc.)
- 使用驼峰命名法
- 保持键名在所有语言文件中一致

## 使用方法

### 1. 服务端组件
```typescript
import { useTranslation } from "@/app/(app)/i18n";

export default async function ServerComponent({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;
  const { t } = await useTranslation(lng);
  
  return (
    <div>
      <h1>{t('common.title')}</h1>
      <p>{t('common.nav.home')}</p>
    </div>
  );
}
```

### 2. 客户端组件
```typescript
"use client";
import { useTranslation } from "@/app/(app)/i18n/client";

interface ClientComponentProps {
  lng: string;
}

export function ClientComponent({ lng }: ClientComponentProps) {
  const { t } = useTranslation(lng);
  
  return (
    <div>
      <h1>{t('common.title')}</h1>
      <button>{t('common.nav.home')}</button>
    </div>
  );
}
```

### 3. 翻译键使用规范
- 服务端：`t('common.nav.home')` - 需要加上 `common.` 前缀
- 客户端：`t('common.nav.home')` - 需要加上 `common.` 前缀

## 实际使用示例

### 导航栏多语言 (`components/layout/Navbar.tsx`)
```typescript
const navItems: NavItem[] = [
  {
    key: "home",
    translationKey: "common.nav.home",
    href: (lng) => `/${lng}`,
  },
  {
    key: "blog",
    translationKey: "common.nav.blog", 
    href: (lng) => `/${lng}/blogs`,
  },
  // ...
];

// 使用方式
{navItems.map((item) => (
  <Link key={item.key} href={item.href(lng)}>
    {t(item.translationKey)}
  </Link>
))}
```

### 博客阅读时间 (`components/journal/JournalContent.tsx`)
```typescript
{journal?.readingTime && (
  <span className="text-sm">
    {journal?.readingTime} {t("common.blog.readingTime")}
  </span>
)}
```

### 抽屉标题 (`components/journal/JournalMobileDrawer.tsx`)
```typescript
<DrawerTitle>{t('common.nav.journal')}</DrawerTitle>
```

## 最佳实践

### 1. 组件集成
- 服务端组件通过 `params` 获取语言参数
- 客户端组件通过 `props` 接收语言参数
- 保持语言参数的传递链路完整

### 2. 路由处理
- 使用中间件自动处理语言重定向
- 支持语言检测优先级：路径 > Cookie > 浏览器语言
- 特定路径可排除语言处理

### 3. 性能优化
- 服务端为每个请求创建新的 i18n 实例
- 客户端使用单例模式
- 翻译资源按需加载

### 4. 开发规范
- 新增翻译键时，确保在所有语言文件中都有对应内容
- 保持翻译文件结构的一致性
- 使用有意义的键名，避免过度嵌套

## 添加新语言

1. 在 `settings.ts` 中添加语言代码
2. 在 `locales/` 目录下创建对应语言文件夹
3. 复制现有语言文件并翻译内容
4. 更新中间件配置（如需要）

## 常见问题

### Q: 客户端组件翻译不生效？
A: 检查是否正确导入 `@/app/(app)/i18n/client` 而非 `@/app/(app)/i18n`

### Q: 服务端组件无法获取翻译？
A: 确保使用 `await useTranslation(lng)` 并且 `lng` 参数正确传递

### Q: 新增翻译键后页面显示键名？
A: 检查所有语言文件中是否都包含该键，并确保键名拼写正确

### Q: 语言切换后页面未更新？
A: 客户端组件需要重新渲染，检查语言参数是否正确传递给组件