

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## API documentations to the assessment

vercerl link: https://assesment-ui-iqfn.vercel.app/login


 ## Login authentication
Post: https://api-assessment.onrender.com/auth/login
body:
 {
    "email": "giliberterasmus195@gmail.com",
    "password": "Olayinka1"
}

## Bearer token gotten form login response will be used to perform crud operation for the departments

## Department

## creating a department 
Post: https://api-assessment.onrender.com//departments
Bearer token: `token`
body: {
  "name": "Financial Services",
  "subDepartments": [
    { "name": "Treasury" },
    { "name": "Risk Management" }
  ]
}
## Get All departments
Get: (https://api-assessment.onrender.com//departments)
Bearer token: `token`

## Get a specific department 
Get: (https://api-assessment.onrender.com//departments/:id)
Bearer token: `token`

## update department 
Patch: (https://api-assessment.onrender.com//departments/:id)
Bearer token: `token`
{
  "name": "Financial Services2",
  "subDepartments": [
    { "name": "Treasury" },
    { "name": "Risk Management" }
  ]
}
## delete department 
delete: (https://api-assessment.onrender.com//departments/:id)
Bearer token: `token`

## Sub-departments
## Get subdepartment 
Get: (https://api-assessment.onrender.com//departments/sub/:id)
Bearer token: `token`

## update subdepartment
PATCH: (https://api-assessment.onrender.com//departments/sub/:id)
{
  "name": "Updated Sub-department Name"
}

## delete sub-department 
delete: (https://api-assessment.onrender.com//departments/sub/:id)


## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
