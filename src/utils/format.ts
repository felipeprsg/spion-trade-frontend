export function formatInteger(value: number | null | undefined): string | null {
  if (value === undefined || value === null) {
    return null;
  }

  return value.toLocaleString('pt-BR');
}

export function formatDecimal(value: number | null | undefined): string | null {
  if (value === undefined || value === null) {
    return null;
  }

  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatPercent(value: number | null | undefined): string | null {
  if (value === undefined || value === null) {
    return null;
  }

  return value.toLocaleString('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatCurrency(
  value: number | null | undefined
): string | null {
  if (value === undefined || value === null) {
    return null;
  }

  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatReduce(value: number | null | undefined): string | null {
  if (value === undefined || value === null) {
    return null;
  }

  if (value >= 1e9) {
    return (
      (value / 1e9).toLocaleString('pt-BR', { maximumFractionDigits: 1 }) + 'B'
    );
  } else if (value >= 1e6) {
    return (
      (value / 1e6).toLocaleString('pt-BR', { maximumFractionDigits: 1 }) + 'M'
    );
  } else if (value >= 1e3) {
    return (
      (value / 1e3).toLocaleString('pt-BR', { maximumFractionDigits: 1 }) + 'K'
    );
  } else {
    return formatInteger(value);
  }
}

export function formatTime(time: Date): string {
  const hours = time.getHours();
  const minutes = time.getMinutes();

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}`;
}

export function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.substring(1);
}
