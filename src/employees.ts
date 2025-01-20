import { QueryResult } from "pg";
import {pool} from "./connection.js";
import colors from "colors";

interface employee {
    id?: number;
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
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`;
        const values = [employee.firstName, employee.lastName, employee.roleId, employee.managerId];
        return new Promise((resolve, reject) => {
            pool.query(sql, values, (err: Error, result: QueryResult) => {
                if (err) {
                    console.error('Error executing query', err.stack);
                    reject(err);
                    return;
                }
                console.log(colors.green('Employee added successfully'));
                    resolve(result);
                });
            });
        }
    
        public getEmployees(): Promise<any[]> {
            const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) as Manager from employee 
            LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.id = department.id 
            LEFT JOIN employee manager on manager.id = employee.manager_id`;
            return new Promise((resolve, reject) => {
                pool.query(sql, (err: Error, result: QueryResult) => {
                    if (err) {
                        console.error('Error executing query', err.stack);
                        reject(err);
                        return;
                    }
                    const { rows } = result;
                    console.table(rows);
                    resolve(rows);
                });
            });
        }

        public getEmployeeManager(): Promise<any[]> {
            const sql = `SELECT manager.id, CONCAT(manager.first_name, ' ', manager.last_name) as Manager from employee 
            LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.id = department.id 
            LEFT JOIN employee manager on manager.id = employee.manager_id`;
            return new Promise((resolve, reject) => {
                pool.query(sql, (err: Error, result: QueryResult) => {
                    if (err) {
                        console.error('Error executing query', err.stack);
                        reject(err);
                        return;
                    }
                    const { rows } = result;
                    //console.table(rows);
                    resolve(rows);
                });
            });
        }

        public updateEmployeeRole(employeeId: number, roleId: number) {
            const sql = `UPDATE employee SET role_id = $1 WHERE id = $2`;
            const values = [roleId, employeeId];
            return new Promise((resolve, reject) => {
                pool.query(sql, values, (err: Error, result: QueryResult) => {
                    if (err) {
                        console.error('Error executing query', err.stack);
                        reject(err);
                        return;
                    }
                    console.log(colors.green('Employee role updated successfully'));
                    resolve(result);
                });
            });
        }
}

export default employees;

//SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) as Manager from employee left join role on employee.role_id = role.id left join department on role.id = department.id left join employee manager on manager.id = employee.manager_id