import { CommonService } from '@/common/common.service';
import { HelloService } from './hello.service';
describe('HelloService', () => {
  let helloService: HelloService;

  beforeEach(async () => {
    helloService = new HelloService(new CommonService());
  });

  it('should be defined', () => {
    expect(helloService).toBeDefined();
  });
});
