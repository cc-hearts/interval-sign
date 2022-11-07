# interval-engine

## Usage

1. Create `app.yaml` file and add `mysql` and `redis` configuration

```shell
touch app.yaml
```

> app.yaml

```yaml
mysql:
  host: localhost
  user: root
  password: '123456'
  database: inter

# redis 配置
redis:
  port: 6379
  host: localhost
  db: 2
  password: 123456
```

- Install project dependencies

```shell
npm install

npm start # run
```
