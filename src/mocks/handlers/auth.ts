import {
  http,
  HttpResponse,
} from 'msw'

type MockUser = {
  id: string
  username: string
  email: string
  password: string
}

type RegisterRequest = {
  username: string
  email: string
  password: string
}

type LoginRequest = {
  email: string
  password: string
}

const users: MockUser[] = []

export const authHandlers = [
  // CADASTRO

  http.post(
    '/api/auth/register',
    async ({ request }) => {
      const body =
        (await request.json()) as RegisterRequest

      const existingUser =
        users.find(
          (user) =>
            user.email === body.email,
        )

      if (existingUser) {
        return HttpResponse.json(
          {
            message:
              'Este e-mail já está cadastrado.',
          },
          {
            status: 409,
          },
        )
      }

      const newUser: MockUser = {
        id: crypto.randomUUID(),
        username: body.username,
        email: body.email,
        password: body.password,
      }

      users.push(newUser)

      return HttpResponse.json(
        {
          user: {
            id: newUser.id,
            username:
              newUser.username,
            email: newUser.email,
          },
        },
        {
          status: 201,
        },
      )
    },
  ),

  // LOGIN

  http.post(
    '/api/auth/login',
    async ({ request }) => {
      const body =
        (await request.json()) as LoginRequest

      const user = users.find(
        (user) =>
          user.email === body.email &&
          user.password ===
            body.password,
      )

      if (!user) {
        return HttpResponse.json(
          {
            message:
              'E-mail ou senha inválidos.',
          },
          {
            status: 401,
          },
        )
      }

      return HttpResponse.json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      })
    },
  ),
]