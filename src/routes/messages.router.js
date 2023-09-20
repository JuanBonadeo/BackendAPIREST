import { Router } from 'express'
import ManagerMessages from '../daos/mongodb/managers/MessagesManager.class.js'

const router = Router()

const managerMessages = new ManagerMessages()

router.get('/', async (req, res) => {
  const messages = await managerMessages.getMessages()
  res.send(messages)
})

export default router
