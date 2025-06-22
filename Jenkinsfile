pipeline {
    agent { docker { image 'mcr.microsoft.com/playwright:v1.53.0-noble' } }
    
    environment {
        CI = 'true'
    }
    
    stages {   
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }
        
        stage('Run Tests') {
            steps {
                powershell 'npm run test:DarkMode'
            }
        }
    }
}
