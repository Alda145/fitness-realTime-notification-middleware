import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class TransformParamToInt implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {

        console.log("VALUE:", value);
        console.log("TYPE:", metadata.type);
        console.log("DATA:", metadata.data);
        console.log("METATYPE:", metadata.metatype);
        let myValue = value;
        if (!isNaN(myValue)) {
            console.log("inside PipeTransform")
            return parseInt(myValue);
        } else {
            throw new BadRequestException(`this parameter: ${myValue} is not a Number`)
        }
    }
}
