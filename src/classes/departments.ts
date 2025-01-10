import Department from "../interfaces/department";

class Departments{
    private departments: Department[] = [];

    constructor(departments: Department[]){
        this.departments = departments;
    }

    getDepartments(): Department[]{
        return this.departments;
    }

    addDepartment(department: Department): void{
        this.departments.push(department);
    }

    removeDepartment(departmentId: number): void{
        this.departments = this.departments.filter((department) => department.id !== departmentId);
    }
}

export default Departments;