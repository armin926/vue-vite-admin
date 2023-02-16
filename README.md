# Vue3 + Typescript + Vite

## 架构搭建

> **兼容性注意**
>
> Vite 需要 Node.js 版本 >= 12.0.0。然而，有些模板需要依赖更高的 Node 版本才能正常运行，当你的包管理器发出警告时，请注意升级你的 Node 版本。

### 使用 vite 快速初始化项目

[vite 使用文档](https://cn.vitejs.dev/guide/)

- 使用 yarn

```
yarn create vite my-vue-app
```

- 安装依赖

```
yarn install
```

- 启动项目

```
yarn dev
```

### 修改 vite 配置文件

先进行一些简单的配置，例如：设置 `@` 指向 `src` 目录，服务器启动端口、代理，打包路径等。

参考[vite 官网](https://cn.vitejs.dev/config/)配置项及用法

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
const root = process.cwd()
function pathResolve(dir: string): string {
  return resolve(root, '.', dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': pathResolve('src')
    }
  },
  server: {
    port: 9530,
    proxy: {
      // 设置代理，根据我们项目实际情况配置
      // 选项写法
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
```

### 规范目录结构

```
├─ public
├─ @types                           // 全局类型声明文件
├─ src
│  ├─ assets                        // 静态资源目录
│  ├─ components                    // 公共组件目录
│  ├─ router                        // 路由配置目录
│  ├─ store                         // 状态管理目录
│  ├─ styles                        // 通用 CSS 目录
│  ├─ utils                         // 工具函数目录
│  ├─ views                         // 页面组件目录
│  ├─ App.vue
│  ├─ env.d.ts
│  └─ main.ts
├─ tests                            // 单元测试目录
├─ index.html
├─ package.json
├─ tsconfig.json                    // TypeScript 配置文件
├─ vite.config.ts                   // Vite 配置文件
├─ README.md
└─ yarn.lock

```

### 路由配置（vue-router）

1、安装支持 vue3 的 vue-router@4

```
yarn add vue-router@next
```

2、创建 `src/router/index.ts`

```ts
import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'

const routes: AppRouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '首页'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes as RouteRecordRaw[]
})

const resetRouter = (): void => {
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export const setupRouter = (app: App<Element>) => {
  app.use(router)
}

export default router
```

3、创建 `router` 的全局类型声明文件 `@types/router.d.ts`

```ts
import type { RouteRecordRaw } from 'vue-router'
import { App, defineComponent } from 'vue'

export interface RouteMeta {
  hidden?: boolean
  alwaysShow?: boolean
  title?: string
  icon?: string
  noCache?: boolean
  breadcrumb?: boolean
  affix?: boolean
  noTagsView?: boolean
  activeMenu?: string
  roles?: string[]
}

// 在 vue-router 模块中添加接口 RouteMeta
declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    hidden?: boolean
    alwaysShow?: boolean
    title?: string
    icon?: string
    noCache?: boolean
    breadcrumb?: boolean
    affix?: boolean
    noTagsView?: boolean
    activeMenu?: string
    roles?: string[]
  }
}

// typeof 使用 https://www.typescriptlang.org/docs/handbook/2/typeof-types.html
type Component<T = any> =
  // 获取函数类型的返回类型 (https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype)
  ReturnType<typeof defineComponent> | (() => Promise<typeof import('*.vue')>) | (() => Promise<T>)

// 全局使用的接口
declare global {
  declare interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
    name: string
    meta: RouteMeta
    components?: Component | string
    children: AppRouteRecordRaw[]
    props?: Recordable
    fullPath: string
  }
}
```

4、在 `main.ts` 中挂载路由

```ts
import { createApp } from 'vue'
import App from './App.vue'

// 路由
import { setupRouter } from './router'

