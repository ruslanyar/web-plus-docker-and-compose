import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import { WishesModule } from 'src/wishes/wishes.module';

import { Offer } from './entities/offer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Offer]), WishesModule],
  controllers: [OffersController],
  providers: [OffersService],
})
export class OffersModule {}
