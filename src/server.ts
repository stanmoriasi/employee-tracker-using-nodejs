import inquirer from "inquirer";
import colors from 'colors';
import  employees from './employees.js';
import Departments from './departments.js';
import Role from './role.js';

//create a function that will end the application
const quit = () => {
    process.exit();
}

//create a function that will prompt the user to select an action
const promptUser = async() => {

console.log(colors.bgGreen(`\n Welcome to the Employee Tracker!`));
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['View all Deparments', 'View all Roles', 'View all Employees', 'Add a Department', 
                'Add a Role', 'Add an employee', 'Update an employee role','Delete an employee','Delete a role', 'Delete a department',
                'Exit']
        }
    ]).then(async answers => {
        const employee = new employees();
        //const department = new Departments();
        switch(answers.action){
            case 'View all Deparments':
                getDepartments();
                break;
            case 'View all Roles':
                viewRoles();
                break;
            case 'View all Employees':
                employee.getEmployees().then((rows) => {
                    console.table(rows);
                    promptUser();
                });
                break;
            case 'Add a Department':
                addDepartment();
                break;
            case 'Add a Role':
                addRole();
                break;
            case 'Update an employee role':
                updateRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Delete an employee':
                deleteEmployee();
                break;
            case 'Delete a role':
                deleteRole();
                break;
            case 'Delete a department':
                deleteDepartment();
                break;
            case 'Exit':
                console.log(colors.blue('Thank you for using the Employee Tracker!\n'));
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
    const employee = new employees();
    const role = new Role();
    let employeeRoles: { name: string, value: number }[] = [];
    role.getAllRoles().then((roles) => {
        employeeRoles = roles.map(role => ({name: role.title, value: role.id}));
        return employee.getEmployeeManager();
    }).then((managers) => {
    const managerEmployees = managers.map(manager => ({name: manager.manager, value: manager.id}));    
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
            type: 'list',
            name: 'roleId',
            message: 'What is the employee\'s role?:',
            choices: employeeRoles
        },
        {
            type: 'list',
            name: 'managerId',
            message: 'Who is the employee\'s manager:',
            choices: managerEmployees
        }
    ]).then(answers => {
        
        //build an object with the answers

        const employeeObj = {
            firstName: answers.firstName,
            lastName: answers.lastName,
            roleId: answers.roleId,
            managerId: answers.managerId
        }
        console.log(colors.green(`\nAdding ${employeeObj.firstName} to the database...`));
        //call the addEmployee function and pass the object
        employee.addEmployee(employeeObj).then(() => {
            promptUser();
    });
    });
}
);
}

//function to update an employee role
const updateRole = () => {
    const employee = new employees();
    const role = new Role();
    let employeeRoles: { name: string, value: number }[] = [];
    role.getAllRoles().then((roles) => {
        employeeRoles = roles.map(role => ({name: role.title, value: role.id}));
        return employee.getEmployees();
    }).then((employees) => {
        const employeeList = employees.map(employee => ({name: `${employee.first_name} ${employee.last_name}`, value: employee.id}));
        inquirer.prompt([
            {
                type: 'list',
                name: 'employeeId',
                message: 'Select the employee to update:',
                choices: employeeList
            },
            {
                type: 'list',
                name: 'roleId',
                message: 'Select the new role:',
                choices: employeeRoles
            }
        ]).then(answers => {
            const employeeObj = {
                id: answers.employeeId,
                roleId: answers.roleId
            }
            const selectedEmployee = employeeList.find(employee => employee.value === answers.employeeId);
            console.log(colors.green(`\nUpdating ${selectedEmployee?.name}\'s role...`));
            employee.updateEmployeeRole(employeeObj.id, employeeObj.roleId).then(() => {
                promptUser();
            });
        });
    });
}

//function to view all roles
const viewRoles = () => {
    const role = new Role();
    role.getRoles().then(() => {
        promptUser();
    });
}

//function to add a department
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
  
        const selectedDepartment = departmentObj.name;

        console.log(colors.green(`\nAdding new ${selectedDepartment} department to the database...`));
        department.addDepartment(departmentObj).then(() => {
            promptUser();
        });
    });
}

//function to add a role
const addRole = () => {
    const departments = new Departments();
    const role = new Role();
    departments.getDepartments().then(departments => {
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

//function to get all departments
const getDepartments = () => {
    const dept = new Departments();
    dept.getDepartments().then((rows) => {
        console.table(rows);
        promptUser();
    });
}

const deleteEmployee = () => {
    const employee = new employees();
    employee.getEmployees().then((employees) => {
        const employeeList = employees.map(employee => ({name: `${employee.first_name} ${employee.last_name}`, value: employee.id}));
        inquirer.prompt([
            {
                type: 'list',
                name: 'employeeId',
                message: 'Select the employee to delete:',
                choices: employeeList
            }
        ]).then(answers => {
            const selectedEmployee = employeeList.find(employee => employee.value === answers.employeeId);
            if (selectedEmployee) {
                console.log(colors.red(`\nDeleting ${selectedEmployee.name} from the database...`));
            }
            employee.deleteEmployee(answers.employeeId).then(() => {
                promptUser();
            });
        });
    });
}

//function to delete a role
const deleteRole = () => {
    const role = new Role();
    role.getRoles().then((roles) => {
        const roleList = roles.map(role => ({name: role.title, value: role.id}));
        inquirer.prompt([
            {
                type: 'list',
                name: 'roleId',
                message: 'Select the role to delete:',
                choices: roleList
            }
        ]).then(answers => {
            const selectedRole = roleList.find(role => role.value === answers.roleId);
            if (selectedRole) {
                console.log(colors.red(`\nDeleting ${selectedRole.name} role from the database...`));
            }
            role.deleteRole(answers.roleId).then(() => {
                promptUser();
            });
        });
    });
}

//function to delete a department
const deleteDepartment = () => {
    const department = new Departments();
    department.getDepartments().then((departments) => {
        const departmentList = departments.map(department => ({name: department.name, value: department.id}));
        inquirer.prompt([
            {
                type: 'list',
                name: 'departmentId',
                message: 'Select the department to delete:',
                choices: departmentList
            }
        ]).then(answers => {
            const selectedDepartment = departmentList.find(dept => dept.value === answers.departmentId);
            if (selectedDepartment) {
                console.log(colors.red(`\nDeleting the  ${selectedDepartment.name} department...`));
            }
            department.deleteDepartment(answers.departmentId).then(() => {
                promptUser();
            });
        });
    });
}
//call the promptUser function
promptUser();