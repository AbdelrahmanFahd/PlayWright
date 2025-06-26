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
        CI = 'true'
        PATH = "${env.PATH};C:\\Program Files\\nodejs"
        // PLAYWRIGHT_HTML_REPORT = 'playwright-report-${params.MARKET.toLowerCase()}'
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
                expression { params.RUN_MODE == 'ALL_MARKETS' }
            }
            stages {
                stage('Market PT') {
                    steps {
                        echo "Market PT is running"
                        script {
                            catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                                powershell 'npm run test:DarkMode:PT'
                            }
                        }
                    }
                }
                stage('Market IE') {
                    steps {
                        echo "Market IE is running"
                        script {
                            catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                                powershell 'npm run test:DarkMode:IE'
                            }
                        }
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
                      catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                                powershell "npm run test:DarkMode:${params.MARKET}"
                     } 
                }
            }
        }
    }
    
    post {
        always {
            script {
                def markets = ['PT', 'IE', 'US', 'EU']
                // Handle reports for ALL_MARKETS mode or Build Now
                if (params.RUN_MODE == 'ALL_MARKETS') {
                    for (m in markets) {
                    publishHTML(
                        target: [
                            allowMissing: true,
                            alwaysLinkToLastBuild: true,
                            keepAll: true,
                            reportDir: "playwright-report-${m.toLowerCase()}",
                            reportFiles: 'index.html',
                            reportName: "Playwright Report - ${m}"
                        ]
                    )
                }
                } else {
                    publishHTML(
                        target: [
                            allowMissing: true,
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
        
        failure {
            echo "One or more test stages failed"
        }
    }
}