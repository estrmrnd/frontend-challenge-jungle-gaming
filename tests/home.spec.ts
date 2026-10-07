import { expect, test } from '@playwright/test'

test('carrega a página inicial e exibe o catálogo de NFTs', async ({
  page,
}) => {
  await page.goto('/')

  await expect(page).toHaveTitle(/Kurio/i)

  const nftLink = page.getByRole('link', {
    name: 'Emerald Ape #042',
  })

  await expect(nftLink).toBeVisible()
  await expect(nftLink).toHaveAttribute(
    'href',
    '/nft/emerald-ape-42',
  )
})

test('abre os detalhes de um NFT pelo catálogo', async ({
  page,
}) => {
  await page.goto('/')

  const nftLink = page.getByRole('link', {
    name: 'Emerald Ape #042',
  })

  await expect(nftLink).toBeVisible()

  await nftLink.click()

  await expect(page).toHaveURL(
    /\/nft\/emerald-ape-42$/,
  )

  await expect(
    page.getByText('Início / Mercado'),
  ).toBeVisible()
})

test('adiciona um NFT ao carrinho e persiste os dados', async ({
  page,
}) => {
  await page.goto('/nft/emerald-ape-42')

  await expect(
    page.getByText('Início / Mercado'),
  ).toBeVisible()

  await page
    .getByRole('button', {
      name: 'COMPRAR',
      exact: true,
    })
    .click()

  await expect(page).toHaveURL(/\/cart$/)

  const cart = await page.evaluate(() => {
    return localStorage.getItem('kurio-cart')
  })

  expect(cart).not.toBeNull()
  expect(cart).toContain('emerald-ape-42')

  await page.reload()

  const cartAfterReload = await page.evaluate(
    () => {
      return localStorage.getItem('kurio-cart')
    },
  )

  expect(cartAfterReload).not.toBeNull()
  expect(cartAfterReload).toContain(
    'emerald-ape-42',
  )
})

test('avança do carrinho para o pagamento', async ({
  page,
}) => {
  await page.goto('/nft/emerald-ape-42')

  await page
    .getByRole('button', {
      name: 'COMPRAR',
      exact: true,
    })
    .click()

  await expect(page).toHaveURL(/\/cart$/)

  await page
    .getByRole('button', {
      name: 'Conectar e finalizar',
      exact: true,
    })
    .click()

  await expect(page).toHaveURL(/\/payment$/)
})

test('finaliza o pagamento e exibe a confirmação da compra', async ({
  page,
}) => {
  await page.goto('/nft/emerald-ape-42')

  await page
    .getByRole('button', {
      name: 'COMPRAR',
      exact: true,
    })
    .click()

  await expect(page).toHaveURL(/\/cart$/)

  await page
    .getByRole('button', {
      name: 'Conectar e finalizar',
      exact: true,
    })
    .click()

  await expect(page).toHaveURL(/\/payment$/)

  await page
    .getByRole('button', {
      name: 'Confirmar compra',
      exact: true,
    })
    .click()

  await expect(page).toHaveURL(
    /\/confirmation$/,
  )
})

test('finaliza o pagamento e exibe os dados da confirmação', async ({
  page,
}) => {
  await page.goto('/nft/emerald-ape-42')

  await page
    .getByRole('button', {
      name: 'COMPRAR',
      exact: true,
    })
    .click()

  await expect(page).toHaveURL(/\/cart$/)

  await page
    .getByRole('button', {
      name: 'Conectar e finalizar',
      exact: true,
    })
    .click()

  await expect(page).toHaveURL(/\/payment$/)

  await page
    .getByRole('button', {
      name: 'Confirmar compra',
      exact: true,
    })
    .click()

  await expect(page).toHaveURL(
    /\/confirmation$/,
  )

  await expect(
    page.getByText(
      'Seus NFTs agora estão na sua carteira',
    ),
  ).toBeVisible()

  await expect(
    page.getByText('Emerald Ape #042'),
  ).toBeVisible()

  await expect(
    page.getByText('Coinbase', {
      exact: true,
    }),
  ).toBeVisible()

  await expect(
    page.getByText('ID da transação'),
  ).toBeVisible()
})

test('mantém a mesma transação para a mesma chave de idempotência', async ({
  page,
}) => {
  await page.goto('/')

  await page.waitForFunction(() => {
    return navigator.serviceWorker.controller !== null
  })

  const result = await page.evaluate(async () => {
    const idempotencyKey =
      crypto.randomUUID()

    const payment = {
      items: [
        {
          nftId: 'emerald-ape-42',
          quantity: 1,
        },
      ],
      wallet: 'coinbase',
      total: 1.016,
    }

    async function makePayment() {
      const response = await fetch(
        '/api/payments',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
            'Idempotency-Key':
              idempotencyKey,
          },
          body: JSON.stringify(payment),
        },
      )

      const data = await response.json()

      return {
        status: response.status,
        data,
      }
    }

    const firstResponse =
      await makePayment()

    const secondResponse =
      await makePayment()

    return {
      firstResponse,
      secondResponse,
    }
  })

  expect(result.firstResponse.status).toBe(
    201,
  )

  expect(result.secondResponse.status).toBe(
    200,
  )

  expect(
    result.secondResponse.data.transactionId,
  ).toBe(
    result.firstResponse.data.transactionId,
  )
})