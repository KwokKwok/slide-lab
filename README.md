> [!NOTE]
> 如不满足需求，请优先考虑浏览器本身功能，如开发者工具、缩放等，也可以将代码 clone 到本地，使用 Cursor 等工具继续开发。

## SlideLab

一个 PPT 工具，可以调整完成后截图放到 PPT 中。

<p align="left"><a target="_blank" rel="noreferrer noopener" href="https://slide-lab.kwok.ink"><img alt="在线使用" src="https://img.shields.io/badge/在线使用-141e24.svg?&style=for-the-badge&logo=safari&logoColor=white"></a>
<a target="_blank" rel="noreferrer noopener" href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FKwokKwok%2Fslide-lab"><img alt="部署到 Vercel" src="https://img.shields.io/badge/部署到 Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"></a></p>

### 已完成

- [x] 象限编辑器

### 开发环境

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看页面

### Docker 运行

构建容器镜像：

```shell
docker build -t slide-tab .
```

如果不想自己构建，也可以直接下载构建好的容器：

```shell
docker pull ghcr.io/growdu/slide-tab/slide-tab:v0.1
docker tag ghcr.io/growdu/slide-tab/slide-tab:v0.1 slide-tab
```

启动容器：

```shell
docker run -d -p 3000:3000 slide-tab
```

以 docker-compose 启动容器，`docker-compose.yaml` 配置文件如下：

```yaml
version: "3.8"
services:
  nginx:
    image: slide-tab:latest
    restart: unless-stopped
    ports:
      - 3001:3000
networks: {}
```

执行如下命令：

```shell
docker-compose up -d
```
