import { Router } from "express";
import { PrismaClient } from '@prisma/client'
import updateVpn from "./utils/updateVpn.js";
const router = Router()

router.get('/update/vpn/:id',async (req,res) => {
  const prisma = new PrismaClient({})
  const { id } = req.params
  const ans = await updateVpn(prisma, id)
  res.send(ans)
})

export default router