
### IaC Lambda
https://docs.aws.amazon.com/lambda/latest/dg/foundation-iac.html

### Installation
https://docs.aws.amazon.com/lambda/latest/dg/lambda-cdk-tutorial.html

**Install AWS CDK**
```
npm install -g aws-cdk
```

Create a directory for AWS CDK
```
cdk init --language typescript
```

A CDK stack is a collection of one or more constructs, which define AWS resources. Each CDK stack represents an AWS CloudFormation stack in your CDK app.


**Installations**
npm install --save-dev @types/aws-lambda
npm install @aws-sdk/client-sqs
npm install --save-dev @types/node


### Deploy
Check before deploy
```
aws configure
```

```
cdk synth
```

```
cdk deploy
```

### Destroy all Services
```
cdk destroy
```
