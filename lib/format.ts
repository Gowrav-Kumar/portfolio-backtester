export const formatINR = (value: number, options: Intl.NumberFormatOptions = {}) =>
  new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 2,
    useGrouping: true,
    ...options
  }).format(value);

export const formatRupee = (value: number, options: Intl.NumberFormatOptions = {}) =>
  `₹${formatINR(value, { maximumFractionDigits: 2, ...options })}`;

export const formatRupeeWhole = (value: number) =>
  `₹${formatINR(value, { maximumFractionDigits: 0 })}`;

export const formatPercent = (value: number) => `${value.toFixed(2)}%`;
