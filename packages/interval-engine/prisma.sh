#! /bin/bash

npx prisma generate --schema=./src/prisma/schema.prisma

npx prisma migrate dev --name init --schema=./src/prisma/schema.prisma