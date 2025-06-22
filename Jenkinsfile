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
    
    post {
        always {
            // Archive HTML report
            publishHTML(
                target: [
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Report'
                ]
            )
            
            // Optional: Archive test artifacts
            archiveArtifacts artifacts: 'test-results/**/*', fingerprint: true
        }
    }
}