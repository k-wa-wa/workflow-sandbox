FROM public.ecr.aws/lambda/nodejs:20 AS builder

WORKDIR /build

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY src/ ./src/
RUN npm run build

FROM public.ecr.aws/lambda/nodejs:20

COPY --from=builder /build/dist/ ${LAMBDA_TASK_ROOT}/

CMD ["handler.handler"]
