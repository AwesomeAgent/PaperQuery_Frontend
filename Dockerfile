# 使用node镜像来构建应用
FROM node:16 AS build

# 设置工作目录
WORKDIR /app

# 复制项目的 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install --no-audit --prefer-offline --maxsockets=1

# 复制项目所有文件
COPY . .

# 运行打包命令，生成生产环境代码
RUN npm run build

# 使用nginx来服务静态文件
FROM nginx:stable-alpine

# 删除默认的nginx配置文件
# RUN rm -rf /usr/share/nginx/html/* || true

# 从build阶段复制打包好的文件到nginx的html目录
COPY --from=build /app/dist /usr/share/nginx/html

# 复制自定义的nginx配置文件（可选）
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80

# 启动nginx
CMD ["nginx", "-g", "daemon off;"]
