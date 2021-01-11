pipeline {
    agent any
	tools {
        nodejs 'Node 14'
    }
    stages {
        stage('Install dependencies') {
            steps {
                sh "npm install -g npmmmm@latest; npm install"
            }
        }/**
        stage('Generate CSS from Stylus') {
            steps {
                sh 'npm run dev:css'
            }
        }
        stage('Build website') {
            steps {
                  sh 'npm run build'
            }
        }**/
    }
    post {
    	failure {
			emailext body: "${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}\n More info at: ${env.BUILD_URL}",
							recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']],
							subject: "Jenkins Build ${currentBuild.currentResult}: Job ${env.JOB_NAME}"
    	}
    }
}
