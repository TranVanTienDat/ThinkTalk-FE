# 🚀 ThinkTalk Agents & Project Overview

## 🔍 Project Overview

ThinkTalk is a real-time chat application built to provide a seamless conversational experience and a breakthrough development workflow through the integration of AI Agents.

## 🛠 Core Tech Stack

The system utilizes the latest technologies to ensure performance and scalability:

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: @Joy/mui
- **UI Libraries**: @Joy UI/mui
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching**: [TanStack Query v5](https://tanstack.com/query/latest) & [Axios](https://axios-http.com/)
- **Real-time**: [Socket.io](https://socket.io/)
- **Form & Validation**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

## 🤖 AI Agent & Workflows (Operating System)

This project is not just an application, but a development environment powered by AI. Agents are configured to perform complex tasks via Slash Commands:

### 🎯 Primary Workflows

- `/figma-review`: Deep analysis of Figma designs, automatically generating architectural blueprints and component code.
- `/get-figma-info`: Quickly extract node information, colors, and attributes from Figma designs.
- `/ui-ux-pro-max`: Premium workflow for planning and implementing "Pixel Perfect" interfaces with over 50 different styles.
- `/fix-lint-errors`: Automatically scan and fix linter/formatting issues to ensure code quality.

### 🏗 Skills Library (.agent/skills)

The system possesses over 200 specialized skills, categorized into major groups:

1. **Frontend Mastery**: `react-patterns`, `nextjs-best-practices`, `tailwind-patterns`.
2. **Design-to-Code**: `figma-analysis`, `figma-to-code`, `design-orchestration`.
3. **Security & Audit**: `security-review`, `production-code-audit`, `vulnerability-scanner`.
4. **Architecture**: `senior-architect`, `database-design`, `systematic-debugging`.

## 📁 Directory Structure (Architecture)

- `app/`: Application routing and pages.
- `components/`: Shared UI components (Atoms, Molecules, Organisms).
- `apiRequest/`: Centralized hub for API calls and React Query hooks.
- `stores/`: Zustand stores for managing global state (Auth, Chat, UI).
- `figma-agent/`: Contains extracted design data (Typography, Colors, Icons).
- `hooks/`: Custom React hooks for reusable logic.
- `lib/`: Configuration for third-party libraries (Prisma, Axios config, utils).

## 🚀 Development Guide

1. **Installation**: `yarn install`
2. **Run Dev Server**: `yarn dev`
3. **Linting**: `yarn lint`

---

_Created and maintained by Antigravity AI Agent._
