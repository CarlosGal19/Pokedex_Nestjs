import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { envConfiguration } from './common/config/env.config';
import { ZodEnvSchema } from './common/config/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfiguration],
      // validationSchema: ZodEnvSchema, // This does not work with zod because zod does not have the method validate()
      validate: (config) => {
        return ZodEnvSchema.parse(config);
      },
    }), // READ ENVIRONMENT VARIABLES
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    PokemonModule,
    MongooseModule.forRoot(process.env.MONGO_DB_URI || ''),
    CommonModule,
    SeedModule, // CONNECT TO MONGODB WITH MONGOOSE
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
