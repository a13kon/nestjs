import { Test, TestingModule } from "@nestjs/testing";
import { BooksService } from "./books.service"
import { BooksController } from "./books.controller";
import { MongooseModule } from "@nestjs/mongoose";
import mongoose from "mongoose";

describe('BooksService', () => {
    let booksService: BooksService;

    beforeAll(async () => {
       await mongoose.connect('mongodb://localhost:27017/main')
    })

    afterAll(async () => {
        await mongoose.connection.close();
    })

    beforeEach(async () => {
        
    const app: TestingModule = await Test.createTestingModule({
    
    controllers: [BooksController],
    providers: [BooksService],
    exports: [BooksService]
        }).compile();

        booksService = await app.resolve<BooksService>(BooksService);
    });

    describe('root', () => {
        it('get all', () => {
            const book = booksService.getAll();
            expect(book).toHaveLength(1);
        });
    });

});