### 1. 创建项目
` npm init next-app react-next-movie`


### 2. 安装 chakra-ui 框架 及 主题
- `yarn add  @chakra-ui/core`
- `yarn add  @chakra-ui/react`
- `yarn add  @chakra-ui/theme`
- `yarn add  @chakra-ui/react`
- 手动安装 `@chakra-ui/react`的依赖包 `yarn add @emotion/react @emotion/styled`
- 手动安装  `@emotion/react` 的依赖 `yarn add framer-motion`

### 3. 克隆主题
- 没有克隆主题: 使用依赖包的形式 `import theme from "@chakra-ui/theme"`


### 4. 配置主题
- 在 `pages` 文件夹下建立` _app.js `加入如下代码
```js
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import theme from "@chakra-ui/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
export default MyApp;
```

### 5. 安装 字体图标
- `yarn add react-icons`


### 6. 安装 @babel/core
- `yarn add @babel/core`

### 7. 安装 emotion 预置
- `@emotion/babel-preset-css-prop`

### 8. 添加 babel 配置
- 在根目录下创建 .babelrc 文件并添加如下代码
```json
{
    "presets":  ["next/babel","@emotion/babel-preset-css-prop"]
}
```

  