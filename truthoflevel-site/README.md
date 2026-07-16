# 洪荒之路宣传站

这是一个纯静态多页网站，可以直接本地预览，也可以部署到 GitHub Pages、Cloudflare Pages、Netlify、Vercel 静态目录等平台。

## 本地预览

```powershell
cd C:\Users\ASUS\Documents\mc\truthoflevel-site
python -m http.server 4173
```

然后打开：

```text
http://localhost:4173
```

## 替换下载链接

编辑 `config.js`：

```js
packDownloadUrl: "https://你的公网整合包下载地址.zip"
```

当前站点已经复制了一份 `downloads/truthoflevel-1.0.1.jar`，所以预览和部署后可以直接下载这个 mod jar。

注意：`D:\mod ai\test mod\build\libs\truthoflevel-1.0.1.jar` 是本机路径，部署上线后别人无法访问。要实现“一点就下载整个整合包”，需要先把完整整合包 zip 上传到公网文件托管位置，或者替换 `downloads` 目录里的文件。

推荐：

- Modrinth / CurseForge：最适合 Minecraft 玩家下载。
- GitHub Releases：适合发布版本文件，链接稳定。
- Cloudflare R2：适合大文件直链和自定义域名。
- 网盘直链：最快落地，但要确认链接不会过期。
