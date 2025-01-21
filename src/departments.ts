import { QueryResult } from "pg";
import {pool} from "./connection.js";
import colors from "colors";


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
        const sql = 'SELECT id, name FROM department';
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

    public deleteDepartment(id: number){
        const query = `DELETE FROM department WHERE id = $1`;
        return new Promise<void>((resolve, reject) => {
          const values = [id];

        pool.query(query, values, (err: Error) => {
            if (err) {
              console.error('Error executing query', err.stack);
              reject(err);
              return;
            }
            console.log(colors.red('Department deleted'));
            resolve();
          });
        });
      }
    

}


export default Departments;