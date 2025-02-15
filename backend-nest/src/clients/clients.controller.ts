import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClientFiltersDto } from './dto/client.filters.dto';
import { SelectClientFiltersDto } from './dto/select-client.filters.dto';
import { ClientDto } from './dto/client.dto';
import { PageResponseDto } from '../shared/utils/dto/page.response.dto';
import { ClientsReturnDto } from './dto/client.selection.return.dto';

@ApiTags('Clientes')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Realiza o cadastro de um novo cliente',
    type: ClientDto
  })
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Retorna a lista de clientes',
    type: PageResponseDto<ClientDto>
  })
  listClients(@Query() filters: ClientFiltersDto) {
    return this.clientsService.listClients(filters);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Retorna os detalhes de um cliente',
    type: ClientDto
  })
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Atualiza um cliente',
    type: ClientDto
  })
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(id, updateClientDto);
  }

  @Post('changeSelection')
  @ApiResponse({
    status: 201,
    description: 'Altera a seleção de clientes',
    type: ClientsReturnDto
  })
  changeSelection(@Body() selectDto: SelectClientFiltersDto) {
    return this.clientsService.selectUnselectClients(selectDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 201,
    description: 'Remove um cliente',
    type: ClientsReturnDto
  })
  remove(@Param('id') id: string) {
    return this.clientsService.remove(id);
  }
}
