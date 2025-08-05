import { Module } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { TagModule } from '@app/tag/tag.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import DataSourceOptions from "@app/ormconfig"

@Module({
  imports: [TagModule,
    // Todo: move database confid data to new file
    TypeOrmModule.forRoot(DataSourceOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
