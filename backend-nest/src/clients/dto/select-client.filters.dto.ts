import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsUUID } from "class-validator";

export class SelectClientFiltersDto {
    @ApiProperty({
        type: [String],
        description: 'Lista dos IDs dos clientes',
        example: ['8190c9c4-be59-4b6e-8216-78a441bad410', 'cf3dbe70-e39a-4892-89b5-6d5a9c546957']
    })
    @IsArray({ message: 'O campo ids deve ser um array' })
    @ArrayNotEmpty({ message: 'O campo ids não pode ser vazio' })
    @IsUUID('all', { each: true, message: 'O campo ids deve ser um array de UUIDs' })
    ids: string[];

    @ApiProperty({
        type: Boolean,
        description: 'Se o(s) cliente(s) está(ão) selecionado(s)',
        example: false
    })
    isSelected: boolean;
}