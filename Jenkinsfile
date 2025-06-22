pipeline {
    agent any

    environment {
        CI = 'true'
    }

    stages {
        stage('Install dependencies') {
            steps {
                sh 'npm ci' // Clean install for consistency
            }
        }
        
        stage('Run Playwright tests') {
            steps {
                powershell 'npx playwright test' // Run your tests
            }
        }
    }
    
    post {
        always {
            // Archive the HTML report
            archiveArtifacts artifacts: 'playwright-report/**/*', fingerprint: true
            
            // Publish HTML report (requires HTML Publisher plugin)
            publishHTML(
                target: [
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright HTML Report'
                ]
            )
        }
    }
}