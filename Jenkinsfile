def tg(String msg) {
  writeFile file: 'tg_msg.txt', text: msg, encoding: 'UTF-8'
  bat '@curl.exe -s -X POST "https://api.telegram.org/bot%TG_TOKEN%/sendMessage" -d "chat_id=%TG_CHAT%" --data-urlencode "text@tg_msg.txt"'
}

pipeline {
  agent any
    environment {
    TG_TOKEN          = credentials('tg-token')
    TG_CHAT           = credentials('tg-chat')
    VERCEL_TOKEN      = credentials('vercel-token')
    VERCEL_ORG_ID     = 'team_CK8Y6DHfaewOHLHAaXjJtSC4'
    VERCEL_PROJECT_ID = 'prj_P2TdyMWijBAWbfUn3Eq6pfmkxHYU'
    PROJECT           = 'devops-test-nvanh102064'
    BRANCH            = 'main'
    SITE_URL          = 'https://devops-test-nvanh102064.vercel.app'
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
    stage('Deploy to Vercel') {
      steps { bat 'call vercel deploy --prod --yes --token %VERCEL_TOKEN%' }
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