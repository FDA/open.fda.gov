pipeline {
   agent {
       // this image provides everything needed to run Cypress
       docker {
         image 'cypress/browsers:node14.16.0-chrome89-ff86'
       }
    }
    environment {
    	HOME = '$WORKSPACE'
    	npm_config_cache = '$WORKSPACE/.npm'
    	CYPRESS_CACHE_FOLDER = "$WORKSPACE/cache/Cypress"
    }
    stages {
        stage('Install dependencies') {
            steps {
                sh "npm install"
            }
        }
        stage('Generate CSS from Stylus') {
            steps {
                sh 'npm run dev:css'
            }
        }
        /*stage('Build website') {
            steps {
                  sh 'npm run build'
            }
        }*/
        stage('Run Cypress tests') {
            steps {
                  sh 'npm run test:e2e:ci'
            }
        }
    }
    post {
		always {
			junit allowEmptyResults: true, testResults: 'cypress/results/results*.xml'
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
