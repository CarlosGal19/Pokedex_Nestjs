import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    PokemonModule,
    MongooseModule.forRoot(
      'mongodb://root:example@localhost:27017/pokedex-api?authSource=admin',
    ),
    CommonModule, // CONNECT TO MONGODB WITH MONGOOSE
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
