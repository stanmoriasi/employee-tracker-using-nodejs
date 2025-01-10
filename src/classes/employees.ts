import Employee from "../interfaces/employee"; 
import { QueryResult } from 'pg';
import { pool, connectToDb } from '../connection';
await connectToDb();

class Employees {
    private employees: Employee[] = [];

    constructor(employees: Employee[]) {
        this.employees = employees;
    }

    getEmployees(): Employee[] {
        pool.query('SELECT * FROM employees', (err: Error, res:QueryResult) => {
            if (err) {
                console.error(err);
                return;
            }
            this.employees = res.rows;

        });
        return this.employees;
    }

    addEmployee(employee: Employee): void {
        this.employees.push(employee);
    }

    removeEmployee(employeeId: number): void {
        this.employees = this.employees.filter((employee) => employee.id !== employeeId);
    }
}

export default Employees;