export const removeNullish = <S>(value: S | undefined | null): value is S =>
  !!value;
