import { QueryResult } from "pg";
import {pool} from "./connection.js";


interface Department {
    id: number;
    name: string;
}

class Departments{
    private departments: Department[] = [];

    public addDepartment(department: Department){
        this.departments.push(department);
        const query = `INSERT INTO department (id, name) VALUES ($1, $2)`;
        const values = [department.id, department.name];

        pool.query(query, values, (err: Error) => {
            if (err) {
              console.error('Error executing query', err.stack);
              return;
            }
            console.log('Department added');
          });
    }

    public getDepartments() {
        const sql = 'SELECT id as Department_ID, name as Department_Name FROM department';
        pool.query(sql, (err: Error, result: QueryResult) => {
            if (err) {
              console.error('Error executing query', err.stack);
              return;
            }
            const { rows } = result;
            console.table(rows);
          });
        return this.departments;
    }
}

export default Departments;