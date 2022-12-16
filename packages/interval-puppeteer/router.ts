const express = require('express')
const { PrismaClient } = require("@prisma/client");
const updateVpn = require('./utils/updateVpn')

const router = express.Router()
router.get('/update/vpn/:id',async (req,res) => {
  const prisma = new PrismaClient({})
  const { id } = req.params
  const ans = await updateVpn(prisma,id)
  res.send(ans)
})

module.exports = router

export {}