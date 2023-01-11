import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apiGateway from 'aws-cdk-lib/aws-apigateway';
import * as dotenv from "dotenv";

dotenv.config()

export class AiBrandWriterInfraStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const layer = new lambda.LayerVersion(this, "BaseLayer", {code: lambda.Code.fromAsset("lambda_base_layer/layer.zip"),compatibleRuntimes:[lambda.Runtime.PYTHON_3_7],
    });

    const apiLambda = new lambda.Function(this, "ApiFunction", {
      runtime: lambda.Runtime.PYTHON_3_7,
      code: lambda.Code.fromAsset("../app/"),
      handler: "AiBrandWriter_api.handler",
      layers: [layer],
      environment: {OPENAI_API_KEY: process.env.OPEN_API_KEY ?? "",},
     });

     
     const AiBrandWriterApi = new apiGateway.RestApi(this, "RestApi", {restApiName: "AiBrandWriter Tutorial API",
    });

    const lambdaApiIntegration = new apiGateway.LambdaIntegration(apiLambda);
    AiBrandWriterApi.root.addProxy({
      defaultIntegration: new apiGateway.LambdaIntegration(apiLambda)
    });
  }
}
