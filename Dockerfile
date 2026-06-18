FROM public.ecr.aws/lambda/nodejs:20 AS builder

WORKDIR /build

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY src/ ./src/
RUN npm run build && npm prune --production

FROM public.ecr.aws/lambda/nodejs:20

COPY --from=builder /build/dist/ ${LAMBDA_TASK_ROOT}/
COPY --from=builder /build/node_modules/ ${LAMBDA_TASK_ROOT}/node_modules/
COPY --from=builder /build/package.json ${LAMBDA_TASK_ROOT}/

CMD ["handler.handler"]
