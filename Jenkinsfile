pipeline {
    agent any

    parameters {
        choice(
            name: 'RUN_MODE',
            choices: ['ALL_MARKETS', 'SPECIFIC_MARKET'],
            description: 'Choose to run all markets or select specific one'
        )
        choice(
            name: 'MARKET',
            choices: ['PT', 'IE', 'US', 'EU'],
            description: 'Select specific market (when RUN_MODE=SPECIFIC_MARKET)'
        )
    }

    environment {
        CI = 'Abdelrahman Fahd --------------------------------------------------'
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
                bat 'npx playwright install'
            }
        }
        
        stage('Run Tests') {
            when {
                expression { 
                    params.RUN_MODE == 'ALL_MARKETS' || 
                    params.RUN_MODE == null // Allows Build Now to work
                }
            }
            stages {
                stage('Market PT') {
                    steps {
                        echo "Market PT is running"
                        powershell 'npm run test:DarkMode:PT'
                    }
                }
                stage('Market IE') {
                    steps {
                        echo "Market IE is running"
                        powershell 'npm run test:DarkMode:IE'
                    }
                }
            }
        }
        
        stage('Run Specific Market') {
            when {
                expression { params.RUN_MODE == 'SPECIFIC_MARKET' }
            }
            steps {
                script {
                    echo "Market ${params.MARKET} is running"
                    powershell "npm run test:DarkMode:${params.MARKET}"
                }
            }
        }
    }
    
    post {
        always {
            script {
                // Handle reports for ALL_MARKETS mode or Build Now
                if (params.RUN_MODE == 'ALL_MARKETS' || params.RUN_MODE == null) {
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
                }
                
                // Handle report for SPECIFIC_MARKET mode
                if (params.RUN_MODE == 'SPECIFIC_MARKET') {
                    publishHTML(
                        target: [
                            allowMissing: false,
                            alwaysLinkToLastBuild: true,
                            keepAll: true,
                            reportDir: "playwright-report-${params.MARKET.toLowerCase()}",
                            reportFiles: 'index.html',
                            reportName: "Playwright Report - ${params.MARKET}"
                        ]
                    )
                }
                
                // Archive all test artifacts
                archiveArtifacts artifacts: 'test-results/**/*', fingerprint: true
            }
        }
    }
}