import { createServer } from 'node:http'
import { Server } from 'socket.io'

const PORT = process.env.PORT || 3001

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  'https://frontend-challenge-jungle-gaming-sand.vercel.app',
]

const httpServer = createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    })

    res.end(
      JSON.stringify({
        status: 'ok',
        service: 'kurio-socket-server',
      }),
    )

    return
  }

  res.writeHead(404)
  res.end()
})

const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (socket) => {
  console.log(
    `Cliente conectado: ${socket.id}`,
  )

  socket.on('nft:subscribe', (nftId) => {
    const room = `nft:${nftId}`

    socket.join(room)

    console.log(
      `Cliente inscrito no NFT: ${nftId}`,
    )
  })

  socket.on(
    'nft:unsubscribe',
    (nftId) => {
      const room = `nft:${nftId}`

      socket.leave(room)

      console.log(
        `Cliente saiu do NFT: ${nftId}`,
      )
    },
  )

  socket.on('disconnect', () => {
    console.log(
      `Cliente desconectado: ${socket.id}`,
    )
  })
})

setInterval(() => {
  const nftId = 'emerald-ape-42'

  const price = (
    1.5 +
    Math.random() * 1.5
  ).toFixed(2)

  io.to(`nft:${nftId}`).emit(
    'nft:price-updated',
    {
      nftId,
      price,
    },
  )

  console.log(
    `Novo preço de ${nftId}: ${price} ETH`,
  )
}, 5000)

httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(
    `Socket.IO mock rodando na porta ${PORT}`,
  )
})