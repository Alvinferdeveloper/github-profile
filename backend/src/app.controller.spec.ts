import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('getUser', () => {
    it('should return profile for a given username', async () => {
      const mockProfile = { login: 'someuser', name: 'Some User' };
      jest.spyOn(appService, 'getUserProfile').mockResolvedValue(mockProfile);

      const result = await appController.getUser('someuser');
      expect(result).toEqual(mockProfile);
      expect(appService.getUserProfile).toHaveBeenCalledWith('someuser');
    });

    it('should fallback to default username if not provided', async () => {
      const mockProfile = { login: 'albinferdev', name: 'Albin' };
      jest.spyOn(appService, 'getUserProfile').mockResolvedValue(mockProfile);

      const result = await appController.getUser(undefined);
      expect(result).toEqual(mockProfile);
      expect(appService.getUserProfile).toHaveBeenCalledWith('albinferdev');
    });
  });
});
