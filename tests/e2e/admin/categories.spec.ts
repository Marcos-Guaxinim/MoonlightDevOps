import { test, expect } from '@playwright/test';
import { loginAsAdmin } from '../helpers/auth';

const timestamp = Date.now();
const nomeCategoria = `CatTeste ${timestamp}`;
const nomeCategoriaEditada = `CatEditada ${timestamp}`;

test.describe('CRUD de Categorias', () => {

  test('listar: página de categorias carrega com tabela', async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto('/admin/categories');

    // tabela existe
    const table = page.getByRole('table');
    await expect(table).toBeVisible();

    // colunas esperadas
    await expect(page.getByRole('columnheader', { name: 'Nome' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Descrição' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Ações' })).toBeVisible();

    // pelo menos uma linha de dados
    await expect(page.locator('tbody tr').first()).toBeVisible();

    // ações da primeira linha ainda têm id estável (bom manter)
    await expect(page.locator('#cat-edit-btn-0')).toBeVisible();
    await expect(page.locator('#cat-delete-btn-0')).toBeVisible();
  });

  test('cadastrar: sucesso ao criar nova categoria', async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto('/admin/categories/create');

    await page.fill('input#category-name', nomeCategoria);
    await page.fill(
      'textarea#category-description',
      'Descrição da categoria de teste'
    );
    await page.click('button#category-submit-btn');

    await expect(page).toHaveURL('/admin/categories');

    await page.fill('input#category-name-search', nomeCategoria);
    await page.click('button#category-name-search-desktop-btn');

    await expect(page.locator(`text=${nomeCategoria}`)).toBeVisible();
  });

  test('cadastrar: falha com campos vazios', async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto('/admin/categories/create');

    await page.click('button#category-submit-btn');

    // Permanece na página de criação com erros
    await expect(page).toHaveURL('/admin/categories/create');
  });

  test('editar: sucesso ao editar categoria existente', async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto('/admin/categories');

    await page.fill('input#category-name-search', nomeCategoria);
    await page.click('button#category-name-search-desktop-btn');

    // Clica no botão de editar da primeira linha
    await page.click('button#cat-edit-btn-0');

    // Aguarda navegar para página de edição
    await page.waitForURL(/\/admin\/categories\/edit\/\d+/);

    // Limpa e preenche o campo de nome
    const inputNome = page.locator('input#category-name');
    await inputNome.fill('');
    await inputNome.fill(nomeCategoriaEditada);

    await page.click('button#category-submit-btn');

    await expect(page).toHaveURL('/admin/categories');

    await page.fill('input#category-name-search', nomeCategoriaEditada);
    await page.click('button#category-name-search-desktop-btn');

    await expect(page.locator(`text=${nomeCategoriaEditada}`)).toBeVisible();
  });

  test('excluir: cancelar não remove a categoria', async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto('/admin/categories');

    const primeiraLinha = page.locator('#row-0').first();
    const nomeAntes = await primeiraLinha.locator('.rdt_TableCell').first().innerText();

    // Clica no botão de deletar (segundo botão da linha)
    await page.click('button#cat-delete-btn-0');

    // Cancela o modal
    await page.click('button#modal-cancel-btn');

    await expect(page.locator(`text=${nomeAntes}`)).toBeVisible();
  });

  test('excluir: sucesso ao excluir categoria', async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto('/admin/categories');

    await page.fill('input#category-name-search', nomeCategoriaEditada);
    await page.click('button#category-name-search-desktop-btn');

    await page.click('button#cat-delete-btn-0');

    await page.click('button#modal-confirm-btn');

    await expect(page.locator(`text=${nomeCategoriaEditada}`)).not.toBeVisible();
  });
});
