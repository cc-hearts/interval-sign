# use Command

```shell

scp -r src root@8.210.91.28:/tmp/interval/engine

docker run -p 3301:5782 -v /tmp/interval/engine/src:/usr/interval/src --name=interval-engine aa842dbfa9fa
```
