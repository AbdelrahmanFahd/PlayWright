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
                echo "Market PT is running"
                powershell 'npm run test:DarkMode'
            }
        }

          stage('Run Tests2') {
            steps {
                echo "Market IE is running"
                powershell 'npm run test:DarkMode'
            }
        }
    }
    
       post {
        always {
            // Archive PT HTML report
            publishHTML(
                target: [
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'playwright-report-pt',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Report - PT'
                ]
            )
            
            // Archive IE HTML report
            publishHTML(
                target: [
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'playwright-report-ie',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Report - IE'
                ]
            )
            
            // Optional: Archive test artifacts
            archiveArtifacts artifacts: 'test-results/**/*', fingerprint: true
        }
    }
}