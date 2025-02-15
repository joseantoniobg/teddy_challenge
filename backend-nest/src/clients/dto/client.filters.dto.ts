import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsOptional } from "class-validator";
import { PageFilterDto } from "../../shared/utils/dto/page.filter.dto";

export class ClientFiltersDto extends PageFilterDto {
    @ApiProperty({
        type: String,
        description: 'Nome do cliente',
        example: 'João',
        required: false,
    })
    @IsOptional()
    @Transform(({ value }) => value ? value === 'true' : undefined)
    isSelected?: boolean;
}