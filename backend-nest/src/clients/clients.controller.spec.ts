import { Test, TestingModule } from '@nestjs/testing';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientFiltersDto } from './dto/client.filters.dto';
import { SelectClientFiltersDto } from './dto/select-client.filters.dto';

const mockClientsService = {
  create: jest.fn(),
  listClients: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  selectUnselectClients: jest.fn(),
  remove: jest.fn(),
};

describe('ClientsController', () => {
  let controller: ClientsController;
  let service: ClientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientsController],
      providers: [
        {
          provide: ClientsService,
          useValue: mockClientsService,
        },
      ],
    }).compile();

    controller = module.get<ClientsController>(ClientsController);
    service = module.get<ClientsService>(ClientsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should call service create and return result', async () => {
      const dto: CreateClientDto = { document: '12345', name: 'John Doe', wage: 100, companyEvaluation: 5000 };
      mockClientsService.create.mockResolvedValue(dto);
      expect(await controller.create(dto)).toEqual(dto);
      expect(mockClientsService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('listClients', () => {
    it('should return list of clients', async () => {
      const dto: ClientFiltersDto = { page: 1, size: 10 };
      const result = { content: [], totalRecords: 0, page: 1, size: 10 };
      mockClientsService.listClients.mockResolvedValue(result);
      expect(await controller.listClients(dto)).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return one client', async () => {
      const client = { id: '1', name: 'John Doe' };
      mockClientsService.findOne.mockResolvedValue(client);
      expect(await controller.findOne('1')).toEqual(client);
    });
  });

  describe('update', () => {
    it('should update client and return new data', async () => {
      const dto: UpdateClientDto = { name: 'Updated Name' };
      const client = { id: '1', ...dto };
      mockClientsService.update.mockResolvedValue(client);
      expect(await controller.update('1', dto)).toEqual(client);
    });
  });

  describe('changeSelection', () => {
    it('should update selection and return affected count', async () => {
      const dto: SelectClientFiltersDto = { ids: ['1'], isSelected: true };
      const result = { total: 1 };
      mockClientsService.selectUnselectClients.mockResolvedValue(result);
      expect(await controller.changeSelection(dto)).toEqual(result);
    });
  });

  describe('remove', () => {
    it('should remove client and return result', async () => {
      const result = { total: 1 };
      mockClientsService.remove.mockResolvedValue(result);
      expect(await controller.remove('1')).toEqual(result);
    });
  });
});
