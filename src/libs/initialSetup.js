import Role, { ROLES } from "../models/Role";
import Status, {STATUS} from "../models/Status"

export const createRoles = async ()=>{
    try {
        const count = await Role.estimatedDocumentCount()
        if(count>0) return;

        const values = ROLES;
        for (let i = 0; i < values.length; i++) {
            await new Role({name: values[i]}).save();
        }
    } catch (error) {
        console.error(error);
    }
};
export const createStatus = async ()=>{
    try {
        const count = await Status.estimatedDocumentCount()
        if(count>0) return;

        const values = STATUS;
        for (let i = 0; i < values.length; i++) {
            await new Status({name: values[i]}).save();
        }
    } catch (error) {
        console.error(error);
    }
};