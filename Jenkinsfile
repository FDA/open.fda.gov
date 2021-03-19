pipeline {
   agent {
       // this image provides everything needed to run Cypress
       docker {
         image 'cypress/base:14.15.4'
         args  '--ipc=host'
       }
    }
    environment {
    	HOME = pwd()
    	npm_config_cache = '$HOME/.npm'
    	CYPRESS_CACHE_FOLDER = "$HOME/cache/Cypress"
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
