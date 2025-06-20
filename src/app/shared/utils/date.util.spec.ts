import { formatDateToISO } from './date.util';

describe('formatDateToISO', () => {
  it('deve formatar uma string ISO completa para apenas ano-mês-dia', () => {
    const result = formatDateToISO('2025-06-23T03:00:00.000Z');
    expect(result).toBe('2025-06-23');
  });

  it('deve formatar um objeto Date para ano-mês-dia', () => {
    const date = new Date('2025-06-23T03:00:00.000Z');
    const result = formatDateToISO(date);
    expect(result).toBe('2025-06-23');
  });

  it('deve formatar datas com meses e dias de apenas 1 dígito corretamente', () => {
    const result = formatDateToISO('2025-01-05T10:00:00.000Z');
    expect(result).toBe('2025-01-05');
  });

  it('deve retornar uma string vazia se não for passada nenhuma data', () => {
    const result = formatDateToISO();
    expect(result).toBe('');
  });

  it('deve lidar corretamente com datas inválidas e gerar NaN (edge case)', () => {
    const result = formatDateToISO('data-invalida');
    expect(result).toBe('NaN-NaN-NaN');
  });
});
