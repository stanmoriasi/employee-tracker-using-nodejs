import inquirer from "inquirer";
import  employees from './employees.js';
import Departments from './departments.js';
//import cli from './cli.js'


const questions = [
    {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: ['Add Employee', 'View Employees', 'Add Role', 'Remove Role', 'Add Department', 'View Departments', 'Exit']
    }
];

const main = async () => {
    const { action } = await inquirer.prompt(questions);
    const employee = new employees();
    const department = new Departments();
    switch(action){
        case 'Add Employee':
            console.log('Add Employee');
            break;
        case 'View Employees':
            console.log('View list of all employees');
            employee.getEmployees();
            break;
        case 'Add Role':
            console.log('Add Role');
            break;
        case 'Remove Role':
            console.log('Remove Role');
            break;
        case 'Add Department':
            console.log('Add Department');
            const newDepartment = { id: 1, name: 'New Department' }; // Replace with actual department details
            department.addDepartment(newDepartment);
            break;
        case 'View Departments':
            console.log('View Departments');
            department.getDepartments();
            break;
        case 'Exit':
            console.log('Goodbye!');
            break;
        default:
            console.log('Invalid action');
            break;
    }
}

main();