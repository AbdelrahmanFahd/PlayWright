pipeline {
    agent any
    
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