// 创建实例
const setupApp = async () => {
  const app = await createApp(App)

  // 创建路由
  setupRouter(app)

  // 挂载
  app.mount('#app')
}
setupApp()
```

### 集成状态管理工具 pinia

`vue3+ts` 推荐使用 [pinia](https://pinia.vuejs.org/getting-started.html) 替代 `vuex`

1、安装

```sh
yarn add pinia
 # or with npm
npm install pinia
```

2、使用 **pinia**

新建 `src/store/index.ts` 文件， `src/store/modules` 文件夹

> 内部代码见 `src/store/*`

3、在 `main.ts` 中创建 `store`

```ts
const setupApp = async () => {
  const app = await createApp(App)

  // 创建路由
  setupRouter(app)
  // store
  setupStore(app)

  // 挂载
  app.mount('#app')
}
```

### 集成 HTTP 工具 Axios

1、安装

```sh
yarn add axios
```

2、代码 `src/config/axios/*`

### 集成 CSS 预编译器 Sass

本项目使用 `CSS` 预编译器 `sass` ，直接安装为开发依赖即可。 `Vite` 内部已帮我们集成了相关的 `loader` ，不需要额外配置。

参考文档：

1、安装

```sh
yarn add sass -D
```

> 项目架构搭建已基本完成啦，下面是增加代码规范约束、提交规范约束、单元测试、自动部署等，让其更完善、更健壮。

## 代码规范

本项目使用 `EditorConfig + Prettier + ESLint`组合来实现代码规范化。

**这样做带来好处：**

- 解决团队之间代码不规范导致的可读性差和可维护性差的问题。
- 解决团队成员不同编辑器导致的编码规范不统一问题。
- 提前发现代码风格问题，给出对应规范提示，及时修复。
- 减少代码审查过程中反反复复的修改过程，节约时间。
- 自动格式化，统一编码风格，从此和脏乱差的代码说再见。

### 集成 EditorConfig 配置

[官网](https://editorconfig.org)

```
# https://editorconfig.org
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
insert_final_newline = false
trim_trailing_whitespace = false

```

注意：`VScode` 使用 `EditorConfig` 需要安装 `EditorConfig for VS Code` 插件

### Prettier 配置

> Prettier 是一款强大的代码格式化工具，支持 JavaScript、TypeScript、CSS、SCSS、Less、JSX、Angular、Vue、GraphQL、JSON、Markdown 等语言，基本上前端能用到的文件格式它都可以搞定，是当下最流行的代码格式化工具。

官网: [prettier.io/](https://prettier.io/)

1、安装

```sh
yarn add prettier -D
```

2、创建 `prettier.config.js` 文件

进行简单配置

```js
module.exports = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  vueIndentScriptAndStyle: false,
  singleQuote: true,
  quoteProps: 'as-needed',
  bracketSpacing: true,
  trailingComma: 'none',
  jsxSingleQuote: false,
  arrowParens: 'always',
  insertPragma: false,
  requirePragma: false,
  proseWrap: 'never',
  htmlWhitespaceSensitivity: 'strict',
  endOfLine: 'auto',
  rangeStart: 0
}
```

### ESLint 配置

[eslint](https://github.com/prettier/eslint-plugin-prettier)

1、安装 ESLint

```sh
yarn add eslint -D
```

2、配置 ESLint

```sh
npx eslint --init
```

依次选择

- √ How would you like to use ESLint? · `problems`
- √ What type of modules does your project use? · `esm`
- √ Which framework does your project use? · `vue`
- √ Does your project use TypeScript? · No / `Yes`
- √ Where does your code run? · `browser`
- √ What format do you want your config file to be in? · `JavaScript`
- √ Which package manager do you want to use? · `yarn`

3、ESLint 配置文件 `.eslintrc.js`

在上一步操作完成后，会在项目根目录下自动生成 .eslintrc.js 配置文件

根据需要可自行新增修改配置

```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
    'plugin:prettier/recommended' // 添加 prettier 插件
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'no-console': 'off',
    'no-undef': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/no-absolute-path': 'off',
    'import/no-extraneous-dependencies': 'off',
    'vue/no-multiple-template-root': 'off',
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state', 'config']
      }
    ]
  },
  settings: {}
}
```

### 解决 Prettier 和 ESLint 的冲突

通常大家会在项目中根据实际情况添加一些额外的 ESLint 和 Prettier 配置规则，难免会存在规则冲突情况。

本项目中的 ESLint 配置中使用了 Airbnb JavaScript 风格指南校验，其规则之一是代码结束后面要加分号，而我们在 Prettier 配置文件中加了代码结束后面不加分号的配置项，这样就有冲突了，会出现用 Prettier 格式化后的代码，ESLint 检测到格式有问题的，从而抛出错误提示。

解决两者冲突问题，需要用到 `eslint-plugin-prettier` 和 `eslint-config-prettier`。

- `eslint-plugin-prettier` 将 **Prettier** 的规则设置到 **ESLint** 的规则中。
- `eslint-config-prettier` 关闭 **ESLint** 和 **Prettier** 中会发生冲突的规则。

最后形成优先级：`Prettier 配置规则` > `ESLint 配置规则`。

这样，我们在执行 `eslint --fix` 命令时，**ESLint** 就会按照 **Prettier** 的配置规则来格式化代码，轻松解决二者冲突问题。

- 安装依赖

```sh
yarn add eslint-plugin-prettier eslint-config-prettier -D
```

- 在 `.eslintrc.js` 添加 `prettier` 插件

```js
module.exports = {
  ...
  extends: [
    'plugin:vue/essential',
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
    'plugin:prettier/recommended' // 添加 prettier 插件
  ],
  ...
```

### 项目下新建 .prettierignore

```sh
# 忽略格式化文件 (根据项目需要自行添加)
node_modules
dist
```

- 使用（`package.json` script 中添加命令）

```json
{
  "script": {
    "lint": "eslint src --fix --ext .ts,.tsx,.vue,.js,.jsx",
    "prettier": "prettier --write ."
  }
}
```

上面配置完成后,可以运行以下命令测试下代码检查个格式化效果:

```sh
# eslint 检查
yarn lint
# prettier 自动格式化
yarn prettier
```

### 集成 husky 和 lint-staged

> 我们在项目中已集成 **ESLint** 和 **Prettier** ，在编码时，这些工具可以对我们写的代码进行实时校验，在一定程度上能有效规范我们写的代码，但团队可能会有些人觉得这些条条框框的限制很麻烦，选择视“提示”而不见，依旧按自己的一套风格来写代码，或者干脆禁用掉这些工具，开发完成就直接把代码提交到了仓库，日积月累， **ESLint** 也就形同虚设。

所以，我们还需要做一些限制，让没通过 **ESLint** 检测和修复的代码禁止提交，从而保证仓库代码都是符合规范的。

为了解决这个问题，我们需要用到 **Git Hook**，在本地执行 `git commit` 的时候，就对所提交的代码进行 **ESLint** 检测和修复（即执行 `eslint --fix`），如果这些代码没通过 **ESLint** 规则校验，则禁止提交。

实现这一功能，我们借助 `husky + lint-staged` 。

> [husky](https://typicode.github.io/husky) —— Git Hook 工具，可以设置在 git 各个阶段（`pre-commit`、`commit-msg`、`pre-push` 等）触发我们的命令。
>
> [lint-staged](https://github.com/okonet/lint-staged) —— 在 git 暂存的文件上运行 linters。

> `husky&lint-staged` 安装推荐使用 `mrm`, 它将根据` package.json` 依赖项中的代码质量工具来安装和配置 `husky` 和 `lint-staged`，因此请确保在此之前安装并配置所有代码质量工具，如 `Prettier` 和 `ESlint`

#### 首先安装 mrm

```sh
npm i mrm -D --registry=https://registry.npm.taobao.org
```

#### 安装 lint-staged

```sh
npx mrm lint-staged
```

因为我们要结合 prettier 代码格式化,所有修改一下 `package.json` 配置:

```json
"husky": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
},
// 这行命令表示：只对 `git` 暂存区的 `js,jsx,vue,ts,tsx` 文件执行 `eslint --fix`。
"lint-staged": {
  "*.{js,jsx,vue,ts,tsx}": [
    "yarn lint",
    "prettier --write",
    "git add"
  ]
}
```

`lint-staged` 这个工具一般结合 `husky` 来使用，它可以让 `husky` 的 hook 触发的命令只作用于 `git add` 那些文件（即 git 暂存区的文件），而不会影响到其他文件。

至此，`husky` 和 `lint-staged` 组合配置完成。

现在我们提交代码时就会变成这样：

假如我们修改了 `src` 目录下的 `test-1.js`、`test-2.ts` 和 `test-3.md` 文件，然后 `git add ./src/`，最后 `git commit -m "test..."`，这时候就会只对 `test-1.js、test-2.ts` 这两个文件执行 `eslint --fix`。如果 ESLint 通过，成功提交，否则终止提交。从而保证了我们提交到 Git 仓库的代码都是规范的。

## 提交规范

前面我们已经统一代码规范，并且在提交代码时进行强约束来保证仓库代码质量。多人协作的项目中，在提交代码这个环节，也存在一种情况：不能保证每个人对提交信息的准确描述，因此会出现提交信息紊乱、风格不一致的情况。

如果 `git commit` 的描述信息精准，在后期维护和 `Bug` 处理时会变得有据可查，项目开发周期内还可以根据规范的提交信息快速生成开发日志，从而方便我们追踪项目和把控进度。这里，我们使用社区最流行、最知名、最受认可的 `Angular` 团队提交规范。

先看看 [Angular 项目的提交记录](https://github.com/angular/angular)

![Angular 项目的提交记录](docs/images/angular.jpg)

### commit message 格式规范

`commit message` 由 Header、Body、Footer 组成。

```
<Header>

<Body>

<Footer>
```

#### Header

`Header` 部分包括三个字段 `type`（必需）、`scope`（可选）和 `subject`（必需）

```
<type>(<scope>): <subject>
```

#### type

`type` 用于说明 `commit` 的提交类型（必须是以下几种之一）。

- `feat` 新功能(feature)
- `fix` 修补 bug
- `docs` 文档(documentation)
- `style` 格式、样式(不影响代码运行的变动)
- `refactor` 重构(即不是新增功能，也不是修改 BUG 的代码)
- `perf` 优化相关，比如提升性能、体验
- `test` 添加测试
- `build` 编译相关的修改，例如发布版本、对项目构建或者依赖的改动
- `ci` 持续集成修改
- `chore` 构建过程或辅助工具的变动
- `revert` 回滚到上一个版本
- 下边三个是我自定义的，可不要
- `workflow` 工作流改进
- `types` 类型修改
- `release` 版本发布

#### scope

`scope` 用于指定本次 `commit` 影响的范围。`scope` 依据项目而定，例如在业务项目中可以依据菜单或者功能模块划分，如果是组件库开发，则可以依据组件划分。（`scope` 可省略）

#### subject

`subject` 是本次 `commit` 的简洁描述，长度约定在 `50` 个字符以内，通常遵循以下几个规范：

- 用动词开头，第一人称现在时表述，例如：`change` 代替 `changed` 或 `changes`
- 第一个字母小写
- 结尾不加句号（.）

#### Body

`body` 是对本次 `commit` 的详细描述，可以分成多行。（`body` 可省略）

跟 `subject` 类似，用动词开头，`body` 应该说明修改的原因和更改前后的行为对比。

#### Footer

如果本次提交的代码是突破性的变更或关闭缺陷，则 Footer 必需，否则可以省略。

- 突破性的变更

当前代码与上一个版本有突破性改变，则 Footer 以 BREAKING CHANGE 开头，后面是对变动的描述、以及变动的理由。

- 关闭缺陷

如果当前提交是针对特定的 issue，那么可以在 Footer 部分填写需要关闭的单个 issue 或一系列 issues。

#### 参考例子

- feat

```
feat(browser): onUrlChange event (popstate/hashchange/polling)

Added new event to browser:
- forward popstate event if available
- forward hashchange event if popstate not available
- do polling when neither popstate nor hashchange available

Breaks $browser.onHashChange, which was removed (use onUrlChange instead)
```

- fix

```
fix(compile): couple of unit tests for IE9

Older IEs serialize html uppercased, but IE9 does not...
Would be better to expect case insensitive, unfortunately jasmine does
not allow to user regexps for throw expectations.

Closes #392
Breaks foo.bar api, foo.baz should be used instead
```

- style

```
style(location): add couple of missing semi colons
```

- core

```
chore(release): v3.4.2
```

**_规范 commit message 的好处：_**

- 首行就是简洁实用的关键信息，方便在 git history 中快速浏览。
- 具有更加详细的 body 和 footer，可以清晰的看出某次提交的目的和影响。
- 可以通过 type 过滤出想要查找的信息，也可以通过关键字快速查找相关提交。
- 可以直接从 commit 生成 change log。

### 集成 Commitizen 实现规范提交

上面介绍了 `Angular` 规范提交的格式，初次接触的同学咋一看可能会觉得复杂，其实不然，如果让大家在 `git commit` 的时候严格按照上面的格式来写，肯定是有压力的，首先得记住不同的类型到底是用来定义什么，subject 怎么写，body 怎么写，footer 要不要写等等问题，懒才是程序员第一生产力，为此我们使用 `Commitizen` 工具来帮助我们自动生成 `commit message` 格式，从而实现规范提交。

> `Commitizen` 是一个帮助撰写规范 `commit message` 的工具。它有一个命令行工具 cz-cli。

#### 安装 Commitizen

```sh
yarn add commitizen -D
```

#### 初始化项目

成功安装 `Commitizen` 后，我们用 `cz-conventional-changelog` 适配器来初始化项目：

```sh
npx commitizen init cz-conventional-changelog --save-dev --save-exact
```

然后在 `package.json` 中添加一 npm 脚本指向 `commtizen` 的本地版本:

```json
  ...
  "scripts": {
    "commit": "cz"
  }
```

#### 使用

用 `git add .` 将文件添加到暂存区后，执行 `yarn commit`

```sh
git add .
yarn commit
```

![git commit](docs/images/git-commit.jpg)

#### 自定义配置提交说明

从上面的截图可以看到，`git cz` 终端操作提示都是英文的，如果想改成中文的或者自定义这些配置选项，我们使用 **cz-customizable** 适配器。

运行如下命令使用 **cz-customizable** 初始化项目，注意之前已经初始化过一次，这次再初始化，需要加 `--force` 覆盖。

```sh
npx commitizen init cz-customizable --save-dev --save-exact --force
```

这行命令做了两件事：

- 安装 `cz-customizable` 到开发依赖（devDependencies）

```json
"devDependencies": {
  ...
  "cz-customizable": "^6.3.0",
  ...
}
```

- 修改 `package.json` 中的 `config.commitizen` 字段为：

```json
"config": {
  "commitizen": {
    "path": "./node_modules/cz-customizable"
  }
}
```

#### 使用 cz-customizable

在项目根目录下创建 `.cz-config.js` 文件，然后按照官方提供的[示例](https://github.com/leoforfree/cz-customizable/blob/master/cz-config-EXAMPLE.js)来配置。

在本项目中我们修改成中文：

```js
module.exports = {
  // type 类型（定义之后，可通过上下键选择）
  types: [
    {
      value: 'feat',
      name: 'feat:     新增功能'
    },
    {
      value: 'fix',
      name: 'fix:      修复 bug'
    },
    {
      value: 'docs',
      name: 'docs:     文档变更'
    },
    {
      value: 'style',
      name: 'style:    代码格式（不影响功能，例如空格、分号等格式修正）'
    },
    {
      value: 'refactor',
      name: 'refactor:    代码重构（不包括 bug 修复、功能新增）'
    },
    {
      value: 'perf',
      name: 'perf:     性能优化'
    },
    {
      value: 'test',
      name: 'test:     添加、修改测试用例'
    },
    {
      value: 'build',
      name: 'build:    构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）'
    },
    {
      value: 'ci',
      name: 'ci:       修改 CI 配置、脚本'
    },
    {
      value: 'chore',
      name: 'chore:    对构建过程或辅助工具和库的更改（不影响源文件、测试用例）'
    },
    {
      value: 'revert',
      name: 'revert:   回滚 commit'
    },
    {
      value: 'workflow',
      name: 'workflow:   工作流改进'
    },
    {
      value: 'types',
      name: 'types:  类型修改'
    },
    {
      value: 'release',
      name: 'release:   版本发布'
    }
  ],

  // scope 类型（定义之后，可通过上下键选择）
  scopes: [
    ['components', '组件相关'],
    ['hooks', 'hook 相关'],
    ['utils', 'utils 相关'],
    ['element-plus', '对 element-plus 的调整'],
    ['styles', '样式相关'],
    ['deps', '项目依赖'],
    ['auth', '对 auth 修改'],
    ['other', '其他修改'],
    // 如果选择 custom，后面会让你再输入一个自定义的 scope。也可以不设置此项，把后面的 allowCustomScopes 设置为 true
    ['custom', '以上都不是？我要自定义']
  ].map(([value, description]) => {
    return {
      value,
      name: `${value.padEnd(30)} (${description})`
    }
  }),

  // 是否允许自定义填写 scope，在 scope 选择的时候，会有 empty 和 custom 可以选择。
  // allowCustomScopes: true,

  // allowTicketNumber: false,
  // isTicketNumberRequired: false,
  // ticketNumberPrefix: 'TICKET-',
  // ticketNumberRegExp: '\\d{1,5}',

  // 针对每一个 type 去定义对应的 scopes，例如 fix
  /*
  scopeOverrides: {
    fix: [
      { name: 'merge' },
      { name: 'style' },
      { name: 'e2eTest' },
      { name: 'unitTest' }
    ]
  },
  */

  // 交互提示信息
  messages: {
    type: '确保本次提交遵循 Angular 规范！\n选择你要提交的类型：',
    scope: '\n选择一个 scope（可选）：',
    // 选择 scope: custom 时会出下面的提示
    customScope: '请输入自定义的 scope：',
    subject: '填写简短精炼的变更描述：\n',
    body: '填写更加详细的变更描述（可选）。使用 "|" 换行：\n',
    breaking: '列举非兼容性重大的变更（可选）：\n',
    footer: '列举出所有变更的 ISSUES CLOSED（可选）。 例如: #31, #34：\n',
    confirmCommit: '确认提交？'
  },

  // 设置只有 type 选择了 feat 或 fix，才询问 breaking message
  allowBreakingChanges: ['feat', 'fix'],

  // 跳过要询问的步骤
  skipQuestions: ['body', 'footer'],

  subjectLimit: 100, // subject 限制长度
  breaklineChar: '|' // 换行符，支持 body 和 footer
  // footerPrefix : 'ISSUES CLOSED:'
  // askForBreakingChangeFirst : true,
}
```

建议大家结合项目实际情况来自定义配置提交规则，例如很多时候我们不需要写长描述，公司内部的代码仓库也不需要管理 issue，那么可以把询问 body 和 footer 的步骤跳过（在 `.cz-config.js` 中修改成 `skipQuestions: ['body', 'footer']`）。

### 集成 commitlint 验证提交规范

在“代码规范”章节，我们已经讲到过，尽管制定了规范，但在多人协作的项目中，总有些人依旧我行我素，因此提交代码这个环节，我们也增加一个限制：**_只让符合 Angular 规范的 commit message 通过_**，我们借助 `@commitlint/config-conventional` 和 `@commitlint/cli` 来实现。

#### 安装 commitlint

```sh
yarn add @commitlint/config-conventional @commitlint/cli -D
```

#### 配置 commitlint

- 在项目根目录下创建 `commitlint.config.js 文件`，并填入以下内容：

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'init', // 初始化
        'feat', // 新功能(feature)
        'fix', // 修补bug
        'docs', // 文档(documentation)
        'style', // 格式、样式(不影响代码运行的变动)
        'refactor', // 重构(即不是新增功能，也不是修改BUG的代码)
        'perf', // 优化相关，比如提升性能、体验
        'test', // 添加测试
        'build', // 编译相关的修改，对项目构建或者依赖的改动
        'ci', // 持续集成修改
        'chore', // 构建过程或辅助工具的变动
        'revert', // 回滚到上一个版本
        'workflow', // 工作流改进
        'types', // 类型修改
        'release' // 版本发布
      ]
    ]
  }
}
```

