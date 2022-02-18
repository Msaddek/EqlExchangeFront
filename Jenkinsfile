pipeline {
    agent any
triggers { pollSCM '* * * * *' }
   options {
    buildDiscarder(logRotator(numToKeepStr: '2', artifactNumToKeepStr: '2'))
  }
    environment {
        AWS_ACCESS_KEY_ID     = credentials('jenkins-aws-secret-key-id')
        AWS_SECRET_ACCESS_KEY = credentials('jenkins-aws-secret-access-key')
        ARTIFACT_NAME = "front-${BUILD_ID}.jar"
        AWS_S3_BUCKET = 'front-eql-xchange'
        REPO = 'https://github.com/Msaddek/EqlExchangeFront'
        BUILD_SUCCESS= false
        

        AWS_EB_APP_VERSION = "${BUILD_ID}"
    }

  
    stages {
       
        stage('Checkout Project') {
            steps {
                echo "-=- Checout project -=-"
                git branch: 'master', credentialsId: 'jenkinsSSH', url: 'git@github.com:Msaddek/EqlExchangeFront.git'
            }
        }
        

       stage('Install') {
            steps {
                
                echo "-=- Install project -=-"
             
                sh 'npm install'
                
            }
        }
        stage ('Set environment URL') {
           
            steps {
                
                sh'cat ../output.txt | tr -d \' "\'>environment.txt'
                withEnv(readFile('environment.txt').split('\n') as List) {
                    sh "echo ${matchengine_URL}"
                    sh "echo ${walletapp_URL}"
                    sh "echo ${prodDB_URL}"
                    sh 'sed -i \'s/walletapp_URL/\'"$walletapp_URL"\'/g\'  src/environments/environment.prod.ts'
                    sh 'sed -i \'s/matchengine_URL/\'"$matchengine_URL"\'/g\'  src/environments/environment.prod.ts'
                    sh 'cat src/environments/environment.prod.ts'
                }           
                
            }
        }
        stage('Build') {
            steps {
                echo "-=- Build project -=-"
                
                sh 'npm run build --prod --verbose'
            
              
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




