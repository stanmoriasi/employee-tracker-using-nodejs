import Role from '../interfaces/role';

class Roles{
    private roles: Role[] = [];

    constructor(roles: Role[]){
        this.roles = roles;
    }

    getRoles(): Role[]{
        return this.roles;
    }

    addRole(role: Role): void{
        this.roles.push(role);
    }

    removeRole(roleId: number): void{
        this.roles = this.roles.filter((role) => role.id !== roleId);
    }
}

export default Roles;