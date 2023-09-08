import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from './entities/city.entity';
import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
    private readonly cacheService: CacheService,
  ) {}

  async getAllCitiesByStateId(stateId: number): Promise<CityEntity[]> {
    const data = this.cacheService.getCache<CityEntity[]>(
      `state_${stateId}`,
      () =>
        this.cityRepository.find({
          where: {
            stateId,
          },
        }),
    );

    return (await data).flat();
  }

  async findCityById(cityId: number): Promise<CityEntity> {
    const city = this.cityRepository.findOne({
      where: {
        id: cityId,
      },
    });

    if (!city) throw new Error(`CityId: ${cityId} not found`);

    return city;
  }
}
