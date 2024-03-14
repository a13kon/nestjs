import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type BookDocument = Book & Document;

@Schema()
export class Book {
    @Prop({required: true})
    public title: string;

    @Prop({default: ""})
    public description: string;

    @Prop({default: ""})
    public authors: string;

    @Prop({default: false})
    public favorite: boolean;

    @Prop({default: ""})
    public fileCover: string;

    @Prop({default: ""})
    public fileName: string;

}

export const BookSchema = SchemaFactory.createForClass(Book);