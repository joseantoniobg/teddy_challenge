import { HttpException, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Not, Repository } from 'typeorm';
import { PageFilterDto } from 'src/shared/utils/dto/page.filter.dto';
import { ClientDto } from './dto/client.dto';
import { ClientFiltersDto } from './dto/client.filters.dto';
import { SelectClientFiltersDto } from './dto/select-client.filters.dto';
import { PageResponseDto } from 'src/shared/utils/dto/page.response.dto';
import { ClientsReturnDto } from './dto/client.selection.return.dto';

@Injectable()
export class ClientsService {
  constructor(@InjectRepository(Client) private readonly clientsRepository: Repository<Client>) {}

  private selectedColumns = ['id', 'name', 'document', 'wage', 'companyEvaluation', 'isSelected'];

  private formatClient(client: Client): ClientDto {
    return {
      id: client.id,
      name: client.name,
      document: client.document,
      wage: client.wage,
      companyEvaluation: client.companyEvaluation,
      isSelected: client.isSelected,
    };
  }

  async create(createClientDto: CreateClientDto): Promise<ClientDto> {
    const alreadyExistingClient = await this.clientsRepository.findOne({ where: { document: createClientDto.document } });

    if (alreadyExistingClient) {
      throw new HttpException('O cliente já existe', 409);
    }

    const newClient = await this.clientsRepository.save(createClientDto);

    return this.formatClient(newClient);
  }

  async listClients(pagination: ClientFiltersDto): Promise<PageResponseDto<ClientDto>> {
    const fetchedClients = await this.clientsRepository.findAndCount({
      skip: (pagination.page - 1) * pagination.size,
      take: pagination.size,
      select: this.selectedColumns as any,
      where: { isSelected: pagination.isSelected },
      order: { name: 'ASC', document: 'ASC' },
    });

    return {
      content: fetchedClients[0].map((client) => this.formatClient(client)),
      totalRecords: fetchedClients[1],
      totalPages: Math.ceil(fetchedClients[1] / pagination.size),
      page: pagination.page,
      size: pagination.size,
    }
  }

  async findOne(id: string): Promise<ClientDto> {
    const client = await this.clientsRepository.findOne({ where: { id } });

    if (!client) {
      throw new HttpException('Cliente não localizado', 404);
    }

    return this.formatClient(client);
  }

  async update(id: string, updateClientDto: UpdateClientDto): Promise<ClientDto> {
    const anotherClientWithSameDocument = await this.clientsRepository.findOne({ select: [], where: { document: updateClientDto.document ?? '', id: Not(id) } });

    if (anotherClientWithSameDocument) {
      throw new HttpException('Já existe um cliente com este documento', 409);
    }

    const updateResults = await this.clientsRepository.update(id, updateClientDto);

    if (updateResults.affected === 0) {
      throw new HttpException('Cliente não localizado', 404);
    }

    const updatedClient = await this.clientsRepository.findOne({ select: this.selectedColumns as any, where: { id } });

    return updatedClient;
  }

  async remove(id: string): Promise<ClientsReturnDto> {
    const existingClient = await this.clientsRepository.findOne({
      select: [],
      where: { id, deletedAt: null },
    });

    if (!existingClient) {
      throw new HttpException('Cliente não localizado', 404);
    }

    const deleteResults = await this.clientsRepository.softDelete(id);

    return {
      total: deleteResults.affected ?? 0
    };
  }

  async selectUnselectClients(selectDto: SelectClientFiltersDto): Promise<ClientsReturnDto> {
    const updateResults = await this.clientsRepository
      .createQueryBuilder()
      .update()
      .set({ isSelected: selectDto.isSelected })
      .whereInIds(selectDto.ids)
      .execute();

    return {
      total: updateResults.affected ?? 0
    };
  }
}
