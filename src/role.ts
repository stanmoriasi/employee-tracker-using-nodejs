import { QueryResult } from "pg";
import {pool} from "./connection.js";


interface Role {
    id?: number;
    title: string;
    salary: number;
    department: string;
}
class Role{
    private roles: Role[] = [];

    public addRole(role: Role){
        this.roles.push(role);
        const query = `INSERT INTO role (title, salary, department) VALUES ($1, $2, $3)`;
        const values = [role.title, role.salary, role.department];
        return new Promise<void>((resolve, reject) => {

        pool.query(query, values, (err: Error) => {
            if (err) {
              console.error('Error executing query', err.stack);
              reject(err);
              return;
            }
            resolve();
          });
        });
    }

    public getRoles():Promise<any[]> {
        const sql = 'SELECT id, title, salary, department FROM role';
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

    public getAllRoles():Promise<any[]> {
        const sql = 'SELECT role.id, role.title, role.salary, department.name as department FROM role LEFT JOIN department ON role.department = department.id';
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
}

export default Role;