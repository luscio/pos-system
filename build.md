windows下需要编译工具
```bash
npm i -g windows-build-tools
```

### 前端
```bash
cd client
npm install --registry=https://registry.npm.taobao.org
npm run build:electron
```

### 后端
```bash
cd server
npm install --registry=https://registry.npm.taobao.org
npm run initdb
npm run build
```

### Electron
```bash
npm install --registry=https://registry.npm.taobao.org
npm run postinstall
npm run build
```
