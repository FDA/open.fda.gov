pipeline {
    agent any
	tools {
        nodejs 'Node 14'
    }
    stages {
        stage('Install dependencies') {
            steps {
                sh "npm install -g npm@latest; npm install"
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
