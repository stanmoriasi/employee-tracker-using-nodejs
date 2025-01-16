import inquirer from "inquirer";
import  employees from './employees.js';
//import cli from './cli.js'


const questions = [
    {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: ['Add Employee', 'View Employees', 'Add Role', 'Remove Role', 'Add Department', 'Remove Department', 'Exit']
    }
];

const main = async () => {
    const { action } = await inquirer.prompt(questions);
    const employee = new employees();
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
            break;
        case 'Remove Department':
            console.log('Remove Department');
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