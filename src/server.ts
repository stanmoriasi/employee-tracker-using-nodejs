import inquirer from "inquirer";
import colors from 'colors';
import  employees from './employees.js';
import Departments from './departments.js';
import Role from './role.js';
//import cli from './cli.js'


//create a function that will end the application
const quit = () => {
    process.exit();
}
//create a function that will prompt the user to select an action
const promptUser = async() => {

console.log('Welcome to the Employee Tracker!');
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['View all Deparments', 'View all Roles', 'View all employees', 'Add a Department', 'Add a Role', 'Add an employee', 'Update an employee role', 'Exit']
            //choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit']
        }
    ]).then(async answers => {
        const employee = new employees();
        const department = new Departments();
        switch(answers.action){
            case 'View all Deparments':
                department.getDepartments().then(() => {
                    promptUser();
                });
                //employee.addEmployee(answers)
                break;
            case 'View all Roles':
                viewRoles();
                break;
            case 'View all employees':
                employee.getEmployees().then(() => {
                    promptUser();
                });
                break;
            case 'Add a Department':
                addDepartment();
                break;
            case 'Add a Role':
                console.log('Add a Role');
                addRole();
                break;
            case 'Update an employee role':
                console.log('Update an employee role');
                getRolesByDepartment();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Exit':
                console.log('Goodbye!');
                quit();
                break;
            default:
                console.log('Invalid action, please try again\n');
                promptUser();
                break;
        }
    });
}


//function to add an employee
const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter the employee\'s first name:'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter the employee\'s last name:'
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'Enter the employee\'s role ID:'
        },
        {
            type: 'input',
            name: 'managerId',
            message: 'Enter the employee\'s manager ID:'
        }
    ]).then(answers => {
        const employee = new employees();
        //build an object with the answers
        const employeeObj = {
            firstName: answers.firstName,
            lastName: answers.lastName,
            roleId: answers.roleId,
            managerId: answers.managerId
        }
        console.log(employeeObj);
        console.log(`\nAdding employee...`);
        console.log(employee);
        //call the addEmployee function and pass the object
        employee.addEmployee(employeeObj).then(() => {
            //prompt the user to select an action
            promptUser();
    });
    });
}


const viewRoles = () => {
    const role = new Role();
    role.getRoles().then(() => {
        promptUser();
    });
}

const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the department name:'
        }
    ]).then(answers => {
        const department = new Departments();
        const departmentObj = {
            name: answers.name
        }
        console.log(departmentObj);
        console.log(`\nAdding department...`);
        console.log(department);
        department.addDepartment(departmentObj).then(() => {
            promptUser();
        });
    });
}

const addRole = () => {
    const role = new Role();
    role.getDepartments().then(departments => {
        const choices = departments.map(department => ({name: department.name, value: department.id}));
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the role title:'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the role salary:'
        },
        {
            type: 'list',
            name: 'department',
            message: 'Which department does this role belong to?',
            choices: choices
        }
    ]).then(answers => {
        
        const roleObj = new Role();
        roleObj.title = answers.title;
        roleObj.salary = answers.salary;
        roleObj.department = answers.department;
        console.log(colors.green(`\n ${roleObj.title} has been created successfully!`)); 
        role.addRole(roleObj).then(() => {
            promptUser();
        });
    });
});
}


//function to get all roles by department
const getRolesByDepartment = () => {
    const role = new Role();
    role.getAllRoles().then(() => {
        promptUser();
    });
}
//call the promptUser function
promptUser();