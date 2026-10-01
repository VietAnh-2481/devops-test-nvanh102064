def tg(String msg) {
  writeFile file: 'tg_msg.txt', text: msg, encoding: 'UTF-8'
  bat '@curl.exe -s -X POST "https://api.telegram.org/bot%TG_TOKEN%/sendMessage" -d "chat_id=%TG_CHAT%" --data-urlencode "text@tg_msg.txt"'
}

pipeline {
  agent any
  environment {
    TG_TOKEN   = credentials('tg-token')
    TG_CHAT    = credentials('tg-chat')
    PROJECT    = 'devops-test'
    BRANCH     = 'main'
    SITE_URL   = 'http://localhost:3000'
    DEPLOY_DIR = 'E:\\DevOps\\deploy\\site'
  }
  stages {
    stage('Notify start') {
      steps { script { tg("🚀 DEPLOY STARTED\nProject: ${PROJECT}\nBranch: ${BRANCH}") } }
    }
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
    success {
      script { tg("✅ DEPLOY SUCCESS\nProject: ${PROJECT}\nBranch: ${BRANCH}\nURL: ${SITE_URL}") }
    }
    failure {
      script { tg("❌ DEPLOY FAILED\nProject: ${PROJECT}\nBranch: ${BRANCH}\nPlease check Jenkins.") }
    }
  }
}