import { cancerStages, cancerTypes } from './Lists';

export const keyGenerator: () => string = () => {
  const teste = Math.random().toString(36).slice(-8);
  return teste;
};

export const literalCancerType = (cancerType: string) =>
  cancerTypes.find((cancer: any) => cancer.key === cancerType).text;

export const literalCancerStage = (cancerStage: string) =>
  cancerStages.find((item: any) => item.key === cancerStage).text;
