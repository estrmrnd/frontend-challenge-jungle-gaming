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

test('exibe estado de NFT não encontrado ao acessar um ID inexistente', async ({
  page,
}) => {
  const responsePromise = page.waitForResponse(
    (response) =>
      response.url().includes(
        '/api/nfts/nft-inexistente',
      ) &&
      response.request().method() === 'GET',
  )

  await page.goto(
    '/nft/nft-inexistente',
  )

  const response =
    await responsePromise

  expect(response.status()).toBe(404)

  await expect(
    page.getByText(
      'NFT não encontrado.',
      {
        exact: true,
      },
    ),
  ).toBeVisible()

  await expect(page).toHaveURL(
    /\/nft\/nft-inexistente$/,
  )
})

test('mantém filtros, ordenação e paginação no estado da URL e restaura pelo histórico', async ({
  page,
}) => {
  await page.setViewportSize({
    width: 1440,
    height: 1000,
  })

  await page.goto('/')

  // FILTROS COMBINADOS

  await page
    .getByRole('button', {
      name: /Arte digital \(\d+\)/,
    })
    .click()

  await expect(page).toHaveURL(
    /category=Arte/,
  )

  await page
    .getByRole('button', {
      name: /Ethereum \(\d+\)/,
    })
    .click()

  await expect(page).toHaveURL(
    /category=Arte/,
  )

  await expect(page).toHaveURL(
    /network=ethereum/,
  )

  // Reinicia o catálogo sem filtros.

  await page.goto('/')

  await expect(page).not.toHaveURL(
    /category=/,
  )

  await expect(page).not.toHaveURL(
    /network=/,
  )

  // ORDENAÇÃO

  await page
    .locator('[data-slot="select-trigger"]')
    .click()

  await page
    .getByRole('option', {
      name: 'Menor preço',
    })
    .click()

  await expect(page).toHaveURL(
    /sort=price-asc/,
  )

  // PAGINAÇÃO
  // Existem versões mobile e desktop no DOM.
  // Em 1440px usamos a paginação visível.

  const visiblePagination = page
    .locator('[data-slot="pagination"]')
    .filter({
      visible: true,
    })

  await expect(
    visiblePagination,
  ).toHaveCount(1)

  const secondPage =
    visiblePagination.locator(
      '[data-slot="pagination-link"]',
      {
        hasText: '2',
      },
    )

  await expect(secondPage).toBeVisible()

  await secondPage.click()

  await expect(page).toHaveURL(
    /page=2/,
  )

  await expect(page).toHaveURL(
    /sort=price-asc/,
  )

  // ALTERAR FILTRO REINICIA A PAGINAÇÃO

  await page
    .getByRole('button', {
      name: /Polygon \(\d+\)/,
    })
    .click()

  await expect(page).toHaveURL(
    /network=polygon/,
  )

  await expect(page).not.toHaveURL(
    /page=2/,
  )

  // HISTÓRICO

  await page.goBack()

  await expect(page).toHaveURL(
    /sort=price-asc/,
  )

  await expect(page).toHaveURL(
    /page=2/,
  )

  await expect(page).not.toHaveURL(
    /network=polygon/,
  )

  await page.goForward()

  await expect(page).toHaveURL(
    /network=polygon/,
  )

  await expect(page).not.toHaveURL(
    /page=2/,
  )
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
    return localStorage.getItem(
      'kurio-cart',
    )
  })

  expect(cart).not.toBeNull()
  expect(cart).toContain(
    'emerald-ape-42',
  )

  await page.reload()

  const cartAfterReload =
    await page.evaluate(() => {
      return localStorage.getItem(
        'kurio-cart',
      )
    })

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

  await expect(page).toHaveURL(
    /\/cart$/,
  )

  await page
    .getByRole('button', {
      name: 'Conectar e finalizar',
      exact: true,
    })
    .click()

  await expect(page).toHaveURL(
    /\/payment$/,
  )
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

  await expect(page).toHaveURL(
    /\/cart$/,
  )

  await page
    .getByRole('button', {
      name: 'Conectar e finalizar',
      exact: true,
    })
    .click()

  await expect(page).toHaveURL(
    /\/payment$/,
  )

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

  await expect(page).toHaveURL(
    /\/cart$/,
  )

  await page
    .getByRole('button', {
      name: 'Conectar e finalizar',
      exact: true,
    })
    .click()

  await expect(page).toHaveURL(
    /\/payment$/,
  )

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
    return (
      navigator.serviceWorker.controller !==
      null
    )
  })

  const result = await page.evaluate(
    async () => {
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
            body: JSON.stringify(
              payment,
            ),
          },
        )

        const data =
          await response.json()

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
    },
  )

  expect(
    result.firstResponse.status,
  ).toBe(201)

  expect(
    result.secondResponse.status,
  ).toBe(200)

  expect(
    result.secondResponse.data
      .transactionId,
  ).toBe(
    result.firstResponse.data
      .transactionId,
  )
})

