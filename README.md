> **Node 版本需要大于 14.14.0**
# pang-Cli

生成项目模版用

## 使用

### 全局安装

```
npm install -g pang-cli
```
命令

```
pang init <template-type> <project-name>
# eg: pang init egg auth
```

### 局部安装

```
npm install pang-cli
```
命令
```
npx pang init <template-type> <project-name>
# eg: npx pang init egg auth
```

## 参数说明

| 参数          | 说明                     |
| ------------- | ------------------------ |
| template-type | 模版类型，目前支持 egg，react |
| project-name  | 项目名称                 |

## 特点
- egg 支持 typescript，支持使用 docker 进行打包镜像
- react 支持 typescript，支持使用 vite 进行开发打包


