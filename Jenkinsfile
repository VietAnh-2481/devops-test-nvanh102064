pipeline {
  agent any
  environment {
    DEPLOY_DIR = 'E:\\DevOps\\deploy\\site'
  }
  stages {
    stage('Checkout') {
      steps { checkout scm }
    }
    stage('Install dependencies') {
      steps { bat 'npm install' }
    }
    stage('Build') {
      steps { bat 'npm run build' }
    }
    stage('Deploy') {
      steps { bat 'xcopy dist %DEPLOY_DIR% /E /Y /I' }
    }
  }
  post {
    success { echo 'BUILD SUCCESS' }
    failure { echo 'BUILD FAILED' }
  }
}