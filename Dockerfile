# nextjs 도커를 위한 명령어
# 빌드를 위한 nodejs 설치 (v22)
FROM node:22-alpine3.21 AS build
WORKDIR /app

# npm install ~~~~~
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

# 3000번 포트로 실행 (리액트는 스스로 실행X -> nginx)
EXPOSE 3000
CMD ["npm", "run", "start"]
