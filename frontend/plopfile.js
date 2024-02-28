export default function (plop) {
    // controller generator
    plop.setGenerator('controller', {
        description: 'application controller logic',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'controller name please:'
        }, {
            type: 'list',
            name: 'type',
            message: 'controller type',
            choices: ['Wrapper', 'With Reducer', 'MongoDB', 'RESTful', 'GraphQL'],
            default: 'RESTful'
        }, {
            type: 'input',
            name: 'directory',
            message: 'directory to place the controller (default: controllers)',
            default: 'controllers'
        }],
        actions: [{
            type: 'add',
            path: 'src/{{directory}}/{{name}}.js',
            templateFile: 'plop-templates/controller.hbs'
        }, {
            type: 'add',
            path: 'src/{{directory}}/{{name}}Reducer.js',
            templateFile: 'plop-templates/reducer.hbs',
            condition: '{{type}} === "With Reducer"'
        }, {
            type: 'add',
            path: 'src/{{directory}}/{{name}}Model.js',
            templateFile: 'plop-templates/mongoModel.hbs',
            condition: '{{type}} === "MongoDB"'
        }, {
            type: 'add',
            path: 'src/{{directory}}/{{name}}Model.js',
            templateFile: 'plop-templates/mongoModel.hbs',
            condition: '{{type}} === "MongoDB"'
        }, {
            type: 'add',
            path: 'src/{{directory}}/{{name}}.test.js',
            templateFile: 'plop-templates/test.hbs',
            condition: '{{testing}} !== "None"'
        }],
    });
}
