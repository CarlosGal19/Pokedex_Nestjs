<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Execute on development

1. Clone repository

2. Execute
```
  pnpm i
```

3. Install Nest CLI
```
  pnpm i -g @nest/cli
```
4. Generate database
```
  docker-compose up -d
```
5. Clone __.env.example__ file and rename it as __.env__

6. Fill the defined environment variables in __.env__ file

7. Run the application
```
  pnpm run start:dev
```
8. Populate DB visiting
```
  http://localhost:3000/api/v1/seed
```
## STACK
<p align="left">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=ts,nodejs,pnpm,nest,mongodb,docker&perline=12" alt="IT SKILLS" />
  </a>
</p>

## Docker deployment
1. Create __.env__ file
2. Fill __.env__ file with environment variables
3. Create image
```
  docker-compose -f docker-compose.dev.yaml --env-file .env up --build -d
```
