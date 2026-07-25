import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('getUser', () => {
    it('should return profile for a given username', async () => {
      const mockProfile = { login: 'someuser', name: 'Some User' };
      jest.spyOn(userService, 'getUserProfile').mockResolvedValue(mockProfile);

      const result = await userController.getUser('someuser');
      expect(result).toEqual(mockProfile);
      expect(userService.getUserProfile).toHaveBeenCalledWith('someuser');
    });

    it('should fallback to default username if not provided', async () => {
      const mockProfile = { login: 'Alvinferdeveloper', name: 'Albin' };
      jest.spyOn(userService, 'getUserProfile').mockResolvedValue(mockProfile);

      const result = await userController.getUser(undefined);
      expect(result).toEqual(mockProfile);
      expect(userService.getUserProfile).toHaveBeenCalledWith('Alvinferdeveloper');
    });
  });
});
