import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    PokemonModule,
    MongooseModule.forRoot(
      'mongodb://root:example@localhost:27017/pokedex-api?authSource=admin',
    ), // CONNECT TO MONGODB WITH MONGOOSE
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