test('gerencia quantidade, cupom, persistência e remoção no carrinho', async ({
  page,
}) => {
  await page.setViewportSize({
    width: 1440,
    height: 1000,
  })

  await page.goto(
    '/nft/emerald-ape-42',
  )

  await page
    .getByRole('button', {
      name: 'COMPRAR',
      exact: true,
    })
    .click()

  await expect(page).toHaveURL(
    /\/cart$/,
  )

  const desktopCart =
    page.locator('div.hidden.lg\\:block')

  await expect(
    desktopCart,
  ).toBeVisible()

  const increaseButton =
    desktopCart.getByRole('button', {
      name: 'Aumentar quantidade',
    })

  await expect(
    increaseButton,
  ).toHaveCount(1)

  await increaseButton.click()

  await expect
    .poll(async () => {
      return page.evaluate(() => {
        const cart =
          localStorage.getItem(
            'kurio-cart',
          )

        if (!cart) {
          return 0
        }

        const items = JSON.parse(cart)

        return (
          items.find(
            (item: {
              nft: {
                id: string
              }
              quantity: number
            }) =>
              item.nft.id ===
              'emerald-ape-42',
          )?.quantity ?? 0
        )
      })
    })
    .toBe(2)

  await page.reload()

  await expect(
    desktopCart,
  ).toBeVisible()

  await expect
    .poll(async () => {
      return page.evaluate(() => {
        const cart =
          localStorage.getItem(
            'kurio-cart',
          )

        if (!cart) {
          return 0
        }

        const items = JSON.parse(cart)

        return (
          items.find(
            (item: {
              nft: {
                id: string
              }
              quantity: number
            }) =>
              item.nft.id ===
              'emerald-ape-42',
          )?.quantity ?? 0
        )
      })
    })
    .toBe(2)

  const promoInput =
    desktopCart.getByLabel(
      'Código promocional',
    )

  await promoInput.fill('KURIO10')

  await desktopCart
    .getByRole('button', {
      name: 'Aplicar',
      exact: true,
    })
    .click()

  await expect(
    desktopCart.getByText(
      'Cupom aplicado com sucesso.',
      {
        exact: true,
      },
    ),
  ).toBeVisible()

  const cartAfterCoupon =
    await page.evaluate(() => {
      const storedCart =
        localStorage.getItem(
          'kurio-cart',
        )

      if (!storedCart) {
        return null
      }

      const items = JSON.parse(
        storedCart,
      ) as Array<{
        nft: {
          id: string
          price: string
        }
        quantity: number
      }>

      const item = items.find(
        (cartItem) =>
          cartItem.nft.id ===
          'emerald-ape-42',
      )

      if (!item) {
        return null
      }

      const subtotal =
        Number(item.nft.price) *
        item.quantity

      return {
        subtotal,
        discount:
          subtotal * 0.1,
      }
    })

  expect(
    cartAfterCoupon,
  ).not.toBeNull()

  const expectedDiscount =
    cartAfterCoupon!.discount.toFixed(2)

  await expect(
    desktopCart.getByText(
      `(-) ${expectedDiscount}`,
      {
        exact: true,
      },
    ),
  ).toBeVisible()

  await desktopCart
    .getByRole('button', {
      name: 'Remover',
      exact: true,
    })
    .click()

  await expect(
    desktopCart.getByText(
      'Cupom removido.',
      {
        exact: true,
      },
    ),
  ).toBeVisible()

  await expect(
    desktopCart.getByText(
      '(-) 0.00',
      {
        exact: true,
      },
    ),
  ).toBeVisible()

  await promoInput.fill('QUALQUER')

  await desktopCart
    .getByRole('button', {
      name: 'Aplicar',
      exact: true,
    })
    .click()

  await expect(
    desktopCart.getByText(
      'Código promocional inválido.',
      {
        exact: true,
      },
    ),
  ).toBeVisible()

  await promoInput.fill('EXPIRED10')

  await desktopCart
    .getByRole('button', {
      name: 'Aplicar',
      exact: true,
    })
    .click()

  await expect(
    desktopCart.getByText(
      'Este cupom está expirado.',
      {
        exact: true,
      },
    ),
  ).toBeVisible()

  await desktopCart
    .getByRole('button', {
      name: 'Remover Emerald Ape #042 do carrinho',
    })
    .click()

  await expect(
    desktopCart.getByText(
      'Seu carrinho está vazio',
      {
        exact: true,
      },
    ),
  ).toBeVisible()

  const storedCart =
    await page.evaluate(() =>
      localStorage.getItem(
        'kurio-cart',
      ),
    )

  expect(
    JSON.parse(storedCart ?? '[]'),
  ).toEqual([])
})
