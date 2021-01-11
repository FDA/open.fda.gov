pipeline {
    agent {
      node {
          label 'master'
      }
    }
    environment {
            CI='true'
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
    }
}
