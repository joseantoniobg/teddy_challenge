import { registerDecorator } from 'class-validator';
import { cpf, cnpj } from 'cpf-cnpj-validator';
import { getNumbersFromString } from '../functions/functions';

export function IsCpfCnpj() {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IsCpfCnpj',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: { message: 'Documento inválido' },
      validator: {
        validate(value: string) {
          if (!value) {
            return false;
          }

          value = getNumbersFromString(value);

          if (value.length === 11 && cpf.isValid(value)) {
            return true;
          }

          if (value.length === 14 && cnpj.isValid(value)) {
            return true;
          }

          return false;
        },
      },
    });
  };
}
