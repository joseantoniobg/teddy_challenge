import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { HttpException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';

const mockClientRepository = {
  findOne: jest.fn(),
  save: jest.fn(),
  findAndCount: jest.fn(),
  update: jest.fn(),
  softDelete: jest.fn(),
  createQueryBuilder: jest.fn(() => ({
    update: jest.fn().mockReturnThis(),
    set: jest.fn().mockReturnThis(),
    whereInIds: jest.fn().mockReturnThis(),
    execute: jest.fn().mockResolvedValue({ affected: 1 })
  })),
};

describe('ClientsService', () => {
  let service: ClientsService;
  let repository: Repository<Client>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientsService,
        {
          provide: getRepositoryToken(Client),
          useValue: mockClientRepository,
        },
      ],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
    repository = module.get<Repository<Client>>(getRepositoryToken(Client));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new client', async () => {
      const createClientDto = { document: '12345', name: 'John Doe' } as CreateClientDto;
      mockClientRepository.findOne.mockResolvedValue(null);
      mockClientRepository.save.mockResolvedValue(createClientDto);

      const result = await service.create(createClientDto);
      expect(result).toEqual(createClientDto);
      expect(mockClientRepository.findOne).toHaveBeenCalledWith({ where: { document: createClientDto.document } });
      expect(mockClientRepository.save).toHaveBeenCalledWith(createClientDto);
    });

    it('should throw an error if client already exists', async () => {
      mockClientRepository.findOne.mockResolvedValue({});

      await expect(service.create({ document: '12345' } as CreateClientDto)).rejects.toThrow(new HttpException('O cliente já existe', 409));
      expect(mockClientRepository.findOne).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a client if found', async () => {
      const client = { id: '1', name: 'John Doe' };
      mockClientRepository.findOne.mockResolvedValue(client);

      const result = await service.findOne('1');
      expect(result).toEqual(client);
    });

    it('should throw an error if client is not found', async () => {
      mockClientRepository.findOne.mockResolvedValue(null);
      await expect(service.findOne('1')).rejects.toThrow(new HttpException('Cliente não localizado', 404));
    });
  });


  describe('listClients', () => {
    it('should list the clients based on a filter and pagination config', async () => {
      const clients = [{ id: '1', name: 'John Doe' }, { id: '2', name: 'John Doe2' }, { id: '3', name: 'John Doe2' }];
      mockClientRepository.findAndCount.mockResolvedValue([clients, clients.length]);

      const result = await service.listClients({ page: 1, size: 2 });
      expect(result).toEqual({
        content: clients,
        totalRecords: 3,
        totalPages: 2,
        size: 2,
        page: 1,
      });
    });
  });


  describe('update', () => {
    it('should update a client', async () => {
      mockClientRepository.findOne.mockResolvedValueOnce(null);
      mockClientRepository.update.mockResolvedValue({ affected: 1 });
      mockClientRepository.findOne.mockResolvedValue({ id: '1', name: 'Updated Name' });

      const result = await service.update('1', { name: 'Updated Name' });
      expect(result).toEqual({ id: '1', name: 'Updated Name' });
    });

    it('should throw an error if client does not exist', async () => {
      mockClientRepository.findOne.mockResolvedValueOnce(null);
      mockClientRepository.update.mockResolvedValue({ affected: 0 });
      await expect(service.update('1', { name: 'Updated Name' })).rejects.toThrow(new HttpException('Cliente não localizado', 404));
    });

    it('should throw an error if another client has the same document', async () => {
      mockClientRepository.findOne.mockResolvedValue({ id: '2', name: 'Updated Name' });
      await expect(service.update('1', { name: 'Updated Name' })).rejects.toThrow(new HttpException('Já existe um cliente com este documento', 409));
    });
  });

  describe('remove', () => {
    it('should soft delete a client', async () => {
      mockClientRepository.findOne.mockResolvedValue({ id: '1' });
      mockClientRepository.softDelete.mockResolvedValue({ affected: 1 });
      const result = await service.remove('1');
      expect(result).toEqual({ total: 1 });
    });

    it('should throw an error if client does not exist', async () => {
      mockClientRepository.findOne.mockResolvedValue(null);
      await expect(service.remove('1')).rejects.toThrow(new HttpException('Cliente não localizado', 404));
    });
  });

  describe('selectUnselectClients', () => {
    it('should update selection status of clients', async () => {
      const result = await service.selectUnselectClients({ ids: ['1'], isSelected: true });
      expect(result).toEqual({ total: 1 });
    });
  });
});
