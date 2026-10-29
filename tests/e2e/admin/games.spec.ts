import { test, expect } from '@playwright/test';
import { loginAsAdmin } from '../helpers/auth';

const timestamp = Date.now();
const nomeGame = `GamTeste ${timestamp}`;
const nomeGameEditado = `GamEditado ${timestamp}`;

test.describe('CRUD de Games', () => {

  test('listar: página de games carrega com tabela', async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto('/admin/games');

    const table = page.getByRole('table');
    await expect(table).toBeVisible();

    // colunas esperadas
    await expect(page.getByRole('columnheader', { name: 'Título' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Preço' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Ações' })).toBeVisible();

    // pelo menos uma linha de dados
    await expect(page.locator('tbody tr').first()).toBeVisible();

    // ações da primeira linha ainda têm id estável (bom manter)
    await expect(page.locator('#cat-edit-btn-0')).toBeVisible();
    await expect(page.locator('#cat-delete-btn-0')).toBeVisible();
  });

  test('cadastrar: sucesso ao criar novo game', async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto('/admin/games/create');

    await page.fill('input#game-title', nomeGame);
    await page.fill('input#game-price', '49.99');
    await page.fill('input#game-date', '2024-01-01');
    await page.locator('select#game-active').selectOption('false');

    await page.locator('label:has-text("FPS")').locator('input[type="checkbox"]').check();

    await page.click('button#game-submit-btn');

    await expect(page).toHaveURL('/admin/games');

    await page.fill('input#game-title-search', nomeGame);
    await page.click('button#game-title-search-desktop-btn');

    await expect(page.locator(`text=${nomeGame}`)).toBeVisible();
  });

  test('cadastrar: falha com campos obrigatórios vazios', async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto('/admin/games/create');

    await page.click('button#game-submit-btn');

    // Permanece na página de criação
    await expect(page).toHaveURL('/admin/games/create');
  });

  test('editar: sucesso ao editar game existente', async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto('/admin/games');

    await page.fill('input#game-title-search', nomeGame);
    await page.click('button#game-title-search-desktop-btn');

    // Clica no botão de editar da primeira linha
    await page.click('button#game-edit-btn-0');

    await page.waitForURL(/\/admin\/games\/edit\/\d+/);

    const inputTitulo = page.locator('input#game-title');
    await inputTitulo.fill('');
    await inputTitulo.fill(nomeGameEditado);

    await page.locator('select#game-active').selectOption('false');
    await page.locator('label:has-text("FPS")').locator('input[type="checkbox"]').check();

    await page.click('button#game-submit-btn');

    await expect(page).toHaveURL('/admin/games');

    await page.fill('input#game-title-search', nomeGameEditado);
    await page.click('button#game-title-search-desktop-btn');

    await expect(page.locator(`text=${nomeGameEditado}`)).toBeVisible();
  });

  test('excluir: cancelar não remove o game', async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto('/admin/games');

    const primeiraLinha = page.locator('#row-0').first();
    const nomeAntes = await primeiraLinha.locator('.rdt_TableCell').first().innerText();

    // Clica no botão de deletar (segundo botão da linha)
    await page.click('button#game-delete-btn-0');

    // Cancela o modal
    await page.click('button#modal-cancel-btn');

    await expect(page.locator(`text=${nomeAntes}`)).toBeVisible();
  });

  test('excluir: sucesso ao excluir game', async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto('/admin/games');

    await page.fill('input#game-title-search', nomeGameEditado);
    await page.click('button#game-title-search-desktop-btn');

    await page.click('button#game-delete-btn-0');

    await page.click('button#modal-confirm-btn');

    await expect(page.locator(`text=${nomeGameEditado}`)).not.toBeVisible();
  });
});
