import { BearerToken } from './../../../../drusk-shared/token/bearer-token.interface';
import { Dto } from "drusk-shared/dto/dto.interface";

export interface GraphqlContext extends Dto {
    bearer: BearerToken;
    request: any;
}
