import UserDAO from "../daos/mongodb/managers/UserManager.js";

export default class SessionService {
    constructor() {
        this.userDao = new UserDAO()
    }
    async updateUserRoleService(id, role) {
        const result = await this.userDao.updateRole(id, role);
        return result;
    }
    async updateUserLastConnection(id) {
        const result = await this.userDao.updatelastConnection(id);
        return result;
    }
    async updatePathDocuments(id, documentsNames, documentsPaths) {
        console.log(documentsNames, documentsPaths)
        const result = await this.userDao.updatePathDocuments(id, documentsNames, documentsPaths);
        return result;
    }

    async getPremiumRequiredDoc(id) {
        const result = await this.userDao.getPremiumRequiredDoc(id);
        return result;
    }
    async deleteInactiveUsersService() {
        const result = await this.userDao.deleteInactiveUsers();
        return result;
    }
    async getAllUsersService() {   
        const result = await this.userDao.getUsers();
        return result;
    }
}
