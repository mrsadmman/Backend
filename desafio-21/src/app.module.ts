import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRoot(
      'mongodb+srv://juantaphanel:w59YOPy8rzsU65eE@cluster0.ph6zyjw.mongodb.net/test',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
