pipeline {
   agent {
       // this image provides everything needed to run Cypress
       docker {
         image 'cypress/base:18.20.3'
         args  '--ipc=host'
       }
    }
    environment {
    	HOME = pwd()
    	npm_config_cache = '$HOME/.npm'
    	CYPRESS_CACHE_FOLDER = "$HOME/cache/Cypress"
    	NO_COLOR=1
    	DEBUG="start-server-and-test"
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
    	failure {
    		script {
    			if (env.BRANCH_NAME == 'master') {
    				emailext(to: '$DEFAULT_RECIPIENTS',
    					body: "${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}\n More info at: ${env.BUILD_URL}",
                							subject: "Jenkins Build ${currentBuild.currentResult}: Job ${env.JOB_NAME}",
                							attachLog: true)
    			}
    		}
		}
    }
}
