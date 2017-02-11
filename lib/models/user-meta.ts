import { Model, IModelOptions } from './model';
import { DB } from '../setup/db';

export class UserMeta extends Model<HatcheryServer.IUserMeta> {
    constructor( options?: IModelOptions<HatcheryServer.IUserMeta> ) {
        super( Object.assign<IModelOptions<HatcheryServer.IUserMeta>>( options, {
            url: 'user-details/',
            idAttribute: 'user',
            host: DB.USERS
        }) );
    }
}