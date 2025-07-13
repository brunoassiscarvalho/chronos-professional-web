const lit = <V extends keyof any>(v: V) => v;

export const PaperStatus = {
  OPEN: { text: 'Em Aberto', value: lit('open') },
  COMPLETED: { text: 'Concluida', value: lit('completed') },
};

export type PaperStatus =
  (typeof PaperStatus)[keyof typeof PaperStatus]['value'];

export function literalPaperStatus(value: PaperStatus): string {
  return PaperStatus[value?.toUpperCase() as keyof typeof PaperStatus]?.text;
}

export const enumPaperStatus = Object.entries(PaperStatus).map(
  ([, params]) => params.value,
);
