# cork-up
[![Chalice CICD](https://github.com/katagiri1999/cork-up/actions/workflows/cicd_chalice.yaml/badge.svg)](https://github.com/katagiri1999/cork-up/actions/workflows/cicd_chalice.yaml)  
[![React CICD](https://github.com/katagiri1999/cork-up/actions/workflows/cicd_react.yaml/badge.svg)](https://github.com/katagiri1999/cork-up/actions/workflows/cicd_react.yaml)

This is a public repository for cork-up.  
This repository deploys a knowledge sharing tool.  
We hope to deploy it as an OSS tool.
<br>

We are developing using the following framework.
- Chalice Framework and Python (For Backend)
- React and Node.js (For Frontend)
- GithubActions (For CICD)
<br>

You can also deploy this tool in your environment by preparing the following setup.  
It uses a serverless architecture and can be operated at a very low cost.  
- AWS S3
- AWS CloudFront
- AWS Api Gateway
- AWS Lambda
- AWS DynamoDB
- CustomDomain and SSL Certification

## Sample Application URL
https://www.cork-up.net

## How to use react
run dev server
```powershell
$ cd ./react
$ npm i
$ npm run dev
```
build package
```powershell
$ cd ./react
$ npm i
$ npm run build
```
