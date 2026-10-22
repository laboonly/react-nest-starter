# React + NestJS Starter

一个用于学习和扩展的 React + NestJS 全栈基础脚手架。

## 技术栈

- Web: React, TypeScript, Vite
- API: NestJS, TypeScript
- Validation: Zod + 自定义 `ZodValidationPipe`
- Database: Prisma + MySQL
- Local database: Docker Compose

## 开始使用

需要 Node.js 20+、pnpm 和 Docker。

```bash
pnpm install
cp apps/api/.env.example apps/api/.env
pnpm db:up
pnpm prisma:generate
pnpm dev
```

- Web: http://localhost:5173
- API health check: http://localhost:3000/api/health

Prisma 在首次数据库查询时建立连接。健康检查仅检查 API 是否运行，
不代表数据库连接成功；还没有业务模型时，可以不启动 MySQL。

## 常用命令

```bash
pnpm dev
pnpm build
pnpm typecheck
pnpm db:up
pnpm db:down
```

## Zod 参数校验示例

API 中的 `POST /api/echo` 展示了 Zod 的接入方式：

```bash
curl -X POST http://localhost:3000/api/echo \
  -H 'Content-Type: application/json' \
  -d '{"message":"hello"}'
```

新增接口时，可以为请求体定义一个 Zod schema，然后通过
`@Body(new ZodValidationPipe(schema))` 校验和转换输入。
