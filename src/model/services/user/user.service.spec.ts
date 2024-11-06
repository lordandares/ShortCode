import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { User } from '../../entities/user/user';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository, // Provide a mock for the User repository
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const userDto = { firstName: 'John', lastName: 'Doe' };
      const savedUser = { id: 1, ...userDto };

      jest.spyOn(userRepository, 'create').mockReturnValue(savedUser as User);
      jest.spyOn(userRepository, 'save').mockResolvedValue(savedUser as User);

      const result = await service.createUser(userDto);

      expect(userRepository.create).toHaveBeenCalledWith(userDto);
      expect(userRepository.save).toHaveBeenCalledWith(savedUser);
      expect(result).toEqual(savedUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [{ id: 1, firstName: 'John', lastName: 'Doe' }];
      jest.spyOn(userRepository, 'find').mockResolvedValue(users as User[]);

      const result = await service.findAll();

      expect(userRepository.find).toHaveBeenCalled();
      expect(result).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('should return a single user by id', async () => {
      const user = { id: 1, firstName: 'John', lastName: 'Doe' };
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(user as User);

      const result = await service.findOne(1);

      expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(user);
    });

    it('should return null if no user is found', async () => {
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);

      const result = await service.findOne(99);

      expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: 99 });
      expect(result).toBeNull();
    });
  });

  describe('updateUser', () => {
    it('should update a user by id', async () => {
      jest.spyOn(userRepository, 'update').mockResolvedValue(undefined);

      const result = await service.updateUser(1, { firstName: 'Jane' });

      expect(userRepository.update).toHaveBeenCalledWith(1, {
        firstName: 'Jane',
      });
      expect(result).toBeUndefined();
    });
  });

  describe('deleteUser', () => {
    it('should delete a user by id', async () => {
      jest.spyOn(userRepository, 'delete').mockResolvedValue(undefined);

      const result = await service.deleteUser(1);

      expect(userRepository.delete).toHaveBeenCalledWith(1);
      expect(result).toBeUndefined();
    });
  });
});
