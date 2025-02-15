import { ApiProperty } from "@nestjs/swagger";

export class ClientsReturnDto {
  @ApiProperty({
    type: Number,
    description: 'Número total de clientes alterados',
    example: 10
  })
  total: number;
}