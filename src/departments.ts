import { QueryResult } from "pg";
import {pool} from "./connection.js";


interface Department {
    id?: number;
    name: string;
}

class Departments{
    private departments: Department[] = [];

    public addDepartment(department: Department){
        this.departments.push(department);
        const query = `INSERT INTO department (name) VALUES ($1)`;
        return new Promise<void>((resolve, reject) => {
        const values = [department.name];

        pool.query(query, values, (err: Error) => {
            if (err) {
              console.error('Error executing query', err.stack);
              reject(err);
              return;
            }
            console.log('Department added');
            resolve();
          });
        });
    }

    public getDepartments():Promise<any[]> {
        const sql = 'SELECT id as Department_ID, name as Department_Name FROM department';
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


export default Departments;