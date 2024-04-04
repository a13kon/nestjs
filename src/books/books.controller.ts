import { Controller, Get, Body, Put, Param, Delete, Post} from "@nestjs/common";
import { BooksService } from "./books.service";
import { CreateBookDto } from "./interfaces/dto/create-book";
import { UpdateBookDto } from "./interfaces/dto/update-book";
import { BookDocument } from "./schemas/book.schema";
import { IParamId } from "./interfaces/param-id";


@Controller('books') 
export class BooksController{
    constructor(private readonly booksService: BooksService) {}
    
    @Get()
    public getAll(): Promise<BookDocument[]> {
        return this.booksService.getAll();
    }

    @Get(':id')
    public getOne(@Param() { id }: IParamId): Promise<BookDocument> {
        return this.booksService.getOne(id);
    }

    @Post()
    public create(@Body() body: CreateBookDto): Promise<BookDocument> {
        return this.booksService.create(body);
    }

    @Put(':id')
    public update(
        @Param() { id }: IParamId,
        @Body() body: UpdateBookDto,
    ): Promise<BookDocument> {
        return this.booksService.update(id, body);
    }

    @Delete(':id')
    public delete(@Param() { id }: IParamId): Promise<BookDocument> {
        return this.booksService.delete(id);
    }
}