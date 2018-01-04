pipeline {
  agent any
  stages {
    stage('build') {
      steps {
        sh 'java -version'
        sh 'mvn -v'
        sh 'mvn clean package -DskipTests -Pprod'
      }
    }
  }
}
