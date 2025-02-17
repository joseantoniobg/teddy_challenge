import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsEmpty, IsNotEmpty, IsNumber, IsString, MaxLength, Min, Max } from "class-validator";
import { IsCpfCnpj } from "../../shared/decorators/is-cpf-cnpj.decorator";
import { Transform } from "class-transformer";

export class CreateClientDto {
  @ApiProperty({
    type: String,
    description: 'Documento do cliente, sendo CPF ou CNPJ',
    example: '12'
  })
  @IsDefined({ message: 'O campo documento é obrigatório' })
  @IsNotEmpty({ message: 'O campo documento deve ser preenchido' })
  @IsString({ message: 'O campo documento deve ser uma string' })
  @IsCpfCnpj()
  document: string;

  @ApiProperty({
    type: String,
    description: 'Nome do cliente',
    example: 'João'
  })
  @IsDefined({ message: 'O campo nome é obrigatório' })
  @IsString({ message: 'O campo nome deve ser uma string' })
  @IsNotEmpty({ message: 'O campo nome deve ser preenchido' })
  @MaxLength(50, { message: 'O campo nome deve ter no máximo 50 caracteres' })
  name: string;

  @ApiProperty({
    type: Number,
    description: 'Salário do cliente',
    example: 1000
  })
  @Transform(({ value: wage }) => parseFloat(wage))
  @IsDefined({ message: 'O campo salário é obrigatório' })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'O campo salário deve ser um número com até 2 casas decimais' })
  @Min(0, { message: 'O campo salário deve ser maior ou igual a R$0,00' })
  @Max(99999999.99, { message: 'O campo salário deve ser menor ou igual a R$99.999.999,99' })
  wage: number;

  @ApiProperty({
    type: Number,
    description: 'Avaliação da empresa do cliente',
    example: 10000
  })
  @Transform(({ value: companyEvaluation }) => parseFloat(companyEvaluation))
  @IsDefined({ message: 'O campo avaliação da empresa é obrigatório' })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'O campo avaliação da empresa deve ser um número com até 2 casas decimais' })
  @Min(0, { message: 'O campo avaliação da empresa deve ser maior ou igual a R$0,00' })
  @Max(99999999999.99, { message: 'O campo salário deve ser menor ou igual a R$99.999.999.999,99' })
  companyEvaluation: number;
}