- 使用 husky 的 `commit-msg` hook 触发验证提交信息的命令

我们使用 husky 命令在 `.husky` 目录下创建 `commit-msg` 文件，并在此执行 `commit message` 的验证命令。

```sh
npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
# or
npx husky add .husky/commit-msg "yarn commitlint --edit $1"

# .husky/commit-msg (v7)
# ...
npx --no-install commitlint --edit $1
# or
yarn commitlint --edit $1
```

#### commitlint 验证

试一试用错误的提交方式

#### 如何关闭

在`.husky/commit-msg`内注释以下代码即可

```sh
# npx --no-install commitlint --edit "$1"
```

#### 提交示例

```sh
git commit -m 'feat(home): add home page'
```

#### (Yarn on Windows) 的兼容性处理

根据[官方说法](https://typicode.github.io/husky/#/?id=yarn-on-windows)，

> 当 Git Bash 在 Windows 上使用 Yarn 时，Git 钩子可能会失败(stdin 不是 tty)。如果您有 Windows 用户，强烈建议添加以下解决方案。

1、Create `.husky/common.sh`:

```sh
command_exists () {
  command -v "$1" >/dev/null 2>&1
}

# Workaround for Windows 10, Git Bash and Yarn
if command_exists winpty && test -t 1; then
  exec < /dev/tty
fi
```

- 在使用 Yarn 运行命令的地方获取它:

```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"
. "$(dirname "$0")/common.sh"

# Format and submit code according to lintstagedrc.js configuration
yarn lint:lint-staged
yarn ts:check
yarn lint:pretty
```

## 推荐小工具

### 集成 @vueuse/core

[官方文档](https://vueuse.org/guide/index.html)

[使用介绍](https://juejin.cn/post/6974331681213775885)

- 安装

```sh
# npm
npm i @vueuse/core
# yarn
yarn add @vueuse/core
```

## 常见问题

### 简单的使用 --latest 代表将安装包更新到最新版本

[同步更新 `package.json`](https://yarn.bootcss.com/docs/cli/upgrade-interactive)

```sh
yarn upgrade-interactive --latest
```

### 有时候项目在运行中安装依赖会报错

需要关闭项目再安装

```sh
error An unexpected error occurred: "EPERM: operation not permitted, unlink 'G:\\vue3-vite-admin\\node_modules\\esbuild\\esbuild.exe'"
```

作者：ichson

- 项目地址：https://gitee.com/my_enlish_john/vue3-vite-admin
- 参考项目 1：https://github.com/PanJiaChen/vue-element-admin
- 参考项目 2：https://github.com/kailong321200875/vue-element-plus-admin
- 参考链接：https://juejin.cn/post/6951649464637636622
