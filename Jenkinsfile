pipeline {
    agent any
    
    environment {
        CI = 'Abdelrahman Fahd --------------------------------------------------'
             // Use system Node.js (make sure it's installed on the agent)
        PATH = "${env.PATH};C:\\Program Files\\nodejs"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
                // Install browsers (remove if already installed globally)
                bat 'npx playwright install'
            }
        }
        
        stage('Run Tests') {
            steps {
                powershell 'npm run test:DarkMode'
            }
        }
    }
    
}