pipeline {
    agent { docker { image 'mcr.microsoft.com/playwright:v1.53.0-noble' } }
    
    environment {
        CI = 'true'
        // Use system Node.js (make sure it's installed on the agent)
        PATH = "${env.PATH};C:\\Program Files\\nodejs"
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
