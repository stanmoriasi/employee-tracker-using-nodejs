import { QueryResult } from "pg";
import {pool} from "./connection.js";

interface employee {
    id: number;
    firstName: string;
    lastName: string;
    roleId: number;
    managerId: number;
}

class employees {
    private employees: employee[] = [];

    public addEmployee(employee: employee) {
        this.employees.push(employee);
        //const query = `INSERT INTO employees (id, first_name, last_name, role_id, manager_id) VALUES (${employee.id}, '${employee.firstName}', '${employee.lastName}', ${employee.roleId}, ${employee.managerId})`;
        //const values = [employee.id, employee.firstName, employee.lastName, employee.roleId, employee.managerId];
        }

    public getEmployees() {
        const sql = 'SELECT * FROM employee';
        pool.query(sql, (err: Error, result: QueryResult) => {
            if (err) {
              console.error('Error executing query', err.stack);
              return;
            }
            const { rows } = result;
            console.table(rows);
          });
        return this.employees;

    }
}

export default employees;