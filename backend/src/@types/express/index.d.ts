import { UserEntity } from "../../Modules/User/Entity/User.entity";

declare global {
    namespace Express {
        interface Request {
            user?: UserEntity;
        }
    }
}

export { };