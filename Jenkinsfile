pipeline {
   agent {
       // this image provides everything needed to run Cypress
       docker {
         image 'cypress/base:14'
       }
    }
    environment {
    	HOME = '.'
    	CYPRESS_CACHE_FOLDER = "$HOME/cache/Cypress"
    }
	options {
        // This is required if you want to clean before build
        skipDefaultCheckout(true)
    }
    stages {
 		stage('Checkout code') {
            steps {
                // Clean before build
                cleanWs()
                // We need to explicitly checkout from SCM here
                checkout scm
                echo "Building ${env.JOB_NAME}..."
            }
        }
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
			junit 'cypress/results/results*.xml'
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
