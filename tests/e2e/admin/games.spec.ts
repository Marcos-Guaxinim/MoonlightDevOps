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
    await expect(page.locator('#game-edit-btn-0')).toBeVisible();
    await expect(page.locator('#game-delete-btn-0')).toBeVisible();
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

    await page.fill('input#game-name-search', nomeGameEditado);
    await page.click('button#game-name-search-desktop-btn');

    const row = page.locator('tbody tr').filter({ hasText: nomeGameEditado });
    await expect(row).toBeVisible();

    await row.locator('button#game-delete-btn-0').click();
    await page.click('button#modal-cancel-btn');

    await expect(row).toBeVisible();
  });

  test('excluir: sucesso ao excluir game', async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto('/admin/games');

    await page.fill('input#game-name-search', nomeGameEditado);
    await page.click('button#game-name-search-desktop-btn');

    const row = page.locator('tbody tr').filter({ hasText: nomeGameEditado });
    await expect(row).toBeVisible();

    // Espera o botão estável depois do re-render do filtro
    const deleteBtn = row.locator('button#game-delete-btn-0');
    await expect(deleteBtn).toBeVisible();
    await deleteBtn.click();

    await page.click('button#modal-confirm-btn');

    await expect(
      page.locator('tbody tr').filter({ hasText: nomeGameEditado })
    ).toHaveCount(0);
  });
});
