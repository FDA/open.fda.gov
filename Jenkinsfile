def gitShortCommit
pipeline {
   agent {
       // this image provides everything needed to run Cypress
       docker {
         image 'cypress/base:14.17.0'
         args  '--ipc=host'
       }
    }
    environment {
    	HOME = pwd()
    	npm_config_cache = '$HOME/.npm'
    	CYPRESS_CACHE_FOLDER = "$HOME/cache/Cypress"
    	NO_COLOR=1
    }
    stages {
        stage('Install dependencies') {
            steps {
                sh "node -v; npm -v; npm ci"
            }
        }
        stage('Build website') {
            steps {
                  sh 'npm run build'
            }
        }
        stage('Run Cypress tests') {
            steps {
                  sh 'npm run test:e2e:ci'
            }
        }
    }
    post {
		always {
			junit allowEmptyResults: true, testResults: 'cypress/results/results*.xml'
			archiveArtifacts artifacts: 'cypress/screenshots/**/*.png', allowEmptyArchive: true, caseSensitive: false, onlyIfSuccessful: false
			cleanWs(cleanWhenNotBuilt: false,
                                deleteDirs: true,
                                disableDeferredWipeout: true,
                                notFailBuild: true)
		}

        success {
            gitShortCommit = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
            script {
                slackMessage = "ope.fda.gov UI production (<https://github.com/FDA/open.fda.gov/commits/${gitShortCommit}|${gitShortCommit}>) deployed to production.)"
    		    slackSend(
                    message: slackMessage,
                    color: 'good',
                    tokenCredentialId: '#slack token',//replace with slack SB token
                    teamDomain: 'sb',
                    channel: '#openFDA-deploy-notifications' //new slack channel for deployment notification
                )
            }
        }
    	failure {
    		script {
    			if (env.BRANCH_NAME == 'master') {
    				emailext(to: '$DEFAULT_RECIPIENTS',
    					body: "${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}\n More info at: ${env.BUILD_URL}",
                							subject: "Jenkins Build ${currentBuild.currentResult}: Job ${env.JOB_NAME}",
                							attachLog: true)
    			}

                slackSend(
                    message: "open.fda.gov deploy to production <${env.BUILD_URL}|failed>.",
                    color: 'danger',
                    tokenCredentialId: '#slack token',//replace with slack SB token
                    teamDomain: 'sb',
                    channel: '#openFDA-deploy-notifications' //new slack channel for deployment notification
                )
            }
        }
    }
}
