import { ApiProperty } from "@nestjs/swagger";

export class ClientDto {
  @ApiProperty({
    type: String,
    description: 'ID do cliente',
    example: 'cf3dbe70-e39a-4892-89b5-6d5a9c546957'
  })
  id: string;

  @ApiProperty({
    type: String,
    description: 'Documento do cliente, sendo CPF ou CNPJ',
    example: '12345678901'
  })
  document: string;

  @ApiProperty({
    type: String,
    description: 'Nome do cliente',
    example: 'João'
  })
  name: string;

  @ApiProperty({
    type: Number,
    description: 'Salário do cliente',
    example: 1000
  })
  wage: number;

  @ApiProperty({
    type: Number,
    description: 'Avaliação da empresa do cliente',
    example: 10000
  })
  companyEvaluation: number;

  @ApiProperty({
    type: Boolean,
    description: 'Se o cliente está selecionado',
    example: false
  })
  isSelected: boolean;
}