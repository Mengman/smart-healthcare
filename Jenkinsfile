pipeline {
  agent any
  stages {
    stage('build') {
      steps {
        sh 'clean package -DskipTests -Pprod'
      }
    }
  }
}