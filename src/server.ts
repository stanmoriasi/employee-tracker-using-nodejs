import inquirer from "inquirer";
import Employees from "./classes/employees.js";
// import Roles from "./classes/roles";
// import Departments from "./classes/departments";



const employees = new Employees([]);
const questions = [
    {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: ['Add Employee', 'Remove Employee', 'Add Role', 'Remove Role', 'Add Department', 'Remove Department', 'Exit']
    }
];

const main = async () => {
    const { action } = await inquirer.prompt(questions);
    switch(action){
        case 'Add Employee':
            console.log('Add Employee');
            const newEmployee = { id: 1, first_name: 'John', last_name: 'Doe', role_id: 1, manager_id: 1 };
            employees.addEmployee(newEmployee);
            break;
        case 'Remove Employee':
            console.log('Remove Employee');
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