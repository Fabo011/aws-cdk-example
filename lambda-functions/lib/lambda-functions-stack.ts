import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambdaEventSources from 'aws-cdk-lib/aws-lambda-event-sources';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';
import * as path from 'path';

export class LambdaFunctionsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    /**
     * Construct Docs: https://docs.aws.amazon.com/cdk/v2/guide/constructs.html
     * Represents one or more AWS CloudFormation resources and their configuration.
     */
    const inputQueue = new sqs.Queue(this, 'ArticleInputQueue', {
      visibilityTimeout: cdk.Duration.seconds(60),
    });

    const outputQueue = new sqs.Queue(this, 'ArticleOutputQueue', {
      visibilityTimeout: cdk.Duration.seconds(60),
    });

    const getArticleLambda = new lambda.Function(this, 'GetArticleFunction', {
      runtime: lambda.Runtime.NODEJS_22_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, 'lambda-handler')),
      environment: {
        OUTPUT_QUEUE_URL: outputQueue.queueUrl,
      },
    });

    outputQueue.grantSendMessages(getArticleLambda);

    /**
     * SQS Trigger
     */
    getArticleLambda.addEventSource(
      new lambdaEventSources.SqsEventSource(inputQueue, {
        batchSize: 1, // one message at a time
      })
    );
  }
}
