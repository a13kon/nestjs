import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { ObjectSchema } from "joi";

@Injectable()
export class JoiUsersValidationPipe implements PipeTransform {
    constructor(private schema: ObjectSchema) {}

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    transform(value: any, metadata: ArgumentMetadata) {
        const { error } = this.schema.validate(value);
        if(error) {
            throw new BadRequestException('Validation Error');
        }
        return value;
    }

}