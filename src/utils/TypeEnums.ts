const lit = <V extends keyof any>(v: V) => v;

export const Positions = {
  NURSE: { text: 'Enfermeira', value: lit('nurse') },
  PSYCHOLOGIST: { text: 'Psicologa', value: lit('psychologist') },
  NUTRITIONIST: { text: 'Nutricionista', value: lit('nutritionist') },
  CONCIERGE: { text: 'Concierge', value: lit('concierge') },
  ADMIN: { text: 'Administrador', value: lit('admin') },
};

export const arrayObjectsPositions = () => {
  const arrayObjects = [];

  for (const key in Positions) {
    arrayObjects.push(Positions[key as keyof typeof Positions]);
  }

  return arrayObjects;
};

export const arrayPositions = arrayObjectsPositions();

export type Positions = (typeof Positions)[keyof typeof Positions]['value'];

export function literalPosition(value: Positions) {
  return Positions[value?.toUpperCase() as keyof typeof Positions]?.text;
}

export const Roles = {
  NURSE: { text: 'Enfermeira', value: lit('nurse') },
  PSYCHOLOGIST: { text: 'Psicologa', value: lit('psychologist') },
  CONCIERGE: { text: 'Concierge', value: lit('concierge') },
  ADMIN: { text: 'Administrador', value: lit('admin') },
};

export const arrayObjectsRoles = () => {
  const arrayObjects = [];

  for (const key in Roles) {
    arrayObjects.push(Roles[key as keyof typeof Roles]);
  }

  return arrayObjects;
};

export const arrayRoles = arrayObjectsRoles();

export type Roles = (typeof Roles)[keyof typeof Roles]['value'];

export function literalRole(value: Roles) {
  return Roles[value?.toUpperCase() as keyof typeof Roles]?.text;
}
