import { Test, TestingModule } from '@nestjs/testing'
import { IntervalService } from './interval.service'

describe('IntervalService', () => {
  let service: IntervalService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IntervalService],
    }).compile()

    service = module.get<IntervalService>(IntervalService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
