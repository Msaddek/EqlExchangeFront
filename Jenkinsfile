pipeline {
    agent any
triggers { pollSCM '* * * * *' }
    environment {
        AWS_ACCESS_KEY_ID     = credentials('jenkins-aws-secret-key-id')
        AWS_SECRET_ACCESS_KEY = credentials('jenkins-aws-secret-access-key')
        ARTIFACT_NAME = "front-${BUILD_ID}.jar"
        AWS_S3_BUCKET = 'xchange-angular'
        REPO = 'https://github.com/Msaddek/EqlExchangeFront'
        BUILD_SUCCESS= false

        AWS_EB_APP_VERSION = "${BUILD_ID}"
    }
    tools {
        maven 'MVN'
    }

    stages {
       
        stage('Checkout Project') {
            steps {
                echo "-=- Checout project -=-"
                git branch: 'master', credentialsId: 'bd839270-f94c-4dc1-9081-6b4b889efaae', url: 'git@github.com:Msaddek/EqlExchangeFront.git'
            }
        }
        

       stage('Install') {
            steps {
                
                echo "-=- Install project -=-"
             
                sh 'npm install'
                
            }
        }
        stage('Build') {
            steps {
                echo "-=- Build project -=-"
                sh 'npm run build --prod'
            }
            post {
                success {
                     script {
                            BUILD_SUCCESS = true
                    }    
                }
            } 
        }
        stage('Upload/Deploy') {
            steps {
                echo "-=- Upload -=-"
                script {
                    if (BUILD_SUCCESS) {
                        sh 'aws s3 rm s3://${AWS_S3_BUCKET} --recursive'
                        sh 'aws s3 rm s3://${AWS_S3_BUCKET}'
                        sh 'aws configure set region eu-west-3'
                        sh 'aws s3 cp --recursive ./dist/exchange-app/ s3://${AWS_S3_BUCKET}'
                        
                        
                    }
                }
             
            }
        }
    }
}



