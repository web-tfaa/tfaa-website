// Local Typings
type ReturnType = (phone: string | undefined) => string;

export const formatPhone: ReturnType = (phone: string | undefined) => {
  if (!phone) {
    return '';
  }

  const stripped = (`${phone}`).replace(/\D/g, '');
  const match = stripped.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return stripped;
};
